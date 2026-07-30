import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/authOptions';
import { TravelerNotificationModel } from '@/models/notifications/traveler-notification.model';
import BookingModel from '@/models/tours/booking.model';
import { TravelerModel } from '@/models/travelers/traveler.model';
import { dbConnect } from '@/lib/db/connect';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    await dbConnect();
    
    // Dynamically generate user-related notifications for bookings
    const traveler = await TravelerModel.findOne({ user: session.user.id });
    if (traveler) {
      const bookings = await BookingModel.find({ traveler: traveler._id }).populate('tour').lean();
      
      for (const booking of bookings) {
        const tour = booking.tour as any;
        const tourName = tour?.title || 'your tour';
        
        if (booking.status === 'pending' || booking.status === 'confirmed') {
          await TravelerNotificationModel.updateOne(
            { 
              recipient: session.user.id,
              relatedId: booking._id,
              type: 'booking_reminder'
            },
            {
              $setOnInsert: {
                recipient: session.user.id,
                type: 'booking_reminder',
                priority: 'high',
                title: 'Upcoming Tour Reminder',
                message: `Your booking for "${tourName}" is confirmed and coming up! Please check your departure time.`,
                link: '/dashboard?page=bookings',
                relatedModel: 'Booking',
                relatedId: booking._id,
                isRead: false
              }
            },
            { upsert: true }
          );
        } else if (booking.status === 'completed') {
           await TravelerNotificationModel.updateOne(
            { 
              recipient: session.user.id,
              relatedId: booking._id,
              type: 'system_alert'
            },
            {
              $setOnInsert: {
                recipient: session.user.id,
                type: 'system_alert',
                priority: 'normal',
                title: 'Tour Completed',
                message: `Hope you enjoyed "${tourName}"! We'd love to hear your feedback in the reviews.`,
                link: '/dashboard?page=reviews',
                relatedModel: 'Booking',
                relatedId: booking._id,
                isRead: false
              }
            },
            { upsert: true }
          );
        }
      }
    }
    
    const notifications = await TravelerNotificationModel.find({ recipient: session.user.id })
      .sort({ createdAt: -1 })
      .limit(20);
      
    return NextResponse.json(notifications);
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    await dbConnect();
    
    const body = await request.json();
    
    if (body.action === 'mark_all_read') {
      await TravelerNotificationModel.updateMany(
        { recipient: session.user.id, isRead: false },
        { $set: { isRead: true, readAt: new Date() } }
      );
    } else if (body.notificationId) {
      await TravelerNotificationModel.updateOne(
        { _id: body.notificationId, recipient: session.user.id },
        { $set: { isRead: true, readAt: new Date() } }
      );
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating notifications:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
