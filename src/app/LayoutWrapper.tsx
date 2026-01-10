"use client";

import { usePathname } from "next/navigation";
import { SessionProvider } from "next-auth/react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Hide header/footer for /auth routes (login/signup)
  const hideLayoutForAuth = pathname?.startsWith("/auth");

  return (
    <SessionProvider>
      {!hideLayoutForAuth && <Header />}
      <main>{children}</main>
      {!hideLayoutForAuth && <Footer />}
    </SessionProvider>
  );
}
