import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/authOptions';
import { dbConnect } from '@/lib/db/connect';
import { UserModel } from '@/models/user.model';
import { ReviewModel } from '@/models/tours/review.model';
import mongoose from 'mongoose';
import BookingModel from '@/models/tours/booking.model';
import { TravelerModel } from '@/models/travelers/traveler.model';
import UserTourInteractionModel from '@/models/travelers/traveler-tour-interaction.model';

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
        // Provide a complex dummy password to pass strict validation for OAuth users
        password: Math.random().toString(36).slice(-8) + 'A1!a',
      });
    }

    const userId = user._id as mongoose.Types.ObjectId;

    // ── Core counts ──────────────────────────────────────────────────────────
    const reviewsCount = await ReviewModel.countDocuments({ user: userId });
    
    const assetFilePopulate = { path: 'file', select: 'publicUrl' };

    const userInteraction = await UserTourInteractionModel.findOne({ user: userId })
      .populate({
        path: 'wishlist.tour',
        select: 'title slug mainLocation basePrice heroImage seo destinations',
        populate: [
          { path: 'heroImage', populate: assetFilePopulate },
          { path: 'destinations.images', populate: assetFilePopulate }
        ]
      })
      .lean();

    const wishlistItemsRaw = (userInteraction?.wishlist || []).map((w: any) => w.tour).filter(Boolean) as any[];
    const wishlistCount = wishlistItemsRaw.length;
    
    const getAssetUrl = (asset: any) => asset?.file?.publicUrl || asset?.publicUrl || '';

    const wishlistItems = wishlistItemsRaw.map(t => {
      const destImgs = t.destinations?.flatMap((d: any) => d.images?.filter(Boolean) || []) || [];
      return {
        id: t._id.toString(),
        slug: t.slug,
        name: t.title,
        location: [t.mainLocation?.address?.city, t.mainLocation?.address?.district].filter(Boolean).join(', ') || 'Bangladesh',
        price: `৳${(t.basePrice?.amount ?? 0).toLocaleString()}`,
        image: getAssetUrl(t.heroImage) || t.seo?.ogImage || getAssetUrl(destImgs[0]) || '',
      };
    });

    const cartItemsRaw = [] as any[]; // Cart removed since it's not in the schema
    const cartItems = cartItemsRaw.map(t => {
      const destImgs = t.destinations?.flatMap((d: any) => d.images?.filter(Boolean) || []) || [];
      return {
        id: t._id.toString(),
        slug: t.slug,
        name: t.title,
        location: [t.mainLocation?.address?.city, t.mainLocation?.address?.district].filter(Boolean).join(', ') || 'Bangladesh',
        price: `৳${(t.basePrice?.amount ?? 0).toLocaleString()}`,
        image: getAssetUrl(t.heroImage) || t.seo?.ogImage || getAssetUrl(destImgs[0]) || '',
      };
    });
    
    const traveler = await TravelerModel.findOne({ user: userId });
    const bookingDocs = traveler ? await BookingModel.find({ traveler: traveler._id }).populate('tour').lean() : [];
    
    const tours = bookingDocs.map((b: any) => b.tour).filter(Boolean);
    const bookingIds = tours.map((t: any) => t._id as mongoose.Types.ObjectId);

    const uniqueCities = new Set(tours.map((t: any) => t.mainLocation?.address?.city).filter(Boolean)).size;

    // ── Bookings list ─────────────────────────────────────────────────────────
    const bookings = bookingDocs.map((b: any) => {
      const tour = b.tour;
      return {
        id: b.bookingReference || b._id.toString().slice(-6).toUpperCase(),
        title: tour?.title || 'Unknown Tour',
        location: [tour?.mainLocation?.address?.city, tour?.mainLocation?.address?.district]
          .filter(Boolean).join(', ') || 'Bangladesh',
        date: new Date(b.bookedAt || tour?.createdAt || Date.now()).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
        status: b.status || 'upcoming',
        price: `৳${(b.totalPaid || tour?.basePrice?.amount || 0).toLocaleString()}`,
        duration: tour?.duration?.days ? `${tour.duration.days}D/${tour.duration.nights ?? 0}N` : '1D',
      };
    });

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

    const weeklyRaw = bookingDocs.filter((b: any) => {
      const date = new Date(b.bookedAt || Date.now());
      return date >= weekStart;
    }).reduce((acc: Record<number, number>, b: any) => {
      const day = new Date(b.bookedAt || Date.now()).getDay() + 1; // 1 (Sun) to 7 (Sat)
      acc[day] = (acc[day] || 0) + 1;
      return acc;
    }, {});

    const dayMap: Record<number, number> = weeklyRaw;

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
      { label: 'Bookings Completed',    val: Math.min(Math.round((bookings.filter((b: any) => b.status === 'completed').length / Math.max(bookingIds.length, 1)) * 100), 100) },
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

    // ── Stripe Accounts ───────────────────────────────────────────────────────
    const StripePaymentAccountModel = (await import('@/models/payments/payment-account.model')).default;
    const stripeAccountsRaw = await StripePaymentAccountModel.find({
      ownerId: userId,
      isDeleted: false,
    }).lean();

    const stripeAccounts = stripeAccountsRaw.map((acc: any) => ({
      id: acc._id.toString(),
      label: acc.label || `${acc.card?.brand || 'Card'} ending in ${acc.card?.last4 || '****'}`,
      stripeCustomerId: acc.stripeCustomerId,
      stripePaymentMethodId: acc.stripePaymentMethodId,
      card: acc.card,
      isActive: acc.isActive,
      isBackup: acc.isBackup,
    }));

    return NextResponse.json({
      stats,
      bookings,
      wishlistItems,
      cartItems,
      weeklyActivity,
      progress,
      travelTime,
      onboarding,
      schedule,
      stripeAccounts,
    });
  } catch (err) {
    console.error('Dashboard API error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
