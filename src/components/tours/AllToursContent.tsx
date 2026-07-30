'use client';

import { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import PaginatedLocationGrid from '@/components/tours/[region]/all-locations/PaginatedLocationGrid';
import ToursFilter, { ToursFilterState } from './ToursFilter';
import { ourTourLocations } from '@/constants/tour';

const EMPTY_FILTER: ToursFilterState = { search: '', district: 'all', duration: 'all', sort: 'default' };

function parseDays(duration: string): number | null {
  const match = duration.match(/^(\d+)/);
  return match ? parseInt(match[1], 10) : null;
}

function matchesDurationBucket(duration: string, bucket: string): boolean {
  const days = parseDays(duration);
  if (days === null) return bucket === '7+'; 
  if (bucket === '1')   return days === 1;
  if (bucket === '2-3') return days >= 2 && days <= 3;
  if (bucket === '4-7') return days >= 4 && days <= 7;
  if (bucket === '7+')  return days > 7;
  return false;
}

export default function AllToursContent() {
  const searchParams = useSearchParams();
  const searchParamQuery = searchParams.get('search') || '';
  const startDateParam = searchParams.get('startDate') || '';
  const endDateParam = searchParams.get('endDate') || '';

  const [locations, setLocations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<ToursFilterState>({ ...EMPTY_FILTER, search: searchParamQuery });

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const queryParams = new URLSearchParams({ status: 'published', limit: '1000' });
        if (searchParamQuery) {
          queryParams.set('search', searchParamQuery);
        }
        if (startDateParam) {
          queryParams.set('startDate', startDateParam);
        }
        if (endDateParam) {
          queryParams.set('endDate', endDateParam);
        }
        
        const res = await fetch(`/api/tours?${queryParams.toString()}`);
        const data = res.ok ? await res.json() : [];
        
        let mappedLocations = [];

        if (data && data.length > 0) {
          mappedLocations = data.map((t: any) => ({
            _id: t._id,
            name: t.title,
            slug: t.slug,
            region: t.region || 'Bangladesh',
            image: t.heroImage || '/images/placeholder.jpg',
            duration: t.durationDays ? `${t.durationDays} Days` : 'Multi-day',
            price: t.priceFrom || 0,
            shortDescription: t.description || '',
            rating: t.rating || 0,
          }));
        }

        setLocations(mappedLocations);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      setLoading(false);
    }

    fetchData();
  }, [searchParamQuery, startDateParam, endDateParam]);

  const filteredLocations = useMemo(() => {
    let result = locations.filter((loc) => {
      const matchesSearch =
        filters.search === '' ||
        (loc.name as string).toLowerCase().includes(filters.search.toLowerCase()) ||
        (loc.shortDescription as string ?? '').toLowerCase().includes(filters.search.toLowerCase());

      const matchesDistrict = 
        filters.district === 'all' ||
        (loc.region as string ?? '').toLowerCase() === filters.district ||
        (loc.name as string ?? '').toLowerCase() === filters.district;

      const matchesDuration =
        filters.duration === 'all' ||
        matchesDurationBucket(loc.duration ?? '', filters.duration);

      return matchesSearch && matchesDistrict && matchesDuration;
    });

    switch (filters.sort) {
      case 'price-asc':  result = [...result].sort((a, b) => (a.price ?? 0) - (b.price ?? 0)); break;
      case 'price-desc': result = [...result].sort((a, b) => (b.price ?? 0) - (a.price ?? 0)); break;
      case 'rating':     result = [...result].sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0)); break;
      // Default is already most recent because API returns it sorted by createdAt -1
    }

    return result;
  }, [locations, filters]);

  if (loading) {
    return (
      <div className="space-y-16 mt-10">
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
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center py-10">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">All Tour Locations</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Explore our complete collection of carefully curated tours across Bangladesh.
        </p>
      </div>
      
      <ToursFilter
        region="all"
        filters={filters}
        setFilters={setFilters}
      />
      <div className="mx-4 md:mx-12 lg:mx-24 mt-8">
        <PaginatedLocationGrid locations={filteredLocations} displayRegion="Bangladesh" />
      </div>
    </div>
  );
}
