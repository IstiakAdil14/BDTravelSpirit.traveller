"use client";

import { Suspense } from "react";
import { usePathname } from "next/navigation";
import { SessionProvider } from "next-auth/react";
import { QueryProvider } from "@/lib/providers/QueryProvider";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import BottomNav from "@/components/layout/BottomNav";
import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SocketProvider } from "@/components/chat/SocketProvider";
import TravelerChatWidget from "@/components/chat/TravelerChatWidget";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Hide header/footer for /auth routes and dashboard routes
  const hideLayoutForAuth = pathname?.startsWith("/auth");
  const hideLayoutForDashboard = pathname?.startsWith("/dashboard");
  const hideLayout = hideLayoutForAuth || hideLayoutForDashboard;
  const showBottomNav = !hideLayoutForAuth;

  return (
    <SessionProvider>
      <SocketProvider>
        <QueryProvider>
        <TooltipProvider>
          {!hideLayout && <Header />}
          {showBottomNav && !hideLayoutForDashboard ? (
            <div className="pb-[calc(3rem+env(safe-area-inset-bottom))] lg:pb-0">
              {children}
            </div>
          ) : (
            children
          )}
          {!hideLayout && <Footer />}
          {!hideLayoutForAuth }
          {showBottomNav && (
            <Suspense fallback={null}>
              <BottomNav />
            </Suspense>
          )}
          <Toaster position="bottom-center" />
          <TravelerChatWidget />
        </TooltipProvider>
        </QueryProvider>
      </SocketProvider>
    </SessionProvider>
  );
}
