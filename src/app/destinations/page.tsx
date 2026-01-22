import { dbConnect } from "@/lib/db/connect";
import { TourModel } from "@/models/tour.model";
import { AssetModel } from "@/models/asset.model";
import mongoose from "mongoose";
import Link from "next/link";

export default async function PopularDestinationsPage() {
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

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <h1 className="text-3xl font-bold mb-8">Top 20 Popular Destinations</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {destinations.map((dest, index) => (
          <Link 
            key={dest._id} 
            href={`/tours?region=${dest.destination?.toLowerCase().replace(/\s+/g, '-') || 'bangladesh'}&tour=${dest.slug}`}
          >
            <div className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                {dest.heroImage && (
                  <img 
                    src={dest.heroImage} 
                    alt={dest.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="absolute top-2 left-2 bg-blue-600 text-white px-2 py-1 rounded text-sm">
                  #{index + 1}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">{dest.title}</h3>
                <p className="text-gray-600 mb-2">{dest.destination}</p>
                <div className="flex items-center mb-2">
                  <span className="text-yellow-500">★</span>
                  <span className="ml-1 font-medium">{dest.rating.toFixed(1)}</span>
                  <span className="text-gray-500 ml-1">({dest.reviewCount})</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-lg">
                    {dest.currency} {dest.price}
                  </span>
                  <span className="text-gray-500">{dest.duration} days</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}