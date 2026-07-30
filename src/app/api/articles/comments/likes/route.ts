import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { connectToDatabase } from '@/lib/mongo';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/authOptions';
import { ObjectId } from 'mongodb';

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { commentId } = await request.json();

    if (!commentId || !mongoose.isValidObjectId(commentId)) {
      return NextResponse.json({ error: 'Invalid comment ID' }, { status: 400 });
    }

    await connectToDatabase();
    
    // Use raw DB collection to bypass model import issues
    const commentsCollection = mongoose.connection.db!.collection('travelarticlecomments');
    
    // Find the comment first to see if the user already liked it
    const comment = await commentsCollection.findOne({ _id: new ObjectId(commentId) });
    
    if (!comment) {
      return NextResponse.json({ error: 'Comment not found' }, { status: 404 });
    }

    // Check if user has already liked the comment
    const userId = new ObjectId(session.user.id);
    const hasLiked = comment.likes?.some((like: any) => like.userId.toString() === userId.toString());

    if (hasLiked) {
      // Unlike: Remove the like object from the array
      await commentsCollection.updateOne(
        { _id: new ObjectId(commentId) },
        { $pull: { likes: { userId: userId } } as any }
      );
      return NextResponse.json({ success: true, liked: false });
    } else {
      // Like: Add the like object to the array
      await commentsCollection.updateOne(
        { _id: new ObjectId(commentId) },
        { $push: { likes: { userId: userId, likedAt: new Date() } } as any }
      );
      return NextResponse.json({ success: true, liked: true });
    }
  } catch (error) {
    console.error('Error toggling comment like:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
