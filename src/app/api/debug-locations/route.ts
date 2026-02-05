import { NextResponse } from "next/server";
import dbConnect from "@/lib/db/connect";
import { TourModel } from "@/models/tour.model";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const region = searchParams.get("region")?.toLowerCase() || "barishal";
    
    await dbConnect();
    
    // Debug: Check all tours first
    const allTours = await TourModel.find({ status: 'published' }).select('title destinations').lean();
    
    // Debug: Check tours with any region
    const toursWithRegions = await TourModel.find({ 
      status: 'published',
      'destinations.region': { $exists: true }
    }).select('title destinations').lean();
    
    // Debug: Check tours with Barishal specifically
    const barishalTours = await TourModel.find({
      'destinations.region': { $regex: new RegExp(`^Barishal$`, 'i') },
      status: 'published'
    }).select('title destinations').lean();
    
    // Debug: Check tours with barishal (case insensitive)
    const barishalToursLoose = await TourModel.find({
      'destinations.region': { $regex: new RegExp(`barishal`, 'i') },
      status: 'published'
    }).select('title destinations').lean();
    
    return NextResponse.json({
      region,
      debug: {
        totalPublishedTours: allTours.length,
        toursWithRegions: toursWithRegions.length,
        barishalToursExact: barishalTours.length,
        barishalToursLoose: barishalToursLoose.length,
        sampleTours: allTours.slice(0, 3).map(tour => ({
          title: tour.title,
          destinations: tour.destinations
        })),
        barishalSample: barishalToursLoose.slice(0, 3).map(tour => ({
          title: tour.title,
          destinations: tour.destinations
        }))
      }
    });
  } catch (error) {
    console.error('Debug API Error:', error);
    return NextResponse.json({ 
      error: 'Failed to debug locations', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 });
  }
}