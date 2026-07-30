'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, X, Clock, MapPin } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { divisionDistricts } from '@/data/bangladesh-division';

export interface ToursFilterState {
  search: string;
  district: string;
  duration: string;
  sort: string;
}

interface ToursFilterProps {
  region: string;
  filters: ToursFilterState;
  setFilters: (filters: ToursFilterState) => void;
}

const EMPTY_FILTERS: ToursFilterState = {
  search: '',
  district: 'all',
  duration: 'all',
  sort: 'default',
};

const DISTRICT_LABELS: Record<string, string> = {
  'tanga': 'Tangail',
  "cox's bazar": "Cox's Bazar",
  'comilla': 'Cumilla',
  'barisal': 'Barishal',
  'jhalokati': 'Jhalokathi',
  'netrakona': 'Netrokona',
  'chapainawabganj': 'Chapainawabganj',
};

function capitalize(s: string) {
  return DISTRICT_LABELS[s] ?? s.replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function ToursFilter({ region, filters, setFilters }: ToursFilterProps) {
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const districts = divisionDistricts[region.toLowerCase()] ?? [];

  const update = (key: keyof ToursFilterState, value: string) => {
    setFilters({ ...filters, [key]: value });
  };

  const clearAll = () => setFilters(EMPTY_FILTERS);

  const hasActiveFilters =
    filters.search !== '' ||
    filters.district !== 'all' ||
    filters.duration !== 'all' ||
    filters.sort !== 'default';

  return (
    <section className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 py-4">

        {/* ── Desktop ─────────────────────────────────────────────────────── */}
        <div className="hidden lg:flex items-center gap-4">

          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search tours..."
              value={filters.search}
              onChange={(e) => update('search', e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Duration filter */}
          <Select value={filters.duration} onValueChange={(v) => update('duration', v)}>
            <SelectTrigger className="w-38">
              <Clock className="w-4 h-4 mr-1.5 text-emerald-500 shrink-0" />
              <SelectValue placeholder="Duration" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Any Duration</SelectItem>
              <SelectItem value="1">1 Day</SelectItem>
              <SelectItem value="2-3">2–3 Days</SelectItem>
              <SelectItem value="4-7">4–7 Days</SelectItem>
              <SelectItem value="7+">7+ Days</SelectItem>
            </SelectContent>
          </Select>

          {/* District filter */}
          {districts.length > 0 && (
            <Select value={filters.district} onValueChange={(v) => update('district', v)}>
              <SelectTrigger className="w-44">
                <MapPin className="w-4 h-4 mr-1.5 text-blue-500 shrink-0" />
                <SelectValue placeholder="District" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Districts</SelectItem>
                {districts.map((d) => (
                  <SelectItem key={d} value={d}>
                    {capitalize(d)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          {/* Sort */}
          <Select value={filters.sort} onValueChange={(v) => update('sort', v)}>
            <SelectTrigger className="w-44">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Default Order</SelectItem>
              <SelectItem value="price-asc">Price: Low → High</SelectItem>
              <SelectItem value="price-desc">Price: High → Low</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
            </SelectContent>
          </Select>

          {/* Clear */}
          {hasActiveFilters && (
            <Button variant="ghost" onClick={clearAll} className="text-gray-500 shrink-0">
              <X className="w-4 h-4 mr-1" />
              Clear
            </Button>
          )}
        </div>

        {/* ── Mobile ──────────────────────────────────────────────────────── */}
        <div className="lg:hidden">
          <div className="flex items-center gap-2 mb-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search tours..."
                value={filters.search}
                onChange={(e) => update('search', e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" onClick={() => setShowMobileFilters((o) => !o)}>
              <Filter className="w-4 h-4" />
            </Button>
            {hasActiveFilters && (
              <Button variant="ghost" size="icon" onClick={clearAll} className="text-gray-500">
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>

          {showMobileFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-200"
            >
              {/* Duration */}
              <Select value={filters.duration} onValueChange={(v) => update('duration', v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any Duration</SelectItem>
                  <SelectItem value="1">1 Day</SelectItem>
                  <SelectItem value="2-3">2–3 Days</SelectItem>
                  <SelectItem value="4-7">4–7 Days</SelectItem>
                  <SelectItem value="7+">7+ Days</SelectItem>
                </SelectContent>
              </Select>

              {/* District */}
              {districts.length > 0 && (
                <Select value={filters.district} onValueChange={(v) => update('district', v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="District" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Districts</SelectItem>
                    {districts.map((d) => (
                      <SelectItem key={d} value={d}>
                        {capitalize(d)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}

              {/* Sort */}
              <Select value={filters.sort} onValueChange={(v) => update('sort', v)}>
                <SelectTrigger className="col-span-2">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Default Order</SelectItem>
                  <SelectItem value="price-asc">Price: Low → High</SelectItem>
                  <SelectItem value="price-desc">Price: High → Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>
            </motion.div>
          )}
        </div>

      </div>
    </section>
  );
}
