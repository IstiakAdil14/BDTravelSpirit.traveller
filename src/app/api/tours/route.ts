import { NextResponse } from "next/server";
import { getTours } from "@/lib/tourService";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "10");
    const status = searchParams.get("status") || "published";
    const featuredParam = searchParams.get("featured");
    const isFeatured = featuredParam ? featuredParam === "true" : undefined;
    const search = searchParams.get("search") || undefined;
    const startDate = searchParams.get("startDate") || undefined;
    const endDate = searchParams.get("endDate") || undefined;

    try {
        const tours = await getTours({ limit, status, isFeatured, search, startDate, endDate });
        return NextResponse.json(tours);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
