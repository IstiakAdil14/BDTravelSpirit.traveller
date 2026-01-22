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
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">What's Included & Excluded</h2>
        <p className="text-gray-600">
          Everything you need to know about what's covered in your tour package
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Inclusions */}
        <Card className="border-green-200">
          <CardHeader className="bg-green-50">
            <CardTitle className="flex items-center gap-2 text-green-800">
              <Check className="h-5 w-5" />
              What's Included
            </CardTitle>
          </CardHeader>
          <CardContent className="py-6">
            {inclusions.length > 0 ? (
              <div className="space-y-4">
                {inclusions.map((inclusion: any, index: number) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="h-3 w-3 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{inclusion.label}</h4>
                      {inclusion.description && (
                        <p className="text-sm text-gray-600 mt-1">{inclusion.description}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Check className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No specific inclusions listed</p>
                <p className="text-sm text-gray-400 mt-1">
                  Contact the tour operator for detailed information
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Exclusions */}
        <Card className="border-red-200">
          <CardHeader className="bg-red-50">
            <CardTitle className="flex items-center gap-2 text-red-800">
              <X className="h-5 w-5" />
              What's Not Included
            </CardTitle>
          </CardHeader>
          <CardContent className="py-6">
            {exclusions.length > 0 ? (
              <div className="space-y-4">
                {exclusions.map((exclusion: any, index: number) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <X className="h-3 w-3 text-red-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{exclusion.label}</h4>
                      {exclusion.description && (
                        <p className="text-sm text-gray-600 mt-1">{exclusion.description}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <X className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No specific exclusions listed</p>
                <p className="text-sm text-gray-400 mt-1">
                  Most personal expenses are typically not included
                </p>
              </div>
            )}
          </CardContent>
        </Card>
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