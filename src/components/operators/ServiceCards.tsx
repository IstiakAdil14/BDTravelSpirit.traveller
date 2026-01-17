'use client';

import { motion } from 'framer-motion';
import { Hotel, Car, Users, Utensils, Ticket, Shield } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface ServiceCardsProps {
  services: string[];
}

const serviceIcons = {
  'Hotel Booking': Hotel,
  'Transport & Transfers': Car,
  'Professional Tour Guides': Users,
  'Meal Arrangements': Utensils,
  'Tickets & Entry Passes': Ticket,
  'Travel Insurance': Shield
};

const serviceDescriptions = {
  'Hotel Booking': 'Comfortable accommodations across all price ranges',
  'Transport & Transfers': 'Reliable transportation and airport transfers',
  'Professional Tour Guides': 'Expert local guides with deep cultural knowledge',
  'Meal Arrangements': 'Authentic local cuisine and dietary accommodations',
  'Tickets & Entry Passes': 'Skip-the-line access to attractions and events',
  'Travel Insurance': 'Comprehensive coverage for peace of mind'
};

export default function ServiceCards({ services }: ServiceCardsProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Tour Arrangement Capabilities</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => {
          const IconComponent = serviceIcons[service as keyof typeof serviceIcons] || Users;
          const description = serviceDescriptions[service as keyof typeof serviceDescriptions] || 'Professional service';
          
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">{service}</h3>
                      <p className="text-sm text-gray-600">{description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}