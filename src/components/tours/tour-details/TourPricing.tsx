'use client';

import { useState } from 'react';
import { Calendar, Users, Tag, Info, CreditCard } from 'lucide-react';
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

  const departures = tour.departures || [];
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

      {/* Price Display Card */}
      <div className="relative">
        <div className="absolute -inset-2 bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 rounded-2xl blur opacity-20 animate-pulse"></div>
        <div className="relative bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 backdrop-blur-xl border border-white/50 rounded-2xl p-8 shadow-2xl">
          <div className="text-center">
            <div className="flex items-center justify-center gap-4 mb-6">
              {pricing.discountPercent > 0 && (
                <div className="text-2xl text-gray-400 line-through">
                  {basePrice.currency} {pricing.original.toLocaleString()}
                </div>
              )}
              <div className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                {basePrice.currency} {pricing.discounted.toLocaleString()}
              </div>
            </div>
            <div className="text-gray-600 mb-4">per person</div>
            
            {pricing.discountPercent > 0 && (
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                <span>🎉</span>
                <span>Save {pricing.discountPercent}% • {basePrice.currency} {pricing.savings.toLocaleString()} OFF</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Active Discounts */}
      {discounts.length > 0 && (
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-emerald-400 rounded-xl blur opacity-30"></div>
          <div className="relative bg-gradient-to-br from-green-50 to-emerald-50 backdrop-blur-sm border border-green-200/50 rounded-xl overflow-hidden">
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Tag className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Active Discounts</h3>
                  <p className="text-green-100 text-sm">Limited time offers</p>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {discounts.map((discount: any, index: number) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-green-200/30 shadow-sm">
                    <div>
                      <div className="font-semibold text-green-800 capitalize flex items-center gap-2">
                        <span className="text-lg">🎁</span>
                        {discount.type.replace('_', ' ')} Discount
                      </div>
                      {discount.code && (
                        <div className="text-sm text-green-600 font-mono bg-green-100 px-2 py-1 rounded mt-1 inline-block">
                          Code: {discount.code}
                        </div>
                      )}
                      {discount.validUntil && (
                        <div className="text-xs text-green-600 mt-1">
                          ⏰ Valid until: {new Date(discount.validUntil).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                    <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg">
                      {discount.value}% OFF
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Departure Dates */}
      {departures.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Available Departures
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {departures.map((departure: any, index: number) => {
                const availableSeats = departure.seatsTotal - departure.seatsBooked;
                const isAvailable = availableSeats > 0;
                
                return (
                  <div
                    key={index}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedDeparture === index
                        ? 'border-blue-500 bg-blue-50'
                        : isAvailable
                        ? 'border-gray-200 hover:border-gray-300'
                        : 'border-gray-200 bg-gray-50 cursor-not-allowed'
                    }`}
                    onClick={() => isAvailable && setSelectedDeparture(index)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-gray-900">
                          {new Date(departure.date).toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </div>
                        {departure.meetingPoint && (
                          <div className="text-sm text-gray-600 mt-1">
                            Meeting: {departure.meetingPoint}
                          </div>
                        )}
                      </div>
                      <div className="text-right">
                        <div className={`text-sm ${isAvailable ? 'text-green-600' : 'text-red-600'}`}>
                          {isAvailable ? `${availableSeats} seats left` : 'Fully booked'}
                        </div>
                        <div className="text-xs text-gray-500">
                          {departure.seatsTotal} total seats
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Operating Windows */}
      {tour.operatingWindows && tour.operatingWindows.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Operating Seasons</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {tour.operatingWindows.map((window: any, index: number) => (
                <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900">
                      {new Date(window.startDate).toLocaleDateString()} - {new Date(window.endDate).toLocaleDateString()}
                    </div>
                  </div>
                  {window.seatsTotal && (
                    <div className="text-sm text-gray-600">
                      Capacity: {window.seatsTotal} travelers
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

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