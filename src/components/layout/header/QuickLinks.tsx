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
          { name: "Fatrar Char", region: "Patuakhali, Barishal", img: "https://vromonguide.com/wp-content/uploads/Fatrar-Char-Kuakata-Patuakhali.jpg", url: "/bangladesh/barishal/patuakhali/fatrar-char" },
          { name: "Durga Sagar", region: "Barishal City", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/%E0%A6%A6%E0%A7%81%E0%A6%B0%E0%A7%8D%E0%A6%97%E0%A6%BE%E0%A6%B8%E0%A6%BE%E0%A6%97%E0%A6%B0_%E0%A6%A6%E0%A6%BF%E0%A6%98%E0%A6%BF....jpg/500px-%E0%A6%A6%E0%A7%81%E0%A6%B0%E0%A7%8D%E0%A6%97%E0%A6%BE%E0%A6%B8%E0%A6%BE%E0%A6%97%E0%A6%B0_%E0%A6%A6%E0%A6%BF%E0%A6%98%E0%A6%BF....jpg", url: "/bangladesh/barishal/barishal/durga-sagar" },
          { name: "Bhimruli Guava Market", region: "Jhalokathi, Barishal", img: "https://toursntripsbd.com/wp-content/uploads/2015/07/DPP07DD091C0E1B31.jpg", url: "/bangladesh/barishal/jhalokathi/bhimruli-guava-market" },
          { name: "Kalapara Beach", region: "Patuakhali, Barishal", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Kuakata_Eco-Park_%2811%29.jpg/960px-Kuakata_Eco-Park_%2811%29.jpg", url: "/bangladesh/barishal/patuakhali/kalapara-beach" },
          { name: "Taltoli Beach", region: "Barguna, Barishal", img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/18/e5/7f/88/view-from-taltoli-bridge.jpg?w=1200&h=700&s=1", url: "/bangladesh/barishal/barguna/taltoli-beach" },
          { name: "Char Kukri Mukri", region: "Bhola, Barishal", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Char_Kukri-Mukri_Wildlife_Sanctuary.jpg/1280px-Char_Kukri-Mukri_Wildlife_Sanctuary.jpg?20190630180055", url: "/bangladesh/barishal/bhola/char-kukri-mukri" },
          { name: "Kirtankhola River", region: "Barishal", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Kirtankhola_River%2C_Barisal.jpg/1280px-Kirtankhola_River%2C_Barisal.jpg?20190801091509", url: "/bangladesh/barishal/barishal/kirtankhola-river" },
        ],
      },

      {
        name: "Chittagong",
        tours: [
          { name: "Cox’s Bazar", region: "Cox’s Bazar District", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Cox%27s_Bazar.jpg/1280px-Cox%27s_Bazar.jpg?20180503193205", url: "/bangladesh/chittagong/coxsbazar/coxs-bazar" },
          { name: "Inani Beach", region: "Cox’s Bazar District", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Inani_Beach_in_the_day_%2821_February_2014%29.jpg/1280px-Inani_Beach_in_the_day_%2821_February_2014%29.jpg?20141203075215", url: "/bangladesh/chittagong/coxsbazar/inani-beach" },
          { name: "Saint Martin’s Island", region: "Cox’s Bazar District", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Saint_Martin_%286%29.jpg/1280px-Saint_Martin_%286%29.jpg?20211016170202", url: "/bangladesh/chittagong/coxsbazar/saint-martins-island" },
          { name: "Sajek Valley", region: "Rangamati Hill Tracts", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Sajek_Valley_Rangamati_3.jpg/1280px-Sajek_Valley_Rangamati_3.jpg?20180531143236", url: "/bangladesh/chittagong/rangamati/sajek-valley" },
          { name: "Kaptai Lake", region: "Rangamati", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Kaptai_Lake_%2827290909628%29.jpg/1280px-Kaptai_Lake_%2827290909628%29.jpg?20180407120144", url: "/bangladesh/chittagong/rangamati/kaptai-lake" },
          { name: "Nilgiri", region: "Bandarban", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Nilgiri.jpg/1280px-Nilgiri.jpg?20140917091802", url: "/bangladesh/chittagong/bandarban/nilgiri" },
          { name: "Nilachal", region: "Bandarban", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Nilachal%2C_Bandarban_%282Q7A0671%29.jpg/1280px-Nilachal%2C_Bandarban_%282Q7A0671%29.jpg?20190821113020", url: "/bangladesh/chittagong/bandarban/nilachal" },
          { name: "Boga Lake", region: "Bandarban", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Evergreen_Boga_Lake.jpg/1280px-Evergreen_Boga_Lake.jpg?20130721160344", url: "/bangladesh/chittagong/bandarban/boga-lake" },
        ],
      },

      {
        name: "Dhaka",
        tours: [
          { name: "Ahsan Manzil", region: "Old Dhaka", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/DG_91_-_09_AHSAN_MANJIL_18_CENTURY_DHAKA_IMG_3022.jpg/1280px-DG_91_-_09_AHSAN_MANJIL_18_CENTURY_DHAKA_IMG_3022.jpg?20190930081756", url: "/bangladesh/dhaka/dhaka/ahsan-manzil" },
          { name: "Lalbagh Fort", region: "Old Dhaka", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Lalbagh_Kella_%28Lalbagh_Fort%29_Dhaka_Bangladesh_2011_17.JPG/1280px-Lalbagh_Kella_%28Lalbagh_Fort%29_Dhaka_Bangladesh_2011_17.JPG?20130427040807", url: "/bangladesh/dhaka/dhaka/lalbagh-fort" },
          { name: "National Parliament House", region: "Sher-e-Bangla Nagar", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Parliament_of_Bangladesh_%285238133496%29.jpg/1280px-Parliament_of_Bangladesh_%285238133496%29.jpg?20171108080754", url: "/bangladesh/dhaka/dhaka/national-parliament" },
          { name: "Hatirjheel", region: "Dhaka City", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Hatirjheel_%2811%29.JPG/1280px-Hatirjheel_%2811%29.JPG?20150314113716", url: "/bangladesh/dhaka/dhaka/hatirjheel" },
          { name: "Sadarghat", region: "Dhaka City", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Steamers_in_Sadarghat_Dhaka.jpg/1280px-Steamers_in_Sadarghat_Dhaka.jpg?20060715044812", url: "/bangladesh/dhaka/dhaka/sadarghat" },
          { name: "Sonargaon", region: "Narayanganj", img: "https://upload.wikimedia.org/wikipedia/commons/8/81/The_old_capital_Sonargaon.jpg?20060714045141", url: "/bangladesh/dhaka/narayanganj/sonargaon" },
          { name: "Panam Nagar", region: "Narayanganj", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Panam_City_Bangladesh.jpg/960px-Panam_City_Bangladesh.jpg?20180924163143", url: "/bangladesh/dhaka/narayanganj/panam-nagar" },
        ],
      },

      {
        name: "Khulna",
        tours: [
          { name: "Sundarbans", region: "Khulna Division", img: "https://upload.wikimedia.org/wikipedia/commons/f/fe/Sundarbans-national-park.jpg?20160613041439", url: "/bangladesh/khulna/khulna/sundarbans" },
          { name: "Katka Beach", region: "Sundarbans Area", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Mangrove_Forest_Katka_Sundarban_National_Park_Bangladesh_-_panoramio.jpg/1280px-Mangrove_Forest_Katka_Sundarban_National_Park_Bangladesh_-_panoramio.jpg?20170315195212", url: "/bangladesh/khulna/khulna/katka-beach" },
          { name: "Shat Gombuj Mosque", region: "Bagerhat", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Sixty_Dome_Mosque%2CBagerhat.jpg/1280px-Sixty_Dome_Mosque%2CBagerhat.jpg?20170928180156", url: "/bangladesh/khulna/bagerhat/shat-gombuj-mosque" },
          { name: "Khan Jahan Ali Mazar", region: "Bagerhat", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Khan_jahan_ali_mazar_building.jpg/1280px-Khan_jahan_ali_mazar_building.jpg?20190907200325", url: "/bangladesh/khulna/bagerhat/khan-jahan-ali-mazar" },
          { name: "Mongla Port", region: "Bagerhat", img: "https://media.istockphoto.com/id/458998005/photo/bangladesh-developing-country.jpg?s=612x612&w=is&k=20&c=epBWP1cgIx7hJTrPVl6jxWPbZV14GQHOrFbL6ohsfKg=", url: "/bangladesh/khulna/bagerhat/mongla-port" },
        ],
      },

      {
        name: "Mymensingh",
        tours: [
          { name: "Birishiri", region: "Netrokona", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Birishiri%2C_Netrokona.jpg/1280px-Birishiri%2C_Netrokona.jpg?20180906105000", url: "/bangladesh/mymensingh/netrokona/birishiri" },
          { name: "Shomeshwari River", region: "Netrokona", img: "https://www.tbsnews.net/sites/default/files/styles/infograph/public/images/2025/12/25/img-20251211-wa0003.jpg", url: "/bangladesh/mymensingh/netrokona/shomeshwari-river" },
          { name: "Muktagacha Zamindar Bari", region: "Mymensingh", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Aat_Ani_Zamindar_Bari_%281%29.jpg/960px-Aat_Ani_Zamindar_Bari_%281%29.jpg", url: "/bangladesh/mymensingh/mymensingh/muktagacha-zamindar-bari" },
          { name: "Zainul Abedin Museum", region: "Mymensingh", img: "https://upload.wikimedia.org/wikipedia/commons/5/5a/Mymensingh_Zainul_Abedin_Museum_2011.jpg?20150623183515", url: "/bangladesh/mymensingh/mymensingh/zainul-abedin-museum" },
        ],
      },

      {
        name: "Rajshahi",
        tours: [
          { name: "Mahasthangarh", region: "Bogura", img: "https://www.travelmate.com.bd/wp-content/uploads/2021/05/mahasthangarh-bogura-tm-1024x559.jpg.webp", url: "/bangladesh/rajshahi/bogura/mahasthangarh" },
          { name: "Paharpur Monastery", region: "Naogaon", img: "https://upload.wikimedia.org/wikipedia/commons/4/42/Paharpur_Buddhist_Bihar.jpg", url: "/bangladesh/rajshahi/naogaon/paharpur-buddhist-monastery" },
          { name: "Varendra Museum", region: "Rajshahi City", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Varendra_Research_Museum_10.jpg/1280px-Varendra_Research_Museum_10.jpg?20170930180015", url: "/bangladesh/rajshahi/rajshahi/varendra-museum" },
        ],
      },

      {
        name: "Rangpur",
        tours: [
          { name: "Tajhat Palace", region: "Rangpur City", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Tajhat_Palace_%285%29.jpg/1280px-Tajhat_Palace_%285%29.jpg?20160831180743", url: "/bangladesh/rangpur/rangpur/tajhat-palace" },
          { name: "Kantajew Temple", region: "Dinajpur", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Kantaji_Temple_Dinajpur_Bangladesh_%2812%29.JPG/1280px-Kantaji_Temple_Dinajpur_Bangladesh_%2812%29.JPG?20091225083202", url: "/bangladesh/rangpur/dinajpur/kantajew-temple" },
          { name: "Shopnopuri Park", region: "Dinajpur", img: "https://upload.wikimedia.org/wikipedia/commons/f/fc/Wheels_of_shopnopuri.JPG?20141015085036", url: "/bangladesh/rangpur/dinajpur/shopnopuri-park" },
        ],
      },

      {
        name: "Sylhet",
        tours: [
          { name: "Ratargul Swamp Forest", region: "Sylhet", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Ratargul_Swamp_Forest%2C_Sylhet..jpg/1280px-Ratargul_Swamp_Forest%2C_Sylhet..jpg?20141013162925", url: "/bangladesh/sylhet/sylhet/ratargul-swamp-forest" },
          { name: "Jaflong", region: "Sylhet", img: "https://venture-out.s3.us-east-2.amazonaws.com/guide-images/1741123759758-media%3Fkey%3DAIzaSyCkpNVocP1IwgtIz1s4aaTb1GgwMdUtzBw%26maxHeightPx%3D800%26maxWidthPx%3D800", url: "/bangladesh/sylhet/sylhet/jaflong" },
          { name: "Bichnakandi", region: "Sylhet", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Beautiful_Nature_of_Bichnakandi.jpg/1280px-Beautiful_Nature_of_Bichnakandi.jpg?20200619142032", url: "/bangladesh/sylhet/sylhet/bichnakandi" },
          { name: "Lawachara National Park", region: "Moulvibazar", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Life_around_jungle.jpg/500px-Life_around_jungle.jpg", url: "/bangladesh/sylhet/moulvibazar/lawachara-national-park" },
          { name: "Madhabkunda Waterfall", region: "Moulvibazar", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Madhabkunda_Waterfall.jpg/1280px-Madhabkunda_Waterfall.jpg?20180524110438", url: "/bangladesh/sylhet/moulvibazar/madhabkunda-waterfall" },
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
            img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Skydiving_over_Cushing.jpg/1280px-Skydiving_over_Cushing.jpg?20110215131223",
            url: "/skydiving",
          },
          {
            name: "Bungee Jumping",
            region: "Various locations",
            img: "https://s1.it.atcdn.net/wp-content/uploads/2024/09/HERO-Kawarau-Bridge-Bungy-315x236.jpg",
            url: "/bungee",
          },
          {
            name: "Scuba Diving",
            region: "Various locations",
            img: "https://media.istockphoto.com/id/133729032/photo/two-people-scuba-diving-with-sunlight-from-above.jpg?s=612x612&w=is&k=20&c=0GZm1KigGxOOLlInbRwQ-5dNp--0aeDU-UOGKlOSv28=",
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
            img: "https://thumbs.dreamstime.com/b/rear-view-friends-road-trip-driving-convertible-car-67525217.jpg?w=768",
            url: "/road-trip",
          },
          {
            name: "Family Fun",
            region: "Various locations",
            img: "https://img.freepik.com/free-photo/full-shot-family-members-silhouettes-outdoors_23-2150039658.jpg?semt=ais_hybrid&w=740&q=80",
            url: "/family",
          },
          {
            name: "Romantic Getaways",
            region: "Various locations",
            img: "https://media.istockphoto.com/id/536615329/photo/love-sunset.jpg?s=612x612&w=0&k=20&c=_LUhSd41Q_FaMePm_kUZWQm4ZFHQiK47ltiuI5-czyQ=",
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