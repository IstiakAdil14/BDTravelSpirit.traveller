'use client';

import { motion } from 'framer-motion';
import { MapPin, Clock, Phone, Navigation } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const offices = [
  {
    city: 'Dhaka',
    type: 'Headquarters',
    address: 'House 123, Road 45, Gulshan-2, Dhaka 1212',
    phone: '+880 2-9876543',
    hours: '9:00 AM - 8:00 PM',
    coordinates: { lat: 23.7808, lng: 90.4142 },
    features: ['Main Office', 'Tour Planning', 'Customer Service', 'Group Bookings']
  },
  {
    city: 'Chittagong',
    type: 'Regional Office',
    address: 'CDA Avenue, Nasirabad, Chittagong 4000',
    phone: '+880 31-123456',
    hours: '9:00 AM - 7:00 PM',
    coordinates: { lat: 22.3569, lng: 91.7832 },
    features: ['Cox\'s Bazar Tours', 'Hill Tracts', 'Beach Packages']
  },
  {
    city: 'Sylhet',
    type: 'Branch Office',
    address: 'Zindabazar, Sylhet 3100',
    phone: '+880 821-123456',
    hours: '9:00 AM - 6:00 PM',
    coordinates: { lat: 24.8949, lng: 91.8687 },
    features: ['Tea Garden Tours', 'Srimangal Trips', 'Nature Packages']
  }
];

export default function OfficeLocations() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="py-16"
    >
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Visit Our Offices
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Meet our travel experts in person across Bangladesh's major cities
          </p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {offices.map((office, index) => (
          <motion.div
            key={office.city}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            <Card className="professional-card border-0 h-full hover:shadow-professional-lg transition-all duration-300 group">
              <CardContent className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      {office.city}
                    </h3>
                    <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 text-sm font-medium rounded-full">
                      {office.type}
                    </span>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                </div>

                {/* Address */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {office.address}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    <p className="text-gray-600 text-sm">{office.phone}</p>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    <p className="text-gray-600 text-sm">{office.hours}</p>
                  </div>
                </div>

                {/* Features */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3 text-sm">Services Available</h4>
                  <div className="flex flex-wrap gap-2">
                    {office.features.map((feature, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white"
                  >
                    <Navigation className="w-4 h-4 mr-2" />
                    Get Directions
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                  >
                    <Phone className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Map placeholder */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mt-12"
      >
        <Card className="professional-card border-0 overflow-hidden">
          <div className="h-64 bg-gradient-to-r from-emerald-100 to-teal-100 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Interactive Map</h3>
              <p className="text-gray-600">Find our offices and get directions</p>
              <Button className="mt-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white">
                View Full Map
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>
    </motion.section>
  );
}