import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { connectToDatabase } from '@/lib/mongo';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/authOptions';
import { ObjectId } from 'mongodb';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const articleId = searchParams.get('articleId');

    if (!articleId || !mongoose.isValidObjectId(articleId)) {
      return NextResponse.json({ error: 'Invalid article ID' }, { status: 400 });
    }

    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ liked: false }); // Guests haven't liked anything
    }

    await connectToDatabase();
    
    // Find the traveler ID for this user
    const travelerCollection = mongoose.connection.db!.collection('travelers');
    const traveler = await travelerCollection.findOne({ user: new ObjectId(session.user.id) });
    
    if (!traveler) {
      return NextResponse.json({ liked: false });
    }

    // Check interaction events for a like
    const eventsCollection = mongoose.connection.db!.collection('interactionevents');
    const likeEvent = await eventsCollection.findOne({
      user: traveler._id,
      article: new ObjectId(articleId),
      type: 'like_article'
    });

    return NextResponse.json({ liked: !!likeEvent });
  } catch (error) {
    console.error('Error fetching article like status:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { articleId } = await request.json();

    if (!articleId || !mongoose.isValidObjectId(articleId)) {
      return NextResponse.json({ error: 'Invalid article ID' }, { status: 400 });
    }

    await connectToDatabase();
    
    // Find the traveler ID for this user
    const travelerCollection = mongoose.connection.db!.collection('travelers');
    const traveler = await travelerCollection.findOne({ user: new ObjectId(session.user.id) });
    
    if (!traveler) {
      return NextResponse.json({ error: 'Traveler profile not found' }, { status: 404 });
    }

    const eventsCollection = mongoose.connection.db!.collection('interactionevents');
    const articlesCollection = mongoose.connection.db!.collection('travelarticles');

    const query = {
      user: traveler._id,
      article: new ObjectId(articleId),
      type: 'like_article'
    };

    const existingLike = await eventsCollection.findOne(query);

    if (existingLike) {
      // Unlike: Remove event and decrement count
      await eventsCollection.deleteOne({ _id: existingLike._id });
      await articlesCollection.updateOne(
        { _id: new ObjectId(articleId) },
        { $inc: { likeCount: -1 } }
      );
      return NextResponse.json({ success: true, liked: false });
    } else {
      // Like: Insert event and increment count
      await eventsCollection.insertOne({
        ...query,
        createdAt: new Date()
      });
      await articlesCollection.updateOne(
        { _id: new ObjectId(articleId) },
        { $inc: { likeCount: 1 } }
      );
      return NextResponse.json({ success: true, liked: true });
    }
  } catch (error) {
    console.error('Error toggling article like:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
