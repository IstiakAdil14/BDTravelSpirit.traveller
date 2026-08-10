"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { motion, type Variants } from "framer-motion";
import {
  Plane, Globe, Heart, Award, Star, CalendarDays,
  Compass, TrendingUp, CheckCircle2, Circle, Clock, ArrowRight,
  Sun, Mountain, MapPin, Camera, Loader2, CreditCard, Plus, Pencil, Trash2, MessageSquare, Settings
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import BookingsTable, { type Booking } from "./BookingsTable";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "");

function StripeCardForm({ 
  onSuccess, onCancel, editingAccount 
}: { 
  onSuccess: (pmId: string | null, label: string, accountId?: string) => void, 
  onCancel: () => void,
  editingAccount?: any 
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [label, setLabel] = useState(editingAccount?.label || "");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsProcessing(true);
    setError(null);
    
    if (editingAccount) {
      onSuccess(null, label, editingAccount.id);
      return;
    }

    const cardEl = elements.getElement(CardElement);
    if (!cardEl) return;

    const { error: pmError, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardEl,
    });

    if (pmError) {
      setError(pmError.message || "An error occurred");
      setIsProcessing(false);
      return;
    }

    onSuccess(paymentMethod.id, label);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="text-sm font-medium text-slate-700">Card Label (Optional)</label>
        <Input 
          placeholder="e.g. Personal Card, Business Card" 
          value={label} 
          onChange={(e) => setLabel(e.target.value)} 
          className="mt-1"
        />
      </div>
      
      {!editingAccount && (
        <div>
          <label className="text-sm font-medium text-slate-700 block mb-1">Card Details</label>
          <div className="p-3 border border-slate-200 rounded-xl bg-white shadow-sm">
            <CardElement options={{
              style: { base: { fontSize: '16px', color: '#334155', '::placeholder': { color: '#94a3b8' } } }
            }} />
          </div>
          {error && <p className="text-xs text-red-500 mt-2">{error}</p>}
        </div>
      )}

      <div className="pt-4 flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
        <Button type="submit" disabled={(!stripe && !editingAccount) || isProcessing} className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2">
          {isProcessing && <Loader2 className="h-4 w-4 animate-spin" />}
          {editingAccount ? "Update Label" : "Save Card"}
        </Button>
      </div>
    </form>
  );
}

interface Stats {
  totalTrips: number;
  placesVisited: number;
  wishlistItems: number;
  reviewsWritten: number;
}

interface WeekDay { day: string; val: number; count: number; }
interface ProgressItem { label: string; val: number; }
interface TravelTime { travelled: string; remaining: string; pct: number; }
interface OnboardingTask { label: string; done: boolean; }
interface ScheduleEvent { time: string; title: string; tag: string; color: string; }

interface TravellerDashboardProps {
  stats?: Stats;
  bookings?: Booking[];
  wishlistItems?: Array<{ id: string; name: string; location: string; price: string }>;
  cartItems?: Array<{ id: string; name: string; location: string; price: string }>;
  isLoading?: boolean;
  buildPageHref?: (page: string) => string;
  weeklyActivity?: WeekDay[];
  progress?: ProgressItem[];
  travelTime?: TravelTime;
  onboarding?: OnboardingTask[];
  schedule?: ScheduleEvent[];
  stripeAccounts?: Array<{
    id: string;
    label: string;
    stripeCustomerId: string;
    stripePaymentMethodId: string;
    card?: {
      brand: string;
      last4: string;
      expMonth: number;
      expYear: number;
    };
    isActive: boolean;
    isBackup: boolean;
  }>;
}

const PROGRESS_COLORS = [
  "bg-gradient-to-r from-emerald-500 to-teal-500",
  "bg-gradient-to-r from-teal-500 to-emerald-600",
  "bg-gradient-to-r from-emerald-400 to-teal-400",
  "bg-gradient-to-r from-teal-600 to-emerald-500",
];

const DEFAULT_WEEK: WeekDay[] = [
  { day: "Sun", val: 0, count: 0 }, { day: "Mon", val: 0, count: 0 },
  { day: "Tue", val: 0, count: 0 }, { day: "Wed", val: 0, count: 0 },
  { day: "Thu", val: 0, count: 0 }, { day: "Fri", val: 0, count: 0 },
  { day: "Sat", val: 0, count: 0 },
];

const DEFAULT_PROGRESS: ProgressItem[] = [
  { label: "Destinations Explored", val: 0 },
  { label: "Bookings Completed", val: 0 },
  { label: "Reviews Written", val: 0 },
];

const DASHBOARD_PAGES = [
  { label: "My Bookings", href: "bookings", icon: CalendarDays, desc: "Manage your upcoming and past trips", bg: "bg-sky-50", text: "text-sky-600", border: "border-sky-200", hoverBg: "hover:bg-sky-100" },
  { label: "Inbox", href: "inbox", icon: MessageSquare, desc: "Messages with guides and support", bg: "bg-violet-50", text: "text-violet-600", border: "border-violet-200", hoverBg: "hover:bg-violet-100" },
  { label: "Favorites", href: "favorites", icon: Heart, desc: "Tours and places you saved", bg: "bg-rose-50", text: "text-rose-600", border: "border-rose-200", hoverBg: "hover:bg-rose-100" },
  { label: "Payments", href: "payments", icon: CreditCard, desc: "Manage your saved cards", bg: "bg-amber-50", text: "text-amber-600", border: "border-amber-200", hoverBg: "hover:bg-amber-100" },
  { label: "Reviews", href: "reviews", icon: Star, desc: "Your ratings and feedback", bg: "bg-emerald-50", text: "text-emerald-600", border: "border-emerald-200", hoverBg: "hover:bg-emerald-100" },
  { label: "Settings", href: "settings", icon: Settings, desc: "Profile and account preferences", bg: "bg-slate-50", text: "text-slate-600", border: "border-slate-200", hoverBg: "hover:bg-slate-100" },
];

const container: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } };
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
};

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

function getGreetingIcon() {
  const h = new Date().getHours();
  if (h < 12) return Sun;
  if (h < 17) return Compass;
  return MapPin;
}

export default function TravellerDashboard({
  stats = { totalTrips: 0, placesVisited: 0, wishlistItems: 0, reviewsWritten: 0 },
  bookings = [],
  isLoading = false,
  buildPageHref = (seg: string) => (seg ? `#${seg}` : "#"),
  weeklyActivity = DEFAULT_WEEK,
  progress = DEFAULT_PROGRESS,
  travelTime = { travelled: "0d", remaining: "30d", pct: 0 },
  onboarding = [],
  schedule = [],
  stripeAccounts = [],
}: TravellerDashboardProps) {
  const { data: session, update: updateSession } = useSession();
  const user = session?.user;
  const firstName = user?.name?.split(" ")[0] ?? "Traveller";
  const [activeDay, setActiveDay] = useState(() => new Date().getDay());
  const [avatarKey, setAvatarKey] = useState("");
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const GreetingIcon = getGreetingIcon();

  // Payment Methods State
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [editingAccount, setEditingAccount] = useState<any>(null);
  const [isSavingPayment, setIsSavingPayment] = useState(false);
  const [paymentToDelete, setPaymentToDelete] = useState<string | null>(null);

  const handleOpenPaymentModal = (acc?: any) => {
    if (acc) {
      setEditingAccount(acc);
    } else {
      setEditingAccount(null);
    }
    setIsPaymentModalOpen(true);
  };

  const handleSavePayment = async (pmId: string | null, label: string, accountId?: string) => {
    setIsSavingPayment(true);
    try {
      const payload = {
        id: accountId,
        label,
        stripePaymentMethodId: pmId,
      };
      
      const method = accountId ? "PUT" : "POST";
      const res = await fetch("/api/dashboard/stripe-accounts", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to save payment method");
      }
      
      setIsPaymentModalOpen(false);
      window.location.reload(); 
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Failed to save payment method.");
    } finally {
      setIsSavingPayment(false);
    }
  };

  const handleDeletePayment = async (id: string) => {
    try {
      const res = await fetch(`/api/dashboard/stripe-accounts?id=${id}`, {
        method: "DELETE"
      });
      if (!res.ok) throw new Error("Failed to delete payment method");
      toast.success("Payment method removed successfully");
      window.location.reload();
    } catch (err) {
      console.error(err);
      toast.error("Failed to remove payment method.");
    } finally {
      setPaymentToDelete(null);
    }
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingAvatar(true);
    try {
      // 1. Upload to assets
      const formData = new FormData();
      formData.append("file", file);

      const uploadRes = await fetch("/api/assets/upload", {
        method: "POST",
        body: formData,
      });

      if (!uploadRes.ok) throw new Error("Upload failed");
      const asset = await uploadRes.json();

      // 2. Link asset to user profile
      const updateRes = await fetch("/api/user/avatar/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ assetId: asset._id }),
      });

      if (!updateRes.ok) throw new Error("Avatar update failed");

      // 3. Force session reload so UI updates the picture
      setAvatarKey(`&t=${Date.now()}`);
      updateSession();
      window.location.reload();
    } catch (error) {
      console.error("Error updating avatar:", error);
      alert("Failed to update avatar. Please try again.");
    } finally {
      setIsUploadingAvatar(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const onboardingDone = onboarding.filter((t) => t.done).length;
  const onboardingPct = onboarding.length > 0
    ? Math.round((onboardingDone / onboarding.length) * 100)
    : 0;

  const peakDay = weeklyActivity.reduce((max, d) => d.val > max.val ? d : max, weeklyActivity[0]);

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6 pb-10">

      {/* ── GREETING BANNER ── */}
      <motion.div
        variants={fadeUp}
        className="relative overflow-hidden rounded-3xl p-7 text-white bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600"
      >
        <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-white/20 blur-3xl" />
        <div className="absolute -bottom-12 -left-12 h-48 w-48 rounded-full bg-teal-300/20 blur-3xl" />
        <div className="absolute right-8 top-6 opacity-[0.07]">
          <Plane className="h-40 w-40 rotate-12" strokeWidth={0.8} />
        </div>
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
              <GreetingIcon className="h-3 w-3" /> {getGreeting()}
            </div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl flex items-center gap-3">
              <Plane className="h-8 w-8 text-white/80" />
              Welcome in, <span className="text-white drop-shadow">{firstName}</span>
            </h1>
            <p className="mt-2 max-w-md text-sm text-white/80">
              You have{" "}
              <span className="font-semibold text-white">{stats.totalTrips} trips</span> booked and{" "}
              <span className="font-semibold text-white">{stats.reviewsWritten} reviews</span> shared.
              Keep exploring Bangladesh!
            </p>
          </div>
        </div>
      </motion.div>

      {/* ── DASHBOARD NAVIGATION ── */}
      <motion.div variants={fadeUp} className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {DASHBOARD_PAGES.map((page) => (
          <Link
            key={page.label}
            href={buildPageHref(page.href)}
            className={`flex items-start gap-4 p-5 rounded-2xl border ${page.border} ${page.bg} ${page.hoverBg} transition-all duration-200 hover:shadow-md group cursor-pointer`}
          >
            <div className="p-3 rounded-xl bg-white shadow-sm ring-1 ring-black/5 group-hover:scale-110 transition-transform duration-300">
              <page.icon className={`h-6 w-6 ${page.text}`} />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-base">{page.label}</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">{page.desc}</p>
            </div>
          </Link>
        ))}
      </motion.div>


      {/* ── MIDDLE ROW: Profile | Weekly Chart | Time Tracker ── */}
      <motion.div variants={fadeUp} className="grid gap-4 lg:grid-cols-3">

        {/* Profile Card */}
        <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-slate-200/70 bg-white p-6 shadow-sm text-center">
          <div className="relative group cursor-pointer" onClick={() => !isUploadingAvatar && fileInputRef.current?.click()}>
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*"
              onChange={handleAvatarChange} 
            />
            <div className="h-28 w-28 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 p-0.5 shadow-lg shadow-emerald-500/30 overflow-hidden relative">
              <Avatar className="h-full w-full rounded-[14px]">
                <AvatarImage
                  src={user?.id ? `/api/user/avatar?u=${user?.id}${avatarKey}` : ""}
                  alt={user?.name ?? "Traveller"}
                  className={`rounded-[14px] object-cover transition-opacity duration-300 ${isUploadingAvatar ? "opacity-50" : "group-hover:opacity-75"}`}
                />
                <AvatarFallback className="rounded-[14px] bg-slate-900 text-2xl font-bold text-white">
                  {user?.name?.[0]?.toUpperCase() ?? "T"}
                </AvatarFallback>
              </Avatar>
              
              {/* Overlay for uploading or hover */}
              <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${isUploadingAvatar ? "opacity-100" : "opacity-0 group-hover:opacity-100 bg-black/30"}`}>
                {isUploadingAvatar ? (
                  <Loader2 className="h-8 w-8 text-white animate-spin" />
                ) : (
                  <Camera className="h-8 w-8 text-white drop-shadow-md" />
                )}
              </div>
            </div>
            <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-400 ring-2 ring-white">
              <span className="h-2 w-2 rounded-full bg-white" />
            </span>
          </div>
          <div>
            <p className="text-base font-bold text-slate-900">{user?.name ?? "Traveller"}</p>
            <p className="text-xs text-slate-500">{user?.email ?? ""}</p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200">
            <Star className="h-3 w-3 fill-emerald-500 text-emerald-500" /> Explorer Member
          </span>
          <div className="grid w-full grid-cols-2 gap-2 pt-1">
            <div className="rounded-xl bg-slate-50 p-3">
              <p className="text-lg font-bold text-slate-900">{stats.totalTrips}</p>
              <p className="text-xs text-slate-500">Trips</p>
            </div>
            <div className="rounded-xl bg-slate-50 p-3">
              <p className="text-lg font-bold text-slate-900">{stats.placesVisited}</p>
              <p className="text-xs text-slate-500">Places</p>
            </div>
          </div>
        </div>

        {/* Weekly Bar Chart */}
        <div className="rounded-2xl border border-slate-200/70 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-800">Weekly Activity</h3>
            <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700">This week</span>
          </div>
          <div className="flex h-32 items-end gap-2">
            {weeklyActivity.map((d, i) => (
              <button
                key={d.day}
                onClick={() => setActiveDay(i)}
                className="group flex flex-1 flex-col items-center gap-1.5"
              >
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${Math.max(d.val, 4)}%` }}
                  transition={{ duration: 0.6, delay: i * 0.06, ease: "easeOut" }}
                  className={`w-full rounded-t-lg transition-colors ${
                    activeDay === i
                      ? "bg-gradient-to-t from-emerald-600 to-teal-400 shadow-md shadow-emerald-400/30"
                      : "bg-slate-100 group-hover:bg-emerald-100"
                  }`}
                />
                <span className={`text-[10px] font-medium ${activeDay === i ? "text-emerald-600" : "text-slate-400"}`}>
                  {d.day}
                </span>
              </button>
            ))}
          </div>
          <p className="mt-3 text-xs text-slate-400">
            {peakDay?.count > 0
              ? <>Peak: <span className="font-semibold text-slate-700">{peakDay.day} ({peakDay.count} bookings)</span></>
              : <span>No bookings this week yet</span>
            }
          </p>
        </div>

        {/* Circular Time Tracker */}
        <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-slate-200/70 bg-white p-6 shadow-sm">
          <h3 className="self-start text-sm font-semibold text-slate-800">Travel Time</h3>
          <div className="relative flex h-32 w-32 items-center justify-center">
            <svg className="absolute inset-0 -rotate-90" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="50" fill="none" stroke="#f1f5f9" strokeWidth="10" />
              <motion.circle
                cx="60" cy="60" r="50" fill="none"
                stroke="#10b981" strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray="314"
                initial={{ strokeDashoffset: 314 }}
                animate={{ strokeDashoffset: 314 * (1 - travelTime.pct / 100) }}
                transition={{ duration: 1.2, ease: "easeOut", delay: 0.4 }}
              />
            </svg>
            <div className="text-center">
              <p className="text-2xl font-bold text-slate-900">{travelTime.pct}%</p>
              <p className="text-[10px] text-slate-500">of goal</p>
            </div>
          </div>
          <div className="grid w-full grid-cols-2 gap-2 text-center">
            <div className="rounded-xl bg-emerald-50 p-2.5">
              <p className="text-sm font-bold text-emerald-700">{travelTime.travelled}</p>
              <p className="text-[10px] text-slate-500">Travelled</p>
            </div>
            <div className="rounded-xl bg-slate-50 p-2.5">
              <p className="text-sm font-bold text-slate-700">{travelTime.remaining}</p>
              <p className="text-[10px] text-slate-500">Remaining</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── PROGRESS OVERVIEW ── */}
      <motion.div variants={fadeUp} className="rounded-2xl border border-slate-200/70 bg-white p-6 shadow-sm">
        <h2 className="mb-5 text-sm font-semibold uppercase tracking-wider text-slate-500">Travel Progress</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {progress.map((p, i) => (
            <div key={p.label}>
              <div className="mb-1.5 flex items-center justify-between">
                <span className="text-sm font-medium text-slate-700">{p.label}</span>
                <span className="text-sm font-bold text-slate-900">{p.val}%</span>
              </div>
              <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${p.val}%` }}
                  transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
                  className={`h-full rounded-full ${PROGRESS_COLORS[i % PROGRESS_COLORS.length]}`}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ── BOTTOM ROW: Onboarding + Schedule ── */}
      <motion.div variants={fadeUp} className="grid gap-4 lg:grid-cols-5">

        {/* Onboarding + Tasks */}
        <div className="lg:col-span-2 rounded-2xl border border-slate-200/70 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-800">Getting Started</h3>
            <span className="text-xs font-bold text-emerald-600">{onboardingPct}%</span>
          </div>
          <div className="mb-5 flex gap-1">
            {onboarding.map((t, i) => (
              <div
                key={i}
                className={`h-1.5 flex-1 rounded-full transition-colors ${t.done ? "bg-gradient-to-r from-emerald-500 to-teal-500" : "bg-slate-100"}`}
              />
            ))}
          </div>
          <div className="space-y-2.5">
            {onboarding.map((t) => (
              <div key={t.label} className="flex items-center gap-3">
                {t.done ? (
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
                ) : (
                  <Circle className="h-4 w-4 shrink-0 text-slate-300" />
                )}
                <span className={`text-sm ${t.done ? "text-slate-400 line-through" : "text-slate-700 font-medium"}`}>
                  {t.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Schedule / Events */}
        <div className="lg:col-span-3 rounded-2xl border border-slate-200/70 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-800">Upcoming Schedule</h3>
            <Link
              href={buildPageHref("bookings")}
              className="flex items-center gap-1 text-xs font-medium text-emerald-600 hover:text-emerald-700"
            >
              View all <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          {schedule.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <CalendarDays className="h-10 w-10 text-slate-200 mb-3" />
              <p className="text-sm font-medium text-slate-500">No upcoming trips</p>
              <p className="text-xs text-slate-400 mt-1">Book a tour to see your schedule here</p>
            </div>
          ) : (
            <div className="space-y-3">
              {schedule.map((ev, i) => (
                <div
                  key={`${ev.title}-${i}`}
                  className="flex items-center gap-4 rounded-xl border border-slate-100 bg-slate-50/60 p-3.5 transition-colors hover:bg-slate-50"
                >
                  <div className={`h-10 w-1 shrink-0 rounded-full ${ev.color}`} />
                  <div className="flex-1 min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-800">{ev.title}</p>
                    <div className="mt-0.5 flex items-center gap-1.5 text-xs text-slate-500">
                      <Clock className="h-3 w-3" /> {ev.time}
                    </div>
                  </div>
                  <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${
                    ev.tag === "Upcoming"  ? "bg-emerald-50 text-emerald-700" :
                    ev.tag === "Confirmed" ? "bg-sky-50 text-sky-700" :
                    "bg-slate-100 text-slate-600"
                  }`}>
                    {ev.tag}
                  </span>
                </div>
              ))}
            </div>
          )}

        </div>
      </motion.div>

      {/* ── PAYMENT METHODS ── */}
      <motion.div variants={fadeUp} className="rounded-2xl border border-slate-200/70 bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500">Payment Methods</h3>
            <p className="text-xs text-slate-400 mt-1">Manage your saved cards for quick bookings</p>
          </div>
          <Button onClick={() => handleOpenPaymentModal()} size="sm" className="bg-emerald-600 hover:bg-emerald-700 rounded-xl gap-2">
            <Plus className="h-4 w-4" /> Add Card
          </Button>
        </div>

        {stripeAccounts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-6 text-center bg-slate-50 rounded-xl border border-dashed border-slate-200">
            <CreditCard className="h-8 w-8 text-slate-300 mb-2" />
            <p className="text-sm font-medium text-slate-500">No payment methods saved</p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {stripeAccounts.map((acc) => (
              <div key={acc.id} className="relative flex flex-col p-4 rounded-xl border border-slate-200 bg-white shadow-sm hover:border-emerald-200 transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <div className="bg-slate-100 p-2 rounded-lg">
                    <CreditCard className="h-5 w-5 text-slate-600" />
                  </div>
                  <div className="flex items-center gap-1">
                    <button onClick={() => handleOpenPaymentModal(acc)} className="text-slate-400 hover:text-emerald-600 p-1">
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button onClick={() => setPaymentToDelete(acc.id)} className="text-slate-400 hover:text-red-500 p-1">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <p className="text-sm font-bold text-slate-800 capitalize mb-1">{acc.card?.brand || 'Card'} ending in {acc.card?.last4}</p>
                <p className="text-xs text-slate-500 mb-3">{acc.label || 'Saved Payment Method'}</p>
                <div className="mt-auto flex justify-between items-center border-t border-slate-100 pt-3">
                  <span className="text-[10px] text-slate-400">Expires {acc.card?.expMonth}/{acc.card?.expYear}</span>
                  {acc.isActive && <span className="text-[10px] bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full font-medium">Active</span>}
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>

      {/* ── BOOKINGS TABLE ── */}
      <motion.div variants={fadeUp}>
        <BookingsTable bookings={bookings} isLoading={isLoading} />
      </motion.div>

      {/* Payment Modal */}
      <Modal 
        isOpen={isPaymentModalOpen} 
        onClose={() => setIsPaymentModalOpen(false)} 
        title={editingAccount ? "Edit Payment Method" : "Add Payment Method"}
      >
        <div className="space-y-4">
          <Elements stripe={stripePromise}>
            <StripeCardForm 
              onSuccess={handleSavePayment} 
              onCancel={() => setIsPaymentModalOpen(false)}
              editingAccount={editingAccount}
            />
          </Elements>
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal 
        isOpen={!!paymentToDelete} 
        onClose={() => setPaymentToDelete(null)} 
        title="Remove Payment Method"
      >
        <div className="space-y-4">
          <p className="text-sm text-slate-600">
            Are you sure you want to remove this payment method? This action cannot be undone.
          </p>
          <div className="pt-4 flex justify-end gap-3">
            <Button variant="outline" onClick={() => setPaymentToDelete(null)}>Cancel</Button>
            <Button 
              className="bg-red-600 hover:bg-red-700 text-white" 
              onClick={() => paymentToDelete && handleDeletePayment(paymentToDelete)}
            >
              Remove Card
            </Button>
          </div>
        </div>
      </Modal>
    </motion.div>
  );
}
