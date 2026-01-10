'use client';

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import TestimonialCard from "./TestimonialCard";
import { useTestimonialsScroll } from "@/lib/useTestimonialsScroll";

interface Testimonial {
    quote: string;
    author: string;
    role: string;
    avatar: string;
    rating: number;
    gradient: string;
}

interface Stat {
    number: string;
    label: string;
    suffix: string;
    icon: string;
}

interface TestimonialsUIProps {
    testimonials: Testimonial[];
    stats: Stat[];
}

const TestimonialsUI = ({ testimonials, stats }: TestimonialsUIProps) => {
    const { scrollRef, scrollProgress, scrollLeftControl, scrollRightControl } = useTestimonialsScroll();

    return (
        <section className="py-4 bg-gradient-to-br from-slate-50 via-purple-50/30 to-blue-50/40 text-gray-900 relative overflow-hidden">
            {/* Enhanced Background Effects */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-emerald-300/20 to-teal-400/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-gradient-to-br from-blue-300/20 to-purple-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-br from-pink-200/10 to-orange-200/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />

                {/* Decorative Elements */}
                <div className="absolute top-40 right-1/4 opacity-20">
                    <Quote className="w-32 h-32 text-emerald-400 transform rotate-12" />
                </div>
                <div className="absolute bottom-40 left-1/4 opacity-20">
                    <Quote className="w-24 h-24 text-purple-400 transform -rotate-12" />
                </div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Enhanced Section Badge */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
                    className="flex justify-center mb-10"
                >
                    <div className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-emerald-500/20 via-teal-500/20 to-cyan-500/20 border-2 border-emerald-400/30 px-6 py-1 backdrop-blur-sm hover:border-emerald-400/50 transition-all duration-300 shadow-lg hover:shadow-emerald-200/50">
                        <div className="relative flex gap-1">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            ))}
                            <div className="absolute inset-0 animate-pulse">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400 opacity-50" />
                                ))}
                            </div>
                        </div>
                        <span className="text-emerald-700 font-semibold tracking-wide text-sm uppercase">What our Customers say?</span>
                    </div>
                </motion.div>

                {/* Enhanced Section Title */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-center mb-10"
                >
                    <h2 className="text-5xl md:text-6xl font-display font-bold mb-6 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent leading-tight">
                        What Our Travelers Say
                    </h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed"
                    >
                        Join thousands of satisfied travelers who have discovered Bangladesh through our expert guidance and authentic experiences.
                    </motion.p>

                    {/* Decorative Line */}
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 mx-auto mt-8 rounded-full"
                    />
                </motion.div>

                {/* Testimonials Horizontal Scroll with Enhanced Container */}
                <div className="relative mb-6">
                    {/* Gradient Fade Effects */}
                    <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-slate-50 via-purple-50/30 to-transparent z-20 pointer-events-none" />
                    <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-50 via-purple-50/30 to-transparent z-20 pointer-events-none" />

                    <div
                        ref={scrollRef}
                        className="flex flex-row overflow-x-auto gap-6 pb-2 px-4 scroll-smooth snap-x snap-mandatory scrollbar-hide cursor-grab active:cursor-grabbing select-none pl-20"
                        style={{ scrollPaddingLeft: '2rem', scrollPaddingRight: '2rem' }}
                    >
                        {testimonials.map((testimonial, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.05 }}
                            >
                                <TestimonialCard testimonial={testimonial} index={index} />
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Enhanced Scroll Controls */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex justify-center items-center gap-6 mb-16"
                >
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={scrollLeftControl}
                        className="group relative p-2 bg-white/90 backdrop-blur-xl rounded-full border-2 border-emerald-200/50 hover:border-emerald-400/70 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-emerald-200/50 focus:outline-none focus:ring-4 focus:ring-emerald-500/30 cursor-pointer"
                        aria-label="Scroll left"
                        suppressHydrationWarning={true}
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <ChevronLeft className="w-6 h-6 text-gray-700 group-hover:text-emerald-600 transition-colors duration-300 relative z-10" />
                    </motion.button>

                    {/* Enhanced Progress Bar */}
                    <div className="relative flex-1 max-w-md">
                        <div className="h-2 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full overflow-hidden shadow-inner">
                            <motion.div
                                className="h-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-full relative"
                                style={{ width: `${scrollProgress}%` }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent animate-pulse" />
                            </motion.div>
                        </div>
                        <div className="absolute -top-1 left-0 w-full flex items-center">
                            <motion.div
                                className="w-4 h-4 bg-white border-2 border-emerald-500 rounded-full shadow-lg"
                                style={{ left: `calc(${scrollProgress}% - 8px)` }}
                                transition={{ duration: 0.3 }}
                            />
                        </div>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={scrollRightControl}
                        className="group relative p-2 bg-white/90 backdrop-blur-xl rounded-full border-2 border-emerald-200/50 hover:border-emerald-400/70 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-emerald-200/50 focus:outline-none focus:ring-4 focus:ring-emerald-500/30 cursor-pointer"
                        aria-label="Scroll right"
                        suppressHydrationWarning={true}
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-cyan-500/10 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <ChevronRight className="w-6 h-6 text-gray-700 group-hover:text-emerald-600 transition-colors duration-300 relative z-10" />
                    </motion.button>
                </motion.div>

                {/* Compact Stats Banner */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative"
                >
                    <div className="relative bg-white/90 backdrop-blur-xl rounded-2xl p-8 border border-gray-200 shadow-lg">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                            {stats.map((stat, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ scale: 1, opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                                    className="group"
                                >
                                    <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
                                        {stat.number}{stat.suffix}
                                    </div>
                                    <div className="text-gray-600 font-medium">
                                        {stat.label}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Social Proof Badge */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="mt-16 flex justify-center"
                >
                    <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 border border-emerald-200/50 shadow-lg">
                        <div className="flex -space-x-2">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-teal-400 border-2 border-white" />
                            ))}
                        </div>
                        <span className="text-gray-700 font-medium">Join 10,000+ happy travelers</span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default TestimonialsUI;
