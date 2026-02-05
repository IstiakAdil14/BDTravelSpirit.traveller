'use client';

import { motion } from 'framer-motion';
import { User, Bell, Shield, CreditCard, Globe, Camera, Mail, Phone, MapPin, Calendar, Save, Eye, EyeOff } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useState } from 'react';

const settingsSections = [
  { id: 'profile', name: 'Profile', icon: User, color: 'from-slate-500 to-gray-500' },
  { id: 'notifications', name: 'Notifications', icon: Bell, color: 'from-blue-500 to-indigo-500' },
  { id: 'privacy', name: 'Privacy & Security', icon: Shield, color: 'from-green-500 to-emerald-500' },
  { id: 'payments', name: 'Payment Methods', icon: CreditCard, color: 'from-purple-500 to-violet-500' },
  { id: 'preferences', name: 'Preferences', icon: Globe, color: 'from-amber-500 to-orange-500' }
];

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: 'Ahmed Rahman',
    email: 'ahmed.rahman@email.com',
    phone: '+880 1704080389',
    location: 'Sylhet, Bangladesh',
    bio: 'Travel enthusiast exploring Bangladesh\'s hidden gems',
    dateOfBirth: '1990-05-15',
    gender: 'male',
    language: 'en',
    currency: 'BDT',
    timezone: 'Asia/Dhaka'
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const renderProfileSection = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Profile Photo */}
      <Card className="professional-card border-0">
        <CardContent className="p-6">
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-r from-slate-500 to-gray-500 rounded-full flex items-center justify-center">
                <User className="w-12 h-12 text-white" />
              </div>
              <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-slate-500 rounded-full flex items-center justify-center text-white hover:bg-slate-600 transition-colors">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <div>
              <h3 className="font-bold text-lg text-gray-900">Profile Photo</h3>
              <p className="text-gray-600 text-sm mb-3">Upload a clear photo of yourself</p>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="border-slate-200 text-slate-700 hover:bg-slate-50">
                  Upload New
                </Button>
                <Button size="sm" variant="outline" className="border-red-200 text-red-700 hover:bg-red-50">
                  Remove
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Personal Information */}
      <Card className="professional-card border-0">
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Full Name</label>
              <Input
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="border-gray-200 focus:border-slate-500"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Email Address</label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="border-gray-200 focus:border-slate-500"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Phone Number</label>
              <Input
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="border-gray-200 focus:border-slate-500"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Location</label>
              <Input
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                className="border-gray-200 focus:border-slate-500"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Date of Birth</label>
              <Input
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                className="border-gray-200 focus:border-slate-500"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Gender</label>
              <select
                value={formData.gender}
                onChange={(e) => handleInputChange('gender', e.target.value)}
                className="w-full h-10 border border-gray-200 rounded-lg px-3 focus:border-slate-500 focus:outline-none"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                <option value="prefer-not-to-say">Prefer not to say</option>
              </select>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Bio</label>
            <Textarea
              value={formData.bio}
              onChange={(e) => handleInputChange('bio', e.target.value)}
              placeholder="Tell us about yourself..."
              className="border-gray-200 focus:border-slate-500"
              rows={3}
            />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  const renderNotificationsSection = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <Card className="professional-card border-0">
        <CardHeader>
          <CardTitle>Email Notifications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { label: 'Booking confirmations', description: 'Get notified when bookings are confirmed' },
            { label: 'Payment reminders', description: 'Reminders for pending payments' },
            { label: 'Trip updates', description: 'Updates about your upcoming trips' },
            { label: 'Special offers', description: 'Exclusive deals and promotions' },
            { label: 'Review requests', description: 'Requests to review completed trips' }
          ].map((item, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">{item.label}</h4>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
              <div className="w-12 h-6 bg-blue-500 rounded-full relative cursor-pointer">
                <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5 transition-transform"></div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </motion.div>
  );

  const renderPrivacySection = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <Card className="professional-card border-0">
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Current Password</label>
            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter current password"
                className="border-gray-200 focus:border-green-500 pr-10"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">New Password</label>
            <Input
              type="password"
              placeholder="Enter new password"
              className="border-gray-200 focus:border-green-500"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Confirm New Password</label>
            <Input
              type="password"
              placeholder="Confirm new password"
              className="border-gray-200 focus:border-green-500"
            />
          </div>
          <Button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600">
            Update Password
          </Button>
        </CardContent>
      </Card>

      <Card className="professional-card border-0">
        <CardHeader>
          <CardTitle>Two-Factor Authentication</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
            <div>
              <h4 className="font-medium text-gray-900">2FA Status</h4>
              <p className="text-sm text-gray-600">Add an extra layer of security</p>
            </div>
            <Badge className="bg-red-100 text-red-700 border-0">Disabled</Badge>
          </div>
          <Button className="mt-4 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600">
            Enable 2FA
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );

  const renderPreferencesSection = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <Card className="professional-card border-0">
        <CardHeader>
          <CardTitle>Regional Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Language</label>
              <select
                value={formData.language}
                onChange={(e) => handleInputChange('language', e.target.value)}
                className="w-full h-10 border border-gray-200 rounded-lg px-3 focus:border-amber-500 focus:outline-none"
              >
                <option value="en">English</option>
                <option value="bn">বাংলা</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Currency</label>
              <select
                value={formData.currency}
                onChange={(e) => handleInputChange('currency', e.target.value)}
                className="w-full h-10 border border-gray-200 rounded-lg px-3 focus:border-amber-500 focus:outline-none"
              >
                <option value="BDT">BDT (৳)</option>
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Timezone</label>
              <select
                value={formData.timezone}
                onChange={(e) => handleInputChange('timezone', e.target.value)}
                className="w-full h-10 border border-gray-200 rounded-lg px-3 focus:border-amber-500 focus:outline-none"
              >
                <option value="Asia/Dhaka">Asia/Dhaka (GMT+6)</option>
                <option value="UTC">UTC (GMT+0)</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  const renderSection = () => {
    switch (activeSection) {
      case 'profile': return renderProfileSection();
      case 'notifications': return renderNotificationsSection();
      case 'privacy': return renderPrivacySection();
      case 'preferences': return renderPreferencesSection();
      default: return renderProfileSection();
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-600 to-gray-600 bg-clip-text text-transparent">
              Account Settings
            </h1>
            <p className="text-gray-600 mt-2">Manage your account preferences and security</p>
          </div>
          <Button className="bg-gradient-to-r from-slate-500 to-gray-500 hover:from-slate-600 hover:to-gray-600">
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Settings Navigation */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="professional-card border-0">
              <CardContent className="p-6">
                <nav className="space-y-2">
                  {settingsSections.map((section, index) => (
                    <motion.button
                      key={section.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left ${
                        activeSection === section.id
                          ? `bg-gradient-to-r ${section.color} text-white shadow-lg`
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <section.icon className="w-5 h-5" />
                      <span className="font-medium">{section.name}</span>
                    </motion.button>
                  ))}
                </nav>
              </CardContent>
            </Card>
          </motion.div>

          {/* Settings Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-3"
          >
            {renderSection()}
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
}