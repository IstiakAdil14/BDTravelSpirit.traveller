'use client';

import OperatorCardSkeleton from './OperatorCardSkeleton';

export default function OperatorsSkeleton() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Skeleton */}
      <section className="bg-gradient-to-br from-emerald-50 via-white to-teal-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <div className="h-8 w-32 bg-gray-300 rounded animate-pulse mb-6 mx-auto" />
            <div className="h-12 w-96 bg-gray-300 rounded animate-pulse mb-6 mx-auto" />
            <div className="h-6 w-80 bg-gray-300 rounded animate-pulse mx-auto" />
          </div>
        </div>
      </section>

      {/* Filters Skeleton */}
      <section className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="hidden lg:flex items-center gap-4">
            <div className="h-10 w-64 bg-gray-300 rounded animate-pulse" />
            <div className="h-10 w-32 bg-gray-300 rounded animate-pulse" />
            <div className="h-10 w-32 bg-gray-300 rounded animate-pulse" />
            <div className="h-10 w-40 bg-gray-300 rounded animate-pulse" />
            <div className="h-10 w-40 bg-gray-300 rounded animate-pulse" />
          </div>
        </div>
      </section>

      {/* Grid Skeleton */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 12 }).map((_, i) => (
            <OperatorCardSkeleton key={i} />
          ))}
        </div>
      </section>
    </main>
  );
}