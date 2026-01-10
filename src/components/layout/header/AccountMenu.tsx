'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, LogOut, Settings } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import SignOutDialog from './SignOutDialog';
import { useIsClient } from '@/hooks/useIsClient';

export default function AccountMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [showSignOutDialog, setShowSignOutDialog] = useState(false);
  const [userType, setUserType] = useState<'traveler' | 'guide'>('traveler');
  const menuRef = useRef<HTMLDivElement>(null);
  const { data: session, status } = useSession();
  const isClient = useIsClient();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignOutClick = () => {
    setShowSignOutDialog(true);
    setIsOpen(false);
  };

  const handleCloseDialog = () => {
    setShowSignOutDialog(false);
  };

  return (
    <div className="relative" ref={menuRef} onMouseLeave={() => setIsOpen(false)}>
      {/* Trigger Button */}
      {isClient ? (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onMouseEnter={() => setIsOpen(true)}
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-all cursor-pointer"
        >
          {session?.user?.image ? (
            <img
              src={session.user.image}
              alt={session.user.name || 'User'}
              className="w-5 h-5 rounded-full"
            />
          ) : (
            <User className="w-5 h-5 text-gray-600" />
          )}
          <span className="text-sm font-medium text-gray-700">
            {session?.user?.name || 'Account'}
          </span>
        </motion.button>
      ) : (
        <button
          onMouseEnter={() => setIsOpen(true)}
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-all cursor-pointer"
        >
          {session?.user?.image ? (
            <img
              src={session.user.image}
              alt={session.user.name || 'User'}
              className="w-5 h-5 rounded-full"
            />
          ) : (
            <User className="w-5 h-5 text-gray-600" />
          )}
          <span className="text-sm font-medium text-gray-700">
            {session?.user?.name || 'Account'}
          </span>
        </button>
      )}

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            onMouseEnter={() => setIsOpen(true)}
            className="absolute top-full right-0 mt-2 w-72 bg-white rounded-xl shadow-lg border border-gray-200 z-50 overflow-hidden"
          >
            {status === 'authenticated' && session?.user ? (
              <>
                {/* User Info */}
                <div className="px-4 py-3 border-b border-gray-200">
                  <div className="flex items-center space-x-3">
                    {session.user.image ? (
                      <Image
                        src={session.user.image}
                        alt={session.user.name || 'User'}
                        width={40}
                        height={40}
                        className="w-10 h-10 rounded-full"
                      />
                    ) : (
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-gray-600" />
                      </div>
                    )}
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900">
                        {session.user.name}
                      </h3>
                      <p className="text-xs text-gray-500">{session.user.email}</p>
                    </div>
                  </div>
                </div>

                {/* Menu Items */}
                <div className="p-2">
                  <button className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
                    <Settings className="w-4 h-4" />
                    <span>Settings</span>
                  </button>
                  <button
                    onClick={handleSignOutClick}
                    className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </>
            ) : (
              <>
                {/* Header */}
                <div className="px-4 py-3 border-b border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-900">My Account</h3>
                </div>

                {/* Toggle */}
                <div className="flex justify-center gap-0 mt-3 px-4">
                  <div className="bg-gray-100 rounded-full flex p-1">
                    <button
                      onClick={() => setUserType('traveler')}
                      className={`px-4 py-1.5 text-sm font-medium rounded-full transition-all ${userType === 'traveler'
                        ? 'bg-white shadow-sm text-gray-900'
                        : 'text-gray-500 hover:text-gray-700'
                        }`}
                    >
                      Traveler
                    </button>
                    <button
                      onClick={() => setUserType('guide')}
                      className={`px-4 py-1.5 text-sm font-medium rounded-full transition-all ${userType === 'guide'
                        ? 'bg-white shadow-sm text-gray-900'
                        : 'text-gray-500 hover:text-gray-700'
                        }`}
                    >
                      Guide
                    </button>
                  </div>
                </div>

                {/* Conditional content */}
                <div className="p-4 space-y-3 text-center">
                  {userType === 'traveler' ? (
                    <>
                      <Link href="/auth/login">
                        <button className="w-full px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-full transition-all">
                          Log in
                        </button>
                      </Link>
                      <Link href="/auth/signup">
                        <button className="w-full px-4 py-2 bg-blue-50 hover:bg-blue-100 text-teal-700 font-semibold rounded-full transition-all">
                          Sign Up
                        </button>
                      </Link>
                    </>
                  ) : (
                    <>
                      <p className="text-sm text-gray-600 px-2">
                        Sign up for free and earn commission on every booking by{' '}
                        <Link href="#" className="text-blue-600 font-medium hover:underline">
                          registering
                        </Link>{' '}
                        as an accredited BD Travel Spirit guide.
                      </p>
                      <Link href="/auth/login">
                        <button className="w-full px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-full transition-all">
                          Log in
                        </button>
                      </Link>
                    </>
                  )}
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sign Out Dialog Component */}
      <SignOutDialog isOpen={showSignOutDialog} onClose={handleCloseDialog} />
    </div>
  );
}
