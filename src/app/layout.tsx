import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "./LayoutWrapper"; // client-side wrapper
import { SessionProvider } from "next-auth/react";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  preload: false,
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  preload: false,
});

// Metadata (same as your previous setup)
export const metadata: Metadata = {
  title: "BD Travel Spirit - Discover Bangladesh's Hidden Gems",
  description:
    "Explore Bangladesh's breathtaking destinations, cultural heritage, and adventure experiences with BD Travel Spirit.",
  // ... all other metadata
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: "BD Travel Spirit",
  description:
    "Explore Bangladesh's breathtaking destinations, cultural heritage, and adventure experiences with BD Travel Spirit.",
  url: "https://bdtravelspirit.com",
  logo: "https://bdtravelspirit.com/logo.png",
  sameAs: [
    "https://facebook.com/bdtravelspirit",
    "https://twitter.com/bdtravelspirit",
    "https://instagram.com/bdtravelspirit",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+880-123-456-7890",
    contactType: "customer service",
    areaServed: "BD",
    availableLanguage: "en",
  },
  address: {
    "@type": "PostalAddress",
    addressCountry: "BD",
    addressLocality: "Dhaka",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${plusJakartaSans.variable} ${inter.variable} antialiased font-inter`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
