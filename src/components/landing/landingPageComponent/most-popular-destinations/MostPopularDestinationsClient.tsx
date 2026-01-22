import MostPopularDestinationsUI from "./MostPopularDestinationsUI";
import { dbConnect } from "@/lib/db/connect";
import { TourModel } from "@/models/tour.model";
import { AssetModel } from "@/models/asset.model";
import mongoose from "mongoose";

export default async function MostPopularDestinationsClient() {
  await dbConnect();
  
  if (!mongoose.models.Asset) mongoose.model("Asset", AssetModel.schema);
  
  const popularTours = await TourModel.find({
    status: "published",
    "ratings.average": { $gt: 0 }
  })
  .sort({ "ratings.average": -1, "ratings.count": -1 })
  .limit(5)
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

  const title = "Most Popular Destinations";
  const subtitle = "Discover the most loved destinations by travelers worldwide. From pristine beaches to cultural wonders, these spots have captured hearts and created unforgettable memories.";
  const buttonText = "Explore All Destinations";

  return (
    <MostPopularDestinationsUI
      title={title}
      subtitle={subtitle}
      buttonText={buttonText}
      destinations={JSON.parse(JSON.stringify(destinations))}
    />
  );
}
