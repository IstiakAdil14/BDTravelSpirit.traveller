import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/authOptions';
import { dbConnect } from '@/lib/db/connect';
import BookingModel from '@/models/tours/booking.model';
import TourModel from '@/models/tours/tour.model';
import { TravelerModel } from '@/models/travelers/traveler.model';
import { Types } from 'mongoose';
import { BOOKING_PAYMENT_STATUS, BOOKING_STATUS, DEFAULT_CANCELLATION_RULES } from '@/constants/booking/tour-booking.const';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { reason } = await req.json();
    const resolvedParams = await params;
    const bookingId = resolvedParams.id;

    await dbConnect();

    // 1. Fetch booking with populated tour (Handle both ObjectId and bookingReference)
    const isObjectId = Types.ObjectId.isValid(bookingId) && String(new Types.ObjectId(bookingId)) === bookingId;
    const query = isObjectId ? { _id: bookingId } : { bookingReference: bookingId };
    
    const booking = await BookingModel.findOne(query).populate('tour');
    if (!booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    if ([BOOKING_STATUS.CANCELLED, BOOKING_STATUS.REFUNDED].includes(booking.status as BOOKING_STATUS)) {
      return NextResponse.json({ error: 'Booking is already cancelled or refunded' }, { status: 400 });
    }

    // 2. Security Check (Traveler ownership)
    const traveler = await TravelerModel.findOne({ user: new Types.ObjectId(session.user.id) });
    if (!traveler || booking.traveler.toString() !== traveler._id.toString()) {
      return NextResponse.json({ error: 'Forbidden. You do not own this booking.' }, { status: 403 });
    }

    const tour: any = booking.tour;
    const departureDate = tour.departure?.date || tour.operatingWindow?.startDate;
    
    if (!departureDate) {
      return NextResponse.json({ error: 'Tour has no valid departure date' }, { status: 400 });
    }

    // 3. Dynamic Refund Calculation
    const msPerDay = 1000 * 60 * 60 * 24;
    const daysLeft = Math.floor((new Date(departureDate).getTime() - Date.now()) / msPerDay);

    let refundPercent = 0;
    if (tour.cancellationPolicy?.refundable !== false) {
      // Default to refundable if undefined, and use default rules if empty
      const rules = tour.cancellationPolicy?.rules?.length 
        ? tour.cancellationPolicy.rules 
        : DEFAULT_CANCELLATION_RULES;
        
      // Sort descending to find the closest applicable rule (e.g. 7 days before, 3 days before)
      const applicableRule = rules
        .slice()
        .sort((a: any, b: any) => b.daysBefore - a.daysBefore)
        .find((rule: any) => daysLeft >= rule.daysBefore);
      
      if (applicableRule) {
        refundPercent = applicableRule.refundPercent;
      }
    }

    const refundAmount = Math.max(0, (booking.totalPaid * refundPercent) / 100);

    // 4. Scenario A: Stripe payment with > 0% refund
    if (['stripe', 'card'].includes(booking.payment.method) && refundAmount > 0 && booking.payment.transactionId) {
      // Trigger Stripe refund
      await stripe.refunds.create({
        payment_intent: booking.payment.transactionId,
        amount: Math.round(refundAmount * 100),
        metadata: {
          cancelledBy: session.user.id,
          reason: reason || 'User requested cancellation',
        }
      });
      
      // Let the webhook handle the database updates asynchronously
      return NextResponse.json({ 
        message: 'Cancellation initiated. Refund is processing via Stripe.',
        refundAmount
      }, { status: 200 });
    }

    // 5. Scenario B: Cash payment OR 0% refund OR missing transaction ID
    booking.status = BOOKING_STATUS.CANCELLED;
    booking.cancellation = {
      cancelledAt: new Date(),
      reason: reason || 'User requested cancellation',
      cancelledBy: new Types.ObjectId(session.user.id),
      refundAmount: refundAmount,
      refundStatus: refundAmount > 0 ? BOOKING_PAYMENT_STATUS.PENDING : BOOKING_PAYMENT_STATUS.REFUNDED,
    };
    await booking.save();

    // Release seats
    if (tour._id && booking.totalParticipants) {
      await TourModel.updateOne(
        { _id: tour._id },
        { $inc: { 'departure.seatsBooked': -booking.totalParticipants } }
      );
    }

    return NextResponse.json({ 
      message: 'Booking cancelled successfully.',
      refundAmount
    }, { status: 200 });

  } catch (err: unknown) {
    console.error('[POST /api/bookings/:id/cancel]', err);
    const errorMessage = err instanceof Error ? err.message : 'Internal server error';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
