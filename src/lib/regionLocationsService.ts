// lib/regionLocationsService.ts
import dbConnect from "@/lib/db/connect";
import { TourModel } from "@/models/tour.model";
import mongoose from "mongoose";

export type LocationSummary = {
  location: string;
  count: number;
  sampleTourId?: string;
  sampleSlug?: string;
  sampleImage?: string;
};

export async function getLocationsForRegion(region: string): Promise<LocationSummary[]> {
  if (!region) return [];

  await dbConnect();

  // Aggregate distinct locations within the region with counts and a sample tour for link/image
  const pipeline: any[] = [
    {
      $unwind: "$destinations"
    },
    {
      $match: {
        "destinations.region": { $regex: new RegExp(`^${region}$`, "i") },
        "destinations.city": { $exists: true, $ne: "" },
        status: "published"
      },
    },
    {
      $group: {
        _id: "$destinations.city",
        count: { $sum: 1 },
        sampleId: { $first: "$_id" },
        sampleSlug: { $first: "$slug" },
        sampleImage: { $first: "$heroImage" },
      },
    },
    { $sort: { count: -1 as const, _id: 1 as const } },
    {
      $project: {
        _id: 0,
        location: "$_id",
        count: 1,
        sampleTourId: { $toString: "$sampleId" },
        sampleSlug: "$sampleSlug",
        sampleImage: "$sampleImage",
      },
    },
  ];

  const results = await TourModel.aggregate(pipeline).allowDiskUse(true).exec();
  return results as LocationSummary[];
}
