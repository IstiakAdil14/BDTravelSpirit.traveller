"use client";

import React, { useState } from 'react';
import { IFAQ } from '@/types/article';
import { HelpCircle, ChevronDown } from 'lucide-react';

export default function ArticleFaqs({ faqs }: { faqs: IFAQ[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="mt-20 border-t border-slate-200 pt-16">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-slate-800 flex items-center justify-center gap-3">
          <HelpCircle className="w-8 h-8 text-emerald-500" />
          Frequently Asked Questions
        </h2>
        <p className="text-slate-500 mt-3">Everything you need to know for your trip</p>
      </div>

      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div 
              key={index} 
              className={`border transition-all duration-300 rounded-2xl overflow-hidden ${
                isOpen ? 'border-emerald-200 shadow-md bg-emerald-50/30' : 'border-slate-200 bg-white hover:border-emerald-200'
              }`}
            >
              <button 
                onClick={() => toggleFaq(index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
              >
                <span className={`font-semibold text-lg transition-colors ${isOpen ? 'text-emerald-800' : 'text-slate-700'}`}>
                  {faq.question}
                </span>
                <ChevronDown 
                  className={`w-5 h-5 text-emerald-500 transition-transform duration-300 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`} 
                />
              </button>
              
              <div 
                className={`transition-all duration-300 ease-in-out ${
                  isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                } overflow-hidden`}
              >
                <div className="px-6 pb-6 pt-2 text-slate-600 leading-relaxed border-t border-emerald-100/50">
                  {faq.category && (
                    <span className="inline-block px-2 py-1 bg-white border border-slate-200 text-slate-500 text-[10px] uppercase font-bold tracking-widest rounded-md mb-3">
                      {faq.category}
                    </span>
                  )}
                  <p>{faq.answer}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
