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
    const userId = session?.user?.id ? new ObjectId(session.user.id) : null;

    await connectToDatabase();
    
    // Use raw DB collection to bypass model import issues
    const collection = mongoose.connection.db!.collection('travelarticlecomments');
    
    // Fetch comments and lookup author details
    const comments = await collection.aggregate([
      { $match: { articleId: new ObjectId(articleId), status: 'approved', deleted: false } },
      { $sort: { createdAt: -1 } },
      {
        $lookup: {
          from: 'users',
          localField: 'author',
          foreignField: '_id',
          as: 'authorData'
        }
      },
      { $unwind: '$authorData' },
      {
        $lookup: {
          from: 'assets',
          localField: 'authorData.avatar',
          foreignField: '_id',
          as: 'avatarAsset'
        }
      },
      {
        $unwind: {
          path: '$avatarAsset',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: 'assetfiles',
          localField: 'avatarAsset.file',
          foreignField: '_id',
          as: 'avatarFile'
        }
      },
      {
        $unwind: {
          path: '$avatarFile',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $project: {
          _id: 1,
          content: 1,
          createdAt: 1,
          parentId: 1,
          likes: 1, // Keep the full likes array to check for user inclusion
          likeCount: { $size: { $ifNull: ['$likes', []] } },
          'authorData.name': 1,
          'authorData.avatarUrl': '$avatarFile.publicUrl'
        }
      }
    ]).toArray();

    // Map to a friendlier format for the frontend
    const mapped = comments.map(c => {
      const hasLiked = userId ? c.likes?.some((like: any) => like.userId.toString() === userId.toString()) : false;
      
      return {
        id: c._id.toString(),
        parentId: c.parentId ? c.parentId.toString() : null,
        author: c.authorData.name || 'Unknown Author',
        avatar: c.authorData.avatarUrl || null,
        text: c.content,
        date: new Date(c.createdAt).toLocaleDateString(),
        likes: c.likeCount || 0,
        hasLiked: !!hasLiked
      };
    });

    return NextResponse.json({ comments: mapped });
  } catch (error) {
    console.error('Error fetching comments:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    console.log('[POST /api/articles/comments] Request body:', body);
    const { articleId, content, parentId } = body;

    if (!articleId) {
      return NextResponse.json({ error: 'Missing articleId' }, { status: 400 });
    }
    if (!mongoose.isValidObjectId(articleId)) {
      return NextResponse.json({ error: `Invalid articleId: ${articleId}` }, { status: 400 });
    }
    if (parentId && !mongoose.isValidObjectId(parentId)) {
      return NextResponse.json({ error: `Invalid parentId: ${parentId}` }, { status: 400 });
    }
    if (!content || !content.trim()) {
      return NextResponse.json({ error: 'Missing or empty content' }, { status: 400 });
    }

    await connectToDatabase();
    
    // Use raw DB collection to bypass model import issues
    const collection = mongoose.connection.db!.collection('travelarticlecomments');
    
    const newComment = {
      articleId: new ObjectId(articleId),
      author: new ObjectId(session.user.id),
      parentId: parentId ? new ObjectId(parentId) : null,
      content: content.trim(),
      status: 'approved',
      deleted: false,
      likes: [],
      replies: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await collection.insertOne(newComment);
    
    // If it's a reply, add this comment ID to the parent's replies array
    if (parentId) {
      await collection.updateOne(
        { _id: new ObjectId(parentId) },
        { $push: { replies: result.insertedId } as any }
      );
    }
    
    return NextResponse.json({ 
      success: true, 
      commentId: result.insertedId.toString() 
    });
  } catch (error) {
    console.error('Error saving comment:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
