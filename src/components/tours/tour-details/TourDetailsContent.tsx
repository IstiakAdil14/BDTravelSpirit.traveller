'use client';

import { useState } from 'react';
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-0">
      {/* Hero Section */}
      <TourHero tour={tour} />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8 mb-4">
          {/* Navigation Tabs */}
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'itinerary', label: 'Itinerary' },
                { id: 'inclusions', label: 'Inclusions' },
                { id: 'destinations', label: 'Destinations' },
                { id: 'gallery', label: 'Gallery' },
                { id: 'reviews', label: 'Reviews' },
                { id: 'faqs', label: 'FAQs' },
                { id: 'policies', label: 'Policies' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="min-h-[400px]">
            {activeTab === 'overview' && <TourOverview tour={tour} />}
            {activeTab === 'itinerary' && <TourItinerary tour={tour} />}
            {activeTab === 'inclusions' && <TourInclusions tour={tour} />}
            {activeTab === 'destinations' && <TourDestinations tour={tour} />}
            {activeTab === 'gallery' && <TourGallery tour={tour} />}
            {activeTab === 'reviews' && <TourReviews tour={tour} />}
            {activeTab === 'faqs' && <TourFAQs tour={tour} />}
            {activeTab === 'policies' && <TourPolicies tour={tour} />}
          </div>
          <TourBookingWidget tour={tour} />
          <TourGuideInfo tour={tour} />

        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 mb-4">
          <div className="sticky top-6">
            <TourPricing tour={tour} />
          </div>
        </div>
      </div>

    </div>
  );
}