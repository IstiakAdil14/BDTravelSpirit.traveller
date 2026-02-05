'use client';

import { motion } from 'framer-motion';
import { Phone, MessageCircle, Mail, Clock, Headphones, Zap } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { showProductionNotification } from '@/components/shared/ProductionNotification';

const contactMethods = [
  {
    icon: MessageCircle,
    title: 'WhatsApp',
    description: 'Quick responses via WhatsApp',
    value: 'Chat with us',
    action: 'Start Chat',
    color: 'from-green-500 to-green-600',
    bgColor: 'bg-green-50',
    available: 'Online Now'
  },
  {
    icon: Mail,
    title: 'Email Support',
    description: 'Detailed inquiries and bookings',
    value: 'info@bdtravelspirit.com',
    action: 'Send Email',
    color: 'from-purple-500 to-purple-600',
    bgColor: 'bg-purple-50',
    available: '< 4 hours response'
  },
  {
    icon: Headphones,
    title: 'Live Chat',
    description: 'Real-time support on website',
    value: 'Chat Support',
    action: 'Start Chat',
    color: 'from-orange-500 to-orange-600',
    bgColor: 'bg-orange-50',
    available: '9 AM - 10 PM'
  }
];

const quickActions = [
  {
    icon: Zap,
    title: 'Emergency Support',
    description: '24/7 emergency travel assistance',
    color: 'from-red-500 to-red-600'
  },
  {
    icon: Clock,
    title: 'Schedule Callback',
    description: 'We\'ll call you at your preferred time',
    color: 'from-indigo-500 to-indigo-600'
  }
];

export default function ContactMethods() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="space-y-6"
    >
      {/* Contact Methods */}
      <div className="space-y-4">
        {contactMethods.map((method, index) => (
          <motion.div
            key={method.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="professional-card border-0 hover:shadow-professional-lg transition-all duration-300 group cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${method.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <method.icon className="w-6 h-6 text-white" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">{method.title}</h3>
                      <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">
                        {method.available}
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-3">{method.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-800">{method.value}</span>
                      <Button 
                        onClick={showProductionNotification}
                        size="sm" 
                        className={`bg-gradient-to-r ${method.color} hover:opacity-90 text-white shadow-md`}
                      >
                        {method.action}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-900 text-lg">Quick Actions</h3>
        
        {quickActions.map((action, index) => (
          <motion.div
            key={action.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
          >
            <Card 
              onClick={showProductionNotification}
              className="professional-card border-0 hover:shadow-professional transition-all duration-300 group cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${action.color} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300`}>
                    <action.icon className="w-5 h-5 text-white" />
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 text-sm">{action.title}</h4>
                    <p className="text-xs text-gray-600">{action.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Response Time Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <Card className="bg-gradient-to-r from-emerald-500 to-teal-500 border-0 text-white">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-bold text-lg mb-2">Lightning Fast Response</h3>
            <p className="text-emerald-100 text-sm mb-4">
              Our dedicated team ensures you get answers when you need them most
            </p>
            <div className="flex justify-center gap-4 text-sm">
              <div className="text-center">
                <div className="font-bold text-xl">&lt; 2hrs</div>
                <div className="text-emerald-200">Email</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-xl">&lt; 5min</div>
                <div className="text-emerald-200">Chat</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-xl">24/7</div>
                <div className="text-emerald-200">Phone</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}