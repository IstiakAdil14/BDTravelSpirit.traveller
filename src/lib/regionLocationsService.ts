// lib/regionLocationsService.ts
import dbConnect from "@/lib/db/connect";
import TourModel from "@/models/tours/tour.model";
import { PipelineStage } from "mongoose";

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
  const pipeline: PipelineStage[] = [
    {
      $match: {
        "division": { $regex: new RegExp(`^${region}$`, "i") },
        status: { $in: ["active", "published"] },
        deletedAt: null,
      },
    },
    {
      $group: {
        _id: {
          $ifNull: ["$district", "$title"]
        },
        count: { $sum: 1 },
        sampleId: { $first: "$_id" },
        sampleSlug: { $first: "$slug" },
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
      },
    },
  ];

  const results = await TourModel.aggregate<LocationSummary>(pipeline).allowDiskUse(true).exec();
  return results;
}
