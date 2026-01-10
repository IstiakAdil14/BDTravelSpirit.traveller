'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showDescription?: boolean;
  className?: string;
}

export default function Logo({
  size = 'md',
  showDescription = true,
  className = ''
}: LogoProps) {
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl'
  };

  const iconSizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  return (
    <Link href="/" className={`flex items-center gap-3 group ${className}`}>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative"
      >
        {/* Square Gradient Box Background */}
        <div className={`rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 p-0.5 ${iconSizeClasses[size]}`}>
          <div className="w-full h-full rounded-lg bg-teal-900 flex items-center justify-center">
            {/* BD Text */}
            <span className="text-white font-bold text-sm">BD</span>
          </div>
        </div>

        {/* Glow Effect */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-emerald-500/30 to-teal-600/30 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </motion.div>

      <div className="flex flex-col">
        {/* Main Title */}
        <motion.h1
          className={`font-bold bg-gradient-to-r from-slate-900 via-gray-800 to-slate-900 bg-clip-text text-transparent ${sizeClasses[size]} leading-tight`}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          BD Travel Spirit
        </motion.h1>

        {/* Professional Guides Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-400/20 px-2 py-0.5 mt-1 w-fit"
        >
          <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
          <span className="text-xs font-medium text-emerald-600 uppercase tracking-wide">Enjoy Travel</span>
        </motion.div>

        {/* Description 
        {showDescription && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xs text-gray-400 mt-1 leading-relaxed max-w-xs"
          >
            Your gateway to authentic Bangladesh travel experiences
          </motion.p>
        )}*/}
      </div>
    </Link>
  );
}
