"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface RegionData {
  name: string;
  image: string;
  tourCount: number;
}

export default function RegionHero({ region, image }: { region: string; image?: string }) {
  const [regionData, setRegionData] = useState<RegionData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/regions/${region}`)
      .then(res => res.json())
      .then(data => {
        setRegionData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch region:', err);
        setLoading(false);
      });
  }, [region]);

  const displayImage = regionData?.image || image || `/regions/${region}.jpg`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative h-[60vh] rounded-3xl overflow-hidden"
    >
      <img
        src={displayImage}
        alt={region}
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 flex h-full items-center justify-center text-center text-white px-6">
        <div className="space-y-4">
          <h1 className="text-5xl font-bold capitalize">{region}</h1>
          <p className="max-w-xl mx-auto text-lg text-white/90">
            Handpicked destinations, premium tours, unforgettable memories.
          </p>
          {regionData?.tourCount && (
            <p className="text-sm text-white/80">
              {regionData.tourCount} tours available
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}