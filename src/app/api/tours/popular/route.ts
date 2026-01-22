import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/db/connect";
import { TourModel } from "@/models/tour.model";
import { AssetModel } from "@/models/asset.model";

export async function GET() {
    try {
        await dbConnect();
        
        const popularTours = await TourModel.find({
            status: "published",
            "ratings.average": { $gt: 0 }
        })
        .sort({ "ratings.average": -1, "ratings.count": -1 })
        .limit(10)
        .populate("heroImage")
        .lean();

        const formattedTours = popularTours.map((tour: any) => ({
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

        return NextResponse.json(formattedTours);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}