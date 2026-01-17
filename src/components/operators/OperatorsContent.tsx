'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import OperatorHero from './OperatorHero';
import OperatorFilters from './OperatorFilters';
import OperatorGrid from './OperatorGrid';

interface Operator {
  _id: string;
  id: number;
  name: string;
  slug: string;
  logo: string;
  rating: number;
  reviews: number;
  totalTours: number;
  shortDescription: string;
  specialties: string[];
  certified: boolean;
  verified: boolean;
  experience: string;
  region: string;
}

export default function OperatorsContent() {
  const [operators, setOperators] = useState<Operator[]>([]);
  const [filteredOperators, setFilteredOperators] = useState<Operator[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    rating: 'all',
    verified: false,
    region: 'all',
    sort: 'popular'
  });

  useEffect(() => {
    fetchOperators();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [operators, filters]);

  const fetchOperators = async () => {
    try {
      const response = await fetch('/api/operators');
      const data = await response.json();
      setOperators(data.operators || []);
    } catch (error) {
      console.error('Error fetching operators:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...operators];
    console.log('Original operators:', operators.length);
    console.log('Sample operator fields:', operators[0]);
    console.log('Current filters:', filters);

    // Search filter
    if (filters.search) {
      filtered = filtered.filter(op => 
        op.name?.toLowerCase().includes(filters.search.toLowerCase()) ||
        op.shortDescription?.toLowerCase().includes(filters.search.toLowerCase())
      );
      console.log('After search filter:', filtered.length);
    }

    // Rating filter
    if (filters.rating && filters.rating !== 'all') {
      const minRating = parseFloat(filters.rating);
      filtered = filtered.filter(op => op.rating >= minRating);
      console.log('After rating filter:', filtered.length, 'minRating:', minRating);
    }

    // Verified filter
    if (filters.verified) {
      filtered = filtered.filter(op => op.verified);
      console.log('After verified filter:', filtered.length);
    }

    // Region filter - skip if no region field exists
    if (filters.region && filters.region !== 'all') {
      console.log('Filtering by region:', filters.region);
      console.log('Available regions:', [...new Set(operators.map(op => op.region))]);
      filtered = filtered.filter(op => op.region === filters.region);
      console.log('After region filter:', filtered.length);
    }

    // Sort
    switch (filters.sort) {
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'tours':
        filtered.sort((a, b) => (b.totalTours || 0) - (a.totalTours || 0));
        break;
      default: // popular
        filtered.sort((a, b) => (b.totalTours || 0) - (a.totalTours || 0));
    }
    console.log('After sorting by:', filters.sort, 'Final count:', filtered.length);

    setFilteredOperators(filtered);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <OperatorHero />
      <OperatorFilters filters={filters} setFilters={setFilters} />
      <OperatorGrid operators={filteredOperators} loading={loading} />
    </motion.div>
  );
}