'use client';

import { motion } from 'framer-motion';
import { Star, MapPin, Shield, Phone, Mail, Users, Calendar, Award, Camera } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import OperatorStats from './OperatorStats';
import ServiceCards from './ServiceCards';
import SpecializationCards from './SpecializationCards';
import AboutSection from './AboutSection';
import ContactForm from './ContactForm';
import TrustBadges from './TrustBadges';

interface Tour {
  id: number;
  name: string;
  duration: string;
  price: number;
  rating: number;
  image: string;
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
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30 mt-40">
      {/* Hero Header */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative bg-white border-b border-gray-200"
      >
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col lg:flex-row items-start gap-8">
            {/* Logo & Basic Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex-shrink-0"
            >
              <div className="relative w-24 h-24 rounded-2xl overflow-hidden border-2 border-emerald-200 shadow-lg">
                <Image
                  src={operator.logo}
                  alt={operator.name}
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>

            {/* Main Info */}
            <div className="flex-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex items-center gap-3 mb-4"
              >
                <h1 className="text-4xl font-bold text-gray-900">{operator.name}</h1>
                {operator.verified && (
                  <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">
                    <Shield className="w-3 h-3 mr-1" />
                    Verified
                  </Badge>
                )}
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-xl text-gray-600 mb-4"
              >
                {operator.tagline}
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex flex-wrap items-center gap-6 mb-6"
              >
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500 fill-current" />
                  <span className="font-semibold text-gray-900">{operator.rating}</span>
                  <span className="text-gray-600">({operator.reviewCount} reviews)</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-emerald-600" />
                  <span className="text-gray-700">{operator.regions.join(', ')}</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-wrap gap-4"
              >
                <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700">
                  View Tours
                </Button>
                <Button variant="outline" size="lg">
                  Contact Operator
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      <div className="container mx-auto px-4 py-12 space-y-16">
        {/* Performance Stats */}
        <OperatorStats stats={operator.stats} rating={operator.rating} />

        {/* Service Capabilities */}
        <ServiceCards services={operator.services} />

        {/* Specializations */}
        <SpecializationCards specializations={operator.specializations} />

        {/* About Section */}
        <AboutSection about={operator.about} />

        {/* Tours Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Tours by This Operator</h2>
          {operator.tours.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {operator.tours.map((tour, index) => (
                <motion.div
                  key={tour.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    <div className="aspect-video bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500">Tour Image</span>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-lg text-gray-900 mb-2">{tour.name}</h3>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm text-gray-600">{tour.duration}</span>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="text-sm font-medium">{tour.rating}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-bold text-emerald-600">৳{tour.price.toLocaleString()}</span>
                        <Button size="sm">View Details</Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-gray-50 rounded-2xl">
              <p className="text-gray-600">Tours coming soon...</p>
            </div>
          )}
        </motion.section>

        {/* Gallery Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <Camera className="w-6 h-6 text-emerald-600" />
            <h2 className="text-3xl font-bold text-gray-900">Gallery</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {operator.gallery.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative aspect-video rounded-xl overflow-hidden"
              >
                <div className="w-full h-full bg-gray-200 rounded-xl flex items-center justify-center">
                  <span className="text-gray-500">Image {index + 1}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Contact & Inquiry */}
        <ContactForm />

        {/* Trust & Safety */}
        <TrustBadges />
      </div>
    </div>
  );
}