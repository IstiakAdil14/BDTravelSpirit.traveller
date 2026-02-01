import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db/connect';
import TourOperator from '@/models/tourOperator.model';
import { tourOperators } from '@/data/tourOperators';

export async function POST() {
  try {
    await dbConnect();
    
    const existingCount = await TourOperator.countDocuments();
    if (existingCount > 0) {
      return NextResponse.json({
        success: true,
        message: `Tour operators already exist (${existingCount} found). Skipping seed.`
      });
    }
    
    const result = await TourOperator.insertMany(tourOperators);
    
    return NextResponse.json({
      success: true,
      message: `Successfully seeded ${result.length} tour operators`
    });
    
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}