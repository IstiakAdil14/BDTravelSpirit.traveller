'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Send, Calendar, MapPin, User, Mail, Phone, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { showProductionNotification } from '@/components/shared/ProductionNotification';

const inquiryTypes = [
  'General Inquiry',
  'Tour Booking',
  'Custom Package',
  'Guide Services',
  'Group Travel',
  'Emergency Support'
];

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: '',
    travelDates: '',
    destination: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    showProductionNotification();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
    >
      <Card className="professional-card border-0 shadow-professional-lg">
        <CardHeader className="pb-6">
          <CardTitle className="flex items-center gap-3 text-2xl text-gray-900">
            <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
              <Send className="w-5 h-5 text-white" />
            </div>
            Send Us a Message
          </CardTitle>
          <p className="text-gray-600 mt-2">Tell us about your travel dreams and we'll make them reality</p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <User className="w-4 h-4 text-emerald-600" />
                  Full Name
                </label>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="h-12 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500/20"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-emerald-600" />
                  Email Address
                </label>
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  className="h-12 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500/20"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-emerald-600" />
                  Phone Number
                </label>
                <Input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+880 1234-567890"
                  className="h-12 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500/20"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-emerald-600" />
                  Inquiry Type
                </label>
                <select
                  name="inquiryType"
                  value={formData.inquiryType}
                  onChange={handleChange}
                  className="h-12 w-full border border-gray-200 rounded-lg px-3 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none"
                  required
                >
                  <option value="">Select inquiry type</option>
                  {inquiryTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Travel Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-emerald-600" />
                  Preferred Travel Dates
                </label>
                <Input
                  name="travelDates"
                  value={formData.travelDates}
                  onChange={handleChange}
                  placeholder="e.g., December 2024"
                  className="h-12 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500/20"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-emerald-600" />
                  Destination Interest
                </label>
                <Input
                  name="destination"
                  value={formData.destination}
                  onChange={handleChange}
                  placeholder="e.g., Cox's Bazar, Sundarbans"
                  className="h-12 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500/20"
                />
              </div>
            </div>

            {/* Message */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                Tell us about your travel plans
              </label>
              <Textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Share your travel dreams, group size, budget preferences, special requirements..."
                rows={5}
                className="border-gray-200 focus:border-emerald-500 focus:ring-emerald-500/20 resize-none"
                required
              />
            </div>

            {/* Submit Button */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-14 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending Message...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Send className="w-5 h-5" />
                    Send Message
                  </div>
                )}
              </Button>
            </motion.div>
          </form>

          {/* Trust indicators */}
          <div className="flex items-center justify-center gap-6 pt-6 border-t border-gray-100">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              Usually responds within 2 hours
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className="w-2 h-2 bg-blue-500 rounded-full" />
              100% Secure & Private
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}