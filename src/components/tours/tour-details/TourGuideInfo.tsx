'use client';

import { Star, Phone, Mail, Globe, Shield, Award, MessageCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function TourGuideInfo({ tour }: { tour: any }) {
  // Static guide data
  const guideInfo = {
    companyName: "Bangladesh Adventure Tours",
    bio: "Professional tour operator with 10+ years of experience in Bangladesh tourism. Specialized in coastal and cultural tours.",
    rating: 4.9,
    reviewCount: 156,
    verified: true,
    social: [
      { platform: "website", url: "https://bdadventuretours.com" },
      { platform: "facebook", url: "https://facebook.com/bdadventuretours" }
    ],
    owner: {
      name: "Karim Hassan",
      phone: "+880 1234-567890",
      email: "info@bdadventuretours.com"
    }
  };

  return (
    <div className="relative">
      <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 rounded-2xl blur opacity-20"></div>
      <div className="relative bg-gradient-to-br from-white via-emerald-50/30 to-blue-50/30 backdrop-blur-xl border border-white/50 rounded-2xl p-6 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full flex items-center justify-center">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-lg bg-gradient-to-r from-gray-900 to-emerald-900 bg-clip-text text-transparent">
                Tour Operator
              </h3>
              <p className="text-sm text-gray-600">Verified Professional</p>
            </div>
          </div>
          <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 shadow-lg">
            <Shield className="h-3 w-3 mr-1" />
            Verified
          </Badge>
        </div>

        {/* Company Info */}
        <div className="mb-6">
          <h4 className="font-bold text-xl text-gray-900 mb-2">{guideInfo.companyName}</h4>
          <div className="flex items-center gap-4 mb-3">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`h-4 w-4 ${i < Math.floor(guideInfo.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
              ))}
              <span className="ml-2 font-semibold text-gray-900">{guideInfo.rating}</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <MessageCircle className="h-4 w-4" />
              <span>{guideInfo.reviewCount} reviews</span>
            </div>
          </div>
          <p className="text-gray-700 leading-relaxed text-sm">
            {guideInfo.bio}
          </p>
        </div>

        {/* Contact Info */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-3 p-3 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-200/50">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <Phone className="h-4 w-4 text-blue-600" />
            </div>
            <span className="text-sm font-medium text-gray-900">{guideInfo.owner.phone}</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-200/50">
            <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
              <Mail className="h-4 w-4 text-emerald-600" />
            </div>
            <span className="text-sm font-medium text-gray-900">{guideInfo.owner.email}</span>
          </div>
        </div>

        {/* Social Links */}
        <div className="space-y-2 mb-6">
          {guideInfo.social.map((social, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              className="w-full justify-start bg-white/60 backdrop-blur-sm border-gray-200/50 hover:bg-white/80 hover:border-gray-300/50 transition-all duration-200"
              asChild
            >
              <a href={social.url} target="_blank" rel="noopener noreferrer">
                <Globe className="h-4 w-4 mr-2" />
                Visit {social.platform}
              </a>
            </Button>
          ))}
        </div>

        {/* Action Button */}
        <Button className="w-full bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-200 font-semibold py-3">
          <MessageCircle className="h-4 w-4 mr-2" />
          Contact Operator
        </Button>
      </div>
    </div>
  );
}