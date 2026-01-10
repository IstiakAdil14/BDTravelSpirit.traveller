'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';

interface SignOutDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SignOutDialog({ isOpen, onClose }: SignOutDialogProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleConfirmSignOut = async () => {
    await signOut({ callbackUrl: '/' });
    onClose();
  };

  if (!mounted || typeof window === 'undefined') {
    return null;
  }

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Full Screen Backdrop with enhanced blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-md z-[9999]"
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              width: '100vw',
              height: '100vh',
            }}
          />

          {/* Dialog Container - Full Screen */}
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              width: '100vw',
              height: '100vh',
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 8 }}
              transition={{ 
                type: 'spring', 
                duration: 0.4,
                bounce: 0.3
              }}
              className="relative bg-white rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] max-w-md w-full overflow-hidden border border-gray-100"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Subtle gradient accent */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-200 to-transparent" />

              {/* Content */}
              <div className="p-8">
                {/* Icon with subtle animation */}
                <div className="flex justify-center mb-6">
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ 
                      delay: 0.1, 
                      type: 'spring',
                      stiffness: 200,
                      damping: 15
                    }}
                    className="relative"
                  >
                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-red-500/20 rounded-full blur-xl" />
                    <div className="relative w-14 h-14 bg-gradient-to-br from-red-50 to-red-100 rounded-2xl flex items-center justify-center border border-red-200/50 shadow-sm">
                      <LogOut className="w-6 h-6 text-red-600" />
                    </div>
                  </motion.div>
                </div>

                {/* Title with better typography */}
                <h3 className="text-2xl font-semibold text-gray-900 text-center mb-3 tracking-tight">
                  Sign out of your account?
                </h3>

                {/* Message with improved readability */}
                <p className="text-gray-500 text-center mb-8 text-[15px] leading-relaxed">
                  You'll be redirected to the home page and will need to sign in again to access your account.
                </p>

                {/* Buttons with refined styling */}
                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={onClose}
                    className="flex-1 px-4 py-2.5 bg-white hover:bg-gray-50 text-gray-700 font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-offset-2 border border-gray-200 shadow-sm"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={handleConfirmSignOut}
                    className="flex-1 px-4 py-2.5 bg-gray-900 hover:bg-black text-white font-medium rounded-xl shadow-sm hover:shadow transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 flex items-center justify-center gap-2"
                  >
                    Sign out
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}