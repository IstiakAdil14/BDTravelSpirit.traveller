'use client';

import { motion } from 'framer-motion';
import ContactHero from './ContactHero';
import ContactMethods from './ContactMethods';
import ContactForm from './ContactForm';
import OfficeLocations from './OfficeLocations';
import ContactFAQ from './ContactFAQ';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-teal-50/20 mt-30">
      <ContactHero />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16 mt-10"
        >
          <div className="lg:col-span-2">
            <ContactForm />
          </div>
          <div>
            <ContactMethods />
          </div>
        </motion.div>

        <OfficeLocations />
        <ContactFAQ />
      </div>
    </div>
  );
}