'use client';

import { Check, X, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface TourInclusionsProps {
  tour: any;
}

export default function TourInclusions({ tour }: TourInclusionsProps) {
  const inclusions = tour.inclusions || [];
  const exclusions = tour.exclusions || [];

  return (
    <div className="space-y-8">
      {/* Premium Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500/10 to-red-500/10 px-6 py-3 rounded-full mb-6">
          <span className="text-2xl">🎁</span>
          <span className="font-bold text-gray-700">Package Details</span>
        </div>
        <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-green-900 to-red-900 bg-clip-text text-transparent mb-4">
          What's Included & Excluded
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          Everything you need to know about what's covered in your tour package
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Premium Inclusions */}
        <div className="relative">
          <div className="absolute -inset-2 bg-gradient-to-r from-green-400 to-emerald-400 rounded-2xl blur opacity-20"></div>
          <div className="relative bg-gradient-to-br from-green-50 to-emerald-50 backdrop-blur-sm border border-green-200/50 rounded-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <Check className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">What's Included</h3>
                  <p className="text-green-100">Everything covered in your package</p>
                </div>
              </div>
            </div>
            <div className="p-6">
              {inclusions.length > 0 ? (
                <div className="space-y-4">
                  {inclusions.map((inclusion: any, index: number) => (
                    <div key={index} className="flex items-start gap-4 p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-green-200/30 shadow-sm hover:shadow-md transition-all duration-200">
                      <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <Check className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 text-lg">{inclusion.label}</h4>
                        {inclusion.description && (
                          <p className="text-gray-600 mt-1">{inclusion.description}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="h-10 w-10 text-green-500" />
                  </div>
                  <p className="text-gray-600 font-semibold text-lg">Standard inclusions apply</p>
                  <p className="text-gray-500 mt-2">
                    Contact us for detailed information about what's included
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Premium Exclusions */}
        <div className="relative">
          <div className="absolute -inset-2 bg-gradient-to-r from-red-400 to-pink-400 rounded-2xl blur opacity-20"></div>
          <div className="relative bg-gradient-to-br from-red-50 to-pink-50 backdrop-blur-sm border border-red-200/50 rounded-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <X className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">What's Not Included</h3>
                  <p className="text-red-100">Additional costs you should know about</p>
                </div>
              </div>
            </div>
            <div className="p-6">
              {exclusions.length > 0 ? (
                <div className="space-y-4">
                  {exclusions.map((exclusion: any, index: number) => (
                    <div key={index} className="flex items-start gap-4 p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-red-200/30 shadow-sm hover:shadow-md transition-all duration-200">
                      <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <X className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 text-lg">{exclusion.label}</h4>
                        {exclusion.description && (
                          <p className="text-gray-600 mt-1">{exclusion.description}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <X className="h-10 w-10 text-red-500" />
                  </div>
                  <p className="text-gray-600 font-semibold text-lg">Standard exclusions apply</p>
                  <p className="text-gray-500 mt-2">
                    Personal expenses are typically not included
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Additional Information */}
      <div className="space-y-4">
        {/* Payment Methods */}

        {/* Pickup Options */}
        {tour.pickupOptions && tour.pickupOptions.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Pickup Options</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {tour.pickupOptions.map((pickup: any, index: number) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">{pickup.city}</h4>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Additional cost:</span>
                      <span className="font-medium text-green-600">
                        {pickup.currency} {pickup.price}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* License Requirements */}
        {tour.licenseRequired && (
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              <strong>Special Requirements:</strong> This tour requires special licenses or permits. 
              Please ensure you have the necessary documentation before booking.
            </AlertDescription>
          </Alert>
        )}

        {/* Terms and Conditions */}
        {tour.terms && (
          <Card>
            <CardHeader>
              <CardTitle>Terms & Conditions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none">
                <p className="text-gray-700 text-sm leading-relaxed">
                  {tour.terms}
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Important Notes */}
      <Card className="bg-yellow-50 border-yellow-200">
        <CardContent className="py-6">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-medium text-yellow-800 mb-2">Important Notes</h4>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• All inclusions and exclusions are subject to tour operator terms</li>
                <li>• Additional costs may apply for optional activities</li>
                <li>• Please confirm all details with the tour operator before booking</li>
                <li>• Prices and inclusions may vary based on season and availability</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}