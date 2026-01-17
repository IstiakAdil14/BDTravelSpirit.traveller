'use client';

import { motion } from 'framer-motion';
import { Star, MapPin, CheckCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';

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

interface OperatorCardProps {
  operator: Operator;
}

export default function OperatorCard({ operator }: OperatorCardProps) {
  return (
    <Link href={`/tours?operator=${operator.slug}`}>
      <motion.div
        whileHover={{
          scale: 1.03,
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
        }}
        transition={{ duration: 0.2 }}
        className="cursor-pointer"
      >
        <Card className="h-full border border-gray-200 hover:border-emerald-200 transition-colors duration-300 overflow-hidden">
          <CardContent className="p-6">
            {/* Logo and Verified Badge */}
            <div className="flex items-start justify-between mb-4">
              <div className="relative w-32 h-32 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                <Image
                  src={operator.logo}
                  alt={`${operator.name} logo`}
                  fill
                  className="object-cover"
                  sizes="120px"
                />
              </div>
              {operator.verified && (
                <div className="flex items-center gap-1 bg-emerald-50 text-emerald-700 px-2 py-1 rounded-full text-xs font-medium">
                  <CheckCircle className="w-3 h-3" />
                  Verified
                </div>
              )}
            </div>

            {/* Operator Name */}
            <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-1">
              {operator.name}
            </h3>

            {/* Description */}
            <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
              {operator.shortDescription && operator.shortDescription.length > 45
                ? `${operator.shortDescription.substring(0, 45)}...`
                : operator.shortDescription || 'No description available'}
            </p>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold text-gray-900">{operator.rating}</span>
              </div>
              <span className="text-gray-500 text-sm">({operator.totalTours} tours)</span>
            </div>

            {/* Region */}
            <div className="flex items-center gap-1 text-gray-500 text-sm">
              <MapPin className="w-4 h-4" />
              <span>{operator.region}</span>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </Link>
  );
}