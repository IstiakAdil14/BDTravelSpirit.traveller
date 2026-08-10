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
  Loader2,
  X,
} from "lucide-react";
import { createPortal } from "react-dom";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Modal } from "@/components/ui/modal";
import { BookingsPageSkeleton } from "@/components/dashboard/DashboardSkeletons";

type BookingStatus = "upcoming" | "pending" | "confirmed" | "completed" | "cancelled" | "refunded" | "no-show";

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
  pending: {
    label: "Pending",
    badge: "bg-amber-50 text-amber-700 border-amber-200",
    icon: Clock,
    dot: "bg-amber-500",
  },
  confirmed: {
    label: "Confirmed",
    badge: "bg-teal-50 text-teal-700 border-teal-200",
    icon: CheckCircle,
    dot: "bg-teal-500",
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
  refunded: {
    label: "Refunded",
    badge: "bg-purple-50 text-purple-600 border-purple-200",
    icon: XCircle,
    dot: "bg-purple-500",
  },
  "no-show": {
    label: "No Show",
    badge: "bg-slate-50 text-slate-600 border-slate-200",
    icon: XCircle,
    dot: "bg-slate-500",
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
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [bookingToCancel, setBookingToCancel] = useState<Booking | null>(null);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [isCancelling, setIsCancelling] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 4;
  const { data: session } = useSession();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleDownloadVoucher = async (booking: Booking) => {
    try {
      setDownloadingId(booking.id);
      
      // Dynamically import to prevent SSR issues and reduce initial bundle size
      const { pdf } = await import('@react-pdf/renderer');
      const VoucherPDF = (await import('./VoucherPDF')).default;
      
      const userName = session?.user?.name || "Traveler";
      const extendedBooking = { ...booking, travelerName: userName };
      const blob = await pdf(<VoucherPDF booking={extendedBooking} />).toBlob();
      
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Voucher-${booking.id}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      toast.success("Voucher downloaded successfully!");
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Failed to generate voucher. Please try again.");
    } finally {
      setDownloadingId(null);
    }
  };

  const handleCancelBooking = async () => {
    if (!bookingToCancel) return;
    try {
      setIsCancelling(true);
      const res = await fetch(`/api/bookings/${bookingToCancel.id}/cancel`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reason: cancelReason || "User requested cancellation" }),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to cancel booking");

      toast.success(
        <div>
          <p className="font-semibold">Booking Cancelled</p>
          <p className="text-sm">Refund Amount: ৳{data.refundAmount}</p>
        </div>
      );
      
      // Close modal and refresh data
      setIsCancelModalOpen(false);
      setBookingToCancel(null);
      setCancelReason("");
      
      const refreshRes = await fetch("/api/dashboard");
      const refreshData = await refreshRes.json();
      setBookings(refreshData.bookings ?? []);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsCancelling(false);
    }
  };

  useEffect(() => {
    const delay = new Promise((r) => setTimeout(r, 1500));
    Promise.all([
      fetch("/api/dashboard").then((r) => r.json()),
      delay,
    ])
      .then(([data]) => { setBookings(data.bookings ?? []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const filtered = bookings.filter((b) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "upcoming") return ["upcoming", "pending", "confirmed"].includes(b.status);
    return b.status === activeFilter;
  });
  const counts = bookings.reduce((acc, b) => { 
    // Group upcoming/pending/confirmed into 'upcoming' for the filter counts
    const filterKey = ["upcoming", "pending", "confirmed"].includes(b.status) ? "upcoming" : b.status;
    acc[filterKey] = (acc[filterKey] ?? 0) + 1; 
    return acc; 
  }, {} as Record<string, number>);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginatedBookings = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

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
            onClick={() => { setActiveFilter(tab); setCurrentPage(1); }}
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
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {loading ? (
            [...Array(ITEMS_PER_PAGE)].map((_, i) => <CardSkeleton key={i} />)
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
            paginatedBookings.map((booking) => {
              const sc = STATUS_CONFIG[booking.status] || STATUS_CONFIG.upcoming;
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
                        onClick={() => handleDownloadVoucher(booking)}
                        disabled={downloadingId === booking.id}
                        className="h-9 gap-2 rounded-xl border-slate-200 text-xs font-medium hover:bg-slate-50"
                      >
                        {downloadingId === booking.id ? (
                          <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        ) : (
                          <Download className="h-3.5 w-3.5" />
                        )}
                        Voucher
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => {
                          setSelectedBooking(booking);
                          setIsModalOpen(true);
                        }}
                        className="h-9 gap-2 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-600 text-xs font-medium text-white shadow-md hover:from-teal-600 hover:to-emerald-700"
                      >
                        View Details
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Button>
                      {["upcoming", "pending", "confirmed"].includes(booking.status) && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setBookingToCancel(booking);
                            setCancelReason("");
                            setIsCancelModalOpen(true);
                          }}
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

      {/* Pagination Controls */}
      {!loading && totalPages > 1 && (
        <div className="mt-8 flex items-center justify-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="rounded-xl border-slate-200"
          >
            Previous
          </Button>
          <span className="text-sm font-medium text-slate-600">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="rounded-xl border-slate-200"
          >
            Next
          </Button>
        </div>
      )}

      {/* Booking Details Modal */}
      {mounted && isModalOpen && selectedBooking && createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden relative animate-in fade-in zoom-in duration-200">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white relative">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-1.5 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <h3 className="text-xl font-bold flex items-center gap-2">
                <CalendarDays className="w-6 h-6" />
                Booking Details
              </h3>
              <p className="text-blue-100 text-sm mt-1">Full information about your trip</p>
            </div>

            <div className="p-6 space-y-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg text-slate-900">{selectedBooking.title}</h3>
                  <p className="text-sm text-slate-500 flex items-center gap-1 mt-1">
                    <MapPin className="h-4 w-4" /> {selectedBooking.location}
                  </p>
                </div>
                <Badge
                  variant="outline"
                  className={cn(
                    "shrink-0 gap-1.5 rounded-full px-3.5 py-1 text-xs font-semibold capitalize",
                    STATUS_CONFIG[selectedBooking.status]?.badge || STATUS_CONFIG.upcoming.badge
                  )}
                >
                  <span className={cn("h-1.5 w-1.5 rounded-full", STATUS_CONFIG[selectedBooking.status]?.dot || STATUS_CONFIG.upcoming.dot)} />
                  {STATUS_CONFIG[selectedBooking.status]?.label || "Upcoming"}
                </Badge>
              </div>
              
              <div className="grid grid-cols-2 gap-4 bg-slate-50 rounded-xl p-4 border border-slate-100">
                <div>
                  <p className="text-xs text-slate-500 mb-1 flex items-center gap-1"><Hash className="h-3.5 w-3.5"/> Booking ID</p>
                  <p className="text-sm font-mono font-medium text-slate-900">#{selectedBooking.id}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1 flex items-center gap-1"><CalendarDays className="h-3.5 w-3.5"/> Date</p>
                  <p className="text-sm font-medium text-slate-900">{selectedBooking.date}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1 flex items-center gap-1"><Timer className="h-3.5 w-3.5"/> Duration</p>
                  <p className="text-sm font-medium text-slate-900">{selectedBooking.duration || "N/A"}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1 flex items-center gap-1"><Banknote className="h-3.5 w-3.5"/> Total Price</p>
                  <p className="text-sm font-bold text-gray-900">{selectedBooking.price}</p>
                </div>
              </div>
              
              <div className="pt-4 flex gap-3">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 bg-white hover:bg-slate-50 text-slate-700 font-semibold py-3.5 rounded-xl border border-slate-200 transition-all"
                >
                  Close
                </button>
                <Link
                  href={`/dashboard?role=${(session?.user as any)?.role || 'traveler'}&id=${session?.user?.id}&page=booking-details&bookingId=${selectedBooking.id}`}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3.5 rounded-xl transition-all shadow-md text-center inline-flex items-center justify-center gap-2"
                  onClick={() => setIsModalOpen(false)}
                >
                  Full Details <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* Cancellation Modal */}
      {mounted && isCancelModalOpen && bookingToCancel && createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden relative animate-in fade-in zoom-in duration-200">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white relative">
              <button 
                onClick={() => !isCancelling && setIsCancelModalOpen(false)}
                disabled={isCancelling}
                className="absolute top-4 right-4 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-1.5 rounded-full transition-colors disabled:opacity-50"
              >
                <X className="w-5 h-5" />
              </button>
              <h3 className="text-xl font-bold flex items-center gap-2">
                <AlertCircle className="w-6 h-6" />
                Cancel Booking
              </h3>
              <p className="text-blue-100 text-sm mt-1">Review cancellation details</p>
            </div>

            <div className="p-6 space-y-6">
              <div className="rounded-xl bg-blue-50 p-4 text-blue-900 text-sm border border-blue-100">
                <p className="font-bold flex items-center gap-2 mb-2 text-base text-blue-900">
                  <AlertCircle className="h-4 w-4" />
                  Are you sure?
                </p>
                <p className="mb-1">You are about to cancel your booking for <strong>{bookingToCancel.title}</strong>.</p>
                <p className="opacity-90">Refunds are processed according to the tour's cancellation policy.</p>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="reason" className="text-sm font-medium text-gray-700">
                  Reason for cancellation (Optional)
                </label>
                <textarea
                  id="reason"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm"
                  placeholder="E.g., Scheduling conflict, health reasons..."
                  rows={3}
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                  disabled={isCancelling}
                />
              </div>
              
              <div className="pt-4 flex flex-col gap-3">
                <button
                  onClick={handleCancelBooking}
                  disabled={isCancelling}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3.5 rounded-xl transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isCancelling ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Processing...</>
                  ) : (
                    'Confirm Cancellation'
                  )}
                </button>
                <button
                  onClick={() => setIsCancelModalOpen(false)}
                  disabled={isCancelling}
                  className="w-full bg-white hover:bg-gray-50 text-gray-700 font-semibold py-3.5 rounded-xl border border-gray-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Keep Booking
                </button>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </motion.div>
  );
}
