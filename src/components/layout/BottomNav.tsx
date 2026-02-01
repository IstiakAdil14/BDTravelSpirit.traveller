"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, MapPin, Compass, Heart, Settings } from "lucide-react";

const navigation = [
  { name: "Overview", href: "/dashboard/traveller", icon: Home },
  { name: "Trips", href: "/dashboard/traveller/trips", icon: MapPin },
  { name: "Explore", href: "/dashboard/traveller/explore", icon: Compass },
  { name: "Favorites", href: "/dashboard/traveller/favorites", icon: Heart },
  { name: "Settings", href: "/dashboard/traveller/settings", icon: Settings },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-white/20 shadow-2xl max-[524px]:hidden"
    >
      <div className="flex items-center justify-around px-4 py-2">
        {navigation.map((item, index) => {
          const isActive = pathname === item.href;
          return (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                href={item.href}
                className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all duration-200 ${
                  isActive ? "text-emerald-600" : "text-gray-500"
                }`}
              >
                <div className={`p-2 rounded-lg ${isActive ? "bg-emerald-100" : ""}`}>
                  <item.icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-medium">{item.name}</span>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </motion.nav>
  );
}