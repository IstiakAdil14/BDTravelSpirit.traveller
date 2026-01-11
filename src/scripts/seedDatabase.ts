import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb+srv://istiakadil:istiakadil@cluster0.lbx8jdk.mongodb.net/bd-travel-spirit-client?retryWrites=true&w=majority&appName=Cluster0';

const TourLocationSchema = new mongoose.Schema({
  id: String,
  name: String,
  image: String,
  description: String,
  duration: String,
  highlights: [String]
}, { timestamps: true });

const TourLocation = mongoose.models.TourLocation || mongoose.model('TourLocation', TourLocationSchema);

const tourLocations = [
  {
    id: '1',
    name: 'Cox\'s Bazar Beach',
    image: '/images/division_imgs/chittagong.jpg',
    description: 'Experience the world\'s longest natural sea beach with pristine sands and crystal-clear waters.',
    duration: '3-5 days',
    highlights: ['Beach', 'Sunset views', 'Local cuisine']
  },
  {
    id: '2',
    name: 'Sundarbans Mangrove Forest',
    image: '/images/division_imgs/khulna.jpg',
    description: 'Explore the largest mangrove forest in the world and spot the majestic Royal Bengal Tiger.',
    duration: '2-4 days',
    highlights: ['Wildlife safari', 'Boat cruise', 'Bird watching']
  },
  {
    id: '3',
    name: 'Sylhet Tea Gardens',
    image: '/images/division_imgs/sylhet.jpg',
    description: 'Wander through lush green tea plantations and discover the beauty of Bangladesh\'s hill tracts.',
    duration: '2-3 days',
    highlights: ['Tea tasting', 'Hill trekking', 'Cultural immersion']
  },
  {
    id: '4',
    name: 'Dhaka Old Town',
    image: '/images/division_imgs/dhaka.jpg',
    description: 'Step back in time exploring the historic mosques, temples, and colonial architecture of Dhaka.',
    duration: '1-2 days',
    highlights: ['Historical sites', 'Street food', 'Cultural heritage']
  },
  {
    id: '5',
    name: 'Bandarban Hills',
    image: '/images/division_imgs/chittagong.jpg',
    description: 'Trek through misty mountains and experience the unique culture of indigenous communities.',
    duration: '3-4 days',
    highlights: ['Mountain ', 'Tribal culture', 'Scenic views']
  },
  {
    id: '6',
    name: 'Saint Martin\'s Island',
    image: '/images/division_imgs/barisal.jpg',
    description: 'Visit Bangladesh\'s only coral island with turquoise waters and marine life exploration.',
    duration: '2-3 days',
    highlights: ['Snorkeling', 'Coral reefs', 'Island hopping']
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(MONGODB_URI);
    
    await TourLocation.deleteMany({});
    const result = await TourLocation.insertMany(tourLocations);
    
    console.log(`Successfully seeded ${result.length} tour locations`);
    
    await mongoose.disconnect();
    process.exit(0);
    
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

seedDatabase();