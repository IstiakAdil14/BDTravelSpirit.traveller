'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function TourGallery({ tour }: { tour: any }) {
  const images = [tour.heroImage, ...(tour.gallery || [])].filter(Boolean);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Photo Gallery</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((image: any, index: number) => (
            <div key={index} className="relative h-48 rounded-lg overflow-hidden">
              <img
                src={image.publicUrl}
                alt={`Gallery ${index + 1}`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}