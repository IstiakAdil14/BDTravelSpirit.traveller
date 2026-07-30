import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/authOptions';
import UserTourInteractionModel from '@/models/travelers/traveler-tour-interaction.model';
import { getDbClient } from '@/lib/db';
import { Types } from 'mongoose';

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await getDbClient();
    const interaction = await UserTourInteractionModel.findOne({ user: session.user.id }).lean();
    
    return NextResponse.json({
      wishlistIds: interaction?.wishlist?.map((item: any) => item.tour?.toString()) || []
    });
  } catch (error) {
    console.error('Wishlist GET error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { tourId } = await req.json();
    if (!tourId) {
      return NextResponse.json({ error: 'Tour ID is required' }, { status: 400 });
    }

    await getDbClient();

    let interaction = await UserTourInteractionModel.findOne({ user: session.user.id });
    
    if (!interaction) {
      interaction = await UserTourInteractionModel.create({
        user: session.user.id,
        wishlist: [{ tour: tourId }]
      });
      return NextResponse.json({ isWishlisted: true, message: 'Added to wishlist' });
    }

    const tourObjectId = new Types.ObjectId(tourId);
    const index = interaction.wishlist.findIndex((item: any) => item.tour?.toString() === tourId);

    if (index !== -1) {
      // Remove it
      interaction.wishlist.splice(index, 1);
      await interaction.save();
      return NextResponse.json({ isWishlisted: false, message: 'Removed from wishlist' });
    } else {
      // Add it
      interaction.wishlist.push({ tour: tourObjectId } as any);
      await interaction.save();
      return NextResponse.json({ isWishlisted: true, message: 'Added to wishlist' });
    }
  } catch (error) {
    console.error('Wishlist POST error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
