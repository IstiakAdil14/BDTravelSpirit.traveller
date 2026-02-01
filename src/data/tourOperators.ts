import { ITourOperator } from "../models/tourOperator.model";

export const tourOperators: Partial<ITourOperator>[] = [
  {
    name: "Bangladesh Eco Tours",
    slug: "bangladesh-eco-tours",
    logo: "/logos/bd-eco.png",
    rating: 4.7,
    reviewCount: 1280,
    tagline: "Explore Bangladesh responsibly",
    regions: ["Sundarbans", "Sylhet", "Chittagong Hill Tracts"],
    stats: { toursCompleted: 540, travelersServed: 8200, regionsCovered: 12, experienceYears: 10 },
    services: ["Guided Tours", "Eco Lodges", "Transport"],
    specializations: ["Eco Tourism", "Wildlife"],
    verified: true,
    about: "Focused on sustainable and nature-friendly travel across Bangladesh.",
    gallery: ["/g/eco1.jpg", "/g/eco2.jpg"],
    tours: [
      { id: 1, name: "Sundarbans Eco Adventure", duration: "3 Days", price: 18500, rating: 4.8, image: "/t/sundarbans.jpg" }
    ]
  },
  {
    name: "Dhaka Heritage Walks",
    slug: "dhaka-heritage-walks",
    logo: "/logos/dhaka.png",
    rating: 4.6,
    reviewCount: 950,
    tagline: "Stories hidden in Old Dhaka",
    regions: ["Old Dhaka"],
    stats: { toursCompleted: 410, travelersServed: 5600, regionsCovered: 2, experienceYears: 7 },
    services: ["Walking Tours", "Food Tasting"],
    specializations: ["Heritage", "Culture"],
    verified: true,
    about: "Immersive walking tours through the historic streets of Old Dhaka.",
    gallery: ["/g/dhaka1.jpg", "/g/dhaka2.jpg"],
    tours: [
      { id: 2, name: "Old Dhaka Food Walk", duration: "5 Hours", price: 3500, rating: 4.7, image: "/t/olddhaka.jpg" }
    ]
  },
  {
    name: "Hill Tracks Explorer",
    slug: "hill-tracks-explorer",
    logo: "/logos/hill.png",
    rating: 4.8,
    reviewCount: 740,
    tagline: "Into the heart of the hills",
    regions: ["Bandarban", "Rangamati", "Khagrachari"],
    stats: { toursCompleted: 360, travelersServed: 4200, regionsCovered: 6, experienceYears: 9 },
    services: ["Trekking", "Camping"],
    specializations: ["Adventure", "Tribal Culture"],
    verified: true,
    about: "Expert-led trekking and adventure tours in the hill districts.",
    gallery: ["/g/hill1.jpg", "/g/hill2.jpg"],
    tours: [
      { id: 3, name: "Bandarban Trekking Tour", duration: "4 Days", price: 22000, rating: 4.9, image: "/t/bandarban.jpg" }
    ]
  },
  {
    name: "Sundarbans Cruise Co.",
    slug: "sundarbans-cruise-co",
    logo: "/logos/cruise.png",
    rating: 4.5,
    reviewCount: 1100,
    tagline: "Luxury in the mangroves",
    regions: ["Sundarbans"],
    stats: { toursCompleted: 620, travelersServed: 9100, regionsCovered: 1, experienceYears: 12 },
    services: ["River Cruise", "Meals"],
    specializations: ["Wildlife", "River Tourism"],
    verified: true,
    about: "Comfortable and safe river cruises through the Sundarbans.",
    gallery: ["/g/sundar1.jpg"],
    tours: [
      { id: 4, name: "Luxury Sundarbans Cruise", duration: "3 Days", price: 26000, rating: 4.6, image: "/t/sundar.jpg" }
    ]
  },
  {
    name: "Sylhet Tea Trails",
    slug: "sylhet-tea-trails",
    logo: "/logos/sylhet.png",
    rating: 4.4,
    reviewCount: 520,
    tagline: "Where green meets serenity",
    regions: ["Sylhet"],
    stats: { toursCompleted: 240, travelersServed: 3100, regionsCovered: 3, experienceYears: 6 },
    services: ["Sightseeing", "Transport"],
    specializations: ["Nature", "Tea Gardens"],
    verified: true,
    about: "Relaxed tours through tea gardens and waterfalls of Sylhet.",
    gallery: ["/g/sylhet1.jpg"],
    tours: [
      { id: 5, name: "Sylhet Nature Escape", duration: "2 Days", price: 9500, rating: 4.5, image: "/t/sylhet.jpg" }
    ]
  },
  {
    name: "Cox's Bazar Beach Tours",
    slug: "coxs-bazar-beach-tours",
    logo: "/logos/coxs.png",
    rating: 4.6,
    reviewCount: 2100,
    tagline: "Longest beach, best memories",
    regions: ["Cox's Bazar"],
    stats: { toursCompleted: 880, travelersServed: 15000, regionsCovered: 2, experienceYears: 11 },
    services: ["Beach Tours", "Hotel Booking"],
    specializations: ["Beach Holidays"],
    verified: true,
    about: "Specialists in beach vacations and island hopping.",
    gallery: ["/g/coxs1.jpg"],
    tours: [
      { id: 6, name: "Cox's Bazar Beach Holiday", duration: "3 Days", price: 14000, rating: 4.6, image: "/t/coxs.jpg" }
    ]
  },
  {
    name: "Saint Martin Island Trips",
    slug: "saint-martin-island-trips",
    logo: "/logos/saint.png",
    rating: 4.5,
    reviewCount: 870,
    tagline: "Bangladesh's coral paradise",
    regions: ["Saint Martin's Island"],
    stats: { toursCompleted: 310, travelersServed: 4200, regionsCovered: 1, experienceYears: 5 },
    services: ["Island Tours", "Boat Tickets"],
    specializations: ["Island Tourism"],
    verified: true,
    about: "Affordable island tours with trusted logistics.",
    gallery: ["/g/saint1.jpg"],
    tours: [
      { id: 7, name: "Saint Martin Island Getaway", duration: "2 Days", price: 12000, rating: 4.5, image: "/t/saint.jpg" }
    ]
  },
  {
    name: "Rajshahi Heritage Tours",
    slug: "rajshahi-heritage-tours",
    logo: "/logos/rajshahi.png",
    rating: 4.3,
    reviewCount: 410,
    tagline: "History of ancient Bengal",
    regions: ["Rajshahi", "Paharpur"],
    stats: { toursCompleted: 190, travelersServed: 2200, regionsCovered: 3, experienceYears: 6 },
    services: ["Guided Tours"],
    specializations: ["Archaeology", "History"],
    verified: true,
    about: "Cultural and archaeological tours in northern Bangladesh.",
    gallery: ["/g/raj1.jpg"],
    tours: [
      { id: 8, name: "Paharpur & Varendra Tour", duration: "2 Days", price: 8000, rating: 4.4, image: "/t/paharpur.jpg" }
    ]
  },
  {
    name: "Barisal River Life",
    slug: "barisal-river-life",
    logo: "/logos/barisal.png",
    rating: 4.4,
    reviewCount: 360,
    tagline: "Life along the rivers",
    regions: ["Barisal"],
    stats: { toursCompleted: 160, travelersServed: 1900, regionsCovered: 2, experienceYears: 5 },
    services: ["Boat Tours", "Village Visits"],
    specializations: ["River Tourism"],
    verified: true,
    about: "Discover floating markets and river culture.",
    gallery: ["/g/barisal1.jpg"],
    tours: [
      { id: 9, name: "Floating Market Tour", duration: "1 Day", price: 4500, rating: 4.5, image: "/t/barisal.jpg" }
    ]
  },
  {
    name: "Kuakata Sunrise Tours",
    slug: "kuakata-sunrise-tours",
    logo: "/logos/kuakata.png",
    rating: 4.2,
    reviewCount: 290,
    tagline: "Sunrise & sunset together",
    regions: ["Kuakata"],
    stats: { toursCompleted: 140, travelersServed: 1600, regionsCovered: 1, experienceYears: 4 },
    services: ["Beach Tours"],
    specializations: ["Coastal Tourism"],
    verified: true,
    about: "Best sunrise and sunset viewing tours in Bangladesh.",
    gallery: ["/g/kuakata1.jpg"],
    tours: [
      { id: 10, name: "Kuakata Beach Escape", duration: "2 Days", price: 9000, rating: 4.3, image: "/t/kuakata.jpg" }
    ]
  },
  {
    name: "Bangla Adventure Club",
    slug: "bangla-adventure-club",
    logo: "/logos/adventure.png",
    rating: 4.7,
    reviewCount: 1020,
    tagline: "Adventure starts here",
    regions: ["Bandarban", "Sylhet"],
    stats: { toursCompleted: 480, travelersServed: 7600, regionsCovered: 7, experienceYears: 8 },
    services: ["Rock Climbing", "Trekking"],
    specializations: ["Extreme Adventure"],
    verified: true,
    about: "High-energy adventure tours for thrill seekers.",
    gallery: ["/g/adventure1.jpg"],
    tours: [
      { id: 11, name: "Extreme Bandarban Adventure", duration: "5 Days", price: 28000, rating: 4.8, image: "/t/extreme.jpg" }
    ]
  },
  {
    name: "Rural Bengal Experiences",
    slug: "rural-bengal-experiences",
    logo: "/logos/rural.png",
    rating: 4.6,
    reviewCount: 540,
    tagline: "Village life, real stories",
    regions: ["Bogura", "Kushtia"],
    stats: { toursCompleted: 260, travelersServed: 3300, regionsCovered: 4, experienceYears: 6 },
    services: ["Homestays", "Village Tours"],
    specializations: ["Rural Tourism"],
    verified: true,
    about: "Authentic rural experiences and homestays.",
    gallery: ["/g/rural1.jpg"],
    tours: [
      { id: 12, name: "Village Life Experience", duration: "2 Days", price: 6000, rating: 4.6, image: "/t/village.jpg" }
    ]
  },
  {
    name: "Padma River Cruises",
    slug: "padma-river-cruises",
    logo: "/logos/padma.png",
    rating: 4.3,
    reviewCount: 410,
    tagline: "Cruising the mighty Padma",
    regions: ["Padma River"],
    stats: { toursCompleted: 210, travelersServed: 2800, regionsCovered: 1, experienceYears: 5 },
    services: ["River Cruise"],
    specializations: ["River Tourism"],
    verified: true,
    about: "Short and long river cruises along the Padma.",
    gallery: ["/g/padma1.jpg"],
    tours: [
      { id: 13, name: "Padma Sunset Cruise", duration: "1 Day", price: 5000, rating: 4.4, image: "/t/padma.jpg" }
    ]
  },
  {
    name: "Bangladesh Photo Tours",
    slug: "bangladesh-photo-tours",
    logo: "/logos/photo.png",
    rating: 4.8,
    reviewCount: 620,
    tagline: "Frame the beauty of Bengal",
    regions: ["Dhaka", "Sundarbans", "Sylhet"],
    stats: { toursCompleted: 300, travelersServed: 2100, regionsCovered: 6, experienceYears: 7 },
    services: ["Photography Guides"],
    specializations: ["Photography"],
    verified: true,
    about: "Designed for photographers and visual storytellers.",
    gallery: ["/g/photo1.jpg"],
    tours: [
      { id: 14, name: "Bangladesh Photography Tour", duration: "6 Days", price: 35000, rating: 4.9, image: "/t/photo.jpg" }
    ]
  },
  {
    name: "Islamic Heritage Bangladesh",
    slug: "islamic-heritage-bangladesh",
    logo: "/logos/islamic.png",
    rating: 4.5,
    reviewCount: 380,
    tagline: "Sacred sites of Bengal",
    regions: ["Bagerhat", "Dhaka"],
    stats: { toursCompleted: 180, travelersServed: 2400, regionsCovered: 4, experienceYears: 6 },
    services: ["Guided Tours"],
    specializations: ["Religious Tourism"],
    verified: true,
    about: "Tours focused on mosques and Islamic heritage.",
    gallery: ["/g/islamic1.jpg"],
    tours: [
      { id: 15, name: "Historic Mosques Tour", duration: "2 Days", price: 7500, rating: 4.6, image: "/t/mosque.jpg" }
    ]
  },
  {
    name: "Delta Backpackers",
    slug: "delta-backpackers",
    logo: "/logos/backpack.png",
    rating: 4.4,
    reviewCount: 690,
    tagline: "Budget-friendly adventures",
    regions: ["Dhaka", "Cox's Bazar", "Sylhet"],
    stats: { toursCompleted: 390, travelersServed: 8400, regionsCovered: 8, experienceYears: 7 },
    services: ["Budget Tours", "Hostels"],
    specializations: ["Backpacking"],
    verified: true,
    about: "Affordable tours for solo and budget travelers.",
    gallery: ["/g/backpack1.jpg"],
    tours: [
      { id: 16, name: "Budget Bangladesh Tour", duration: "7 Days", price: 18000, rating: 4.5, image: "/t/budget.jpg" }
    ]
  },
  {
    name: "Nature Bengal",
    slug: "nature-bengal",
    logo: "/logos/nature.png",
    rating: 4.6,
    reviewCount: 480,
    tagline: "Into nature's lap",
    regions: ["Lawachara", "Sundarbans"],
    stats: { toursCompleted: 220, travelersServed: 2900, regionsCovered: 5, experienceYears: 6 },
    services: ["Nature Walks"],
    specializations: ["Nature Tourism"],
    verified: true,
    about: "Calm and slow nature-focused travel.",
    gallery: ["/g/nature1.jpg"],
    tours: [
      { id: 17, name: "Lawachara Forest Walk", duration: "1 Day", price: 4000, rating: 4.6, image: "/t/forest.jpg" }
    ]
  },
  {
    name: "Bangladesh Family Tours",
    slug: "bangladesh-family-tours",
    logo: "/logos/family.png",
    rating: 4.5,
    reviewCount: 560,
    tagline: "Safe trips for all ages",
    regions: ["Dhaka", "Sylhet", "Cox's Bazar"],
    stats: { toursCompleted: 310, travelersServed: 5200, regionsCovered: 6, experienceYears: 8 },
    services: ["Family Packages"],
    specializations: ["Family Tourism"],
    verified: true,
    about: "Comfortable and safe tours for families.",
    gallery: ["/g/family1.jpg"],
    tours: [
      { id: 18, name: "Family Holiday Package", duration: "4 Days", price: 20000, rating: 4.6, image: "/t/family.jpg" }
    ]
  },
  {
    name: "Green Delta Travels",
    slug: "green-delta-travels",
    logo: "/logos/green.png",
    rating: 4.3,
    reviewCount: 340,
    tagline: "Travel green, travel smart",
    regions: ["Khulna", "Barisal"],
    stats: { toursCompleted: 170, travelersServed: 2100, regionsCovered: 4, experienceYears: 5 },
    services: ["Eco Tours"],
    specializations: ["Sustainable Tourism"],
    verified: true,
    about: "Promoting eco-friendly travel solutions.",
    gallery: ["/g/green1.jpg"],
    tours: [
      { id: 19, name: "Eco Delta Tour", duration: "3 Days", price: 13000, rating: 4.4, image: "/t/eco.jpg" }
    ]
  },
  {
    name: "Urban Bengal Tours",
    slug: "urban-bengal-tours",
    logo: "/logos/urban.png",
    rating: 4.2,
    reviewCount: 300,
    tagline: "Cities beyond the surface",
    regions: ["Dhaka", "Chattogram"],
    stats: { toursCompleted: 150, travelersServed: 2300, regionsCovered: 2, experienceYears: 4 },
    services: ["City Tours"],
    specializations: ["Urban Exploration"],
    verified: true,
    about: "Modern city-focused travel experiences.",
    gallery: ["/g/urban1.jpg"],
    tours: [
      { id: 20, name: "Dhaka City Discovery", duration: "1 Day", price: 3000, rating: 4.3, image: "/t/city.jpg" }
    ]
  }
];