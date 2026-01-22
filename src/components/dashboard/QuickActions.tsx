"use client";

import { motion } from "framer-motion";
import { Target, UserCheck, Shield, Sun } from "lucide-react";

export default function QuickActions() {
  const actions = [
    {
      title: "Book a Tour",
      description: "Discover new destinations",
      icon: Target,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50"
    },
    {
      title: "Find Guides",
      description: "Connect with local experts",
      icon: UserCheck,
      color: "from-emerald-500 to-teal-500",
      bgColor: "bg-emerald-50"
    },
    {
      title: "Travel Insurance",
      description: "Protect your journey",
      icon: Shield,
      color: "from-purple-500 to-indigo-500",
      bgColor: "bg-purple-50"
    },
    {
      title: "Weather Updates",
      description: "Check destination weather",
      icon: Sun,
      color: "from-amber-500 to-orange-500",
      bgColor: "bg-amber-50"
    }
  ];

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
      <h3 className="text-xl font-semibold text-gray-800 mb-6">Quick Actions</h3>
      
      <div className="space-y-4">
        {actions.map((action, index) => (
          <motion.button
            key={action.title}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`w-full ${action.bgColor} rounded-xl p-4 text-left hover:shadow-lg transition-all duration-300 hover:scale-105 group`}
          >
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${action.color} flex items-center justify-center text-white shadow-lg`}>
                <action.icon className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800 group-hover:text-teal-600 transition-colors">
                  {action.title}
                </h4>
                <p className="text-sm text-gray-600">{action.description}</p>
              </div>
              <div className="text-gray-400 group-hover:text-teal-500 transition-colors">
                →
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}