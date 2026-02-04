'use client';

import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import PopularDestinationsCarousel from "./PopularDestinationsCarousel";
import { useRouter } from "next/navigation";

interface MostPopularDestinationsUIProps {
    title: string;
    subtitle: string;
    buttonText: string;
    destinations: any[];
}

const MostPopularDestinationsUI = ({ title, subtitle, buttonText, destinations }: MostPopularDestinationsUIProps) => {
    const router = useRouter();
    
    return (
        <section className="py-4 bg-gradient-to-br from-white to-gray-50">
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
                        <span className="text-emerald-700 font-semibold tracking-wide text-sm uppercase">Most Popular</span>
                    </div>
                </motion.div>

                {/* Section Title */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        {title}
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        {subtitle}
                    </p>
                </motion.div>

                {/* Images carousel */}
                <PopularDestinationsCarousel destinations={destinations} />
                {/* CTA Button */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="text-center mt-12"
                >
                    <Button
                        size="lg"
                        className="group inline-flex items-center gap-2 px-8 py-6 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 rounded-full font-semibold text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95"
                        onClick={() => router.push('/most-popular-destinations')}
                        suppressHydrationWarning={true}
                    >
                        {buttonText}
                    </Button>
                </motion.div>
            </div>
        </section>
    );
};

export default MostPopularDestinationsUI;
