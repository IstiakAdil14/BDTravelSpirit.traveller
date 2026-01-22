"use client";

import { motion } from "framer-motion";
import { MapPin, Calendar, Users, Camera } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function ActiveTripCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
    >
      <Card className="relative overflow-hidden bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600 border-0 shadow-2xl">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
        
        <CardContent className="relative p-6 lg:p-8 text-white">
          <div className="flex items-start justify-between mb-6">
            <div>
              <Badge className="bg-white/20 text-white border-white/30 mb-3">
                Active Trip
              </Badge>
              <h2 className="text-2xl lg:text-3xl font-bold mb-2">
                Cox's Bazar Beach Paradise
              </h2>
              <p className="text-white/80 text-sm lg:text-base">
                4-day beach vacation with sunset views
              </p>
            </div>
            <div className="text-right">
              <p className="text-3xl lg:text-4xl font-bold">3</p>
              <p className="text-white/80 text-sm">days left</p>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-white/80" />
              <span className="text-sm text-white/90">Cox's Bazar</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-white/80" />
              <span className="text-sm text-white/90">Dec 15-18</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-white/80" />
              <span className="text-sm text-white/90">2 travelers</span>
            </div>
            <div className="flex items-center gap-2">
              <Camera className="w-4 h-4 text-white/80" />
              <span className="text-sm text-white/90">Beach resort</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              variant="secondary" 
              className="bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm"
            >
              View Itinerary
            </Button>
            <Button 
              variant="outline" 
              className="bg-transparent hover:bg-white/10 text-white border-white/30"
            >
              Contact Guide
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}