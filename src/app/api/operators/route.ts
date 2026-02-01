import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db/connect';
import TourOperator from '@/models/tourOperator.model';

export async function GET() {
  try {
    await dbConnect();

    let operators = await TourOperator.find({}).sort({ rating: -1 });
    
    // Auto-seed if empty
    if (operators.length === 0) {
      const { tourOperators } = await import('@/data/tourOperators');
      await TourOperator.insertMany(tourOperators);
      operators = await TourOperator.find({}).sort({ rating: -1 });
    }

    // Map database fields to frontend expected format
    const mappedOperators = operators.map(op => ({
      _id: op._id,
      id: op.id || 0,
      name: op.name,
      slug: op.slug,
      logo: op.logo,
      rating: op.rating,
      reviews: op.reviewCount || 0,
      totalTours: op.tours?.length || 0,
      shortDescription: op.tagline || '',
      specialties: op.specializations || [],
      certified: op.verified || false,
      verified: op.verified || false,
      experience: op.stats?.experienceYears ? `${op.stats.experienceYears} years` : 'N/A',
      region: op.regions?.[0] || 'Bangladesh'
    }));

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