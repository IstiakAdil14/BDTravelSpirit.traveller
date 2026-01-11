// app/api/tours/[tourId]/reviews/route.ts
import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/db/connect";
import { ReviewModel as Review } from "@/models/review.model";
import mongoose from "mongoose";

function encodeCursor(id: string) {
  return Buffer.from(id).toString("base64");
}
function decodeCursor(cursor: string) {
  return Buffer.from(cursor, "base64").toString("ascii");
}

export async function GET(req: Request, { params }: { params: { tourId: string } }) {
  await dbConnect();
  const { tourId } = params;
  const url = new URL(req.url);
  const cursor = url.searchParams.get("cursor");
  const limit = Math.min(Number(url.searchParams.get("limit") || "10"), 50);

  const query: any = { tourId: new mongoose.Types.ObjectId(tourId) };
  if (cursor) {
    const lastId = decodeCursor(cursor);
    query._id = { $lt: new mongoose.Types.ObjectId(lastId) };
  }

  const docs = await Review.find(query).sort({ _id: -1 }).limit(limit + 1).lean();
  let nextCursor: string | null = null;
  if (docs.length > limit) {
    const last = docs[limit - 1];
    nextCursor = encodeCursor(String(last._id));
    docs.splice(limit);
  }

  return NextResponse.json({ data: docs, nextCursor }, {
    headers: { "Cache-Control": "public, s-maxage=30, stale-while-revalidate=60" },
  });
}
