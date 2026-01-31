import { Suspense } from 'react';
import ToursContent from '@/components/tours/ToursContent';

export default function ToursPage() {
  return (
    <section className="container mx-auto py-10 mt-40">
      <Suspense fallback={
        <div className="space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 ml-4 mr-4">
            <div className="animate-pulse">
              <div className="h-64 bg-gray-200 rounded-lg"></div>
            </div>
            <div className="animate-pulse">
              <div className="h-64 bg-gray-200 rounded-lg"></div>
            </div>
          </div>
          <div className="mr-2 ml-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      }>
        <ToursContent />
      </Suspense>
    </section>
  );
}