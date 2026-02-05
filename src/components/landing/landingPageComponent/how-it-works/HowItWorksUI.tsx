"use client";

import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMemo } from "react";
import { useIsClient } from "@/hooks/useIsClient";
import { showProductionNotification } from "@/components/shared/ProductionNotification";

interface Step {
  number: number;
  icon: typeof Search;
  title: string;
  description: string;
  gradient: string;
  color: string;
}

interface HowItWorksUIProps {
  steps: Step[];
}

/* ---------------- Animation Variants ---------------- */

const ANIMATION_VARIANTS = {
  title: {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: "easeOut" }
    }
  },
  step: {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" }
    }
  },
  stepCard: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, delay: 0.2 }
    }
  },
  stepIcon: {
    hidden: { scale: 0 },
    visible: {
      scale: 1,
      transition: { duration: 0.5, delay: 0.3 }
    }
  },
  cta: {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, delay: 0.5, ease: "easeOut" }
    }
  }
} as const;

/* ---------------- Step Card ---------------- */

interface StepCardProps {
  step: Step;
  index: number;
}

const StepCard = ({ step, index }: StepCardProps) => {
  const Icon = step.icon;
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={ANIMATION_VARIANTS.step}
      className={cn("relative flex w-full", isLeft ? "justify-start" : "justify-end")}
    >
      <motion.div
        variants={ANIMATION_VARIANTS.stepCard}
        className={cn(
          "bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-100 max-w-md",
          isLeft ? "ml-16" : "mr-16"
        )}
      >
        <motion.div
          variants={ANIMATION_VARIANTS.stepIcon}
          className={cn(
            "w-12 h-12 rounded-full bg-gradient-to-r flex items-center justify-center mb-6",
            step.gradient
          )}
        >
          <Icon className="w-6 h-6 text-white" />
        </motion.div>

        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          {step.title}
        </h3>

        <p className="text-sm text-gray-700 leading-relaxed">
          {step.description}
        </p>

        <div className="mt-6 flex items-center gap-2">
          <span className={cn("w-2 h-2 rounded-full bg-gradient-to-r", step.gradient)} />
          <span className="text-sm text-gray-600">Step {step.number}</span>
        </div>
      </motion.div>
    </motion.div>
  );
};

/* ---------------- Main Component ---------------- */

const HowItWorksUI = ({ steps }: HowItWorksUIProps) => {
  const isClient = useIsClient();
  const memoizedSteps = useMemo(() => steps, [steps]);

  return (
    <section className="py-4 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 overflow-hidden">
      <div className="container mx-auto px-4">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
          className="flex justify-center mb-10"
        >
          <div className="rounded-full px-6 py-1 bg-emerald-500/20 border border-emerald-400/40">
            <span className="text-emerald-700 font-semibold uppercase text-sm">
              How It Works
            </span>
          </div>
        </motion.div>

        {/* Title */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={ANIMATION_VARIANTS.title}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
            Your Journey in 4 Simple Steps
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto mt-4">
            From planning to memories, we make every step seamless.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative flex flex-col items-center">
          <div className="absolute left-1/2 -translate-x-1/2 h-full w-2 bg-gradient-to-b from-emerald-400 to-orange-500 rounded-full" />
          <div className="flex flex-col gap-10 w-full max-w-4xl">
            {memoizedSteps.map((step, index) => (
              <StepCard key={step.number} step={step} index={index} />
            ))}
          </div>
        </div>

        {/* CTA */}
        {isClient && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={ANIMATION_VARIANTS.cta}
            className="text-center mt-24"
          >
            <button 
              onClick={showProductionNotification}
              className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-full font-semibold shadow-lg hover:scale-105 transition">
              Start Planning Your Trip
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default HowItWorksUI;
