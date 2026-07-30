'use client';

import { motion } from 'framer-motion';
import { Star, MapPin, Shield, ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { showProductionNotification } from '@/components/shared/ProductionNotification';
import OperatorStats from './OperatorStats';
import AboutSection from './AboutSection';
import ContactForm from './ContactForm';
import TrustBadges from './TrustBadges';

const TOURS_PER_PAGE = 8;

interface Tour {
  id: number | string;
  name: string;
  slug: string;
  duration: string;
  price: number;
  rating: number;
  image: string | null;
  division?: string;
  region?: string;
}

interface Operator {
  name: string;
  slug: string;
  logo: string;
  rating: number;
  reviewCount: number;
  tagline: string;
  regions: string[];
  stats: {
    toursCompleted: number;
    travelersServed: number;
    regionsCovered: number;
    experienceYears: number;
  };
  services: string[];
  specializations: string[];
  verified: boolean;
  about: string;
  gallery: string[];
  tours: Tour[];
}

interface OperatorDetailPageProps {
  operator: Operator;
}

export default function OperatorDetailPage({ operator }: OperatorDetailPageProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil((operator.tours?.length || 0) / TOURS_PER_PAGE);
  const paginatedTours = (operator.tours || []).slice(
    (currentPage - 1) * TOURS_PER_PAGE,
    currentPage * TOURS_PER_PAGE
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30 mt-20">

      {/* Hero Banner */}
      <div className="relative h-72 md:h-96 w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-teal-800 to-slate-900" />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&fit=crop)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="relative h-full container mx-auto px-4 flex flex-col justify-end pb-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="flex items-end gap-6"
          >
            {/* Logo */}
            <div className="relative w-20 h-20 md:w-28 md:h-28 rounded-2xl overflow-hidden border-4 border-white/30 shadow-2xl flex-shrink-0">
              <Image src={operator.logo} alt={operator.name} fill className="object-cover" />
            </div>

            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h1 className="text-3xl md:text-5xl font-bold text-white">{operator.name}</h1>
                {operator.verified && (
                  <Badge className="bg-emerald-500/90 text-white border-0">
                    <Shield className="w-3 h-3 mr-1" /> Verified
                  </Badge>
                )}
              </div>
              <p className="text-white/80 text-lg mb-3">{operator.tagline}</p>
              <div className="flex flex-wrap items-center gap-4 text-white/70 text-sm">
                <span className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="font-semibold text-white">{operator.rating}</span>
                  ({operator.reviewCount} reviews)
                </span>
                {operator.regions?.length > 0 && (
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-emerald-400" />
                    {operator.regions.join(', ')}
                  </span>
                )}
              </div>
            </div>

            <div className="hidden md:flex gap-3">
              <Button
                onClick={showProductionNotification}
                size="lg"
                className="bg-emerald-500 hover:bg-emerald-600 text-white"
              >
                Contact Operator
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-8 lg:px-16 py-12 space-y-16">

        {/* Stats */}
        <OperatorStats stats={operator.stats} rating={operator.rating} />

        {/* About */}
        <AboutSection about={operator.about} />

        {/* Tours Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Tours by This Operator</h2>
              <p className="text-gray-500 mt-1">{operator.tours?.length || 0} tours available</p>
            </div>
            {totalPages > 1 && (
              <span className="text-sm text-gray-500">Page {currentPage} of {totalPages}</span>
            )}
          </div>

          {paginatedTours.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {paginatedTours.map((tour, index) => (
                  <Link
                    key={String(tour.id)}
                    href={`/tours?region=${(tour.division || tour.region || 'dhaka').toLowerCase()}&tour=${tour.slug}`}
                    className="block group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col cursor-pointer"
                  >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.08 }}
                    className="flex flex-col flex-1"
                  >
                    {/* Tour Image */}
                    <div className="relative h-36 w-full overflow-hidden">
                      {tour.image ? (
                        <Image
                          src={tour.image}
                          alt={tour.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-300 via-teal-400 to-cyan-500 group-hover:scale-105 transition-transform duration-500" />
                      )}
                      <div className="absolute top-3 right-3">
                        <Badge className="bg-white/90 text-emerald-700 shadow">
                          <Star className="w-3 h-3 mr-1 text-yellow-500 fill-current" />
                          {tour.rating}
                        </Badge>
                      </div>
                    </div>

                    <div className="flex flex-col flex-1 p-4">
                      <h3 className="font-bold text-sm text-gray-900 mb-2 leading-snug group-hover:text-emerald-700 transition-colors line-clamp-2">
                        {tour.name}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4 text-emerald-500" />
                          {tour.duration}
                        </span>
                      </div>
                      <div className="mt-auto flex items-center justify-between">
                        <div>
                          <p className="text-xs text-gray-400 uppercase tracking-wide font-medium">From</p>
                          <p className="text-lg font-bold text-emerald-600">
                            {tour.price > 0 ? `৳${tour.price.toLocaleString()}` : 'Contact'}
                          </p>
                        </div>
                        <Button
                          size="sm"
                          onClick={showProductionNotification}
                          className="rounded-full px-3 text-xs bg-emerald-600 hover:bg-emerald-700 text-white"
                        >
                          Book
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                  </Link>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-12">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="flex items-center gap-1.5 px-5 py-2.5 rounded-full border border-gray-200 text-gray-600 hover:border-emerald-500 hover:text-emerald-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all text-sm font-medium"
                  >
                    <ChevronLeft className="w-4 h-4" /> Prev
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-10 h-10 rounded-full font-medium text-sm transition-all ${
                        page === currentPage
                          ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200'
                          : 'border border-gray-200 text-gray-600 hover:border-emerald-400 hover:text-emerald-600'
                      }`}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="flex items-center gap-1.5 px-5 py-2.5 rounded-full border border-gray-200 text-gray-600 hover:border-emerald-500 hover:text-emerald-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all text-sm font-medium"
                  >
                    Next <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-24 bg-gradient-to-br from-gray-50 to-emerald-50/30 rounded-3xl border border-dashed border-gray-200">
              <div className="text-7xl mb-4">🏕️</div>
              <h3 className="text-2xl font-bold text-gray-700 mb-2">No Tours Listed Yet</h3>
              <p className="text-gray-500 max-w-sm mx-auto">This operator has not added any tours yet. Check back soon for exciting new packages!</p>
            </div>
          )}
        </motion.section>

        {/* Contact & Inquiry */}
        <ContactForm />

        {/* Trust & Safety */}
        <TrustBadges />
      </div>
    </div>
  );
}