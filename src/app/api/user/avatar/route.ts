import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";
import connectToDatabase from "@/lib/db/connect";
import UserModel from "@/lib/db/models/User";

const ALLOWED_ORIGINS = ["lh3.googleusercontent.com", "res.cloudinary.com", "avatars.githubusercontent.com"];

function isAllowedUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return ALLOWED_ORIGINS.some((o) => parsed.hostname === o || parsed.hostname.endsWith(`.${o}`));
  } catch {
    return false;
  }
}

export async function GET(_req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let imageUrl = session.user.image;

    if (!imageUrl) {
      await connectToDatabase();
      const dbUser = await UserModel.findById(session.user.id).select("image").lean();
      imageUrl = dbUser?.image;
    }

    if (!imageUrl) {
      return NextResponse.json({ error: "No avatar" }, { status: 404 });
    }
    if (!isAllowedUrl(imageUrl)) {
      return NextResponse.json({ error: "Invalid avatar source" }, { status: 400 });
    }

    const res = await fetch(imageUrl, {
      headers: { "User-Agent": "BD-Travel-Spirit-Avatar/1.0" },
    });

    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch image" }, { status: 502 });
    }

    const contentType = res.headers.get("content-type") || "image/jpeg";
    const buffer = await res.arrayBuffer();

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "private, max-age=300",
      },
    });
  } catch (err) {
    console.error("Avatar proxy error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
