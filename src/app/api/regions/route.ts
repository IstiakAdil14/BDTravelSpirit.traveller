import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db/connect';
import { BangladeshDivisions } from '@/data/bangladesh-division';
import TourModel from '@/models/tours/tour.model';

export const dynamic = 'force-dynamic';
export const revalidate = 0;


interface PopulatedImage {
  publicUrl?: string;
  file?: {
    publicUrl?: string;
  };
}

export async function GET(request: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const name = searchParams.get('name');

    // Aggregate counts dynamically from TourModel
    const tourCounts = await TourModel.aggregate([
      { $match: { status: { $in: ['active', 'published'] }, deletedAt: null } },
      { $group: { _id: '$division', count: { $sum: 1 } } }
    ]);
    const countsMap = new Map<string, number>(
      tourCounts.map((item: { _id: string; count: number }) => [item._id?.toLowerCase() || '', item.count])
    );

    if (name) {
      const divisionKey = name.toLowerCase();
      const divisionValue = Object.values(BangladeshDivisions).find(d => d === divisionKey);
      if (divisionValue) {
        const firstTour = await TourModel.findOne({ 
          division: divisionValue, 
          status: { $in: ['active', 'published'] }, 
          deletedAt: null 
        }).populate({ path: 'heroImage', populate: { path: 'file' } })
          .populate({ path: 'destinations.images', populate: { path: 'file' } });

        let imageUrl = '/images/placeholder.jpg';
        if (firstTour) {
          const heroImg = firstTour.heroImage as unknown as PopulatedImage;
          if (heroImg?.file?.publicUrl) {
            imageUrl = heroImg.file.publicUrl;
          } else if (heroImg?.publicUrl) {
            imageUrl = heroImg.publicUrl;
          } else if (firstTour.destinations && firstTour.destinations.length > 0) {
             const destImgs = firstTour.destinations.flatMap((d: { images?: unknown[] }) => d.images?.filter(Boolean) || []);
             const firstDestImg = destImgs[0] as unknown as PopulatedImage;
             if (firstDestImg) {
                if (firstDestImg.file?.publicUrl) imageUrl = firstDestImg.file.publicUrl;
                else if (firstDestImg.publicUrl) imageUrl = firstDestImg.publicUrl;
             }
          }
        }

        return NextResponse.json({
          _id: divisionValue,
          name: name.charAt(0).toUpperCase() + name.slice(1),
          image: imageUrl,
          tourCount: countsMap.get(divisionValue) || 0,
        });
      }
      return NextResponse.json({ error: 'Region not found' }, { status: 404 });
    }

    const data = await Promise.all(Object.values(BangladeshDivisions).map(async (division) => {
      // Fetch the first tour in this division to get its image
      const firstTour = await TourModel.findOne({ 
        division: division, 
        status: { $in: ['active', 'published'] }, 
        deletedAt: null 
      }).populate({ path: 'heroImage', populate: { path: 'file' } })
        .populate({ path: 'destinations.images', populate: { path: 'file' } });

      let imageUrl = '/images/placeholder.jpg';
      if (firstTour) {
        const heroImg = firstTour.heroImage as unknown as PopulatedImage;
        if (heroImg?.file?.publicUrl) {
          imageUrl = heroImg.file.publicUrl;
        } else if (heroImg?.publicUrl) {
          imageUrl = heroImg.publicUrl;
        } else if (firstTour.destinations && firstTour.destinations.length > 0) {
           const destImgs = firstTour.destinations.flatMap((d: { images?: unknown[] }) => d.images?.filter(Boolean) || []);
           const firstDestImg = destImgs[0] as unknown as PopulatedImage;
           if (firstDestImg) {
              if (firstDestImg.file?.publicUrl) imageUrl = firstDestImg.file.publicUrl;
              else if (firstDestImg.publicUrl) imageUrl = firstDestImg.publicUrl;
           }
        }
      }

      return {
        _id: division,
        name: division.charAt(0).toUpperCase() + division.slice(1),
        image: imageUrl,
        tourPlaces: countsMap.get(division) || 0,
      };
    }));

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error loading regions:', error);
    return NextResponse.json(
      Object.values(BangladeshDivisions).map((division) => ({
        _id: division,
        name: division.charAt(0).toUpperCase() + division.slice(1),
        image: '/images/placeholder.jpg',
        tourPlaces: 0,
      }))
    );
  }
}