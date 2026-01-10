'use client';

import { motion } from "framer-motion";
import { Check, ArrowRight, MapPin, Users, Award, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface Stat {
    icon: typeof MapPin;
    number: string;
    label: string;
    color: string;
}

interface CTAUIProps {
    benefits: string[];
    stats: Stat[];
}

const CTAUI = ({ benefits, stats }: CTAUIProps) => {
    return (
        <section className="py-4 md:py-10 bg-gradient-to-br from-slate-50 via-white to-emerald-50/30 text-gray-900 relative overflow-hidden">
            {/* Enhanced Background Effects */}
            <div className="absolute inset-0">
                {/* Animated gradient orbs */}
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-10 right-10 w-96 h-96 bg-gradient-to-br from-emerald-400/20 to-teal-400/20 rounded-full blur-3xl" />
                <motion.div
                    animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-gradient-to-tr from-blue-400/15 to-purple-400/15 rounded-full blur-3xl" />

                {/* Grid pattern overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="max-w-7xl mx-auto">
                    {/* Enhanced Badge */}
                    <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
                    className="flex justify-center mb-10"
                >
                    <div className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-emerald-500/20 via-teal-500/20 to-cyan-500/20 border-2 border-emerald-400/30 px-6 py-1 backdrop-blur-sm hover:border-emerald-400/50 transition-all duration-300 shadow-lg hover:shadow-emerald-200/50">
                                                   <Sparkles className="w-4 h-4 text-emerald-500 animate-pulse" />
                        <span className="text-emerald-700 font-semibold tracking-wide text-sm uppercase">
                                Ready to Explore Bangladesh
                            </span>
                        </div>
                    </motion.div>

                    {/* Content Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        {/* Left Content */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="space-y-8"
                        >
                            {/* Title */}
                            <motion.h2
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                                className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight bg-gradient-to-r from-gray-900 via-emerald-800 to-teal-800 bg-clip-text text-transparent"
                            >
                                Start Your Bangladesh Adventure Today
                            </motion.h2>

                            {/* Description */}
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.6 }}
                                className="text-base md:text-lg text-gray-600 leading-relaxed"
                            >
                                Join thousands of travelers who have discovered the magic of Bangladesh through our carefully curated experiences. From the Sundarbans to the Himalayas, let us guide you through an unforgettable journey.
                            </motion.p>

                            {/* Benefits List */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.8 }}
                                className="space-y-4"
                            >
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {benefits.map((benefit, index) => (
                                        <motion.li
                                            key={index}
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                                            className="flex items-start gap-3 group"
                                        >
                                            <div className="mt-0.5 p-1 rounded-full bg-emerald-100 group-hover:bg-emerald-200 transition-colors duration-300">
                                                <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                                            </div>
                                            <span className="text-sm md:text-base text-gray-700 group-hover:text-gray-900 transition-colors duration-300">
                                                {benefit}
                                            </span>
                                        </motion.li>
                                    ))}
                                </ul>
                            </motion.div>

                            {/* CTA Button */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 1.4 }}
                                className="pt-4"
                            >
                                <button className="group relative px-8 py-4 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 rounded-full font-semibold text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 inline-flex items-center gap-2 cursor-pointer overflow-hidden" suppressHydrationWarning={true}>
                                    {/* Animated shine effect */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                    <span className="relative z-10">Plan Your Trip Now</span>
                                    <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
                                </button>

                                <p className="text-xs text-gray-500 mt-3 ml-2">
                                    ✨ No credit card required • Free consultation
                                </p>
                            </motion.div>
                        </motion.div>

                        {/* Right Content - Enhanced Stats Grid */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="grid grid-cols-1 gap-6"
                        >
                            {stats.map((stat, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                                    whileHover={{ scale: 1.02, y: -5 }}
                                    className="group relative"
                                >
                                    {/* Card */}
                                    <div className={cn(
                                        "relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/50 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden",
                                        "before:absolute before:inset-0 before:rounded-2xl before:p-[2px] before:bg-gradient-to-r before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500",
                                        stat.color === "emerald" && "before:from-emerald-400 before:via-teal-400 before:to-emerald-500",
                                        stat.color === "blue" && "before:from-blue-400 before:via-cyan-400 before:to-blue-500",
                                        stat.color === "purple" && "before:from-purple-400 before:via-fuchsia-400 before:to-purple-500"
                                    )}>
                                        {/* Glow effect on hover */}
                                        <div className={cn(
                                            "absolute inset-0 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500 -z-10",
                                            stat.color === "emerald" && "bg-emerald-400/20",
                                            stat.color === "blue" && "bg-blue-400/20",
                                            stat.color === "purple" && "bg-purple-400/20"
                                        )} />

                                        <div className="relative z-10 flex items-center gap-6">
                                            {/* Icon */}
                                            <motion.div
                                                initial={{ scale: 0, rotate: -180 }}
                                                whileInView={{ scale: 1, rotate: 0 }}
                                                viewport={{ once: true }}
                                                transition={{
                                                    type: "spring",
                                                    stiffness: 200,
                                                    damping: 15,
                                                    delay: 0.7 + index * 0.1
                                                }}
                                                whileHover={{ rotate: 5, scale: 1.1 }}
                                                className={cn(
                                                    "w-16 h-16 rounded-2xl bg-gradient-to-br flex items-center justify-center shadow-xl transition-all duration-300 flex-shrink-0",
                                                    stat.color === "emerald" && "from-emerald-400 to-teal-600 group-hover:shadow-emerald-400/50",
                                                    stat.color === "blue" && "from-blue-400 to-cyan-600 group-hover:shadow-blue-400/50",
                                                    stat.color === "purple" && "from-purple-400 to-fuchsia-600 group-hover:shadow-purple-400/50"
                                                )}
                                            >
                                                <stat.icon className="w-8 h-8 text-white" />
                                            </motion.div>

                                            {/* Content */}
                                            <div className="flex-1">
                                                <motion.div
                                                    className={cn(
                                                        "text-4xl md:text-5xl font-bold mb-1 bg-gradient-to-r bg-clip-text text-transparent transition-all duration-300",
                                                        stat.color === "emerald" && "from-emerald-600 to-teal-600",
                                                        stat.color === "blue" && "from-blue-600 to-cyan-600",
                                                        stat.color === "purple" && "from-purple-600 to-fuchsia-600"
                                                    )}
                                                    whileHover={{ scale: 1.05 }}
                                                >
                                                    {stat.number}
                                                </motion.div>
                                                <div className="text-gray-600 text-sm font-medium group-hover:text-gray-900 transition-colors duration-300">
                                                    {stat.label}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CTAUI;
