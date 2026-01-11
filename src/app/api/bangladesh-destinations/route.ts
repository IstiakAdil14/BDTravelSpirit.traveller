import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db/connect';
import BangladeshDestination from '@/models/bangladeshDestination.model';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    
    const body = await request.json();
    const destinations = Array.isArray(body) ? body : [body];
    
    const savedDestinations = [];
    
    for (const destinationData of destinations) {
      const existingDestination = await BangladeshDestination.findOne({ id: destinationData.id });
      
      if (existingDestination) {
        const updatedDestination = await BangladeshDestination.findOneAndUpdate(
          { id: destinationData.id },
          destinationData,
          { new: true }
        );
        savedDestinations.push(updatedDestination);
      } else {
        const newDestination = new BangladeshDestination(destinationData);
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
    return NextResponse.json({
      success: false,
      message: 'Failed to save Bangladesh destinations',
      error: error.message
    }, { status: 500 });
  }
}

export async function GET() {
  try {
    await dbConnect();
    
    const destinations = await BangladeshDestination.find({}).sort({ tourPlaces: -1 });
    
    return NextResponse.json({
      success: true,
      data: destinations
    }, { status: 200 });
    
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: 'Failed to fetch Bangladesh destinations',
      error: error.message
    }, { status: 500 });
  }
}