import { useState, useEffect } from 'react';
import { Destination, DestinationFilters } from '@/types/destination';

interface UseDestinationsReturn {
  destinations: Destination[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useDestinations(filters?: DestinationFilters): UseDestinationsReturn {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDestinations = async () => {
    try {
      setLoading(true);
      setError(null);

      const queryParams = new URLSearchParams();

      if (filters?.category) queryParams.append('category', filters.category);
      if (filters?.sortBy) queryParams.append('sortBy', filters.sortBy);
      if (filters?.limit) queryParams.append('limit', filters.limit.toString());
      if (filters?.offset) queryParams.append('offset', filters.offset.toString());

      const response = await fetch(`/api/destinations?${queryParams}`);

      if (!response.ok) {
        throw new Error('Failed to fetch destinations');
      }

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || 'Failed to fetch destinations');
      }

      setDestinations(data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDestinations();
  }, [filters, fetchDestinations]);

  return {
    destinations,
    loading,
    error,
    refetch: fetchDestinations,
  };
}

export function useFeaturedDestinations(limit: number = 5): UseDestinationsReturn {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDestinations = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/destinations?featured=true&limit=${limit}`);

      if (!response.ok) {
        throw new Error('Failed to fetch featured destinations');
      }

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || 'Failed to fetch featured destinations');
      }

      setDestinations(data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDestinations();
  }, [limit, fetchDestinations]);

  return {
    destinations,
    loading,
    error,
    refetch: fetchDestinations,
  };
}
