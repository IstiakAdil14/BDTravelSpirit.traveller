import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config({ path: path.join(process.cwd(), '.env.local') });

// Set MongoDB URI directly if not loaded from env
if (!process.env.MONGODB_URI) {
  process.env.MONGODB_URI = 'mongodb+srv://istiakadil:istiakadil@cluster0.lbx8jdk.mongodb.net/bd-travel-spirit-client?retryWrites=true&w=majority&appName=Cluster0';
}

import { dbConnect } from '../lib/db/connect';
import TourOperator from '../models/tourOperator.model';

const tourOperatorDetails = {
  'global-adventures': {
    name: 'Global Adventures Bangladesh',
    slug: 'global-adventures',
    logo: '/images/operators/global-adventures.png',
    rating: 4.8,
    reviewCount: 450,
    tagline: 'Unforgettable Adventures Across Bangladesh',
    regions: ['Dhaka', 'Chittagong', 'Sylhet', 'Rangpur'],
    stats: { toursCompleted: 200, travelersServed: 5000, regionsCovered: 8, experienceYears: 10 },
    services: [
      'Hotel Booking',
      'Transport & Transfers',
      'Professional Tour Guides',
      'Meal Arrangements',
      'Tickets & Entry Passes',
      'Travel Insurance'
    ],
    specializations: ['Adventure Tours', 'Hiking', 'Safari', 'Camping'],
    verified: true,
    about: 'Global Adventures Bangladesh offers thrilling adventure tours across the country. With a decade of experience, we have safely guided thousands of travelers through forests, rivers, and hills, ensuring unforgettable memories.',
    gallery: ['/images/gallery/global1.jpg','/images/gallery/global2.jpg','/images/gallery/global3.jpg'],
    tours: [
      { id: 1, name: 'Sundarbans Wildlife Safari', duration: '2 Days 1 Night', price: 7000, rating: 4.7, image: '/images/tours/sundarbans.jpg' },
      { id: 2, name: 'Chittagong Hill Trek', duration: '3 Days 2 Nights', price: 8500, rating: 4.8, image: '/images/tours/chittagong-hills.jpg' },
      { id: 3, name: 'Sylhet Tea Garden Tour', duration: '1 Day', price: 3500, rating: 4.6, image: '/images/tours/sylhet-tea.jpg' }
    ]
  },

  'sunny-escapes': {
    name: 'Sunny Escapes Bangladesh',
    slug: 'sunny-escapes',
    logo: '/images/operators/sunny-escapes.png',
    rating: 4.6,
    reviewCount: 380,
    tagline: 'Relaxing Beach & Island Getaways',
    regions: ['Cox\'s Bazar', 'Kuakata', 'St. Martin\'s Island', 'Patenga'],
    stats: { toursCompleted: 150, travelersServed: 3200, regionsCovered: 6, experienceYears: 8 },
    services: ['Hotel Booking','Beach Activities','Boat Rentals','Meals & Refreshments','Tickets & Passes'],
    specializations: ['Beach Tours','Cruises','Relaxation'],
    verified: false,
    about: 'Sunny Escapes Bangladesh specializes in luxurious beach holidays and tropical island experiences. Explore golden sands and crystal-clear waters with comfortable accommodations and friendly guides.',
    gallery: ['/images/gallery/sunny1.jpg','/images/gallery/sunny2.jpg','/images/gallery/sunny3.jpg'],
    tours: [
      { id: 1, name: 'Cox\'s Bazar Beach Retreat', duration: '2 Days 1 Night', price: 5000, rating: 4.5, image: '/images/tours/coxs-bazar.jpg' },
      { id: 2, name: 'St. Martin Island Excursion', duration: '3 Days 2 Nights', price: 9000, rating: 4.7, image: '/images/tours/st-martin.jpg' },
      { id: 3, name: 'Kuakata Sunset Tour', duration: '1 Day', price: 3000, rating: 4.6, image: '/images/tours/kuakata.jpg' }
    ]
  },

  'mountain-trekkers': {
    name: 'Mountain Trekkers Bangladesh',
    slug: 'mountain-trekkers',
    logo: '/images/operators/mountain-trekkers.png',
    rating: 4.9,
    reviewCount: 487,
    tagline: 'Conquer the Peaks of Bangladesh Since 2015',
    regions: ['Bandarban','Rangamati','Khagrachari','Cox\'s Bazar'],
    stats: { toursCompleted: 285, travelersServed: 5200, regionsCovered: 12, experienceYears: 9 },
    services: ['Hotel Booking','Transport & Transfers','Professional Tour Guides','Meal Arrangements','Tickets & Entry Passes','Travel Insurance'],
    specializations: ['Adventure Tours','Eco Tourism','Mountain Trekking','Camping Expeditions'],
    verified: true,
    about: 'Mountain Trekkers Bangladesh is the premier adventure tour operator specializing in mountain expeditions across the Chittagong Hill Tracts. With 9 years of experience, we have safely guided over 5,200 adventurers to the highest peaks including Keokradong, Tahjindong, and Saka Haphong.',
    gallery: ['/images/gallery/mountain1.jpg','/images/gallery/mountain2.jpg','/images/gallery/mountain3.jpg'],
    tours: [
      { id: 1, name: 'Keokradong Peak Trek', duration: '3 Days 2 Nights', price: 8500, rating: 4.8, image: '/images/tours/keokradong.jpg' },
      { id: 2, name: 'Nilgiri Hills Adventure', duration: '2 Days 1 Night', price: 6200, rating: 4.9, image: '/images/tours/nilgiri.jpg' },
      { id: 3, name: 'Sajek Valley Expedition', duration: '4 Days 3 Nights', price: 12000, rating: 4.7, image: '/images/tours/sajek.jpg' }
    ]
  },

  'urban-explorers': {
    name: 'Urban Explorers Bangladesh',
    slug: 'urban-explorers',
    logo: '/images/operators/urban-explorers.png',
    rating: 4.5,
    reviewCount: 300,
    tagline: 'Discover Hidden Gems in Bangladeshi Cities',
    regions: ['Dhaka','Chittagong','Rajshahi','Khulna'],
    stats: { toursCompleted: 120, travelersServed: 2500, regionsCovered: 8, experienceYears: 5 },
    services: ['City Tours','Transport & Transfers','Local Guides','Cultural Experiences','Meal Arrangements'],
    specializations: ['City Tours','Culture','Food'],
    verified: true,
    about: 'Urban Explorers Bangladesh uncovers the hidden cultural, historical, and culinary gems of Bangladeshi cities. Experience authentic local life with our expert guides.',
    gallery: ['/images/gallery/urban1.jpg','/images/gallery/urban2.jpg','/images/gallery/urban3.jpg'],
    tours: [
      { id: 1, name: 'Old Dhaka Heritage Walk', duration: '1 Day', price: 2500, rating: 4.5, image: '/images/tours/dhaka-heritage.jpg' },
      { id: 2, name: 'Chittagong Port & City Tour', duration: '2 Days 1 Night', price: 4500, rating: 4.6, image: '/images/tours/chittagong-city.jpg' },
      { id: 3, name: 'Rajshahi Silk & Mango Tour', duration: '1 Day', price: 3000, rating: 4.4, image: '/images/tours/rajshahi-tour.jpg' }
    ]
  },

  'safari-kingdom': {
    name: 'Safari Kingdom Bangladesh',
    slug: 'safari-kingdom',
    logo: '/images/operators/safari-kingdom.png',
    rating: 4.7,
    reviewCount: 420,
    tagline: 'Experience Bangladesh\'s Wildlife Up Close',
    regions: ['Sundarbans','Cox\'s Bazar','Bandarban','Khulna'],
    stats: { toursCompleted: 180, travelersServed: 4000, regionsCovered: 10, experienceYears: 9 },
    services: ['Wildlife Tours','Boat Transfers','Professional Guides','Meal Arrangements','Tickets & Passes'],
    specializations: ['Safari','Wildlife','Photography'],
    verified: true,
    about: 'Safari Kingdom Bangladesh takes you on unforgettable wildlife adventures across the Sundarbans and other natural reserves. Our trained guides ensure safety and enriching experiences.',
    gallery: ['/images/gallery/safari1.jpg','/images/gallery/safari2.jpg','/images/gallery/safari3.jpg'],
    tours: [
      { id: 1, name: 'Sundarbans Tiger Safari', duration: '2 Days 1 Night', price: 8000, rating: 4.7, image: '/images/tours/sundarbans-tiger.jpg' },
      { id: 2, name: 'Cox\'s Bazar Wildlife Cruise', duration: '1 Day', price: 4000, rating: 4.6, image: '/images/tours/cox-wildlife.jpg' },
      { id: 3, name: 'Khulna Mangrove Adventure', duration: '1 Day', price: 3500, rating: 4.5, image: '/images/tours/khulna-mangrove.jpg' }
    ]
  },

  'cultural-odyssey': {
    name: 'Cultural Odyssey Bangladesh',
    slug: 'cultural-odyssey',
    logo: '/images/operators/cultural-odyssey.png',
    rating: 4.4,
    reviewCount: 310,
    tagline: 'Immersive Cultural & Historical Tours',
    regions: ['Paharpur','Mahasthangarh','Bagerhat','Varendra Museum'],
    stats: { toursCompleted: 140, travelersServed: 2800, regionsCovered: 8, experienceYears: 7 },
    services: ['Museum Tours','Transport & Transfers','Local Guides','Meal Arrangements'],
    specializations: ['Culture','History','Local Cuisine'],
    verified: false,
    about: 'Cultural Odyssey Bangladesh provides deep dives into the country\'s rich history, architecture, and local culinary traditions.',
    gallery: ['/images/gallery/culture1.jpg','/images/gallery/culture2.jpg','/images/gallery/culture3.jpg'],
    tours: [
      { id: 1, name: 'Paharpur Monastery Tour', duration: '1 Day', price: 3000, rating: 4.5, image: '/images/tours/paharpur.jpg' },
      { id: 2, name: 'Mahasthangarh Archaeology Trip', duration: '1 Day', price: 3200, rating: 4.4, image: '/images/tours/mahasthangarh.jpg' },
      { id: 3, name: 'Bagerhat Mosque Heritage Tour', duration: '1 Day', price: 3500, rating: 4.5, image: '/images/tours/bagerhat.jpg' }
    ]
  },

  'adventure-seekers': {
    name: 'Adventure Seekers Bangladesh',
    slug: 'adventure-seekers',
    logo: '/images/operators/adventure-seekers.png',
    rating: 4.9,
    reviewCount: 500,
    tagline: 'Thrilling Adventure Tours Across Bangladesh',
    regions: ['Bandarban','Sylhet','Cox\'s Bazar','Rangamati'],
    stats: { toursCompleted: 300, travelersServed: 5500, regionsCovered: 12, experienceYears: 15 },
    services: ['Hotel Booking','Transport & Transfers','Professional Guides','Meal Arrangements','Adventure Gear','Travel Insurance'],
    specializations: ['Adventure','Hiking','Rafting','Camping'],
    verified: true,
    about: 'Adventure Seekers Bangladesh provides adrenaline-filled tours across mountains, rivers, and forests. Our trained guides ensure both safety and excitement.',
    gallery: ['/images/gallery/adventure1.jpg','/images/gallery/adventure2.jpg','/images/gallery/adventure3.jpg'],
    tours: [
      { id: 1, name: 'Sajek Valley Adventure', duration: '3 Days 2 Nights', price: 9000, rating: 4.9, image: '/images/tours/sajek-adventure.jpg' },
      { id: 2, name: 'Rangamati Lake Kayaking', duration: '2 Days 1 Night', price: 6500, rating: 4.8, image: '/images/tours/rangamati-kayak.jpg' },
      { id: 3, name: 'Nilgiri Hills Trek', duration: '4 Days 3 Nights', price: 12000, rating: 4.9, image: '/images/tours/nilgiri-adventure.jpg' }
    ]
  },

  'island-hoppers': {
    name: 'Island Hoppers Bangladesh',
    slug: 'island-hoppers',
    logo: '/images/operators/island-hoppers.png',
    rating: 4.6,
    reviewCount: 410,
    tagline: 'Explore Bangladesh\'s Islands & Beaches',
    regions: ['St. Martin\'s Island','Cox\'s Bazar','Kuakata','Patenga'],
    stats: { toursCompleted: 180, travelersServed: 3600, regionsCovered: 6, experienceYears: 6 },
    services: ['Boat Tours','Hotel Booking','Beach Activities','Meals & Refreshments','Local Guides'],
    specializations: ['Island Tours','Cruise','Beach'],
    verified: false,
    about: 'Island Hoppers Bangladesh offers unforgettable island hopping and beach experiences. Relax on pristine beaches and explore coastal villages with our expert guides.',
    gallery: ['/images/gallery/island1.jpg','/images/gallery/island2.jpg','/images/gallery/island3.jpg'],
    tours: [
      { id: 1, name: 'St. Martin Island Escape', duration: '2 Days 1 Night', price: 7000, rating: 4.6, image: '/images/tours/stmartin-escape.jpg' },
      { id: 2, name: 'Kuakata Sunset Beach Tour', duration: '1 Day', price: 3500, rating: 4.5, image: '/images/tours/kuakata-beach.jpg' },
      { id: 3, name: 'Cox\'s Bazar Coastal Cruise', duration: '2 Days 1 Night', price: 6000, rating: 4.7, image: '/images/tours/cox-cruise.jpg' }
    ]
  },

  'eco-treks': {
    name: 'Eco Treks Bangladesh',
    slug: 'eco-treks',
    logo: '/images/operators/eco-treks.png',
    rating: 4.8,
    reviewCount: 380,
    tagline: 'Eco-Friendly Nature & Trekking Tours',
    regions: ['Sundarbans','Sylhet','Rangamati','Bandarban'],
    stats: { toursCompleted: 150, travelersServed: 3200, regionsCovered: 8, experienceYears: 10 },
    services: ['Trekking','Eco-Tours','Local Guides','Transport & Transfers','Meals','Tickets'],
    specializations: ['Eco-Tourism','Hiking','Wildlife'],
    verified: true,
    about: 'Eco Treks Bangladesh provides environmentally conscious trekking and wildlife tours, focusing on sustainable travel practices and local community engagement.',
    gallery: ['/images/gallery/eco1.jpg','/images/gallery/eco2.jpg','/images/gallery/eco3.jpg'],
    tours: [
      { id: 1, name: 'Sundarbans Mangrove Trek', duration: '3 Days 2 Nights', price: 7500, rating: 4.8, image: '/images/tours/sundarbans-trek.jpg' },
      { id: 2, name: 'Sylhet Rainforest Eco Trek', duration: '2 Days 1 Night', price: 6000, rating: 4.7, image: '/images/tours/sylhet-eco.jpg' },
      { id: 3, name: 'Bandarban Hills Eco Trek', duration: '4 Days 3 Nights', price: 10000, rating: 4.9, image: '/images/tours/bandarban-eco.jpg' }
    ]
  },

  'luxury-voyages': {
    name: 'Luxury Voyages Bangladesh',
    slug: 'luxury-voyages',
    logo: '/images/operators/luxury-voyages.png',
    rating: 4.9,
    reviewCount: 430,
    tagline: 'High-End Travel Experiences',
    regions: ['Dhaka','Chittagong','Sylhet','Khulna'],
    stats: { toursCompleted: 140, travelersServed: 2800, regionsCovered: 8, experienceYears: 12 },
    services: ['Luxury Hotels','Private Transfers','Professional Guides','Gourmet Meals','Exclusive Experiences'],
    specializations: ['Luxury','Cruise','Resort'],
    verified: true,
    about: 'Luxury Voyages Bangladesh offers premium travel experiences, combining comfort, exclusivity, and cultural exploration across the country.',
    gallery: ['/images/gallery/luxury1.jpg','/images/gallery/luxury2.jpg','/images/gallery/luxury3.jpg'],
    tours: [
      { id: 1, name: 'Luxury Sundarbans Cruise', duration: '3 Days 2 Nights', price: 15000, rating: 4.9, image: '/images/tours/luxury-sundarbans.jpg' },
      { id: 2, name: 'Premium Chittagong Hill Retreat', duration: '2 Days 1 Night', price: 12000, rating: 4.8, image: '/images/tours/luxury-chittagong.jpg' },
      { id: 3, name: 'Sylhet Tea Estate Exclusive', duration: '1 Day', price: 8000, rating: 4.7, image: '/images/tours/luxury-sylhet.jpg' }
    ]
  },

  'desert-trails': {
    name: 'Desert Trails Bangladesh',
    slug: 'desert-trails',
    logo: '/images/operators/desert-trails.png',
    rating: 4.5,
    reviewCount: 290,
    tagline: 'Explore Bangladesh\'s Sand & Coastal Landscapes',
    regions: ['Kuakata','Patenga','Cox\'s Bazar'],
    stats: { toursCompleted: 100, travelersServed: 2200, regionsCovered: 4, experienceYears: 8 },
    services: ['Beach Walks','Guided Tours','Transport','Meal Arrangements','Tickets'],
    specializations: ['Adventure','Photography','Beach'],
    verified: false,
    about: 'Desert Trails Bangladesh organizes coastal and sandy landscape tours, offering unique photography and adventure experiences along Bangladesh\'s shorelines.',
    gallery: ['/images/gallery/desert1.jpg','/images/gallery/desert2.jpg','/images/gallery/desert3.jpg'],
    tours: [
      { id: 1, name: 'Kuakata Sand & Sunset Tour', duration: '1 Day', price: 3000, rating: 4.5, image: '/images/tours/kuakata-sunset.jpg' },
      { id: 2, name: 'Cox\'s Bazar Coastal Walk', duration: '2 Days 1 Night', price: 5000, rating: 4.4, image: '/images/tours/cox-sand.jpg' },
      { id: 3, name: 'Patenga Beach Adventure', duration: '1 Day', price: 3500, rating: 4.4, image: '/images/tours/patenga.jpg' }
    ]
  },

  'northern-lights-tours': {
    name: 'Northern Lights Tours Bangladesh',
    slug: 'northern-lights-tours',
    logo: '/images/operators/northern-lights-tours.png',
    rating: 4.9,
    reviewCount: 350,
    tagline: 'Experience the Magic of Bangladesh\'s Natural Wonders',
    regions: ['Rangpur','Dinajpur','Thakurgaon'],
    stats: { toursCompleted: 90, travelersServed: 2000, regionsCovered: 5, experienceYears: 9 },
    services: ['Guided Tours','Photography','Transport','Meals','Tickets'],
    specializations: ['Nature','Photography','Winter Tours'],
    verified: true,
    about: 'Northern Lights Tours Bangladesh focuses on exploring northern Bangladesh\'s scenic landscapes, winter experiences, and unique photography opportunities.',
    gallery: ['/images/gallery/northern1.jpg','/images/gallery/northern2.jpg','/images/gallery/northern3.jpg'],
    tours: [
      { id: 1, name: 'Rangpur Countryside Tour', duration: '2 Days 1 Night', price: 4000, rating: 4.9, image: '/images/tours/rangpur.jpg' },
      { id: 2, name: 'Dinajpur Heritage Tour', duration: '1 Day', price: 2500, rating: 4.8, image: '/images/tours/dinajpur.jpg' },
      { id: 3, name: 'Thakurgaon Nature Trek', duration: '1 Day', price: 3000, rating: 4.7, image: '/images/tours/thakurgaon.jpg' }
    ]
  },

  'jungle-expeditions': {
    name: 'Jungle Expeditions Bangladesh',
    slug: 'jungle-expeditions',
    logo: '/images/operators/jungle-expeditions.png',
    rating: 4.7,
    reviewCount: 420,
    tagline: 'Deep Jungle Adventures in Bangladesh',
    regions: ['Sundarbans','Bagerhat','Khulna','Satkhira'],
    stats: { toursCompleted: 200, travelersServed: 4000, regionsCovered: 10, experienceYears: 11 },
    services: ['Wildlife Tours','Transport','Guided Treks','Meal Arrangements','Photography'],
    specializations: ['Adventure','Wildlife','Trekking'],
    verified: true,
    about: 'Jungle Expeditions Bangladesh takes travelers into the heart of Bangladesh\'s forests and mangroves, combining adventure with environmental awareness.',
    gallery: ['/images/gallery/jungle1.jpg','/images/gallery/jungle2.jpg','/images/gallery/jungle3.jpg'],
    tours: [
      { id: 1, name: 'Sundarbans Tiger Trek', duration: '3 Days 2 Nights', price: 8000, rating: 4.7, image: '/images/tours/sundarbans-tiger.jpg' },
      { id: 2, name: 'Bagerhat Mangrove Exploration', duration: '2 Days 1 Night', price: 5500, rating: 4.6, image: '/images/tours/bagerhat-mangrove.jpg' },
      { id: 3, name: 'Khulna Wildlife Adventure', duration: '1 Day', price: 4000, rating: 4.5, image: '/images/tours/khulna-wildlife.jpg' }
    ]
  },

  'historic-horizons': {
    name: 'Historic Horizons Bangladesh',
    slug: 'historic-horizons',
    logo: '/images/operators/historic-horizons.png',
    rating: 4.6,
    reviewCount: 340,
    tagline: 'Tours of Bangladesh\'s Historic Heritage',
    regions: ['Paharpur','Mahasthangarh','Bagerhat','Varendra Museum'],
    stats: { toursCompleted: 160, travelersServed: 3100, regionsCovered: 8, experienceYears: 6 },
    services: ['Museum Tours','Transport','Local Guides','Meal Arrangements','Tickets'],
    specializations: ['History','Culture','Education'],
    verified: false,
    about: 'Historic Horizons Bangladesh focuses on the country\'s rich historical and cultural sites, offering educational and immersive experiences.',
    gallery: ['/images/gallery/historic1.jpg','/images/gallery/historic2.jpg','/images/gallery/historic3.jpg'],
    tours: [
      { id: 1, name: 'Paharpur Ancient Monastery', duration: '1 Day', price: 3000, rating: 4.5, image: '/images/tours/paharpur.jpg' },
      { id: 2, name: 'Mahasthangarh Tour', duration: '1 Day', price: 3200, rating: 4.4, image: '/images/tours/mahasthangarh.jpg' },
      { id: 3, name: 'Bagerhat Mosque Heritage', duration: '1 Day', price: 3500, rating: 4.5, image: '/images/tours/bagerhat.jpg' }
    ]
  },

  'snow-adventures': {
    name: 'Snow Adventures Bangladesh',
    slug: 'snow-adventures',
    logo: '/images/operators/snow-adventures.png',
    rating: 4.8,
    reviewCount: 360,
    tagline: 'Winter Sports & Adventure Tours',
    regions: ['Sylhet','Bandarban','Chittagong','Rangamati'],
    stats: { toursCompleted: 120, travelersServed: 2700, regionsCovered: 6, experienceYears: 10 },
    services: ['Skiing','Snowboarding','Adventure Gear','Transport','Professional Guides'],
    specializations: ['Winter Sports','Adventure','Skiing'],
    verified: true,
    about: 'Snow Adventures Bangladesh provides winter sport experiences in colder highland regions, combined with adventure treks and guided tours.',
    gallery: ['/images/gallery/snow1.jpg','/images/gallery/snow2.jpg','/images/gallery/snow3.jpg'],
    tours: [
      { id: 1, name: 'Sylhet Winter Trek', duration: '2 Days 1 Night', price: 6000, rating: 4.8, image: '/images/tours/sylhet-winter.jpg' },
      { id: 2, name: 'Bandarban Snow Adventure', duration: '3 Days 2 Nights', price: 8500, rating: 4.9, image: '/images/tours/bandarban-snow.jpg' },
      { id: 3, name: 'Chittagong Hills Snow Trek', duration: '2 Days 1 Night', price: 7000, rating: 4.7, image: '/images/tours/chittagong-snow.jpg' }
    ]
  },

  'culinary-journeys': {
    name: 'Culinary Journeys Bangladesh',
    slug: 'culinary-journeys',
    logo: '/images/operators/culinary-journeys.png',
    rating: 4.7,
    reviewCount: 350,
    tagline: 'Taste the Flavors of Bangladesh',
    regions: ['Dhaka','Sylhet','Chittagong','Khulna'],
    stats: { toursCompleted: 130, travelersServed: 2800, regionsCovered: 6, experienceYears: 8 },
    services: ['Food Tours','Cooking Classes','Transport','Meal Arrangements','Local Guides'],
    specializations: ['Food','Culture','City Tours'],
    verified: true,
    about: 'Culinary Journeys Bangladesh offers guided food tours, cooking classes, and tasting experiences highlighting Bangladesh\'s rich culinary heritage.',
    gallery: ['/images/gallery/culinary1.jpg','/images/gallery/culinary2.jpg','/images/gallery/culinary3.jpg'],
    tours: [
      { id: 1, name: 'Dhaka Street Food Tour', duration: '1 Day', price: 2500, rating: 4.7, image: '/images/tours/dhaka-food.jpg' },
      { id: 2, name: 'Sylhet Tea & Cuisine Experience', duration: '1 Day', price: 3000, rating: 4.8, image: '/images/tours/sylhet-food.jpg' },
      { id: 3, name: 'Chittagong Seafood Delights', duration: '2 Days 1 Night', price: 4500, rating: 4.7, image: '/images/tours/chittagong-food.jpg' }
    ]
  },

  'island-breeze-tours': {
    name: 'Island Breeze Tours Bangladesh',
    slug: 'island-breeze-tours',
    logo: '/images/operators/island-breeze-tours.png',
    rating: 4.5,
    reviewCount: 280,
    tagline: 'Relaxing Island Vacations',
    regions: ['St. Martin\'s Island','Cox\'s Bazar','Kuakata','Patenga'],
    stats: { toursCompleted: 100, travelersServed: 2000, regionsCovered: 5, experienceYears: 5 },
    services: ['Boat Tours','Beach Activities','Transport','Hotel Booking','Meals'],
    specializations: ['Beach','Cruise','Resort'],
    verified: true,
    about: 'Island Breeze Tours Bangladesh offers relaxing vacations on islands and coastal areas, perfect for leisure travelers seeking comfort and beauty.',
    gallery: ['/images/gallery/islandbreeze1.jpg','/images/gallery/islandbreeze2.jpg','/images/gallery/islandbreeze3.jpg'],
    tours: [
      { id: 1, name: 'St. Martin Island Relaxation', duration: '2 Days 1 Night', price: 5000, rating: 4.5, image: '/images/tours/stmartin-relax.jpg' },
      { id: 2, name: 'Kuakata Beach Escape', duration: '1 Day', price: 3000, rating: 4.4, image: '/images/tours/kuakata-escape.jpg' },
      { id: 3, name: 'Cox\'s Bazar Sea Breeze Tour', duration: '2 Days 1 Night', price: 5500, rating: 4.5, image: '/images/tours/cox-sea.jpg' }
    ]
  },

  'volcano-voyagers': {
    name: 'Volcano Voyagers Bangladesh',
    slug: 'volcano-voyagers',
    logo: '/images/operators/volcano-voyagers.png',
    rating: 4.9,
    reviewCount: 310,
    tagline: 'Exciting Tours to Active Sites',
    regions: ['Bandarban','Rangamati','Sylhet'],
    stats: { toursCompleted: 90, travelersServed: 1800, regionsCovered: 4, experienceYears: 7 },
    services: ['Trekking','Guided Tours','Transport','Meal Arrangements','Photography'],
    specializations: ['Adventure','Hiking','Photography'],
    verified: true,
    about: 'Volcano Voyagers Bangladesh organizes thrilling trips to volcanic and highland sites, combining adventure, trekking, and photography opportunities.',
    gallery: ['/images/gallery/volcano1.jpg','/images/gallery/volcano2.jpg','/images/gallery/volcano3.jpg'],
    tours: [
      { id: 1, name: 'Bandarban Volcano Trek', duration: '2 Days 1 Night', price: 6000, rating: 4.9, image: '/images/tours/bandarban-volcano.jpg' },
      { id: 2, name: 'Rangamati Adventure Hike', duration: '1 Day', price: 3500, rating: 4.8, image: '/images/tours/rangamati-volcano.jpg' },
      { id: 3, name: 'Sylhet Volcano Expedition', duration: '2 Days 1 Night', price: 6500, rating: 4.9, image: '/images/tours/sylhet-volcano.jpg' }
    ]
  },

  'river-rovers': {
    name: 'River Rovers Bangladesh',
    slug: 'river-rovers',
    logo: '/images/operators/river-rovers.png',
    rating: 4.6,
    reviewCount: 300,
    tagline: 'River Cruises & Kayaking Adventures',
    regions: ['Dhaka','Mymensingh','Rajshahi','Barishal'],
    stats: { toursCompleted: 130, travelersServed: 2500, regionsCovered: 6, experienceYears: 6 },
    services: ['River Cruises','Kayaking','Guided Tours','Transport','Meal Arrangements'],
    specializations: ['Cruise','Adventure','Nature'],
    verified: false,
    about: 'River Rovers Bangladesh specializes in river-based tours, kayaking, and cruising, highlighting the scenic waterways of Bangladesh.',
    gallery: ['/images/gallery/river1.jpg','/images/gallery/river2.jpg','/images/gallery/river3.jpg'],
    tours: [
      { id: 1, name: 'Padma River Cruise', duration: '2 Days 1 Night', price: 5000, rating: 4.6, image: '/images/tours/padma-cruise.jpg' },
      { id: 2, name: 'Mymensingh Kayaking Adventure', duration: '1 Day', price: 3500, rating: 4.5, image: '/images/tours/mymensingh-kayak.jpg' },
      { id: 3, name: 'Barishal River Experience', duration: '2 Days 1 Night', price: 4500, rating: 4.6, image: '/images/tours/barishal-river.jpg' }
    ]
  },

  'safari-and-beyond': {
    name: 'Safari & Beyond Bangladesh',
    slug: 'safari-and-beyond',
    logo: '/images/operators/safari-and-beyond.png',
    rating: 4.8,
    reviewCount: 470,
    tagline: 'Comprehensive Wildlife & Cultural Tours',
    regions: ['Sundarbans','Khulna','Bandarban','Cox\'s Bazar'],
    stats: { toursCompleted: 220, travelersServed: 4200, regionsCovered: 12, experienceYears: 12 },
    services: ['Safari','Guided Tours','Transport','Meal Arrangements','Photography'],
    specializations: ['Safari','Wildlife','Adventure'],
    verified: true,
    about: 'Safari & Beyond Bangladesh provides complete African-style safaris, wildlife encounters, and cultural tours adapted for Bangladesh\'s diverse landscapes.',
    gallery: ['/images/gallery/safari-beyond1.jpg','/images/gallery/safari-beyond2.jpg','/images/gallery/safari-beyond3.jpg'],
    tours: [
      { id: 1, name: 'Sundarbans Full Safari', duration: '3 Days 2 Nights', price: 9000, rating: 4.8, image: '/images/tours/sundarbans-full.jpg' },
      { id: 2, name: 'Bandarban Hills Wildlife Trek', duration: '2 Days 1 Night', price: 6500, rating: 4.7, image: '/images/tours/bandarban-wildlife.jpg' },
      { id: 3, name: 'Khulna Mangrove Safari', duration: '2 Days 1 Night', price: 6000, rating: 4.8, image: '/images/tours/khulna-safari.jpg' }
    ]
  }
};

async function seedTourOperatorDetails() {
  try {
    await dbConnect();
    
    // Drop the collection to remove old indexes
    try {
      await TourOperator.collection.drop();
      console.log('Dropped existing collection and indexes');
    } catch (error) {
      console.log('Collection does not exist, creating new one');
    }
    
    // Insert new data
    const operators = Object.values(tourOperatorDetails);
    await TourOperator.insertMany(operators);
    
    console.log(`Successfully seeded ${operators.length} tour operators`);
    process.exit(0);
  } catch (error) {
    console.error('Error seeding tour operators:', error);
    process.exit(1);
  }
}

seedTourOperatorDetails();