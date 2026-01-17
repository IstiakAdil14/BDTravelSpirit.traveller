import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/db/connect";
import Location from "@/models/location.model";


export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const region = searchParams.get("region")?.toLowerCase();
    
    console.log('API: Searching for region:', region);
    
    await dbConnect();
    
    // First check if any locations exist
    const totalCount = await Location.countDocuments();
    console.log('Total locations in DB:', totalCount);
    
    const locations = await Location.find({ 
      region: { $regex: new RegExp(`^${region}$`, 'i') } 
    });
    console.log('API: Found locations:', locations.length);
    console.log('Sample location:', locations[0]);
    
    return NextResponse.json(locations);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Failed to fetch locations' }, { status: 500 });
  }
}