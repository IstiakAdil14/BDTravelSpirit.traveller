import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db/connect';
import { TourModel } from '@/models/tour.model';
import Region from '@/models/region.model';

export async function POST() {
  try {
    await dbConnect();
    
    // Reset all counts to 0
    await Region.updateMany({}, { $set: { tourCount: 0 } });
    
    // Get tour counts by region
    const tourCounts = await TourModel.aggregate([
      { $unwind: '$destinations' },
      { $match: { 'destinations.region': { $exists: true, $ne: null } }},
      { $group: { _id: '$destinations.region', count: { $sum: 1 } } }
    ]);
    
    // Update each region with tour count
    for (const { _id: regionName, count } of tourCounts) {
      await Region.updateOne(
        { name: regionName },
        { $set: { tourCount: count } }
      );
    }
    
    const updatedRegions = await Region.find({});
    
    return NextResponse.json({ 
      success: true, 
      tourCounts,
      regions: updatedRegions 
    });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'An error occurred' }, { status: 500 });
  }
}