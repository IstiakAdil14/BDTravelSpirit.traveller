import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { getUserDashboardPath } from "@/lib/utils/userRouting";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const { pathname } = req.nextUrl;

    // Redirect authenticated users away from auth pages
    if (token && (pathname.startsWith("/auth/") || pathname === "/auth")) {
      const userRole = token?.role as any || "traveler";
      const dashboardPath = getUserDashboardPath(token.id as string, userRole);
      return NextResponse.redirect(new URL(dashboardPath, req.url));
    }

    // Redirect old dashboard route to role-based route
    if (pathname.startsWith("/dashboard/") && pathname.match(/^\/dashboard\/[a-z]+\/[a-zA-Z0-9_-]+$/)) {
      const pathParts = pathname.split("/");
      const role = pathParts[2];
      const encodedId = pathParts[3];
      
      if (token?.id) {
        const newPath = `/dashboard?role=${role}&id=${encodedId}`;
        return NextResponse.redirect(new URL(newPath, req.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Allow access to auth pages for unauthenticated users
        if (req.nextUrl.pathname.startsWith("/auth/")) {
          return true;
        }
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: ["/dashboard/:path*", "/auth/:path*"]
};