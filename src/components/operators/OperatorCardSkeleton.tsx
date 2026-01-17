'use client';

import { Card, CardContent } from '@/components/ui/card';

export default function OperatorCardSkeleton() {
  return (
    <Card className="h-full border border-gray-200 overflow-hidden">
      <CardContent className="p-6">
        {/* Logo and Badge Skeleton */}
        <div className="flex items-start justify-between mb-4">
          <div className="w-16 h-16 bg-gray-300 rounded-lg animate-pulse" />
          <div className="w-16 h-6 bg-gray-300 rounded-full animate-pulse" />
        </div>

        {/* Name Skeleton */}
        <div className="h-6 w-3/4 bg-gray-300 rounded animate-pulse mb-2" />

        {/* Description Skeleton */}
        <div className="space-y-2 mb-4">
          <div className="h-4 w-full bg-gray-300 rounded animate-pulse" />
          <div className="h-4 w-2/3 bg-gray-300 rounded animate-pulse" />
        </div>

        {/* Rating Skeleton */}
        <div className="flex items-center gap-2 mb-3">
          <div className="w-4 h-4 bg-gray-300 rounded animate-pulse" />
          <div className="h-4 w-8 bg-gray-300 rounded animate-pulse" />
          <div className="h-4 w-16 bg-gray-300 rounded animate-pulse" />
        </div>

        {/* Region Skeleton */}
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 bg-gray-300 rounded animate-pulse" />
          <div className="h-4 w-12 bg-gray-300 rounded animate-pulse" />
        </div>
      </CardContent>
    </Card>
  );
}