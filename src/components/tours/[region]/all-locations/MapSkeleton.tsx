"use client";

export default function MapSkeleton() {
  return (
    <div className="relative h-[60vh] rounded-3xl overflow-hidden bg-gray-200 animate-pulse">
      {/* Map placeholder with grid pattern */}
      <div className="absolute inset-0 bg-gray-300">
        <div className="h-full w-full opacity-30">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(156, 163, 175, 0.3)" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
        </div>
      </div>
      
      {/* Map controls skeleton */}
      <div className="absolute top-4 right-4 space-y-2">
        <div className="w-8 h-8 bg-gray-400 rounded animate-pulse" />
        <div className="w-8 h-8 bg-gray-400 rounded animate-pulse" />
      </div>
      
      {/* Map center indicator */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-6 h-6 bg-gray-400 rounded-full animate-pulse" />
      </div>
    </div>
  );
}