'use client';

import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { MapPin, Users, Star, Award, Camera, Globe } from 'lucide-react';

export default function StatsSection() {
  const stats = [
    {
      icon: MapPin,
      value: 40,
      suffix: '+',
      label: 'Unique Destinations',
      description: 'Carefully curated locations across Bangladesh',
      color: 'from-emerald-500 to-teal-500'
    },
    {
      icon: Users,
      value: 10,
      suffix: '+',
      label: 'Happy Travelers',
      description: 'Satisfied customers from around the world',
      color: 'from-blue-500 to-indigo-500'
    },
    {
      icon: Star,
      value: 4.9,
      suffix: '/5',
      label: 'Average Rating',
      description: 'Based on authentic customer reviews',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: Award,
      value: 0,
      suffix: '+',
      label: 'Awards Won',
      description: 'Recognition for excellence in tourism',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Camera,
      value: 10,
      suffix: '+',
      label: 'Photo Memories',
      description: 'Thousands of captured moments',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Globe,
      value: 0,
      suffix: '+',
      label: 'Countries Served',
      description: 'International travelers welcomed',
      color: 'from-red-500 to-rose-500'
    }
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-emerald-100 via-teal-100 to-blue-100"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
            Our Impact in Numbers
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            These numbers tell the story of our commitment to excellence and 
            the trust that thousands of travelers have placed in us.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="professional-card p-8 text-center hover:scale-105 transition-all duration-300 relative overflow-hidden">
                {/* Background Glow */}
                <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                
                {/* Icon */}
                <div className="relative z-10">
                  <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-r ${stat.color} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Counter */}
                  <div className="mb-4">
                    <div className="text-4xl md:text-5xl font-bold text-slate-800 mb-2">
                      <CountUp
                        end={stat.value}
                        duration={2.5}
                        separator=","
                        decimal="."
                        decimals={stat.label === 'Average Rating' ? 1 : 0}
                        enableScrollSpy
                        scrollSpyOnce
                      />
                      <span className="text-emerald-600">{stat.suffix}</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2">
                      {stat.label}
                    </h3>
                    <p className="text-slate-600 text-sm">
                      {stat.description}
                    </p>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-slate-200 rounded-full h-2 mb-4">
                    <motion.div
                      className={`h-2 rounded-full bg-gradient-to-r ${stat.color}`}
                      initial={{ width: 0 }}
                      whileInView={{ width: '100%' }}
                      transition={{ duration: 1.5, delay: index * 0.2 }}
                      viewport={{ once: true }}
                    ></motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Achievement Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <div className="professional-card p-8 text-center">
            <h3 className="text-2xl font-bold text-slate-800 mb-6">
              Trusted by Travelers Worldwide
            </h3>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              {['TripAdvisor Excellence', 'Google Reviews 4.9★', 'Tourism Board Certified', 'Eco-Tourism Award'].map((achievement, index) => (
                <motion.div
                  key={achievement}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-slate-600 font-medium"
                >
                  {achievement}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}