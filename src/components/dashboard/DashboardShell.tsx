"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import DashboardSidebar from "./DashboardSidebar";
import DashboardHeader from "./DashboardHeader";
import SignOutDialog from "@/components/layout/header/SignOutDialog";

interface DashboardShellProps {
  children: React.ReactNode;
  currentPage?: string;
  buildPageHref?: (page: string) => string;
}

export default function DashboardShell({
  children,
  currentPage = "",
  buildPageHref = (p: string) => (p ? `#${p}` : "#"),
}: DashboardShellProps) {
  const [showSignOut, setShowSignOut] = useState(false);

  return (
    <SidebarProvider>
      <DashboardSidebar currentPage={currentPage} buildPageHref={buildPageHref} />

      <SidebarInset className="bg-[#f8f9fb] overflow-hidden">
        <DashboardHeader
          currentPage={currentPage}
          buildPageHref={buildPageHref}
        />
        <main className="flex-1 overflow-y-auto px-5 lg:px-8 py-6">
          {children}
        </main>
      </SidebarInset>

      <SignOutDialog isOpen={showSignOut} onClose={() => setShowSignOut(false)} />
    </SidebarProvider>
  );
}
