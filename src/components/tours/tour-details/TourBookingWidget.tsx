'use client';

import { useState } from 'react';
import { Calendar, Users, Phone, Mail, CreditCard, Shield, CheckCircle2, AlertCircle, MapPin, Clock, Zap } from 'lucide-react';

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
  const [expandedSection, setExpandedSection] = useState('pricing');

  const basePrice = tour.basePrice || { amount: 1500, currency: 'BDT' };
  const departures: Departure[] = tour.departures || [
    { date: '2025-02-15', seatsTotal: 20, seatsBooked: 15 },
    { date: '2025-03-01', seatsTotal: 20, seatsBooked: 8 },
    { date: '2025-03-15', seatsTotal: 20, seatsBooked: 20 },
  ];
  
  const availableDepartures = departures.filter((dep: Departure) => 
    (dep.seatsTotal - dep.seatsBooked) > 0
  );

  const selectedDeparture = availableDepartures.find((d: Departure) => d.date === selectedDate);
  const availableSeats = selectedDeparture ? selectedDeparture.seatsTotal - selectedDeparture.seatsBooked : 0;
  const occupancyPercent = selectedDeparture ? ((selectedDeparture.seatsBooked / selectedDeparture.seatsTotal) * 100) : 0;

  const handleBooking = async () => {
    setIsBooking(true);
    setTimeout(() => {
      setIsBooking(false);
      alert('Booking request submitted! We will contact you shortly.');
    }, 2000);
  };

  const handleQuickInquiry = () => {
    const message = `Hi! I'm interested in a tour. Could you please provide more information?`;
    const whatsappUrl = `https://wa.me/8801234567890?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const totalPrice = basePrice.amount * travelers;
  const discountAmount = tour.discounts ? Math.round(totalPrice * 0.1) : 0;
  const finalPrice = totalPrice - discountAmount;
  const taxAmount = Math.round(finalPrice * 0.05);
  const totalWithTax = finalPrice + taxAmount;

  return (
    <div className="w-full max-w-7xl mx-auto font-sans">
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        
        * {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }

        .shimmer-loading {
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
        }

        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        .fade-in {
          animation: fadeIn 0.3s ease-in-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        
        {/* Premium Header */}
        <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-6 py-8">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-slate-500 rounded-full mix-blend-multiply filter blur-3xl"></div>
          </div>
          
          <div className="relative z-10">
            <div className="flex items-baseline gap-1 mb-2">
              <span className="text-5xl font-bold text-white tracking-tight">
                {basePrice.currency}
              </span>
              <span className="text-4xl font-bold text-white">
                {basePrice.amount.toLocaleString()}
              </span>
            </div>
            <p className="text-slate-300 text-sm font-medium">Price per person</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8">
          
          {/* LEFT COLUMN - BOOKING FORM */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Key Metrics */}
            <div className="grid grid-cols-3 gap-3">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-blue-600/10 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-300"></div>
                <div className="relative bg-slate-50 hover:bg-blue-50/50 p-4 rounded-lg border border-slate-200 transition-all">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-3xl font-bold text-slate-900">{tour.duration?.days || '5'}</p>
                      <p className="text-xs font-medium text-slate-600 mt-1">Days</p>
                    </div>
                    <Calendar className="w-5 h-5 text-blue-500 opacity-60" />
                  </div>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-amber-600/10 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-300"></div>
                <div className="relative bg-slate-50 hover:bg-amber-50/50 p-4 rounded-lg border border-slate-200 transition-all">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-3xl font-bold text-slate-900">{tour.ratings?.average?.toFixed(1) || '4.8'}</p>
                      <p className="text-xs font-medium text-slate-600 mt-1">Rating</p>
                    </div>
                    <CheckCircle2 className="w-5 h-5 text-amber-500 opacity-60" />
                  </div>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-green-600/10 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-300"></div>
                <div className="relative bg-slate-50 hover:bg-green-50/50 p-4 rounded-lg border border-slate-200 transition-all">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-3xl font-bold text-slate-900">{availableDepartures.length > 0 ? availableDepartures[0].seatsTotal - availableDepartures[0].seatsBooked : '0'}</p>
                      <p className="text-xs font-medium text-slate-600 mt-1">Seats Left</p>
                    </div>
                    <Zap className="w-5 h-5 text-green-500 opacity-60" />
                  </div>
                </div>
              </div>
            </div>

            {/* Date Selection - Enhanced */}
            {availableDepartures.length > 0 && (
              <div className="fade-in">
                <label className="flex items-center gap-2.5 text-sm font-semibold text-slate-900 mb-3">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  Select Departure Date
                </label>
                <div className="relative">
                  <select
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full px-4 py-3.5 border border-slate-200 rounded-lg bg-white text-slate-700 font-medium appearance-none cursor-pointer transition-all hover:border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                  >
                    <option value="">Select a departure date...</option>
                    {availableDepartures.map((departure, index) => {
                      const seats = departure.seatsTotal - departure.seatsBooked;
                      const status = seats <= 3 ? '🔥 Last spots' : '✓ Available';
                      return (
                        <option key={index} value={departure.date}>
                          {new Date(departure.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} — {seats} seats ({status})
                        </option>
                      );
                    })}
                  </select>
                  <svg className="w-5 h-5 text-slate-400 absolute right-3 top-3.5 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </div>

                {selectedDeparture && (
                  <div className="mt-3 p-3 bg-gradient-to-r from-blue-50 to-blue-50/50 rounded-lg border border-blue-100">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-slate-600">OCCUPANCY</span>
                      <span className="text-xs font-bold text-blue-600">{Math.round(occupancyPercent)}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-500"
                        style={{ width: `${occupancyPercent}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-slate-600 mt-2">{availableSeats} of {selectedDeparture.seatsTotal} seats available</p>
                  </div>
                )}
              </div>
            )}

            {/* Travelers Selection - Professional */}
            <div>
              <label className="flex items-center gap-2.5 text-sm font-semibold text-slate-900 mb-3">
                <Users className="w-4 h-4 text-blue-600" />
                Number of Travelers
              </label>
              <div className="flex items-center gap-3 p-1 bg-slate-100 rounded-lg border border-slate-200 w-fit">
                <button
                  onClick={() => setTravelers(Math.max(1, travelers - 1))}
                  disabled={travelers <= 1}
                  className="w-9 h-9 rounded-md bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed text-slate-600 font-semibold transition-all hover:text-slate-900 border border-transparent hover:border-slate-200"
                >
                  −
                </button>
                <span className="text-lg font-bold text-slate-900 min-w-8 text-center">{travelers}</span>
                <button
                  onClick={() => setTravelers(travelers + 1)}
                  className="w-9 h-9 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all"
                >
                  +
                </button>
              </div>
            </div>

            {/* Price Breakdown - Professional */}
            <div className="bg-gradient-to-br from-slate-50 to-slate-50/50 rounded-lg border border-slate-200 p-4 space-y-3">
              <div className="space-y-2.5">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Price per person</span>
                  <span className="font-semibold text-slate-900">{basePrice.currency} {basePrice.amount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">× {travelers} {travelers === 1 ? 'traveler' : 'travelers'}</span>
                  <span className="font-semibold text-slate-900">{basePrice.currency} {totalPrice.toLocaleString()}</span>
                </div>
              </div>

              {discountAmount > 0 && (
                <div className="pt-2.5 border-t border-slate-200">
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center gap-2 text-green-600 font-medium">
                      <CheckCircle2 className="w-4 h-4" />
                      Discount (10%)
                    </span>
                    <span className="font-semibold text-green-600">−{basePrice.currency} {discountAmount.toLocaleString()}</span>
                  </div>
                </div>
              )}

              <div className="pt-2.5 border-t border-slate-200">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-600">Subtotal</span>
                  <span className="font-semibold text-slate-900">{basePrice.currency} {finalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Tax (5%)</span>
                  <span className="font-semibold text-slate-900">{basePrice.currency} {taxAmount.toLocaleString()}</span>
                </div>
              </div>

              <div className="pt-3 border-t-2 border-slate-300">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-slate-900">Total Amount</span>
                  <span className="text-3xl font-bold text-blue-600">{basePrice.currency} {totalWithTax.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="space-y-2.5 pt-2">
              <button
                onClick={handleBooking}
                disabled={isBooking || !selectedDate}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-slate-400 disabled:to-slate-400 disabled:cursor-not-allowed text-white font-semibold py-3.5 px-4 rounded-lg transition-all transform hover:shadow-lg active:scale-98 flex items-center justify-center gap-2.5 shadow-md"
              >
                {isBooking ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <CreditCard className="w-4.5 h-4.5" />
                    <span>Book Now</span>
                  </>
                )}
              </button>

              <button
                onClick={handleQuickInquiry}
                className="w-full border-2 border-slate-300 text-slate-700 hover:bg-slate-50 font-semibold py-3 px-4 rounded-lg transition-all flex items-center justify-center gap-2.5"
              >
                <Phone className="w-4 h-4" />
                <span>Quick Inquiry</span>
              </button>
            </div>

            {/* Alerts - Premium */}
            {availableDepartures.length === 0 && (
              <div className="p-4 bg-red-50 rounded-lg border border-red-200 flex gap-3 fade-in">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-red-900 text-sm">No Available Dates</p>
                  <p className="text-xs text-red-700 mt-1">This tour is fully booked. Join the waiting list to be notified.</p>
                </div>
              </div>
            )}

            {selectedDeparture && availableSeats <= 3 && availableSeats > 0 && (
              <div className="p-4 bg-amber-50 rounded-lg border border-amber-200 flex gap-3 fade-in">
                <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-amber-900 text-sm">🔥 Limited Availability</p>
                  <p className="text-xs text-amber-700 mt-1">Only {availableSeats} {availableSeats === 1 ? 'seat' : 'seats'} remaining. Book now to secure your spot.</p>
                </div>
              </div>
            )}

            {/* Quick Stats Card */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg border border-blue-200 p-4 text-white">
              <h3 className="text-base font-bold mb-3">Why Customers Love Us</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                  <span className="text-xs font-medium">10,000+ Happy Travelers</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                  <span className="text-xs font-medium">50+ Tours Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                  <span className="text-xs font-medium">Best Price Guarantee</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                  <span className="text-xs font-medium">Expert Local Guides</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN - TRUST & CONTACT */}
          <div className="lg:col-span-1 space-y-5">
            
            {/* Trust Badges */}
            <div>
              <h3 className="text-base font-bold text-slate-900 mb-4">Why Book With Us</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
                  <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-blue-900">Secure Payment</p>
                    <p className="text-xs text-blue-700">SSL encrypted & PCI compliant</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-100">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-green-900">Instant Confirmation</p>
                    <p className="text-xs text-green-700">Email & SMS confirmation sent</p>
                  </div>
                </div>

                {tour.cancellationPolicy?.refundable && (
                  <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg border border-purple-100">
                    <CheckCircle2 className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-purple-900">Free Cancellation</p>
                      <p className="text-xs text-purple-700">Up to 7 days before departure</p>
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg border border-orange-100">
                  <CheckCircle2 className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-orange-900">24/7 Support</p>
                    <p className="text-xs text-orange-700">Dedicated customer support team</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Section - Premium */}
            <div>
              <h3 className="text-base font-bold text-slate-900 mb-4">Get In Touch</h3>
              <div className="space-y-3">
                <a href="tel:+8801234567890" className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50 to-blue-50/50 hover:from-blue-100 hover:to-blue-100/50 rounded-lg border border-blue-200 transition-all">
                  <Phone className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-slate-600 font-medium">Call Us</p>
                    <p className="text-sm font-bold text-slate-900 truncate">+880 1234-567890</p>
                  </div>
                </a>

                <a href="mailto:info@bdtravelspirit.com" className="flex items-center gap-3 p-3 bg-gradient-to-r from-purple-50 to-purple-50/50 hover:from-purple-100 hover:to-purple-100/50 rounded-lg border border-purple-200 transition-all">
                  <Mail className="w-5 h-5 text-purple-600 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-slate-600 font-medium">Email Us</p>
                    <p className="text-sm font-bold text-slate-900 truncate">info@bdtravelspirit.com</p>
                  </div>
                </a>

                <a href="https://wa.me/8801234567890" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-gradient-to-r from-green-50 to-green-50/50 hover:from-green-100 hover:to-green-100/50 rounded-lg border border-green-200 transition-all">
                  <Phone className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-slate-600 font-medium">WhatsApp</p>
                    <p className="text-sm font-bold text-slate-900 truncate">Chat Now</p>
                  </div>
                </a>
              </div>

              <div className="mt-3 p-3 bg-gradient-to-r from-slate-100 to-slate-50 rounded-lg border border-slate-200">
                <p className="text-xs text-slate-600 mb-1"><span className="font-bold">Response Time:</span> Usually within 30 mins</p>
                <p className="text-xs text-slate-600"><span className="font-bold">Operating Hours:</span> 24/7</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}