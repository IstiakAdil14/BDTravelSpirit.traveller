// app/api/regions/[region]/locations/route.ts
import { NextResponse } from "next/server";
import { getLocationsForRegion } from "@/lib/regionLocationsService";

export async function GET(req: Request, { params }: { params: { region: string } }) {
  const { region } = params;
  const locations = await getLocationsForRegion(region);
  return NextResponse.json({ data: locations }, {
    headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120" },
  });
}

