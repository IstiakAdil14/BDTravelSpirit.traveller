import MostPopularDestinationsUI from "./MostPopularDestinationsUI";
import { dbConnect } from "@/lib/db/connect";
import TourModel from "@/models/tours/tour.model";
import { AssetModel } from "@/models/assets/asset.model";
import AssetFileModel from "@/models/assets/asset-file.model";
import mongoose from "mongoose";

const DIVISIONS = ['dhaka','chattogram','rajshahi','khulna','barishal','sylhet','rangpur','mymensingh'];

function getImageUrl(heroImage: any): string {
  return heroImage?.file?.publicUrl || heroImage?.publicUrl || '';
}

export default async function MostPopularDestinationsClient() {
  await dbConnect();
  if (!mongoose.models.Asset) mongoose.model("Asset", AssetModel.schema);
  if (!mongoose.models.AssetFile) mongoose.model("AssetFile", AssetFileModel.schema);

  // Condition 1: top 8 tours by highest rating
  let popularTours = await TourModel.find({
    status: { $in: ['active', 'published'] },
    deletedAt: null,
    'ratings.average': { $gt: 0 }
  })
    .sort({ 'ratings.average': -1, 'ratings.count': -1 })
    .limit(8)
    .populate({ path: 'heroImage', populate: { path: 'file' } })
    .lean();

  // Condition 2: no rated tours — pick newest tour per division
  if (popularTours.length === 0) {
    const perDivision = await Promise.all(
      DIVISIONS.map((div) =>
        TourModel.findOne({
          status: { $in: ['active', 'published'] },
          deletedAt: null,
          division: div,
        })
          .sort({ createdAt: -1 })
          .populate({ path: 'heroImage', populate: { path: 'file' } })
          .lean()
      )
    );
    popularTours = perDivision.filter(Boolean) as typeof popularTours;
  }

  const destinations = popularTours.map((tour: any) => ({
    _id: tour._id.toString(),
    title: tour.title,
    slug: tour.slug,
    destination: tour.division || '',
    rating: tour.ratings?.average || 0,
    reviewCount: tour.ratings?.count || 0,
    price: tour.basePrice?.amount || 0,
    currency: tour.basePrice?.currency || 'BDT',
    heroImage: getImageUrl(tour.heroImage),
    duration: tour.duration?.days || 0,
  }));

  return (
    <MostPopularDestinationsUI
      title="Most Popular Destinations"
      subtitle="Discover the most loved destinations by travelers worldwide. From pristine beaches to cultural wonders, these spots have captured hearts and created unforgettable memories."
      buttonText="Explore All Destinations"
      destinations={JSON.parse(JSON.stringify(destinations))}
    />
  );
}
