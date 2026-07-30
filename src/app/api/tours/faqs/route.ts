import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { connectToDatabase } from '@/lib/mongo';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/authOptions';
import { ObjectId } from 'mongodb';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const tourId = searchParams.get('tourId');

    if (!tourId || !mongoose.isValidObjectId(tourId)) {
      return NextResponse.json({ error: 'Invalid tour ID' }, { status: 400 });
    }

    const session = await getServerSession(authOptions);
    const userId = session?.user?.id ? new ObjectId(session.user.id) : null;

    await connectToDatabase();
    const faqsCollection = mongoose.connection.db!.collection('tourfaqs');

    let travelerId = null;
    if (userId) {
      const traveler = await mongoose.connection.db!.collection('travelers').findOne({ user: userId });
      if (traveler) travelerId = traveler._id;
    }

    // Fetch approved FAQs
    const faqs = await faqsCollection.aggregate([
      { $match: { tour: new ObjectId(tourId), status: 'approved', isActive: true, deletedAt: null } },
      { $sort: { order: 1, createdAt: -1 } },
      {
        $lookup: {
          from: 'travelers',
          localField: 'askedBy',
          foreignField: '_id',
          as: 'askerData'
        }
      },
      {
        $unwind: {
          path: '$askerData',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $project: {
          _id: 1,
          question: 1,
          answer: 1,
          createdAt: 1,
          answeredAt: 1,
          askerName: '$askerData.name',
          likes: { $size: { $ifNull: ['$likes', []] } },
          dislikes: { $size: { $ifNull: ['$dislikes', []] } },
          hasLiked: travelerId 
            ? { $in: [travelerId, { $map: { input: { $ifNull: ['$likes', []] }, as: 'l', in: '$$l.user' } }] } 
            : false,
          hasDisliked: travelerId 
            ? { $in: [travelerId, { $map: { input: { $ifNull: ['$dislikes', []] }, as: 'd', in: '$$d.user' } }] } 
            : false,
        }
      }
    ]).toArray();

    return NextResponse.json({ faqs });
  } catch (error) {
    console.error('Error fetching Tour FAQs:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { tourId, question } = await request.json();

    if (!tourId || !mongoose.isValidObjectId(tourId)) {
      return NextResponse.json({ error: 'Invalid tour ID' }, { status: 400 });
    }
    if (!question || !question.trim()) {
      return NextResponse.json({ error: 'Question is required' }, { status: 400 });
    }

    await connectToDatabase();
    
    const travelerCollection = mongoose.connection.db!.collection('travelers');
    const traveler = await travelerCollection.findOne({ user: new ObjectId(session.user.id) });
    
    if (!traveler) {
      return NextResponse.json({ error: 'Traveler profile not found' }, { status: 404 });
    }

    const faqsCollection = mongoose.connection.db!.collection('tourfaqs');

    const newFaq = {
      tour: new ObjectId(tourId),
      askedBy: traveler._id,
      question: question.trim(),
      status: 'pending',
      isActive: true,
      deletedAt: null,
      likes: [],
      dislikes: [],
      reports: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await faqsCollection.insertOne(newFaq);

    return NextResponse.json({ 
      success: true, 
      faqId: result.insertedId.toString(),
      message: 'Question submitted successfully and is pending approval.'
    });
  } catch (error) {
    console.error('Error submitting Tour FAQ:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
