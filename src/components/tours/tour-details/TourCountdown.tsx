'use client';

import { useEffect, useMemo, useState } from 'react';
import { Clock, Users, CalendarDays, Hourglass, Rocket, CheckCircle2 } from 'lucide-react';
import type { TourDeparture, TourOperatingWindow, TourCountdownProps, TimeLeft, UnitProps } from '@/types/tour';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function calcTimeLeft(target: Date): TimeLeft | null {
  const diff = target.getTime() - Date.now();
  if (diff <= 0) return null;

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function pad(n: number) {
  return String(n).padStart(2, '0');
}

function isTodayOrPast(date: Date) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date <= today;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function CountUnit({ value, label }: UnitProps) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative">
        <div className="absolute inset-0 bg-white/10 rounded-xl blur-sm" />
        <div className="relative bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl px-3 py-2 sm:px-5 sm:py-3 min-w-[56px] sm:min-w-[72px] text-center shadow-inner">
          <span className="text-2xl sm:text-4xl font-black text-white tabular-nums leading-none">
            {pad(value)}
          </span>
        </div>
      </div>
      <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-white/70">
        {label}
      </span>
    </div>
  );
}

function Colon() {
  return (
    <span className="text-2xl sm:text-4xl font-black text-white/60 pb-4 animate-pulse select-none">:</span>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function TourCountdown({ departure, operatingWindow, durationDays }: TourCountdownProps) {
  // ── Stable date references (only recalculate when props change) ──────────────
  const startDate = useMemo<Date | null>(() => {
    if (operatingWindow?.startDate) return new Date(operatingWindow.startDate);
    if (departure?.date) return new Date(departure.date);
    return null;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    operatingWindow?.startDate?.toString(),
    departure?.date?.toString(),
  ]);

  const endDate = useMemo<Date | null>(() => {
    if (operatingWindow?.endDate) return new Date(operatingWindow.endDate);
    if (startDate && durationDays) {
      const d = new Date(startDate);
      d.setDate(d.getDate() + durationDays);
      return d;
    }
    return null;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    operatingWindow?.endDate?.toString(),
    startDate?.getTime(),
    durationDays,
  ]);

  const seatsTotal = departure?.seatsTotal ?? 0;
  const seatsBooked = departure?.seatsBooked ?? 0;
  const seatsLeft = Math.max(0, seatsTotal - seatsBooked);

  // ── Stable numeric timestamps for useEffect deps (avoids new-object churn) ──
  const startTs = startDate?.getTime() ?? null;
  const endTs = endDate?.getTime() ?? null;

  const [mode, setMode] = useState<'pre' | 'active' | 'ended'>(() => {
    if (!startDate) return 'pre';
    const now = new Date();
    if (!isTodayOrPast(startDate)) return 'pre';
    if (endDate && now > endDate) return 'ended';
    return 'active';
  });

  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(() => {
    if (!startDate) return null;
    if (!isTodayOrPast(startDate)) return calcTimeLeft(startDate);
    if (endDate) return calcTimeLeft(endDate);
    return null;
  });

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Reconstruct Date objects inside the effect from the stable timestamps
    const start = startTs !== null ? new Date(startTs) : null;
    const end = endTs !== null ? new Date(endTs) : null;

    const tick = () => {
      if (!start) return;
      const now = new Date();

      if (!isTodayOrPast(start)) {
        setMode('pre');
        setTimeLeft(calcTimeLeft(start));
      } else if (end && now > end) {
        setMode('ended');
        setTimeLeft(null);
      } else {
        setMode('active');
        setTimeLeft(end ? calcTimeLeft(end) : null);
      }
    };

    tick(); // immediate first tick
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [startTs, endTs]); // numbers — stable across renders

  if (!mounted) {
    return (
      <div className="rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-r from-slate-700 to-slate-800 border border-slate-600/50 h-[180px] animate-pulse"></div>
    );
  }

  // ── No dates available ──────────────────────────────────────────────────────
  if (!startDate) {
    return (
      <div className="flex items-center gap-3 px-5 py-4 rounded-2xl bg-gradient-to-r from-slate-700 to-slate-800 border border-slate-600/50 text-white/70">
        <CalendarDays className="w-5 h-5 shrink-0" />
        <span className="text-sm font-medium">Tour dates not yet scheduled</span>
      </div>
    );
  }

  // ── Tour has ended ──────────────────────────────────────────────────────────
  if (mode === 'ended') {
    return (
      <div className="flex items-center gap-3 px-5 py-4 rounded-2xl bg-gradient-to-r from-emerald-700 to-teal-700 border border-emerald-500/30 text-white shadow-lg">
        <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-300" />
        <span className="text-sm font-semibold">This tour has successfully concluded</span>
      </div>
    );
  }

  // ─── Pre-start: countdown to event start ────────────────────────────────────
  if (mode === 'pre') {
    return (
      <div className="rounded-2xl overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-emerald-400 to-teal-500 px-5 py-4">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 right-0 w-32 h-32 bg-pink-400 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-400 rounded-full blur-3xl animate-pulse delay-700" />
          </div>
          <div className="relative flex items-center gap-2 mb-1">
            <Rocket className="w-5 h-5 text-purple-200 animate-bounce" />
            <span className="text-lg font-bold text-purple-100 uppercase tracking-widest">
              Event Starts In
            </span>
          </div>
          <p className="relative text-md text-white/60">
            Starting on{' '}
            <span className="text-white font-semibold">
              {startDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
          </p>
        </div>

        {/* Countdown digits */}
        <div className="bg-gradient-to-r from-emerald-400 to-teal-500 px-4 py-5 sm:px-6">
          {timeLeft ? (
            <div className="flex items-end justify-center gap-2 sm:gap-3">
              <CountUnit value={timeLeft.days} label="Days" />
              <Colon />
              <CountUnit value={timeLeft.hours} label="Hrs" />
              <Colon />
              <CountUnit value={timeLeft.minutes} label="Min" />
              <Colon />
              <CountUnit value={timeLeft.seconds} label="Sec" />
            </div>
          ) : (
            <p className="text-center text-white/60 text-sm">Starting today!</p>
          )}

          {/* Seats available */}
          {seatsTotal > 0 && (
            <div className="mt-4 flex items-center justify-center gap-2">
              <Users className="w-4 h-4 text-purple-400" />
              <span className="text-md text-white/70">
                <span className="font-bold text-white">{seatsLeft}</span> of{' '}
                <span className="font-semibold text-white/90">{seatsTotal}</span> seats available
              </span>
              {/* Seat fill bar */}
              <div className="ml-2 h-1.5 w-24 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-purple-400 to-pink-400 transition-all duration-500"
                  style={{ width: `${Math.round((seatsLeft / seatsTotal) * 100)}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ─── Active: time remaining in the tour ─────────────────────────────────────
  return (
    <div className="rounded-2xl overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="relative bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 px-5 py-4">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-300 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-emerald-300 rounded-full blur-3xl animate-pulse delay-500" />
        </div>
        <div className="relative flex items-center gap-2 mb-1">
          <Hourglass className="w-5 h-5 text-emerald-200 animate-spin-slow" />
          <span className="text-sm font-bold text-emerald-100 uppercase tracking-widest">
            Tour In Progress · Time Remaining
          </span>
        </div>
        <div className="relative flex items-center gap-2 flex-wrap">
          <span className="inline-flex items-center gap-1 bg-emerald-500/30 border border-emerald-300/30 px-2.5 py-0.5 rounded-full">
            <Clock className="w-3 h-3 text-emerald-200" />
            <span className="text-xs text-white font-medium">
              Started{' '}
              {startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </span>
          </span>
          {endDate && (
            <span className="inline-flex items-center gap-1 bg-teal-500/30 border border-teal-300/30 px-2.5 py-0.5 rounded-full">
              <CalendarDays className="w-3 h-3 text-teal-200" />
              <span className="text-xs text-white font-medium">
                Ends{' '}
                {endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
            </span>
          )}
        </div>
      </div>

      {/* Countdown digits */}
      <div className="bg-gradient-to-br from-slate-900 via-emerald-950 to-teal-950 px-4 py-5 sm:px-6">
        {timeLeft ? (
          <div className="flex items-end justify-center gap-2 sm:gap-3">
            <CountUnit value={timeLeft.days} label="Days" />
            <Colon />
            <CountUnit value={timeLeft.hours} label="Hrs" />
            <Colon />
            <CountUnit value={timeLeft.minutes} label="Min" />
            <Colon />
            <CountUnit value={timeLeft.seconds} label="Sec" />
          </div>
        ) : (
          <p className="text-center text-white/60 text-sm">Tour ending soon…</p>
        )}

        {/* Remaining seats */}
        {seatsTotal > 0 && (
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-1.5 text-white/70">
                <Users className="w-4 h-4 text-emerald-400" />
                <span>Seats remaining</span>
              </div>
              <span className="font-bold text-white">
                {seatsLeft}{' '}
                <span className="font-normal text-white/50">/ {seatsTotal}</span>
              </span>
            </div>
            {/* Seat fill bar */}
            <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  seatsLeft === 0
                    ? 'bg-red-500'
                    : seatsLeft <= Math.ceil(seatsTotal * 0.2)
                    ? 'bg-gradient-to-r from-orange-400 to-red-400'
                    : 'bg-gradient-to-r from-emerald-400 to-teal-400'
                }`}
                style={{ width: `${Math.round((seatsLeft / seatsTotal) * 100)}%` }}
              />
            </div>
            {seatsLeft === 0 && (
              <p className="text-xs text-red-400 font-semibold text-center">Fully booked</p>
            )}
            {seatsLeft > 0 && seatsLeft <= Math.ceil(seatsTotal * 0.2) && (
              <p className="text-xs text-orange-400 font-semibold text-center animate-pulse">
                ⚡ Only {seatsLeft} seat{seatsLeft > 1 ? 's' : ''} left — book fast!
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
