import { Suspense } from 'react';
import FeaturesClient from './FeaturesClient';

const FeaturesSkeleton = () => (
  <section className="py-20 bg-white">
    <div className="container mx-auto px-4">
      {/* Section Badge Skeleton */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-400/20 px-4 py-2">
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
          <div className="h-4 bg-gray-300 rounded w-24 animate-pulse" />
        </div>
      </div>

      {/* Section Title Skeleton */}
      <div className="text-center mb-16">
        <div className="h-12 bg-gradient-to-r from-gray-300 to-gray-400 rounded animate-pulse max-w-2xl mx-auto mb-6" />
        <div className="h-6 bg-gray-300 rounded animate-pulse max-w-xl mx-auto" />
      </div>

      {/* Features Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="rounded-2xl p-8 bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse">
            {/* Icon Skeleton */}
            <div className="w-16 h-16 rounded-full bg-gray-300 mb-6" />

            {/* Content Skeleton */}
            <div className="h-6 bg-gray-300 rounded mb-4" />
            <div className="space-y-2">
              <div className="h-4 bg-gray-300 rounded" />
              <div className="h-4 bg-gray-300 rounded w-3/4" />
            </div>
          </div>
        ))}
      </div>

      {/* Stats Section Skeleton */}
      <div className="mt-20 grid grid-cols-2 md:grid-cols-3 gap-8 text-center">
        <div className="rounded-2xl p-8 bg-gray-100 animate-pulse">
          <div className="h-8 bg-gradient-to-r from-gray-300 to-gray-400 rounded mb-2" />
          <div className="h-4 bg-gray-300 rounded w-20 mx-auto" />
        </div>
        <div className="rounded-2xl p-8 bg-gray-100 animate-pulse">
          <div className="h-8 bg-gradient-to-r from-gray-300 to-gray-400 rounded mb-2" />
          <div className="h-4 bg-gray-300 rounded w-24 mx-auto" />
        </div>
        <div className="rounded-2xl p-8 bg-gray-100 animate-pulse md:col-span-1 col-span-2">
          <div className="h-8 bg-gradient-to-r from-gray-300 to-gray-400 rounded mb-2" />
          <div className="h-4 bg-gray-300 rounded w-28 mx-auto" />
        </div>
      </div>
    </div>
  </section>
);

export default function WhyPartner() {
  return (
    <Suspense fallback={<FeaturesSkeleton />}>
      <FeaturesClient />
    </Suspense>
  );
}
