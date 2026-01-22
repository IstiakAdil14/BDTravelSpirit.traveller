'use client';

import { Star, MapPin, Phone, Mail, Globe } from 'lucide-react';
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
    <Card className="h-[420px]">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Tour Operator</span>
          {guideInfo.verified && (
            <Badge variant="default" className="bg-green-600">
              Verified
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-semibold text-lg">{guideInfo.companyName}</h3>
          <div className="flex items-center gap-2 mt-1">
            <div className="flex items-center">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="ml-1 font-medium">{guideInfo.rating}</span>
            </div>
            <span className="text-sm text-gray-600">({guideInfo.reviewCount} reviews)</span>
          </div>
        </div>

        <p className="text-sm text-gray-700 leading-relaxed">
          {guideInfo.bio}
        </p>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Phone className="h-4 w-4 text-gray-400" />
            <span>{guideInfo.owner.phone}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Mail className="h-4 w-4 text-gray-400" />
            <span>{guideInfo.owner.email}</span>
          </div>
        </div>

        <div className="space-y-2">
          {guideInfo.social.map((social, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              className="w-full justify-start"
              asChild
            >
              <a href={social.url} target="_blank" rel="noopener noreferrer">
                <Globe className="h-4 w-4 mr-2" />
                Visit {social.platform}
              </a>
            </Button>
          ))}
        </div>

        <Button className="w-full" variant="default">
          Contact Operator
        </Button>
      </CardContent>
    </Card>
  );
}