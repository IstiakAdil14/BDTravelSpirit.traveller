'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Leaf, MapPin, TreePine, Mountain, Map, FileText,
  Flag, Plane, CloudSun, Thermometer, Sparkles, CheckCircle2, Circle, Lightbulb
} from 'lucide-react';
import { useLoader } from './LoaderProvider';
import { getLoaderMetadata } from './loaderMetadata';



export default function TravelLoader() {
  const { isLoading, targetRoute, loaderMetadataOverride } = useLoader();

  const baseMetadata = getLoaderMetadata(targetRoute);
  const metadata = { ...baseMetadata, ...loaderMetadataOverride };

  // Helper to safely extract image URL whether it's a string, or an asset object
  const getImageUrl = (img: any): string => {
    if (!img) return baseMetadata.image || 'https://images.unsplash.com/photo-1627896157734-44b4eb2b535d?auto=format&fit=crop&w=1200&q=80';
    if (typeof img === 'string') return img;
    if (img.publicUrl) return img.publicUrl;
    if (img.url) return img.url;
    if (img.file?.publicUrl) return img.file.publicUrl; // handle nested file objects
    return baseMetadata.image;
  };

  const bgImageUrl = getImageUrl(metadata.image);

  const [currentStep, setCurrentStep] = useState(1);
  const [currentChecklistItem, setCurrentChecklistItem] = useState(1);

  // Simulate progress
  useEffect(() => {
    if (!isLoading) return;

    // Reset state on start
    setCurrentChecklistItem(1);
    setCurrentStep(1);

    const interval = setInterval(() => {
      setCurrentChecklistItem((prev) => {
        const next = prev < metadata.checklistItems.length ? prev + 1 : prev;
        setCurrentStep(next <= metadata.steps.length ? next : metadata.steps.length);
        if (next >= metadata.checklistItems.length) clearInterval(interval);
        return next;
      });
    }, 800); // Progress every 800ms

    return () => clearInterval(interval);
  }, [isLoading, metadata.checklistItems.length, metadata.steps.length]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] bg-gradient-to-br from-[#065f46] to-[#022c22] text-white overflow-hidden font-inter [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {/* Wrapper for centering that doesn't clip top content on overflow */}
          <div className="min-h-full flex flex-col items-center justify-center p-4 sm:p-8 relative">
            {/* Background decorative elements (particles/birds) */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
              <div className="absolute top-[20%] left-[10%] w-2 h-2 rounded-full bg-white blur-[2px] animate-pulse" />
              <div className="absolute top-[40%] right-[20%] w-3 h-3 rounded-full bg-white blur-[3px] animate-pulse delay-1000" />
              <div className="absolute bottom-[30%] left-[30%] w-1.5 h-1.5 rounded-full bg-white blur-[1px] animate-pulse delay-500" />
            </div>

            <div className="max-w-6xl w-full flex flex-col items-center relative z-10">
              {/* Header */}
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-center mb-4 md:mb-8 flex flex-col items-center"
              >
                <div className="flex items-center gap-2 text-emerald-300 text-xs md:text-sm font-semibold tracking-widest uppercase mb-2">
                  EXPLORING BANGLADESH <Leaf size={14} />
                </div>
                <h1 className="text-2xl md:text-4xl font-bold mb-2 md:mb-3 tracking-tight">
                  {metadata.title}
                </h1>
                <div className="flex items-center gap-2 text-emerald-100/80 text-xs md:text-sm mb-4">
                  <span className="font-semibold text-white">Travel Spirit</span>
                  <span className="flex items-center gap-1"><MapPin size={14} /> {metadata.location}</span>
                </div>

                <div className="flex gap-3">
                  {metadata.tags.slice(0, 3).map((tag, idx) => {
                    const icons = [<Leaf size={12} key={1} />, <TreePine size={12} key={2} />, <Mountain size={12} key={3} />];
                    return (
                      <div key={tag} className="flex items-center gap-1.5 bg-emerald-800/40 border border-emerald-600/30 px-3 py-1.5 rounded-full text-xs font-medium text-emerald-100 backdrop-blur-sm">
                        {icons[idx % icons.length]} {tag}
                      </div>
                    );
                  })}
                </div>
              </motion.div>

              {/* Progress Timeline */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="w-full max-w-4xl mb-6 md:mb-8 relative"
              >
                <div className="flex justify-between items-center relative z-10">
                  {metadata.steps.map((step, idx) => {
                    const isActive = step.id <= currentStep;
                    const isCurrent = step.id === currentStep;
                    const Icon = step.icon;
                    return (
                      <div key={step.id} className="flex flex-col items-center relative z-10">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 mb-3 transition-colors duration-500
                        ${isActive ? 'bg-emerald-600 border-emerald-400 text-white' : 'bg-emerald-900/50 border-emerald-800/50 text-emerald-700'}
                        ${isCurrent ? 'shadow-[0_0_15px_rgba(52,211,153,0.5)]' : ''}
                      `}>
                          <Icon size={20} />
                        </div>
                        <div className="text-center">
                          <div className={`text-sm font-semibold ${isActive ? 'text-white' : 'text-emerald-700'}`}>{step.title}</div>
                          <div className={`text-xs ${isActive ? 'text-emerald-300' : 'text-emerald-800'}`}>{step.subtitle}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                {/* Connecting Lines */}
                <div className="absolute top-6 left-0 right-0 h-[2px] bg-emerald-800/50 -z-0 ml-6 mr-6 flex items-center">
                  {/* Active Line Progress */}
                  <div
                    className="h-full bg-emerald-400 relative transition-all duration-1000 ease-in-out"
                    style={{ width: `${Math.max(0, Math.min(100, ((currentStep - 1) / Math.max(1, metadata.steps.length - 1)) * 100))}%` }}
                  >
                    <Plane className="absolute right-0 -top-2.5 text-emerald-100 transform rotate-45" size={24} />
                  </div>
                </div>
              </motion.div>

              {/* Main Cards Content */}
              <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 mb-4 md:mb-6">

                {/* Left Card (Image & Info) */}
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="md:col-span-7 bg-[#0b3d2c]/80 border border-emerald-700/30 rounded-2xl md:rounded-3xl overflow-hidden backdrop-blur-md shadow-2xl relative flex flex-col"
                >
                  <div className="h-28 md:h-32 w-full relative shrink-0">
                    <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${bgImageUrl}')` }} />
                    <div className="absolute top-4 left-4 bg-emerald-900/80 backdrop-blur text-emerald-100 text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1.5 uppercase">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Live View
                    </div>
                  </div>
                  <div className="p-3 md:p-4 flex-1 flex flex-col justify-center">
                    <div className="flex items-center gap-1 text-emerald-300 text-xs md:text-sm mb-1 font-medium">
                      <MapPin size={14} /> {metadata.location.split(',')[0]}
                    </div>
                    <h2 className="text-lg md:text-xl font-bold mb-1 md:mb-2 text-white">{metadata.title}</h2>
                    <p className="text-emerald-100/70 text-xs md:text-sm leading-relaxed mb-3 max-w-md hidden md:block">
                      {metadata.insightText || metadata.subtitle}
                    </p>

                    <div className="flex gap-4">
                      {[
                        { title: 'Best Time', val: 'Oct - Mar', icon: CloudSun },
                        { title: 'Avg. Temp.', val: '18° - 25°C', icon: Thermometer },
                        { title: 'Elevation', val: '1,200 ft', icon: Mountain },
                      ].map((info) => (
                        <div key={info.title} className="bg-emerald-900/40 border border-emerald-700/30 rounded-xl p-2 md:p-3 flex-1 flex items-center gap-2 md:gap-3">
                          <info.icon size={20} className="text-emerald-400" />
                          <div>
                            <div className="text-[10px] text-emerald-300/80 uppercase font-semibold">{info.title}</div>
                            <div className="text-xs text-white font-bold">{info.val}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Right Card (Checklist) */}
                <motion.div
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="md:col-span-5 bg-emerald-800/20 border border-emerald-600/20 rounded-2xl md:rounded-3xl p-3 md:p-4 backdrop-blur-xl shadow-xl flex flex-col justify-center"
                >
                  <div className="flex items-center gap-2 text-emerald-100 font-semibold mb-3 md:mb-4 text-sm md:text-base">
                    <Sparkles size={16} className="text-emerald-300" /> Preparing your experience...
                  </div>
                  <div className="space-y-1.5 md:space-y-2 flex-1">
                    {metadata.checklistItems.map((item) => {
                      const isCompleted = item.id < currentChecklistItem;
                      const isCurrent = item.id === currentChecklistItem;

                      return (
                        <div
                          key={item.id}
                          className={`flex items-center gap-2 md:gap-3 p-1.5 md:p-2 rounded-xl transition-all duration-300 ${isCurrent ? 'bg-emerald-600/30 border border-emerald-500/30 shadow-inner' : ''} ${item.id > currentChecklistItem ? 'opacity-40' : 'opacity-100'}`}
                        >
                          <div className="relative flex-shrink-0 flex items-center justify-center w-6 h-6">
                            {isCompleted ? (
                              <CheckCircle2 size={24} className="text-emerald-400" />
                            ) : isCurrent ? (
                              <div className="w-5 h-5 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
                            ) : (
                              <Circle size={22} className="text-emerald-600" />
                            )}
                          </div>
                          <div>
                            <div className={`text-sm font-medium ${isCurrent ? 'text-emerald-100' : 'text-white'}`}>{item.title}</div>
                            <div className={`text-xs ${isCurrent ? 'text-emerald-200' : 'text-emerald-300/60'}`}>{item.subtitle}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>

              </div>


            </div>

            {/* Bottom Left Small Loader Status */}
            <div className="fixed bottom-6 left-6 flex items-center gap-3 bg-black/40 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full z-50">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <div>
                <div className="text-[10px] font-semibold text-emerald-100">Rendering Experience</div>
                <div className="text-[10px] text-emerald-300/60">Please wait a moment...</div>
              </div>
            </div>
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
