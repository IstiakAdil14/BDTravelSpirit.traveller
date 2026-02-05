"use client";

import { usePathname } from "next/navigation";
import { SessionProvider } from "next-auth/react";
import { QueryProvider } from "@/lib/providers/QueryProvider";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import FloatingAIButton from "@/components/layout/FloatingAIButton";
import { Toaster } from "sonner";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Hide header/footer for /auth routes and dashboard routes
  const hideLayoutForAuth = pathname?.startsWith("/auth");
  const hideLayoutForDashboard = pathname?.startsWith("/dashboard");
  const hideLayout = hideLayoutForAuth || hideLayoutForDashboard;

  return (
    <SessionProvider>
      <QueryProvider>
        {!hideLayout && <Header />}
        <main>{children}</main>
        {!hideLayout && <Footer />}
        {!hideLayoutForAuth && <FloatingAIButton />}
        <Toaster position="bottom-center" />
      </QueryProvider>
    </SessionProvider>
  );
}
