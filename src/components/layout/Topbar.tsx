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

      </div>
    </motion.header>
  );
}