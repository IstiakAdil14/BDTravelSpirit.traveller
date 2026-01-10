import { Suspense } from 'react';
import CTAClient from './CTAClient';

const CTASkeleton = () => (
  <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
    {/* Background Effects Skeleton */}
    <div className="absolute inset-0">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-emerald-500/10 via-transparent to-blue-500/10" />
      <div className="absolute top-20 right-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
    </div>

    <div className="container mx-auto px-4 relative z-10">
      <div className="max-w-6xl mx-auto">
        {/* Content Layout Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content Skeleton */}
          <div>
            {/* Badge Skeleton */}
            <div className="inline-flex items-center gap-2 rounded-full bg-pink-500/10 border border-pink-400/20 px-4 py-2 mb-8 animate-pulse">
              <div className="w-2 h-2 bg-pink-400 rounded-full" />
              <div className="h-4 bg-gray-300 rounded w-32" />
            </div>

            {/* Title Skeleton */}
            <div className="space-y-4 mb-6">
              <div className="h-12 bg-gradient-to-r from-gray-300 to-gray-400 rounded animate-pulse" />
              <div className="h-12 bg-gradient-to-r from-gray-300 to-gray-400 rounded animate-pulse w-3/4" />
            </div>

            {/* Description Skeleton */}
            <div className="space-y-2 mb-8">
              <div className="h-4 bg-gray-300 rounded animate-pulse" />
              <div className="h-4 bg-gray-300 rounded animate-pulse" />
              <div className="h-4 bg-gray-300 rounded animate-pulse w-3/4" />
            </div>

            {/* Benefits List Skeleton */}
            <div className="mb-8 space-y-3">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="flex items-center gap-3 animate-pulse">
                  <div className="w-5 h-5 bg-emerald-400 rounded animate-pulse" />
                  <div className="h-4 bg-gray-300 rounded w-64" />
                </div>
              ))}
            </div>

            {/* CTA Button Skeleton */}
            <div className="h-12 bg-gradient-to-r from-pink-500 to-orange-600 rounded-full animate-pulse w-48" />
          </div>

          {/* Right Content - Stats Grid Skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="glass rounded-2xl p-8 text-center animate-pulse">
                {/* Icon Skeleton */}
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-gray-300 to-gray-400 mx-auto mb-6" />

                {/* Number Skeleton */}
                <div className="h-8 bg-gradient-to-r from-gray-300 to-gray-400 rounded mb-2" />

                {/* Label Skeleton */}
                <div className="h-4 bg-gray-300 rounded w-20 mx-auto" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default function FinalCTA() {
  return (
    <Suspense fallback={<CTASkeleton />}>
      <CTAClient />
    </Suspense>
  );
}
