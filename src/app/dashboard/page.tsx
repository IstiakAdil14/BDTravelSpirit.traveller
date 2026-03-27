"use client";

import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { getUserDashboardPath } from "@/lib/utils/userRouting";
import { UserRole } from "@/constants/user.const";
import DashboardShell from "@/components/dashboard/DashboardShell";
import TravellerDashboard from "@/components/dashboard/TravellerDashboard";
import BookingsPage from "@/components/dashboard/bookings/BookingsPage";
import ReviewsPage from "@/components/dashboard/reviews/ReviewsPage";
import InboxPage from "@/components/dashboard/inbox/InboxPage";

interface DashboardData {
  stats: { totalTrips: number; placesVisited: number; wishlistItems: number; reviewsWritten: number };
  bookings: Array<{ id: string; title: string; location: string; date: string; status: "upcoming" | "completed" | "cancelled"; price: string; duration: string }>;
  wishlistItems: Array<{ id: string; name: string; location: string; price: string }>;
  cartItems: Array<{ id: string; name: string; location: string; price: string }>;
}

const LoadingScreen = () => (
  <div className="min-h-screen flex items-center justify-center bg-slate-50">
    <div className="text-center">
      <div className="w-10 h-10 rounded-full border-2 border-blue-600 border-t-transparent animate-spin mx-auto mb-3" />
      <p className="text-sm text-slate-500">Loading your dashboard…</p>
    </div>
  </div>
);

function DashboardContent() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [redirected, setRedirected] = useState(false);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  const role = searchParams.get("role");
  const id = searchParams.get("id");
  const page = searchParams.get("page") ?? "";

  useEffect(() => {
    if (redirected) return;

    if (status === "unauthenticated") {
      setRedirected(true);
      router.replace("/auth/signin");
      return;
    }

    if (status === "authenticated" && session?.user?.id) {
      if (!role || !id) {
        const userRole = ((session.user as any)?.role as UserRole) || "traveler";
        setRedirected(true);
        router.replace(getUserDashboardPath(session.user.id, userRole));
        return;
      }

      fetch("/api/dashboard")
        .then((r) => r.json())
        .then((data) => { setDashboardData(data); setLoading(false); })
        .catch(() => setLoading(false));
    }
  }, [status, session, router, redirected, role, id]);

  if (status === "loading" || loading) return <LoadingScreen />;
  if (!session || !role || !id) return <LoadingScreen />;

  const buildPageHref = (p: string) =>
    p ? `/dashboard?role=${role}&id=${id}&page=${p}` : `/dashboard?role=${role}&id=${id}`;

  const renderContent = () => {
    switch (page) {
      case "bookings": return <BookingsPage />;
      case "reviews":  return <ReviewsPage />;
      case "inbox":    return <InboxPage />;
      default:
        return (
          <TravellerDashboard
            stats={dashboardData?.stats}
            bookings={dashboardData?.bookings ?? []}
            isLoading={loading}
            buildPageHref={buildPageHref}
          />
        );
    }
  };

  return (
    <DashboardShell currentPage={page} buildPageHref={buildPageHref}>
      {renderContent()}
    </DashboardShell>
  );
}

export default function Dashboard() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <DashboardContent />
    </Suspense>
  );
}
