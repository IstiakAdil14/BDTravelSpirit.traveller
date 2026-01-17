'use client';

import { motion } from 'framer-motion';
import { ChevronRight, Home } from 'lucide-react';
import Link from 'next/link';

export default function OperatorHero() {
  return (
    <section className="relative bg-gradient-to-br from-emerald-50 via-white to-teal-50 py-16 overflow-hidden mt-25">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 right-20 w-64 h-64 bg-emerald-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-20 w-80 h-80 bg-teal-200/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2 text-sm text-gray-600 mb-6"
        >
          <Link href="/" className="flex items-center gap-1 hover:text-emerald-600 transition-colors">
            <Home className="w-4 h-4" />
            Home
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900 font-medium">Operators</span>
        </motion.nav>

        {/* Hero content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            All Tour <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Operators</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
            Explore trusted and verified tour operators across Bangladesh. 
            Find the perfect partner for your next adventure.
          </p>
        </motion.div>
      </div>
    </section>
  );
}