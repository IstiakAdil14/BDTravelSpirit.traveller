import { dbConnect } from "@/lib/db/connect";
import { TourModel } from "@/models/tour.model";
import { AssetModel } from "@/models/asset.model";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();
    
    if (!mongoose.models.Asset) mongoose.model("Asset", AssetModel.schema);
    
    const popularTours = await TourModel.find({
      status: "published",
      "ratings.average": { $gt: 0 }
    })
    .sort({ "ratings.average": -1, "ratings.count": -1 })
    .limit(20)
    .populate("heroImage")
    .lean();

    const destinations = popularTours.map((tour: any) => ({
      _id: tour._id.toString(),
      title: tour.title,
      slug: tour.slug,
      destination: tour.destinations?.[0]?.city || tour.destinations?.[0]?.country || "",
      rating: tour.ratings?.average || 0,
      reviewCount: tour.ratings?.count || 0,
      price: tour.basePrice?.amount || 0,
      currency: tour.basePrice?.currency || "BDT",
      heroImage: tour.heroImage?.publicUrl || "",
      duration: tour.duration?.days || 0
    }));

    return NextResponse.json(destinations);
  } catch (error) {
    console.error('Error fetching popular destinations:', error);
    return NextResponse.json({ error: 'Failed to fetch destinations' }, { status: 500 });
  }
}