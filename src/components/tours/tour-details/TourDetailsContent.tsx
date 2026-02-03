'use client';

import { useState } from 'react';
import { Icon } from '@/components/ui/icons';
import { FiClipboard, FiCalendar, FiCheckCircle, FiMapPin, FiImage, FiStar, FiHelpCircle, FiFileText } from 'react-icons/fi';
import TourHero from './TourHero';
import TourOverview from './TourOverview';
import TourItinerary from './TourItinerary';
import TourInclusions from './TourInclusions';
import TourDestinations from './TourDestinations';
import TourPricing from './TourPricing';
import TourReviews from './TourReviews';
import TourFAQs from './TourFAQs';
import TourGuideInfo from './TourGuideInfo';
import TourBookingWidget from './TourBookingWidget';
import TourGallery from './TourGallery';
import TourPolicies from './TourPolicies';

interface TourDetailsContentProps {
  tour: any;
}

export default function TourDetailsContent({ tour }: TourDetailsContentProps) {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pt-8 pb-4">
          <TourHero tour={tour} />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 pb-12">
          <div className="xl:col-span-2 space-y-6">
            <div className="relative mb-8">
              <div className="flex items-center justify-center mb-6">
                <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white px-6 py-3 rounded-full shadow-2xl">
                  <span className="font-bold text-lg tracking-wide">EXPLORE TOUR DETAILS</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
                {[
                  { id: 'overview', label: 'Overview', icon: FiClipboard, color: 'bg-blue-500', hoverColor: 'hover:bg-blue-600' },
                  { id: 'itinerary', label: 'Itinerary', icon: FiCalendar, color: 'bg-purple-500', hoverColor: 'hover:bg-purple-600' },
                  { id: 'inclusions', label: 'Inclusions', icon: FiCheckCircle, color: 'bg-green-500', hoverColor: 'hover:bg-green-600' },
                  { id: 'destinations', label: 'Destinations', icon: FiMapPin, color: 'bg-red-500', hoverColor: 'hover:bg-red-600' },
                  { id: 'gallery', label: 'Gallery', icon: FiImage, color: 'bg-indigo-500', hoverColor: 'hover:bg-indigo-600' },
                  { id: 'reviews', label: 'Reviews', icon: FiStar, color: 'bg-yellow-500', hoverColor: 'hover:bg-yellow-600' },
                  { id: 'faqs', label: 'FAQs', icon: FiHelpCircle, color: 'bg-teal-500', hoverColor: 'hover:bg-teal-600' },
                  { id: 'policies', label: 'Policies', icon: FiFileText, color: 'bg-gray-500', hoverColor: 'hover:bg-gray-600' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`group relative flex flex-col items-center gap-2 p-4 rounded-2xl transition-all duration-300 transform hover:scale-105 ${
                      activeTab === tab.id
                        ? `${tab.color} text-white shadow-2xl scale-110 ring-4 ring-white/50`
                        : `bg-white/90 text-gray-700 ${tab.hoverColor} hover:text-white shadow-lg hover:shadow-xl border border-gray-200/50`
                    }`}
                  >
                    <div className={`transition-transform duration-300 ${
                      activeTab === tab.id ? 'scale-110' : 'group-hover:scale-110'
                    }`}>
                      <tab.icon size={24} />
                    </div>
                    <span className={`text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                      activeTab === tab.id ? 'text-white' : 'text-gray-600 group-hover:text-white'
                    }`}>
                      {tab.label}
                    </span>
                    
                    {activeTab === tab.id && (
                      <div className="absolute inset-0 bg-white/20 rounded-2xl animate-pulse" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="bg-white/90 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl shadow-blue-500/10 p-8 min-h-[500px] relative overflow-hidden">
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full blur-3xl animate-pulse" />
                  <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-br from-pink-500 to-orange-500 rounded-full blur-3xl animate-pulse delay-1000" />
                </div>
                
                <div className="relative z-10">
                  {activeTab === 'overview' && <TourOverview tour={tour} />}
                  {activeTab === 'itinerary' && <TourItinerary tour={tour} />}
                  {activeTab === 'inclusions' && <TourInclusions tour={tour} />}
                  {activeTab === 'destinations' && <TourDestinations tour={tour} />}
                  {activeTab === 'gallery' && <TourGallery tour={tour} />}
                  {activeTab === 'reviews' && <TourReviews tour={tour} />}
                  {activeTab === 'faqs' && <TourFAQs tour={tour} />}
                  {activeTab === 'policies' && <TourPolicies tour={tour} />}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white/80 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl shadow-purple-500/5 overflow-hidden">
                <TourBookingWidget tour={tour} />
              </div>
              <div className="bg-white/80 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl shadow-green-500/5 overflow-hidden">
                <TourGuideInfo tour={tour} />
              </div>
            </div>
          </div>

          <div className="xl:col-span-1">
            <div className="sticky top-8 space-y-6">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative bg-white/90 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl shadow-blue-500/20 overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
                  <TourPricing tour={tour} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}