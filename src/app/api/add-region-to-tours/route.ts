import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db/connect';
import { TourModel } from '@/models/tour.model';

export async function POST() {
  try {
    await dbConnect();
    
    // City to region mapping for Bangladesh
    const cityToRegion = {
      'Kuakata': 'Barishal',
      'Barishal': 'Barishal',
      'Cox\'s Bazar': 'Chittagong',
      'Chittagong': 'Chittagong',
      'Bandarban': 'Chittagong',
      'Rangamati': 'Chittagong',
      'Dhaka': 'Dhaka',
      'Sylhet': 'Sylhet',
      'Srimangal': 'Sylhet',
      'Khulna': 'Khulna',
      'Sundarbans': 'Khulna',
      'Rajshahi': 'Rajshahi',
      'Rangpur': 'Rangpur',
      'Mymensingh': 'Mymensingh'
    };
    
    const tours = await TourModel.find({});
    let updated = 0;
    
    for (const tour of tours) {
      let hasUpdates = false;
      
      // Update destinations with region
      if (tour.destinations) {
        tour.destinations = tour.destinations.map((dest: any) => {
          if (dest.city && !dest.region) {
            const region = cityToRegion[dest.city as keyof typeof cityToRegion];
            if (region) {
              dest.region = region;
              hasUpdates = true;
            }
          }
          return dest;
        });
      }
      
      if (hasUpdates) {
        await tour.save();
        updated++;
      }
    }
    
    return NextResponse.json({ 
      success: true, 
      message: `Updated ${updated} tours with region data`,
      cityToRegion 
    });
  } catch (error) {
    console.error('Error adding regions to tours:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to add regions to tours' 
    }, { status: 500 });
  }
}