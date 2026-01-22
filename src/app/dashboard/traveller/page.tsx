"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { encodeUserId } from "@/lib/utils/userRouting";

export default function TravellerDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/auth/signin");
    } else if (status === "authenticated" && session?.user?.id) {
      const encodedUserId = encodeUserId(session.user.id);
      router.replace(`/dashboard/traveller/${encodedUserId}`);
    }
  }, [status, session, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-teal-50 to-emerald-50">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 p-0.5 animate-pulse">
            <div className="w-full h-full rounded-xl bg-teal-900 flex items-center justify-center">
              <span className="text-white font-bold text-lg">BD</span>
            </div>
          </div>
          <p className="text-gray-600 text-lg">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return null;
}