"use client";

import { motion } from "framer-motion";
import { Sparkles, MapPin, Clock, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const suggestions = [
  {
    type: "destination",
    title: "Perfect Weather in Bandarban",
    description: "Based on your preferences for hill stations, Bandarban has ideal weather this week.",
    action: "Explore Now",
    icon: MapPin,
    color: "from-green-500 to-emerald-500"
  },
  {
    type: "timing",
    title: "Best Time to Visit Sylhet",
    description: "Tea gardens are most beautiful in winter. Book now for 20% early bird discount.",
    action: "View Deals",
    icon: Clock,
    color: "from-blue-500 to-cyan-500"
  },
  {
    type: "trending",
    title: "Trending: Eco-Tourism",
    description: "Sustainable travel is trending. Discover eco-friendly tours in Sundarbans.",
    action: "Learn More",
    icon: TrendingUp,
    color: "from-purple-500 to-indigo-500"
  }
];

export default function AISuggestions() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.5 }}
    >
      <Card className="bg-gradient-to-br from-purple-50/50 to-indigo-50/50 border-purple-200/30 shadow-lg backdrop-blur-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-gray-900">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            AI Smart Suggestions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {suggestions.map((suggestion, index) => (
            <motion.div
              key={suggestion.type}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
              className="flex items-start gap-4 p-4 bg-white/60 rounded-xl hover:bg-white/80 transition-all duration-200 group cursor-pointer"
            >
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${suggestion.color} flex items-center justify-center shadow-lg`}>
                <suggestion.icon className="w-5 h-5 text-white" />
              </div>
              
              <div className="flex-1 space-y-1">
                <h4 className="font-semibold text-gray-900 group-hover:text-purple-700 transition-colors">
                  {suggestion.title}
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {suggestion.description}
                </p>
              </div>
              
              <Button 
                variant="ghost" 
                size="sm"
                className="text-purple-600 hover:text-purple-700 hover:bg-purple-100/50 opacity-0 group-hover:opacity-100 transition-all duration-200"
              >
                {suggestion.action}
              </Button>
            </motion.div>
          ))}
          
          <div className="pt-2">
            <Button 
              variant="outline" 
              className="w-full bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-200/50 text-purple-700 hover:from-purple-100 hover:to-indigo-100"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Get More AI Suggestions
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}