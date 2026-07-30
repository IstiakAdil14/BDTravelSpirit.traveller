"use client";

import { useEffect, useState, type ComponentType } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  Home,
  MapPin,
  Users,
  LayoutDashboard,
  Inbox,
  CalendarDays,
  Star,
  User,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { encodeUserId } from "@/lib/utils/userRouting";
import { useUserDashboard } from "@/hooks/useUserDashboard";

type NavItem = {
  name: string;
  href: string;
  icon: ComponentType<{ className?: string }>;
  match?: (pathname: string) => boolean;
  useProfile?: boolean;
};

const DASHBOARD_SEGMENTS = ["", "inbox", "bookings", "reviews"] as const;

const DASHBOARD_NAV: Omit<NavItem, "href">[] = [
  { name: "Account", icon: LayoutDashboard, useProfile: true },
  { name: "Inbox", icon: Inbox },
  { name: "Bookings", icon: CalendarDays },
  { name: "Reviews", icon: Star },
];

interface BottomNavProps {
  buildPageHref?: (segment: string) => string;
  currentPage?: string;
}

function isTravellerDashboardPath(pathname: string | null) {
  if (!pathname) return false;
  if (pathname.startsWith("/dashboard/traveller")) return true;
  if (pathname === "/dashboard") return true;
  return false;
}

function resolveDashboardContext(
  pathname: string,
  searchParams: URLSearchParams,
  sessionUserId?: string
) {
  const travellerMatch = pathname.match(/^\/dashboard\/traveller\/([^/]+)(?:\/([^/]+))?/);
  if (travellerMatch) {
    const encodedId = travellerMatch[1];
    const segment = travellerMatch[2] ?? "";
    return {
      encodedId,
      currentPage: segment,
      hrefFor: (segment: string) =>
        segment
          ? `/dashboard/traveller/${encodedId}/${segment}`
          : `/dashboard/traveller/${encodedId}`,
    };
  }

  if (pathname === "/dashboard") {
    const role = searchParams.get("role") ?? "traveler";
    const encodedId =
      searchParams.get("id") ??
      (sessionUserId ? encodeUserId(sessionUserId) : "");
    const currentPage = searchParams.get("page") ?? "";
    return {
      encodedId,
      currentPage,
      hrefFor: (segment: string) => {
        const base = `/dashboard?role=${role}&id=${encodedId}`;
        return segment ? `${base}&page=${segment}` : base;
      },
    };
  }

  return null;
}

function buildSiteNav(accountHref: string): NavItem[] {
  return [
    {
      name: "Home",
      href: "/",
      icon: Home,
      match: (pathname) => pathname === "/",
    },
    {
      name: "Tours",
      href: "/tours",
      icon: MapPin,
      match: (pathname) => pathname === "/tours" || pathname.startsWith("/tours/"),
    },
    {
      name: "Operators",
      href: "/operators",
      icon: Users,
      match: (pathname) => pathname === "/operators" || pathname.startsWith("/operators/"),
    },
    {
      name: "Account",
      href: accountHref,
      icon: User,
      useProfile: true,
      match: (pathname) =>
        pathname.startsWith("/dashboard") || pathname.startsWith("/auth"),
    },
  ];
}

function NavIcon({
  item,
  active,
  user,
}: {
  item: NavItem;
  active: boolean;
  user?: { id?: string; name?: string | null; image?: string | null };
}) {
  if (item.useProfile && user) {
    const avatarSrc = user.id ? `/api/user/avatar?u=${user.id}` : "";

    return (
      <Avatar
        className={`h-6 w-6 ring-2 ${active ? "ring-emerald-400" : "ring-transparent"}`}
      >
        <AvatarImage src={avatarSrc} alt={user.name ?? "Account"} />
        <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-teal-500 text-[9px] font-bold text-white">
          {user.name?.[0]?.toUpperCase() ?? "U"}
        </AvatarFallback>
      </Avatar>
    );
  }

  return <item.icon className="h-4 w-4" />;
}

export default function BottomNav({ buildPageHref, currentPage }: BottomNavProps) {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname() ?? "";
  const searchParams = useSearchParams();
  const { data: session } = useSession();
  const { dashboardUrl, isAuthenticated } = useUserDashboard();

  useEffect(() => setMounted(true), []);

  const isDashboard = isTravellerDashboardPath(pathname);
  const accountHref = isAuthenticated && dashboardUrl ? dashboardUrl : "/auth/signin";

  const dashboardContext = isDashboard
    ? resolveDashboardContext(pathname, searchParams, session?.user?.id)
    : null;

  const hrefForDashboard = (segment: string) => {
    if (buildPageHref) return buildPageHref(segment);
    if (dashboardContext) return dashboardContext.hrefFor(segment);
    const userId = session?.user?.id;
    if (!userId) {
      return segment ? `/dashboard/traveller/${segment}` : "/dashboard/traveller";
    }
    const encoded = encodeUserId(userId);
    return segment ? `/dashboard/traveller/${encoded}/${segment}` : `/dashboard/traveller/${encoded}`;
  };

  const resolvedCurrentPage =
    currentPage !== undefined
      ? currentPage
      : dashboardContext?.currentPage ?? "";

  const items: NavItem[] = isDashboard
    ? DASHBOARD_NAV.map((item, index) => ({
        ...item,
        href: hrefForDashboard(DASHBOARD_SEGMENTS[index]),
      }))
    : buildSiteNav(accountHref);

  const isActive = (item: NavItem, index: number) => {
    if (isDashboard) {
      return DASHBOARD_SEGMENTS[index] === resolvedCurrentPage;
    }
    if (item.match) return item.match(pathname);
    return pathname === item.href;
  };

  if (!mounted) return null;

  // Traveller dashboard: show only when sidebar sheet is active (below md). Else: below lg.
  const visibilityClass = isDashboard ? "md:hidden" : "lg:hidden";

  return createPortal(
    <motion.nav
      initial={{ y: 48 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={`fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white/95 shadow-lg backdrop-blur-xl ${visibilityClass}`}
      aria-label={isDashboard ? "Dashboard navigation" : "Site navigation"}
    >
      <div className="flex items-center justify-around px-1 pt-0.5 pb-[max(0.25rem,env(safe-area-inset-bottom))]">
        {items.map((item, index) => {
          const active = isActive(item, index);
          const showProfile = item.useProfile && isAuthenticated;

          return (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.04 }}
            >
              <Link
                href={item.href}
                className={`flex min-w-[3.5rem] flex-col items-center gap-0.5 rounded-lg px-2 py-1 transition-colors duration-200 ${
                  active ? "text-emerald-600" : "text-gray-500"
                }`}
              >
                <div
                  className={`flex h-7 w-7 items-center justify-center rounded-md ${
                    active && !showProfile ? "bg-emerald-100" : ""
                  }`}
                >
                  <NavIcon
                    item={item}
                    active={active}
                    user={showProfile ? session?.user : undefined}
                  />
                </div>
                <span className="text-[10px] font-medium leading-none">{item.name}</span>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </motion.nav>,
    document.body
  );
}
