"use client";

import { Card, CardContent } from "@/components/ui/card";

export default function LocationSkeleton() {
  return (
    <Card className="overflow-hidden border border-gray-200 h-full flex flex-col">
      {/* Image skeleton with aspect ratio */}
      <div className="relative w-full overflow-hidden bg-gray-100 aspect-[4/3]">
        <div className="h-full w-full bg-gray-300 animate-pulse" />
      </div>

      <CardContent className="p-2 flex flex-col gap-0">
        {/* Title skeleton */}
        <div className="h-5 w-3/4 bg-gray-300 rounded animate-pulse mb-2" />
        
        {/* Description skeleton */}
        <div className="space-y-1 mb-3 flex-1">
          <div className="h-4 w-full bg-gray-300 rounded animate-pulse" />
          <div className="h-4 w-2/3 bg-gray-300 rounded animate-pulse" />
        </div>

        {/* Duration and rating skeleton */}
        <div className="flex items-center justify-between mb-3 pt-3 border-t border-gray-100">
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 bg-gray-300 rounded animate-pulse" />
            <div className="h-4 w-16 bg-gray-300 rounded animate-pulse" />
          </div>
          
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 bg-gray-300 rounded animate-pulse" />
            <div className="h-4 w-8 bg-gray-300 rounded animate-pulse" />
          </div>
        </div>

        {/* Price skeleton */}
        <div className="flex items-center justify-between">
          <div className="h-6 w-20 bg-gray-300 rounded animate-pulse" />
          <div className="h-3 w-16 bg-gray-300 rounded animate-pulse" />
        </div>
      </CardContent>
    </Card>
  );
}