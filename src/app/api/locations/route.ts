import { NextResponse } from "next/server";
import dbConnect from "@/lib/db/connect";
import { TourModel } from "@/models/tour.model";
import { AssetModel } from "@/models/asset.model";

const regionMap: { [key: string]: string } = {
  'barishal': 'Barishal',
  'chittagong': 'Chittagong', 
  'dhaka': 'Dhaka',
  'khulna': 'Khulna',
  'mymensingh': 'Mymensingh',
  'rajshahi': 'Rajshahi',
  'rangpur': 'Rangpur',
  'sylhet': 'Sylhet'
};

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const region = searchParams.get("region")?.toLowerCase();
    
    await dbConnect();
    
    if (region) {
      const displayRegion = regionMap[region] || region;
      
      console.log('[Locations API] Searching for region:', displayRegion);
      
      // First try exact match
      let tours = await TourModel.find({
        'destinations.region': { $regex: new RegExp(`^${displayRegion}$`, 'i') },
        status: 'published'
      }).populate('heroImage').lean();
      
      console.log('[Locations API] Found tours (exact):', tours.length);
      
      // If no tours found, try loose match
      if (tours.length === 0) {
        tours = await TourModel.find({
          'destinations.region': { $regex: new RegExp(displayRegion, 'i') },
          status: 'published'
        }).populate('heroImage').lean();
        console.log('[Locations API] Found tours (loose):', tours.length);
      }
      
      const locations = tours.map(tour => ({
        _id: tour._id,
        name: tour.title,
        slug: tour.slug,
        region: displayRegion,
        image: tour.seo?.ogImage || tour.heroImage?.publicUrl || '/images/default-tour.jpg',
        duration: tour.duration ? `${tour.duration.days} days` : 'Multi-day',
        price: tour.basePrice?.amount || 0,
        shortDescription: tour.summary,
        rating: tour.ratings?.average || 4.5,
        seo: tour.seo
      }));
      
      console.log('[Locations API] Returning locations:', locations.length);
      return NextResponse.json(locations);
    }
    
    return NextResponse.json([]);
  } catch (error) {
    console.error('[Locations API] Error:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch locations', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 });
  }
}