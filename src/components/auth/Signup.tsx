"use client";

import { signIn, getSession } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import AccountExistsPopup from "@/components/ui/AccountExistsPopup";

export default function Signup() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [showAccountExistsPopup, setShowAccountExistsPopup] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    
    useEffect(() => {
        if (searchParams.get('error') === 'AccountExists') {
            setShowAccountExistsPopup(true);
        }
    }, [searchParams]);
    
    const handleGoogleSignIn = async () => {
        setIsLoading(true);
        setError("");
        
        // Start Google OAuth to get email, but don't create session yet
        window.location.href = `/api/auth/signin/google?callbackUrl=${encodeURIComponent('/')}`;
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 via-blue-50 to-cyan-50">
            <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Get Started</h1>
                    <p className="text-gray-600">Create your account to explore Bangladesh</p>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                        {error}
                    </div>
                )}

                {/* Google Sign In Button */}
                <button
                    onClick={handleGoogleSignIn}
                    disabled={isLoading}
                    className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-white border-2 border-gray-200 rounded-xl hover:border-gray-300 hover:shadow-md transition-all duration-200 font-medium text-gray-700 disabled:opacity-50"
                >
                    <FcGoogle className="w-6 h-6" />
                    <span>{isLoading ? "Checking..." : "Continue with Google"}</span>
                </button>

                {/* Benefits */}
                <div className="mt-8 space-y-3">
                    <div className="flex items-start gap-3 text-sm text-gray-600">
                        <svg className="w-5 h-5 text-teal-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Save your favorite destinations</span>
                    </div>
                    <div className="flex items-start gap-3 text-sm text-gray-600">
                        <svg className="w-5 h-5 text-teal-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Book tours and experiences</span>
                    </div>
                    <div className="flex items-start gap-3 text-sm text-gray-600">
                        <svg className="w-5 h-5 text-teal-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Share your travel stories</span>
                    </div>
                </div>

                {/* Divider */}
                <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-4 bg-white text-gray-500">Already have an account?</span>
                    </div>
                </div>

                {/* Sign In Link */}
                <div className="text-center">
                    <Link href="/auth/login" className="text-teal-600 hover:text-teal-700 font-medium">
                        Sign in instead
                    </Link>
                </div>

                {/* Terms */}
                <p className="mt-8 text-xs text-center text-gray-500">
                    By signing up, you agree to our{" "}
                    <Link href="#" className="text-teal-600 hover:underline">
                        Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="#" className="text-teal-600 hover:underline">
                        Privacy Policy
                    </Link>
                </p>
            </div>
            
            <AccountExistsPopup 
                show={showAccountExistsPopup} 
                onClose={() => {
                    setShowAccountExistsPopup(false);
                    router.push('/auth/login');
                }} 
            />
        </div>
    );
}
