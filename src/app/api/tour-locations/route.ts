import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db/connect';
import TourLocation from '@/models/tourLocation.model';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    
    const body = await request.json();
    
    // Handle both single location and array of locations
    const locations = Array.isArray(body) ? body : [body];
    
    const savedLocations = [];
    
    for (const locationData of locations) {
      // Check if location already exists
      const existingLocation = await TourLocation.findOne({ id: locationData.id });
      
      if (existingLocation) {
        // Update existing location
        const updatedLocation = await TourLocation.findOneAndUpdate(
          { id: locationData.id },
          locationData,
          { new: true }
        );
        savedLocations.push(updatedLocation);
      } else {
        // Create new location
        const newLocation = new TourLocation(locationData);
        const savedLocation = await newLocation.save();
        savedLocations.push(savedLocation);
      }
    }
    
    return NextResponse.json({
      success: true,
      message: `${savedLocations.length} tour location(s) saved successfully`,
      data: savedLocations
    }, { status: 201 });
    
  } catch (error: any) {
    console.error('Error saving tour locations:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to save tour locations',
      error: error.message
    }, { status: 500 });
  }
}

export async function GET() {
  try {
    await dbConnect();
    
    const locations = await TourLocation.find({}).sort({ createdAt: -1 });
    
    return NextResponse.json({
      success: true,
      data: locations
    }, { status: 200 });
    
  } catch (error: any) {
    console.error('Error fetching tour locations:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to fetch tour locations',
      error: error.message
    }, { status: 500 });
  }
}