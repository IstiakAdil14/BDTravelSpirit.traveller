// app/api/regions/[region]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getToursByRegion } from "@/lib/regionService";

export async function GET(req: NextRequest, { params }: { params: Promise<{ region: string }> }) {
  const { region } = await params;
  const url = new URL(req.url);
  const cursor = url.searchParams.get("cursor") ?? undefined;
  const limit = Math.min(Number(url.searchParams.get("limit") || "20"), 50);

  const payload = await getToursByRegion(region, limit, cursor);

  return NextResponse.json(payload, {
    headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120" },
  });
}
