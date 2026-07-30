import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db/connect';
import TourModel from '@/models/tours/tour.model';
import { BangladeshDivisions } from '@/data/bangladesh-division';

export async function GET() {
  try {
    await dbConnect();
    
    const tours = await TourModel.find({}).lean() as any[];
    
    // Show actual tour destinations to see region names
    const tourDestinations: any[] = [];
    tours.forEach(tour => {
      if (tour.destinations) {
        tour.destinations.forEach((dest: any) => {
          tourDestinations.push({
            tourTitle: tour.title,
            city: dest.city,
            region: dest.region,
            country: dest.country
          });
        });
      }
    });
    
    // Get unique regions from tours
    const uniqueRegions = [...new Set(tourDestinations.map(d => d.region).filter(Boolean))];
    
    return NextResponse.json({
      totalTours: tours.length,
      tourDestinations,
      uniqueRegionsInTours: uniqueRegions,
      regionsInTable: Object.values(BangladeshDivisions)
    });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}