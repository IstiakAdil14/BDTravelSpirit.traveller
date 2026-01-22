"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getUserDashboardPath } from "@/lib/utils/userRouting";
import { UserRole } from "@/constants/user.const";

export default function NewUser() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.user?.id) {
      const userRole = (session.user as any)?.role as UserRole || "traveler";
      const dashboardPath = getUserDashboardPath(session.user.id, userRole);
      
      setTimeout(() => {
        router.push(dashboardPath);
      }, 3000);
    }
  }, [session, router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full space-y-8 text-center">
        <h2 className="text-3xl font-bold text-green-600">Welcome!</h2>
        <p className="text-gray-600">
          Your account has been created successfully.
        </p>
        <div className="bg-green-50 p-4 rounded-md">
          <p className="text-sm text-green-800">
            You will be redirected to your dashboard shortly...
          </p>
        </div>
        <button
          onClick={() => {
            if (session?.user?.id) {
              const userRole = (session.user as any)?.role as UserRole || "traveler";
              const dashboardPath = getUserDashboardPath(session.user.id, userRole);
              router.push(dashboardPath);
            }
          }}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
}