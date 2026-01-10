import { Suspense } from 'react';
import TestimonialsClient from './TestimonialsClient';

const TestimonialsSkeleton = () => (
  <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
    {/* Background Effects Skeleton */}
    <div className="absolute inset-0">
      <div className="absolute top-20 left-20 w-72 h-72 bg-gray-700 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-gray-700 rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gray-700 rounded-full blur-3xl animate-pulse" />
    </div>

    <div className="container mx-auto px-4 relative z-10">
      {/* Section Badge Skeleton */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex items-center gap-2 rounded-full bg-purple-500/10 border border-purple-400/20 px-4 py-2">
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
          <div className="h-4 bg-gray-300 rounded w-24 animate-pulse" />
        </div>
      </div>

      {/* Section Title Skeleton */}
      <div className="text-center mb-16">
        <div className="h-12 bg-gradient-to-r from-gray-300 to-gray-400 rounded animate-pulse max-w-2xl mx-auto mb-6" />
        <div className="h-6 bg-gray-300 rounded animate-pulse max-w-xl mx-auto" />
      </div>

      {/* Testimonials Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 animate-pulse">
            {/* Quote Icon Skeleton */}
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-gray-300 to-gray-400 mb-6" />

            {/* Rating Skeleton */}
            <div className="flex gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-5 h-5 bg-yellow-400 rounded animate-pulse" />
              ))}
            </div>

            {/* Quote Skeleton */}
            <div className="space-y-2 mb-8">
              <div className="h-4 bg-gray-300 rounded" />
              <div className="h-4 bg-gray-300 rounded" />
              <div className="h-4 bg-gray-300 rounded w-3/4" />
            </div>

            {/* Author Skeleton */}
            <div className="border-t border-white/10 pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full animate-pulse" />
                <div>
                  <div className="h-4 bg-gray-300 rounded w-24 mb-2" />
                  <div className="h-3 bg-gray-400 rounded w-20" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Stats Banner Skeleton */}
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 animate-pulse">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {[...Array(3)].map((_, index) => (
            <div key={index}>
              <div className="h-8 bg-gradient-to-r from-gray-300 to-gray-400 rounded animate-pulse mb-2" />
              <div className="h-4 bg-gray-300 rounded w-16 mx-auto" />
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default function Testimonials() {
  return (
    <Suspense fallback={<TestimonialsSkeleton />}>
      <TestimonialsClient />
    </Suspense>
  );
}
