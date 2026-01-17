"use client";

export default function HeroSkeleton() {
  return (
    <div className="space-y-6">
      {/* Title skeleton */}
      <div className="h-8 w-3/4 bg-gray-300 rounded animate-pulse" />
      
      {/* Description skeleton */}
      <div className="space-y-2">
        <div className="h-4 w-full bg-gray-300 rounded animate-pulse" />
        <div className="h-4 w-5/6 bg-gray-300 rounded animate-pulse" />
        <div className="h-4 w-2/3 bg-gray-300 rounded animate-pulse" />
      </div>
      
      {/* Image skeleton */}
      <div className="w-full h-64 bg-gray-300 rounded-lg animate-pulse" />
    </div>
  );
}