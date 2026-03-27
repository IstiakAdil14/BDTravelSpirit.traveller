"use client";

import Link from "next/link";
import { useState } from "react";
import { useSession } from "next-auth/react";
import {
  LayoutDashboard,
  Star,
  Inbox,
  CalendarDays,
  LogOut,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

import { cn } from "@/lib/utils";
import SignOutDialog from "@/components/layout/header/SignOutDialog";

const NAV_ITEMS = [
  { label: "My Account", segment: "", icon: LayoutDashboard },
  { label: "Inbox", segment: "inbox", icon: Inbox },
  { label: "Bookings", segment: "bookings", icon: CalendarDays },
  { label: "Reviews", segment: "reviews", icon: Star },
];

interface DashboardSidebarProps {
  currentPage: string;
  buildPageHref: (page: string) => string;
}

export default function DashboardSidebar({
  currentPage,
  buildPageHref,
}: DashboardSidebarProps) {
  const { data: session } = useSession();
  const [showSignOut, setShowSignOut] = useState(false);

  return (
    <>
      <Sidebar collapsible="icon">
        {/* ── HEADER ── */}
        <SidebarHeader className="border-b border-sidebar-border px-4 py-5">
          <div className="flex items-center gap-3 px-1 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0">
            
            {/* Logo */}
            <div className="h-11 w-11 shrink-0 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 p-[2px] shadow-lg shadow-emerald-500/30">
              <div className="flex h-full w-full items-center justify-center rounded-lg bg-teal-900">
                <span className="text-sm font-bold text-white">BD</span>
              </div>
            </div>

            {/* Text */}
            <div className="min-w-0 group-data-[collapsible=icon]:hidden">
              <p className="text-sm font-bold uppercase tracking-widest text-emerald-300">
                BD Travel Spirit
              </p>
              <p className="text-xs text-sidebar-foreground/50">
                Traveller Dashboard
              </p>
            </div>
          </div>
        </SidebarHeader>

        {/* ── CONTENT ── */}
        <SidebarContent className="px-3 py-3 group-data-[collapsible=icon]:px-0">
          <SidebarGroup>
            <SidebarGroupLabel className="text-sidebar-foreground/40 uppercase tracking-widest text-[10px] px-3 mb-1 group-data-[collapsible=icon]:hidden">
              Navigation
            </SidebarGroupLabel>

            <SidebarGroupContent>
              <SidebarMenu className="gap-2 px-2 group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:items-center">

                {NAV_ITEMS.map((navItem) => {
                  const active = currentPage === navItem.segment;

                  return (
                    <SidebarMenuItem
                      key={navItem.label}
                      className="group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:justify-center"
                    >
                      <SidebarMenuButton
                        asChild
                        isActive={active}
                        tooltip={navItem.label}
                        size="lg"
                        className={cn(
                          "rounded-xl transition-all duration-200 font-medium text-sm flex items-center gap-3 px-3 py-2",

                          // ✅ FIXED ICON MODE
                          "group-data-[collapsible=icon]:h-12 group-data-[collapsible=icon]:w-12 group-data-[collapsible=icon]:p-0 group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:justify-center",

                          active
                            ? "bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/30"
                            : "text-sidebar-foreground/70 hover:bg-white/10 hover:text-sidebar-foreground"
                        )}
                      >
                        <Link
                          href={buildPageHref(navItem.segment)}
                          aria-current={active ? "page" : undefined}
                          className="flex items-center gap-3 group-data-[collapsible=icon]:justify-center"
                        >
                          <navItem.icon
                            className={cn(
                              "h-5 w-5 shrink-0",
                              active ? "text-white" : ""
                            )}
                          />

                          {/* Hidden in icon mode */}
                          <span className="group-data-[collapsible=icon]:hidden">
                            {navItem.label}
                          </span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        {/* ── FOOTER ── */}
        <SidebarFooter className="border-t border-sidebar-border px-4 py-3 group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:items-center">
          <SidebarMenu>
            <SidebarMenuItem className="group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:justify-center">
              <SidebarMenuButton
                tooltip="Sign out"
                size="lg"
                onClick={() => setShowSignOut(true)}
                className={cn(
                  "rounded-xl transition-all duration-200 font-medium text-sm flex items-center gap-3 px-3 py-2",
                  
                  // ✅ FIXED ICON MODE
                  "group-data-[collapsible=icon]:h-12 group-data-[collapsible=icon]:w-12 group-data-[collapsible=icon]:p-0 group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:justify-center",

                  "text-sidebar-foreground/70 hover:bg-red-500/10 hover:text-red-400"
                )}
              >
                <LogOut className="h-5 w-5 shrink-0" />
                <span className="group-data-[collapsible=icon]:hidden">
                  Sign out
                </span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>

        <SidebarRail />
      </Sidebar>

      <SignOutDialog
        isOpen={showSignOut}
        onClose={() => setShowSignOut(false)}
      />
    </>
  );
}