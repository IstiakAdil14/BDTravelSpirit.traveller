import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db/connect';
import BookingModel from '@/models/tours/booking.model';
import TourModel from '@/models/tours/tour.model';
import { BOOKING_STATUS, BOOKING_PAYMENT_STATUS } from '@/constants/booking/tour-booking.const';
import { Types } from 'mongoose';

// You can configure this endpoint to be hit by a cron service (like Vercel Cron, GitHub Actions, or AWS EventBridge)
export async function GET(req: NextRequest) {
  try {
    // Optional: Protect the cron job with a secret token
    const authHeader = req.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET;
    
    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();

    // 1. Find all expired PENDING bookings
    const expiredBookings = await BookingModel.find({
      status: BOOKING_STATUS.PENDING,
      expiresAt: { $lt: new Date() }
    });

    if (expiredBookings.length === 0) {
      return NextResponse.json({ message: 'No expired bookings found.' }, { status: 200 });
    }

    let cancelledCount = 0;

    for (const booking of expiredBookings) {
      try {
        // 2. Mark booking as cancelled
        booking.status = BOOKING_STATUS.CANCELLED;
        booking.payment.status = BOOKING_PAYMENT_STATUS.FAILED; 
        
        // Use generic cancellation payload satisfying strict ICancellation schema
        booking.cancellation = {
          cancelledAt: new Date(),
          reason: 'Booking expired due to non-payment',
          cancelledBy: new Types.ObjectId(), // System auto-cancellation
        };
        
        await booking.save();

        // 3. Release the seats on the Tour
        if (booking.tour && booking.totalParticipants) {
          await TourModel.updateOne(
            { _id: booking.tour },
            { $inc: { 'departure.seatsBooked': -booking.totalParticipants } }
          );
        }
        
        cancelledCount++;
      } catch (innerError) {
        console.error(`Failed to expire booking ${booking._id}:`, innerError);
      }
    }

    return NextResponse.json({ 
      message: `Successfully expired ${cancelledCount} bookings.`,
      cancelledCount 
    }, { status: 200 });

  } catch (error: any) {
    console.error('Cron job error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
