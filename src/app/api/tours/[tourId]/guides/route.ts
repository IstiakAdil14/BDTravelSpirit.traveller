// app/api/tours/[tourId]/guides/route.ts
import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/db/connect";
import { GuideModel as Guide } from "@/models/guide.model";
import mongoose from "mongoose";

export async function GET(req: Request, { params }: { params: Promise<{ tourId: string }> }) {
  await dbConnect();
  const { tourId } = await params;
  const url = new URL(req.url);
  const offset = Math.max(Number(url.searchParams.get("offset") || "0"), 0);
  const limit = Math.min(Number(url.searchParams.get("limit") || "10"), 50);

  const docs = await Guide.find({ tourId: new mongoose.Types.ObjectId(tourId) })
    .sort({ rating: -1 })
    .skip(offset)
    .limit(limit)
    .lean();

  const total = await Guide.countDocuments({ tourId: new mongoose.Types.ObjectId(tourId) });

  return NextResponse.json({ data: docs, offset, limit, total }, {
    headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120" },
  });
}
