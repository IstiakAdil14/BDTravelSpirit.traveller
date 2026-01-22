// app/api/regions/[region]/locations/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getLocationsForRegion } from "@/lib/regionLocationsService";

export async function GET(req: NextRequest, { params }: { params: Promise<{ region: string }> }) {
  const { region } = await params;
  const locations = await getLocationsForRegion(region);
  return NextResponse.json({ data: locations }, {
    headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120" },
  });
}

