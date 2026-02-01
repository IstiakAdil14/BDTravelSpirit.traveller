"use client";

import Link from "next/link";
import { ChevronDown, MapPin, Sparkles } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

type TourItem = {
  name: string;
  region: string;
  img: string;
  url: string;
};

type SubCategory = {
  name: string;
  tours: TourItem[];
};

type Category = {
  name: string;
  subCategories: SubCategory[];
};

/* Sample data */
const categories: Category[] = [
  {
    name: "Places to see",
    subCategories: [
      {
        name: "Barishal",
        tours: [
          { name: "Kuakata Beach", region: "Patuakhali, Barishal", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/The_Beauty_of_Kuakata_Sea_Beach.jpg/1200px-The_Beauty_of_Kuakata_Sea_Beach.jpg", url: "/bangladesh/barishal/patuakhali/kuakata-beach" },
          { name: "Fatrar Char", region: "Patuakhali, Barishal", img: "/images/fatrar-char.jpg", url: "/bangladesh/barishal/patuakhali/fatrar-char" },
          { name: "Durga Sagar", region: "Barishal City", img: "/images/durga-sagar.jpg", url: "/bangladesh/barishal/barishal/durga-sagar" },
          { name: "Bhimruli Guava Market", region: "Jhalokathi, Barishal", img: "/images/guava-market.jpg", url: "/bangladesh/barishal/jhalokathi/bhimruli-guava-market" },
          { name: "Kalapara Beach", region: "Patuakhali, Barishal", img: "/images/kalapara.jpg", url: "/bangladesh/barishal/patuakhali/kalapara-beach" },
          { name: "Taltoli Beach", region: "Barguna, Barishal", img: "/images/taltoli.jpg", url: "/bangladesh/barishal/barguna/taltoli-beach" },
          { name: "Char Kukri Mukri", region: "Bhola, Barishal", img: "/images/char-kukri.jpg", url: "/bangladesh/barishal/bhola/char-kukri-mukri" },
          { name: "Kirtankhola River", region: "Barishal", img: "/images/kirtankhola.jpg", url: "/bangladesh/barishal/barishal/kirtankhola-river" },
        ],
      },

      {
        name: "Chittagong",
        tours: [
          { name: "Cox’s Bazar", region: "Cox’s Bazar District", img: "/images/coxs-bazar.jpg", url: "/bangladesh/chittagong/coxsbazar/coxs-bazar" },
          { name: "Inani Beach", region: "Cox’s Bazar District", img: "/images/inani.jpg", url: "/bangladesh/chittagong/coxsbazar/inani-beach" },
          { name: "Saint Martin’s Island", region: "Cox’s Bazar District", img: "/images/saint-martin.jpg", url: "/bangladesh/chittagong/coxsbazar/saint-martins-island" },
          { name: "Sajek Valley", region: "Rangamati Hill Tracts", img: "/images/sajek.jpg", url: "/bangladesh/chittagong/rangamati/sajek-valley" },
          { name: "Kaptai Lake", region: "Rangamati", img: "/images/kaptai.jpg", url: "/bangladesh/chittagong/rangamati/kaptai-lake" },
          { name: "Nilgiri", region: "Bandarban", img: "/images/nilgiri.jpg", url: "/bangladesh/chittagong/bandarban/nilgiri" },
          { name: "Nilachal", region: "Bandarban", img: "/images/nilachal.jpg", url: "/bangladesh/chittagong/bandarban/nilachal" },
          { name: "Boga Lake", region: "Bandarban", img: "/images/boga.jpg", url: "/bangladesh/chittagong/bandarban/boga-lake" },
        ],
      },

      {
        name: "Dhaka",
        tours: [
          { name: "Ahsan Manzil", region: "Old Dhaka", img: "/images/ahsan.jpg", url: "/bangladesh/dhaka/dhaka/ahsan-manzil" },
          { name: "Lalbagh Fort", region: "Old Dhaka", img: "/images/lalbagh.jpg", url: "/bangladesh/dhaka/dhaka/lalbagh-fort" },
          { name: "National Parliament House", region: "Sher-e-Bangla Nagar", img: "/images/parliament.jpg", url: "/bangladesh/dhaka/dhaka/national-parliament" },
          { name: "Hatirjheel", region: "Dhaka City", img: "/images/hatirjheel.jpg", url: "/bangladesh/dhaka/dhaka/hatirjheel" },
          { name: "Sadarghat", region: "Dhaka City", img: "/images/sadarghat.jpg", url: "/bangladesh/dhaka/dhaka/sadarghat" },
          { name: "Sonargaon", region: "Narayanganj", img: "/images/sonargaon.jpg", url: "/bangladesh/dhaka/narayanganj/sonargaon" },
          { name: "Panam Nagar", region: "Narayanganj", img: "/images/panam.jpg", url: "/bangladesh/dhaka/narayanganj/panam-nagar" },
        ],
      },

      {
        name: "Khulna",
        tours: [
          { name: "Sundarbans", region: "Khulna Division", img: "/images/sundarbans.jpg", url: "/bangladesh/khulna/khulna/sundarbans" },
          { name: "Katka Beach", region: "Sundarbans Area", img: "/images/katka.jpg", url: "/bangladesh/khulna/khulna/katka-beach" },
          { name: "Shat Gombuj Mosque", region: "Bagerhat", img: "/images/sixty-dome.jpg", url: "/bangladesh/khulna/bagerhat/shat-gombuj-mosque" },
          { name: "Khan Jahan Ali Mazar", region: "Bagerhat", img: "/images/khan-jahan.jpg", url: "/bangladesh/khulna/bagerhat/khan-jahan-ali-mazar" },
          { name: "Mongla Port", region: "Bagerhat", img: "/images/mongla.jpg", url: "/bangladesh/khulna/bagerhat/mongla-port" },
        ],
      },

      {
        name: "Mymensingh",
        tours: [
          { name: "Birishiri", region: "Netrokona", img: "/images/birishiri.jpg", url: "/bangladesh/mymensingh/netrokona/birishiri" },
          { name: "Shomeshwari River", region: "Netrokona", img: "/images/shomeshwari.jpg", url: "/bangladesh/mymensingh/netrokona/shomeshwari-river" },
          { name: "Muktagacha Zamindar Bari", region: "Mymensingh", img: "/images/muktagacha.jpg", url: "/bangladesh/mymensingh/mymensingh/muktagacha-zamindar-bari" },
          { name: "Zainul Abedin Museum", region: "Mymensingh", img: "/images/zainul-museum.jpg", url: "/bangladesh/mymensingh/mymensingh/zainul-abedin-museum" },
        ],
      },

      {
        name: "Rajshahi",
        tours: [
          { name: "Mahasthangarh", region: "Bogura", img: "/images/mahasthangarh.jpg", url: "/bangladesh/rajshahi/bogura/mahasthangarh" },
          { name: "Paharpur Monastery", region: "Naogaon", img: "/images/paharpur.jpg", url: "/bangladesh/rajshahi/naogaon/paharpur-buddhist-monastery" },
          { name: "Varendra Museum", region: "Rajshahi City", img: "/images/varendra.jpg", url: "/bangladesh/rajshahi/rajshahi/varendra-museum" },
        ],
      },

      {
        name: "Rangpur",
        tours: [
          { name: "Tajhat Palace", region: "Rangpur City", img: "/images/tajhat-palace.jpg", url: "/bangladesh/rangpur/rangpur/tajhat-palace" },
          { name: "Kantajew Temple", region: "Dinajpur", img: "/images/kantaji.jpg", url: "/bangladesh/rangpur/dinajpur/kantajew-temple" },
          { name: "Shopnopuri Park", region: "Dinajpur", img: "/images/shopnopuri.jpg", url: "/bangladesh/rangpur/dinajpur/shopnopuri-park" },
        ],
      },

      {
        name: "Sylhet",
        tours: [
          { name: "Ratargul Swamp Forest", region: "Sylhet", img: "/images/ratargul.jpg", url: "/bangladesh/sylhet/sylhet/ratargul-swamp-forest" },
          { name: "Jaflong", region: "Sylhet", img: "/images/jaflong.jpg", url: "/bangladesh/sylhet/sylhet/jaflong" },
          { name: "Bichnakandi", region: "Sylhet", img: "/images/bichnakandi.jpg", url: "/bangladesh/sylhet/sylhet/bichnakandi" },
          { name: "Lawachara National Park", region: "Moulvibazar", img: "/images/lawachara.jpg", url: "/bangladesh/sylhet/moulvibazar/lawachara-national-park" },
          { name: "Madhabkunda Waterfall", region: "Moulvibazar", img: "/images/madhabkunda.jpg", url: "/bangladesh/sylhet/moulvibazar/madhabkunda-waterfall" },
        ],
      },
    ],

  },
  {
    name: "Things to do",
    subCategories: [
      {
        name: "Adventure",
        tours: [
          {
            name: "Skydiving",
            region: "Various locations",
            img: "/images/skydiving.jpg",
            url: "/skydiving",
          },
          {
            name: "Bungee Jumping",
            region: "Various locations",
            img: "/images/bungee.jpg",
            url: "/bungee",
          },
          {
            name: "Scuba Diving",
            region: "Various locations",
            img: "/images/scuba.jpg",
            url: "/scuba",
          },
        ],
      },
    ],
  },
  {
    name: "Trip inspiration",
    subCategories: [
      {
        name: "Discover",
        tours: [
          {
            name: "Road Trips",
            region: "Various locations",
            img: "/images/road-trip.jpg",
            url: "/road-trip",
          },
          {
            name: "Family Fun",
            region: "Various locations",
            img: "/images/family.jpg",
            url: "/family",
          },
          {
            name: "Romantic Getaways",
            region: "Various locations",
            img: "/images/romantic.jpg",
            url: "/romantic",
          },
        ],
      },
    ],
  },
];

/* =========================
   Enhanced Mega Menu Component
========================= */
export default function QuickLinks() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>("North America");
  const [isAnimating, setIsAnimating] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const [topOffset, setTopOffset] = useState(0);

  const activeCatData = categories.find((cat) => cat.name === activeCategory);
  const selectedSubData = activeCatData?.subCategories.find(
    (sub) => sub.name === selectedSubCategory
  );

  useEffect(() => {
    if (navRef.current && activeCategory) {
      const rect = navRef.current.getBoundingClientRect();
      setTopOffset(rect.bottom);
    }
  }, [activeCategory]);

  const handleCategoryHover = (catName: string) => {
    if (activeCategory !== catName) {
      setIsAnimating(true);
      setActiveCategory(catName);
      const newCat = categories.find((cat) => cat.name === catName);
      if (newCat && newCat.subCategories.length > 0) {
        setSelectedSubCategory(newCat.subCategories[0].name);
      }
      setTimeout(() => setIsAnimating(false), 300);
    }
  };

  const handleSubCategoryChange = (subName: string) => {
    setIsAnimating(true);
    setSelectedSubCategory(subName);
    setTimeout(() => setIsAnimating(false), 200);
  };

  return (
    <>
      <nav
        ref={navRef}
        className="w-full bg-white relative shadow-sm border-b border-gray-100 max-[524px]:hidden"
        onMouseLeave={() => setActiveCategory(null)}
      >
        <ul className="flex max-w-7xl mx-auto relative">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.name;
            return (
              <li
                key={cat.name}
                className="relative inline-flex items-center shrink-0"
                onMouseEnter={() => handleCategoryHover(cat.name)}
              >

                <Button
                  variant="ghost"
                  className={`
                    px-6 py-5 font-semibold flex items-center gap-2 relative
                    text-sm tracking-wide
                    border border-transparent
                    transition-colors transition-shadow transition-transform duration-200 cursor-pointer
                  ${
                  isActive
                  ? "text-emerald-600 bg-emerald-50 border-emerald-200"
                  : "text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 hover:border-emerald-200"
                  }
                `}
                >
                  {cat.name}
                <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${isActive ? "rotate-180" : ""}`}
                />

                {/* underline always mounted */}
              </Button>

              </li>
            );
          })}
        </ul>
      </nav>

      {/* ENHANCED MEGA PANEL */}
      {activeCategory && (
        <div
          className="fixed left-0 right-0 z-50 bg-white shadow-2xl w-full border-t border-gray-100"
          style={{
            top: `${topOffset}px`,
            animation: "slideDown 0.2s ease-out"
          }}
          onMouseEnter={() => setActiveCategory(activeCategory)}
          onMouseLeave={() => setActiveCategory(null)}
        >
          <div className="max-w-7xl mx-auto p-8">
            <div className="grid grid-cols-[180px_1px_1fr] gap-10">
              {/* LEFT SUBCATEGORIES - Enhanced */}
              <div className="flex flex-col">
                <div className="flex items-center gap-2 mb-6">
                  <Sparkles className="w-5 h-5 text-emerald-500" />
                  <h3 className="text-lg font-bold text-gray-900">Top Attractions</h3>
                </div>
                <div className="flex flex-col space-y-1">
                  {activeCatData?.subCategories.map((sub) => {
                    const isSelected = selectedSubCategory === sub.name;
                    return (
                      <button
                        key={sub.name}
                        onClick={() => handleSubCategoryChange(sub.name)}
                        onMouseEnter={() => handleSubCategoryChange(sub.name)}
                        className={`
                          px-4 py-3 text-left transition-all duration-200 rounded-lg cursor-pointer
                          ${isSelected
                            ? "bg-gradient-to-r from-emerald-50 to-teal-50 text-gray-900 font-semibold shadow-sm"
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                          }
                        `}
                      >
                        <span className="flex items-center gap-3">
                          {isSelected && (
                            <span className="w-1.5 h-1.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full animate-pulse"></span>
                          )}
                          <span className="text-sm">{sub.name}</span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* SEPARATOR */}
              <div className="w-px bg-gradient-to-b from-transparent via-gray-200 to-transparent"></div>

              {/* RIGHT TOURS GRID - Enhanced */}
              <div className={`transition-opacity duration-200 ${isAnimating ? "opacity-0" : "opacity-100"}`}>
                <div className="grid grid-cols-3 gap-4">
                  {selectedSubData?.tours.map((tour, idx) => (
<Tooltip key={tour.name}>
  <TooltipTrigger asChild>
    <Link href={tour.url} className="group flex items-center gap-4 p-3 rounded-xl hover:bg-gradient-to-br hover:from-emerald-50 hover:to-teal-50 transition-all duration-200 hover:shadow-md border border-transparent hover:border-emerald-100"
      style={{ animation: `fadeInUp 0.3s ease-out ${idx * 0.03}s both` }}
    >
      <div className="relative flex-shrink-0">
        <img
          src={tour.img}
          alt={tour.name}
          className="w-14 h-14 object-cover rounded-xl shadow-sm group-hover:shadow-md transition-shadow duration-200"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 to-teal-500/0 group-hover:from-emerald-500/10 group-hover:to-teal-500/10 rounded-xl transition-all duration-200"></div>
      </div>
      <div className="min-w-0 flex-1">
        <p className="tour-title font-semibold text-gray-900 text-sm truncate group-hover:text-emerald-600 transition-colors">
          {tour.name}
        </p>
        <p className="text-xs text-gray-500 truncate flex items-center gap-1 mt-0.5">
          <MapPin className="w-3 h-3" />
          {tour.region}
        </p>
      </div>
    </Link>
  </TooltipTrigger>
  <TooltipContent side="top">
    {tour.name}
  </TooltipContent>
</Tooltip>

                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
          @media (max-width: 804px) {
          .tour-title {
            display: none;
          }
        }
      `}</style>
    </>
  );
}