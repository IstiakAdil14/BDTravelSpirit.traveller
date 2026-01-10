'use client';

import { motion, AnimatePresence } from "framer-motion";
import CountUp from "react-countup";
import { ChevronDown, Play } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface Slide {
    image: string;
    title: string;
    subtitle: string;
    alt: string;
}

interface Stat {
    number: number;
    label: string;
    suffix: string;
}

interface HeroUIProps {
    slides: Slide[];
    stats: Stat[];
    currentSlide: number;
    isVisible: boolean;
    isPaused: boolean;
    onDotClick: (index: number) => void;
}

const HeroUI = ({ slides, stats, currentSlide, isVisible, isPaused, onDotClick }: HeroUIProps) => {
    return (
        <section
            className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100"
            aria-label="Hero section"
        >
            {/* Background Carousel */}
            <div className="absolute inset-0" role="presentation">
                <AnimatePresence mode="sync">
                    {slides.map((slide, index) => (
                        index === currentSlide && (
                            <motion.div
                                key={index}
                                className="absolute inset-0 bg-cover bg-center"
                                style={{ backgroundImage: `url(${slide.image})` }}
                                initial={{ opacity: 0, scale: 1.1 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 1.2, ease: "easeInOut" }}
                                aria-label={slide.alt}
                            />
                        )
                    ))}
                </AnimatePresence>

                {/* Improved overlay with better contrast */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/85 via-gray-50/70 to-white/90 backdrop-blur-sm" />
            </div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-gray-900 py-12 sm:py-20">
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex justify-center mb-6 sm:mb-8 mt-3"
                >
                    <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-400/30 px-4 py-1 backdrop-blur-sm">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                        <span className="text-xs sm:text-sm font-medium text-emerald-700">
                            Welcome to BD Travel Spirit
                        </span>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="flex flex-col lg:flex-row items-center justify-between max-w-7xl mx-auto gap-8 lg:gap-12"
                >
                    {/* Left Content */}
                    <div className="flex-1 text-center lg:text-left space-y-6">
                        {/* Title with key prop for animation */}
                        <AnimatePresence mode="wait">
                            <motion.h1
                                key={currentSlide}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.6 }}
                                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-display font-bold leading-tight bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-700 bg-clip-text text-transparent"
                            >
                                {slides[currentSlide].title}
                            </motion.h1>
                        </AnimatePresence>

                        {/* Subtitle */}
                        <AnimatePresence mode="wait">
                            <motion.p
                                key={`subtitle-${currentSlide}`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                                className="text-lg sm:text-xl lg:text-2xl text-gray-600 max-w-2xl mx-auto lg:mx-0 font-light"
                            >
                                {slides[currentSlide].subtitle}
                            </motion.p>
                        </AnimatePresence>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4"
                        >
                            <Button
                                size="lg"
                                className="flex group relative px-8 sm:px-12 py-4 sm:py-6 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full font-semibold text-white shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 outline-none focus:ring-4 focus:ring-emerald-300 cursor-pointer "
                                aria-label="Plan your trip to Bangladesh"
                                suppressHydrationWarning={true}
                            >
                                <span className="relative z-10">Plan Your Trip Now</span>
                                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </Button>

                            <Button
                                size="lg"
                                className="flex group flex items-center justify-center gap-2 px-8 sm:px-12 py-4 sm:py-6 bg-white/90 backdrop-blur-sm border-2 border-emerald-500/30 rounded-full font-semibold text-emerald-700 hover:bg-emerald-50 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 outline-none focus:ring-4 focus:ring-emerald-300 cursor-pointer "
                                aria-label="Watch promotional video"
                                suppressHydrationWarning={true}
                            >
                                <Play className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
                                Watch Video
                            </Button>
                        </motion.div>
                    </div>

                    {/* Right Content - Featured Image */}
                    <div className="flex-1 flex justify-center lg:justify-end w-full max-w-md lg:max-w-lg">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-black/10"
                        >
                            <AnimatePresence mode="wait">
                                {slides.map((slide, index) => (
                                    index === currentSlide && (
                                        <motion.div
                                            key={index}
                                            className="absolute inset-0 bg-cover bg-center"
                                            style={{ backgroundImage: `url(${slide.image})` }}
                                            initial={{ opacity: 0, scale: 1.1 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            transition={{ duration: 0.8 }}
                                            role="img"
                                            aria-label={slide.alt}
                                        />
                                    )
                                ))}
                            </AnimatePresence>

                            {/* Subtle overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

                            {/* Carousel Controls */}
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-white/20 backdrop-blur-md rounded-full px-4 py-2">
                                {slides.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => onDotClick(index)}
                                        className={cn(
                                            "w-2 h-2 rounded-full transition-all duration-300",
                                            index === currentSlide
                                                ? "bg-white w-8"
                                                : "bg-white/60 hover:bg-white/80"
                                        )}
                                        aria-label={`Go to slide ${index + 1}`}
                                        aria-current={index === currentSlide}
                                        suppressHydrationWarning={true}
                                    />
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 max-w-5xl mx-auto mt-12 sm:mt-16"
                >
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                            className="text-center p-4 rounded-2xl bg-white/40 backdrop-blur-sm border border-white/60 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                        >
                            <div className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
                                <CountUp
                                    end={stat.number}
                                    duration={2.5}
                                    suffix={stat.suffix}
                                    enableScrollSpy
                                    scrollSpyOnce
                                />
                            </div>
                            <div className="text-xs sm:text-sm lg:text-base text-gray-700 font-medium">
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2"
            >
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="flex flex-col items-center gap-2 cursor-pointer group"
                    role="button"
                    tabIndex={0}
                    aria-label="Scroll to explore content"
                    suppressHydrationWarning={true}
                >
                    <span className="text-xs sm:text-sm text-gray-700 font-medium group-hover:text-emerald-600 transition-colors">
                        Scroll to explore
                    </span>
                    <div className="p-2 rounded-full bg-white/40 backdrop-blur-sm border border-gray-300/50 group-hover:bg-emerald-50 group-hover:border-emerald-400 transition-all">
                        <ChevronDown className="w-5 h-5 text-gray-700 group-hover:text-emerald-600" />
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default HeroUI;
