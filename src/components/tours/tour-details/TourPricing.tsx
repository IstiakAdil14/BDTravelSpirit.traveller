'use client';

import { useState } from 'react';
import { Calendar, Users, Tag, Info, CreditCard, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface TourPricingProps {
  tour: any;
}

export default function TourPricing({ tour }: TourPricingProps) {
  const [selectedDeparture, setSelectedDeparture] = useState(0);
  const [travelers, setTravelers] = useState(1);

  const departures = tour.departures || (tour.departure ? [tour.departure] : []);
  const discounts = tour.discounts || [];
  const basePrice = tour.basePrice || { amount: 0, currency: 'BDT' };

  // Calculate discounted price
  const calculateDiscountedPrice = () => {
    let price = basePrice.amount;
    let totalDiscount = 0;

    discounts.forEach((discount: any) => {
      if (discount.validFrom && discount.validUntil) {
        const now = new Date();
        const validFrom = new Date(discount.validFrom);
        const validUntil = new Date(discount.validUntil);
        
        if (now >= validFrom && now <= validUntil) {
          totalDiscount += discount.value;
        }
      } else {
        totalDiscount += discount.value;
      }
    });

    const discountAmount = (price * totalDiscount) / 100;
    return {
      original: price,
      discounted: price - discountAmount,
      savings: discountAmount,
      discountPercent: totalDiscount
    };
  };

  const pricing = calculateDiscountedPrice();
  const totalPrice = pricing.discounted * travelers;

  return (
    <div className="space-y-6 p-6">
      {/* Premium Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 px-4 py-2 rounded-full mb-4">
          <span className="text-2xl">💰</span>
          <span className="font-semibold text-gray-700">Premium Pricing</span>
        </div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent mb-3">
          Pricing & Availability
        </h2>
        <p className="text-gray-600 max-w-md mx-auto">
          Choose your preferred departure date and number of travelers
        </p>
      </div>

      {/* Scarcity Alert */}
      {departures.length > 0 && (departures[0].seatsTotal - departures[0].seatsBooked) <= 5 && (departures[0].seatsTotal - departures[0].seatsBooked) > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3 shadow-sm animate-in fade-in slide-in-from-top-4">
          <div className="bg-red-100 text-red-600 rounded-full p-2 shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-red-800 font-bold">High Demand!</h4>
            <p className="text-red-700 text-sm">
              Only <span className="font-extrabold text-lg">{departures[0].seatsTotal - departures[0].seatsBooked}</span> seats left for this departure. Book soon!
            </p>
          </div>
        </div>
      )}



      {/* Operating Windows */}

      {/* Payment Methods */}
      {tour.paymentMethods && tour.paymentMethods.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Payment Options
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {tour.paymentMethods.map((method: string) => (
                <div key={method} className="flex items-center gap-2 p-2 border border-gray-200 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span className="text-sm capitalize">{method.replace('_', ' ')}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Important Notes */}
      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          <div className="space-y-1">
            <p><strong>Important:</strong> Prices are subject to availability and may change.</p>
            <p>• All prices are per person and include taxes</p>
            <p>• Group discounts may be available for 6+ travelers</p>
            <p>• Final price will be confirmed at booking</p>
          </div>
        </AlertDescription>
      </Alert>
    </div>
  );
}