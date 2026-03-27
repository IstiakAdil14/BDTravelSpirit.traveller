"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Bell, Search, ChevronRight, Home, Sparkles } from "lucide-react";
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import SignOutDialog from "@/components/layout/header/SignOutDialog";

const PAGE_LABELS: Record<string, string> = {
  "": "Dashboard", bookings: "Bookings", reviews: "Reviews",
  inbox: "Inbox", favorites: "Favourites", payments: "Payments", settings: "Settings",
};

interface DashboardHeaderProps {
  currentPage?: string;
  buildPageHref?: (page: string) => string;
}

export default function DashboardHeader({ currentPage = "", buildPageHref }: DashboardHeaderProps) {
  const { data: session } = useSession();
  const [showSignOut, setShowSignOut] = useState(false);
  const user = session?.user;
  const pageLabel = PAGE_LABELS[currentPage] ?? currentPage;

  return (
    <>
      <motion.header
        initial={{ y: -8, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="sticky top-0 z-30 h-16 bg-white/90 backdrop-blur-xl border-b border-slate-100/80 flex items-center px-4 lg:px-6 gap-4 shadow-sm shadow-slate-100/50"
      >
        {/* SidebarTrigger — works for both mobile sheet and desktop collapse */}
        <SidebarTrigger className="shrink-0 rounded-xl hover:bg-emerald-50 hover:text-emerald-600 text-slate-600" />

        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="hidden md:flex items-center gap-1.5 flex-1 min-w-0">
          <div className="flex items-center gap-1.5 text-sm">
            <Link href="/" className="text-slate-400 hover:text-emerald-500 transition-colors" aria-label="Go to home">
              <Home className="w-3.5 h-3.5" />
            </Link>
            <ChevronRight className="w-3 h-3 text-slate-300" />
            {currentPage !== "" ? (
              <>
                {buildPageHref ? (
                  <Link href={buildPageHref("")} className="text-slate-400 hover:text-emerald-500 transition-colors text-sm">
                    Dashboard
                  </Link>
                ) : (
                  <span className="text-slate-400 text-sm">Dashboard</span>
                )}
                <ChevronRight className="w-3 h-3 text-slate-300" />
                <span className="font-semibold text-slate-800 text-sm">{pageLabel}</span>
              </>
            ) : (
              <span className="font-semibold text-slate-800 text-sm">Dashboard</span>
            )}
          </div>
        </nav>

        <div className="flex items-center gap-2 ml-auto shrink-0">
          {/* Search */}
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <Input
              placeholder="Search…"
              className="pl-9 pr-12 h-9 w-52 bg-slate-50 border-slate-200 text-sm rounded-xl focus-visible:ring-emerald-400/30 focus-visible:border-emerald-400 transition-all focus-visible:w-64"
              aria-label="Search dashboard"
            />
            <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded font-mono">⌘K</kbd>
          </div>

          {/* Notifications */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="ghost" size="icon"
              className="relative h-9 w-9 rounded-xl hover:bg-emerald-50 hover:text-emerald-600"
              aria-label="View notifications"
            >
              <Bell className="w-4 h-4 text-slate-600" />
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-500 rounded-full ring-2 ring-white"
                aria-hidden="true"
              />
            </Button>
          </motion.div>

          {/* User dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2.5 rounded-xl px-2.5 py-1.5 hover:bg-emerald-50 border border-transparent hover:border-emerald-200 transition-all"
                aria-label="User menu"
              >
                <Avatar className="w-7 h-7 ring-2 ring-emerald-200">
                  <AvatarImage src={user?.image ? `/api/user/avatar?u=${user?.id ?? ""}` : ""} alt={user?.name ?? "User"} />
                  <AvatarFallback className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-bold">
                    {user?.name?.[0]?.toUpperCase() ?? "T"}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden sm:block text-sm font-semibold text-slate-700 max-w-[90px] truncate">
                  {user?.name?.split(" ")[0] ?? "Traveller"}
                </span>
              </motion.button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 rounded-2xl shadow-xl border-slate-100 p-1.5">
              <DropdownMenuLabel className="font-normal px-3 py-2">
                <div className="flex items-center gap-3">
                  <Avatar className="w-9 h-9">
                    <AvatarImage src={user?.image ? `/api/user/avatar?u=${user?.id ?? ""}` : ""} alt={user?.name ?? "User"} />
                    <AvatarFallback className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-bold">
                      {user?.name?.[0]?.toUpperCase() ?? "T"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-slate-900 text-sm truncate">{user?.name ?? "Traveller"}</p>
                    <p className="text-xs text-slate-400 truncate">{user?.email ?? ""}</p>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-slate-100" />
              <DropdownMenuItem className="rounded-xl text-sm cursor-pointer gap-2 hover:bg-emerald-50 focus:bg-emerald-50">
                <Sparkles className="w-3.5 h-3.5 text-emerald-500" /> Upgrade Plan
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-slate-100" />
              <DropdownMenuItem
                className="rounded-xl text-sm cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50"
                onClick={() => setShowSignOut(true)}
              >
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </motion.header>

      <SignOutDialog isOpen={showSignOut} onClose={() => setShowSignOut(false)} />
    </>
  );
}
