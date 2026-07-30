'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import {
  Calendar, Users, CreditCard, Shield, CheckCircle2,
  Zap, Loader2, PartyPopper,
} from 'lucide-react';
import BookingPaymentDialog from './BookingPaymentDialog';
import { getUserDashboardPath } from '@/lib/utils/userRouting';
import { USER_ROLE, UserRole } from '@/constants/user';

interface TourBookingWidgetProps {
  tour: {
    _id: string;
    title: string;
    basePrice?: { amount: number; currency: string };
    departure?: {
      date?: string;
      meetingPoint?: string;
      seatsTotal?: number;
      seatsBooked?: number;
    };
    discounts?: Array<{
      type: 'percentage' | 'flat';
      value: number;
      validFrom?: string;
      validUntil?: string;
    }>;
    mainLocation?: { address?: { city?: string } };
    duration?: { days?: number };
    ratings?: { average?: number };
  };
}

const PAYMENT_LABELS: Record<string, string> = {
  bkash: 'bKash',
  nagad: 'Nagad',
  card: 'Card',
  stripe: 'Stripe',
  cash: 'Cash',
  bank_transfer: 'Bank Transfer',
};

const PAYMENT_ICONS: Record<string, string> = {
  bkash: '💳',
  nagad: '📱',
  card: '💳',
  stripe: '💳',
  cash: '💵',
  bank_transfer: '🏦',
};

export default function TourBookingWidget({ tour }: TourBookingWidgetProps) {
  const { data: session } = useSession();
  const router = useRouter();

  const [travelers, setTravelers] = useState(1);
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  const [isBooking, setIsBooking] = useState(false);
  const [result, setResult] = useState<{ ref: string; total: number } | null>(null);
  const [error, setError] = useState('');

  const basePrice = tour.basePrice ?? { amount: 0, currency: 'BDT' };
  const departure = tour.departure;
  const seatsAvailable = departure
    ? Math.max(0, (departure.seatsTotal ?? 0) - (departure.seatsBooked ?? 0))
    : null;

  // Discount calculation (first valid active discount)
  const now = new Date();
  const activeDiscount = (tour.discounts ?? []).find((d) => {
    const from = d.validFrom ? new Date(d.validFrom) : null;
    const until = d.validUntil ? new Date(d.validUntil) : null;
    return (!from || from <= now) && (!until || until >= now);
  });

  const subtotal = basePrice.amount * travelers;
  const discountAmount = activeDiscount
    ? activeDiscount.type === 'percentage'
      ? Math.round((subtotal * activeDiscount.value) / 100)
      : activeDiscount.value
    : 0;
  const totalPaid = Math.max(0, subtotal - discountAmount);

  const canBook =
    !!session &&
    !isBooking &&
    (seatsAvailable === null || seatsAvailable >= travelers);

  const handleBookClick = () => {
    if (!session) {
      router.push('/auth/signin');
      return;
    }
    setIsPaymentDialogOpen(true);
  };

  const handleDialogConfirm = async (selectedMethodId?: string, paymentType?: string) => {
    setIsPaymentDialogOpen(false);
    setError('');
    setIsBooking(true);
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tourId: tour._id,
          totalParticipants: travelers,
          paymentMethod: paymentType || 'card',
          savedPaymentMethodId: selectedMethodId,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Booking failed');
      
      if (data.checkoutUrl) {
        // If it's a redirect to Stripe checkout
        window.location.href = data.checkoutUrl;
        return;
      }
      
      setResult({ ref: data.bookingReference, total: data.totalPaid });
    } catch (e: any) {
      setError(e.message);
    } finally {
      setIsBooking(false);
    }
  };

  // Success state
  if (result) {
    return (
      <div className="relative bg-gradient-to-br from-white via-green-50/30 to-emerald-50/30 backdrop-blur-xl border border-white/50 rounded-2xl shadow-2xl overflow-hidden p-8 text-center space-y-4">
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <PartyPopper className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <h3 className="text-xl font-bold text-gray-900">Booking Confirmed!</h3>
        <p className="text-gray-600 text-sm">Your booking reference is</p>
        <div className="bg-green-50 border border-green-200 rounded-xl px-6 py-3 inline-block">
          <span className="text-2xl font-bold text-green-700 tracking-widest">{result.ref}</span>
        </div>
        <p className="text-sm text-gray-500">
          Total paid: <span className="font-semibold text-gray-800">{basePrice.currency} {result.total.toLocaleString()}</span>
        </p>
        <p className="text-xs text-gray-400">Check your dashboard for booking details.</p>
        <button
          onClick={() => {
            if (session?.user?.id) {
              const role = ((session.user as any).role as UserRole) || USER_ROLE.TRAVELER;
              router.push(`${getUserDashboardPath(session.user.id, role)}&page=bookings`);
            } else {
              router.push('/dashboard/bookings');
            }
          }}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition-all"
        >
          View My Bookings
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-2xl blur opacity-20" />
        <div className="relative bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 backdrop-blur-xl border border-white/50 rounded-2xl shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 px-6 py-8">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-500 rounded-full blur-3xl animate-pulse delay-1000" />
          </div>
          <div className="relative z-10 text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
              <CreditCard className="h-5 w-5 text-white" />
              <span className="text-white font-semibold">Secure Booking</span>
            </div>
            <div className="flex items-baseline justify-center gap-2 mb-2">
              <span className="text-2xl font-bold text-white/80">{basePrice.currency}</span>
              <span className="text-5xl font-bold text-white tracking-tight">
                {basePrice.amount.toLocaleString()}
              </span>
            </div>
            <p className="text-white/80 text-sm font-medium">Price per person</p>
          </div>
        </div>

        <div className="p-6 space-y-6">

          {/* Key Metrics */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 p-4 rounded-xl border border-blue-200/50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-blue-900">{tour.duration?.days ?? '—'}</p>
                  <p className="text-xs font-medium text-blue-700">Days</p>
                </div>
                <Calendar className="w-5 h-5 text-blue-500" />
              </div>
            </div>
            <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 p-4 rounded-xl border border-amber-200/50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-amber-900">
                    {tour.ratings?.average?.toFixed(1) ?? '—'}
                  </p>
                  <p className="text-xs font-medium text-amber-700">Rating</p>
                </div>
                <CheckCircle2 className="w-5 h-5 text-amber-500" />
              </div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100/50 p-4 rounded-xl border border-green-200/50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-green-900">
                    {seatsAvailable !== null ? seatsAvailable : '∞'}
                  </p>
                  <p className="text-xs font-medium text-green-700">Seats Left</p>
                </div>
                <Zap className="w-5 h-5 text-green-500" />
              </div>
            </div>
          </div>

          {/* Departure info */}
          {departure?.date && (
            <div className="flex items-center gap-2 text-sm text-gray-600 bg-blue-50 border border-blue-100 rounded-xl px-4 py-3">
              <Calendar className="w-4 h-4 text-blue-500 shrink-0" />
              <span>
                Departure:{' '}
                <span className="font-semibold text-gray-800">
                  {new Date(departure.date).toLocaleDateString('en-US', {
                    month: 'long', day: 'numeric', year: 'numeric',
                  })}
                </span>
              </span>
              {departure.meetingPoint && (
                <span className="ml-auto text-xs text-gray-500 truncate">{departure.meetingPoint}</span>
              )}
            </div>
          )}

          {/* Travelers */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-900 mb-3">
              <Users className="w-4 h-4 text-blue-600" />
              Number of Travelers
            </label>
            <div className="flex items-center gap-3 p-1 bg-gray-100 rounded-xl border border-gray-200 w-fit">
              <button
                onClick={() => setTravelers(Math.max(1, travelers - 1))}
                disabled={travelers <= 1}
                className="w-10 h-10 rounded-lg bg-white hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed text-gray-600 font-semibold transition-all"
              >
                −
              </button>
              <span className="text-lg font-bold text-gray-900 min-w-8 text-center">{travelers}</span>
              <button
                onClick={() =>
                  setTravelers(
                    seatsAvailable !== null ? Math.min(travelers + 1, seatsAvailable) : travelers + 1
                  )
                }
                disabled={seatsAvailable !== null && travelers >= seatsAvailable}
                className="w-10 h-10 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold transition-all"
              >
                +
              </button>
            </div>
          </div>

          {/* Payment Method Removed, using Dialog */}

          {/* Price Breakdown */}
          <div className="bg-gradient-to-br from-gray-50 to-white/50 rounded-xl border border-gray-200/50 p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">
                {basePrice.currency} {basePrice.amount.toLocaleString()} × {travelers}
              </span>
              <span className="font-semibold text-gray-900">
                {basePrice.currency} {subtotal.toLocaleString()}
              </span>
            </div>
            {activeDiscount && discountAmount > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-green-600 font-medium">
                  Discount ({activeDiscount.type === 'percentage' ? `${activeDiscount.value}%` : 'flat'})
                </span>
                <span className="font-semibold text-green-600">
                  − {basePrice.currency} {discountAmount.toLocaleString()}
                </span>
              </div>
            )}
            <div className="pt-2 border-t-2 border-gray-200 flex justify-between items-center">
              <span className="font-semibold text-gray-900">Total</span>
              <span className="text-2xl font-bold text-blue-600">
                {basePrice.currency} {totalPaid.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
              {error}
            </div>
          )}

          {/* CTA */}
          <button
            onClick={handleBookClick}
            disabled={!canBook}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed text-white font-semibold py-4 px-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-md"
          >
            {isBooking ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Processing...</span>
              </>
            ) : !session ? (
              <>
                <CreditCard className="w-5 h-5" />
                <span>Sign in to Book</span>
              </>
            ) : (
              <>
                <CreditCard className="w-5 h-5" />
                <span>Book Now</span>
              </>
            )}
          </button>

          {/* Trust Badges */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2 p-3 bg-green-50 rounded-xl border border-green-200">
              <Shield className="w-4 h-4 text-green-600" />
              <span className="text-xs font-medium text-green-800">Secure Payment</span>
            </div>
            <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-xl border border-blue-200">
              <CheckCircle2 className="w-4 h-4 text-blue-600" />
              <span className="text-xs font-medium text-blue-800">Instant Confirmation</span>
            </div>
          </div>
        </div>
      </div>
    </div>

      <BookingPaymentDialog
        isOpen={isPaymentDialogOpen}
        onClose={() => setIsPaymentDialogOpen(false)}
        onConfirm={handleDialogConfirm}
        totalBdt={totalPaid}
        tourTitle={tour.title}
        tourLocation={tour.mainLocation?.address?.city || 'Bangladesh'}
      />
    </>
  );
}
