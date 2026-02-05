'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Send, Phone, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { showProductionNotification } from '@/components/shared/ProductionNotification';


export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showProductionNotification();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Contact & Inquiry</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Contact Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Send className="w-5 h-5 text-emerald-600" />
              Send Inquiry
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="text-sm font-medium text-gray-700 mb-2 block">Full Name</label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="text-sm font-medium text-gray-700 mb-2 block">Email Address</label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="text-sm font-medium text-gray-700 mb-2 block">Message</label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your travel plans..."
                  rows={4}
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700">
                <Send className="w-4 h-4 mr-2" />
                Send Inquiry
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Quick Contact Options */}
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <Phone className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Call Directly</h3>
                  <p className="text-gray-600">Get instant answers to your questions</p>
                </div>
              </div>
              <Button 
                onClick={showProductionNotification}
                variant="outline" 
                className="w-full">
                <Phone className="w-4 h-4 mr-2" />
                +880 1234-567890
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">WhatsApp Chat</h3>
                  <p className="text-gray-600">Quick responses via WhatsApp</p>
                </div>
              </div>
              <Button 
                onClick={showProductionNotification}
                variant="outline" 
                className="w-full bg-green-50 border-green-200 hover:bg-green-100">
                <MessageCircle className="w-4 h-4 mr-2" />
                Chat on WhatsApp
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200">
            <CardContent className="p-6 text-center">
              <h3 className="font-semibold text-gray-900 mb-2">Response Time</h3>
              <p className="text-emerald-700 font-medium">Usually responds within 2 hours</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.section>
  );
}