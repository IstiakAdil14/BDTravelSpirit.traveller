import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/db/connect";
import Region from "@/models/region.model";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get("name")?.toLowerCase();
  
  await dbConnect();
  
  if (name) {
    const region = await Region.findOne({ 
      name: { $regex: new RegExp(`^${name}$`, 'i') } 
    });
    return NextResponse.json(region);
  }
  
  const regions = await Region.find({});
  return NextResponse.json(regions);
}