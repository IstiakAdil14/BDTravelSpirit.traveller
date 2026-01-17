import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db/connect';
import TourOperator from '@/models/tourOperator.model';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');

    if (slug) {
      // Get specific operator by slug
      const operator = await TourOperator.findOne({ slug });
      if (!operator) {
        return NextResponse.json({ error: 'Operator not found' }, { status: 404 });
      }
      return NextResponse.json(operator);
    } else {
      // Get all operators
      const operators = await TourOperator.find({}).sort({ rating: -1 });

      // Map database fields to frontend expected format
      const mappedOperators = operators.map(op => ({
        id: op.id || op._id,
        _id: op._id.toString(),
        name: op.name,
        slug: op.slug,
        logo: op.logo,
        rating: op.rating,
        reviews: op.reviewCount || 0,
        specialties: op.specializations || [],
        certified: op.verified || false,
        experience: op.stats?.experienceYears ? `${op.stats.experienceYears}+ years` : 'N/A'
      }));

      return NextResponse.json({
        success: true,
        data: mappedOperators
      });
    }
  } catch (error) {
    console.error('Error fetching tour operators:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}