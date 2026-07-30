import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/authOptions';
import { dbConnect } from '@/lib/db/connect';
import BookingModel from '@/models/tours/booking.model';
import TourModel from '@/models/tours/tour.model';
import { BOOKING_STATUS, BOOKING_PAYMENT_STATUS } from '@/constants/booking/tour-booking.const';
import Stripe from 'stripe';
import { Types } from 'mongoose';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const session = await getServerSession(authOptions);
    
    // Ensure the user is an admin
    if (!session?.user?.id || !['admin', 'super_admin'].includes((session.user as any).role?.toLowerCase())) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();

    const booking = await BookingModel.findById(id);
    if (!booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    if (booking.status === BOOKING_STATUS.REFUNDED) {
      return NextResponse.json({ error: 'Booking already refunded' }, { status: 400 });
    }

    // Process Stripe Refund if it was a Stripe payment
    if (booking.payment.method === 'stripe' || booking.payment.method === 'card') {
      if (booking.payment.transactionId && booking.payment.status === BOOKING_PAYMENT_STATUS.PAID) {
        try {
          await stripe.refunds.create({
            payment_intent: booking.payment.transactionId,
          });
        } catch (stripeError: any) {
          console.error('Stripe refund failed:', stripeError);
          return NextResponse.json({ error: `Stripe refund failed: ${stripeError.message}` }, { status: 500 });
        }
      } else {
        return NextResponse.json({ error: 'Cannot refund a Stripe booking that is not PAID or missing a transaction ID.' }, { status: 400 });
      }
    }

    const wasConfirmed = booking.status === BOOKING_STATUS.CONFIRMED;

    // Update DB
    booking.status = BOOKING_STATUS.REFUNDED;
    booking.payment.status = BOOKING_PAYMENT_STATUS.REFUNDED;
    booking.cancellation = {
      cancelledAt: new Date(),
      reason: 'Admin requested manual refund',
      cancelledBy: new Types.ObjectId(session.user.id),
      refundAmount: booking.totalPaid,
      refundStatus: BOOKING_PAYMENT_STATUS.REFUNDED
    };

    await booking.save();

    // Release seats if the booking was previously holding them
    if (wasConfirmed && booking.tour && booking.totalParticipants) {
      await TourModel.updateOne(
        { _id: booking.tour },
        { $inc: { 'departure.seatsBooked': -booking.totalParticipants } }
      );
    }

    return NextResponse.json({ message: 'Refund processed successfully', booking }, { status: 200 });

  } catch (error: any) {
    console.error('Admin Refund Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
