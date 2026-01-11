// app/api/tours/slug/[slug]/route.ts
import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/db/connect";
import { TourModel as Tour, ITour } from "@/models/tour.model";
import { AssetModel as Media } from "@/models/asset.model";
import { ReviewModel as Review } from "@/models/review.model";
import { TourFAQModel as Faq } from "@/models/tourFAQ.model";
import { GuideModel as Guide } from "@/models/guide.model";
import mongoose from "mongoose";

export async function GET(req: Request, { params }: { params: { slug: string } }) {
  await dbConnect();
  const { slug } = params;

  const tour = await Tour.findOne({ slug }).lean() as ITour | null;
  if (!tour) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const tourId = new mongoose.Types.ObjectId(tour._id);

  const [gallery, reviews, faqs, guides, recommendations] = await Promise.all([
    Media.find({ tourId }).sort({ order: 1 }).lean(),
    Review.find({ tourId }).sort({ createdAt: -1 }).limit(10).lean(),
    Faq.find({ tourId }).sort({ createdAt: -1 }).limit(10).lean(),
    Guide.find({ tourId }).sort({ rating: -1 }).limit(6).lean(),
    Tour.find({ "destinations.country": tour.destinations?.[0]?.country, _id: { $ne: tourId } }).limit(6).lean(),
  ]);

  const payload = { tour, gallery, reviews, faqs, guides, recommendations };

  return NextResponse.json(payload, {
    status: 200,
    headers: {
      "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120",
    },
  });
}
