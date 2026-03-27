"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { motion, type Variants } from "framer-motion";
import {
  Plane, Globe, Heart, Award, Star, CalendarDays,
  Compass, TrendingUp, CheckCircle2, Circle, Clock, ArrowRight,
  Sun, Mountain, MapPin,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import BookingsTable, { type Booking } from "./BookingsTable";

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

const QUICK_LINKS = [
  { label: "Explore Tours",  href: "/tours",        icon: Compass,     bg: "bg-emerald-50", text: "text-emerald-600", border: "border-emerald-200" },
  { label: "My Bookings",   href: "bookings",       icon: CalendarDays, bg: "bg-sky-50",    text: "text-sky-600",    border: "border-sky-200" },
  { label: "Write Review",  href: "reviews",        icon: Star,         bg: "bg-violet-50", text: "text-violet-600", border: "border-violet-200" },
  { label: "Destinations",  href: "/destinations",  icon: Mountain,     bg: "bg-teal-50",   text: "text-teal-600",   border: "border-teal-200" },
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
}: TravellerDashboardProps) {
  const { data: session } = useSession();
  const user = session?.user;
  const firstName = user?.name?.split(" ")[0] ?? "Traveller";
  const [activeDay, setActiveDay] = useState(() => new Date().getDay());
  const GreetingIcon = getGreetingIcon();

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


      {/* ── MIDDLE ROW: Profile | Weekly Chart | Time Tracker ── */}
      <motion.div variants={fadeUp} className="grid gap-4 lg:grid-cols-3">

        {/* Profile Card */}
        <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-slate-200/70 bg-white p-6 shadow-sm text-center">
          <div className="relative">
            <div className="h-28 w-28 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 p-0.5 shadow-lg shadow-emerald-500/30">
              <Avatar className="h-full w-full rounded-[14px]">
                <AvatarImage
                  src={user?.image ? `/api/user/avatar?u=${user?.id ?? ""}` : ""}
                  alt={user?.name ?? "Traveller"}
                  className="rounded-[14px] object-cover"
                />
                <AvatarFallback className="rounded-[14px] bg-slate-900 text-2xl font-bold text-white">
                  {user?.name?.[0]?.toUpperCase() ?? "T"}
                </AvatarFallback>
              </Avatar>
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
              {schedule.map((ev) => (
                <div
                  key={ev.title}
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

          {/* Quick links */}
          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {QUICK_LINKS.map((ql) => (
              <Link
                key={ql.label}
                href={ql.href.startsWith("/") ? ql.href : buildPageHref(ql.href)}
                className={`flex flex-col items-center gap-1.5 rounded-xl border ${ql.border} ${ql.bg} p-3 text-center transition-all hover:shadow-sm`}
              >
                <ql.icon className={`h-4 w-4 ${ql.text}`} />
                <span className={`text-[10px] font-semibold ${ql.text}`}>{ql.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ── BOOKINGS TABLE ── */}
      <motion.div variants={fadeUp}>
        <BookingsTable bookings={bookings} isLoading={isLoading} />
      </motion.div>
    </motion.div>
  );
}
