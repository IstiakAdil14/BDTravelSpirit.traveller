import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db/connect';
import TourOperator from '@/models/tourOperator.model';

export async function POST() {
  try {
    await dbConnect();
    
    // Find and remove duplicates based on slug
    const duplicates = await TourOperator.aggregate([
      {
        $group: {
          _id: "$slug",
          count: { $sum:1 },
          docs: { $push: "$_id" }
        }
      },
      {
        $match: {
          count: { $gt: 1 }
        }
      }
    ]);

    let removedCount = 0;
    for (const duplicate of duplicates) {
      // Keep the first document, remove the rest
      const docsToRemove = duplicate.docs.slice(1);
      await TourOperator.deleteMany({ _id: { $in: docsToRemove } });
      removedCount += docsToRemove.length;
    }

    return NextResponse.json({
      success: true,
      message: `Removed ${removedCount} duplicate operators`,
      duplicatesFound: duplicates.length
    });

  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}