import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/db/connect";
import TourModel from "@/models/tours/tour.model";
import { BangladeshDivisions } from "@/data/bangladesh-division";

const DEFAULT_IMAGES: Record<string, string> = {
  dhaka: 'https://res.cloudinary.com/dc6yqjtm9/image/upload/v1784961439/dhaka_rkxc5w.jpg',
  chattogram: 'https://res.cloudinary.com/dc6yqjtm9/image/upload/v1784961439/chittagong_jst73h.webp',
  rajshahi: 'https://res.cloudinary.com/dc6yqjtm9/image/upload/v1784961440/rajshahi_ka2esm.jpg',
  khulna: 'https://res.cloudinary.com/dc6yqjtm9/image/upload/v1784961440/khulnA_rpmozl.jpg',
  barishal: 'https://res.cloudinary.com/dc6yqjtm9/image/upload/v1784961439/Barisal_l8cgpq.jpg',
  sylhet: 'https://res.cloudinary.com/dc6yqjtm9/image/upload/v1784961441/Sylhet_bkuepa.jpg',
  rangpur: 'https://res.cloudinary.com/dc6yqjtm9/image/upload/v1784961440/Rangpur_kcsez4.jpg',
  mymensingh: 'https://res.cloudinary.com/dc6yqjtm9/image/upload/v1784961440/maymensinGH_dbthd5.jpg',
};

export async function GET() {
  try {
    await dbConnect();

    const tourCounts = await TourModel.aggregate([
      { $match: { status: { $in: ['active', 'published'] }, deletedAt: null } },
      { $group: { _id: '$division', count: { $sum: 1 } } }
    ]);
    const countsMap = new Map(
      tourCounts.map((item: any) => [item._id?.toLowerCase() || '', item.count])
    );

    const destinationsWithCounts = Object.values(BangladeshDivisions).map((division) => ({
      id: division,
      name: division.charAt(0).toUpperCase() + division.slice(1),
      image: DEFAULT_IMAGES[division] || '/images/placeholder.jpg',
      tourPlaces: countsMap.get(division) || 0
    }));

    return NextResponse.json({ data: destinationsWithCounts });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'An error occurred' }, { status: 500 });
  }
}