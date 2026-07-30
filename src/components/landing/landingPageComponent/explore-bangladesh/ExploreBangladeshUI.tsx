'use client';

import { MapPin, ArrowRight, Compass } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useState } from 'react';

interface Destination {
    _id: string;
    name: string;
    image: string;
    tourPlaces: number;
}

interface ExploreBangladeshUIProps {
    destinations: Destination[];
}

const ExploreBangladeshUI = ({ destinations }: ExploreBangladeshUIProps) => {
    const router = useRouter();

    const handleDestinationClick = (destinationName: string) => {
        router.push(`/tours?region=${destinationName.toLowerCase()}`);
    };

    const themes = [
        { blob: 'bg-emerald-400/30', text: 'group-hover:text-emerald-600', iconBg: 'bg-emerald-100 text-emerald-700', border: 'hover:border-emerald-300', btn: 'text-emerald-600' },
        { blob: 'bg-blue-400/30', text: 'group-hover:text-blue-600', iconBg: 'bg-blue-100 text-blue-700', border: 'hover:border-blue-300', btn: 'text-blue-600' },
        { blob: 'bg-rose-400/30', text: 'group-hover:text-rose-600', iconBg: 'bg-rose-100 text-rose-700', border: 'hover:border-rose-300', btn: 'text-rose-600' },
        { blob: 'bg-amber-400/30', text: 'group-hover:text-amber-600', iconBg: 'bg-amber-100 text-amber-700', border: 'hover:border-amber-300', btn: 'text-amber-600' },
        { blob: 'bg-indigo-400/30', text: 'group-hover:text-indigo-600', iconBg: 'bg-indigo-100 text-indigo-700', border: 'hover:border-indigo-300', btn: 'text-indigo-600' },
        { blob: 'bg-cyan-400/30', text: 'group-hover:text-cyan-600', iconBg: 'bg-cyan-100 text-cyan-700', border: 'hover:border-cyan-300', btn: 'text-cyan-600' },
        { blob: 'bg-fuchsia-400/30', text: 'group-hover:text-fuchsia-600', iconBg: 'bg-fuchsia-100 text-fuchsia-700', border: 'hover:border-fuchsia-300', btn: 'text-fuchsia-600' },
        { blob: 'bg-orange-400/30', text: 'group-hover:text-orange-600', iconBg: 'bg-orange-100 text-orange-700', border: 'hover:border-orange-300', btn: 'text-orange-600' },
    ];

    return (
        <section className="py-4 md:py-24 bg-gradient-to-br from-emerald-50/50 via-white to-teal-50/30 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 right-10 w-72 h-72 bg-emerald-200/20 rounded-full blur-3xl" />
                <div className="absolute bottom-20 left-10 w-96 h-96 bg-teal-200/20 rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section Badge */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
                    className="flex justify-center mb-10"
                >
                    <div className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-emerald-500/20 via-teal-500/20 to-cyan-500/20 border-2 border-emerald-400/30 px-6 py-1 backdrop-blur-sm hover:border-emerald-400/50 transition-all duration-300 shadow-lg hover:shadow-emerald-200/50">
                        <span className="text-emerald-700 font-semibold tracking-wide text-sm uppercase">
                            Explore Bangladesh
                        </span>
                    </div>
                </motion.div>

                {/* Section Title */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-center mb-12 md:mb-16"
                >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6">
                        Discover the Beauty of
                        <span className="block sm:inline bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent"> Bangladesh</span>
                    </h2>
                    <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        From pristine beaches to lush tea gardens, explore the diverse landscapes and rich culture of Bangladesh.
                        Create unforgettable memories with our curated travel experiences.
                    </p>
                </motion.div>

                {/* Destinations Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 max-w-7xl mx-auto">
                    {destinations.map((destination, index) => {
                        const theme = themes[index % themes.length];
                        const shortForm = destination.name.split(/[\s-]/).length > 1 
                                                ? destination.name.split(/[\s-]/).map(w => w[0]).join('').substring(0, 2).toUpperCase()
                                                : destination.name.substring(0, 2).toUpperCase();

                        return (
                        <motion.div
                            key={destination._id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group h-full"
                        >
                            <div
                                className={`rounded-[2rem] overflow-hidden border border-white/10 shadow-lg shadow-slate-900/20 hover:border-emerald-400/50 transition-all duration-500 cursor-pointer h-60 sm:h-64 relative flex flex-col justify-between p-7`}
                                onClick={() => handleDestinationClick(destination.name)}
                            >
                                {/* Background Image */}
                                <div className="absolute inset-0 z-0 overflow-hidden">
                                    <img 
                                        src={destination.image} 
                                        alt={destination.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    {/* Gradient overlay to ensure text readability */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/30 group-hover:from-black/80 transition-colors" />
                                </div>
                                
                                {/* Giant Watermark */}
                                <div className="absolute -bottom-6 -right-2 text-[140px] font-black text-white/5 group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-700 pointer-events-none select-none z-10 tracking-tighter leading-none">
                                    {shortForm}
                                </div>
                                
                                {/* Top Area: Short Form & Tours Count */}
                                <div className="flex justify-between items-start relative z-20">
                                    <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/30 backdrop-blur-md border border-white/10 shadow-sm text-white group-hover:bg-emerald-500/20 group-hover:border-emerald-400/30 transition-all">
                                        <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                                        <span className="text-xs font-bold uppercase tracking-wide">
                                            {destination.tourPlaces} Tours
                                        </span>
                                    </div>
                                </div>

                                {/* Bottom Area: Name & Action */}
                                <div className="relative z-20 mt-auto">
                                    <h3 className={`text-2xl sm:text-3xl font-black text-white drop-shadow-lg tracking-tight mb-2 group-hover:text-emerald-300 transition-colors duration-300`}>
                                        {destination.name}
                                    </h3>
                                    
                                    <div className={`flex items-center gap-2 text-emerald-400 text-sm font-bold uppercase tracking-wider opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300`}>
                                        <span>Explore Division</span>
                                        <ArrowRight className="w-4 h-4" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default ExploreBangladeshUI;
