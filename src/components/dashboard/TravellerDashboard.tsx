'use client';

import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import { 
  User, MapPin, Heart, ShoppingCart, CreditCard, Settings, 
  Bell, Search, Calendar, TrendingUp, Award, Globe,
  Plane, Camera, Star, Clock, Menu, X, Home, MessageCircle, LogOut
} from 'lucide-react';
import Sidebar from '@/components/layout/Sidebar';
import DashboardStats from './DashboardStats';
import BookingHistory from './BookingHistory';
import WishlistSection from './WishlistSection';
import SignOutDialog from '@/components/layout/header/SignOutDialog';
import { useState } from 'react';

interface TravellerDashboardProps {
  stats: {
    totalTrips: number;
    placesVisited: number;
    wishlistItems: number;
    reviewsWritten: number;
  };
  bookings: Array<{
    id: string;
    title: string;
    location: string;
    date: string;
    status: 'upcoming' | 'completed' | 'cancelled';
    price: string;
    duration: string;
  }>;
  wishlistItems: Array<{
    id: string;
    name: string;
    location: string;
    price: string;
    image?: string;
  }>;
  cartItems: Array<{
    id: string;
    name: string;
    location: string;
    price: string;
    image?: string;
  }>;
}

export default function TravellerDashboard({ 
  stats = { totalTrips: 0, placesVisited: 0, wishlistItems: 0, reviewsWritten: 0 }, 
  bookings = [], 
  wishlistItems = [] 
}: Partial<TravellerDashboardProps> = {}) {
  const { data: session } = useSession();
  const user = session?.user;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showSignOutDialog, setShowSignOutDialog] = useState(false);

  const quickActions = [
    { icon: MapPin, label: 'Browse Tours', color: 'from-emerald-500 to-teal-500', bgColor: 'bg-emerald-50' },
    { icon: Heart, label: 'My Wishlist', color: 'from-rose-500 to-pink-500', bgColor: 'bg-rose-50' },
    { icon: ShoppingCart, label: 'Shopping Cart', color: 'from-blue-500 to-indigo-500', bgColor: 'bg-blue-50' },
    { icon: Calendar, label: 'My Bookings', color: 'from-purple-500 to-violet-500', bgColor: 'bg-purple-50' },
    { icon: CreditCard, label: 'Payments', color: 'from-green-500 to-emerald-500', bgColor: 'bg-green-50' },
    { icon: Settings, label: 'Settings', color: 'from-gray-500 to-slate-500', bgColor: 'bg-gray-50' }
  ];

  const achievements = [
    { icon: Award, title: 'Explorer Badge', description: 'Visited 5+ destinations', earned: true },
    { icon: Star, title: 'Top Reviewer', description: 'Written 10+ reviews', earned: stats.reviewsWritten >= 10 },
    { icon: Globe, title: 'World Traveler', description: 'Visited 3+ countries', earned: false },
    { icon: Camera, title: 'Memory Keeper', description: 'Shared 20+ photos', earned: false }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
      {/* Mobile Layout */}
      <div className="lg:hidden">
        {/* Mobile Header */}
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="sticky top-0 z-20 bg-white/90 backdrop-blur-xl shadow-lg border-b border-white/20"
        >
          <div className="px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <button 
                  onClick={() => setIsMobileMenuOpen(true)}
                  className="p-2 rounded-xl bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors"
                >
                  <Menu className="w-5 h-5" />
                </button>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 p-0.5">
                  {user?.image ? (
                    <img src={user.image} alt={user.name || 'User'} className="w-full h-full rounded-lg object-cover" />
                  ) : (
                    <div className="w-full h-full rounded-lg bg-white flex items-center justify-center">
                      <User className="w-6 h-6 text-teal-600" />
                    </div>
                  )}
                </div>
                <div>
                  <h1 className="text-lg font-bold text-gray-900">Hi, {user?.name?.split(' ')[0] || 'Traveller'}!</h1>
                  <p className="text-sm text-gray-600">Level 3 Explorer</p>
                </div>
              </div>
              <Bell className="w-6 h-6 text-gray-600" />
            </div>
          </div>
        </motion.div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="fixed inset-0 bg-black/50" onClick={() => setIsMobileMenuOpen(false)} />
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              className="fixed left-0 top-0 h-full w-80 bg-white/95 backdrop-blur-xl shadow-2xl"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 p-0.5">
                      <div className="w-full h-full rounded-lg bg-teal-900 flex items-center justify-center">
                        <span className="text-white font-bold text-sm">BD</span>
                      </div>
                    </div>
                    <div>
                      <h1 className="font-bold text-gray-900">BD Travel Spirit</h1>
                      <p className="text-xs text-gray-500">Your Travel Companion</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 rounded-xl bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                <nav className="space-y-2">
                  {[
                    { name: "Overview", icon: Home },
                    { name: "My Trips", icon: MapPin },
                    { name: "Favorites", icon: Heart },
                    { name: "Bookings", icon: Calendar },
                    { name: "Messages", icon: MessageCircle },
                    { name: "Payments", icon: CreditCard },
                    { name: "Reviews", icon: Star },
                    { name: "Settings", icon: Settings },
                  ].map((item) => (
                    <button
                      key={item.name}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-emerald-50 hover:text-emerald-600 transition-all"
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.name}</span>
                    </button>
                  ))}
                </nav>
                
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setShowSignOutDialog(true);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-red-50 hover:text-red-600 transition-all"
                  >
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">Logout</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* Mobile Content */}
        <div className="px-4 py-6 space-y-6">
          <DashboardStats stats={stats} />
          
          {/* Mobile Quick Actions */}
          <div className="bg-white/60 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-3">
              {quickActions.slice(0, 4).map((action, index) => (
                <button key={action.label} className={`${action.bgColor} p-4 rounded-xl border border-white/20 hover:shadow-lg transition-all`}>
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${action.color} flex items-center justify-center text-white mb-2`}>
                    <action.icon className="w-4 h-4" />
                  </div>
                  <h3 className="font-semibold text-gray-900 text-xs">{action.label}</h3>
                </button>
              ))}
            </div>
          </div>

          <BookingHistory bookings={bookings} />
          <WishlistSection wishlistItems={wishlistItems} />
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:flex">
        <div className="sticky top-0 h-screen">
          <Sidebar />
        </div>
        
        <div className="flex-1">
          {/* Desktop Header */}
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="sticky top-0 z-20 bg-white/80 backdrop-blur-xl shadow-lg border-b border-white/20"
          >
            <div className="max-w-7xl mx-auto px-6 py-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 p-1 shadow-lg">
                      {user?.image ? (
                        <img src={user.image} alt={user.name || 'User'} className="w-full h-full rounded-xl object-cover" />
                      ) : (
                        <div className="w-full h-full rounded-xl bg-white flex items-center justify-center">
                          <User className="w-8 h-8 text-teal-600" />
                        </div>
                      )}
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                      Welcome back, {user?.name || 'Traveller'}!
                    </h1>
                    <p className="text-gray-600 text-lg">Ready for your next adventure?</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <span className="flex items-center text-sm text-emerald-600 font-medium">
                        <TrendingUp className="w-4 h-4 mr-1" />
                        Level 3 Explorer
                      </span>
                      <span className="text-gray-300">•</span>
                      <span className="text-sm text-gray-500">Member since 2024</span>
                    </div>
                  </div>
                </div>
                
              </div>
            </div>
          </motion.div>

          {/* Desktop Content */}
          <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
            <DashboardStats stats={stats} />
            
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
              <div className="xl:col-span-3 space-y-8">

                <BookingHistory bookings={bookings} />
              </div>

              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white/60 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl"
                >
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                    <Award className="w-5 h-5 mr-2 text-amber-500" />
                    Achievements
                  </h3>
                  <div className="space-y-3">
                    {achievements.map((achievement) => (
                      <div key={achievement.title} className={`flex items-center space-x-3 p-3 rounded-xl transition-all ${
                        achievement.earned ? 'bg-amber-50 border border-amber-200' : 'bg-gray-50 border border-gray-200'
                      }`}>
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          achievement.earned ? 'bg-amber-500 text-white' : 'bg-gray-300 text-gray-500'
                        }`}>
                          <achievement.icon className="w-4 h-4" />
                        </div>
                        <div className="flex-1">
                          <h4 className={`text-sm font-medium ${
                            achievement.earned ? 'text-gray-900' : 'text-gray-500'
                          }`}>{achievement.title}</h4>
                          <p className="text-xs text-gray-500">{achievement.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-6 text-white shadow-xl"
                >
                  <h3 className="text-lg font-bold mb-4 flex items-center">
                    <Globe className="w-5 h-5 mr-2" />
                    Travel Progress
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Next Level</span>
                        <span>75%</span>
                      </div>
                      <div className="w-full bg-white/20 rounded-full h-2">
                        <div className="bg-white h-2 rounded-full" style={{ width: '75%' }}></div>
                      </div>
                    </div>
                    <div className="text-sm opacity-90">
                      Complete 2 more trips to reach Level 4!
                    </div>
                  </div>
                </motion.div>

                <WishlistSection wishlistItems={wishlistItems} />

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-white/60 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl"
                >
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-blue-500" />
                    Recent Activity
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 text-sm">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-gray-600">Booked Cox's Bazar Beach Tour</span>
                    </div>
                    <div className="flex items-center space-x-3 text-sm">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-gray-600">Added Sundarbans to wishlist</span>
                    </div>
                    <div className="flex items-center space-x-3 text-sm">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span className="text-gray-600">Reviewed Sylhet Tea Gardens</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Sign Out Dialog */}
      <SignOutDialog isOpen={showSignOutDialog} onClose={() => setShowSignOutDialog(false)} />
    </div>
  );
}