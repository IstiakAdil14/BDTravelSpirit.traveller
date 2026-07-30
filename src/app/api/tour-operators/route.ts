import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db/connect';
import GuideModel from '@/models/guide/guide.model';
import TourModel from '@/models/tours/tour.model';
import '@/models/assets/asset.model';      // ensure Asset schema is registered
import '@/models/assets/asset-file.model'; // ensure AssetFile schema is registered

const generateSlug = (name: string) => {
  return (name || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
};

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');

    // Fetch all approved guides to map them to static format
    const guides = await GuideModel.find({ status: 'approved' });

    if (slug) {
      // Find the guide whose generated slug matches the requested slug
      const guide = guides.find(g => generateSlug(g.companyName) === slug);
      
      if (!guide) {
        return NextResponse.json({ error: 'Operator not found' }, { status: 404 });
      }

      // Fetch tours for this guide and populate heroImage -> file for publicUrl
      const toursData = await TourModel.find({ companyId: guide._id })
        .populate({ path: 'heroImage', populate: { path: 'file', select: 'publicUrl' } })
        .lean();

      // Map tours - extract image URL from populated heroImage.file.publicUrl
      const mappedTours = toursData.map((t: any) => {
        const imageUrl = t.heroImage?.file?.publicUrl || null;
        return {
          id: t._id.toString(),
          name: t.title,
          slug: t.slug || t._id.toString(),
          duration: t.duration ? `${t.duration.days} Days` : 'N/A',
          price: t.basePrice?.amount || 0,
          rating: t.ratings?.average || 4.5,
          image: imageUrl
        };
      });

      const operator = {
        name: guide.companyName,
        slug: generateSlug(guide.companyName),
        logo: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=100&h=100&fit=crop',
        rating: 4.8, 
        reviewCount: 15,
        tagline: "Experience Bangladesh with us",
        regions: [],
        stats: { toursCompleted: mappedTours.length, travelersServed: 0, regionsCovered: 0, experienceYears: 1 },
        services: ["Guided Tours"],
        specializations: [],
        verified: guide.status === 'approved',
        about: guide.bio || "No description provided.",
        gallery: [],
        tours: mappedTours
      };

      return NextResponse.json(operator);
    } else {
      // Return list of all dynamic operators
      const mappedOperators = guides.map((guide: any) => ({
        id: guide._id.toString(),
        _id: guide._id.toString(),
        name: guide.companyName,
        slug: generateSlug(guide.companyName),
        logo: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=100&h=100&fit=crop',
        rating: 4.8,
        reviews: 15,
        specialties: [],
        certified: guide.status === 'approved',
        experience: '1+ years'
      }));

      return NextResponse.json({
        success: true,
        data: mappedOperators
      });
    }
  } catch (error) {
    console.error('Error fetching tour operators dynamically:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}