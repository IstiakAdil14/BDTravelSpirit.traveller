'use client';

import React from 'react';
import { MapPin, Clock, ArrowRight, Star, Users, TrendingUp } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { motion } from "framer-motion";
import Image from 'next/image';
import { showProductionNotification } from '@/components/shared/ProductionNotification';

import Autoplay from 'embla-carousel-autoplay';

interface TourLocation {
    _id: string;
    name: string;
    image: string;
    description: string;
    highlights: string[];
    duration: string;
}

interface OurTourLocationsForYouUIProps {
    tourLocations: TourLocation[];
    stats: {
        destinations: string;
        travelers: string;
        rating: string;
        successRate: string;
    };
}

const OurTourLocationsForYouUI = ({ tourLocations, stats }: OurTourLocationsForYouUIProps) => {
    return (
        <section className="py-4 bg-gradient-to-br from-white via-emerald-50/30 to-teal-50/50 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-200/20 rounded-full blur-3xl -z-10" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-200/20 rounded-full blur-3xl -z-10" />

            <div className="container mx-auto px-4">
                {/* Section Badge */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
                    className="flex justify-center mb-10"
                >
                    <div className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-emerald-500/20 via-teal-500/20 to-cyan-500/20 border-2 border-emerald-400/30 px-6 py-1 backdrop-blur-sm hover:border-emerald-400/50 transition-all duration-300 shadow-lg hover:shadow-emerald-200/50">
                        <span className="text-emerald-700 font-semibold tracking-wide text-sm uppercase">OUR TOUR LOCATIONS</span>
                    </div>
                </motion.div>

                {/* Section Title */}
                <div className="text-center mb-16 animate-slide-up">
                    <h2 className="text-2xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                        Explore Our Curated
                        <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600">
                            Tour Locations
                        </span>
                    </h2>
                    <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Discover handpicked destinations across Bangladesh, each offering unique experiences and unforgettable memories.
                        From pristine beaches to majestic mountains, we have the perfect location for your dream vacation.
                    </p>
                </div>

                {/* Tour Locations Carousel */}
                <div className="relative mb-16 ml-4 mr-4">
                    <Carousel
                        plugins={[Autoplay({ delay: 2000 })]}
                        opts={{
                            align: "start",
                            loop: true,
                        }}
                        className="w-full"
                        aria-label="Tour locations carousel"
                    >
                        <CarouselContent className="-ml-2 sm:-ml-4 md:-ml-4 mb-4">
                            {tourLocations.map((location) => (
                                <CarouselItem key={location._id} className="pl-2 sm:pl-4 md:pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                                    <div
                                        className="bg-white rounded-3xl overflow-hidden shadow-lg transition-all duration-500 border border-gray-100 group cursor-pointer hover:shadow-xl hover:-translate-y-1"
                                        onMouseEnter={() => { }}
                                        onMouseLeave={() => { }}
                                    >
                                        {/* Image */}
                                        <div className="relative h-40 overflow-hidden">
                                            <Image
                                                src={location.image}
                                                alt={`Tour location: ${location.name}`}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                                onError={(e) => {
                                                    e.currentTarget.src = '/images/placeholder.jpg'; // Fallback to placeholder if image fails to load
                                                }}
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                                        </div>

                                        {/* Content */}
                                        <div className="p-4">
                                            <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                                                {location.name.length > 18 ? location.name.slice(0, 18) + '...' : location.name}
                                            </h3>

                                            {/* Description */}
                                            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                                                {location.description}
                                            </p>

                                            {/* Highlights */}
                                            <div className="flex flex-wrap gap-1 mb-3">
                                                {location.highlights?.slice(0, 2).map((highlight, idx) => (
                                                    <span
                                                        key={idx}
                                                        className="px-2 py-1 bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 text-xs font-medium rounded-full border border-emerald-200/50"
                                                    >
                                                        {highlight}
                                                    </span>
                                                ))}
                                                {location.highlights.length > 2 && (
                                                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                                                        +{location.highlights.length - 2} more
                                                    </span>
                                                )}
                                            </div>

                                            {/* Duration and CTA */}
                                            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                                                <div className="flex items-center gap-2 text-gray-600">
                                                    <Clock className="w-3 h-3" />
                                                    <span className="text-xs font-medium">{location.duration}</span>
                                                </div>
                                                <button suppressHydrationWarning={true} className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1 transition-all duration-300 hover:shadow-lg hover:scale-105">
                                                    Explore
                                                    <ArrowRight className="w-3 h-3" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="left-0 cursor-pointer" />
                        <CarouselNext className="right-0 cursor-pointer" />
                    </Carousel>
                </div>

                {/* Stats Section */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16 max-w-5xl mx-auto">
                    {[
                        { label: 'Destinations', value: stats.destinations, icon: MapPin },
                        { label: 'Happy Travelers', value: stats.travelers, icon: Users },
                        { label: 'Average Rating', value: stats.rating, icon: Star },
                        { label: 'Success Rate', value: stats.successRate, icon: TrendingUp }
                    ].map((stat, idx) => {
                        const IconComponent = stat.icon;
                        return (
                            <div
                                key={idx}
                                className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-emerald-200 transform hover:-translate-y-1"
                            >
                                <IconComponent className="w-8 h-8 text-emerald-600 mx-auto mb-3" />
                                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                                <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                            </div>
                        );
                    })}
                </div>

                {/* CTA Button */}
                <div className="text-center animate-fade-in">
                    <button 
                        onClick={showProductionNotification}
                        suppressHydrationWarning={true} 
                        className="bg-gradient-to-r from-emerald-500 via-teal-600 to-cyan-600 hover:from-emerald-600 hover:via-teal-700 hover:to-cyan-700 text-white px-10 py-2 rounded-full text-lg font-bold inline-flex items-center gap-3 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border-2 border-white/20 cursor-pointer">
                        View All Tour Locations
                        <ArrowRight className="w-6 h-6" />
                    </button>
                    <p className="text-sm text-gray-500 mt-4">
                        ✨ New locations added every month
                    </p>
                </div>
            </div>
        </section>
    );
};

export default OurTourLocationsForYouUI;
