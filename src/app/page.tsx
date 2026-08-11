import Home from "@/components/landing/Home";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description: "Welcome to BD Travel Spirit. Discover the best travel packages, destinations, and local guides in Bangladesh.",
};

export default function HomePage() {
  return (
    <main className="min-h-screen mt-16">
      <Home />
    </main>
  );
}
