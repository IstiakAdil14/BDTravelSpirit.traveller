"use client";

import { useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { decodeUserId, validateUserAccess } from "@/lib/utils/userRouting";
import TravellerDashboard from "@/components/dashboard/TravellerDashboard";
import DashboardShell from "@/components/dashboard/DashboardShell";
import { AccountPageSkeleton } from "@/components/dashboard/DashboardSkeletons";

interface DashboardData {
  stats: {
    totalTrips: number;
    placesVisited: number;
    wishlistItems: number;
    reviewsWritten: number;
  };
  bookings: Array<{
    id: string;
    title: string;
    location: string;
    date: string;
    status: "upcoming" | "completed" | "cancelled";
    price: string;
    duration: string;
  }>;
  wishlistItems: Array<{ id: string; name: string; location: string; price: string; image?: string }>;
  cartItems: Array<{ id: string; name: string; location: string; price: string; image?: string }>;
  weeklyActivity: Array<{ day: string; val: number; count: number }>;
  progress: Array<{ label: string; val: number }>;
  travelTime: { travelled: string; remaining: string; pct: number };
  onboarding: Array<{ label: string; done: boolean }>;
  schedule: Array<{ time: string; title: string; tag: string; color: string }>;
}

export default function TravellerDashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams();
  const encodedUserId = params.userId as string;
  const [redirected, setRedirected] = useState(false);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  const buildPageHref = (segment: string) =>
    segment
      ? `/dashboard/traveller/${encodedUserId}/${segment}`
      : `/dashboard/traveller/${encodedUserId}`;

  useEffect(() => {
    if (redirected) return;

    if (status === "unauthenticated") {
      setRedirected(true);
      router.replace("/auth/signin");
      return;
    }

    if (status === "authenticated" && session?.user?.id) {
      try {
        const decodedId = decodeUserId(encodedUserId);
        const userRole = (session.user as any)?.role || "traveller";

        if (session.user.id !== decodedId || !validateUserAccess(encodedUserId, userRole, "traveller")) {
          setRedirected(true);
          router.replace("/auth/signin");
          return;
        }

        const delay = new Promise((r) => setTimeout(r, 1500));
        Promise.all([fetch("/api/dashboard").then((r) => r.json()), delay])
          .then(([data]) => { setDashboardData(data); setLoading(false); })
          .catch(() => setLoading(false));
      } catch {
        setRedirected(true);
        router.replace("/auth/signin");
      }
    }
  }, [status, session, encodedUserId, router, redirected]);

  if (status === "loading" || loading) {
    return (
      <DashboardShell currentPage="" buildPageHref={buildPageHref}>
        <AccountPageSkeleton />
      </DashboardShell>
    );
  }

  if (!session || !dashboardData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-teal-50 to-emerald-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Access Denied</h2>
          <p className="text-gray-600 mb-6">Please sign in to access your dashboard</p>
          <Link
            href="/auth/signin"
            className="px-6 py-3 bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-xl hover:shadow-lg transition-all duration-300"
          >
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <DashboardShell currentPage="" buildPageHref={buildPageHref}>
      <TravellerDashboard
        stats={dashboardData.stats}
        bookings={dashboardData.bookings}
        wishlistItems={dashboardData.wishlistItems}
        cartItems={dashboardData.cartItems}
        weeklyActivity={dashboardData.weeklyActivity}
        progress={dashboardData.progress}
        travelTime={dashboardData.travelTime}
        onboarding={dashboardData.onboarding}
        schedule={dashboardData.schedule}
        buildPageHref={buildPageHref}
      />
    </DashboardShell>
  );
}
