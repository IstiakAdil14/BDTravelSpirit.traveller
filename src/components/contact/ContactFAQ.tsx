'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown, HelpCircle, MessageCircle, Phone } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { showProductionNotification } from '@/components/shared/ProductionNotification';

const faqs = [
  {
    question: 'How quickly do you respond to inquiries?',
    answer: 'We typically respond to emails within 2 hours during business hours and within 4 hours outside business hours. For urgent matters, please call us directly for immediate assistance.'
  },
  {
    question: 'What information should I include in my travel inquiry?',
    answer: 'Please include your preferred travel dates, number of travelers, destinations of interest, budget range, and any special requirements or preferences. This helps us create the perfect itinerary for you.'
  },
  {
    question: 'Do you offer custom tour packages?',
    answer: 'Absolutely! We specialize in creating personalized travel experiences. Our expert team will work with you to design a custom itinerary that matches your interests, budget, and schedule.'
  },
  {
    question: 'Can I speak with someone in my language?',
    answer: 'Yes, our multilingual team speaks Bengali, English, and Hindi. We can also arrange interpreters for other languages if needed for your travel experience.'
  },
  {
    question: 'What are your office hours?',
    answer: 'Our main office in Dhaka is open 9 AM to 8 PM, Monday to Saturday. Regional offices have slightly different hours. We also provide 24/7 emergency support for travelers.'
  },
  {
    question: 'How can I make changes to my booking?',
    answer: 'You can contact us via phone, email, or WhatsApp to make changes to your booking. Changes are subject to availability and may incur additional fees depending on the timing and nature of the change.'
  }
];

export default function ContactFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="py-16"
    >
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Quick answers to common questions about contacting us and our services
          </p>
        </motion.div>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="professional-card border-0 overflow-hidden">
                <CardContent className="p-0">
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full p-6 text-left hover:bg-gray-50/50 transition-colors duration-200 focus:outline-none focus:bg-gray-50/50"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center flex-shrink-0">
                          <HelpCircle className="w-5 h-5 text-white" />
                        </div>
                        <h3 className="font-semibold text-gray-900 text-left">
                          {faq.question}
                        </h3>
                      </div>
                      <motion.div
                        animate={{ rotate: openIndex === index ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex-shrink-0 ml-4"
                      >
                        <ChevronDown className="w-5 h-5 text-gray-500" />
                      </motion.div>
                    </div>
                  </button>
                  
                  <AnimatePresence>
                    {openIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 pt-0">
                          <div className="pl-14">
                            <p className="text-gray-600 leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Still have questions CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12"
        >
          <Card className="bg-gradient-to-r from-emerald-500 to-teal-500 border-0 text-white">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold mb-4">Still Have Questions?</h3>
              <p className="text-emerald-100 mb-6 max-w-md mx-auto">
                Our friendly travel experts are here to help you plan the perfect Bangladesh adventure
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={showProductionNotification}
                  size="lg"
                  className="bg-white text-emerald-600 hover:bg-gray-100 font-semibold"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Start Live Chat
                </Button>
                <Button 
                  onClick={showProductionNotification}
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 font-semibold"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call Us Now
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.section>
  );
}