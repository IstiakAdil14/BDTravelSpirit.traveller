import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db/connect';
import { BangladeshDivisions } from '@/data/bangladesh-division';
import TourModel from '@/models/tours/tour.model';

interface PopulatedImage {
  publicUrl?: string;
  file?: {
    publicUrl?: string;
  };
}

// Maps display name / URL slug → BangladeshDivisions key
const SLUG_TO_DIVISION: Record<string, BangladeshDivisions> = {
  chittagong: BangladeshDivisions.CHATTOGRAM,
  chattogram: BangladeshDivisions.CHATTOGRAM,
  dhaka: BangladeshDivisions.DHAKA,
  barishal: BangladeshDivisions.BARISHAL,
  khulna: BangladeshDivisions.KHULNA,
  mymensingh: BangladeshDivisions.MYMENSINGH,
  rajshahi: BangladeshDivisions.RAJSHAHI,
  rangpur: BangladeshDivisions.RANGPUR,
  sylhet: BangladeshDivisions.SYLHET,
};

export async function GET(request: Request, { params }: { params: Promise<{ region: string }> }) {
  try {
    await dbConnect();
    const { region } = await params;
    const divisionValue = SLUG_TO_DIVISION[region.toLowerCase()] ||
      Object.values(BangladeshDivisions).find(d => d === region.toLowerCase());

    if (divisionValue) {
      // Query TourModel for the count and first tour image dynamically
      const firstTour = await TourModel.findOne({ 
        division: divisionValue, 
        status: { $in: ['active', 'published'] }, 
        deletedAt: null 
      }).populate({ path: 'heroImage', populate: { path: 'file' } })
        .populate({ path: 'destinations.images', populate: { path: 'file' } });

      const count = await TourModel.countDocuments({
        division: divisionValue,
        status: { $in: ['active', 'published'] },
        deletedAt: null
      });

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
        name: divisionValue.charAt(0).toUpperCase() + divisionValue.slice(1),
        image: imageUrl,
        tourCount: count,
      });
    }
    return NextResponse.json({ error: 'Region not found' }, { status: 404 });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'An error occurred' }, { status: 500 });
  }
}
