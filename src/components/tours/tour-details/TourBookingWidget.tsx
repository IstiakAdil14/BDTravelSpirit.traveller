'use client';

import { useState } from 'react';
import { Calendar, Users, Phone, CreditCard, Shield, CheckCircle2, Zap } from 'lucide-react';
import { showProductionNotification } from '@/components/shared/ProductionNotification';

interface Departure {
  date: string;
  seatsTotal: number;
  seatsBooked: number;
  meetingPoint?: string;
}

interface TourBookingWidgetProps {
  tour: any;
}

export default function TourBookingWidget({ tour }: TourBookingWidgetProps) {
  const [selectedDate, setSelectedDate] = useState('');
  const [travelers, setTravelers] = useState(1);
  const [isBooking, setIsBooking] = useState(false);

  const basePrice = tour.basePrice || { amount: 1500, currency: 'BDT' };
  const departures: Departure[] = tour.departures || [
    { date: '2025-02-15', seatsTotal: 20, seatsBooked: 15 },
    { date: '2025-03-01', seatsTotal: 20, seatsBooked: 8 },
    { date: '2025-03-15', seatsTotal: 20, seatsBooked: 20 },
  ];
  
  const availableDepartures = departures.filter((dep: Departure) => 
    (dep.seatsTotal - dep.seatsBooked) > 0
  );

  const handleBooking = async () => {
    setIsBooking(true);
    setTimeout(() => {
      setIsBooking(false);
      alert('Booking request submitted! We will contact you shortly.');
    }, 2000);
  };

  const handleQuickInquiry = () => {
    showProductionNotification();
  };

  const totalPrice = basePrice.amount * travelers;
  const discountAmount = tour.discounts ? Math.round(totalPrice * 0.1) : 0;
  const finalPrice = totalPrice - discountAmount;
  const taxAmount = Math.round(finalPrice * 0.05);
  const totalWithTax = finalPrice + taxAmount;

  return (
    <div className="relative">
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-2xl blur opacity-20"></div>
      <div className="relative bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 backdrop-blur-xl border border-white/50 rounded-2xl shadow-2xl overflow-hidden">
        
        {/* Premium Header */}
        <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 px-6 py-8">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
          </div>
          
          <div className="relative z-10 text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
              <CreditCard className="h-5 w-5 text-white" />
              <span className="text-white font-semibold">Secure Booking</span>
            </div>
            <div className="flex items-baseline justify-center gap-2 mb-2">
              <span className="text-2xl font-bold text-white/80">{basePrice.currency}</span>
              <span className="text-5xl font-bold text-white tracking-tight">{basePrice.amount.toLocaleString()}</span>
            </div>
            <p className="text-white/80 text-sm font-medium">Price per person</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6 space-y-6">
          
          {/* Key Metrics */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 p-4 rounded-xl border border-blue-200/50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-blue-900">{tour.duration?.days || '5'}</p>
                  <p className="text-xs font-medium text-blue-700">Days</p>
                </div>
                <Calendar className="w-5 h-5 text-blue-500" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 p-4 rounded-xl border border-amber-200/50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-amber-900">{tour.ratings?.average?.toFixed(1) || '4.8'}</p>
                  <p className="text-xs font-medium text-amber-700">Rating</p>
                </div>
                <CheckCircle2 className="w-5 h-5 text-amber-500" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100/50 p-4 rounded-xl border border-green-200/50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-green-900">{availableDepartures.length > 0 ? availableDepartures[0].seatsTotal - availableDepartures[0].seatsBooked : '0'}</p>
                  <p className="text-xs font-medium text-green-700">Seats Left</p>
                </div>
                <Zap className="w-5 h-5 text-green-500" />
              </div>
            </div>
          </div>

          {/* Date Selection */}
          {availableDepartures.length > 0 && (
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-900 mb-3">
                <Calendar className="w-4 h-4 text-blue-600" />
                Select Departure Date
              </label>
              <select
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white/80 backdrop-blur-sm text-gray-700 font-medium focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
              >
                <option value="">Select a departure date...</option>
                {availableDepartures.map((departure, index) => {
                  const seats = departure.seatsTotal - departure.seatsBooked;
                  return (
                    <option key={index} value={departure.date}>
                      {new Date(departure.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} - {seats} seats
                    </option>
                  );
                })}
              </select>
            </div>
          )}

          {/* Travelers Selection */}
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
                -
              </button>
              <span className="text-lg font-bold text-gray-900 min-w-8 text-center">{travelers}</span>
              <button
                onClick={() => setTravelers(travelers + 1)}
                className="w-10 h-10 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all"
              >
                +
              </button>
            </div>
          </div>

          {/* Price Breakdown */}
          <div className="bg-gradient-to-br from-gray-50 to-white/50 backdrop-blur-sm rounded-xl border border-gray-200/50 p-4 space-y-3">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Price per person</span>
                <span className="font-semibold text-gray-900">{basePrice.currency} {basePrice.amount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">x {travelers} {travelers === 1 ? 'traveler' : 'travelers'}</span>
                <span className="font-semibold text-gray-900">{basePrice.currency} {totalPrice.toLocaleString()}</span>
              </div>
            </div>

            {discountAmount > 0 && (
              <div className="pt-2 border-t border-gray-200">
                <div className="flex justify-between text-sm">
                  <span className="text-green-600 font-medium">Discount (10%)</span>
                  <span className="font-semibold text-green-600">-{basePrice.currency} {discountAmount.toLocaleString()}</span>
                </div>
              </div>
            )}

            <div className="pt-2 border-t border-gray-200">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold text-gray-900">{basePrice.currency} {finalPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tax (5%)</span>
                <span className="font-semibold text-gray-900">{basePrice.currency} {taxAmount.toLocaleString()}</span>
              </div>
            </div>

            <div className="pt-3 border-t-2 border-gray-300">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-900">Total Amount</span>
                <span className="text-2xl font-bold text-blue-600">{basePrice.currency} {totalWithTax.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleBooking}
              disabled={isBooking || !selectedDate}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed text-white font-semibold py-4 px-4 rounded-xl transition-all transform hover:shadow-lg flex items-center justify-center gap-2 shadow-md"
            >
              {isBooking ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <CreditCard className="w-5 h-5" />
                  <span>Book Now</span>
                </>
              )}
            </button>

            <button
              onClick={handleQuickInquiry}
              className="w-full border-2 border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span>Quick Inquiry</span>
            </button>
          </div>

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
  );
}