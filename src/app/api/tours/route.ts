import { NextResponse } from "next/server";
import { getTours } from "@/lib/tourService";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "10");
    const status = searchParams.get("status") || "published";
    const isFeatured = searchParams.get("featured") === "true";

    try {
        const tours = await getTours({ limit, status, isFeatured });
        return NextResponse.json(tours);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
