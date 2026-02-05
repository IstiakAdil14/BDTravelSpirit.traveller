'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { showProductionNotification } from '@/components/shared/ProductionNotification';

export default function TableOfContents() {
  const [activeSection, setActiveSection] = useState('');

  const sections = [
    { id: 'information-collection', title: 'Information We Collect' },
    { id: 'how-we-use', title: 'How We Use Information' },
    { id: 'information-sharing', title: 'Information Sharing' },
    { id: 'data-security', title: 'Data Security' },
    { id: 'cookies', title: 'Cookies & Tracking' },
    { id: 'your-rights', title: 'Your Rights' },
    { id: 'data-retention', title: 'Data Retention' },
    { id: 'international-transfers', title: 'International Transfers' },
    { id: 'children-privacy', title: 'Children\'s Privacy' },
    { id: 'policy-changes', title: 'Policy Changes' },
    { id: 'contact-us', title: 'Contact Us' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="sticky top-8"
    >
      <div className="professional-card p-6">
        <h3 className="text-lg font-bold text-slate-800 mb-6">
          Table of Contents
        </h3>
        
        <nav className="space-y-2">
          {sections.map((section, index) => (
            <motion.button
              key={section.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              onClick={() => scrollToSection(section.id)}
              className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 text-sm ${
                activeSection === section.id
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-800'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-2 h-2 rounded-full ${
                  activeSection === section.id ? 'bg-white' : 'bg-slate-400'
                }`}></div>
                <span className="leading-tight">{section.title}</span>
              </div>
            </motion.button>
          ))}
        </nav>

        {/* Progress Indicator */}
        <div className="mt-8 pt-6 border-t border-slate-200">
          <div className="flex items-center justify-between text-sm text-slate-500 mb-2">
            <span>Reading Progress</span>
            <span>
              {sections.findIndex(s => s.id === activeSection) + 1} / {sections.length}
            </span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full transition-all duration-300"
              style={{ 
                width: `${((sections.findIndex(s => s.id === activeSection) + 1) / sections.length) * 100}%` 
              }}
            ></div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 pt-6 border-t border-slate-200 space-y-3">
          <button 
            onClick={showProductionNotification}
            className="w-full px-4 py-2 text-sm text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors duration-200">
            Download PDF
          </button>
          <button 
            onClick={showProductionNotification}
            className="w-full px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg transition-colors duration-200">
            Print Policy
          </button>
          <button 
            onClick={showProductionNotification}
            className="w-full px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
          >
            Contact Us
          </button>
        </div>
      </div>
    </motion.div>
  );
}