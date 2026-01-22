import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db/connect';
import Region from '@/models/region.model';

export async function GET() {
  try {
    await dbConnect();
    const destinations = await Region.find({}).lean();
    
    const destinationsWithTourPlaces = destinations.map(dest => ({
      ...dest,
      tourPlaces: dest.tourCount || 0
    }));

    return NextResponse.json(destinationsWithTourPlaces);
  } catch (error) {
    console.error('Error loading regions:', error);
    return NextResponse.json([]);
  }
}