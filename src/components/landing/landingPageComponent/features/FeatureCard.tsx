"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  feature: {
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    description: string;
    gradient: string;
    iconColor: string;
    secondaryIconColor: string;
    microfacts: { icon: React.ComponentType<{ className?: string }>; text: string }[];
    href: string;
    ariaLabel: string;
    relatedTopics: string[];
    stats: {
      satisfaction: string;
      travelers: string;
      support: string;
    };
  };
  index: number;
  prefersReducedMotion: boolean;
}

const FeatureCard = ({ feature, index, prefersReducedMotion }: FeatureCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.a
      href={feature.href}
      aria-label={feature.ariaLabel}
      initial={{
        opacity: 0,
        x: index % 2 === 0 ? -50 : 50,
        rotateY: -15
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        rotateY: 0
      }}
      viewport={{ once: true }}
      transition={{
        type: prefersReducedMotion ? "tween" : "spring",
        stiffness: prefersReducedMotion ? undefined : 120,
        duration: prefersReducedMotion ? 0.8 : undefined,
        delay: index * 0.15
      }}
      whileHover={{
        scale: 1.05,
        rotateY: 5,
        z: 50
      }}
      className={cn(
        "group relative rounded-2xl p-6 bg-gradient-to-br focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 block transform-gpu",
        feature.gradient,
        "shadow-lg hover:shadow-2xl",
        "min-h-[380px]",
        "border border-white/10 hover:border-emerald-400/60",
        "hover:bg-gradient-to-br hover:from-emerald-100 hover:to-teal-200 transition-all duration-500"
      )}
  onMouseEnter={() => setIsHovered(true)}
  onMouseLeave={() => setIsHovered(false)}
      onClick={() => console.log(`CTA clicked for ${feature.title}`)}
    >
      {/* Floating Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.2 + 0.5 }}
        className="absolute -top-3 -right-3 z-10"
      >
        <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
          {index + 1}
        </div>
      </motion.div>

      {/* Animated Border */}
      <motion.div
        className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 p-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        initial={{ rotate: 0 }}
        whileHover={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      >
        <div className="w-full h-full bg-white rounded-2xl" />
      </motion.div>

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      {/* Bottom Gradient Line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 to-teal-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

      {/* Icon */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        whileInView={{ scale: 1, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 200, delay: index * 0.1 + 0.2 }}
        className={cn(
          "w-14 h-14 rounded-full bg-white/90 backdrop-blur-sm border border-white/20 flex items-center justify-center mb-4 shadow-lg relative z-10 transition-all duration-300",
          feature.iconColor
        )}
      >
        <feature.icon className="w-7 h-7 transition-colors duration-300" />
        <div className={cn("absolute inset-0 rounded-full opacity-20 transition-opacity duration-300", feature.secondaryIconColor)} />
      </motion.div>

      {/* Content */}
      <div className="relative z-10">
        <h3 className="text-lg font-medium text-gray-900 mb-2 group-hover:text-gray-800 transition-colors font-display">
          {feature.title}
        </h3>
        <p className="text-gray-600 group-hover:text-gray-700 transition-colors leading-[1.5] text-sm mb-4">
          {feature.description}
        </p>
      </div>

      {/* Additional Content - Appears on Hover */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            key="hover-content"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden mb-4 relative z-10"
          >
            {/* Microfacts Row */}
            <div className="flex flex-wrap gap-2 mb-4">
              {feature.microfacts.map((fact, factIndex) => (
                <motion.div
                  key={factIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: factIndex * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                  className="text-xs text-gray-500 bg-gray-100/50 px-2 py-1 rounded-full border border-gray-200/50 hover:bg-gray-200/50 transition-colors"
                >
                  <span>{fact.text}</span>
                </motion.div>
              ))}
            </div>

            {/* Stats Row */}
            <div className="flex justify-between items-center mb-3 p-2 bg-gray-50/50 rounded-lg border border-gray-200/30">
              <div className="text-center">
                <div className="text-sm font-bold text-emerald-600">{feature.stats.satisfaction}</div>
                <div className="text-xs text-gray-500">Satisfaction</div>
              </div>
              <div className="text-center">
                <div className="text-sm font-bold text-emerald-600">{feature.stats.travelers}</div>
                <div className="text-xs text-gray-500">Travelers</div>
              </div>
              <div className="text-center">
                <div className="text-sm font-bold text-emerald-600">{feature.stats.support}</div>
                <div className="text-xs text-gray-500">Support</div>
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

      {/* Compact CTA */}
      <div className="flex items-center justify-between opacity-100 transition-opacity duration-300 relative z-10 mt-auto">
        <span className="text-sm font-medium text-emerald-600">Learn more</span>
      </div>
    </motion.a>
  );
};

export default FeatureCard;
