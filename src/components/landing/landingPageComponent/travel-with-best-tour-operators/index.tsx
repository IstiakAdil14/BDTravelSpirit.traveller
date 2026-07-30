import { Suspense } from 'react';
import TravelWithBestTourOperatorsClient from './TravelWithBestTourOperatorsClient';

const TravelWithBestTourOperatorsSkeleton = () => (
  <section className="py-20 bg-gradient-to-br from-blue-50 via-emerald-50/40 to-teal-50/60">
    <div className="container mx-auto px-4">
      <div className="flex justify-center mb-10">
        <div className="h-8 bg-gray-300 rounded-full w-32 animate-pulse" />
      </div>
      <div className="text-center mb-20">
        <div className="h-16 bg-gray-300 rounded w-96 mx-auto mb-8 animate-pulse" />
        <div className="h-6 bg-gray-300 rounded w-64 mx-auto animate-pulse" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20 max-w-7xl mx-auto">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-40 bg-white rounded-3xl shadow-xl animate-pulse" />
        ))}
      </div>
    </div>
  </section>
);

import dbConnect from '@/lib/db/connect';
import GuideModel from '@/models/guide/guide.model';

const generateSlug = (name: string) =>
  (name || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const TravelWithBestTourOperatorsServer = async () => {
  try {
    await dbConnect();
    const guides = await GuideModel.find({ status: 'approved' }).limit(6).lean();

    const mappedOperators = guides.map((guide: any) => ({
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

    return <TravelWithBestTourOperatorsClient initialOperators={mappedOperators} />;
  } catch (error) {
    console.error('Error fetching operators:', error);
    return <TravelWithBestTourOperatorsClient initialOperators={[]} />;
  }
};

export default function TravelWithBestTourOperators() {
  return (
    <Suspense fallback={<TravelWithBestTourOperatorsSkeleton />}>
      <TravelWithBestTourOperatorsServer />
    </Suspense>
  );
}
