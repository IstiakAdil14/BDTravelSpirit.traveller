"use client";

import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SimpleSignup() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const passwordRegex = /^(?=.{6,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).+$/;

  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl: "/" });
  };

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!passwordRegex.test(password)) {
      setError("Password must be at least 6 characters and include uppercase, lowercase, number, and special character.");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/otp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, purpose: "signup" }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to send OTP");
      }

      setStep(2);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setError("");
    setSuccess("");
    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/otp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, purpose: "signup" }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to resend OTP");
      }
      setSuccess("A new OTP has been sent to your email.");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/otp/verify-and-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, otp }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to verify OTP");
      }

      // Automatically log them in
      const signInRes = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (signInRes?.error) {
        throw new Error(signInRes.error);
      }

      router.push("/");
    } catch (err: any) {
      setError(err.message);
      setIsLoading(false);
    }
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
          <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 shadow-2xl hover:shadow-teal-500/25 transition-all duration-500">
            
            {/* Header */}
            <div className="text-center mb-8">
              <div className="relative mb-6">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 p-0.5 shadow-lg shadow-teal-500/50">
                  <div className="w-full h-full rounded-xl bg-teal-900 flex items-center justify-center">
                    <span className="text-white font-bold text-xl">BD</span>
                  </div>
                </div>
              </div>
              
              <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-teal-200 to-cyan-200 bg-clip-text text-transparent mb-2">
                Join the Adventure
              </h1>
              <p className="text-teal-200/80 text-sm">Create your account to start exploring</p>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-200 text-sm text-center">
                {error}
              </div>
            )}

            {success && (
              <div className="mb-4 p-3 bg-emerald-500/10 border border-emerald-500/50 rounded-lg text-emerald-200 text-sm text-center">
                {success}
              </div>
            )}

            {step === 1 ? (
              <form onSubmit={handleSendOTP} className="space-y-4">
                <div>
                  <input
                    type="text"
                    required
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-teal-100/50 focus:outline-none focus:border-teal-400 focus:bg-white/10 transition-colors"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    required
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-teal-100/50 focus:outline-none focus:border-teal-400 focus:bg-white/10 transition-colors"
                  />
                </div>
                <div>
                  <input
                    type="password"
                    required
                    placeholder="Create Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-teal-100/50 focus:outline-none focus:border-teal-400 focus:bg-white/10 transition-colors"
                  />
                  <p className="text-xs text-teal-200/50 mt-1 pl-1">Min 6 chars, uppercase, lowercase, number & special char.</p>
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-white rounded-xl font-semibold shadow-lg shadow-teal-500/30 transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50"
                >
                  {isLoading ? "Sending OTP..." : "Sign Up with Email"}
                </button>
                
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/10"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-[#0a2f2b] text-teal-200/50 rounded-full">Or</span>
                  </div>
                </div>

                {/* Google Sign In Button */}
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  className="w-full group relative overflow-hidden bg-white/90 hover:bg-white border-0 rounded-xl p-3 transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/20"
                >
                  <div className="flex items-center justify-center gap-3">
                    <FcGoogle className="w-6 h-6" />
                    <span className="font-semibold text-gray-800 group-hover:text-teal-700 transition-colors">
                      Continue with Google
                    </span>
                  </div>
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOTP} className="space-y-4">
                <div className="text-center mb-6">
                  <p className="text-teal-100 text-sm">We sent a 6-digit verification code to</p>
                  <p className="text-white font-semibold">{email}</p>
                </div>
                <div>
                  <input
                    type="text"
                    required
                    placeholder="Enter 6-digit OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    maxLength={6}
                    className="w-full px-4 py-3 text-center tracking-widest text-2xl bg-white/5 border border-white/10 rounded-xl text-white placeholder-teal-100/30 focus:outline-none focus:border-teal-400 focus:bg-white/10 transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-white rounded-xl font-semibold shadow-lg shadow-teal-500/30 transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50"
                  >
                    {isLoading ? "Verifying..." : "Verify & Complete Signup"}
                  </button>
                  <button
                    type="button"
                    onClick={handleResendOTP}
                    disabled={isLoading}
                    className="w-full py-2 text-cyan-300 hover:text-white text-sm font-medium transition-colors disabled:opacity-50"
                  >
                    Didn't receive the code? Resend OTP
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => { setStep(1); setError(""); setSuccess(""); }}
                  className="w-full py-2 text-teal-200 hover:text-white text-sm transition-colors"
                >
                  Back to Details
                </button>
              </form>
            )}

            {/* Login Link */}
            <div className="mt-8 text-center">
              <p className="text-teal-300/60 text-sm mb-2">Already part of our community?</p>
              <Link 
                href="/auth/login" 
                className="inline-flex items-center gap-1 text-cyan-300 hover:text-white font-semibold transition-all duration-300 hover:scale-105"
              >
                Sign in here
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}