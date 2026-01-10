'use client';

import { Search, Calendar, MapPin, CheckCircle } from "lucide-react";
import HowItWorksUI from './HowItWorksUI';

const HowItWorksClient = () => {
  const steps = [
    {
      number: 1,
      icon: Search,
      title: "Choose Your Adventure",
      description: "Browse our curated collection of tours, activities, and experiences across Bangladesh's 64 districts.",
      gradient: "from-emerald-400 to-emerald-600",
      color: "emerald",
    },
    {
      number: 2,
      icon: Calendar,
      title: "Book & Customize",
      description: "Select your dates, customize your itinerary, and connect with expert local guides for personalized experiences.",
      gradient: "from-blue-400 to-blue-600",
      color: "blue",
    },
    {
      number: 3,
      icon: MapPin,
      title: "Explore & Discover",
      description: "Embark on your journey with confidence, supported by our 24/7 assistance and local expertise.",
      gradient: "from-purple-400 to-purple-600",
      color: "purple",
    },
    {
      number: 4,
      icon: CheckCircle,
      title: "Create Memories",
      description: "Return home with unforgettable stories, authentic connections, and a deeper understanding of Bangladesh.",
      gradient: "from-orange-400 to-red-600",
      color: "orange",
    },
  ];

  return <HowItWorksUI steps={steps} />;
};

export default HowItWorksClient;
