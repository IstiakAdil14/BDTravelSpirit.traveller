"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getUserDashboardPath } from "@/lib/utils/userRouting";
import { UserRole } from "@/constants/user.const";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [redirected, setRedirected] = useState(false);

  useEffect(() => {
    if (redirected) return;
    
    if (status === "unauthenticated") {
      setRedirected(true);
      router.replace("/auth/signin");
    } else if (status === "authenticated" && session?.user?.id) {
      const userRole = (session.user as any)?.role as UserRole || "traveler";
      const dashboardPath = getUserDashboardPath(session.user.id, userRole);
      setRedirected(true);
      // Replace history to prevent back navigation to OAuth pages
      window.history.replaceState(null, '', dashboardPath);
      router.replace(dashboardPath);
    }
  }, [status, session, router, redirected]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Redirecting to your dashboard...</p>
      </div>
    </div>
  );
}