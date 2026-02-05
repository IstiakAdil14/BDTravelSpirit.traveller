'use client';

import { motion } from 'framer-motion';
import { Leaf, Heart, Shield, Globe, Users, Star } from 'lucide-react';
import { showProductionNotification } from '@/components/shared/ProductionNotification';

export default function ValuesSection() {
  const values = [
    {
      icon: Leaf,
      title: 'Sustainability',
      description: 'We promote eco-friendly travel practices that preserve Bangladesh\'s natural beauty for future generations.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Heart,
      title: 'Authenticity',
      description: 'Every experience we offer is genuine, connecting travelers with the real heart and soul of Bangladesh.',
      color: 'from-red-500 to-pink-500'
    },
    {
      icon: Shield,
      title: 'Safety First',
      description: 'Your safety and security are our top priorities, with comprehensive support throughout your journey.',
      color: 'from-blue-500 to-indigo-500'
    },
    {
      icon: Globe,
      title: 'Cultural Bridge',
      description: 'We bridge cultures by facilitating meaningful exchanges between travelers and local communities.',
      color: 'from-purple-500 to-violet-500'
    },
    {
      icon: Users,
      title: 'Community Focus',
      description: 'Our tours directly benefit local communities, creating sustainable livelihoods and preserving traditions.',
      color: 'from-orange-500 to-amber-500'
    },
    {
      icon: Star,
      title: 'Excellence',
      description: 'We strive for excellence in every aspect of our service, from planning to execution.',
      color: 'from-yellow-500 to-orange-500'
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 to-blue-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
            Our Core Values
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            These principles guide everything we do, ensuring that every journey 
            with BD Travel Spirit is meaningful, responsible, and unforgettable.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="professional-card p-8 h-full hover:scale-105 transition-all duration-300 text-center">
                {/* Icon */}
                <div className="relative mb-6">
                  <div className={`w-20 h-20 mx-auto rounded-2xl bg-gradient-to-r ${value.color} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
                    <value.icon className="w-10 h-10 text-white" />
                  </div>
                  {/* Glow effect */}
                  <div className={`absolute inset-0 w-20 h-20 mx-auto rounded-2xl bg-gradient-to-r ${value.color} opacity-20 blur-xl group-hover:opacity-30 transition-opacity duration-300`}></div>
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-slate-800 mb-4 group-hover:text-emerald-600 transition-colors duration-300">
                  {value.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {value.description}
                </p>

                {/* Hover indicator */}
                <div className="mt-6 w-12 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mx-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="professional-card p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-slate-800 mb-4">
              Experience Our Values in Action
            </h3>
            <p className="text-slate-600 mb-6">
              Ready to embark on a journey that aligns with your values? 
              Discover how our principles create extraordinary travel experiences.
            </p>
            <button 
              onClick={showProductionNotification}
              className="gradient-button px-8 py-4 text-lg">
              Explore Our Tours
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}