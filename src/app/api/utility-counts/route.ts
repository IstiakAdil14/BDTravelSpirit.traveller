export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/authOptions';
import { UserModel } from '@/models/user.model';
import { TravelerNotificationModel } from '@/models/notifications/traveler-notification.model';
import UserTourInteractionModel from '@/models/travelers/traveler-tour-interaction.model';
import { getDbClient } from '@/lib/db';
import { Types } from 'mongoose';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Validate ObjectId format
    if (!Types.ObjectId.isValid(session.user.id)) {
      return NextResponse.json({ error: 'Invalid user ID format' }, { status: 400 });
    }

    await getDbClient();

    const [userInteraction, unreadNotifications] = await Promise.all([
      UserTourInteractionModel.findOne({ user: session.user.id }).select('wishlist'),
      TravelerNotificationModel.countDocuments({
        recipient: session.user.id,
        isRead: false
      })
    ]);

    return NextResponse.json({
      wishlistCount: userInteraction?.wishlist?.length || 0,
      notificationCount: unreadNotifications || 0
    }, {
      headers: {
        'Cache-Control': 'no-store, max-age=0'
      }
    });

  } catch (error) {
    console.error('Error fetching utility counts:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}