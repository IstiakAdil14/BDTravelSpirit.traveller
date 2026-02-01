'use client';

import { motion, MotionValue } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Logo from '@/components/shared/Logo';
import SearchBar from './SearchBar';
import UtilityIcons from './UtilityIcons';
import MobileNav from './MobileNav';
import TopInfoBar from './TopInfoBar';
import QuickLinks from './QuickLinks';
const AccountMenu = dynamic(() => import('./AccountMenu'), { ssr: false });

interface HeaderUIProps {
    isHidden: boolean;
    isMobileMenuOpen: boolean;
    onToggleMobileMenu: () => void;
    scrollYProgress: MotionValue<number>;
}

export default function HeaderUI({
    isHidden,
    isMobileMenuOpen,
    onToggleMobileMenu,
    scrollYProgress,
}: HeaderUIProps) {
    const { status } = useSession();
    const [windowWidth, setWindowWidth] = useState(0);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <>
            <motion.header
                variants={{
                    visible: { y: 0 },
                    hidden: { y: "-100%" },
                }}
                animate={isHidden ? "hidden" : "visible"}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-b border-gray-100/10 shadow-sm"
            >
                <TopInfoBar />

                {/* Progress Bar */}
                <motion.div
                    className="h-0.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 origin-left"
                    style={{ scaleX: scrollYProgress }}
                />

                <div className="container mx-auto px-4 py-1">
                    <div className="flex items-center justify-between ml-4">
                        {/* Logo */}
                        <Logo size="md" showDescription={false} />

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center space-x-8 flex-1 max-w-2xl">
                            <SearchBar className="flex-1" />
                        </div>

                        {/* Right Side Controls */}
                        <div className="hidden lg:flex items-center space-x-4 mr-4">
                            {status === 'authenticated' && <UtilityIcons />}
                            <AccountMenu />
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={onToggleMobileMenu}
                            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                            aria-label="Open mobile menu"
                            suppressHydrationWarning={true}
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>

                    {/* Mobile Search Bar */}
                    <div className="lg:hidden mt-4">
                        <SearchBar />
                    </div>
                </div>
                {windowWidth >= 525 && <QuickLinks />}

            </motion.header>

            {/* Mobile Navigation Overlay */}
            <MobileNav isOpen={isMobileMenuOpen} onClose={() => onToggleMobileMenu()} />
        </>
    );
}
