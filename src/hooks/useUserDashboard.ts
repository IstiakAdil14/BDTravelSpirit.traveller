import { useSession } from "next-auth/react";
import { getUserDashboardPath } from "@/lib/utils/userRouting";
import { UserRole } from "@/constants/user.const";

export const useUserDashboard = () => {
  const { data: session } = useSession();
  
  const getDashboardUrl = () => {
    if (!session?.user?.id) return null;
    
    const userRole = (session.user as any)?.role as UserRole || "traveler";
    return getUserDashboardPath(session.user.id, userRole);
  };

  return {
    dashboardUrl: getDashboardUrl(),
    userRole: (session?.user as any)?.role || "traveler",
    isAuthenticated: !!session?.user?.id
  };
};