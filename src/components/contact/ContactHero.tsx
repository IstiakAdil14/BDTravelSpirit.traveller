'use client';

import { motion } from 'framer-motion';
import { MapPin, Clock, Users, Award } from 'lucide-react';
import { useMemo } from 'react';

const stats = [
  { icon: Users, value: '10+', label: 'Happy Travelers' },
  { icon: Clock, value: '< 2hrs', label: 'Response Time' },
  { icon: MapPin, value: '40+', label: 'Destinations' },
  { icon: Award, value: '50%', label: 'Satisfaction' },
];

// Pre-defined positions to avoid hydration mismatch
const floatingDots = [
  { left: 36.83, top: 25.71 },
  { left: 83.78, top: 91.36 },
  { left: 26.02, top: 65.66 },
  { left: 31.05, top: 55.85 },
  { left: 32.46, top: 86.12 },
  { left: 5.03, top: 28.52 },
  { left: 92.56, top: 16.53 },
  { left: 95.32, top: 79.18 },
  { left: 67.75, top: 29.42 },
  { left: 98.37, top: 91.17 },
  { left: 10.63, top: 20.81 },
  { left: 54.31, top: 15.11 },
  { left: 89.94, top: 92.95 },
  { left: 57.58, top: 2.69 },
  { left: 32.86, top: 29.96 },
  { left: 4.36, top: 62.46 },
  { left: 24.21, top: 69.28 },
  { left: 69.74, top: 1.90 },
  { left: 73.68, top: 54.13 },
  { left: 3.65, top: 13.68 }
];

export default function ContactHero() {
  return (
    <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700" />
      <div className="absolute inset-0 bg-black/20" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {floatingDots.map((dot, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            style={{
              left: `${dot.left}%`,
              top: `${dot.top}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + (i % 3),
              repeat: Infinity,
              delay: i * 0.1,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-emerald-100 bg-clip-text text-transparent">
            Get in Touch
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-emerald-100 max-w-2xl mx-auto">
            Ready to explore Bangladesh? Our travel experts are here to craft your perfect adventure
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20"
            >
              <stat.icon className="w-8 h-8 text-emerald-200 mx-auto mb-3" />
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-emerald-200 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2" />
        </div>
      </motion.div>
    </section>
  );
}