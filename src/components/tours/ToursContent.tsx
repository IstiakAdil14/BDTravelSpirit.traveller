'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState, useMemo, useCallback } from 'react';
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
import ToursFilter, { ToursFilterState } from './ToursFilter';


const regionMap: { [key: string]: string } = {
  'barishal': 'Barishal',
  'chittagong': 'Chittagong',
  'chattogram': 'Chittagong',
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

// Parse the numeric day count from a duration string like "3 days" or "Multi-day"
function parseDays(duration: string): number | null {
  const match = duration.match(/^(\d+)/);
  return match ? parseInt(match[1], 10) : null;
}

function matchesDurationBucket(duration: string, bucket: string): boolean {
  const days = parseDays(duration);
  if (days === null) return bucket === '7+'; // "Multi-day" → treat as long
  if (bucket === '1')   return days === 1;
  if (bucket === '2-3') return days >= 2 && days <= 3;
  if (bucket === '4-7') return days >= 4 && days <= 7;
  if (bucket === '7+')  return days > 7;
  return false;
}

const EMPTY_FILTER: ToursFilterState = { search: '', district: 'all', duration: 'all', sort: 'default' };

export default function ToursContent() {
  const searchParams = useSearchParams();
  const [regionData, setRegionData] = useState<any>(null);
  const [locations, setLocations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [operatorData, setOperatorData] = useState<any>(null);
  const [tourDetails, setTourDetails] = useState<any>(null);
  const [filters, setFilters] = useState<ToursFilterState>(EMPTY_FILTER);

  const region = searchParams.get('region');
  const location = searchParams.get('location');
  const category = searchParams.get('category');
  const operator = searchParams.get('operator');
  const tourSlug = searchParams.get('tour');

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setFilters(EMPTY_FILTER); // reset filters when region changes

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
          const [regionRes, locationsRes, regionLocationsRes] = await Promise.all([
            fetch(`/api/regions?name=${displayRegion}`),
            fetch(`/api/locations?region=${region}&location=${location || ''}&category=${category || ''}`),
            fetch(`/api/regions/${region}/locations`)
          ]);

          const regionData = regionRes.ok ? await regionRes.json() : null;
          let locationsData = locationsRes.ok ? await locationsRes.json() : [];
          
          // If no locations found, try the region locations service
          if (locationsData.length === 0) {
            const regionLocationsData = regionLocationsRes.ok ? await regionLocationsRes.json() : { data: [] };
            if (regionLocationsData.data && regionLocationsData.data.length > 0) {
              locationsData = regionLocationsData.data.map((loc: any) => ({
                _id: loc.sampleTourId || `location-${loc.location}`,
                name: loc.location,
                slug: loc.sampleSlug || loc.location.toLowerCase().replace(/\s+/g, '-'),
                region: displayRegion,
                image: loc.sampleImage || '/images/default-tour.jpg',
                duration: 'Multi-day',
                price: 0,
                shortDescription: `Explore ${loc.location} with ${loc.count} available tours`,
                rating: 4.5,
                count: loc.count
              }));
            }
          }

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

  // ── Apply filters + sort client-side ───────────────────────────────────────
  const filteredLocations = useMemo(() => {
    let result = locations.filter((loc) => {
      const matchesSearch =
        filters.search === '' ||
        (loc.name as string).toLowerCase().includes(filters.search.toLowerCase()) ||
        (loc.shortDescription as string ?? '').toLowerCase().includes(filters.search.toLowerCase());

      const matchesDistrict =
        filters.district === 'all' ||
        (loc.district as string ?? '').toLowerCase() === filters.district ||
        (loc.name as string ?? '').toLowerCase() === filters.district;

      const matchesDuration =
        filters.duration === 'all' ||
        matchesDurationBucket(loc.duration ?? '', filters.duration);

      return matchesSearch && matchesDistrict && matchesDuration;
    });

    // Sort
    switch (filters.sort) {
      case 'price-asc':  result = [...result].sort((a, b) => (a.price ?? 0) - (b.price ?? 0)); break;
      case 'price-desc': result = [...result].sort((a, b) => (b.price ?? 0) - (a.price ?? 0)); break;
      case 'rating':     result = [...result].sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0)); break;
    }

    return result;
  }, [locations, filters]);

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
        <RegionHero region={region} displayName={displayRegion} image={regionData?.image} />
        <RegionMap mapUrl={mapUrl} />
      </div>
      <ToursFilter
        region={region}
        filters={filters}
        setFilters={setFilters}
      />
      <div className="mx-24">
        <PaginatedLocationGrid locations={filteredLocations} displayRegion={displayRegion} />
      </div>
    </div>
  );
}
