"use client";

import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";

export default function Login() {
    const handleGoogleSignIn = () => {
        signIn("google", { callbackUrl: "/" });
    };

    return (
        <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-teal-900 to-emerald-900">
            {/* Animated background elements */}
            <div className="absolute inset-0">
                <div className="absolute top-1/3 left-1/3 w-72 h-72 bg-teal-500/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl animate-pulse delay-700" />
                <div className="absolute top-1/2 right-1/4 w-48 h-48 bg-cyan-500/25 rounded-full blur-3xl animate-pulse delay-300" />
            </div>
            
            <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
                <div className="w-full max-w-md">
                    {/* Floating card */}
                    <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 shadow-2xl hover:shadow-teal-500/25 transition-all duration-500 hover:scale-[1.02]">
                        {/* Header */}
                        <div className="text-center mb-8">
                            <div className="relative mb-6">
                                <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 p-0.5 shadow-lg shadow-teal-500/50">
                                    <div className="w-full h-full rounded-xl bg-teal-900 flex items-center justify-center">
                                        <span className="text-white font-bold text-2xl">BD</span>
                                    </div>
                                </div>
                                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center">
                                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </div>
                            
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-teal-200 to-emerald-200 bg-clip-text text-transparent mb-3">
                                Welcome Home
                            </h1>
                            <p className="text-teal-200/80 text-lg">Continue your Bangladesh journey</p>
                        </div>

                        {/* Google Sign In Button */}
                        <button
                            onClick={handleGoogleSignIn}
                            className="w-full group relative overflow-hidden bg-white/90 hover:bg-white border-0 rounded-2xl p-5 transition-all duration-300 hover:shadow-2xl hover:shadow-teal-500/30 hover:-translate-y-1 active:translate-y-0"
                        >
                            <div className="flex items-center justify-center gap-4">
                                <FcGoogle className="w-7 h-7" />
                                <span className="font-bold text-gray-800 text-lg group-hover:text-teal-700 transition-colors">
                                    Continue with Google
                                </span>
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 via-emerald-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            
                            {/* Security badge */}
                            <div className="absolute top-2 right-3 flex items-center gap-1 text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span>Secure</span>
                            </div>
                        </button>

                        {/* Quick stats */}
                        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
                            {[
                                { number: "10+", label: "Travelers" },
                                { number: "40+", label: "Destinations" },
                                { number: "4.9★", label: "Rating" }
                            ].map((stat, i) => (
                                <div key={i} className="text-teal-200/70 hover:text-white transition-colors">
                                    <div className="text-lg font-bold">{stat.number}</div>
                                    <div className="text-xs opacity-70">{stat.label}</div>
                                </div>
                            ))}
                        </div>

                        {/* Signup Link */}
                        <div className="mt-8 text-center">
                            <p className="text-teal-300/60 text-sm mb-3">New to BD Travel Spirit?</p>
                            <Link 
                                href="/auth/signup" 
                                className="inline-flex items-center gap-2 text-cyan-300 hover:text-white font-semibold transition-all duration-300 hover:scale-105 group"
                            >
                                <span>Start your adventure</span>
                                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                    
                    {/* Bottom text */}
                    <p className="text-center text-teal-300/40 text-xs mt-6">
                        🔒 Enterprise-grade security • 🌍 Trusted worldwide
                    </p>
                </div>
            </div>
        </div>
    );
}
