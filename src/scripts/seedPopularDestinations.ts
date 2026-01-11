import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb+srv://istiakadil:istiakadil@cluster0.lbx8jdk.mongodb.net/bd-travel-spirit-client?retryWrites=true&w=majority&appName=Cluster0';

const PopularDestinationSchema = new mongoose.Schema({
  id: String,
  name: String,
  country: String,
  region: String,
  description: String,
  image: {
    src: String,
    alt: String,
    width: Number,
    height: Number
  },
  stats: {
    hotelCount: Number,
    avgPrice: Number,
    rating: Number,
    reviewCount: Number,
    popularityScore: Number
  },
  season: {
    bestSeason: String,
    months: [String]
  },
  tags: [String],
  category: String,
  featured: Boolean,
  coordinates: {
    lat: Number,
    lng: Number
  }
}, { timestamps: true });

const PopularDestination = mongoose.models.PopularDestination || mongoose.model('PopularDestination', PopularDestinationSchema);

const destinations = [
  {
    id: '1',
    name: 'Cox\'s Bazar',
    country: 'Bangladesh',
    region: 'Chittagong',
    description: 'World\'s longest natural sea beach',
    image: {
      src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
      alt: 'Cox\'s Bazar beach',
      width: 800,
      height: 600,
    },
    stats: {
      hotelCount: 45,
      avgPrice: 120,
      rating: 4.5,
      reviewCount: 1250,
      popularityScore: 95,
    },
    season: {
      bestSeason: 'November to February',
      months: ['11', '12', '01', '02'],
    },
    tags: ['beach', 'sea', 'sunset'],
    category: 'beach',
    featured: true,
    coordinates: { lat: 21.4272, lng: 92.0058 },
  },
  {
    id: '2',
    name: 'Saint Martin\'s Island',
    country: 'Bangladesh',
    region: 'Cox\'s Bazar',
    description: 'Small coral island with pristine beaches and clear waters',
    image: {
      src: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
      alt: 'Saint Martin\'s Island beach',
      width: 800,
      height: 600,
    },
    stats: {
      hotelCount: 15,
      avgPrice: 95,
      rating: 4.4,
      reviewCount: 720,
      popularityScore: 90,
    },
    season: {
      bestSeason: 'October to March',
      months: ['10', '11', '12', '01', '02', '03'],
    },
    tags: ['beach', 'island', 'coral'],
    category: 'beach',
    featured: true,
    coordinates: { lat: 20.6225, lng: 92.3208 },
  },
  {
    id: '3',
    name: 'Dhaka',
    country: 'Bangladesh',
    region: 'Dhaka',
    description: 'Capital city with rich history and culture',
    image: {
      src: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&h=600&fit=crop',
      alt: 'Dhaka cityscape',
      width: 800,
      height: 600,
    },
    stats: {
      hotelCount: 78,
      avgPrice: 150,
      rating: 4.2,
      reviewCount: 2100,
      popularityScore: 92,
    },
    season: {
      bestSeason: 'November to February',
      months: ['11', '12', '01', '02'],
    },
    tags: ['city', 'culture', 'history'],
    category: 'urban',
    featured: true,
    coordinates: { lat: 23.8103, lng: 90.4125 },
  },
  {
    id: '4',
    name: 'Sajek Valley',
    country: 'Bangladesh',
    region: 'Rangamati',
    description: 'Cloud-kissed valley with breathtaking mountain views',
    image: {
      src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
      alt: 'Sajek Valley mountains',
      width: 800,
      height: 600,
    },
    stats: {
      hotelCount: 20,
      avgPrice: 100,
      rating: 4.6,
      reviewCount: 850,
      popularityScore: 88,
    },
    season: {
      bestSeason: 'October to March',
      months: ['10', '11', '12', '01', '02', '03'],
    },
    tags: ['mountains', 'valley', 'clouds'],
    category: 'nature',
    featured: true,
    coordinates: { lat: 23.3833, lng: 92.2833 },
  },
  {
    id: '5',
    name: 'Sundarbans',
    country: 'Bangladesh',
    region: 'Khulna',
    description: 'UNESCO World Heritage mangrove forest and wildlife sanctuary',
    image: {
      src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop',
      alt: 'Sundarbans mangrove',
      width: 800,
      height: 600,
    },
    stats: {
      hotelCount: 25,
      avgPrice: 80,
      rating: 4.1,
      reviewCount: 480,
      popularityScore: 82,
    },
    season: {
      bestSeason: 'October to March',
      months: ['10', '11', '12', '01', '02', '03'],
    },
    tags: ['mangrove', 'wildlife', 'boat'],
    category: 'nature',
    featured: true,
    coordinates: { lat: 21.9497, lng: 89.1833 },
  },
  {
    id: '6',
    name: 'Bandarban',
    country: 'Bangladesh',
    region: 'Bandarban',
    description: 'Hill district with tribal culture and scenic landscapes',
    image: {
      src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
      alt: 'Bandarban hills',
      width: 800,
      height: 600,
    },
    stats: {
      hotelCount: 18,
      avgPrice: 85,
      rating: 4.3,
      reviewCount: 620,
      popularityScore: 86,
    },
    season: {
      bestSeason: 'November to February',
      months: ['11', '12', '01', '02'],
    },
    tags: ['hills', 'tribal', 'culture'],
    category: 'nature',
    featured: true,
    coordinates: { lat: 22.1953, lng: 92.2189 },
  },
];

async function seedPopularDestinations() {
  try {
    await mongoose.connect(MONGODB_URI);
    
    await PopularDestination.deleteMany({});
    const result = await PopularDestination.insertMany(destinations);
    
    console.log(`Successfully seeded ${result.length} popular destinations`);
    
    await mongoose.disconnect();
    process.exit(0);
    
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

seedPopularDestinations();