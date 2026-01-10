import { Suspense } from 'react';
import OurTourLocationsForYouClient from '../our-tour-locations-for-you/OurTourLocationsForYouClient';

const OurTourLocationsForYouSkeleton = () => (
  <section className="py-20 bg-gradient-to-br from-white to-emerald-50">
    <div className="container mx-auto px-4">
      {/* Section Badge Skeleton */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-400/20 px-4 py-2">
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
          <div className="h-4 bg-gray-300 rounded w-40 animate-pulse" />
        </div>
      </div>

      {/* Section Title Skeleton */}
      <div className="text-center mb-16">
        <div className="h-12 bg-gradient-to-r from-gray-300 to-gray-400 rounded animate-pulse max-w-2xl mx-auto mb-6" />
        <div className="h-6 bg-gray-300 rounded animate-pulse max-w-xl mx-auto" />
      </div>

      {/* Tour Locations Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-lg animate-pulse">
            {/* Image Skeleton */}
            <div className="h-48 bg-gradient-to-r from-gray-300 to-gray-400" />

            {/* Content Skeleton */}
            <div className="p-6">
              <div className="h-6 bg-gray-300 rounded mb-4" />
              <div className="space-y-2 mb-4">
                <div className="h-4 bg-gray-300 rounded" />
                <div className="h-4 bg-gray-300 rounded w-3/4" />
              </div>
              <div className="flex justify-between items-center">
                <div className="h-4 bg-gray-300 rounded w-20" />
                <div className="h-8 bg-emerald-200 rounded w-24" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Skeleton */}
      <div className="text-center mt-16">
        <div className="h-12 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full animate-pulse w-48 mx-auto" />
      </div>
    </div>
  </section>
);

export default function OurTourLocationsForYou() {
  return (
    <Suspense fallback={<OurTourLocationsForYouSkeleton />}>
      <OurTourLocationsForYouClient />
    </Suspense>
  );
}
