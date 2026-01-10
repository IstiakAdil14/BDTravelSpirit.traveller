'use client';

import { motion } from "framer-motion";
import { Award, Shield, Users, Star, ArrowRight, Sparkles, TrendingUp } from "lucide-react";
import { useMemo, useState } from "react";
import { useIsClient } from "@/hooks/useIsClient";
import Link from "next/link";

// Type definitions for type safety
interface TourOperator {
    id: number;
    name: string;
    logo: string;
    rating: number;
    reviews: number;
    specialties: string[];
    certified: boolean;
    experience: string;
}

// Animation variants for consistent animations
const ANIMATION_VARIANTS = {
    badge: {
        hidden: { opacity: 0, scale: 0.8, y: -20 },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                duration: 0.7,
                type: "spring",
                bounce: 0.4
            }
        }
    },
    title: {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.9,
                ease: [0.22, 1, 0.36, 1]
            }
        }
    },
    card: {
        hidden: { opacity: 0, y: 60, scale: 0.95 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.7,
                ease: "easeOut"
            }
        }
    },
    cta: {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.9,
                delay: 0.5,
                ease: [0.22, 1, 0.36, 1]
            }
        }
    }
} as const;

interface TravelWithBestTourOperatorsUIProps {
    operators: TourOperator[];
    showAll?: boolean;
    hideCTA?: boolean;
}

/**
 * StarRating Component - Premium rating display with animations
 */
interface StarRatingProps {
    rating: number;
    reviews: number;
}

const StarRating = ({ rating, reviews }: StarRatingProps) => {
    const stars = useMemo(() => Array.from({ length: 5 }, (_, i) => i), []);

    return (
        <div className="flex items-center gap-2.5">
            <div className="flex items-center gap-0.5" aria-label={`Rating: ${rating} out of 5`}>
                {stars.map((i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.05, duration: 0.3 }}
                    >
                        <Star
                            className={`w-4 h-4 transition-all duration-300 ${i < Math.floor(rating)
                                    ? 'text-yellow-400 fill-yellow-400 drop-shadow-sm'
                                    : 'text-gray-300'
                                }`}
                            aria-hidden="true"
                        />
                    </motion.div>
                ))}
            </div>
            <span className="text-sm font-semibold text-gray-700">
                {rating} <span className="text-gray-400 font-normal">({reviews.toLocaleString()})</span>
            </span>
        </div>
    );
};

/**
 * OperatorCard Component - Premium card with glassmorphism and advanced animations
 */
interface OperatorCardProps {
    operator: TourOperator;
    index: number;
}

const OperatorCard = ({ operator, index }: OperatorCardProps) => {
    const [logoError, setLogoError] = useState(false);
    const displayName = operator.name.length > 24
        ? `${operator.name.substring(0, 24)}...`
        : operator.name;

    return (
        <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-gray-200/50 overflow-hidden group h-40"
        >
            <div className="flex h-full relative">
                {/* Left Side - Icon Area */}
                <div className="w-[35%] relative bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center overflow-hidden">
                    {/* Subtle background pattern */}
                    <div className="absolute inset-0 opacity-20">
                        <div className="absolute top-0 left-0 w-20 h-20 bg-emerald-400/20 rounded-full blur-2xl" />
                        <div className="absolute bottom-0 right-0 w-24 h-24 bg-teal-400/20 rounded-full blur-2xl" />
                    </div>

                    {/* Logo or Icon */}
                    <div className="relative">
                        {operator.logo && !logoError ? (
                            <img
                                src={operator.logo}
                                alt={`${operator.name} logo`}
                                className="w-14 h-14 object-contain drop-shadow-lg group-hover:scale-105 transition-transform duration-300"
                                onError={() => setLogoError(true)}
                            />
                        ) : (
                            <Award className="w-14 h-14 text-emerald-600 drop-shadow-lg group-hover:scale-105 transition-transform duration-300" aria-hidden="true" />
                        )}
                    </div>
                </div>

                {/* Right Side - Content */}
                <div className="w-[65%] p-6 flex flex-col justify-between">
                    {/* Header */}
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors duration-200 line-clamp-1" title={operator.name}>
                            {displayName}
                        </h3>

                        {/* Rating */}
                        <StarRating rating={operator.rating} reviews={operator.reviews} />
                    </div>

                    {/* Specialties */}
                    <div className="flex flex-wrap gap-2 my-4">
                        {operator.specialties.slice(0, 2).map((specialty, idx) => (
                            <span
                                key={idx}
                                className="px-3 py-1.5 bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 text-xs font-semibold rounded-full border border-emerald-200/50"
                            >
                                {specialty}
                            </span>
                        ))}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-start gap-4 text-xs pt-4 border-t border-gray-200/60">
                        {operator.certified && (
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 rounded-full border border-green-200/50">
                                <Shield className="w-4 h-4 text-green-600" aria-hidden="true" />
                                <span className="font-semibold text-green-700">Certified</span>
                            </div>
                        )}
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 rounded-full border border-emerald-200/50">
                            <Users className="w-4 h-4 text-emerald-600" aria-hidden="true" />
                            <span className="font-semibold text-emerald-700">{operator.experience}</span>
                        </div>
                    </div>
                </div>
            </div>
        </motion.article>
    );
};

/**
 * SectionBadge Component - Premium animated badge
 */
const SectionBadge = ({ children }: { children: React.ReactNode }) => (
     <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
                        className="flex justify-center mb-10"
                    >
                        <div className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-emerald-500/20 via-teal-500/20 to-cyan-500/20 border-2 border-emerald-400/30 px-6 py-1 backdrop-blur-sm hover:border-emerald-400/50 transition-all duration-300 shadow-lg hover:shadow-emerald-200/50">
                            <span className="text-emerald-700 font-semibold tracking-wide text-sm uppercase">{children}</span>
            <TrendingUp className="w-4 h-4 text-emerald-600 relative z-10" />
        </div>
    </motion.div>
);

/**
 * Main TravelWithBestTourOperators Component - Premium Design
 */
const TravelWithBestTourOperatorsUI = ({ operators, showAll = false, hideCTA = false }: TravelWithBestTourOperatorsUIProps) => {
    const isClient = useIsClient();

    return (
        <section
            className="relative py-20 overflow-hidden"
            aria-labelledby="tour-operators-heading"
        >
            {/* Premium gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-emerald-50/40 to-teal-50/60" />

            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-300/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-teal-300/20 rounded-full blur-3xl animate-pulse delay-1000" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-300/10 rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Section Badge */}
                <SectionBadge>Trusted Partners</SectionBadge>

                {/* Section Title with premium styling */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={ANIMATION_VARIANTS.title}
                    className="text-center mb-20"
                >
                    <h2
                        id="tour-operators-heading"
                        className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 mb-8 leading-tight tracking-tight"
                    >
                        Travel With The{" "}
                        <span className="relative inline-block">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 animate-gradient">
                                Best Tour Operators
                            </span>
                            {/* Underline decoration */}
                            <svg className="absolute -bottom-2 left-0 w-full" height="12" viewBox="0 0 300 12" fill="none">
                                <path d="M2 10C50 5 100 2 150 5C200 8 250 7 298 10" stroke="url(#gradient)" strokeWidth="3" strokeLinecap="round" />
                                <defs>
                                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#10b981" />
                                        <stop offset="50%" stopColor="#14b8a6" />
                                        <stop offset="100%" stopColor="#06b6d4" />
                                    </linearGradient>
                                </defs>
                            </svg>
                        </span>
                    </h2>
                    <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-light">
                        Partner with certified, experienced tour operators who know Bangladesh inside out.
                        <span className="block mt-2 text-emerald-600 font-medium">Your perfect journey starts with the right guide.</span>
                    </p>
                </motion.div>

                {/* Tour Operators Grid with enhanced spacing */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20 max-w-7xl mx-auto">
                    {(showAll ? operators : operators.slice(0, 6)).map((operator, index) => (
                        <OperatorCard
                            key={operator.id}
                            operator={operator}
                            index={index}
                        />
                    ))}
                </div>

                {/* Premium CTA Section */}
                {!hideCTA && (
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={ANIMATION_VARIANTS.cta}
                        className="text-center"
                    >
                        {/* Trust badges */}
                        <div className="flex items-center justify-center gap-8 mb-8 flex-wrap">
                            <div className="flex items-center gap-2 text-gray-600">
                                <Shield className="w-5 h-5 text-green-600" />
                                <span className="font-medium">Licensed & Insured</span>
                            </div>
                            <div className="w-1 h-1 bg-gray-300 rounded-full" />
                            <div className="flex items-center gap-2 text-gray-600">
                                <Sparkles className="w-5 h-5 text-emerald-600" />
                                <span className="font-medium">Sustainable Tourism</span>
                            </div>
                            <div className="w-1 h-1 bg-gray-300 rounded-full" />
                            <div className="flex items-center gap-2 text-gray-600">
                                <Award className="w-5 h-5 text-teal-600" />
                                <span className="font-medium">Award Winning</span>
                            </div>
                        </div>

                        {/* Premium CTA Button */}
                        {isClient && (
                            <Link href="/operators">
                                <motion.button
                                    whileHover={{
                                        scale: 1.05,
                                        boxShadow: "0 25px 50px rgba(16, 185, 129, 0.3)"
                                    }}
                                    whileTap={{ scale: 0.98 }}
                                    className="group relative px-10 py-3 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white font-bold text-lg rounded-full shadow-2xl transition-all duration-500 flex items-center gap-3 mx-auto overflow-hidden border border-emerald-400/20 focus:outline-none focus:ring-4 focus:ring-emerald-500/50 cursor-pointer"
                                    aria-label="View all tour operators"
                                >
                                    {/* Animated shine effect */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                                    <span className="relative z-10">View All Operators</span>
                                    <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300 relative z-10" />
                                </motion.button>
                            </Link>
                        )}
                    </motion.div>
                )}
            </div>
        </section>
    );
};

export default TravelWithBestTourOperatorsUI;
