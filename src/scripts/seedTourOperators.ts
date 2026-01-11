import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb+srv://istiakadil:istiakadil@cluster0.lbx8jdk.mongodb.net/bd-travel-spirit-client?retryWrites=true&w=majority&appName=Cluster0';

const TourOperatorSchema = new mongoose.Schema({
  id: Number,
  name: String,
  logo: String,
  rating: Number,
  reviews: Number,
  specialties: [String],
  certified: Boolean,
  experience: String
}, { timestamps: true });

const TourOperator = mongoose.models.TourOperator || mongoose.model('TourOperator', TourOperatorSchema);

const operators = [
  {
    id: 1,
    name: 'Bangladesh Tours Ltd.',
    logo: '/images/tour-operators/bangladesh-tours.png',
    rating: 4.8,
    reviews: 1250,
    specialties: ['Cultural Tours', 'Adventure'],
    certified: true,
    experience: '15+ years'
  },
  {
    id: 2,
    name: 'Sundarbans Explorer',
    logo: '/images/tour-operators/sundarbans-explorer.png',
    rating: 4.9,
    reviews: 890,
    specialties: ['Wildlife', 'Eco-tourism'],
    certified: true,
    experience: '12+ years'
  },
  {
    id: 3,
    name: 'Hill Tracts Adventures',
    logo: '/images/tour-operators/hill-tracts.png',
    rating: 4.7,
    reviews: 675,
    specialties: ['Trekking', 'Cultural'],
    certified: true,
    experience: '10+ years'
  },
  {
    id: 4,
    name: 'Dhaka Heritage Tours',
    logo: '/images/tour-operators/dhaka-heritage.png',
    rating: 4.6,
    reviews: 920,
    specialties: ['Heritage', 'City Tours'],
    certified: true,
    experience: '8+ years'
  },
  {
    id: 5,
    name: 'Cox\'s Bazar Beach Tours',
    logo: '/images/tour-operators/coxs-bazar.png',
    rating: 4.7,
    reviews: 1100,
    specialties: ['Beach', 'Adventure'],
    certified: true,
    experience: '11+ years'
  },
  {
    id: 6,
    name: 'Tea Garden Explorers',
    logo: '/images/tour-operators/tea-garden.png',
    rating: 4.5,
    reviews: 780,
    specialties: ['Nature', 'Cultural'],
    certified: true,
    experience: '9+ years'
  },
  {
    id: 7,
    name: 'Royal Bengal Safaris',
    logo: '/images/tour-operators/royal-bengal.png',
    rating: 4.8,
    reviews: 950,
    specialties: ['Wildlife', 'Photography'],
    certified: true,
    experience: '13+ years'
  },
  {
    id: 8,
    name: 'Bangladesh River Cruises',
    logo: '/images/tour-operators/river-cruises.png',
    rating: 4.6,
    reviews: 680,
    specialties: ['River Tours', 'Luxury'],
    certified: true,
    experience: '7+ years'
  },
  {
    id: 9,
    name: 'Tribal Culture Tours',
    logo: '/images/tour-operators/tribal-culture.png',
    rating: 4.4,
    reviews: 540,
    specialties: ['Cultural', 'Ethnic'],
    certified: true,
    experience: '6+ years'
  }
];

async function seedTourOperators() {
  try {
    await mongoose.connect(MONGODB_URI);
    
    await TourOperator.deleteMany({});
    const result = await TourOperator.insertMany(operators);
    
    console.log(`Successfully seeded ${result.length} tour operators`);
    
    await mongoose.disconnect();
    process.exit(0);
    
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

seedTourOperators();