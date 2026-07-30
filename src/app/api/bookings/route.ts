import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/authOptions';
import { dbConnect } from '@/lib/db/connect';
import BookingModel from '@/models/tours/booking.model';
import TourModel from '@/models/tours/tour.model';
import { TravelerModel } from '@/models/travelers/traveler.model';
import { Types } from 'mongoose';
import { BOOKING_PAYMENT_STATUS, BOOKING_STATUS } from '@/constants/booking/tour-booking.const';
import { TransactionModel } from '@/models/payments/transaction.model';
import { TRANSACTION_STATUS } from '@/constants/payment/transaction.const';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
import { READ_ONLY_EMAILS, USER_ROLE } from '@/constants/user/user.const';
import { getUserDashboardPath } from '@/lib/utils/userRouting';
import { sendBookingConfirmationEmail } from '@/lib/email';

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (session.user.email && READ_ONLY_EMAILS.includes(session.user.email)) {
      return NextResponse.json({ error: 'Read-only users cannot perform this action.' }, { status: 403 });
    }

    const { tourId, totalParticipants, paymentMethod, savedPaymentMethodId } = await req.json();

    if (!tourId || !totalParticipants || !paymentMethod) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    await dbConnect();

    const traveler = await TravelerModel.findOne({ user: new Types.ObjectId(session.user.id) });
    if (!traveler) {
      return NextResponse.json({ error: 'Traveler profile not found' }, { status: 404 });
    }

    const tour = await TourModel.findById(tourId);
    if (!tour) {
      return NextResponse.json({ error: 'Tour not found' }, { status: 404 });
    }

    // 1. Atomic Seat Reservation Protection
    const seatsTotal = tour.departure?.seatsTotal;
    let tourUpdate;

    if (seatsTotal != null && seatsTotal > 0) {
      tourUpdate = await TourModel.updateOne(
        { 
          _id: tourId, 
          $expr: { $gte: ["$departure.seatsTotal", { $add: [{ $ifNull: ["$departure.seatsBooked", 0] }, totalParticipants] }] } 
        },
        { $inc: { 'departure.seatsBooked': totalParticipants } }
      );
    } else {
      // Unlimited seats or no seatsTotal defined
      tourUpdate = await TourModel.updateOne(
        { _id: tourId },
        { $inc: { 'departure.seatsBooked': totalParticipants } }
      );
    }

    if (tourUpdate.modifiedCount === 0) {
      return NextResponse.json({ error: 'Not enough seats available. Sold out!' }, { status: 400 });
    }

    let bookingId = null;

    try {
      const baseAmount = tour.basePrice.amount * totalParticipants;

      // Apply active discounts
      let discountAmount = 0;
      const appliedDiscounts: any[] = [];
      const now = new Date();
      for (const d of tour.discounts ?? []) {
        const valid =
          (!d.validFrom || d.validFrom <= now) && (!d.validUntil || d.validUntil >= now);
        if (!valid) continue;
        const val =
          d.type === 'percentage' ? Math.round((baseAmount * d.value) / 100) : d.value;
        discountAmount += val;
        appliedDiscounts.push({ type: d.type, discount: d.discount, value: d.value });
      }

      const totalPaid = Math.max(0, baseAmount - discountAmount);

      const count = await BookingModel.countDocuments();
      const bookingReference = `BKG${String(count + 1).padStart(6, '0')}`;

      // 2. Create Booking
      const booking = await BookingModel.create({
        bookingReference,
        uniqueTourCode: tour.uniqueTourCode,
        traveler: traveler._id,
        tour: tour._id,
        totalParticipants,
        discounts: appliedDiscounts,
        totalPaid,
        payment: {
          method: paymentMethod,
          status: BOOKING_PAYMENT_STATUS.PENDING,
        },
        status: BOOKING_STATUS.PENDING,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // Note: UI logic expects 24h for now
        bookedAt: new Date(),
      });

      bookingId = booking._id;

      let checkoutUrl = undefined;

      // 3. Create Stripe Checkout Session (if requested)
      if (['stripe', 'card'].includes(paymentMethod)) {
        if (savedPaymentMethodId) {
          // Mock successful direct charge for saved payment method
          const transaction = await TransactionModel.create({
            paymentAccountId: new Types.ObjectId(savedPaymentMethodId),
            stripePaymentIntentId: `pi_mock_${bookingId}_${Date.now()}`,
            amount: totalPaid,
            currency: 'bdt',
            status: TRANSACTION_STATUS.SUCCEEDED,
            description: `Payment for booking ${bookingReference}`,
          });

          await BookingModel.updateOne(
            { _id: bookingId },
            { 
              $set: { 
                'payment.status': BOOKING_PAYMENT_STATUS.PAID,
                status: BOOKING_STATUS.CONFIRMED,
                transactionId: transaction._id
              } 
            }
          );
        } else {
          const domain = process.env.NEXT_PUBLIC_APP_URL || process.env.DOMAIN || 'http://localhost:3000';
          
          const stripeSession = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
              {
                price_data: {
                  currency: tour.basePrice.currency.toLowerCase(),
                  product_data: {
                    name: tour.title,
                    description: `Booking Ref: ${bookingReference} | Participants: ${totalParticipants}`,
                  },
                  unit_amount: Math.round(totalPaid * 100), // Amount in cents
                },
                quantity: 1,
              },
            ],
            mode: 'payment',
            success_url: `${domain}${getUserDashboardPath(session.user.id, USER_ROLE.TRAVELER)}&page=bookings&success=true`,
            cancel_url: `${domain}/tours/${tour.slug}?canceled=true`,
            client_reference_id: String(booking._id),
            expires_at: Math.floor(Date.now() / 1000) + (30 * 60), // Expires in 30 mins
          });
          
          checkoutUrl = stripeSession.url;
        }
      }

      // 4. Send Email Confirmation
      if (session.user.email) {
        try {
          await sendBookingConfirmationEmail(
            session.user.email,
            booking.bookingReference,
            tour.title,
            {
              totalParticipants,
              totalPaid,
              currency: tour.basePrice?.currency || '৳',
            }
          );
        } catch (emailErr) {
          console.error('[POST /api/bookings] Failed to send confirmation email', emailErr);
          // Non-blocking error, so we continue to return success
        }
      }


      return NextResponse.json(
        {
          bookingReference: booking.bookingReference,
          status: booking.status,
          totalPaid: booking.totalPaid,
          checkoutUrl,
        },
        { status: 201 }
      );

    } catch (innerError: unknown) {
      // 4. Manual Rollback Protection (Crash-safe)
      const rollbackTasks = [];
      if (bookingId) rollbackTasks.push(BookingModel.deleteOne({ _id: bookingId }));
      rollbackTasks.push(
        TourModel.updateOne({ _id: tourId }, { $inc: { 'departure.seatsBooked': -totalParticipants } })
      );
      
      await Promise.allSettled(rollbackTasks);
      throw innerError;
    }

  } catch (err: unknown) {
    console.error('[POST /api/bookings]', err);
    const errorMessage = err instanceof Error ? err.message : 'Internal server error';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
