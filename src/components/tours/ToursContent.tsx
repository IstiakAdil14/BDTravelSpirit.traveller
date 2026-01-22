'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import RegionHero from '@/components/tours/[region]/all-locations/RegionHero';
import RegionMap from '@/components/tours/[region]/all-locations/RegionMap';
import PaginatedLocationGrid from '@/components/tours/[region]/all-locations/PaginatedLocationGrid';
import HeroSkeleton from '@/components/tours/[region]/all-locations/HeroSkeleton';
import MapSkeleton from '@/components/tours/[region]/all-locations/MapSkeleton';
import LocationSkeleton from '@/components/tours/[region]/all-locations/LocationSkeleton';
import OperatorDetailPage from '@/components/operators/OperatorDetailPage';
import OperatorDetailSkeleton from '@/components/operators/OperatorDetailSkeleton';
import TourDetailsContent from './tour-details/TourDetailsContent';
import TourDetailsSkeleton from './tour-details/TourDetailsSkeleton';

const regionMap: { [key: string]: string } = {
  'barishal': 'Barishal',
  'chittagong': 'Chittagong',
  'dhaka': 'Dhaka',
  'khulna': 'Khulna',
  'mymensingh': 'Mymensingh',
  'rajshahi': 'Rajshahi',
  'rangpur': 'Rangpur',
  'sylhet': 'Sylhet'
};

const regionMapUrls: { [key: string]: string } = {
  'barishal': 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d467692.0537659!2d90.1!3d22.7!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30acd8a64095dfd3%3A0x5015cc5138d6c2!2sBarishal%2C%20Bangladesh!5e0!3m2!1sen!2s!4v1234567890123!5m2!1sen!2s',
  'chittagong': 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d467692.0537659!2d91.8!3d22.3!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30acd8a64095dfd3%3A0x5015cc5138d6c2!2sChittagong%2C%20Bangladesh!5e0!3m2!1sen!2s!4v1234567890123!5m2!1sen!2s',
  'dhaka': 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d467692.0537659!2d90.4!3d23.8!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b087026b81%3A0x8fa563bbdd5904c2!2sDhaka%2C%20Bangladesh!5e0!3m2!1sen!2s!4v1234567890123!5m2!1sen!2s',
  'khulna': 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d467692.0537659!2d89.5!3d22.8!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ff901efac79b59%3A0x5be01a1bc0dc7eba!2sKhulna%2C%20Bangladesh!5e0!3m2!1sen!2s!4v1234567890123!5m2!1sen!2s',
  'mymensingh': 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d467692.0537659!2d90.4!3d24.7!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x375650c47c2e7b2f%3A0x2e8e5e5e5e5e5e5e!2sMymensingh%2C%20Bangladesh!5e0!3m2!1sen!2s!4v1234567890123!5m2!1sen!2s',
  'rajshahi': 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d467692.0537659!2d88.6!3d24.4!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39fbefa96a38d031%3A0x10f93a950ed6f410!2sRajshahi%2C%20Bangladesh!5e0!3m2!1sen!2s!4v1234567890123!5m2!1sen!2s',
  'rangpur': 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d467692.0537659!2d89.2!3d25.7!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e32de6fca6deb7%3A0x947e1728c5b2e4e5!2sRangpur%2C%20Bangladesh!5e0!3m2!1sen!2s!4v1234567890123!5m2!1sen!2s',
  'sylhet': 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d467692.0537659!2d91.9!3d24.9!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x375054d3d270329f%3A0xf58ef93431f67382!2sSylhet%2C%20Bangladesh!5e0!3m2!1sen!2s!4v1234567890123!5m2!1sen!2s'
};

export default function ToursContent() {
  const searchParams = useSearchParams();
  const [regionData, setRegionData] = useState<any>(null);
  const [locations, setLocations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [operatorData, setOperatorData] = useState<any>(null);
  const [tourDetails, setTourDetails] = useState<any>(null);

  const region = searchParams.get('region');
  const location = searchParams.get('location');
  const category = searchParams.get('category');
  const operator = searchParams.get('operator');
  const tourSlug = searchParams.get('tour');

  useEffect(() => {
    async function fetchData() {
      setLoading(true);

      // If tour slug is present, fetch full tour details
      if (tourSlug) {
        try {
          const res = await fetch(`/api/tours/slug/${tourSlug}`);
          if (res.ok) {
            const data = await res.json();
            setTourDetails(data);
          }
        } catch (error) {
          console.error('Error fetching tour details:', error);
        }
      }
      // If operator parameter is present, fetch operator tours
      else if (operator) {
        try {
          const operatorRes = await fetch(`/api/tour-operators?slug=${operator}`);
          const operatorData = operatorRes.ok ? await operatorRes.json() : null;

          setOperatorData(operatorData);
          setLocations(operatorData?.tours || []);
        } catch (error) {
          console.error('Error fetching operator data:', error);
        }
      } else if (region) {
        const displayRegion = regionMap[region] || region;

        try {
          const [regionRes, locationsRes] = await Promise.all([
            fetch(`/api/regions?name=${displayRegion}`),
            fetch(`/api/locations?region=${region}&location=${location || ''}&category=${category || ''}`)
          ]);

          const regionData = regionRes.ok ? await regionRes.json() : null;
          const locationsData = locationsRes.ok ? await locationsRes.json() : [];

          setRegionData(regionData);
          setLocations(locationsData);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }

      setLoading(false);
    }

    fetchData();
  }, [region, location, category, operator, tourSlug]);

  if (loading) {
    if (operator) return <OperatorDetailSkeleton />;
    if (tourSlug) return <TourDetailsSkeleton />;

    return (
      <div className="space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 ml-4 mr-4">
          <HeroSkeleton />
          <MapSkeleton />
        </div>
        <div className="mr-2 ml-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <LocationSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // If tour parameter is present, show full tour details
  if (tourSlug && tourDetails) {
    return <TourDetailsContent tour={tourDetails} />;
  }

  // If operator parameter is present, show full operator details
  if (operator && operatorData) {
    return (
      <div className="-mt-55">
        <OperatorDetailPage operator={operatorData} />
      </div>
    );
  }

  if (!region) {
    return (
      <div className="text-center py-20">
        <h1 className="text-4xl font-bold mb-8">Explore Bangladesh Tours</h1>
        <p className="text-lg mb-8 text-gray-600 font-medium">Select a region to start exploring amazing destinations</p>
      </div>
    );
  }

  const displayRegion = regionMap[region] || region;
  const mapUrl = regionMapUrls[region] || regionMapUrls['dhaka'];

  return (
    <div className="space-y-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 ml-4 mr-4">
        <RegionHero region={displayRegion} image={regionData?.image} />
        <RegionMap mapUrl={mapUrl} />
      </div>
      <div className="mr-2 ml-2">
        <PaginatedLocationGrid locations={locations} displayRegion={displayRegion} />
      </div>
    </div>
  );
}
