import { dbConnect } from '@/lib/db/connect';
import TourOperator from '@/models/tourOperator.model';

const tourOperators = [
  { id: 1, name: "Global Adventures", slug: "global-adventures", logo: "/logos/global-adventures.png", rating: 4.8, reviews: 120, totalTours: 35, shortDescription: "Offering unforgettable adventure tours worldwide.", specialties: ["Adventure", "Hiking", "Safari"], certified: true, verified: true, experience: "10 years", region: "Dhaka" },
  { id: 2, name: "Sunny Escapes", slug: "sunny-escapes", logo: "/logos/sunny-escapes.png", rating: 4.6, reviews: 98, totalTours: 28, shortDescription: "Your perfect beach and island getaways.", specialties: ["Beach", "Relaxation", "Cruise"], certified: true, verified: false, experience: "8 years", region: "Chittagong" },
  { id: 3, name: "Mountain Trekkers", slug: "mountain-trekkers", logo: "/logos/mountain-trekkers.png", rating: 4.9, reviews: 210, totalTours: 42, shortDescription: "Expert trekking tours in the Himalayas.", specialties: ["Trekking", "Hiking", "Camping"], certified: true, verified: true, experience: "12 years", region: "Sylhet" },
  { id: 4, name: "Urban Explorers", slug: "urban-explorers", logo: "/logos/urban-explorers.png", rating: 4.5, reviews: 65, totalTours: 15, shortDescription: "Discover the hidden gems of world cities.", specialties: ["City Tours", "Culture", "Food"], certified: false, verified: true, experience: "5 years", region: "Khulna" },
  { id: 5, name: "Safari Kingdom", slug: "safari-kingdom", logo: "/logos/safari-kingdom.png", rating: 4.7, reviews: 150, totalTours: 30, shortDescription: "Experience Africa's wild side with us.", specialties: ["Safari", "Wildlife", "Photography"], certified: true, verified: true, experience: "9 years", region: "Barishal" },
  { id: 6, name: "Cultural Odyssey", slug: "cultural-odyssey", logo: "/logos/cultural-odyssey.png", rating: 4.4, reviews: 78, totalTours: 22, shortDescription: "Immersive cultural and historical tours.", specialties: ["Culture", "History", "Local Cuisine"], certified: false, verified: false, experience: "7 years", region: "Rajshahi" },
  { id: 7, name: "Adventure Seekers", slug: "adventure-seekers", logo: "/logos/adventure-seekers.png", rating: 4.9, reviews: 200, totalTours: 50, shortDescription: "Thrilling adventure trips for adrenaline junkies.", specialties: ["Adventure", "Hiking", "Rafting"], certified: true, verified: true, experience: "15 years", region: "Rangpur" },
  { id: 8, name: "Island Hoppers", slug: "island-hoppers", logo: "/logos/island-hoppers.png", rating: 4.6, reviews: 80, totalTours: 25, shortDescription: "Hop from island to island in tropical paradises.", specialties: ["Island Tours", "Cruise", "Beach"], certified: true, verified: false, experience: "6 years", region: "Mymensingh" },
  { id: 9, name: "Eco Treks", slug: "eco-treks", logo: "/logos/eco-treks.png", rating: 4.8, reviews: 95, totalTours: 18, shortDescription: "Eco-friendly trekking and nature tours.", specialties: ["Eco-Tourism", "Hiking", "Wildlife"], certified: true, verified: true, experience: "10 years", region: "Dhaka" },
  { id: 10, name: "Luxury Voyages", slug: "luxury-voyages", logo: "/logos/luxury-voyages.png", rating: 4.9, reviews: 130, totalTours: 20, shortDescription: "High-end travel experiences for discerning travelers.", specialties: ["Luxury", "Cruise", "Resort"], certified: true, verified: true, experience: "12 years", region: "Chittagong" },
  { id: 11, name: "Desert Trails", slug: "desert-trails", logo: "/logos/desert-trails.png", rating: 4.5, reviews: 70, totalTours: 12, shortDescription: "Explore the world's most famous deserts.", specialties: ["Desert Safari", "Adventure", "Photography"], certified: true, verified: false, experience: "8 years", region: "Sylhet" },
  { id: 12, name: "Northern Lights Tours", slug: "northern-lights-tours", logo: "/logos/northern-lights-tours.png", rating: 4.9, reviews: 110, totalTours: 15, shortDescription: "Witness the magical Aurora Borealis in style.", specialties: ["Nature", "Photography", "Winter Tours"], certified: true, verified: true, experience: "9 years", region: "Khulna" },
  { id: 13, name: "Jungle Expeditions", slug: "jungle-expeditions", logo: "/logos/jungle-expeditions.png", rating: 4.7, reviews: 140, totalTours: 35, shortDescription: "Venture deep into rainforests and jungles.", specialties: ["Adventure", "Wildlife", "Trekking"], certified: true, verified: true, experience: "11 years", region: "Barishal" },
  { id: 14, name: "Historic Horizons", slug: "historic-horizons", logo: "/logos/historic-horizons.png", rating: 4.6, reviews: 88, totalTours: 20, shortDescription: "Tours focusing on world history and heritage sites.", specialties: ["History", "Culture", "Education"], certified: false, verified: false, experience: "6 years", region: "Rajshahi" },
  { id: 15, name: "Snow Adventures", slug: "snow-adventures", logo: "/logos/snow-adventures.png", rating: 4.8, reviews: 105, totalTours: 22, shortDescription: "Skiing, snowboarding, and winter sports tours.", specialties: ["Winter Sports", "Adventure", "Skiing"], certified: true, verified: true, experience: "10 years", region: "Rangpur" },
  { id: 16, name: "Culinary Journeys", slug: "culinary-journeys", logo: "/logos/culinary-journeys.png", rating: 4.7, reviews: 95, totalTours: 18, shortDescription: "Experience local flavors and cooking classes.", specialties: ["Food", "Culture", "City Tours"], certified: true, verified: true, experience: "8 years", region: "Mymensingh" },
  { id: 17, name: "Island Breeze Tours", slug: "island-breeze-tours", logo: "/logos/island-breeze-tours.png", rating: 4.5, reviews: 60, totalTours: 14, shortDescription: "Relaxing island vacations with expert guides.", specialties: ["Beach", "Cruise", "Resort"], certified: false, verified: true, experience: "5 years", region: "Dhaka" },
  { id: 18, name: "Volcano Voyagers", slug: "volcano-voyagers", logo: "/logos/volcano-voyagers.png", rating: 4.9, reviews: 80, totalTours: 10, shortDescription: "Exciting tours to active volcano sites.", specialties: ["Adventure", "Hiking", "Photography"], certified: true, verified: true, experience: "7 years", region: "Chittagong" },
  { id: 19, name: "River Rovers", slug: "river-rovers", logo: "/logos/river-rovers.png", rating: 4.6, reviews: 77, totalTours: 20, shortDescription: "River cruises and kayaking adventures.", specialties: ["Cruise", "Adventure", "Nature"], certified: true, verified: false, experience: "6 years", region: "Sylhet" },
  { id: 20, name: "Safari & Beyond", slug: "safari-and-beyond", logo: "/logos/safari-and-beyond.png", rating: 4.8, reviews: 150, totalTours: 40, shortDescription: "Comprehensive African safaris and cultural tours.", specialties: ["Safari", "Wildlife", "Adventure"], certified: true, verified: true, experience: "12 years", region: "Khulna" }
];

export default async function InsertOperatorsPage() {
  let result = null;
  let error = null;
  let message = '';

  try {
    await dbConnect();
    
    // First, check current count
    const currentCount = await TourOperator.countDocuments();
    message += `Found ${currentCount} existing operators. `;
    
    // Delete all existing
    const deleteResult = await TourOperator.deleteMany({});
    message += `Deleted ${deleteResult.deletedCount} operators. `;
    
    // Insert new data
    result = await TourOperator.insertMany(tourOperators);
    message += `Inserted ${result.length} new operators.`;
    
  } catch (err: any) {
    error = err.message;
  }

  return (
    <div className="container mx-auto p-8 mt-20">
      <h1 className="text-2xl font-bold mb-4">Insert Tour Operators</h1>
      {result ? (
        <div className="bg-green-100 p-4 rounded">
          <p className="text-green-800">✅ {message}</p>
          <p className="mt-2">
            <a href="/operators" className="text-blue-600 underline">
              View All Operators
            </a>
          </p>
        </div>
      ) : error ? (
        <div className="bg-red-100 p-4 rounded">
          <p className="text-red-800">❌ Error: {error}</p>
        </div>
      ) : (
        <p>Processing...</p>
      )}
    </div>
  );
}