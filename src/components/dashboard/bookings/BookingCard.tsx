'use client';

import { motion } from 'framer-motion';
import { Calendar, MapPin, Users, Clock, Download, MessageCircle, Phone } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Booking {
  id: string;
  tourName: string;
  location: string;
  bookingDate: string;
  travelDate: string;
  travelers: number;
  totalAmount: string;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
  paymentStatus: 'paid' | 'partial' | 'pending';
  paidAmount?: string;
  guide: string;
  guidePhone: string;
}

const statusConfig = {
  confirmed: { color: 'bg-green-100 text-green-700', label: 'Confirmed' },
  pending: { color: 'bg-yellow-100 text-yellow-700', label: 'Pending' },
  completed: { color: 'bg-blue-100 text-blue-700', label: 'Completed' },
  cancelled: { color: 'bg-red-100 text-red-700', label: 'Cancelled' }
};

const paymentStatusConfig = {
  paid: { color: 'bg-green-100 text-green-700', label: 'Paid' },
  partial: { color: 'bg-orange-100 text-orange-700', label: 'Partial' },
  pending: { color: 'bg-red-100 text-red-700', label: 'Pending' }
};

interface BookingCardProps {
  booking: Booking;
  index: number;
}

export default function BookingCard({ booking, index }: BookingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 * index }}
    >
      <Card className="professional-card border-0 overflow-hidden">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-violet-500 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg">{booking.tourName}</CardTitle>
                <p className="text-gray-600 flex items-center gap-1 mt-1">
                  <MapPin className="w-4 h-4" />
                  {booking.location}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge className={`${statusConfig[booking.status].color} border-0`}>
                {statusConfig[booking.status].label}
              </Badge>
              <Badge className={`${paymentStatusConfig[booking.paymentStatus].color} border-0`}>
                {paymentStatusConfig[booking.paymentStatus].label}
              </Badge>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Booking Details */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Calendar className="w-5 h-5 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600">Booking ID</p>
                <p className="font-semibold">{booking.id}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Clock className="w-5 h-5 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600">Travel Date</p>
                <p className="font-semibold">{new Date(booking.travelDate).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Users className="w-5 h-5 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600">Travelers</p>
                <p className="font-semibold">{booking.travelers} people</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-5 h-5 bg-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">৳</span>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Amount</p>
                <p className="font-semibold">{booking.totalAmount}</p>
              </div>
            </div>
          </div>

          {/* Payment Progress */}
          {booking.paymentStatus === 'partial' && booking.paidAmount && (
            <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-orange-700">Payment Progress</span>
                <span className="text-sm font-medium text-orange-700">
                  {booking.paidAmount} / {booking.totalAmount}
                </span>
              </div>
              <div className="w-full bg-orange-200 rounded-full h-2">
                <div 
                  className="bg-orange-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: '50%' }}
                />
              </div>
              <p className="text-xs text-orange-600 mt-2">
                Remaining: ৳{parseInt(booking.totalAmount.replace('৳', '').replace(',', '')) - parseInt(booking.paidAmount.replace('৳', '').replace(',', ''))}
              </p>
            </div>
          )}

          {/* Guide Information */}
          <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg border border-purple-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-violet-500 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">
                  {booking.guide.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div>
                <p className="font-semibold text-gray-900">{booking.guide}</p>
                <p className="text-sm text-gray-600">Tour Guide</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="border-purple-200 text-purple-700 hover:bg-purple-50">
                <MessageCircle className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="outline" className="border-purple-200 text-purple-700 hover:bg-purple-50">
                <Phone className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <Button size="sm" className="bg-gradient-to-r from-purple-500 to-violet-500 hover:from-purple-600 hover:to-violet-600">
              View Details
            </Button>
            <Button size="sm" variant="outline" className="border-gray-200 text-gray-600 hover:bg-gray-50">
              <Download className="w-4 h-4 mr-2" />
              Download Voucher
            </Button>
            {booking.status === 'pending' && (
              <Button size="sm" variant="outline" className="border-red-200 text-red-700 hover:bg-red-50">
                Cancel Booking
              </Button>
            )}
            {booking.paymentStatus === 'partial' && (
              <Button size="sm" className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600">
                Complete Payment
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}