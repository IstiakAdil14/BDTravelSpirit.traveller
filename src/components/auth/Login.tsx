"use client";

import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl: "/" });
  };

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        throw new Error(res.error);
      }

      router.push("/");
    } catch (err: any) {
      setError(err.message || "Invalid email or password");
    } finally {
      setIsLoading(false);
    }
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
              
              <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-teal-200 to-emerald-200 bg-clip-text text-transparent mb-2">
                Welcome Home
              </h1>
              <p className="text-teal-200/80 text-sm">Continue your Bangladesh journey</p>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-200 text-sm text-center">
                {error}
              </div>
            )}

            {/* Email/Password Login Form */}
            <form onSubmit={handleEmailSignIn} className="space-y-4">
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
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-teal-100/50 focus:outline-none focus:border-teal-400 focus:bg-white/10 transition-colors"
                />
              </div>
              
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-white rounded-xl font-semibold shadow-lg shadow-teal-500/30 transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50"
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-[#082a26] text-teal-200/50 rounded-full">Or continue with</span>
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
                  Google
                </span>
              </div>
            </button>

            {/* Signup Link */}
            <div className="mt-8 text-center">
              <p className="text-teal-300/60 text-sm mb-2">New to BD Travel Spirit?</p>
              <Link 
                href="/auth/signup" 
                className="inline-flex items-center gap-1 text-cyan-300 hover:text-white font-semibold transition-all duration-300 hover:scale-105"
              >
                Start your adventure
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
