import TourModel from '@/models/tours/tour.model';

export async function updateRegionCounts() {
  try {
    // Aggregate tour counts by region
    const regionCounts = await TourModel.aggregate([
      { $match: { division: { $exists: true, $ne: null } } },
      { $group: { _id: '$division', count: { $sum: 1 } } }
    ]);

    return regionCounts;
  } catch (error) {
    console.error('Error updating region counts:', error);
    throw error;
  }
}