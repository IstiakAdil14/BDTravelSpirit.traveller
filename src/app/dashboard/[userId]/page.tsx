"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function UserDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams();
  const userId = params.userId as string;
  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/auth/signin");
    } else if (status === "authenticated" && session?.user?.id && session.user.id !== userId) {
      router.replace(`/dashboard/${session.user.id}`);
    }
  }, [status, session, userId, router]);

  if (status === "loading") {
    return <div className="p-8">Loading...</div>;
  }

  if (!session || session.user?.id !== userId) {
    return <div className="p-8">Access denied</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b px-6 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-blue-600">
            BD Travel Spirit
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-gray-700">Welcome, {session.user?.name}</span>
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
        <h1 className="text-3xl font-bold mb-6">Dashboard - {session.user?.name}</h1>
        <div className="grid gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">User Information</h2>
            <p><strong>ID:</strong> {userId}</p>
            <p><strong>Name:</strong> {session.user?.name}</p>
            <p><strong>Email:</strong> {session.user?.email}</p>
            <p><strong>Role:</strong> {(session.user as any)?.role || "traveler"}</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="flex gap-4">
              <Link 
                href="/tours" 
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Browse Tours
              </Link>
              <Link 
                href="/destinations" 
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Explore Destinations
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}