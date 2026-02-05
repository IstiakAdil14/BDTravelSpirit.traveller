'use client';

import { motion } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { showProductionNotification } from '@/components/shared/ProductionNotification';

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      name: 'Sarah Johnson',
      country: 'United States',
      rating: 5,
      text: 'BD Travel Spirit gave us the most authentic experience of Bangladesh. From the Sundarbans to Cox\'s Bazar, every moment was perfectly planned and executed.',
      tour: 'Complete Bangladesh Explorer',
      image: '/images/testimonials/sarah.jpg'
    },
    {
      name: 'Marco Rodriguez',
      country: 'Spain',
      rating: 5,
      text: 'The cultural immersion was incredible. Our guide Karim was knowledgeable and passionate. We felt like we were traveling with a friend, not just a tour company.',
      tour: 'Cultural Heritage Tour',
      image: '/images/testimonials/marco.jpg'
    },
    {
      name: 'Yuki Tanaka',
      country: 'Japan',
      rating: 5,
      text: 'Safety, comfort, and authenticity - BD Travel Spirit delivered on all fronts. The tea gardens of Sylhet were breathtaking, and the local hospitality was heartwarming.',
      tour: 'Sylhet Tea Garden Experience',
      image: '/images/testimonials/yuki.jpg'
    },
    {
      name: 'Emma Thompson',
      country: 'United Kingdom',
      rating: 5,
      text: 'As a solo female traveler, I felt completely safe and supported throughout my journey. The team went above and beyond to ensure I had an amazing experience.',
      tour: 'Solo Traveler Package',
      image: '/images/testimonials/emma.jpg'
    },
    {
      name: 'Ahmed Al-Rashid',
      country: 'UAE',
      rating: 5,
      text: 'The attention to detail was remarkable. From accommodation to meals, everything was thoughtfully arranged. Bangladesh\'s beauty truly came alive through their expertise.',
      tour: 'Luxury Bangladesh Tour',
      image: '/images/testimonials/ahmed.jpg'
    }
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-64 h-64 bg-emerald-300 rounded-full mix-blend-multiply filter blur-xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-teal-300 rounded-full mix-blend-multiply filter blur-xl animate-float" style={{ animationDelay: '3s' }}></div>
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
            What Our Travelers Say
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what our satisfied customers 
            have to say about their experiences with BD Travel Spirit.
          </p>
        </motion.div>

        {/* Main Testimonial */}
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto mb-12"
        >
          <div className="professional-card p-12 text-center relative">
            {/* Quote Icon */}
            <div className="absolute top-6 left-6 w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center">
              <Quote className="w-6 h-6 text-white" />
            </div>

            {/* Stars */}
            <div className="flex justify-center mb-6">
              {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
              ))}
            </div>

            {/* Testimonial Text */}
            <blockquote className="text-xl md:text-2xl text-slate-700 leading-relaxed mb-8 italic">
              "{testimonials[currentIndex].text}"
            </blockquote>

            {/* Customer Info */}
            <div className="flex items-center justify-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full flex items-center justify-center text-white font-bold text-lg">
                {testimonials[currentIndex].name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="text-left">
                <div className="font-bold text-slate-800 text-lg">
                  {testimonials[currentIndex].name}
                </div>
                <div className="text-slate-600">
                  {testimonials[currentIndex].country}
                </div>
                <div className="text-emerald-600 text-sm font-semibold">
                  {testimonials[currentIndex].tour}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Navigation */}
        <div className="flex justify-center items-center space-x-6 mb-12">
          <button
            onClick={prevTestimonial}
            className="w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center hover:shadow-xl transition-shadow duration-200 group"
          >
            <ChevronLeft className="w-6 h-6 text-slate-600 group-hover:text-emerald-600 transition-colors duration-200" />
          </button>

          {/* Dots */}
          <div className="flex space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentIndex 
                    ? 'bg-emerald-500 w-8' 
                    : 'bg-slate-300 hover:bg-slate-400'
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextTestimonial}
            className="w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center hover:shadow-xl transition-shadow duration-200 group"
          >
            <ChevronRight className="w-6 h-6 text-slate-600 group-hover:text-emerald-600 transition-colors duration-200" />
          </button>
        </div>

        {/* Additional Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <motion.div
              key={`grid-${index}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="professional-card p-6 hover:scale-105 transition-transform duration-300"
            >
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-slate-600 text-sm mb-4 line-clamp-3">
                "{testimonial.text}"
              </p>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {testimonial.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="font-semibold text-slate-800 text-sm">
                    {testimonial.name}
                  </div>
                  <div className="text-slate-500 text-xs">
                    {testimonial.country}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="professional-card p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-slate-800 mb-4">
              Ready to Create Your Own Story?
            </h3>
            <p className="text-slate-600 mb-6">
              Join thousands of satisfied travelers who have discovered 
              Bangladesh's magic with BD Travel Spirit.
            </p>
            <button 
              onClick={showProductionNotification}
              className="gradient-button px-8 py-4 text-lg">
              Start Your Journey
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}