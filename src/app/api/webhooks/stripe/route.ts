import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { dbConnect } from '@/lib/db/connect';
import BookingModel from '@/models/tours/booking.model';
import TourModel from '@/models/tours/tour.model';
import { BOOKING_PAYMENT_STATUS, BOOKING_STATUS } from '@/constants/booking/tour-booking.const';
import { sendBookingConfirmationEmail } from '@/lib/email';
import mongoose, { Types } from 'mongoose';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req: NextRequest) {
  try {
    if (!webhookSecret) {
      console.error('Missing STRIPE_WEBHOOK_SECRET');
      return NextResponse.json({ error: 'Webhook secret missing' }, { status: 500 });
    }

    const payload = await req.text();
    const signature = req.headers.get('stripe-signature');

    if (!signature) {
      return NextResponse.json({ error: 'Missing stripe-signature' }, { status: 400 });
    }

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
    } catch (err: any) {
      console.error('Webhook signature verification failed:', err.message);
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    await dbConnect();

    // Event 1: Checkout Session Completed (Primary Fulfillment)
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      
      const bookingId = session.client_reference_id;
      if (!bookingId) {
        console.error('No client_reference_id in session:', session.id);
        return NextResponse.json({ received: true }, { status: 200 }); // Acknowledge to stop retries
      }

      // Fetch booking to verify state (Idempotency)
      const booking = await BookingModel.findById(bookingId).populate('tour').populate({
        path: 'traveler',
        populate: { path: 'user' }
      });

      if (!booking) {
        console.error('Booking not found for ID:', bookingId);
        return NextResponse.json({ received: true }, { status: 200 });
      }

      // IDEMPOTENCY: Ignore if already processed
      if (booking.status === BOOKING_STATUS.CONFIRMED || booking.payment.status === BOOKING_PAYMENT_STATUS.PAID) {
        console.log('Duplicate webhook skipped for booking:', bookingId);
        return NextResponse.json({ received: true }, { status: 200 });
      }

      // RACE CONDITION: Booking expired but user paid anyway
      if (booking.status === BOOKING_STATUS.CANCELLED) {
        console.log('Late payment on cancelled booking. Refunding intent:', session.payment_intent);
        if (session.payment_intent) {
          await stripe.refunds.create({ payment_intent: session.payment_intent as string });
          booking.payment.status = BOOKING_PAYMENT_STATUS.REFUNDED;
          booking.cancellation = {
            ...booking.cancellation,
            cancelledAt: booking.cancellation?.cancelledAt || new Date(),
            reason: booking.cancellation?.reason || 'Stripe System Auto-Refund',
            cancelledBy: booking.cancellation?.cancelledBy || new Types.ObjectId(),
            refundStatus: 'refunded',
            refundAmount: booking.totalPaid,
          };
          await booking.save();
        }
        return NextResponse.json({ received: true }, { status: 200 });
      }

      // SUCCESSFUL FULFILLMENT (Atomic Idempotent Update)
      if (booking.status === BOOKING_STATUS.PENDING) {
        const updatedBooking = await BookingModel.findOneAndUpdate(
          { _id: bookingId, status: BOOKING_STATUS.PENDING },
          {
            $set: {
              status: BOOKING_STATUS.CONFIRMED,
              'payment.status': BOOKING_PAYMENT_STATUS.PAID,
              'payment.transactionId': session.payment_intent as string,
            },
            $unset: { expiresAt: 1 }
          },
          { new: true }
        );

        if (!updatedBooking) {
          // Another thread beat us to it
          console.log('Atomic update bypassed: booking no longer PENDING.');
          return NextResponse.json({ received: true }, { status: 200 });
        }

        // --- RECORD TRANSACTION AND UPDATE ADMIN BALANCE (Raw MongoDB to avoid schema edits) ---
        const amountPaid = session.amount_total ? session.amount_total / 100 : updatedBooking.totalPaid;
        const currency = session.currency ? session.currency.toUpperCase() : 'BDT';
        
        try {
          await mongoose.connection.db!.collection('transactions').insertOne({
            stripePaymentIntentId: session.payment_intent as string,
            amount: amountPaid,
            currency: currency,
            bookingId: new Types.ObjectId(bookingId),
            userId: (booking.traveler as any)?.user?._id || null,
            status: 'CONFIRMED',
            type: 'PAYMENT',
            createdAt: new Date(),
            updatedAt: new Date()
          });

          await mongoose.connection.db!.collection('admin_balances').findOneAndUpdate(
            { type: 'PLATFORM' },
            { 
              $inc: { totalRevenue: amountPaid, availableBalance: amountPaid },
              $setOnInsert: { currency: currency, createdAt: new Date() },
              $set: { updatedAt: new Date() }
            },
            { upsert: true }
          );
        } catch (dbErr) {
          console.error('Failed to log transaction or admin balance:', dbErr);
        }
        // -------------------------------------------------------------------------------------

        // Trigger confirmation email
        try {
          const userEmail = (booking.traveler as any)?.user?.email;
          const tourTitle = (booking.tour as any)?.title || 'your tour';
          if (userEmail) {
            await sendBookingConfirmationEmail(userEmail, booking.bookingReference, tourTitle);
          }
        } catch (emailError) {
          console.error('Failed to send confirmation email:', emailError);
          // Don't fail the webhook if email fails
        }
      }
    }

    // Event 2: Charge Refunded (Native sync)
    if (event.type === 'charge.refunded') {
      const charge = event.data.object as Stripe.Charge;
      
      if (charge.payment_intent) {
        const booking = await BookingModel.findOne({ 'payment.transactionId': charge.payment_intent });
        if (booking && booking.status !== BOOKING_STATUS.REFUNDED) {
          booking.status = BOOKING_STATUS.REFUNDED;
          booking.payment.status = BOOKING_PAYMENT_STATUS.REFUNDED;
          // Extract metadata from the most recent refund object
          const refundData = charge.refunds?.data?.[0];
          const cancelledByMetadata = refundData?.metadata?.cancelledBy;
          const reasonMetadata = refundData?.metadata?.reason;

          booking.cancellation = {
            ...booking.cancellation,
            cancelledAt: booking.cancellation?.cancelledAt || new Date(),
            reason: reasonMetadata || booking.cancellation?.reason || 'Stripe System Auto-Refund',
            cancelledBy: cancelledByMetadata ? new Types.ObjectId(cancelledByMetadata) : (booking.cancellation?.cancelledBy || new Types.ObjectId()),
            refundStatus: 'refunded',
            refundAmount: charge.amount_refunded / 100, // Convert cents to base
          };
          await booking.save();
          
          // Release seats if booking was previously confirmed
          if (booking.tour && booking.totalParticipants) {
             await TourModel.updateOne(
                { _id: booking.tour },
                { $inc: { 'departure.seatsBooked': -booking.totalParticipants } }
             );
          }

          // --- RECORD REFUND TRANSACTION AND UPDATE ADMIN BALANCE (Raw MongoDB) ---
          const refundAmount = charge.amount_refunded / 100;
          try {
            await mongoose.connection.db!.collection('transactions').insertOne({
              stripePaymentIntentId: charge.payment_intent as string,
              amount: refundAmount,
              currency: charge.currency.toUpperCase(),
              bookingId: booking._id,
              userId: (booking.traveler as any)?.user || null,
              status: 'REFUNDED',
              type: 'REFUND',
              createdAt: new Date(),
              updatedAt: new Date()
            });

            await mongoose.connection.db!.collection('admin_balances').findOneAndUpdate(
              { type: 'PLATFORM' },
              { 
                $inc: { availableBalance: -refundAmount },
                $set: { updatedAt: new Date() }
              },
              { upsert: true }
            );
          } catch (dbErr) {
            console.error('Failed to log refund transaction or admin balance:', dbErr);
          }
          // ------------------------------------------------------------------------
        }
      }
    }

    // Ignore other events safely
    return NextResponse.json({ received: true }, { status: 200 });

  } catch (err: any) {
    console.error('Stripe Webhook Error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
