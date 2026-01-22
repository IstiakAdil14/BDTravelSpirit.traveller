"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Bell, Sparkles, Menu } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Topbar() {
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  return (
    <motion.header
      initial={{ y: -60 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="h-16 bg-white/80 backdrop-blur-xl border-b border-white/20 shadow-sm"
    >
      <div className="h-full px-4 lg:px-6 flex items-center justify-between">
        {/* Mobile Menu Button */}
        <Button variant="ghost" size="sm" className="lg:hidden">
          <Menu className="w-5 h-5" />
        </Button>

        {/* Mobile Logo */}
        <div className="lg:hidden flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 p-0.5">
            <div className="w-full h-full rounded-md bg-teal-900 flex items-center justify-center">
              <span className="text-white font-bold text-xs">BD</span>
            </div>
          </div>
          <span className="font-bold text-gray-900">Travel Spirit</span>
        </div>

        {/* Search Bar */}
        <div className="hidden lg:flex flex-1 max-w-2xl mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search destinations, tours, guides..."
              className={`pl-10 pr-4 py-2 w-full bg-gray-50/50 border-gray-200/50 rounded-xl transition-all duration-200 ${
                isSearchFocused ? "bg-white shadow-lg border-emerald-200" : ""
              }`}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
            />
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* AI Planner Button */}
          <Button
            variant="outline"
            size="sm"
            className="hidden lg:flex items-center gap-2 bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-200/50 text-purple-700 hover:from-purple-100 hover:to-indigo-100"
          >
            <Sparkles className="w-4 h-4" />
            <span className="font-medium">AI Planner</span>
          </Button>

          {/* Notifications */}
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs"></span>
          </Button>

          {/* Profile */}
          <div className="flex items-center gap-3">
            <Avatar className="w-8 h-8">
              <AvatarImage src="/api/placeholder/32/32" />
              <AvatarFallback className="bg-emerald-100 text-emerald-700 text-sm font-medium">
                JD
              </AvatarFallback>
            </Avatar>
            <div className="hidden lg:block">
              <p className="text-sm font-medium text-gray-900">John Doe</p>
              <p className="text-xs text-gray-500">Explorer</p>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
}