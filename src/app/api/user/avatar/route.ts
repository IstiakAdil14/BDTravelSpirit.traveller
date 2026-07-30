import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";
import connectToDatabase from "@/lib/db/connect";
import UserModel from "@/lib/db/models/User";

const ALLOWED_ORIGINS = ["lh3.googleusercontent.com", "res.cloudinary.com", "avatars.githubusercontent.com", "ui-avatars.com"];

function isAllowedUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return ALLOWED_ORIGINS.some((o) => parsed.hostname === o || parsed.hostname.endsWith(`.${o}`));
  } catch {
    return false;
  }
}

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const searchParams = req.nextUrl.searchParams;
    const targetUserId = searchParams.get("u") || session.user.id;

    let imageUrl = null;
    let userName = targetUserId === session.user.id ? session.user.name : "Traveler";

    await connectToDatabase();
    const dbUser = await UserModel.findById(targetUserId).select("name image avatar").lean() as any;
    
    if (dbUser) {
      userName = dbUser.name || userName;
      
      if (dbUser.avatar) {
          const AssetModel = (await import("@/models/assets/asset.model")).default;
          const AssetFileModel = (await import("@/models/assets/asset-file.model")).default;
          
          const asset = await AssetModel.findById(dbUser.avatar);
          if (asset) {
              const file = await AssetFileModel.findById(asset.file);
              if (file && file.publicUrl) {
                  imageUrl = file.publicUrl;
              }
          }
      }

      if (!imageUrl && dbUser.image) {
        imageUrl = dbUser.image;
      }
    }

    if (!imageUrl && targetUserId === session.user.id && session.user.image) {
      imageUrl = session.user.image;
    }

    if (!imageUrl) {
      imageUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(userName || "Traveler")}&background=random`;
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
        "Cache-Control": "no-store, max-age=0",
      },
    });
  } catch (err) {
    console.error("Avatar proxy error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
