'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface FilterProps {
  filters: {
    search: string;
    rating: string;
    verified: boolean;
    region: string;
    sort: string;
  };
  setFilters: (filters: any) => void;
}

const regions = [
  'Dhaka', 'Chittagong', 'Sylhet', 'Khulna', 'Barishal', 'Rajshahi', 'Rangpur', 'Mymensingh'
];

export default function OperatorFilters({ filters, setFilters }: FilterProps) {
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const updateFilter = (key: string, value: any) => {
    setFilters({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      rating: 'all',
      verified: false,
      region: 'all',
      sort: 'popular'
    });
  };

  return (
    <section className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        {/* Desktop Filters */}
        <div className="hidden lg:flex items-center gap-4">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search operators..."
              value={filters.search}
              onChange={(e) => updateFilter('search', e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Rating Filter */}
          <Select value={filters.rating} onValueChange={(value) => updateFilter('rating', value)}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Rating" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Ratings</SelectItem>
              <SelectItem value="4">4★+</SelectItem>
              <SelectItem value="3">3★+</SelectItem>
            </SelectContent>
          </Select>

          {/* Verified Filter */}
          <Button
            variant={filters.verified ? "default" : "outline"}
            onClick={() => updateFilter('verified', !filters.verified)}
            className="whitespace-nowrap"
          >
            ✓ Verified Only
          </Button>

          {/* Region Filter */}
          <Select value={filters.region} onValueChange={(value) => updateFilter('region', value)}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Region" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Regions</SelectItem>
              {regions.map(region => (
                <SelectItem key={region} value={region}>{region}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Sort */}
          <Select value={filters.sort} onValueChange={(value) => updateFilter('sort', value)}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popular">Most Popular</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="tours">Most Tours</SelectItem>
            </SelectContent>
          </Select>

          {/* Clear Filters */}
          <Button variant="ghost" onClick={clearFilters} className="text-gray-500">
            <X className="w-4 h-4 mr-1" />
            Clear
          </Button>
        </div>

        {/* Mobile Filters */}
        <div className="lg:hidden">
          <div className="flex items-center gap-2 mb-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search operators..."
                value={filters.search}
                onChange={(e) => updateFilter('search', e.target.value)}
                className="pl-10"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setShowMobileFilters(!showMobileFilters)}
            >
              <Filter className="w-4 h-4" />
            </Button>
          </div>

          {/* Mobile Filter Panel */}
          {showMobileFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-200"
            >
              <Select value={filters.rating} onValueChange={(value) => updateFilter('rating', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Rating" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Ratings</SelectItem>
                  <SelectItem value="4">4★+</SelectItem>
                  <SelectItem value="3">3★+</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filters.region} onValueChange={(value) => updateFilter('region', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Regions</SelectItem>
                  {regions.map(region => (
                    <SelectItem key={region} value={region}>{region}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button
                variant={filters.verified ? "default" : "outline"}
                onClick={() => updateFilter('verified', !filters.verified)}
                className="col-span-2"
              >
                ✓ Verified Only
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}