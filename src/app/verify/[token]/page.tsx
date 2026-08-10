"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { 
  CheckCircle2, XCircle, AlertTriangle, Loader2, MapPin, 
  Calendar, Users, Banknote, ShieldCheck, ArrowLeft 
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function VerificationPage() {
  const { token } = useParams();
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;
    
    fetch(`/api/verify/${token}`)
      .then(res => res.json().then(data => ({ status: res.status, data })))
      .then(({ status, data }) => {
        if (status !== 200) {
          setError(data.error || "Invalid Booking");
        } else {
          setData(data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to verify booking");
        setLoading(false);
      });
  }, [token]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-6">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600 mb-4" />
        <p className="text-slate-600 font-medium animate-pulse">Verifying Booking...</p>
      </div>
    );
  }

  // Error State: Invalid Booking
  if (error || !data) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50">
        <div className="p-4 flex items-center justify-between bg-white border-b border-slate-200">
          <button onClick={() => router.push("/")} className="text-slate-500 hover:text-slate-900 transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <span className="font-bold text-slate-800">Booking Verification</span>
          <div className="w-6" /> {/* Spacer */}
        </div>
        
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-red-100 p-4 rounded-full mb-4">
            <XCircle className="w-12 h-12 text-red-600" />
          </motion.div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Verification Failed</h1>
          <p className="text-slate-600 mb-6">{error || "This booking could not be verified."}</p>
          <button onClick={() => router.push("/")} className="bg-slate-900 text-white px-6 py-2.5 rounded-full font-medium hover:bg-slate-800 transition-colors">
            Go to Homepage
          </button>
        </div>
      </div>
    );
  }

  const isConfirmed = data.status === "confirmed";
  const isPaid = data.paymentStatus === "paid";
  const isCancelled = data.status === "cancelled";
  const isCompleted = data.status === "completed";
  const isPending = data.status === "pending";

  let StatusIcon = CheckCircle2;
  let statusColor = "text-emerald-600";
  let statusBg = "bg-emerald-50";
  let statusTitle = "Booking Verified";
  let statusSubtitle = "Valid and ready for tour";

  if (isCancelled) {
    StatusIcon = XCircle;
    statusColor = "text-red-600";
    statusBg = "bg-red-50";
    statusTitle = "Booking Cancelled";
    statusSubtitle = "This booking is no longer valid";
  } else if (isCompleted) {
    StatusIcon = CheckCircle2;
    statusColor = "text-blue-600";
    statusBg = "bg-blue-50";
    statusTitle = "Tour Completed";
    statusSubtitle = "This booking has already been completed";
  } else if (!isConfirmed || !isPaid) {
    StatusIcon = AlertTriangle;
    statusColor = "text-amber-600";
    statusBg = "bg-amber-50";
    statusTitle = "Action Required";
    statusSubtitle = !isPaid ? "Payment is pending" : "Booking is pending confirmation";
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <div className="p-4 flex items-center justify-between bg-white shadow-sm border-b border-slate-200 sticky top-0 z-10">
        <div className="flex items-center gap-2 text-slate-800 font-bold">
          <ShieldCheck className="w-5 h-5 text-blue-600" />
          Verification Portal
        </div>
      </div>

      <div className="flex-1 p-4 max-w-md w-full mx-auto space-y-4">
        {/* Status Card */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }}
          className={`rounded-2xl p-6 text-center border shadow-sm ${statusBg} ${statusColor.replace('text', 'border')}`}
        >
          <StatusIcon className={`w-16 h-16 mx-auto mb-3 ${statusColor}`} />
          <h1 className={`text-2xl font-bold mb-1 ${statusColor}`}>{statusTitle}</h1>
          <p className="text-slate-600 text-sm font-medium">{statusSubtitle}</p>
        </motion.div>

        {/* Details Card */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden"
        >
          <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
            <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Ref ID</span>
            <span className="font-bold text-slate-900 tracking-wider">#{data.bookingReference}</span>
          </div>
          
          <div className="p-5 space-y-4">
            <div>
              <p className="text-xs text-slate-500 font-medium mb-1">Tour Name</p>
              <p className="font-bold text-slate-900 text-lg leading-tight">{data.tourName}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-slate-500 font-medium mb-1 flex items-center gap-1"><Users className="w-3.5 h-3.5" /> Traveler</p>
                <p className="font-semibold text-slate-900">{data.travelerName}</p>
                <p className="text-xs text-slate-600 mt-0.5">{data.participants} Participant(s)</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium mb-1 flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> Date</p>
                <p className="font-semibold text-slate-900">{data.travelDate}</p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-slate-500 font-medium mb-1">Status</p>
                <Badge variant={isConfirmed || isCompleted ? 'default' : isCancelled ? 'destructive' : 'secondary'} className="uppercase text-[10px]">
                  {data.status}
                </Badge>
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium mb-1 flex items-center gap-1"><Banknote className="w-3.5 h-3.5" /> Payment</p>
                <Badge variant={isPaid ? 'default' : 'secondary'} className={`uppercase text-[10px] ${isPaid ? 'bg-emerald-500 hover:bg-emerald-600' : ''}`}>
                  {data.paymentStatus}
                </Badge>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <p className="text-xs text-slate-500 font-medium mb-1 flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> Meeting Point</p>
              <p className="font-medium text-slate-800 text-sm">{data.meetingPoint}</p>
            </div>
          </div>
        </motion.div>
      </div>
      
      <div className="p-6 text-center text-xs text-slate-400 font-medium">
        Powered by BD Travel Spirit
      </div>
    </div>
  );
}
