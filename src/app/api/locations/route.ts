import { NextResponse } from "next/server";
import dbConnect from "@/lib/db/connect";
import TourModel, { ITour } from "@/models/tours/tour.model";
import AssetFileModel from "@/models/assets/asset-file.model";
import { AssetModel, IAsset } from "@/models/assets/asset.model";
import { UserModel } from "@/models/user.model";
import GuideModel from "@/models/guide/guide.model";
import mongoose, { FlattenMaps, Types } from "mongoose";

// Maps URL slug → DB division value (must match BangladeshDivisions enum)
const regionMap: Record<string, string> = {
  'barishal': 'barishal',
  'chittagong': 'chattogram',
  'chattogram': 'chattogram',
  'dhaka': 'dhaka',
  'khulna': 'khulna',
  'mymensingh': 'mymensingh',
  'rajshahi': 'rajshahi',
  'rangpur': 'rangpur',
  'sylhet': 'sylhet'
};

// Shape of a lean ITour document after .select(...)
type LeanTour = FlattenMaps<ITour> & {
  _id: Types.ObjectId;
  heroImage?: Types.ObjectId;
};

// Shape of a lean IAsset document after populate('file')
type LeanAsset = FlattenMaps<IAsset> & {
  _id: Types.ObjectId;
  file?: { publicUrl?: string };
};

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const region = searchParams.get("region")?.toLowerCase();
    
    await dbConnect();
    
    // Ensure all referenced schemas are registered to avoid MissingSchemaError
    if (!mongoose.models.User) mongoose.model("User", UserModel.schema);
    if (!mongoose.models.Guide) mongoose.model("Guide", GuideModel.schema);
    if (!mongoose.models.Asset) mongoose.model("Asset", AssetModel.schema);
    if (!mongoose.models.AssetFile) mongoose.model("AssetFile", AssetFileModel.schema);
    
    if (region) {
      const dbDivision = regionMap[region.toLowerCase()] ?? region.toLowerCase();
      
      console.log('[Locations API] Searching for division:', dbDivision);
      
      const tours = await TourModel.find({
        division: dbDivision,
        status: 'active',
        deletedAt: null
      }).select('_id title slug duration basePrice summary ratings heroImage seo district').lean<LeanTour[]>();
      
      console.log('[Locations API] Found tours:', tours.length);

      // Manually resolve heroImage → AssetFile to avoid schema registration issues with populate
      const heroImageIds = tours.map((t) => t.heroImage).filter((id): id is Types.ObjectId => Boolean(id));
      const assets = heroImageIds.length
        ? await AssetModel.find({ _id: { $in: heroImageIds } }).populate('file').lean<LeanAsset[]>()
        : [];
      const assetMap = new Map<string, string | undefined>(
        assets.map((a) => [a._id.toString(), a.file?.publicUrl])
      );
      
      const locations = tours.map((tour) => ({
        _id: tour._id,
        name: tour.title,
        slug: tour.slug,
        region: dbDivision,
        district: (tour as any).district ?? '',
        image: assetMap.get(tour.heroImage?.toString() ?? '') ?? '/images/default-tour.jpg',
        duration: tour.duration ? `${tour.duration.days} days` : 'Multi-day',
        price: tour.basePrice?.amount ?? 0,
        shortDescription: tour.summary,
        rating: tour.ratings?.average ?? 4.5,
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