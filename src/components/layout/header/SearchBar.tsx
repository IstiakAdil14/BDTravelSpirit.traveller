'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Calendar, ArrowRight, MapPin } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Calendar05 } from './RangeCalender';
import { useDateFormat } from '@/hooks/useDateFormat';
import { type DateRange } from "react-day-picker";
import { showProductionNotification } from '@/components/shared/ProductionNotification';

// ✅ Updated hook: prevents SSR/CSR mismatch
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);

    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  return isMobile;
};

interface SearchBarProps {
  className?: string;
  isLoading?: boolean;
}

export default function SearchBar({ className = '', isLoading = false }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [selectedDateRange, setSelectedDateRange] = useState<DateRange | undefined>(undefined);
  const [passengers] = useState({ adults: 2, children: 0 });
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isMobile = useIsMobile();
  const formatDate = useDateFormat();
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());

  // ✅ Prevent hydration mismatch until client knows screen size
  if (isMobile === null) {
    return null;
  }

  if (isLoading) {
    return (
      <div className={`relative ${className}`}>
        {isCalendarOpen && (
          <div className="fixed inset-0 bg-black/10 backdrop-blur-sm z-10 pointer-events-none" />
        )}
        <div className="flex items-center bg-white rounded-2xl shadow-lg border border-gray-200/50 overflow-hidden min-h-[48px] md:min-h-[56px] lg:min-h-[64px] max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl gap-0 md:gap-0">
          {/* Destination Input Skeleton */}
          <div className="flex-1 relative">
            <div className="flex items-center px-4 py-2 md:py-3">
              <div className="w-5 h-5 bg-gray-300 rounded mr-3 animate-pulse" />
              <div className="flex-1 h-5 bg-gray-300 rounded animate-pulse" />
            </div>
          </div>

          {/* Divider */}
          <div className="w-0 md:w-px h-8 bg-gray-200" />

          {/* Date Picker Skeleton */}
          <div className="flex items-center px-2 md:px-4 py-2 md:py-3 min-w-[100px] md:min-w-[140px] lg:min-w-[160px]">
            <div className="w-5 h-5 bg-gray-300 rounded mr-2 md:mr-3 animate-pulse" />
            {!isMobile && <div className="h-4 bg-gray-300 rounded w-16 animate-pulse" />}
          </div>

          {/* Search Button Skeleton */}
          <div
            className={`bg-gray-300 animate-pulse mr-2 ${isMobile
                ? 'px-2 py-2 rounded-full w-10 h-10'
                : 'px-4 py-2 rounded-xl h-10 w-20'
              }`}
          />
        </div>
      </div>
    );
  }

  const handleSearch = () => {
    showProductionNotification();
  };

  return (
    <div className={`relative ${className}`}>
      <div className="flex items-center bg-white rounded-2xl shadow-lg border border-gray-200/50 overflow-hidden min-h-[48px] md:min-h-[56px] lg:min-h-[64px] max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl gap-0 md:gap-0">
        {/* Destination Input */}
        <div className="flex-1 relative">
          <label htmlFor="search-input" className="sr-only">
            Search for destination or activity
          </label>
          <div className="flex items-center px-4 py-2 md:py-3">
            <MapPin className="w-5 h-5 text-gray-400 mr-3" />
            <input
              id="search-input"
              ref={inputRef}
              type="text"
              placeholder={isMobile ? 'Search destination' : 'Search for destination or activity'}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 outline-none text-gray-900 placeholder-gray-500"
            />
          </div>
        </div>

        {/* Divider */}
        <div className="w-0 md:w-px h-8 bg-gray-200" />

        {/* Date Picker Trigger */}
        <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>

          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              className="flex items-center px-2 py-2 rounded-xl 
                        hover:bg-emerald-50 transition-colors 
                        min-w-[40px] outline-none cursor-pointer"
              onMouseEnter={() => setIsCalendarOpen(true)}
              onMouseLeave={() => {
                closeTimeoutRef.current = setTimeout(() => setIsCalendarOpen(false), 200);
              }}
              onClick={(e) => e.preventDefault()}
            >
              <Calendar
                className={`w-5 h-5 transition-colors ${selectedDateRange?.from
                    ? 'text-emerald-600'
                    : 'text-gray-400 hover:text-emerald-600'
                  }`}
              />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-auto p-0 bg-white/80 backdrop-blur-sm mr-3"
            align="start"
            onMouseEnter={() => {
              if (closeTimeoutRef.current) {
                clearTimeout(closeTimeoutRef.current);
                closeTimeoutRef.current = null;
              }
            }}
            onMouseLeave={() => {
              closeTimeoutRef.current = setTimeout(() => setIsCalendarOpen(false), 200);
            }}
          >
            <Calendar05 selected={selectedDateRange} onSelect={setSelectedDateRange}
              currentMonth={currentMonth}
              onMonthChange={setCurrentMonth}
            />
            {selectedDateRange && (
              <div className="p-3 border-t">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedDateRange(undefined)}
                  className="w-80px text-sm bg-white hover:bg-red-50 hover:text-red-600 cursor-pointer"
                >
                  Clear dates
                </Button>
              </div>
            )}
          </PopoverContent>
        </Popover>

        {/* Search Button */}
        <motion.button
          whileHover={{
            scale: 1.05,
            boxShadow: '0 10px 25px rgba(16, 185, 129, 0.3)',
          }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSearch}
          className={`bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold hover:shadow-xl transition-all duration-300 flex items-center gap-2 outline-none cursor-pointer border border-emerald-400/20 mr-2 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 ${isMobile ? 'px-2 py-2 rounded-full' : 'px-4 py-2 rounded-xl'
            }`}
        >
          {isMobile ? (
            <Search className="w-4 h-4" />
          ) : (
            <>
              Search
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </motion.button>
      </div>
    </div>
  );
}