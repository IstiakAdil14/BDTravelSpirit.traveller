import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db/connect';
import { TourModel } from '@/models/tour.model';

export async function GET() {
  try {
    await dbConnect();
    
    const regionCounts = await TourModel.aggregate([
      { $unwind: '$destinations' },
      { $match: { 'destinations.region': { $exists: true, $ne: null } }},
      { $group: { _id: '$destinations.region', count: { $sum: 1 } }},
      { $sort: { _id: 1 }}
    ]);
    
    return NextResponse.json({ regionCounts });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'An error occurred' }, { status: 500 });
  }
}