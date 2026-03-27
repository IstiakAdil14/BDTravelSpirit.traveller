"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  Plus,
  MapPin,
  ThumbsUp,
  Edit2,
  Trash2,
  X,
  Send,
  Award,
  MessageSquare,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { ReviewsPageSkeleton } from "@/components/dashboard/DashboardSkeletons";

interface Review {
  id: string;
  tourName: string;
  location: string;
  date: string;
  rating: number;
  title: string;
  body: string;
  helpful: number;
  status: "published" | "pending";
}

interface ReviewStats {
  total: number;
  avgRating: number;
  helpful: number;
  pending: number;
}

function StarRating({
  rating,
  interactive = false,
  onChange,
}: {
  rating: number;
  interactive?: boolean;
  onChange?: (r: number) => void;
}) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <button
          key={s}
          type="button"
          disabled={!interactive}
          onClick={() => onChange?.(s)}
          onMouseEnter={() => interactive && setHovered(s)}
          onMouseLeave={() => interactive && setHovered(0)}
          className={cn(
            "transition-transform hover:scale-110",
            interactive ? "cursor-pointer" : "cursor-default"
          )}
          aria-label={interactive ? `Rate ${s} stars` : undefined}
        >
          <Star
            className={cn(
              "h-5 w-5 transition-colors",
              (hovered || rating) >= s
                ? "fill-amber-400 text-amber-400"
                : "text-slate-300"
            )}
          />
        </button>
      ))}
    </div>
  );
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

function ReviewSkeleton() {
  return (
    <div className="space-y-4 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <Skeleton className="h-12 w-12 rounded-2xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-44" />
            <Skeleton className="h-3.5 w-32" />
          </div>
        </div>
        <Skeleton className="h-7 w-24 rounded-full" />
      </div>
      <Skeleton className="h-5 w-28" />
      <Skeleton className="h-4 w-56" />
      <Skeleton className="h-16 w-full rounded-xl" />
    </div>
  );
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [stats, setStats] = useState<ReviewStats>({ total: 0, avgRating: 0, helpful: 0, pending: 0 });
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [newRating, setNewRating] = useState(0);
  const [newTitle, setNewTitle] = useState("");
  const [newBody, setNewBody] = useState("");
  const [formError, setFormError] = useState("");

  const fetchReviews = () => {
    setLoading(true);
    const delay = new Promise((r) => setTimeout(r, 1500));
    Promise.all([
      fetch("/api/dashboard/reviews").then((r) => r.json()),
      delay,
    ])
      .then(([data]) => {
        setReviews(data.reviews ?? []);
        setStats(data.stats ?? { total: 0, avgRating: 0, helpful: 0, pending: 0 });
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => { fetchReviews(); }, []);

  if (loading) return <ReviewsPageSkeleton />;

  const handleSubmit = async () => {
    if (!newRating) { setFormError("Please select a rating."); return; }
    if (!newBody.trim()) { setFormError("Please write your review."); return; }
    setFormError("");
    setSubmitting(true);

    // Without a specific tourId from UI, we post a general review note
    // In production this would come from a tour selector
    const res = await fetch("/api/dashboard/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rating: newRating, title: newTitle, comment: newBody, tourId: null }),
    });

    setSubmitting(false);
    if (res.ok) {
      setShowForm(false);
      setNewRating(0);
      setNewTitle("");
      setNewBody("");
      fetchReviews();
    } else {
      const data = await res.json();
      setFormError(data.error ?? "Failed to submit review.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this review?")) return;
    await fetch(`/api/dashboard/reviews?id=${id}`, { method: "DELETE" });
    setReviews((prev) => prev.filter((r) => r.id !== id));
    setStats((prev) => ({ ...prev, total: prev.total - 1 }));
  };

  const statCards = [
    {
      label: "Total Reviews",
      value: loading ? "—" : stats.total,
      icon: MessageSquare,
      gradient: "from-amber-500 to-orange-500",
      shadow: "shadow-amber-500/20",
    },
    {
      label: "Average Rating",
      value: loading ? "—" : stats.avgRating || "—",
      icon: Star,
      gradient: "from-amber-400 to-yellow-500",
      shadow: "shadow-amber-400/25",
    },
    {
      label: "Helpful Votes",
      value: loading ? "—" : stats.helpful,
      icon: ThumbsUp,
      gradient: "from-emerald-500 to-teal-500",
      shadow: "shadow-emerald-500/20",
    },
    {
      label: "Pending",
      value: loading ? "—" : stats.pending,
      icon: Award,
      gradient: "from-violet-500 to-purple-500",
      shadow: "shadow-violet-500/20",
    },
  ];

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-6 pb-8"
    >
      {/* Header */}
      <motion.div
        variants={item}
        className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Reviews
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            {reviews.length === 0
              ? "You haven't written any reviews yet. When you add one, it'll appear here."
              : "Share your travel experiences with the community"}
          </p>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div
        variants={item}
        className="grid grid-cols-2 gap-4 lg:grid-cols-4"
      >
        {statCards.map((s) => (
          <motion.div
            key={s.label}
            whileHover={{ y: -4 }}
            className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-lg"
          >
            <div
              className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${s.gradient} shadow-md ${s.shadow}`}
            >
              <s.icon className="h-6 w-6 text-white" />
            </div>
            {loading ? (
              <Skeleton className="mb-1 h-8 w-12" />
            ) : (
              <p className="text-2xl font-bold tracking-tight text-slate-900">
                {s.value}
              </p>
            )}
            <p className="mt-0.5 text-sm font-medium text-slate-500">
              {s.label}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* Write review form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm"
          >
            <div className="border-b border-slate-100 bg-slate-50/50 px-6 py-4">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-slate-900">
                  Write a New Review
                </h2>
                <button
                  onClick={() => setShowForm(false)}
                  aria-label="Close form"
                  className="rounded-lg p-2 transition-colors hover:bg-slate-200/80"
                >
                  <X className="h-4 w-4 text-slate-500" />
                </button>
              </div>
            </div>
            <div className="space-y-5 p-6">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-600">
                  Your Rating
                </label>
                <StarRating
                  rating={newRating}
                  interactive
                  onChange={setNewRating}
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-600">
                  Review Title
                </label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Summarise your experience…"
                  className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm transition-colors focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                  aria-label="Review title"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-600">
                  Your Review
                </label>
                <Textarea
                  value={newBody}
                  onChange={(e) => setNewBody(e.target.value)}
                  placeholder="Tell others about your experience…"
                  rows={4}
                  className="resize-none rounded-xl border-slate-200 bg-slate-50 text-sm focus-visible:ring-amber-500/20"
                  aria-label="Review body"
                />
              </div>
              {formError && (
                <p className="text-sm text-red-500">{formError}</p>
              )}
              <div className="flex justify-end gap-3">
                <Button
                  size="sm"
                  variant="outline"
                  className="rounded-xl border-slate-200"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </Button>
                <Button
                  size="sm"
                  className="gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                  onClick={handleSubmit}
                  disabled={submitting}
                >
                  <Send className="h-3.5 w-3.5" />
                  {submitting ? "Submitting…" : "Submit Review"}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Review cards */}
      <motion.div variants={item} className="space-y-4">
        {loading ? (
          [...Array(3)].map((_, i) => <ReviewSkeleton key={i} />)
        ) : reviews.length === 0 ? (
          <motion.div
            variants={item}
            className="rounded-2xl border border-slate-200/80 bg-white py-20 text-center shadow-sm"
          >
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50">
              <Star className="h-8 w-8 text-amber-400" />
            </div>
            <p className="font-semibold text-slate-600">No reviews yet</p>
            <p className="mt-2 text-sm text-slate-400">
              Complete a trip and share your experience!
            </p>
          </motion.div>
        ) : (
          reviews.map((review) => (
            <motion.div
              key={review.id}
              variants={item}
              whileHover={{ y: -2 }}
              className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition-all duration-300 hover:shadow-lg"
            >
              <div className="p-6">
                <div className="mb-4 flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 ring-1 ring-amber-100/50">
                      <Star className="h-6 w-6 text-amber-500 fill-amber-400" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">
                        {review.tourName}
                      </p>
                      <p className="mt-0.5 flex items-center gap-1.5 text-sm text-slate-500">
                        <MapPin className="h-3.5 w-3.5 text-slate-400" />
                        {review.location}
                      </p>
                    </div>
                  </div>
                  <Badge
                    variant="outline"
                    className={cn(
                      "shrink-0 capitalize",
                      review.status === "published"
                        ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                        : "border-amber-200 bg-amber-50 text-amber-700"
                    )}
                  >
                    {review.status}
                  </Badge>
                </div>

                <div className="mb-4 flex items-center gap-4">
                  <StarRating rating={review.rating} />
                  <span className="text-sm text-slate-400">
                    {new Date(review.date).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>

                {review.title && (
                  <p className="mb-2 text-sm font-semibold text-slate-900">
                    {review.title}
                  </p>
                )}
                <p className="text-sm leading-relaxed text-slate-600">
                  {review.body}
                </p>

                <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                  <span className="flex items-center gap-2 text-sm text-slate-500">
                    <ThumbsUp className="h-4 w-4" />
                    {review.helpful} found helpful
                  </span>
                  <div className="flex items-center gap-1">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-blue-600"
                      aria-label="Edit review"
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-500"
                      aria-label="Delete review"
                      onClick={() => handleDelete(review.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </motion.div>
    </motion.div>
  );
}
