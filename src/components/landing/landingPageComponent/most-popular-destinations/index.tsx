
import { Suspense } from 'react';
import MostPopularDestinationsClient from '../most-popular-destinations/MostPopularDestinationsClient';

const MostPopularDestinationsSkeleton = () => (
  <section className="py-20 bg-white">
    <div className="container mx-auto px-4">
      {/* Section Badge Skeleton */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-400/20 px-4 py-2">
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
          <div className="h-4 bg-gray-300 rounded w-32 animate-pulse" />
        </div>
      </div>

      {/* Section Title Skeleton */}
      <div className="text-center mb-16">
        <div className="h-12 bg-gradient-to-r from-gray-300 to-gray-400 rounded animate-pulse max-w-2xl mx-auto mb-6" />
        <div className="h-6 bg-gray-300 rounded animate-pulse max-w-xl mx-auto" />
      </div>


      {/* CTA Skeleton */}
      <div className="text-center mt-16">
        <div className="h-12 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full animate-pulse w-48 mx-auto" />
      </div>
    </div>
  </section>
);

export default function MostPopularDestinations() {
  return (
    <Suspense fallback={<MostPopularDestinationsSkeleton />}>
      <MostPopularDestinationsClient />
    </Suspense>
  );
}
