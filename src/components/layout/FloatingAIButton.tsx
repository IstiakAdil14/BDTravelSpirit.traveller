"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function FloatingAIButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Button */}
      <motion.div
        className="fixed bottom-24 lg:bottom-8 right-6 z-50"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 1, duration: 0.5, ease: "easeOut" }}
      >
        <motion.div
          animate={{ 
            y: [0, -8, 0],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Button
            onClick={() => setIsOpen(true)}
            className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 shadow-2xl hover:shadow-purple-500/25 transition-all duration-300"
          >
            <Sparkles className="w-6 h-6 text-white" />
          </Button>
        </motion.div>
      </motion.div>

      {/* AI Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 z-50"
              onClick={() => setIsOpen(false)}
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 100 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 100 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="fixed bottom-4 right-4 w-80 h-96 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 z-50"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">AI Travel Assistant</h3>
                    <p className="text-xs text-gray-500">Your personal trip planner</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 p-0"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              {/* Chat Area */}
              <div className="flex-1 p-4 space-y-4">
                <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-3">
                  <p className="text-sm text-gray-700">
                    👋 Hi! I'm your AI travel assistant. I can help you:
                  </p>
                  <ul className="text-xs text-gray-600 mt-2 space-y-1">
                    <li>• Plan your next trip</li>
                    <li>• Find destinations</li>
                    <li>• Suggest activities</li>
                    <li>• Answer travel questions</li>
                  </ul>
                </div>
                
                <div className="text-center text-gray-400 text-sm">
                  Start typing to chat with AI...
                </div>
              </div>

              {/* Input */}
              <div className="p-4 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Ask me anything about travel..."
                    className="flex-1 px-3 py-2 bg-gray-50 rounded-lg border-0 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                  />
                  <Button size="sm" className="bg-gradient-to-r from-purple-500 to-indigo-600">
                    <MessageCircle className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}