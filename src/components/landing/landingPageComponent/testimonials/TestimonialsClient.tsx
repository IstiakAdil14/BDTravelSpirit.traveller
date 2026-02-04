import TestimonialsUI from "./TestimonialsUI";

const TestimonialsClient = () => {
  const testimonials = [
    {
      quote: "BD Travel Spirit made our Bangladesh trip absolutely magical. The local guides were incredible, and we discovered places we never knew existed. Highly recommend!",
      author: "Sarah Johnson",
      role: "Adventure Traveler",
      avatar: "/avatar-1.jpg",
      rating: 5,
      gradient: "from-emerald-400 to-emerald-600",
    },
    {
      quote: "The cultural immersion experience was beyond our expectations. From the Sundarbans to the hills of Sylhet, every moment was carefully curated and authentic.",
      author: "Michael Chen",
      role: "Cultural Explorer",
      avatar: "/avatar-2.jpg",
      rating: 5,
      gradient: "from-blue-400 to-blue-600",
    },
    {
      quote: "As a photographer, I was blown away by the hidden gems BD Travel Spirit showed us. The team understood exactly what we wanted and delivered beyond our dreams.",
      author: "Emma Rodriguez",
      role: "Travel Photographer",
      avatar: "/avatar-3.jpg",
      rating: 5,
      gradient: "from-purple-400 to-purple-600",
    },
    {
      quote: "The food tours were exceptional! We tasted authentic Bangladeshi cuisine in local homes and learned about the rich culinary traditions. An unforgettable experience.",
      author: "David Kim",
      role: "Food Enthusiast",
      avatar: "/avatar-4.jpg",
      rating: 5,
      gradient: "from-orange-400 to-orange-600",
    },
    {
      quote: "Our family vacation was perfectly organized. The kids loved the wildlife safaris, and the accommodations were top-notch. BD Travel Spirit truly cares about their clients.",
      author: "Lisa Thompson",
      role: "Family Traveler",
      avatar: "/avatar-5.jpg",
      rating: 5,
      gradient: "from-pink-400 to-pink-600",
    },
    {
      quote: "As a solo traveler, I felt completely safe and supported throughout my journey. The team's attention to detail and local insights made all the difference.",
      author: "James Wilson",
      role: "Solo Adventurer",
      avatar: "/avatar-6.jpg",
      rating: 5,
      gradient: "from-teal-400 to-teal-600",
    },
    {
      quote: "The eco-tourism initiatives were inspiring. We participated in community projects and learned about sustainable tourism practices in Bangladesh.",
      author: "Maria Garcia",
      role: "Eco-Traveler",
      avatar: "/avatar-7.jpg",
      rating: 5,
      gradient: "from-green-400 to-green-600",
    },
    {
      quote: "The historical tours were meticulously planned. From ancient mosques to colonial architecture, every site came alive with fascinating stories.",
      author: "Robert Brown",
      role: "History Buff",
      avatar: "/avatar-8.jpg",
      rating: 5,
      gradient: "from-indigo-400 to-indigo-600",
    },
  ];

  const stats = [
    { number: "4.9", label: "Average Rating", suffix: "/5", icon: "⭐" },
    { number: "10", label: "Reviews", suffix: "+", icon: "💬" },
    { number: "50", label: "Satisfaction", suffix: "%", icon: "❤️" },
  ];

  return <TestimonialsUI testimonials={testimonials} stats={stats} />;
};

export default TestimonialsClient;
