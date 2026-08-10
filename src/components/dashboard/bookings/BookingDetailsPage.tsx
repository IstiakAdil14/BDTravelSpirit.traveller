"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Loader2, ArrowLeft, CalendarDays, MapPin, CheckCircle,
  Clock, Hash, Timer, Banknote, User, Phone, Mail, FileText,
  Building2, Car, Download, XCircle, AlertCircle, Check, Map, Info, Star, ShieldCheck, ChevronDown, ChevronUp,
  CreditCard, MessageSquare, ShieldAlert, ListChecks, ExternalLink
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Image from "next/image";
import QRCode from "react-qr-code";

// Accordion Item Component
const AccordionItem = ({ title, children, defaultOpen = false }: { title: React.ReactNode, children: React.ReactNode, defaultOpen?: boolean }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden mb-3 bg-white">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 transition-colors text-left"
      >
        <span className="font-semibold text-slate-800">{title}</span>
        {isOpen ? <ChevronUp className="w-5 h-5 text-slate-500" /> : <ChevronDown className="w-5 h-5 text-slate-500" />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="p-4 border-t border-slate-200">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function BookingDetailsPage({ bookingId }: { bookingId: string | null }) {
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    if (!bookingId) {
      setLoading(false);
      return;
    }

    fetch(`/api/bookings/${bookingId}`)
      .then((r) => r.json())
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [bookingId]);

  const handleDownloadVoucher = async () => {
    if (!data) return;
    try {
      setDownloading(true);
      const { pdf } = await import('@react-pdf/renderer');
      const VoucherPDF = (await import('./VoucherPDF')).default;

      // We map the DTO back to the expected format for VoucherPDF
      const mockBooking = {
        id: data.bookingSummary.id,
        title: data.tourDetails.title,
        location: data.tourDetails.location,
        date: data.bookingSummary.travelDates,
        status: data.bookingSummary.status,
        price: `৳${data.financials.totalPaid.toLocaleString()}`,
        duration: data.tourDetails.duration,
        participants: data.bookingSummary.totalParticipants,
        paymentMethod: data.financials.paymentMethod,
        paymentStatus: data.financials.paymentStatus,
        operatorName: data.operator.name,
        operatorPhone: data.operator.phone,
        operatorEmail: data.operator.email,
        meetingPoint: data.tourDetails.meetingPoint,
        pickupTime: data.tourDetails.pickupTime,
        travelerName: data.traveler.name,
        travelerEmail: data.traveler.email,
        travelerPhone: data.traveler.phone,
        basePrice: data.financials.basePrice,
        subTotal: data.financials.subTotal,
        discounts: data.financials.discounts,
        totalPaid: data.financials.totalPaid,
        packingList: data.tourDetails.packingList,
        cancellationPolicy: data.policies?.cancellation
          ? (data.policies.cancellation.refundable
            ? `Refundable. ${data.policies.cancellation.rules?.map((r: any) => `${r.refundPercent}% refund up to ${r.daysBefore} days before.`).join(' ')}`
            : "Non-refundable")
          : undefined,
      } as any;

      const blob = await pdf(<VoucherPDF booking={mockBooking} />).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Voucher-${mockBooking.id}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.success("Voucher downloaded successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to generate voucher.");
    } finally {
      setDownloading(false);
    }
  };

  const handleSaveQR = () => {
    const svg = document.getElementById("booking-qr-code");
    if (!svg) {
      toast.error("QR Code not found");
      return;
    }
    
    try {
      const svgData = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new window.Image();
      
      img.onload = () => {
        // Add some padding and a white background for the PNG
        const padding = 20;
        canvas.width = img.width + (padding * 2);
        canvas.height = img.height + (padding * 2);
        
        if (ctx) {
          ctx.fillStyle = "white";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, padding, padding);
          
          const url = canvas.toDataURL("image/png");
          const a = document.createElement("a");
          a.href = url;
          a.download = `Booking-QR-${data?.bookingSummary?.id || 'Pass'}.png`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          toast.success("QR Code saved successfully!");
        }
      };
      
      img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData)));
    } catch (err) {
      console.error("Error saving QR:", err);
      toast.error("Failed to save QR code");
    }
  };

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!data || data.error) {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center space-y-4">
        <AlertCircle className="h-12 w-12 text-slate-400" />
        <p className="text-lg text-slate-500 font-medium">{data?.error || "Booking not found"}</p>
        <Button onClick={() => router.back()} variant="outline">
          <ArrowLeft className="w-4 h-4 mr-2" /> Go Back
        </Button>
      </div>
    );
  }

  const { bookingSummary, financials, traveler, operator, tourDetails, itinerary, inclusionsExclusions, policies, timeline } = data;

  return (
    <div className="space-y-6 pb-12 max-w-6xl mx-auto">
      {/* Top Nav */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors bg-white px-4 py-2 rounded-full shadow-sm border border-slate-200"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Dashboard
        </button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left Column - Main Content */}
        <div className="lg:col-span-2 space-y-6">

          {/* Header Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden relative">
            {tourDetails.heroImage ? (
              <div className="h-64 sm:h-72 w-full relative">
                <img src={tourDetails.heroImage} alt="Tour Image" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              </div>
            ) : (
              <div className="h-64 sm:h-72 w-full relative bg-slate-900">
                <img src="https://images.unsplash.com/photo-1528181304800-259b08848526?q=80&w=3270&auto=format&fit=crop" alt="Tour Cover" className="w-full h-full object-cover opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              </div>
            )}
            <div className={`p-6 absolute bottom-0 w-full text-white`}>
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <Badge variant={bookingSummary.status === 'confirmed' || bookingSummary.status === 'completed' ? 'default' : 'secondary'} className="px-3 py-1 text-sm font-semibold uppercase flex items-center gap-1.5">
                  {(bookingSummary.status === 'confirmed' || bookingSummary.status === 'completed') && <Check className="w-4 h-4" />}
                  {bookingSummary.status}
                </Badge>
                {financials.paymentStatus === 'paid' && (
                  <Badge className="bg-emerald-500 text-white hover:bg-emerald-600 border-none px-3 py-1 text-sm font-semibold uppercase flex items-center gap-1.5">
                    <CreditCard className="w-4 h-4" /> Paid
                  </Badge>
                )}
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-balance">{tourDetails.title}</h1>

              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-3">
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/10">
                  <span className="text-sm font-medium opacity-80">Booking Ref:</span>
                  <span className="font-bold tracking-wider">#{bookingSummary.id}</span>
                </div>
                <div className="flex items-center gap-4 text-sm font-medium opacity-90">
                  <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {tourDetails.location}</span>
                  <span className="flex items-center gap-1.5"><Timer className="w-4 h-4" /> {tourDetails.duration}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Summary & Financials */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" /> Booking Summary
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <p className="text-xs text-slate-500 mb-1 flex items-center gap-1"><CalendarDays className="w-3.5 h-3.5" /> Travel Dates</p>
                <p className="font-semibold text-slate-900">{bookingSummary.travelDates}</p>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <p className="text-xs text-slate-500 mb-1 flex items-center gap-1"><User className="w-3.5 h-3.5" /> Travelers</p>
                <p className="font-semibold text-slate-900">{bookingSummary.totalParticipants} Participants</p>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <p className="text-xs text-slate-500 mb-1 flex items-center gap-1"><Banknote className="w-3.5 h-3.5" /> Total Paid</p>
                <p className="font-semibold text-slate-900">৳{financials.totalPaid.toLocaleString()}</p>
              </div>
            </div>

            <div className="mt-6 border-t border-slate-100 pt-4">
              <p className="text-sm font-semibold text-slate-700 mb-2">Financial Breakdown</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-slate-600">
                  <span>Price Per Person</span>
                  <span>৳{financials.basePrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Participants (x{bookingSummary.totalParticipants})</span>
                  <span>৳{financials.subTotal.toLocaleString()}</span>
                </div>
                {financials.discounts.length > 0 ? (
                  financials.discounts.map((d: any, idx: number) => (
                    <div key={idx} className="flex justify-between text-emerald-600 font-medium">
                      <span>Discount ({d.discount || d.type})</span>
                      <span>- ৳{d.value.toLocaleString()}</span>
                    </div>
                  ))
                ) : (
                  <div className="flex justify-between text-slate-600">
                    <span>Discount</span>
                    <span>৳0</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-600">
                  <span>Taxes & Fees</span>
                  <span>৳0</span>
                </div>
                <div className="flex justify-between font-bold text-slate-900 pt-2 border-t border-slate-100 text-base">
                  <span>Total Paid</span>
                  <span>৳{financials.totalPaid.toLocaleString()}</span>
                </div>
                <div className="text-xs text-slate-400 mt-1 flex justify-between">
                  <span>Method: {financials.paymentMethod.toUpperCase()}</span>
                  <span>TXN ID: {financials.transactionId || 'N/A'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Logistics & Tour Details */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Map className="w-5 h-5 text-blue-600" /> Logistics & Meeting Info
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <div className="bg-blue-50 p-2 rounded-lg text-blue-600"><MapPin className="w-5 h-5" /></div>
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Meeting Point</p>
                  <p className="text-sm font-medium text-slate-900 mt-0.5">{tourDetails.meetingPoint}</p>
                  <p className="text-xs text-slate-500 mt-0.5 mb-2">Time: {tourDetails.pickupTime}</p>
                  <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(tourDetails.meetingPoint + ', ' + tourDetails.location)}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors">
                    View on Google Maps <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-purple-50 p-2 rounded-lg text-purple-600"><Car className="w-5 h-5" /></div>
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Transport Mode</p>
                  <p className="text-sm font-medium text-slate-900 mt-0.5">{tourDetails.transport}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Itinerary */}
          {itinerary && itinerary.length > 0 && (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <CalendarDays className="w-5 h-5 text-blue-600" /> Itinerary Breakdown
              </h2>
              <div>
                {itinerary.map((day: any, idx: number) => (
                  <AccordionItem key={idx} title={`Day ${day.day}: ${day.title || 'Activities'}`} defaultOpen={idx === 0}>
                    <p className="text-sm text-slate-600 mb-3">{day.description}</p>
                    <div className="grid grid-cols-2 gap-2 text-xs font-medium text-slate-500">
                      {day.mealsProvided?.length > 0 && <div>🍽 Meals: {day.mealsProvided.join(", ")}</div>}
                      {day.accommodation && <div>🏨 Stay: {day.accommodation}</div>}
                      {day.travelMode && <div>🚌 Travel: {day.travelMode} ({day.travelDistance || ''})</div>}
                    </div>
                  </AccordionItem>
                ))}
              </div>
            </div>
          )}

          {/* Inclusions & Exclusions */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-blue-600" /> Inclusions & Exclusions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-emerald-600 flex items-center gap-1.5 mb-3"><Check className="w-4 h-4" /> Included</h3>
                <ul className="space-y-2">
                  {inclusionsExclusions.inclusions.map((inc: any, i: number) => (
                    <li key={i} className="text-sm text-slate-600 flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                      <span><strong>{inc.label}</strong> {inc.description && `- ${inc.description}`}</span>
                    </li>
                  ))}
                  {inclusionsExclusions.inclusions.length === 0 && <p className="text-sm text-slate-400 italic">No inclusions listed.</p>}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-rose-500 flex items-center gap-1.5 mb-3"><XCircle className="w-4 h-4" /> Excluded</h3>
                <ul className="space-y-2">
                  {inclusionsExclusions.exclusions.map((exc: any, i: number) => (
                    <li key={i} className="text-sm text-slate-600 flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 shrink-0" />
                      <span><strong>{exc.label}</strong> {exc.description && `- ${exc.description}`}</span>
                    </li>
                  ))}
                  {inclusionsExclusions.exclusions.length === 0 && <p className="text-sm text-slate-400 italic">No exclusions listed.</p>}
                </ul>
              </div>
            </div>
          </div>

          {/* Policies */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-blue-600" /> Booking Policies
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {policies?.cancellation ? (
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <h3 className="font-semibold text-slate-800 text-sm mb-1">Cancellation Policy</h3>
                  {policies.cancellation.refundable ? (
                    <div className="text-sm text-slate-600 space-y-1">
                      <p>Refundable. Rules:</p>
                      <ul className="list-disc list-inside">
                        {policies.cancellation.rules?.map((r: any, i: number) => (
                          <li key={i}>{r.refundPercent}% refund if cancelled {r.daysBefore} days before departure.</li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <p className="text-sm text-slate-600">This booking is non-refundable.</p>
                  )}
                </div>
              ) : (
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <h3 className="font-semibold text-slate-800 text-sm mb-1">Cancellation Policy</h3>
                  <p className="text-sm text-slate-600">Standard cancellation policies apply. Contact operator for details.</p>
                </div>
              )}

              {policies?.refund ? (
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <h3 className="font-semibold text-slate-800 text-sm mb-1">Refund Policy</h3>
                  <p className="text-sm text-slate-600">
                    Method: {policies.refund.method?.join(", ") || "Original Payment Method"}.
                    Processing time: {policies.refund.processingDays || "7-14"} days.
                  </p>
                </div>
              ) : (
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <h3 className="font-semibold text-slate-800 text-sm mb-1">Refund Policy</h3>
                  <p className="text-sm text-slate-600">Refunds are processed within 7-14 business days if applicable.</p>
                </div>
              )}
            </div>
          </div>

          {/* Review Section */}
          {bookingSummary.status === 'completed' && (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 bg-gradient-to-br from-indigo-50 to-white">
              <h2 className="text-lg font-bold text-indigo-900 mb-2 flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" /> Rate Your Experience
              </h2>
              <p className="text-sm text-slate-600 mb-4">Your trip has ended. How was your experience with {operator.name}?</p>
              {data.review ? (
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < data.review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-slate-300'}`} />
                    ))}
                  </div>
                  <p className="text-sm text-slate-700 italic">"{data.review.comment}"</p>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <button key={i} className="hover:scale-110 transition-transform p-1">
                        <Star className="w-8 h-8 text-slate-300 hover:text-yellow-400 hover:fill-yellow-400" />
                      </button>
                    ))}
                  </div>
                  <Button className="ml-4 bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm">Write a Review</Button>
                </div>
              )}
            </div>
          )}

        </div>

        {/* Right Column - Sticky Sidebar */}
        <div className="space-y-6">

          {/* Booking Pass */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 text-center text-white">
              <h3 className="font-bold">Booking Pass</h3>
              <p className="text-xs opacity-90 font-medium mt-0.5">Show this to your guide</p>
            </div>
            <div className="p-6 flex flex-col items-center justify-center bg-slate-50 border-b border-slate-200">
              <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-200 mb-3">
                <QRCode
                  id="booking-qr-code"
                  value={`${typeof window !== 'undefined' ? window.location.origin : ''}/verify/${bookingSummary.verificationToken}`}
                  size={140}
                />
              </div>
              <div className="flex gap-2 mb-3">
                {['confirmed', 'completed'].includes(bookingSummary.status) && (
                  <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-emerald-200 px-2 py-0.5 text-[10px] uppercase flex items-center gap-1">
                    <Check className="w-3 h-3" /> Confirmed
                  </Badge>
                )}
                {financials.paymentStatus === 'paid' && (
                  <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 border-blue-200 px-2 py-0.5 text-[10px] uppercase flex items-center gap-1">
                    <Check className="w-3 h-3" /> Paid
                  </Badge>
                )}
              </div>
              <p className="text-xs text-slate-500 uppercase font-semibold tracking-wider mb-1">Scan for Verification</p>
              <p className="text-xl font-bold text-slate-900 tracking-wider">#{bookingSummary.id}</p>
            </div>
          </div>

          {/* Action Bar */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 sticky top-6">
            <h3 className="font-bold text-slate-900 mb-4">Manage Booking</h3>
            <div className="space-y-3">
              <Button onClick={handleDownloadVoucher} disabled={downloading} className="w-full justify-start gap-2 h-11 bg-slate-900 text-white hover:bg-slate-800 transition-colors">
                {downloading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                Download Voucher/Invoice
              </Button>
              <Button onClick={handleSaveQR} variant="outline" className="w-full justify-start gap-2 h-11 border-slate-200 hover:bg-slate-50">
                <ExternalLink className="w-4 h-4 text-slate-500" />
                Add to Wallet / Save QR
              </Button>

              {['pending', 'confirmed'].includes(bookingSummary.status) && (
                <Button variant="ghost" className="w-full justify-start gap-2 h-11 text-red-600 hover:text-red-700 hover:bg-red-50">
                  <XCircle className="w-4 h-4" />
                  Cancel Booking
                </Button>
              )}
            </div>
          </div>

          {/* Contact / Need Help? Info */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-slate-500" /> Need Help?
            </h3>
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-slate-800">{operator.name}</span>
                {operator.verified && <ShieldCheck className="w-4 h-4 text-blue-500" />}
              </div>
              <p className="text-xs text-slate-500">Tour Operator</p>
            </div>

            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start gap-2 border-slate-200 hover:bg-slate-50 h-10">
                <Phone className="w-4 h-4 text-slate-500" />
                Call Operator
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2 border-slate-200 hover:bg-slate-50 h-10">
                <Mail className="w-4 h-4 text-slate-500" />
                Email Operator
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2 border-slate-200 hover:bg-slate-50 text-blue-600 hover:text-blue-700 h-10">
                <MessageSquare className="w-4 h-4 text-blue-500" />
                Contact Platform Support
              </Button>
            </div>
          </div>

          {/* Travel Essentials */}
          {tourDetails.packingList && tourDetails.packingList.length > 0 && (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
              <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                <ListChecks className="w-4 h-4 text-slate-500" /> Travel Essentials
              </h3>
              <div className="space-y-3 text-sm text-slate-700">
                <p className="font-medium text-slate-900">Please bring:</p>
                <ul className="space-y-2.5">
                  {tourDetails.packingList.map((packItem: any, idx: number) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="leading-tight">
                        {packItem.item} {packItem.required && <span className="text-xs font-semibold text-rose-500 ml-1">(Required)</span>}
                        {packItem.notes && <span className="block text-xs text-slate-500 mt-0.5">{packItem.notes}</span>}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Traveler Details */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <User className="w-4 h-4 text-slate-500" /> Traveler Info
            </h3>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-slate-500 text-xs">Name</p>
                <p className="font-medium text-slate-900">{traveler.name}</p>
              </div>
              <div>
                <p className="text-slate-500 text-xs">Email</p>
                <p className="font-medium text-slate-900 break-all">{traveler.email}</p>
              </div>
              {traveler.phone && (
                <div>
                  <p className="text-slate-500 text-xs">Phone</p>
                  <p className="font-medium text-slate-900">{traveler.phone}</p>
                </div>
              )}
              {traveler.emergencyContact && traveler.emergencyContact.length > 0 && (
                <div>
                  <p className="text-slate-500 text-xs text-rose-600 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> Emergency Contact</p>
                  <p className="font-medium text-slate-900">{traveler.emergencyContact[0].name} - {traveler.emergencyContact[0].phone}</p>
                </div>
              )}
            </div>
          </div>

          {/* Booking Timeline */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Clock className="w-4 h-4 text-slate-500" /> Booking Timeline
            </h3>
            <div className="space-y-4 relative before:absolute before:inset-0 before:ml-[11px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-slate-200">
              {timeline.map((event: any, i: number) => (
                <div key={i} className={`relative flex items-center gap-3 ${event.status === 'upcoming' ? 'opacity-50' : ''}`}>
                  <div className={`w-6 h-6 rounded-full shrink-0 flex items-center justify-center border-2 bg-white ${event.status === 'completed' ? 'border-emerald-500 text-emerald-500' : event.status === 'cancelled' ? 'border-red-500 text-red-500' : 'border-slate-300 text-slate-300'}`}>
                    {event.status === 'completed' ? <Check className="w-3 h-3" /> : event.status === 'cancelled' ? <XCircle className="w-3 h-3" /> : event.status === 'upcoming' ? <div className="w-2 h-2 rounded-full bg-slate-300" /> : <Clock className="w-3 h-3" />}
                  </div>
                  <div>
                    <p className={`text-sm font-bold ${event.status === 'completed' ? 'text-emerald-700' : event.status === 'cancelled' ? 'text-red-600' : 'text-slate-700'}`}>{event.label}</p>
                    {event.date && <p className="text-xs text-slate-500">{new Date(event.date).toLocaleString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</p>}
                    {!event.date && <p className="text-xs text-slate-500">Pending</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

