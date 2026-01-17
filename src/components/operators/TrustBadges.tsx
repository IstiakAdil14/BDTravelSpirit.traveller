'use client';

import { motion } from 'framer-motion';
import { Shield, CreditCard, Headphones, FileText } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function TrustBadges() {
  const trustItems = [
    {
      icon: Shield,
      title: 'Verified Operator',
      description: 'Identity and credentials verified',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-100'
    },
    {
      icon: CreditCard,
      title: 'Secure Payments',
      description: 'SSL encrypted payment processing',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      icon: Headphones,
      title: 'Customer Support',
      description: '24/7 assistance available',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      icon: FileText,
      title: 'Licensed & Registered',
      description: 'Fully licensed tour operator',
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    }
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Trust, Safety & Compliance</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {trustItems.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className={`w-16 h-16 mx-auto mb-4 ${item.bgColor} rounded-full flex items-center justify-center`}>
                  <item.icon className={`w-8 h-8 ${item.color}`} />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}