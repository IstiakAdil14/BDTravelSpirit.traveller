'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import OperatorCard from './OperatorCard';
import OperatorCardSkeleton from './OperatorCardSkeleton';

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

interface OperatorGridProps {
  operators: Operator[];
  loading: boolean;
}

export default function OperatorGrid({ operators, loading }: OperatorGridProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);

  // Update items per page on mount and resize
  useEffect(() => {
    const updateItemsPerPage = () => {
      const width = window.innerWidth;
      if (width >= 1024) setItemsPerPage(8); // Desktop: 2 rows × 4 cols = 8 cards
      else if (width >= 640) setItemsPerPage(6);  // Tablet: 3 rows × 2 cols = 6 cards
      else setItemsPerPage(4); // Mobile: 4 rows × 1 col = 4 cards
    };
    
    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);
    return () => window.removeEventListener('resize', updateItemsPerPage);
  }, []);

  if (loading) {
    return (
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: itemsPerPage }).map((_, i) => (
            <OperatorCardSkeleton key={i} />
          ))}
        </div>
      </section>
    );
  }

  if (operators.length === 0) {
    return (
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md mx-auto"
        >
          <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No operators found</h3>
          <p className="text-gray-600">Try adjusting your filters to see more results.</p>
        </motion.div>
      </section>
    );
  }

  // Pagination logic
  const totalPages = Math.ceil(operators.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentOperators = operators.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="container mx-auto px-4 py-12">
      {/* Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      >
        {currentOperators.map((operator, index) => (
          <motion.div
            key={operator._id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <OperatorCard operator={operator} />
          </motion.div>
        ))}
      </motion.div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 mt-12">
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:border-gray-300 transition-all duration-200"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>
            
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Page</span>
              <div className="flex items-center space-x-1">
                <span className="px-3 py-1 text-sm font-semibold text-blue-600 bg-blue-50 border border-blue-200 rounded-md">
                  {currentPage}
                </span>
                <span className="text-sm text-gray-500">of</span>
                <span className="text-sm font-medium text-gray-700">{totalPages}</span>
              </div>
            </div>
            
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:border-gray-300 transition-all duration-200"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-500">
              Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, operators.length)} of {operators.length} operators
            </p>
          </div>
        </div>
      )}
    </section>
  );
}