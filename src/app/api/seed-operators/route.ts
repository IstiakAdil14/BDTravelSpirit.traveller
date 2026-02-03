import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db/connect';
import TourOperator from '@/models/tourOperator.model';
import { tourOperators } from '@/data/tourOperators';

export async function POST() {
  try {
    await dbConnect();
    
    // Always delete and re-insert to ensure fresh data
    await TourOperator.deleteMany({});
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

export async function GET() {
  try {
    await dbConnect();
    
    const existingCount = await TourOperator.countDocuments();
    if (existingCount === 0) {
      // Auto-seed if empty
      try {
        const result = await TourOperator.insertMany(tourOperators, { ordered: false });
        return NextResponse.json({
          success: true,
          message: `Auto-seeded ${result.length} tour operators`
        });
      } catch (bulkError: any) {
        if (bulkError.code === 11000) {
          return NextResponse.json({
            success: true,
            message: 'Some operators already exist, skipping duplicates'
          });
        }
        throw bulkError;
      }
    }
    
    return NextResponse.json({
      success: true,
      message: `${existingCount} tour operators already exist`
    });
    
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}