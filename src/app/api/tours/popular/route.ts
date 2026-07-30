import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/db/connect";
import TourModel from "@/models/tours/tour.model";
import type { FlattenMaps } from "mongoose";
import type { IAsset } from "@/models/assets/asset.model";
import type { IAssetFile } from "@/models/assets/asset-file.model";
import type { PopularTourResponse } from "@/types/tour-components";

type LeanTour = FlattenMaps<{
  _id: unknown;
  title: string;
  slug: string;
  division?: string;
  destinations?: { city?: string; country?: string }[];
  ratings?: { average?: number; count?: number };
  basePrice?: { amount?: number; currency?: string };
  heroImage?: FlattenMaps<IAsset> & {
    file?: FlattenMaps<IAssetFile>;
    publicUrl?: string;
  };
  duration?: { days?: number };
}>;

export async function GET() {
    try {
        await dbConnect();
        
        const popularTours = await TourModel.find({
            status: { $in: ["active", "published"] as string[] },
            "ratings.average": { $gt: 0 }
        })
        .sort({ "ratings.average": -1, "ratings.count": -1 })
        .limit(10)
        .populate("heroImage")
        .lean() as unknown as LeanTour[];

        const formattedTours: PopularTourResponse[] = popularTours.map((tour) => {
          // heroImage might be populated IAsset with publicUrl, or just the plain object
          const heroImageUrl =
            typeof tour.heroImage === "object" && tour.heroImage !== null
              ? (tour.heroImage as Record<string, unknown>).publicUrl as string ?? ""
              : "";
          
          return {
            _id: String(tour._id),
            title: tour.title,
            slug: tour.slug,
            destination: tour.destinations?.[0]?.city || tour.destinations?.[0]?.country || "",
            region: tour.division?.toLowerCase() || "dhaka",
            rating: tour.ratings?.average || 0,
            reviewCount: tour.ratings?.count || 0,
            price: tour.basePrice?.amount || 0,
            currency: tour.basePrice?.currency || "BDT",
            heroImage: heroImageUrl,
            duration: tour.duration?.days || 0
          };
        });

        return NextResponse.json(formattedTours);
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Internal server error";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
