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
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Pricing & Availability</h2>
        <p className="text-gray-600">
          Choose your preferred departure date and number of travelers
        </p>
      </div>

      {/* Base Price Card */}

      {/* Active Discounts */}
      {discounts.length > 0 && (
        <Card className="border-green-200">
          <CardHeader className="bg-green-50">
            <CardTitle className="flex items-center gap-2 text-green-800">
              <Tag className="h-5 w-5" />
              Active Discounts
            </CardTitle>
          </CardHeader>
          <CardContent className="py-4">
            <div className="space-y-3">
              {discounts.map((discount: any, index: number) => (
                <div key={index} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div>
                    <div className="font-medium text-green-800 capitalize">
                      {discount.type.replace('_', ' ')} Discount
                    </div>
                    {discount.code && (
                      <div className="text-sm text-green-600">Code: {discount.code}</div>
                    )}
                    {discount.validUntil && (
                      <div className="text-xs text-green-600">
                        Valid until: {new Date(discount.validUntil).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                  <Badge variant="default" className="bg-green-600">
                    {discount.value}% OFF
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
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