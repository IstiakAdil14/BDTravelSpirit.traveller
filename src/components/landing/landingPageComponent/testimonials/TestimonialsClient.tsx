import TestimonialsUI from "./TestimonialsUI";

const TestimonialsClient = () => {
  const testimonials = [
    {
      quote: "Cox's Bazar থেকে Sundarbans - প্রতিটি জায়গা ছিল অসাধারণ! BD Travel Spirit এর গাইডরা আমাদের এমন সব জায়গা দেখিয়েছে যা আমরা কখনো ভাবিনি। Highly recommended!",
      author: "রাহুল আহমেদ",
      role: "ঢাকা, বাংলাদেশ",
      avatar: "/avatar-1.jpg",
      rating: 5,
      gradient: "from-emerald-400 to-emerald-600",
    },
    {
      quote: "Sylhet এর চা বাগান আর Jaflong এর পাথর - এত সুন্দর জায়গা! আমাদের পুরো পরিবার মুগ্ধ হয়ে গেছে। Service টাও ছিল world class।",
      author: "ফাতেমা খাতুন",
      role: "চট্টগ্রাম, বাংলাদেশ",
      avatar: "/avatar-2.jpg",
      rating: 5,
      gradient: "from-blue-400 to-blue-600",
    },
    {
      quote: "Rangamati আর Bandarban এর পাহাড়ি এলাকা দেখে মনে হচ্ছিল স্বর্গে এসেছি। Photography এর জন্য perfect spots গুলো দেখিয়েছে।",
      author: "তানভীর হাসান",
      role: "সিলেট, বাংলাদেশ",
      avatar: "/avatar-3.jpg",
      rating: 5,
      gradient: "from-purple-400 to-purple-600",
    },
    {
      quote: "Old Dhaka র খাবার tour টা ছিল amazing! Biriyani, Haleem, Fuchka - সব authentic জায়গায় নিয়ে গেছে। Food lover দের জন্য perfect!",
      author: "নাদিয়া ইসলাম",
      role: "রাজশাহী, বাংলাদেশ",
      avatar: "/avatar-4.jpg",
      rating: 5,
      gradient: "from-orange-400 to-orange-600",
    },
    {
      quote: "Kuakata beach এ sunrise আর sunset দুটোই দেখেছি। Kids রা খুব enjoy করেছে। Safety আর comfort দুটোই ছিল top notch।",
      author: "মাহবুব করিম",
      role: "খুলনা, বাংলাদেশ",
      avatar: "/avatar-5.jpg",
      rating: 5,
      gradient: "from-pink-400 to-pink-600",
    },
    {
      quote: "Solo travel করতে গিয়ে একটুও ভয় লাগেনি। Sajek Valley তে যে experience পেয়েছি তা ভুলবার নয়। Cloud এর উপরে থাকার feeling!",
      author: "সাকিব আল হাসান",
      role: "বরিশাল, বাংলাদেশ",
      avatar: "/avatar-6.jpg",
      rating: 5,
      gradient: "from-teal-400 to-teal-600",
    },
    {
      quote: "Sundarbans এ Royal Bengal Tiger দেখার স্বপ্ন পূরণ হয়েছে! Mangrove forest এর beauty আর wildlife - সব কিছুই perfect ছিল।",
      author: "রুমানা আক্তার",
      role: "ময়মনসিংহ, বাংলাদেশ",
      avatar: "/avatar-7.jpg",
      rating: 5,
      gradient: "from-green-400 to-green-600",
    },
    {
      quote: "Paharpur আর Mahasthangarh এর ইতিহাস জানতে পেরে অভিভূত! আমাদের heritage কত rich তা বুঝলাম। Guide এর knowledge ছিল excellent।",
      author: "আরিফ হোসেন",
      role: "রংপুর, বাংলাদেশ",
      avatar: "/avatar-8.jpg",
      rating: 5,
      gradient: "from-indigo-400 to-indigo-600",
    },
  ];

  const stats = [
    { number: "4.9", label: "Average Rating", suffix: "/5", icon: "⭐" },
    { number: "500", label: "Happy Travelers", suffix: "+", icon: "💬" },
    { number: "98", label: "Satisfaction Rate", suffix: "%", icon: "❤️" },
  ];

  return <TestimonialsUI testimonials={testimonials} stats={stats} />;
};

export default TestimonialsClient;
