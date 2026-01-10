'use client';

import { MapPin, ArrowRight, Compass } from 'lucide-react';
import { motion } from 'framer-motion';

interface Destination {
    id: number;
    name: string;
    image: string;
    tourPlaces: number;
}

interface ExploreBangladeshUIProps {
    destinations: Destination[];
}

const ExploreBangladeshUI = ({ destinations }: ExploreBangladeshUIProps) => {
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mb-12 max-w-7xl mx-auto">
                    {destinations.map((destination, index) => (
                        <motion.div
                            key={destination.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group"
                        >
                            <div className="rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer h-72 sm:h-80 relative">
                                {/* Background Image */}
                                <div
                                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                    style={{ backgroundImage: `url(${destination.image})` }}
                                />

                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:from-black/90 transition-all duration-500" />

                                {/* Shine effect on hover */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                                {/* Content */}
                                <div className="relative z-10 p-6 h-full flex flex-col justify-end text-white">
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 + index * 0.1 }}
                                    >
                                        <h3 className="text-2xl font-bold mb-3 group-hover:text-emerald-300 transition-colors duration-300">
                                            {destination.name}
                                        </h3>

                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <div className="p-1.5 bg-emerald-500/20 backdrop-blur-sm rounded-lg group-hover:bg-emerald-500/30 transition-colors duration-300">
                                                    <MapPin className="w-4 h-4 text-emerald-300" />
                                                </div>
                                                <span className="text-sm text-gray-200 font-medium">
                                                    {destination.tourPlaces} tour places
                                                </span>
                                            </div>

                                            {/* Explore button - appears on hover */}
                                            <motion.div
                                                initial={{ opacity: 0, x: -10 }}
                                                whileHover={{ opacity: 1, x: 0 }}
                                                className="opacity-0 group-hover:opacity-100 transition-all duration-300"
                                            >
                                                <div className="flex items-center gap-1 text-emerald-300 text-sm font-semibold">
                                                    <span>Explore</span>
                                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                                                </div>
                                            </motion.div>
                                        </div>
                                    </motion.div>

                                    {/* Border glow effect */}
                                    <div className="absolute inset-0 rounded-2xl border-2 border-emerald-400/0 group-hover:border-emerald-400/30 transition-all duration-500" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-center"
                >
                    <button suppressHydrationWarning={true} className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 rounded-full font-semibold text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95">
                        <span>View All Destinations</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </button>
                </motion.div>
            </div>
        </section>
    );
};

export default ExploreBangladeshUI;
