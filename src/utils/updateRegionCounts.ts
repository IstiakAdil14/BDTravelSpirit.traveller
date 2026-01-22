import { TourModel } from '@/models/tour.model';
import RegionModel from '@/models/region.model';

export async function updateRegionCounts() {
  try {
    // Aggregate tour counts by region
    const regionCounts = await TourModel.aggregate([
      { $unwind: '$destinations' },
      { $match: { 'destinations.region': { $exists: true, $ne: null } } },
      { $group: { _id: '$destinations.region', count: { $sum: 1 } } }
    ]);

    // Update each region with its tour count
    for (const { _id: regionName, count } of regionCounts) {
      await RegionModel.findOneAndUpdate(
        { name: regionName },
        { $set: { tourCount: count } },
        { upsert: true }
      );
    }

    return regionCounts;
  } catch (error) {
    console.error('Error updating region counts:', error);
    throw error;
  }
}