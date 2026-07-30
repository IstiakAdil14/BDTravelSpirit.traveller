'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Heart, MapPin, ArrowRight, PlaneTakeoff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

interface WishlistItem {
  id: string;
  slug?: string;
  name: string;
  location: string;
  price: string;
  image?: string;
}

interface WishlistPageProps {
  wishlistItems?: WishlistItem[];
}

export default function WishlistPage({ wishlistItems = [] }: WishlistPageProps) {
  
  if (wishlistItems.length === 0) {
    return (
      <div className="w-full flex flex-col items-center justify-center min-h-[500px] bg-white rounded-2xl shadow-sm border border-slate-100 p-8 text-center">
        <div className="w-24 h-24 bg-rose-50 rounded-full flex items-center justify-center mb-6">
          <Heart className="w-12 h-12 text-rose-300" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-3">Your wishlist is empty</h2>
        <p className="text-slate-500 max-w-md mx-auto mb-8 leading-relaxed">
          You haven't saved any tours yet. Start exploring our beautiful destinations in Bangladesh and click the heart icon to save your favorites for later!
        </p>
        <Link href="/all-tours">
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-6 rounded-xl font-semibold shadow-lg shadow-emerald-600/20 group transition-all duration-300">
            <PlaneTakeoff className="w-5 h-5 mr-2 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
            Explore Tours
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">My Wishlist</h1>
          <p className="text-slate-500 mt-2">You have saved {wishlistItems.length} {wishlistItems.length === 1 ? 'tour' : 'tours'} for future adventures.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {wishlistItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col"
          >
            <Link href={`/tours/${item.slug || item.id}`} className="flex flex-col flex-1">
            {/* Image Placeholder / Top Section */}
            <div className="h-48 bg-slate-100 relative overflow-hidden flex items-center justify-center">
              {item.image ? (
                <Image 
                  src={item.image} 
                  alt={item.name} 
                  fill 
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              ) : (
                <PlaneTakeoff className="w-12 h-12 text-slate-300 group-hover:scale-110 transition-transform duration-500" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
              <div className="absolute top-4 right-4 z-20">
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    // Future: Toggle wishlist functionality
                  }}
                  className="p-2 bg-white/20 backdrop-blur-md rounded-full hover:bg-white transition-colors group/btn"
                >
                  <Heart className="w-5 h-5 text-white group-hover/btn:text-rose-500 fill-white group-hover/btn:fill-rose-500 transition-colors" />
                </button>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-5 flex flex-col flex-1">
              <h3 className="font-bold text-lg text-slate-800 line-clamp-1 mb-2 group-hover:text-emerald-600 transition-colors">
                {item.name}
              </h3>
              
              <div className="flex items-center text-slate-500 text-sm mb-4">
                <MapPin className="w-4 h-4 mr-1 shrink-0 text-emerald-500" />
                <span className="truncate">{item.location}</span>
              </div>
              
              <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Starts From</p>
                  <p className="font-bold text-emerald-600 text-lg">{item.price}</p>
                </div>
                
                <Button asChild variant="ghost" className="hover:bg-emerald-50 hover:text-emerald-700 text-slate-600 p-2 h-auto rounded-xl">
                  <div>
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </Button>
              </div>
            </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
