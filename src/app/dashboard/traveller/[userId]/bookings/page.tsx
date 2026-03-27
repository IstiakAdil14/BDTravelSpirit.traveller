"use client";

import { useParams } from "next/navigation";
import DashboardShell from "@/components/dashboard/DashboardShell";
import BookingsPage from "@/components/dashboard/bookings/BookingsPage";

export default function BookingsRoute() {
  const params = useParams();
  const encodedUserId = params.userId as string;

  const buildPageHref = (segment: string) =>
    segment
      ? `/dashboard/traveller/${encodedUserId}/${segment}`
      : `/dashboard/traveller/${encodedUserId}`;

  return (
    <DashboardShell currentPage="bookings" buildPageHref={buildPageHref}>
      <BookingsPage />
    </DashboardShell>
  );
}
