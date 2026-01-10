"use client"
import { Suspense } from 'react';
import HeroClient from './HeroClient';

const HeroSkeleton = () => (
  <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
    {/* Background Skeleton */}
    <div className="absolute inset-0 bg-gradient-to-r from-slate-900/70 via-slate-800/50 to-slate-900/70" />

    {/* Content Skeleton */}
    <div className="relative z-10 container mx-auto px-4 text-center text-white">
      <div className="max-w-4xl mx-auto">
        {/* Badge Skeleton */}
        <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-400/20 px-4 py-2 mb-8">
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
          <div className="h-4 bg-gray-300 rounded w-32 animate-pulse" />
        </div>

        {/* Title Skeleton */}
        <div className="space-y-4 mb-6">
          <div className="h-12 bg-gradient-to-r from-gray-300 to-gray-400 rounded animate-pulse" />
          <div className="h-12 bg-gradient-to-r from-gray-300 to-gray-400 rounded animate-pulse w-3/4 mx-auto" />
        </div>

        {/* Subtitle Skeleton */}
        <div className="h-6 bg-gray-300 rounded animate-pulse max-w-2xl mx-auto mb-12" />

        {/* CTA Buttons Skeleton */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <div className="h-12 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full animate-pulse w-48" />
          <div className="h-12 border-2 border-white/30 rounded-full animate-pulse w-40" />
        </div>

        {/* Stats Skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="text-center">
              <div className="h-8 bg-gradient-to-r from-gray-300 to-gray-400 rounded animate-pulse mb-2" />
              <div className="h-4 bg-gray-300 rounded animate-pulse w-16 mx-auto" />
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default function HeroSection() {
  return (
    <Suspense fallback={<HeroSkeleton />}>
      <HeroClient />
    </Suspense>
  );
}
