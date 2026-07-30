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

    const { faqId, action } = await request.json(); // action can be 'like' or 'dislike'

    if (!faqId || !mongoose.isValidObjectId(faqId)) {
      return NextResponse.json({ error: 'Invalid FAQ ID' }, { status: 400 });
    }
    
    if (action !== 'like' && action !== 'dislike') {
      return NextResponse.json({ error: 'Invalid action. Must be "like" or "dislike".' }, { status: 400 });
    }

    await connectToDatabase();
    
    const travelerCollection = mongoose.connection.db!.collection('travelers');
    const traveler = await travelerCollection.findOne({ user: new ObjectId(session.user.id) });
    
    if (!traveler) {
      return NextResponse.json({ error: 'Traveler profile not found' }, { status: 404 });
    }

    const faqsCollection = mongoose.connection.db!.collection('tourfaqs');
    const faq = await faqsCollection.findOne({ _id: new ObjectId(faqId) });
    
    if (!faq) {
      return NextResponse.json({ error: 'FAQ not found' }, { status: 404 });
    }

    const travelerId = traveler._id;
    const arrayName = action === 'like' ? 'likes' : 'dislikes';
    const oppositeArrayName = action === 'like' ? 'dislikes' : 'likes';

    // 1. Check if they already performed this action
    const hasDoneAction = faq[arrayName]?.some((item: any) => item.user.toString() === travelerId.toString());

    // Prepare update operations
    const updateOps: any = { $pull: {}, $push: {} };

    // 2. Remove from opposite array if exists
    if (faq[oppositeArrayName]?.some((item: any) => item.user.toString() === travelerId.toString())) {
      updateOps.$pull[oppositeArrayName] = { user: travelerId };
    }

    if (hasDoneAction) {
      // Toggle off: Remove the action
      updateOps.$pull[arrayName] = { user: travelerId };
    } else {
      // Toggle on: Add the action
      updateOps.$push[arrayName] = { 
        _id: new ObjectId(),
        user: travelerId, 
        createdAt: new Date(), 
        deletedAt: null 
      };
    }

    // Clean up empty objects
    if (Object.keys(updateOps.$pull).length === 0) delete updateOps.$pull;
    if (Object.keys(updateOps.$push).length === 0) delete updateOps.$push;

    if (Object.keys(updateOps).length > 0) {
      await faqsCollection.updateOne(
        { _id: new ObjectId(faqId) },
        updateOps
      );
    }

    return NextResponse.json({ 
      success: true, 
      actionState: !hasDoneAction // true if they just added it, false if they just removed it
    });
  } catch (error) {
    console.error('Error toggling FAQ like/dislike:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
