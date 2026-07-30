'use client';

import { CheckSquare, AlertTriangle, PhoneCall, Bus, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface TourPreparationProps {
  tour: any;
}

export default function TourPreparation({ tour }: TourPreparationProps) {
  const hasEmergency = tour.emergencyContacts || tour.localEmergency;
  
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Packing List */}
      {tour.packingList && tour.packingList.length > 0 && (
        <Card className="border-blue-100 shadow-sm">
          <CardHeader className="bg-blue-50/50 border-b border-blue-50">
            <CardTitle className="text-blue-900 flex items-center gap-2">
              <CheckSquare className="w-5 h-5" /> Recommended Packing List
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tour.packingList.map((item: any, idx: number) => (
                <div key={idx} className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-colors">
                  <div className={`w-5 h-5 rounded border ${item.required ? 'border-red-400 bg-red-50' : 'border-slate-300'} flex-shrink-0 mt-0.5`} />
                  <div>
                    <h5 className={`font-medium ${item.required ? 'text-gray-900' : 'text-gray-700'}`}>
                      {item.item}
                      {item.required && <span className="ml-2 text-[10px] uppercase font-bold tracking-wider bg-red-100 text-red-700 px-1.5 py-0.5 rounded">Required</span>}
                    </h5>
                    {item.notes && <p className="text-sm text-gray-500 mt-1">{item.notes}</p>}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Transportation & Logistics */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-slate-800">
              <Bus className="w-5 h-5 text-indigo-500" /> Arrival & Transport
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {tour.meetingPoint && (
                <li className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">📍</div>
                  <div>
                    <span className="block text-sm font-semibold text-slate-900">Meeting Point</span>
                    <span className="text-sm text-slate-600">{tour.meetingPoint}</span>
                  </div>
                </li>
              )}
              {tour.pickupOptions && tour.pickupOptions.length > 0 && (
                <li className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">🚐</div>
                  <div>
                    <span className="block text-sm font-semibold text-slate-900">Pickup Options</span>
                    <div className="space-y-1 mt-1">
                      {tour.pickupOptions.map((opt: any, idx: number) => (
                        <div key={idx} className="text-sm text-slate-600 flex justify-between">
                          <span>{opt.city}</span>
                          <span className="font-medium">{opt.price ? `${opt.currency || '৳'}${opt.price}` : 'Free'}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </li>
              )}
            </ul>
          </CardContent>
        </Card>

        {/* Emergency Contacts */}
        {hasEmergency && (
          <Card className="border-rose-100 shadow-sm bg-rose-50/20">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-rose-900">
                <AlertTriangle className="w-5 h-5 text-rose-500" /> Emergency Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              {tour.localEmergency && (
                <p className="text-sm text-rose-800 mb-4 bg-rose-100/50 p-3 rounded-lg border border-rose-100">
                  <Info className="w-4 h-4 inline mr-1 -mt-0.5" /> {tour.localEmergency}
                </p>
              )}
              {tour.emergencyContacts && (
                <div className="grid grid-cols-1 gap-3">
                  {tour.emergencyContacts.policeNumber && (
                    <a href={`tel:${tour.emergencyContacts.policeNumber}`} className="flex items-center justify-between p-3 bg-white rounded-xl border border-rose-100 hover:border-rose-300 transition-colors">
                      <span className="font-semibold text-slate-700 flex items-center gap-2"><PhoneCall className="w-4 h-4 text-slate-400" /> Police</span>
                      <span className="text-rose-600 font-bold tracking-wide">{tour.emergencyContacts.policeNumber}</span>
                    </a>
                  )}
                  {tour.emergencyContacts.ambulanceNumber && (
                    <a href={`tel:${tour.emergencyContacts.ambulanceNumber}`} className="flex items-center justify-between p-3 bg-white rounded-xl border border-rose-100 hover:border-rose-300 transition-colors">
                      <span className="font-semibold text-slate-700 flex items-center gap-2"><PhoneCall className="w-4 h-4 text-slate-400" /> Ambulance</span>
                      <span className="text-rose-600 font-bold tracking-wide">{tour.emergencyContacts.ambulanceNumber}</span>
                    </a>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>

    </div>
  );
}
