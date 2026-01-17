'use client';

import { motion } from 'framer-motion';
import { Leaf, Mountain, Building, Users, Briefcase, DollarSign } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface SpecializationCardsProps {
  specializations: string[];
}

const specializationIcons = {
  'Eco Tourism': Leaf,
  'Adventure Tours': Mountain,
  'Cultural Heritage': Building,
  'Family Packages': Users,
  'Corporate Tours': Briefcase,
  'Budget Travel': DollarSign
};

const specializationColors = {
  'Eco Tourism': 'bg-green-100 text-green-700 border-green-200',
  'Adventure Tours': 'bg-orange-100 text-orange-700 border-orange-200',
  'Cultural Heritage': 'bg-purple-100 text-purple-700 border-purple-200',
  'Family Packages': 'bg-blue-100 text-blue-700 border-blue-200',
  'Corporate Tours': 'bg-gray-100 text-gray-700 border-gray-200',
  'Budget Travel': 'bg-emerald-100 text-emerald-700 border-emerald-200'
};

export default function SpecializationCards({ specializations }: SpecializationCardsProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Operator Strengths & Specializations</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {specializations.map((specialization, index) => {
          const IconComponent = specializationIcons[specialization as keyof typeof specializationIcons] || Mountain;
          const colorClass = specializationColors[specialization as keyof typeof specializationColors] || 'bg-gray-100 text-gray-700 border-gray-200';
          
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full flex items-center justify-center">
                    <IconComponent className="w-8 h-8 text-emerald-600" />
                  </div>
                  <Badge className={`${colorClass} mb-2`}>
                    {specialization}
                  </Badge>
                  <p className="text-sm text-gray-600 mt-2">
                    Expert in {specialization.toLowerCase()} experiences
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}