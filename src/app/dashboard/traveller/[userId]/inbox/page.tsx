"use client";

import { useParams } from "next/navigation";
import DashboardShell from "@/components/dashboard/DashboardShell";
import InboxPage from "@/components/dashboard/inbox/InboxPage";
export default function InboxRoute() {
  const params = useParams();
  const encodedUserId = params.userId as string;

  const buildPageHref = (segment: string) =>
    segment
      ? `/dashboard/traveller/${encodedUserId}/${segment}`
      : `/dashboard/traveller/${encodedUserId}`;

  return (
    <DashboardShell currentPage="inbox" buildPageHref={buildPageHref}>
      <InboxPage />
    </DashboardShell>
  );
}
