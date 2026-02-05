'use client';

import { motion } from 'framer-motion';
import { Shield, Calendar, FileText } from 'lucide-react';

export default function PolicyHero() {
  return (
    <section className="py-40 bg-gradient-to-br from-slate-50 to-blue-50/30 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 right-20 w-64 h-64 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl animate-float"></div>
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-3xl flex items-center justify-center shadow-xl">
              <Shield className="w-12 h-12 text-white" />
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1 
            className="text-4xl md:text-6xl font-bold text-slate-800"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Privacy Policy
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Your privacy is important to us. This policy explains how BD Travel Spirit 
            collects, uses, and protects your personal information.
          </motion.p>

          {/* Meta Info */}
          <motion.div 
            className="flex flex-wrap justify-center items-center gap-8 text-slate-500"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5" />
              <span>Last Updated: January 15, 2024</span>
            </div>
            <div className="flex items-center space-x-2">
              <FileText className="w-5 h-5" />
              <span>Version 2.1</span>
            </div>
          </motion.div>

          {/* Quick Summary */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="professional-card p-8 text-left max-w-2xl mx-auto"
          >
            <h3 className="text-xl font-bold text-slate-800 mb-4 text-center">
              Quick Summary
            </h3>
            <ul className="space-y-3 text-slate-600">
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>We collect only necessary information to provide our services</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>Your data is never sold to third parties</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>You have full control over your personal information</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>We use industry-standard security measures</span>
              </li>
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}