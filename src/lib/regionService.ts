// lib/regionService.ts
import dbConnect from "@/lib/db/connect";
import {TourModel as Tour} from "@/models/tour.model";
import mongoose from "mongoose";

export async function getToursByRegion(region: string, limit = 20, cursor?: string) {
  if (!region) return { data: [], nextCursor: null, total: 0 };

  await dbConnect();

  // Case-insensitive exact match for region; adjust if you store normalized slugs instead
  const query: any = { region: { $regex: new RegExp(`^${region}$`, "i") } };

  if (cursor) {
    const lastId = Buffer.from(cursor, "base64").toString("ascii");
    query._id = { $lt: new mongoose.Types.ObjectId(lastId) };
  }

  const docs = await Tour.find(query)
    .sort({ _id: -1 })
    .limit(limit + 1)
    .lean();

  let nextCursor: string | null = null;
  if (docs.length > limit) {
    const last = docs[limit - 1];
    nextCursor = Buffer.from(String(last._id)).toString("base64");
    docs.splice(limit);
  }

  const total = await Tour.countDocuments({ region: { $regex: new RegExp(`^${region}$`, "i") } });

  return { data: docs, nextCursor, total };
}
