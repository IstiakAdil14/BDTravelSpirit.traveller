'use client';

import { motion } from 'framer-motion';
import { MapPin, Users, Award, Heart } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-emerald-50 via-teal-50 to-blue-50 mt-40">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-emerald-300 rounded-full mix-blend-multiply filter blur-xl animate-float"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-teal-300 rounded-full mix-blend-multiply filter blur-xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Main Heading */}
          <div className="space-y-4">
            <motion.h1 
              className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 bg-clip-text text-transparent"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              About BD Travel Spirit
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Unveiling Bangladesh's hidden treasures through authentic experiences, 
              sustainable tourism, and passionate local expertise.
            </motion.p>
          </div>

          {/* Stats Cards */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {[
              { icon: MapPin, value: '40+', label: 'Destinations', color: 'from-emerald-500 to-teal-500' },
              { icon: Users, value: '10+', label: 'Happy Travelers', color: 'from-teal-500 to-blue-500' },
              { icon: Award, value: '0+', label: 'Years Experience', color: 'from-blue-500 to-indigo-500' },
              { icon: Heart, value: '50%', label: 'Satisfaction', color: 'from-indigo-500 to-purple-500' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="professional-card p-6 text-center group hover:scale-105 transition-transform duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
              >
                <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${stat.color} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-slate-800 mb-2">{stat.value}</div>
                <div className="text-slate-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Mission Statement */}
          <motion.div 
            className="mt-16 professional-card p-8 max-w-4xl mx-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <h2 className="text-2xl font-bold text-slate-800 mb-4">Our Mission</h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              To connect travelers with the authentic soul of Bangladesh, creating meaningful experiences 
              that celebrate our rich culture, preserve our natural heritage, and empower local communities 
              through responsible tourism.
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        <div className="w-6 h-10 border-2 border-slate-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-slate-400 rounded-full mt-2 animate-bounce"></div>
        </div>
      </motion.div>
    </section>
  );
}