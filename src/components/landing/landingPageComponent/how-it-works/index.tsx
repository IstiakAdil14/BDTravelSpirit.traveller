import { Suspense } from 'react';
import HowItWorksClient from './HowItWorksClient';

const HowItWorksSkeleton = () => (
  <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
    <div className="container mx-auto px-4">
      {/* Section Badge Skeleton */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 border border-blue-400/20 px-4 py-2">
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
          <div className="h-4 bg-gray-300 rounded w-28 animate-pulse" />
        </div>
      </div>

      {/* Section Title Skeleton */}
      <div className="text-center mb-16">
        <div className="h-12 bg-gradient-to-r from-gray-300 to-gray-400 rounded animate-pulse max-w-2xl mx-auto mb-6" />
        <div className="h-6 bg-gray-300 rounded animate-pulse max-w-xl mx-auto" />
      </div>

      {/* Steps Skeleton */}
      <div className="relative flex flex-col items-center">
        {/* Connecting Line Skeleton (Desktop) - vertical tree layout */}
        <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-gray-300 to-gray-400 rounded-full animate-pulse" />

        <div className="flex flex-col gap-8 lg:gap-12 w-full max-w-4xl">
          {[...Array(4)].map((_, index) => {
            const isLeft = index % 2 === 0;
            return (
              <div key={index} className={`relative flex w-full ${isLeft ? "justify-start" : "justify-end"}`}>
                {/* Step Number Badge Skeleton */}
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-gray-300 to-gray-400 animate-pulse mb-6" />

                {/* Card Skeleton */}
                <div className={`bg-white rounded-2xl p-8 shadow-lg border border-gray-100 animate-pulse max-w-md ${isLeft ? "mr-8" : "ml-1"}`}>
                  {/* Icon Skeleton */}
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-gray-300 to-gray-400 mb-6" />

                  {/* Content Skeleton */}
                  <div className="h-6 bg-gray-300 rounded mb-4" />
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-300 rounded" />
                    <div className="h-4 bg-gray-300 rounded" />
                    <div className="h-4 bg-gray-300 rounded w-3/4" />
                  </div>

                  {/* Step Indicator Skeleton */}
                  <div className="mt-6 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-gray-300" />
                    <div className="h-4 bg-gray-300 rounded w-16" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CTA Skeleton */}
      <div className="text-center mt-16">
        <div className="h-12 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full animate-pulse w-48 mx-auto" />
      </div>
    </div>
  </section>
);

export default function HowItWorks() {
  return (
    <Suspense fallback={<HowItWorksSkeleton />}>
      <HowItWorksClient />
    </Suspense>
  );
}
