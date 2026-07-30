import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db/connect';
import TourModel from '@/models/tours/tour.model';
import '@/models/assets/asset.model';
import '@/models/assets/asset-file.model';

export async function GET() {
  try {
    await dbConnect();

    // Prefer featured tours; fall back to top-rated approved tours
    let tours = await TourModel.find({ featured: true, moderationStatus: 'approved' })
      .populate({ path: 'heroImage', populate: { path: 'file', select: 'publicUrl' } })
      .limit(12)
      .lean();

    if (tours.length === 0) {
      tours = await TourModel.find({ moderationStatus: 'approved' })
        .sort({ 'ratings.average': -1 })
        .populate({ path: 'heroImage', populate: { path: 'file', select: 'publicUrl' } })
        .limit(12)
        .lean();
    }

    const capitalize = (s: string) => s ? s.charAt(0).toUpperCase() + s.slice(1) : '';

    const mapped = tours.map((t: any) => ({
      name: t.title,
      region: [t.district, t.division].filter(Boolean).map(capitalize).join(', ') || 'Bangladesh',
      img: t.heroImage?.file?.publicUrl || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=150&h=150&fit=crop',
      url: `/tours/${t.slug}`
    }));

    return NextResponse.json({ tours: mapped });
  } catch (error) {
    console.error('Error fetching featured tours:', error);
    return NextResponse.json({ tours: [] }, { status: 500 });
  }
}
