import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { connectToDatabase } from '@/lib/mongo';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/authOptions';
import { ObjectId } from 'mongodb';

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const requestedTravelerId = searchParams.get('travelerId');

    let targetUserId = session.user.id;

    // If admin requests a specific traveler's chat
    if (session.user.role === 'admin' && requestedTravelerId) {
      targetUserId = requestedTravelerId;
    }

    await connectToDatabase();
    const chatCollection = mongoose.connection.db!.collection('chatmessages');

    // Fetch messages where this user is either sender or receiver
    const messages = await chatCollection.find({
      $or: [
        { sender: new ObjectId(targetUserId) },
        { receiver: new ObjectId(targetUserId) }
      ],
      isDeletedBySender: false,
      isDeletedByReceiver: false
    })
    .sort({ timestamp: 1 })
    .toArray();

    return NextResponse.json({ messages });
  } catch (error) {
    console.error('Error fetching chat history:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();
    const chatCollection = mongoose.connection.db!.collection('chatmessages');

    // Admin fetching list of recent chats
    const pipeline = [
      {
        $group: {
          _id: {
            // Group by the traveler (who is not the admin)
            $cond: [
              { $eq: ["$sender", new ObjectId(session.user.id)] },
              "$receiver",
              "$sender"
            ]
          },
          lastMessage: { $last: "$message" },
          lastTimestamp: { $last: "$timestamp" },
          unreadCount: {
            $sum: {
              $cond: [
                { $and: [{ $eq: ["$receiver", new ObjectId(session.user.id)] }, { $eq: ["$isRead", false] }] },
                1,
                0
              ]
            }
          }
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user"
        }
      },
      { $unwind: "$user" },
      { $sort: { lastTimestamp: -1 } },
      {
        $project: {
          _id: 1,
          lastMessage: 1,
          lastTimestamp: 1,
          unreadCount: 1,
          "user.name": 1,
          "user.image": 1,
          "user.email": 1
        }
      }
    ];

    const activeChats = await chatCollection.aggregate(pipeline).toArray();

    return NextResponse.json({ activeChats });
  } catch (error) {
    console.error('Error fetching active chats:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
