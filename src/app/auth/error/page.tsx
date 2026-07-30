"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";
import { FcGoogle } from "react-icons/fc";

function AuthErrorContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  const getErrorMessage = (error: string | null) => {
    switch (error) {
      case "Configuration":
        return "We're experiencing a minor turbulence with our server configuration. Our team is on it.";
      case "AccessDenied":
        return "It looks like you've already started your journey with us using this email! Please sign in to continue.";
      case "Verification":
        return "This verification link has expired or was already used. Let's get you a fresh one.";
      default:
        return "Something unexpected happened during authentication. Let's try that again.";
    }
  };

  const getErrorTitle = (error: string | null) => {
    switch (error) {
      case "AccessDenied":
        return "Account Already Exists";
      case "Verification":
        return "Link Expired";
      default:
        return "Authentication Error";
    }
  };

  return (
    <div className="relative z-10 bg-white/80 backdrop-blur-xl border border-white/40 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] p-10 w-full max-w-lg text-center transform transition-all duration-500 hover:shadow-[0_20px_40px_rgb(0,0,0,0.12)]">
      {/* Icon Animation Container */}
      <div className="mb-8 relative flex justify-center">
        {error === "AccessDenied" ? (
          <div className="relative group">
            <div className="absolute inset-0 bg-teal-400/30 rounded-full blur-xl group-hover:bg-teal-400/50 transition-all duration-500"></div>
            <div className="relative w-20 h-20 bg-gradient-to-tr from-teal-100 to-emerald-50 rounded-2xl flex items-center justify-center rotate-3 group-hover:rotate-6 transition-transform duration-300 shadow-sm border border-teal-100">
              <svg className="w-10 h-10 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md animate-bounce">
              <span className="text-teal-600 font-bold text-lg">!</span>
            </div>
          </div>
        ) : (
          <div className="relative group">
            <div className="absolute inset-0 bg-rose-400/30 rounded-full blur-xl group-hover:bg-rose-400/50 transition-all duration-500"></div>
            <div className="relative w-20 h-20 bg-gradient-to-tr from-rose-100 to-orange-50 rounded-2xl flex items-center justify-center -rotate-3 group-hover:-rotate-6 transition-transform duration-300 shadow-sm border border-rose-100">
              <svg className="w-10 h-10 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
          </div>
        )}
      </div>
      
      <h2 className="text-3xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 tracking-tight">
        {getErrorTitle(error)}
      </h2>
      
      <p className="text-gray-600 mb-10 leading-relaxed text-lg font-medium">
        {getErrorMessage(error)}
      </p>
      
      {error === "AccessDenied" ? (
        <div className="flex flex-col gap-4">
          <Link
            href="/auth/login"
            className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-gray-900 text-white rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-gray-900/20 active:scale-95"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="relative font-semibold tracking-wide flex items-center gap-2">
              Sign In to Your Account
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
          </Link>
          <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-500">
            <span>Want to use a different account?</span>
            <Link
              href="/auth/signup"
              className="font-semibold text-teal-600 hover:text-teal-700 hover:underline transition-colors"
            >
              Sign up here
            </Link>
          </div>
        </div>
      ) : (
        <Link
          href="/auth/login"
          className="group relative inline-flex items-center justify-center px-8 py-4 bg-gray-900 text-white rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-gray-900/20 active:scale-95"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-rose-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <span className="relative font-semibold tracking-wide">Return to Login</span>
        </Link>
      )}
    </div>
  );
}

export default function AuthError() {
  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden bg-slate-50">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-teal-300/20 blur-[100px] animate-pulse"></div>
        <div className="absolute top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-blue-300/20 blur-[120px]" style={{ animationDelay: '1s', animationDuration: '4s' }}></div>
        <div className="absolute -bottom-[20%] left-[20%] w-[60%] h-[60%] rounded-full bg-emerald-200/20 blur-[100px]" style={{ animationDelay: '2s', animationDuration: '5s' }}></div>
      </div>

      <div className="relative z-10 p-4 w-full flex justify-center">
        <Suspense fallback={
          <div className="bg-white/80 backdrop-blur-xl border border-white/40 rounded-3xl shadow-lg p-10 w-full max-w-lg text-center">
            <div className="animate-pulse flex flex-col items-center">
              <div className="w-20 h-20 bg-gray-200 rounded-2xl mb-8"></div>
              <div className="h-8 w-3/4 bg-gray-200 rounded-lg mb-4"></div>
              <div className="h-4 w-full bg-gray-200 rounded mb-2"></div>
              <div className="h-4 w-5/6 bg-gray-200 rounded mb-10"></div>
              <div className="h-14 w-full bg-gray-200 rounded-xl"></div>
            </div>
          </div>
        }>
          <AuthErrorContent />
        </Suspense>
      </div>
    </div>
  );
}