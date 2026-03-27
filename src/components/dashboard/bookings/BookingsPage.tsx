"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  CalendarDays,
  MapPin,
  Download,
  CheckCircle,
  Clock,
  XCircle,
  AlertCircle,
  Plane,
  Hash,
  Timer,
  Banknote,
  ArrowRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { BookingsPageSkeleton } from "@/components/dashboard/DashboardSkeletons";

type BookingStatus = "upcoming" | "completed" | "cancelled";

interface Booking {
  id: string;
  title: string;
  location: string;
  date: string;
  status: BookingStatus;
  price: string;
  duration: string;
}

const STATUS_CONFIG: Record<
  BookingStatus,
  { label: string; badge: string; icon: React.ElementType; dot: string }
> = {
  upcoming: {
    label: "Upcoming",
    badge: "bg-blue-50 text-blue-700 border-blue-200",
    icon: Clock,
    dot: "bg-blue-500",
  },
  completed: {
    label: "Completed",
    badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
    icon: CheckCircle,
    dot: "bg-emerald-500",
  },
  cancelled: {
    label: "Cancelled",
    badge: "bg-red-50 text-red-600 border-red-200",
    icon: XCircle,
    dot: "bg-red-500",
  },
};

const FILTER_TABS = ["all", "upcoming", "completed", "cancelled"] as const;
type FilterTab = (typeof FILTER_TABS)[number];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const cardItem = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

function CardSkeleton() {
  return (
    <div className="space-y-4 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <Skeleton className="h-14 w-14 rounded-2xl" />
          <div className="space-y-2">
            <Skeleton className="h-5 w-56" />
            <Skeleton className="h-3.5 w-40" />
          </div>
        </div>
        <Skeleton className="h-7 w-24 rounded-full" />
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-16 rounded-xl" />
        ))}
      </div>
      <div className="flex justify-end gap-2 border-t border-slate-100 pt-4">
        <Skeleton className="h-9 w-28 rounded-xl" />
        <Skeleton className="h-9 w-32 rounded-xl" />
      </div>
    </div>
  );
}

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<FilterTab>("all");

  useEffect(() => {
    const delay = new Promise((r) => setTimeout(r, 1500));
    Promise.all([
      fetch("/api/dashboard").then((r) => r.json()),
      delay,
    ])
      .then(([data]) => { setBookings(data.bookings ?? []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const filtered = bookings.filter((b) => activeFilter === "all" || b.status === activeFilter);
  const counts = bookings.reduce((acc, b) => { acc[b.status] = (acc[b.status] ?? 0) + 1; return acc; }, {} as Record<string, number>);

  if (loading) return <BookingsPageSkeleton />;

  const statCards = [
    { label: "Total",     value: bookings.length,        icon: CalendarDays, gradient: "from-blue-500 to-blue-600",    shadow: "shadow-blue-100" },
    { label: "Upcoming",  value: counts.upcoming ?? 0,   icon: Clock,        gradient: "from-violet-500 to-violet-600", shadow: "shadow-violet-100" },
    { label: "Completed", value: counts.completed ?? 0,  icon: CheckCircle,  gradient: "from-emerald-500 to-teal-500",  shadow: "shadow-emerald-100" },
    { label: "Cancelled", value: counts.cancelled ?? 0,  icon: AlertCircle,  gradient: "from-rose-500 to-pink-500",     shadow: "shadow-rose-100" },
  ];

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-6 pb-8"
    >
      {/* Header */}
      <motion.div variants={cardItem} className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Bookings
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            View and manage all your upcoming and past bookings in one place.
          </p>
        </div>
      </motion.div>

      {/* Stat cards */}
      <motion.div
        variants={cardItem}
        className="grid grid-cols-2 gap-4 lg:grid-cols-4"
      >
        {statCards.map((s) => (
          <motion.div
            key={s.label}
            whileHover={{ y: -4 }}
            className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-lg hover:shadow-slate-200/50"
          >
            <div
              className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${s.gradient} shadow-md ${s.shadow}`}
            >
              <s.icon className="h-6 w-6 text-white" />
            </div>
            {loading ? (
              <Skeleton className="mb-1 h-8 w-14" />
            ) : (
              <p className="text-3xl font-bold tracking-tight text-slate-900">
                {s.value}
              </p>
            )}
            <p className="mt-0.5 text-sm font-medium text-slate-500">
              {s.label}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* Filter tabs */}
      <motion.div
        variants={cardItem}
        className="flex w-fit items-center gap-1 rounded-xl border border-slate-200 bg-slate-50/80 p-1.5"
      >
        {FILTER_TABS.map((tab) => (
          <motion.button
            key={tab}
            onClick={() => setActiveFilter(tab)}
            aria-pressed={activeFilter === tab}
            whileTap={{ scale: 0.97 }}
            className={cn(
              "relative rounded-lg px-4 py-2.5 text-xs font-semibold capitalize transition-colors",
              activeFilter === tab
                ? "text-slate-900"
                : "text-slate-500 hover:text-slate-700"
            )}
          >
            {activeFilter === tab && (
              <motion.div
                layoutId="filterPill"
                className="absolute inset-0 rounded-lg bg-white shadow-sm ring-1 ring-slate-200/50"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10">
              {tab} ({tab === "all" ? bookings.length : counts[tab] ?? 0})
            </span>
          </motion.button>
        ))}
      </motion.div>

      {/* Cards */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeFilter}
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-4"
        >
          {loading ? (
            [...Array(3)].map((_, i) => <CardSkeleton key={i} />)
          ) : filtered.length === 0 ? (
            <motion.div
              variants={cardItem}
              className="rounded-2xl border border-slate-200/80 bg-white py-24 text-center shadow-sm"
            >
              <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100">
                <Plane className="h-10 w-10 text-slate-300" />
              </div>
              <p className="text-lg font-semibold text-slate-600">
                No bookings found
              </p>
              <p className="mt-2 text-sm text-slate-400">
                {activeFilter === "all"
                  ? "Start your adventure by booking a tour!"
                  : `No ${activeFilter} bookings.`}
              </p>
            </motion.div>
          ) : (
            filtered.map((booking) => {
              const sc = STATUS_CONFIG[booking.status];
              return (
                <motion.div
                  key={booking.id}
                  variants={cardItem}
                  whileHover={{ y: -2 }}
                  className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition-all duration-300 hover:shadow-lg hover:shadow-slate-200/40"
                >
                  <div className="p-6">
                    {/* Header */}
                    <div className="mb-5 flex items-start justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-50 to-emerald-50 ring-1 ring-teal-100/50">
                          <CalendarDays className="h-7 w-7 text-teal-600" />
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">
                            {booking.title}
                          </p>
                          <p className="mt-0.5 flex items-center gap-1.5 text-sm text-slate-500">
                            <MapPin className="h-3.5 w-3.5 text-slate-400" />
                            {booking.location}
                          </p>
                        </div>
                      </div>
                      <Badge
                        variant="outline"
                        className={cn(
                          "shrink-0 gap-1.5 rounded-full px-3.5 py-1 text-xs font-semibold",
                          sc.badge
                        )}
                      >
                        <span
                          className={cn("h-1.5 w-1.5 rounded-full", sc.dot)}
                        />
                        {sc.label}
                      </Badge>
                    </div>

                    {/* Details */}
                    <div className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                      {[
                        {
                          label: "Booking ID",
                          value: `#${booking.id}`,
                          icon: Hash,
                        },
                        { label: "Date", value: booking.date, icon: CalendarDays },
                        {
                          label: "Duration",
                          value: booking.duration,
                          icon: Timer,
                        },
                        { label: "Amount", value: booking.price, icon: Banknote },
                      ].map((d) => (
                        <div
                          key={d.label}
                          className="rounded-xl border border-slate-100 bg-slate-50/80 px-4 py-3"
                        >
                          <div className="mb-1 flex items-center gap-2">
                            <d.icon className="h-3.5 w-3.5 text-slate-400" />
                            <p className="text-xs font-medium text-slate-400">
                              {d.label}
                            </p>
                          </div>
                          <p className="text-sm font-bold text-slate-800">
                            {d.value}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap items-center justify-end gap-2 border-t border-slate-100 pt-4">
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-9 gap-2 rounded-xl border-slate-200 text-xs font-medium hover:bg-slate-50"
                      >
                        <Download className="h-3.5 w-3.5" />
                        Voucher
                      </Button>
                      <Button
                        size="sm"
                        className="h-9 gap-2 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-600 text-xs font-medium text-white shadow-md hover:from-teal-600 hover:to-emerald-700"
                      >
                        View Details
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Button>
                      {booking.status === "upcoming" && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-9 rounded-xl border-red-200 text-xs font-medium text-red-600 hover:bg-red-50"
                        >
                          Cancel
                        </Button>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })
          )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
