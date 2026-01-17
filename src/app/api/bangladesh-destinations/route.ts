import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/db/connect";
import Location from "@/models/location.model";
import Region from "@/models/region.model";

export async function GET() {
  await dbConnect();

  const regions = await Region.find({});
  
  const destinationsWithCounts = await Promise.all(
    regions.map(async (region) => {
      const count = await Location.countDocuments({ region: region.name.toLowerCase() });
      return {
        id: region._id,
        name: region.name,
        image: region.image,
        tourPlaces: count
      };
    })
  );

  return NextResponse.json({ data: destinationsWithCounts });
}