'use client';

import { Sparkles, MapPin, Star, Users } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface TourRelatedToursProps {
  currentTour: any;
}

export default function TourRelatedTours({ currentTour }: TourRelatedToursProps) {
  // Use recommendations from the currentTour data, and ensure we don't show the current tour
  const relatedTours = currentTour?.recommendations?.filter(
    (tour: any) => tour._id !== currentTour._id
  ) || [];

  if (relatedTours.length === 0) return null;

  return (
    <div className="mt-20 border-t border-slate-200/60 pt-16 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-50 px-6 py-2">
        <Sparkles className="w-8 h-8 text-indigo-400 opacity-50" />
      </div>

      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-indigo-900 bg-clip-text text-transparent mb-3">
          Similar Adventures
        </h2>
        <p className="text-gray-500">Other travelers also explored these amazing destinations</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {relatedTours.map((tour: any) => (
          <Link href={`/tours/${tour.slug}`} key={tour._id} className="group relative bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col h-full hover:-translate-y-2">
            
            <div className="relative h-56 overflow-hidden">
              <Image 
                src={tour.heroImage?.publicUrl || '/images/placeholders/tour-placeholder.jpg'} 
                alt={tour.title || 'Tour Image'}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1 shadow-lg">
                <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                <span className="text-sm font-bold text-slate-800">{tour.ratings?.average || tour.rating || 0}</span>
              </div>

              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex items-center gap-1.5 text-white/90 text-sm font-medium mb-1.5">
                  <MapPin className="w-4 h-4" />
                  {tour.location || tour.district || tour.division || 'Bangladesh'}
                </div>
              </div>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-xl text-slate-800 mb-4 group-hover:text-indigo-600 transition-colors line-clamp-2">
                  {tour.title}
                </h3>
                
                <div className="flex items-center justify-between text-sm text-slate-500 font-medium mb-6">
                  <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                    <Users className="w-4 h-4 text-indigo-500" />
                    Family/Group
                  </div>
                  <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                    ⏱ {tour.durationDays || tour.duration?.days || 0} Days
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-end justify-between">
                <div>
                  <p className="text-xs text-slate-400 font-medium mb-0.5">Starting from</p>
                  <div className="text-2xl font-black text-slate-900 tracking-tight">
                    {tour.basePrice?.currency || '৳'}{(tour.priceFrom || tour.basePrice?.amount || 0).toLocaleString()}
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
