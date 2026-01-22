import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/authOptions';
import { getDbClient } from '@/lib/db';
import { ObjectId } from 'mongodb';

export async function GET(request: NextRequest) {
  console.log('Dashboard API called');
  try {
    const session = await getServerSession(authOptions);
    console.log('Session:', session?.user?.email);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const client = await getDbClient();
    const db = client.db();
    console.log('Database connected');
    
    // Find user by email
    let user = await db.collection('users').findOne(
      { email: session.user.email }
    );
    console.log('User found:', !!user);

    // If user doesn't exist, create one
    if (!user) {
      const newUser = {
        name: session.user.name,
        email: session.user.email,
        role: 'traveler',
        isVerified: true,
        accountStatus: 'active',
        bookingHistory: [],
        wishlist: [],
        cart: [],
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      const result = await db.collection('users').insertOne(newUser);
      user = { ...newUser, _id: result.insertedId };
      console.log('User created:', result.insertedId);
    }

    // Return basic user data
    const stats = {
      totalTrips: user.bookingHistory?.length || 0,
      placesVisited: 0,
      wishlistItems: user.wishlist?.length || 0,
      reviewsWritten: 0
    };

    return NextResponse.json({
      stats,
      bookings: [],
      wishlistItems: [],
      cartItems: []
    });

  } catch (error) {
    console.error('Dashboard API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}