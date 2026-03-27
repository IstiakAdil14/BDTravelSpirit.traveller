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

    let user = await UserModel.findOne({ email: session.user.email });
    if (!user) {
      user = await UserModel.create({
        name: session.user.name,
        email: session.user.email,
        image: session.user.image,
        isVerified: true,
        accountStatus: 'active',
      });
    }

    const userId = user._id as mongoose.Types.ObjectId;

    // ── Core counts ──────────────────────────────────────────────────────────
    const reviewsCount = await ReviewModel.countDocuments({ user: userId });
    const wishlistCount = user.wishlist?.length ?? 0;
    const bookingIds: mongoose.Types.ObjectId[] = (user.bookingHistory ?? []) as mongoose.Types.ObjectId[];

    const tours = bookingIds.length > 0
      ? await TourModel.find({ _id: { $in: bookingIds } })
          .select('title slug mainLocation basePrice duration status createdAt')
          .lean()
      : [];

    const uniqueCities = new Set(tours.map((t: any) => t.mainLocation?.address?.city).filter(Boolean)).size;

    // ── Bookings list ─────────────────────────────────────────────────────────
    const bookings = tours.map((tour: any, i: number) => ({
      id: tour._id.toString().slice(-6).toUpperCase(),
      title: tour.title,
      location: [tour.mainLocation?.address?.city, tour.mainLocation?.address?.district]
        .filter(Boolean).join(', ') || 'Bangladesh',
      date: new Date(tour.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      status: (['upcoming', 'completed', 'cancelled'] as const)[i % 3],
      price: `৳${(tour.basePrice?.amount ?? 0).toLocaleString()}`,
      duration: tour.duration?.days ? `${tour.duration.days}D/${tour.duration.nights ?? 0}N` : '1D',
    }));

    // ── Stats ─────────────────────────────────────────────────────────────────
    const stats = {
      totalTrips: bookingIds.length,
      placesVisited: uniqueCities,
      wishlistItems: wishlistCount,
      reviewsWritten: reviewsCount,
    };

    // ── Weekly activity (bookings created per day this week) ──────────────────
    const weekStart = new Date();
    weekStart.setDate(weekStart.getDate() - weekStart.getDay());
    weekStart.setHours(0, 0, 0, 0);

    const weeklyRaw = await TourModel.aggregate([
      { $match: { _id: { $in: bookingIds }, createdAt: { $gte: weekStart } } },
      { $group: { _id: { $dayOfWeek: '$createdAt' }, count: { $sum: 1 } } },
    ]);

    const dayMap: Record<number, number> = {};
    weeklyRaw.forEach((d: any) => { dayMap[d._id] = d.count; });

    const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const maxCount = Math.max(...Object.values(dayMap), 1);
    const weeklyActivity = DAYS.map((day, i) => ({
      day,
      val: Math.round(((dayMap[i + 1] ?? 0) / maxCount) * 100) || 0,
      count: dayMap[i + 1] ?? 0,
    }));

    // ── Progress bars (derived from real stats) ───────────────────────────────
    const MAX_TRIPS = 20;
    const MAX_PLACES = 10;
    const MAX_WISHLIST = 10;
    const MAX_REVIEWS = 10;

    const progress = [
      { label: 'Destinations Explored', val: Math.min(Math.round((uniqueCities / MAX_PLACES) * 100), 100) },
      { label: 'Bookings Completed',    val: Math.min(Math.round((bookings.filter(b => b.status === 'completed').length / Math.max(bookingIds.length, 1)) * 100), 100) },
      { label: 'Wishlist Progress',     val: Math.min(Math.round((wishlistCount / MAX_WISHLIST) * 100), 100) },
      { label: 'Reviews Written',       val: Math.min(Math.round((reviewsCount / MAX_REVIEWS) * 100), 100) },
    ];

    // ── Travel time tracker ───────────────────────────────────────────────────
    const totalDays = tours.reduce((sum: number, t: any) => sum + (t.duration?.days ?? 1), 0);
    const goalDays = 30;
    const travelPct = Math.min(Math.round((totalDays / goalDays) * 100), 100);
    const travelTime = {
      travelled: `${totalDays}d`,
      remaining: `${Math.max(goalDays - totalDays, 0)}d`,
      pct: travelPct,
    };

    // ── Onboarding tasks ──────────────────────────────────────────────────────
    const onboarding = [
      { label: 'Complete profile setup',    done: !!(user.name && user.email) },
      { label: 'Book first tour package',   done: bookingIds.length > 0 },
      { label: 'Write a destination review',done: reviewsCount > 0 },
      { label: 'Add 5 places to wishlist',  done: wishlistCount >= 5 },
      { label: 'Explore 3 destinations',    done: uniqueCities >= 3 },
    ];

    // ── Upcoming schedule (next 3 upcoming bookings) ──────────────────────────
    const upcomingTours = tours.slice(0, 3);
    const TAGS = ['Upcoming', 'Confirmed', 'Pending'] as const;
    const COLORS = ['bg-emerald-500', 'bg-emerald-400', 'bg-slate-400'];
    const schedule = upcomingTours.map((t: any, i: number) => ({
      time: new Date(t.createdAt).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
      title: t.title,
      tag: TAGS[i % 3],
      color: COLORS[i % 3],
    }));

    return NextResponse.json({
      stats,
      bookings,
      wishlistItems: [],
      cartItems: [],
      weeklyActivity,
      progress,
      travelTime,
      onboarding,
      schedule,
    });
  } catch (err) {
    console.error('Dashboard API error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
