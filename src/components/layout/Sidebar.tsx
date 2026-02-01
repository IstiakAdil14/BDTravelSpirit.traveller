"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";
import { 
  Home, 
  MapPin, 
  Heart, 
  Calendar, 
  MessageCircle, 
  CreditCard, 
  Star, 
  Settings,
  LogOut,
  ChevronRight
} from "lucide-react";
import SignOutDialog from "@/components/layout/header/SignOutDialog";

function SidebarContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const userId = searchParams.get('id');
  const role = searchParams.get('role') || 'traveller';
  const [showSignOutDialog, setShowSignOutDialog] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const navigation = [
    { name: "Overview", href: `/dashboard?role=${role}&id=${userId}`, icon: Home, color: "from-blue-500 to-indigo-500" },
    { name: "My Trips", href: `/dashboard?role=${role}&id=${userId}&page=trips`, icon: MapPin, color: "from-emerald-500 to-teal-500" },
    { name: "Favorites", href: `/dashboard?role=${role}&id=${userId}&page=favorites`, icon: Heart, color: "from-rose-500 to-pink-500" },
    { name: "Bookings", href: `/dashboard?role=${role}&id=${userId}&page=bookings`, icon: Calendar, color: "from-purple-500 to-violet-500" },
    { name: "Chat", href: `/dashboard?role=${role}&id=${userId}&page=chat`, icon: MessageCircle, color: "from-indigo-500 to-blue-500" },
    { name: "Payments", href: `/dashboard?role=${role}&id=${userId}&page=payments`, icon: CreditCard, color: "from-green-500 to-emerald-500" },
    { name: "Reviews", href: `/dashboard?role=${role}&id=${userId}&page=reviews`, icon: Star, color: "from-amber-500 to-orange-500" },
    { name: "Settings", href: `/dashboard?role=${role}&id=${userId}&page=settings`, icon: Settings, color: "from-slate-500 to-gray-500" },
  ];

  return (
    <motion.aside
      initial={{ x: -280 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="w-80 bg-white/90 backdrop-blur-2xl border-r border-white/20 shadow-2xl h-full flex flex-col relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 transform translate-x-32 -translate-y-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-gradient-to-tr from-blue-400 to-indigo-500 transform -translate-x-24 translate-y-24"></div>
      </div>
      
      <div className="relative z-10 p-8 flex-1">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Link href="/" className="flex items-center gap-4 mb-12 group">
            <div className="relative">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 p-0.5 shadow-xl group-hover:shadow-2xl transition-all duration-300">
                <div className="w-full h-full rounded-xl bg-gradient-to-br from-teal-900 to-emerald-900 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">BD</span>
                </div>
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
            </div>
            <div>
              <h1 className="font-bold text-gray-900 text-lg group-hover:text-emerald-600 transition-colors">
                BD Travel Spirit
              </h1>
              <p className="text-xs text-gray-500 font-medium">Your Travel Companion</p>
            </div>
          </Link>
        </motion.div>

        <nav>
          {navigation.map((item, index) => {
            const isActive = pathname === item.href;
            const isHovered = hoveredItem === item.name;
            
            return (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * index }}
                onMouseEnter={() => setHoveredItem(item.name)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <Link
                  href={item.href}
                  className={`relative flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 group overflow-hidden ${
                    isActive
                      ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-xl shadow-emerald-500/25"
                      : "text-gray-600 hover:bg-white/60 hover:text-gray-900 hover:shadow-lg"
                  }`}
                >
                  {!isActive && (
                    <div className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl`}></div>
                  )}
                  
                  <div className={`relative w-6 h-6 flex items-center justify-center ${
                    isActive ? "text-white" : "text-gray-400 group-hover:text-gray-600"
                  }`}>
                    <item.icon className="w-5 h-5" />
                  </div>
                  
                  <span className="font-semibold text-sm flex-1">{item.name}</span>
                  
                  <motion.div
                    animate={{ 
                      x: isActive || isHovered ? 0 : -10,
                      opacity: isActive || isHovered ? 1 : 0
                    }}
                    transition={{ duration: 0.2 }}
                    className={`w-5 h-5 ${
                      isActive ? "text-white" : "text-gray-400"
                    }`}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </motion.div>
                  
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-white rounded-r-full"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              </motion.div>
            );
          })}
        </nav>
      </div>
      
      <div className="relative z-10 p-8 border-t border-white/20">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowSignOutDialog(true)}
          className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-gray-600 hover:bg-red-50 hover:text-red-600 transition-all duration-300 group"
        >
          <div className="w-6 h-6 flex items-center justify-center">
            <LogOut className="w-5 h-5 text-gray-400 group-hover:text-red-500 transition-colors" />
          </div>
          <span className="font-semibold text-sm">Logout</span>
        </motion.button>
      </div>
      
      <SignOutDialog isOpen={showSignOutDialog} onClose={() => setShowSignOutDialog(false)} />
    </motion.aside>
  );
}

export default function Sidebar() {
  return (
    <Suspense fallback={<div className="w-80 h-full bg-white/90 animate-pulse" />}>
      <SidebarContent />
    </Suspense>
  );
}