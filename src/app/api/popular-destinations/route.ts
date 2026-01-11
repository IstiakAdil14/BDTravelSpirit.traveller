import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db/connect';
import PopularDestination from '@/models/popularDestination.model';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    
    const body = await request.json();
    const destinations = Array.isArray(body) ? body : [body];
    
    const savedDestinations = [];
    
    for (const destinationData of destinations) {
      const existingDestination = await PopularDestination.findOne({ id: destinationData.id });
      
      if (existingDestination) {
        const updatedDestination = await PopularDestination.findOneAndUpdate(
          { id: destinationData.id },
          destinationData,
          { new: true }
        );
        savedDestinations.push(updatedDestination);
      } else {
        const newDestination = new PopularDestination(destinationData);
        const savedDestination = await newDestination.save();
        savedDestinations.push(savedDestination);
      }
    }
    
    return NextResponse.json({
      success: true,
      message: `${savedDestinations.length} destination(s) saved successfully`,
      data: savedDestinations
    }, { status: 201 });
    
  } catch (error: any) {
    console.error('Error saving popular destinations:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to save popular destinations',
      error: error.message
    }, { status: 500 });
  }
}

export async function GET() {
  try {
    await dbConnect();
    
    const destinations = await PopularDestination.find({}).sort({ popularityScore: -1 });
    
    return NextResponse.json({
      success: true,
      data: destinations
    }, { status: 200 });
    
  } catch (error: any) {
    console.error('Error fetching popular destinations:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to fetch popular destinations',
      error: error.message
    }, { status: 500 });
  }
}