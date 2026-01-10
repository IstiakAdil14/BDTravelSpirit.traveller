"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Info, Mail } from 'lucide-react';

interface PageNavigationProps {
    orientation?: 'horizontal' | 'vertical';
}

const PageNavigation = ({ orientation = 'horizontal' }: PageNavigationProps) => {
    const pathname = usePathname();
    
    const navClass = orientation === 'vertical'
        ? 'w-full flex flex-col space-y-4'
        : 'w-full flex justify-center space-x-6';

    return (
        <nav className={navClass}>
            <Link 
                href="/" 
                className={`relative transition-all duration-300 font-medium px-4 py-2 rounded-lg group flex items-center gap-2 ${
                    pathname === '/' 
                        ? 'text-emerald-600 bg-emerald-50' 
                        : 'text-gray-700 hover:text-emerald-600 hover:bg-emerald-50'
                }`}
            >
                <Home className="w-4 h-4" />
                Home
                <span className={`absolute bottom-0 left-0 h-0.5 bg-emerald-600 transition-all duration-300 ${
                    pathname === '/' ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></span>
            </Link>
            <Link 
                href="/about" 
                className={`relative transition-all duration-300 font-medium px-4 py-2 rounded-lg group flex items-center gap-2 ${
                    pathname === '/about' 
                        ? 'text-emerald-600 bg-emerald-50' 
                        : 'text-gray-700 hover:text-emerald-600 hover:bg-emerald-50'
                }`}
            >
                <Info className="w-4 h-4" />
                About
                <span className={`absolute bottom-0 left-0 h-0.5 bg-emerald-600 transition-all duration-300 ${
                    pathname === '/about' ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></span>
            </Link>
            <Link 
                href="/contact" 
                className={`relative transition-all duration-300 font-medium px-4 py-2 rounded-lg group flex items-center gap-2 ${
                    pathname === '/contact' 
                        ? 'text-emerald-600 bg-emerald-50' 
                        : 'text-gray-700 hover:text-emerald-600 hover:bg-emerald-50'
                }`}
            >
                <Mail className="w-4 h-4" />
                Contact
                <span className={`absolute bottom-0 left-0 h-0.5 bg-emerald-600 transition-all duration-300 ${
                    pathname === '/contact' ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></span>
            </Link>
            <Link
                href="/privacy-policy"
                className={`relative transition-all duration-300 font-medium px-4 py-2 rounded-lg group flex items-center gap-2 ${
                    pathname === '/privacy-policy'
                        ? 'text-emerald-600 bg-emerald-50'
                        : 'text-gray-700 hover:text-emerald-600 hover:bg-emerald-50'
                }`}
            >
                Privacy Policy
                <span className={`absolute bottom-0 left-0 h-0.5 bg-emerald-600 transition-all duration-300 ${
                    pathname === '/privacy-policy' ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></span>
            </Link>
            {/* Add more links as needed */}
        </nav>
    );
};

export default PageNavigation;