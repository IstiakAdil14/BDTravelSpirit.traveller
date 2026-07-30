import { NextRequest, NextResponse } from 'next/server';
import { getDbClient } from '@/lib/db';
import { TravelerNotificationModel } from '@/models/notifications/traveler-notification.model';
import { USER_NOTIFICATION_TYPE, NOTIFICATION_PRIORITY } from '@/constants/notifications/customer-notification.const';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/authOptions';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized. Please log in first.' }, { status: 401 });
    }

    await getDbClient();
    
    // Clear old test notifications
    await TravelerNotificationModel.deleteMany({ recipient: session.user.id });

    const testNotifications = [
      {
        recipient: session.user.id,
        type: USER_NOTIFICATION_TYPE.NEW_TOUR,
        priority: NOTIFICATION_PRIORITY.NORMAL,
        title: 'New Tour Added: Sylhet Adventure!',
        message: 'A brand new 3-day adventure tour in Sylhet has just been added. Book early to get a 10% discount!',
        isRead: false,
      },
      {
        recipient: session.user.id,
        type: USER_NOTIFICATION_TYPE.BOOKING_REMINDER,
        priority: NOTIFICATION_PRIORITY.HIGH,
        title: 'Departure Reminder: Mahasthangarh',
        message: 'Your upcoming tour departs in exactly 3 days! Please ensure you have downloaded your voucher and reviewed the meeting point details.',
        isRead: false,
      },
      {
        recipient: session.user.id,
        type: USER_NOTIFICATION_TYPE.BOOKING_CONFIRMATION,
        priority: NOTIFICATION_PRIORITY.NORMAL,
        title: 'Booking Confirmed',
        message: 'Your booking for Cox\'s Bazar Relaxation Tour has been successfully confirmed. We look forward to hosting you!',
        isRead: true,
      }
    ];

    await TravelerNotificationModel.insertMany(testNotifications);

    return NextResponse.json({ success: true, message: 'Seeded test notifications' });
  } catch (error) {
    console.error('Error seeding notifications:', error);
    return NextResponse.json({ error: 'Failed to seed notifications' }, { status: 500 });
  }
}
