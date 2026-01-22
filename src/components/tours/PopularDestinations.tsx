"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface PopularDestination {
  _id: string;
  title: string;
  slug: string;
  destination: string;
  rating: number;
  reviewCount: number;
  price: number;
  currency: string;
  heroImage: string;
  duration: number;
}

export default function PopularDestinations() {
  const [destinations, setDestinations] = useState<PopularDestination[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/tours/popular")
      .then(res => res.json())
      .then(data => {
        setDestinations(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading popular destinations...</div>;

  return (
    <div className="popular-destinations">
      <h2 className="text-2xl font-bold mb-6">Most Popular Destinations</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {destinations.map((dest, index) => (
          <Link key={dest._id} href={`/tours/${dest.slug}`}>
            <div className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                {dest.heroImage && (
                  <img 
                    src={dest.heroImage} 
                    alt={dest.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="absolute top-2 left-2 bg-blue-600 text-white px-2 py-1 rounded text-sm">
                  #{index + 1}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">{dest.title}</h3>
                <p className="text-gray-600 mb-2">{dest.destination}</p>
                <div className="flex items-center mb-2">
                  <span className="text-yellow-500">★</span>
                  <span className="ml-1 font-medium">{dest.rating.toFixed(1)}</span>
                  <span className="text-gray-500 ml-1">({dest.reviewCount})</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-lg">
                    {dest.currency} {dest.price}
                  </span>
                  <span className="text-gray-500">{dest.duration} days</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}