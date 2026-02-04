'use client';

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import FeatureCard from "@/components/landing/landingPageComponent/features/FeatureCard";
import { MapPin, Users, Award, Shield, Clock, Calendar, Users2, DollarSign } from "lucide-react";

interface Feature {
    icon: string;
    title: string;
    description: string;
    gradient: string;
    iconColor: string;
    secondaryIconColor: string;
    microfacts: {
        icon: string;
        text: string;
    }[];
    href: string;
    ariaLabel: string;
    relatedTopics: string[];
    stats: {
        satisfaction: string;
        travelers: string;
        support: string;
    };
}



interface FeaturesUIProps {
    features: Feature[];
}

const FeaturesUI = ({ features }: FeaturesUIProps) => {
    const gridRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(gridRef, { once: true });
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setPrefersReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
        }
    }, []);

    // Analytics hooks
    useEffect(() => {
        if (isInView) {
            features.forEach((_, index) => {
                // Fire impression event
                console.log(`Feature card ${index} viewed`);
            });
        }
    }, [isInView, features]);

    // Map icon names back to components
    const getIconComponent = (iconName: string) => {
        switch (iconName) {
            case 'MapPin': return MapPin;
            case 'Users': return Users;
            case 'Award': return Award;
            case 'Shield': return Shield;
            case 'Clock': return Clock;
            case 'Calendar': return Calendar;
            case 'Users2': return Users2;
            case 'DollarSign': return DollarSign;
            default: return MapPin;
        }
    };

    // Transform features back to include icon components
    const transformedFeatures = features.map(feature => ({
        ...feature,
        icon: getIconComponent(feature.icon),
        microfacts: feature.microfacts.map(microfact => ({
            ...microfact,
            icon: getIconComponent(microfact.icon),
        })),
    }));

    return (
        <section className="py-4 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 text-gray-900 relative overflow-hidden">
            <div className="container mx-auto px-4">
                {/* Section Badge */}
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
                            <span className="text-emerald-700 font-semibold tracking-wide text-sm uppercase">Why Choose Us</span>
                        </div>
                    </motion.div>
                </div>

                {/* Section Title */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight mb-6 bg-gradient-to-r from-gray-900 via-emerald-800 to-teal-800 bg-clip-text text-transparent">
                        Partner with BD Travel Spirit&apos;s
                    </h2>
                    <p className="text-lg text-gray-800 max-w-2xl mx-auto">
                        Join thousands of travelers who trust us to create unforgettable experiences across Bangladesh's diverse landscapes and cultures.
                    </p>
                </motion.div>

                {/* Features Grid */}
                <div
                    ref={gridRef}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 relative px-4 md:px-8"
                    style={{ aspectRatio: 'auto' }}
                >
                    {/* Texture Accent */}
                    <div className="absolute inset-0 opacity-5 pointer-events-none">
                        <div className="w-full h-full bg-gradient-to-br from-transparent via-gray-200 to-transparent transform rotate-12 scale-150" />
                    </div>

                    {transformedFeatures.map((feature, index) => (
                        <FeatureCard
                            key={index}
                            feature={feature}
                            index={index}
                            prefersReducedMotion={prefersReducedMotion}
                        />
                    ))}

                    {/* Peek Affordance */}

                </div>

                {/* Stats Section */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="mt-20 grid grid-cols-2 md:grid-cols-3 gap-8 text-center"
                >
                    <div className="glass rounded-2xl p-8">
                        <div className="text-4xl font-bold heading-gradient mb-2">50%</div>
                        <div className="text-gray-700">Satisfaction Rate</div>
                    </div>
                    <div className="glass rounded-2xl p-8">
                        <div className="text-4xl font-bold heading-gradient mb-2">10+</div>
                        <div className="text-gray-700">Happy Travelers</div>
                    </div>
                    <div className="glass rounded-2xl p-8 md:col-span-1 col-span-2">
                        <div className="text-4xl font-bold heading-gradient mb-2">24/7</div>
                        <div className="text-gray-700">Support Available</div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default FeaturesUI;
