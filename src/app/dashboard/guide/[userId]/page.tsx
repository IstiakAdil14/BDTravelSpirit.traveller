"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { decodeUserId, validateUserAccess } from "@/lib/utils/userRouting";

export default function GuideDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams();
  const encodedUserId = params.userId as string;
  const [redirected, setRedirected] = useState(false);

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
        const userRole = (session.user as any)?.role || "traveler";
        
        if (session.user.id !== decodedId || !validateUserAccess(encodedUserId, userRole, "guide")) {
          setRedirected(true);
          router.replace("/auth/signin");
        }
      } catch {
        setRedirected(true);
        router.replace("/auth/signin");
      }
    }
  }, [status, session, encodedUserId, router, redirected]);

  if (status === "loading") {
    return <div className="p-8">Loading...</div>;
  }

  if (!session) {
    return <div className="p-8">Access denied</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b px-6 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-blue-600">
            BD Travel Spirit - Guide
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-gray-700">Guide: {session.user?.name}</span>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Sign Out
            </button>
          </div>
        </div>
      </nav>
      
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6">Guide Dashboard</h1>
        <div className="grid gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">My Tours</h2>
            <p className="text-gray-600">Manage your assigned tours and schedules</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Bookings</h2>
            <p className="text-gray-600">View upcoming tour bookings and participants</p>
          </div>
        </div>
      </div>
    </div>
  );
}