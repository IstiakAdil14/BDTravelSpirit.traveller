'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function ContactSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="py-16 bg-slate-50"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl font-bold text-slate-800 mb-8">
          Privacy Questions?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col items-center space-y-3">
            <Mail className="w-8 h-8 text-emerald-600" />
            <span className="text-slate-600">privacy@bdtravelspirit.com</span>
          </div>
          <div className="flex flex-col items-center space-y-3">
            <Phone className="w-8 h-8 text-emerald-600" />
            <span className="text-slate-600">+880-1704080389</span>
          </div>
          <div className="flex flex-col items-center space-y-3">
            <MapPin className="w-8 h-8 text-emerald-600" />
            <span className="text-slate-600">Sylhet, Bangladesh</span>
          </div>
        </div>
      </div>
    </motion.section>
  );
}