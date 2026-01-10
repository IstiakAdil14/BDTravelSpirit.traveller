'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Heart, ShoppingCart, Settings, LogOut, ChevronRight } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Logo from '@/components/shared/Logo';
import PageNavigation from './PageNavigation';
import Link from 'next/link';
import Image from 'next/image';
import SignOutDialog from './SignOutDialog';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}


export default function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const [userType, setUserType] = useState<'traveler' | 'guide'>('traveler');
  const [showSignOutDialog, setShowSignOutDialog] = useState(false);
  const { data: session, status } = useSession();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 lg:hidden"
            />

            {/* Mobile Menu */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-sm bg-gradient-to-b from-white to-gray-50 shadow-2xl z-50 lg:hidden overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-5 bg-white border-b border-gray-100 shadow-sm">
                <Logo size="sm" showDescription={false} />
                <button
                  onClick={onClose}
                  className="p-2.5 rounded-xl hover:bg-gray-100 transition-all hover:rotate-90 duration-300"
                  aria-label="Close mobile menu"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              {/* Menu Items */}
              <div className="flex-1 overflow-y-auto py-6 px-4">
                <nav>
                  {/* Page Navigation */}
                  <div className="bg-white rounded-2xl shadow-sm p-4 border border-gray-100">
                    <PageNavigation orientation="vertical" />
                  </div>
                </nav>

                {/* Auth Section */}
                <div className="mt-6">
                  {/* Header */}
                  <div className="mb-4 px-2">
                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">My Account</h3>
                  </div>

                  {/* Toggle - Only show when not authenticated */}
                  {status !== 'authenticated' && (
                    <div className="flex justify-center mb-6">
                      <div className="bg-white rounded-2xl flex p-1.5 shadow-sm border border-gray-100">
                        <button
                          onClick={() => setUserType('traveler')}
                          className={`px-6 py-2.5 text-sm font-semibold rounded-xl transition-all duration-300 ${
                            userType === 'traveler'
                              ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md shadow-emerald-200'
                              : 'text-gray-600 hover:text-gray-900'
                          }`}
                        >
                          Traveler
                        </button>
                        <button
                          onClick={() => setUserType('guide')}
                          className={`px-6 py-2.5 text-sm font-semibold rounded-xl transition-all duration-300 ${
                            userType === 'guide'
                              ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md shadow-emerald-200'
                              : 'text-gray-600 hover:text-gray-900'
                          }`}
                        >
                          Guide
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Conditional content */}
                  <div className="space-y-3">
                    {status === 'authenticated' && session?.user ? (
                      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        {/* User Info */}
                        <div className="px-5 py-4 bg-gradient-to-r from-emerald-50 to-teal-50 border-b border-gray-100">
                          <div className="flex items-center space-x-4">
                            {session.user.image ? (
                              <Image
                                src={session.user.image}
                                alt={session.user.name || 'User'}
                                width={48}
                                height={48}
                                className="w-12 h-12 rounded-full ring-2 ring-white shadow-md"
                              />
                            ) : (
                              <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center ring-2 ring-white shadow-md">
                                <User className="w-6 h-6 text-white" />
                              </div>
                            )}
                            <div className="flex-1">
                              <h3 className="text-sm font-bold text-gray-900">
                                {session.user.name}
                              </h3>
                              <p className="text-xs text-gray-600 mt-0.5">{session.user.email}</p>
                            </div>
                          </div>
                        </div>

                        {/* Menu Items */}
                        <div className="p-3">
                          <button className="w-full group flex items-center justify-between px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-xl transition-all cursor-pointer">
                            <div className="flex items-center space-x-3">
                              <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-emerald-50 transition-colors">
                                <Settings className="w-4 h-4 text-gray-600 group-hover:text-emerald-600 transition-colors" />
                              </div>
                              <span>Settings</span>
                            </div>
                            <ChevronRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
                          </button>
                          <button
                            onClick={() => setShowSignOutDialog(true)}
                            className="w-full group flex items-center justify-between px-4 py-3 text-sm font-medium text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all cursor-pointer mt-1"
                          >
                            <div className="flex items-center space-x-3">
                              <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-red-100 transition-colors">
                                <LogOut className="w-4 h-4 text-gray-600 group-hover:text-red-600 transition-colors" />
                              </div>
                              <span>Sign Out</span>
                            </div>
                            <ChevronRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                        {userType === 'traveler' ? (
                          <>
                            <Link href="/auth/login">
                              <button className="w-full group flex items-center justify-center space-x-2 px-5 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-bold hover:shadow-lg hover:shadow-emerald-200 transition-all hover:scale-[1.02] cursor-pointer">
                                <User className="w-5 h-5" />
                                <span>Sign In</span>
                                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                              </button>
                            </Link>
                            <Link href="/auth/signup">
                              <button className="w-full mt-3 group flex items-center justify-center space-x-2 px-5 py-3.5 border-2 border-emerald-500 text-emerald-600 rounded-xl font-bold hover:bg-emerald-50 transition-all hover:scale-[1.02] cursor-pointer">
                                <span>Sign Up</span>
                                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                              </button>
                            </Link>
                          </>
                        ) : (
                          <>
                            <div className="mb-5 px-3 py-4 bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl border border-blue-100">
                              <p className="text-sm text-gray-700 leading-relaxed">
                                Sign up for free and earn commission on every booking by{' '}
                                <Link href="#" className="text-emerald-600 font-semibold hover:underline">
                                  registering
                                </Link>{' '}
                                as an accredited BD Travel Spirit guide.
                              </p>
                            </div>
                            <Link href="/auth/login">
                              <button className="w-full group flex items-center justify-center space-x-2 px-5 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-bold hover:shadow-lg hover:shadow-emerald-200 transition-all hover:scale-[1.02] cursor-pointer">
                                <User className="w-5 h-5" />
                                <span>Sign In</span>
                                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                              </button>
                            </Link>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Sign Out Dialog Component */}
      <SignOutDialog isOpen={showSignOutDialog} onClose={() => setShowSignOutDialog(false)} />
    </>
  );
}