'use client';

import { motion } from 'framer-motion';
import { Star, Briefcase, Users, MapPin, Calendar, Award } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface OperatorStatsProps {
  stats: {
    toursCompleted: number;
    travelersServed: number;
    regionsCovered: number;
    experienceYears: number;
  };
  rating: number;
}

export default function OperatorStats({ stats, rating }: OperatorStatsProps) {
  const statCards = [
    {
      icon: Star,
      value: rating,
      suffix: '',
      label: 'Rating',
      color: 'text-yellow-500'
    },
    {
      icon: Briefcase,
      value: stats.toursCompleted,
      suffix: '+',
      label: 'Tours Completed',
      color: 'text-emerald-600'
    },
    {
      icon: Users,
      value: stats.travelersServed,
      suffix: '+',
      label: 'Travelers Served',
      color: 'text-blue-600'
    },
    {
      icon: MapPin,
      value: stats.regionsCovered,
      suffix: '',
      label: 'Regions Covered',
      color: 'text-purple-600'
    },
    {
      icon: Calendar,
      value: stats.experienceYears,
      suffix: '+',
      label: 'Years Experience',
      color: 'text-orange-600'
    },
    {
      icon: Award,
      value: 'Top',
      suffix: '',
      label: 'Rated Operator',
      color: 'text-red-600'
    }
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Performance Stats</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {statCards.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <stat.icon className={`w-8 h-8 mx-auto mb-3 ${stat.color}`} />
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {stat.value}{stat.suffix}
                </div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}