"use client";

import { motion } from "framer-motion";
import { Clock, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function LocationCard({ location }: { location: any }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
    >
      <Card className="overflow-hidden border border-gray-200 hover:border-gray-300 transition-all duration-200 h-full flex flex-col cursor-pointer">
        <div className="relative w-full overflow-hidden bg-gray-100 aspect-[4/3]">
          <img 
            src={location.image} 
            alt={location.name}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105" 
          />
        </div>

        <CardContent className="p-2 flex flex-col gap-0">
          <h3 className="text-lg font-semibold text-gray-900 mb-0 line-clamp-1">
            {location.name}
          </h3>
          
          <p className="text-sm text-gray-600 mb-0 line-clamp-2 flex-1">
            {location.shortDescription}
          </p>

          <div className="flex items-center justify-between text-sm text-gray-700 mb-1 pt-3 border-t border-gray-100">
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-gray-500" />
              <span>{location.duration}</span>
            </div>
            
            <div className="flex items-center gap-1.5">
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              <span className="font-medium">{location.rating}</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-lg font-bold text-gray-900">
              ৳{location.price.toLocaleString()}
            </p>
            <span className="text-xs text-gray-500">per person</span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}