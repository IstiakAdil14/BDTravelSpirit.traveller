"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

interface Destination {
  _id: string;
  title: string;
  slug: string;
  destination: string;
  rating: number;
  reviewCount: number;
  price: number;
  currency: string;
  heroImage: string;
  duration: number;
}

export default function MostPopularDestinationsPage() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  
  useEffect(() => {
    const updateItemsPerPage = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setItemsPerPage(4);
      } else if (width < 1024) {
        setItemsPerPage(6);
      } else {
        setItemsPerPage(8);
      }
    };
    
    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);
    return () => window.removeEventListener('resize', updateItemsPerPage);
  }, []);

  useEffect(() => {
    async function fetchDestinations() {
      try {
        const response = await fetch('/api/most-popular-destinations');
        if (response.ok) {
          const data = await response.json();
          setDestinations(data);
        }
      } catch (error) {
        console.error('Error fetching destinations:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchDestinations();
  }, []);
  
  const totalPages = Math.ceil(destinations.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentDestinations = destinations.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
    }
  }, [totalPages, currentPage]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 mt-16">
        <h1 className="text-3xl font-bold mb-8">Most Popular Destinations</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="border rounded-lg overflow-hidden animate-pulse">
              <div className="w-full h-48 bg-gray-200"></div>
              <div className="p-4 space-y-2">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <h1 className="text-3xl font-bold mb-8">Most Popular Destinations</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {currentDestinations.map((dest, index) => (
          <Link 
            key={dest._id} 
            href={`/tours?region=${dest.destination?.toLowerCase().replace(/\s+/g, '-') || 'bangladesh'}&tour=${dest.slug}&most-popular-destination=true`}
          >
            <div className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
              <div className="relative">
                {dest.heroImage && (
                  <img 
                    src={dest.heroImage} 
                    alt={dest.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="absolute top-2 left-2 bg-blue-600 text-white px-2 py-1 rounded text-sm">
                  #{startIndex + index + 1}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">{dest.title}</h3>
                <p className="text-gray-600 mb-2">{dest.destination}</p>
                <div className="flex items-center mb-2">
                  <span className="text-yellow-500">★</span>
                  <span className="ml-1 font-medium">{dest.rating.toFixed(1)}</span>
                  <span className="text-gray-500 ml-1">({dest.reviewCount})</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-lg">
                    {dest.currency} {dest.price}
                  </span>
                  <span className="text-gray-500">{dest.duration} days</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      {totalPages > 1 && (
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 mt-12">
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
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
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:border-gray-300 transition-all duration-200"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-500">
              Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, destinations.length)} of {destinations.length} destinations
            </p>
          </div>
        </div>
      )}
    </div>
  );
}