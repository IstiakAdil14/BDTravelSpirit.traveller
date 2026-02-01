"use client";

import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";

export default function SimpleSignup() {
  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl: "/" });
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-teal-900 via-emerald-900 to-cyan-900">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-500/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-500" />
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
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-bounce" />
              </div>
              
              <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-teal-200 to-cyan-200 bg-clip-text text-transparent mb-3">
                Join the Adventure
              </h1>
              <p className="text-teal-200/80 text-lg">Discover Bangladesh's hidden gems</p>
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
              
              {/* Sparkle effects */}
              <div className="absolute top-2 right-4 w-2 h-2 bg-teal-400 rounded-full opacity-0 group-hover:opacity-100 animate-ping" />
              <div className="absolute bottom-3 left-6 w-1 h-1 bg-emerald-400 rounded-full opacity-0 group-hover:opacity-100 animate-ping delay-200" />
            </button>

            {/* Features */}
            <div className="mt-8 space-y-3">
              {[
                { icon: "🏔️", text: "Explore stunning landscapes" },
                { icon: "🎭", text: "Experience rich culture" },
                { icon: "📸", text: "Create lasting memories" }
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-3 text-teal-200/70 hover:text-white transition-colors">
                  <span className="text-xl">{feature.icon}</span>
                  <span className="text-sm">{feature.text}</span>
                </div>
              ))}
            </div>

            {/* Login Link */}
            <div className="mt-8 text-center">
              <p className="text-teal-300/60 text-sm mb-3">Already part of our community?</p>
              <Link 
                href="/auth/login" 
                className="inline-flex items-center gap-2 text-cyan-300 hover:text-white font-semibold transition-all duration-300 hover:scale-105 group"
              >
                <span>Sign in here</span>
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
          
          {/* Bottom text */}
          <p className="text-center text-teal-300/40 text-xs mt-6">
            Secure authentication • Privacy protected • Terms apply
          </p>
        </div>
      </div>
    </div>
  );
}