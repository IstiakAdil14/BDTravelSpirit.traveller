import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/authOptions';
import { dbConnect } from '@/lib/db/connect';
import UserModel from '@/lib/db/models/User';
import { ReviewModel } from '@/models/review.model';
import { TourModel } from '@/models/tour.model';
import mongoose from 'mongoose';

export async function GET(_req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();

    const user = await UserModel.findOne({ email: session.user.email });
    if (!user) return NextResponse.json({ reviews: [], stats: { total: 0, avgRating: 0, helpful: 0, pending: 0 } });

    const userId = user._id as mongoose.Types.ObjectId;

    const rawReviews = await ReviewModel.find({ user: userId })
      .sort({ createdAt: -1 })
      .lean();

    // Fetch tour details for each review
    const tourIds = rawReviews.map((r: any) => r.tour);
    const tours = await TourModel.find({ _id: { $in: tourIds } })
      .select('title mainLocation')
      .lean();

    const tourMap = new Map(tours.map((t: any) => [t._id.toString(), t]));

    const reviews = rawReviews.map((r: any) => {
      const tour: any = tourMap.get(r.tour?.toString()) ?? {};
      return {
        id: r._id.toString(),
        tourName: tour.title ?? 'Unknown Tour',
        location: [
          tour.mainLocation?.address?.city,
          tour.mainLocation?.address?.district,
        ].filter(Boolean).join(', ') || 'Bangladesh',
        date: new Date(r.createdAt).toISOString(),
        rating: r.rating,
        title: r.title ?? '',
        body: r.comment,
        helpful: r.helpfulCount ?? 0,
        status: r.isApproved ? 'published' : 'pending',
      };
    });

    const total = reviews.length;
    const avgRating = total > 0
      ? Math.round((reviews.reduce((s, r) => s + r.rating, 0) / total) * 10) / 10
      : 0;
    const helpful = reviews.reduce((s, r) => s + r.helpful, 0);
    const pending = reviews.filter((r) => r.status === 'pending').length;

    return NextResponse.json({ reviews, stats: { total, avgRating, helpful, pending } });
  } catch (err) {
    console.error('Reviews GET error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();

    const user = await UserModel.findOne({ email: session.user.email });
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

    const { tourId, rating, title, comment } = await req.json();

    if (!tourId || !rating || !comment) {
      return NextResponse.json({ error: 'tourId, rating and comment are required' }, { status: 400 });
    }

    const tour = await TourModel.findById(tourId);
    if (!tour) return NextResponse.json({ error: 'Tour not found' }, { status: 404 });

    // Upsert — one review per user per tour
    const review = await ReviewModel.findOneAndUpdate(
      { user: user._id, tour: tourId },
      { rating, title, comment, isApproved: true },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    return NextResponse.json({ success: true, reviewId: review._id.toString() }, { status: 201 });
  } catch (err) {
    console.error('Reviews POST error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();

    const user = await UserModel.findOne({ email: session.user.email });
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

    const { searchParams } = new URL(req.url);
    const reviewId = searchParams.get('id');
    if (!reviewId) return NextResponse.json({ error: 'Review ID required' }, { status: 400 });

    const deleted = await ReviewModel.findOneAndDelete({ _id: reviewId, user: user._id });
    if (!deleted) return NextResponse.json({ error: 'Review not found' }, { status: 404 });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Reviews DELETE error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
