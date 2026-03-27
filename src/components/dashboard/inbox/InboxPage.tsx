"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Inbox,
  CheckCircle,
  PartyPopper,
  Clock,
  Sun,
  Bell,
  Mail,
  CheckCheck,
  Gift,
  MessageSquare,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { InboxPageSkeleton } from "@/components/dashboard/DashboardSkeletons";

interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  time: string;
  isRead: boolean;
}

const TYPE_CONFIG: Record<
  string,
  { icon: React.ElementType; color: string; bgColor: string }
> = {
  booking_confirmation: {
    icon: CheckCircle,
    color: "text-emerald-700",
    bgColor: "bg-emerald-50",
  },
  booking_reminder: {
    icon: Clock,
    color: "text-blue-700",
    bgColor: "bg-blue-50",
  },
  new_tour: {
    icon: Sun,
    color: "text-cyan-700",
    bgColor: "bg-cyan-50",
  },
  discount_offer: {
    icon: PartyPopper,
    color: "text-violet-700",
    bgColor: "bg-violet-50",
  },
  message: {
    icon: MessageSquare,
    color: "text-slate-700",
    bgColor: "bg-slate-50",
  },
  system_alert: {
    icon: AlertCircle,
    color: "text-amber-700",
    bgColor: "bg-amber-50",
  },
};

const DEFAULT_CONFIG = {
  icon: Gift,
  color: "text-slate-700",
  bgColor: "bg-slate-50",
};

function getTypeConfig(type: string) {
  return TYPE_CONFIG[type] ?? DEFAULT_CONFIG;
}

const container = { hidden: {}, show: { transition: { staggerChildren: 0.05 } } };
const item = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" as const },
  },
};

export default function InboxPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const [loading, setLoading] = useState(true);

  const fetchNotifications = () => {
    setLoading(true);
    const delay = new Promise((r) => setTimeout(r, 1500));
    Promise.all([
      fetch("/api/dashboard/inbox").then((res) => res.json()),
      delay,
    ])
      .then(([data]) => {
        setNotifications(data.notifications ?? []);
      })
      .catch(() => setNotifications([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const unreadCount = notifications.filter((n) => !n.isRead).length;
  const filtered =
    filter === "unread" ? notifications.filter((n) => !n.isRead) : notifications;
  const bookingCount = notifications.filter((n) =>
    n.type?.startsWith("booking")
  ).length;

  const markAllRead = async () => {
    const res = await fetch("/api/dashboard/inbox", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ markAll: true }),
    });
    if (res.ok) {
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    }
  };

  const toggleRead = async (id: string) => {
    const notif = notifications.find((n) => n.id === id);
    if (!notif) return;
    const newRead = !notif.isRead;
    if (!newRead) return; // API only supports marking as read
    const res = await fetch("/api/dashboard/inbox", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (res.ok) {
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
      );
    }
  };

  if (loading) return <InboxPageSkeleton />;

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-6 pb-4"
    >
      {/* Header */}
      <motion.div
        variants={item}
        className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Inbox
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            {unreadCount > 0
              ? `${unreadCount} unread notification${unreadCount === 1 ? "" : "s"}`
              : "All caught up! No new notifications."}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex rounded-xl border border-slate-200 bg-slate-50/80 p-1">
            {(["all", "unread"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={cn(
                  "rounded-lg px-4 py-2 text-xs font-semibold capitalize transition-colors",
                  filter === tab
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                )}
              >
                {tab}
              </button>
            ))}
          </div>
          {unreadCount > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={markAllRead}
              className="h-9 rounded-xl border-slate-200 gap-1.5 text-slate-600 hover:bg-slate-50"
            >
              <CheckCheck className="h-4 w-4" />
              Mark all read
            </Button>
          )}
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div
        variants={item}
        className="grid grid-cols-2 gap-4 sm:grid-cols-4"
      >
        {[
          { label: "Total", value: loading ? "—" : notifications.length, icon: Inbox },
          { label: "Unread", value: loading ? "—" : unreadCount, icon: Bell },
          {
            label: "Read",
            value: loading ? "—" : notifications.length - unreadCount,
            icon: CheckCircle,
          },
          {
            label: "Bookings",
            value: loading ? "—" : bookingCount,
            icon: Clock,
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium text-slate-500">{stat.label}</p>
              <stat.icon className="h-4 w-4 text-slate-300" />
            </div>
            {loading ? (
              <Skeleton className="mt-1 h-8 w-12" />
            ) : (
              <p className="mt-1 text-2xl font-bold text-slate-900">{stat.value}</p>
            )}
          </div>
        ))}
      </motion.div>

      {/* List */}
      <motion.section variants={item} className="space-y-3">
        {loading ? (
          [...Array(3)].map((_, i) => (
            <div
              key={i}
              className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm"
            >
              <div className="flex items-start gap-4">
                <Skeleton className="h-12 w-12 shrink-0 rounded-xl" />
                <div className="flex-1 space-y-2">
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-40" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                  <Skeleton className="h-4 w-full" />
                </div>
              </div>
            </div>
          ))
        ) : (
          <AnimatePresence mode="wait">
            {filtered.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl border border-slate-200 bg-white py-20 text-center shadow-sm"
              >
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-50">
                  <Mail className="h-8 w-8 text-slate-300" />
                </div>
                <p className="font-semibold text-slate-600">No notifications</p>
                <p className="mt-1 text-sm text-slate-400">
                  {filter === "unread"
                    ? "You're all caught up!"
                    : "When you get notifications, they'll appear here."}
                </p>
              </motion.div>
            ) : (
              filtered.map((notification, index) => {
                const config = getTypeConfig(notification.type);
                const Icon = config.icon;
                return (
                  <motion.div
                    key={notification.id}
                    layout
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ delay: index * 0.03 }}
                    onClick={() => toggleRead(notification.id)}
                    className={cn(
                      "group cursor-pointer rounded-2xl border p-5 shadow-sm transition-all duration-200 hover:shadow-md",
                      notification.isRead
                        ? "border-slate-200/80 bg-white"
                        : "border-violet-200/60 bg-violet-50/30 shadow-violet-100/50"
                    )}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={cn(
                          "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl",
                          config.bgColor,
                          config.color
                        )}
                      >
                        <Icon className="h-6 w-6" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-4">
                          <h3
                            className={cn(
                              "font-semibold",
                              notification.isRead
                                ? "text-slate-600"
                                : "text-slate-900"
                            )}
                          >
                            {notification.title}
                          </h3>
                          <span className="shrink-0 text-xs text-slate-400">
                            {notification.time}
                          </span>
                        </div>
                        <p
                          className={cn(
                            "mt-0.5 text-sm",
                            notification.isRead
                              ? "text-slate-500"
                              : "text-slate-600"
                          )}
                        >
                          {notification.message}
                        </p>
                      </div>
                      {!notification.isRead && (
                        <div className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-violet-500" />
                      )}
                    </div>
                  </motion.div>
                );
              })
            )}
          </AnimatePresence>
        )}
      </motion.section>
    </motion.div>
  );
}
