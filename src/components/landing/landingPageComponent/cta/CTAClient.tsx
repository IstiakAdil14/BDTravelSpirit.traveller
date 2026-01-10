'use client';

import { MapPin, Users, Award } from "lucide-react";
import CTAUI from './CTAUI';

const CTAClient = () => {
  const benefits = [
    "Expert local guides with deep cultural knowledge",
    "Sustainable tourism practices that benefit communities",
    "24/7 support throughout your journey",
    "Customizable itineraries for unique experiences",
    "Comprehensive travel insurance included",
    "Authentic cultural immersion opportunities",
  ];

  const stats = [
    { icon: MapPin, number: "64", label: "Districts Covered", color: "emerald" },
    { icon: Users, number: "500+", label: "Expert Guides", color: "blue" },
    { icon: Award, number: "15", label: "UNESCO Sites", color: "purple" },
  ];

  return <CTAUI benefits={benefits} stats={stats} />;
};

export default CTAClient;
