import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db/connect';
import TourModel from '@/models/tours/tour.model';
import '@/models/assets/asset.model';
import '@/models/assets/asset-file.model';

// Maps DB division values to the display names used in the header menu
const DIVISION_DISPLAY_MAP: Record<string, string> = {
  barishal:   'Barishal',
  chattogram: 'Chittagong',
  dhaka:      'Dhaka',
  khulna:     'Khulna',
  mymensingh: 'Mymensingh',
  rajshahi:   'Rajshahi',
  rangpur:    'Rangpur',
  sylhet:     'Sylhet',
};

const capitalize = (s: string) =>
  s ? s.charAt(0).toUpperCase() + s.slice(1) : '';

export async function GET() {
  try {
    await dbConnect();

    const tours = await TourModel.find({ moderationStatus: 'approved' })
      .populate({ path: 'heroImage', populate: { path: 'file', select: 'publicUrl' } })
      .limit(200)
      .lean();

    // Group tours by division (up to 8 per division)
    const grouped: Record<string, { name: string; region: string; img: string; url: string }[]> = {};

    for (const t of tours as any[]) {
      const divKey = (t.division || '').toLowerCase();
      const displayName = DIVISION_DISPLAY_MAP[divKey];
      if (!displayName) continue;

      if (!grouped[displayName]) grouped[displayName] = [];
      if (grouped[displayName].length >= 8) continue;

      grouped[displayName].push({
        name: t.title,
        region: [t.district, t.division].filter(Boolean).map(capitalize).join(', ') || displayName,
        img: t.heroImage?.file?.publicUrl
          || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=150&h=150&fit=crop',
        url: `/tours/${t.slug}`
      });
    }

    return NextResponse.json({ grouped });
  } catch (error) {
    console.error('Error fetching tours by division:', error);
    return NextResponse.json({ grouped: {} }, { status: 500 });
  }
}
