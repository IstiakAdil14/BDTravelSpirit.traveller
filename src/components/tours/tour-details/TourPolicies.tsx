'use client';

import { Shield, RefreshCw, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function TourPolicies({ tour }: { tour: any }) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Cancellation Policy
          </CardTitle>
        </CardHeader>
        <CardContent>
          {tour.cancellationPolicy?.refundable ? (
            <div className="space-y-4">
              <p className="text-green-600 font-medium">✓ Free cancellation available</p>
              <div className="space-y-2">
                {tour.cancellationPolicy.rules?.map((rule: any, index: number) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span>{rule.daysBefore} days before departure</span>
                    <span className="font-medium text-green-600">{rule.refundPercent}% refund</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-red-600">Non-refundable booking</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <RefreshCw className="h-5 w-5" />
            Refund Policy
          </CardTitle>
        </CardHeader>
        <CardContent>
          {tour.refundPolicy && (
            <div className="space-y-3">
              <div>
                <span className="font-medium">Processing Time: </span>
                <span>{tour.refundPolicy.processingDays} business days</span>
              </div>
              <div>
                <span className="font-medium">Refund Methods: </span>
                <span className="capitalize">{tour.refundPolicy.method?.join(', ')}</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {tour.terms && (
        <Card>
          <CardHeader>
            <CardTitle>Terms & Conditions</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 text-sm leading-relaxed">{tour.terms}</p>
          </CardContent>
        </Card>
      )}

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          <strong>Important:</strong> All policies are subject to tour operator terms. 
          Please read the complete terms and conditions before booking.
        </AlertDescription>
      </Alert>
    </div>
  );
}