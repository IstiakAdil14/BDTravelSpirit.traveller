'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import Sidebar from './Sidebar';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  travellerId?: string;
}

export function MobileDrawer({ isOpen, onClose, travellerId }: MobileDrawerProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50 lg:hidden"
          />
          
          <motion.div
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed left-0 top-0 h-full w-70 bg-white z-50 lg:hidden"
          >
            <div className="p-4 border-b border-slate-200">
              <button
                onClick={onClose}
                className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="h-full overflow-y-auto">
              <Sidebar />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}