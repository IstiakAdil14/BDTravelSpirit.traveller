"use client";

import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { getUserDashboardPath } from "@/lib/utils/userRouting";
import { UserRole } from "@/constants/user.const";
import TravellerDashboard from "@/components/dashboard/TravellerDashboard";
import TripsContent from "@/components/dashboard/trips/TripsContent";
import FavoritesContent from "@/components/dashboard/favorites/FavoritesContent";
import BookingsContent from "@/components/dashboard/bookings/BookingsContent";
import PaymentsContent from "@/components/dashboard/payments/PaymentsContent";
import ReviewsContent from "@/components/dashboard/reviews/ReviewsContent";
import SettingsContent from "@/components/dashboard/settings/SettingsContent";
import Sidebar from "@/components/layout/Sidebar";

function DashboardContent() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [redirected, setRedirected] = useState(false);

  const role = searchParams.get('role');
  const id = searchParams.get('id');
  const page = searchParams.get('page');

  useEffect(() => {
    if (redirected) return;
    
    if (status === "unauthenticated") {
      setRedirected(true);
      router.replace("/auth/signin");
      return;
    }
    
    // If no query params, redirect to proper dashboard URL
    if (status === "authenticated" && session?.user?.id && (!role || !id)) {
      const userRole = (session.user as any)?.role as UserRole || "traveler";
      const dashboardPath = getUserDashboardPath(session.user.id, userRole);
      setRedirected(true);
      router.replace(dashboardPath);
    }
  }, [status, session, router, redirected, role, id]);

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

  // Show dashboard if authenticated and has query params
  if (status === "authenticated" && role && id) {
    // Render different content based on page parameter
    const renderPageContent = () => {
      switch (page) {
        case 'trips':
          return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
              <div className="hidden lg:flex">
                <div className="sticky top-0 h-screen">
                  <Sidebar />
                </div>
                <div className="flex-1 p-6">
                  <TripsContent userId={id} />
                </div>
              </div>
            </div>
          );
        case 'favorites':
          return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
              <div className="hidden lg:flex">
                <div className="sticky top-0 h-screen">
                  <Sidebar />
                </div>
                <div className="flex-1 p-6">
                  <FavoritesContent userId={id} />
                </div>
              </div>
            </div>
          );
        case 'bookings':
          return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
              <div className="hidden lg:flex">
                <div className="sticky top-0 h-screen">
                  <Sidebar />
                </div>
                <div className="flex-1 p-6">
                  <BookingsContent userId={id} />
                </div>
              </div>
            </div>
          );
        case 'payments':
          return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
              <div className="hidden lg:flex">
                <div className="sticky top-0 h-screen">
                  <Sidebar />
                </div>
                <div className="flex-1 p-6">
                  <PaymentsContent userId={id} />
                </div>
              </div>
            </div>
          );
        case 'reviews':
          return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
              <div className="hidden lg:flex">
                <div className="sticky top-0 h-screen">
                  <Sidebar />
                </div>
                <div className="flex-1 p-6">
                  <ReviewsContent userId={id} />
                </div>
              </div>
            </div>
          );
        case 'settings':
          return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
              <div className="hidden lg:flex">
                <div className="sticky top-0 h-screen">
                  <Sidebar />
                </div>
                <div className="flex-1 p-6">
                  <SettingsContent userId={id} />
                </div>
              </div>
            </div>
          );
        default:
          return <TravellerDashboard />;
      }
    };

    return renderPageContent();
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Redirecting...</p>
      </div>
    </div>
  );
}

export default function Dashboard() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <DashboardContent />
    </Suspense>
  );
}