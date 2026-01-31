"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";

function AuthErrorContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  const getErrorMessage = (error: string | null) => {
    switch (error) {
      case "Configuration":
        return "There is a problem with the server configuration.";
      case "AccessDenied":
        return "This Gmail account already exists. Please sign in instead of signing up.";
      case "Verification":
        return "The verification token has expired or has already been used.";
      default:
        return "An error occurred during authentication.";
    }
  };

  const getErrorTitle = (error: string | null) => {
    switch (error) {
      case "AccessDenied":
        return "Account Already Exists";
      default:
        return "Authentication Error";
    }
  };

  const getActionButton = (error: string | null) => {
    switch (error) {
      case "AccessDenied":
        return (
          <div className="space-y-4">
            <Link
              href="/auth/signin"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 font-medium"
            >
              Sign In Instead
            </Link>
            <div>
              <Link
                href="/auth/signup"
                className="text-blue-600 hover:text-blue-700 text-sm"
              >
                Try with different email
              </Link>
            </div>
          </div>
        );
      default:
        return (
          <Link
            href="/auth/signin"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
          >
            Try Again
          </Link>
        );
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md text-center">
      <div className="mb-6">
        {error === "AccessDenied" ? (
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
        ) : (
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        )}
      </div>
      
      <h2 className={`text-2xl font-bold mb-4 ${
        error === "AccessDenied" ? "text-orange-600" : "text-red-600"
      }`}>
        {getErrorTitle(error)}
      </h2>
      
      <p className="text-gray-600 mb-8 leading-relaxed">
        {getErrorMessage(error)}
      </p>
      
      {getActionButton(error)}
    </div>
  );
}

export default function AuthError() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50">
      <Suspense fallback={
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md text-center">
          <div className="animate-pulse">
            <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4"></div>
            <div className="h-6 bg-gray-200 rounded mb-4"></div>
            <div className="h-4 bg-gray-200 rounded mb-8"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
          </div>
        </div>
      }>
        <AuthErrorContent />
      </Suspense>
    </div>
  );
}