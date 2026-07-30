import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db/connect';
import GuideModel from '@/models/guide/guide.model';
import TourModel from '@/models/tours/tour.model';

const generateSlug = (name: string) =>
  (name || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export async function GET() {
  try {
    await dbConnect();
    const guides = await GuideModel.find({ status: 'approved' }).lean();

    const mappedOperators = await Promise.all(
      guides.map(async (guide: any) => {
        const tourCount = await TourModel.countDocuments({ companyId: guide._id });
        return {
          _id: guide._id.toString(),
          id: guide._id.toString(),
          name: guide.companyName,
          slug: generateSlug(guide.companyName),
          logo: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=100&h=100&fit=crop',
          rating: 4.8,
          reviews: 15,
          totalTours: tourCount,
          shortDescription: guide.bio || '',
          specialties: [],
          certified: true,
          verified: true,
          experience: '1+ years',
          region: guide.address?.division || 'Bangladesh'
        };
      })
    );

    return NextResponse.json({
      success: true,
      operators: mappedOperators
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch operators' },
      { status: 500 }
    );
  }
}