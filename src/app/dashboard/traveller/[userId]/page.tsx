"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { decodeUserId, validateUserAccess } from "@/lib/utils/userRouting";
import TravellerDashboard from "@/components/dashboard/TravellerDashboard";

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
    status: 'upcoming' | 'completed' | 'cancelled';
    price: string;
    duration: string;
  }>;
  wishlistItems: Array<{
    id: string;
    name: string;
    location: string;
    price: string;
    image?: string;
  }>;
  cartItems: Array<{
    id: string;
    name: string;
    location: string;
    price: string;
    image?: string;
  }>;
}

export default function TravellerDashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams();
  const encodedUserId = params.userId as string;
  const [redirected, setRedirected] = useState(false);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async (): Promise<DashboardData> => {
    const response = await fetch('/api/dashboard');
    if (!response.ok) {
      throw new Error('Failed to fetch dashboard data');
    }
    return response.json();
  };

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

        // Fetch dashboard data
        fetchDashboardData().then(data => {
          setDashboardData(data);
          setLoading(false);
        }).catch(error => {
          console.error('Error fetching dashboard data:', error);
          setLoading(false);
        });
      } catch {
        setRedirected(true);
        router.replace("/auth/signin");
      }
    }
  }, [status, session, encodedUserId, router, redirected]);

  if (status === "loading" || loading) {
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

  if (!session || !dashboardData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-teal-50 to-emerald-50">
        <div className="text-center">
          <div className="text-6xl mb-4">🔒</div>
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
    <TravellerDashboard 
      stats={dashboardData.stats}
      bookings={dashboardData.bookings}
      wishlistItems={dashboardData.wishlistItems}
      cartItems={dashboardData.cartItems}
    />
  );
}