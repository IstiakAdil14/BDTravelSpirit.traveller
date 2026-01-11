import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb+srv://istiakadil:istiakadil@cluster0.lbx8jdk.mongodb.net/bd-travel-spirit-client?retryWrites=true&w=majority&appName=Cluster0';

const BangladeshDestinationSchema = new mongoose.Schema({
  id: Number,
  name: String,
  image: String,
  tourPlaces: Number
}, { timestamps: true });

const BangladeshDestination = mongoose.models.BangladeshDestination || mongoose.model('BangladeshDestination', BangladeshDestinationSchema);

const destinations = [
  {
    id: 1,
    name: 'Barisal',
    image: '/images/division_imgs/barisal.jpg',
    tourPlaces: 25
  },
  {
    id: 2,
    name: 'Chittagong',
    image: '/images/division_imgs/chittagong.jpg',
    tourPlaces: 42
  },
  {
    id: 3,
    name: 'Dhaka',
    image: '/images/division_imgs/dhaka.jpg',
    tourPlaces: 38
  },
  {
    id: 4,
    name: 'Khulna',
    image: '/images/division_imgs/khulna.jpg',
    tourPlaces: 31
  },
  {
    id: 5,
    name: 'Mymensingh',
    image: '/images/division_imgs/mymensingh.jpg',
    tourPlaces: 29
  },
  {
    id: 6,
    name: 'Rajshahi',
    image: '/images/division_imgs/rajshahi.jpg',
    tourPlaces: 35
  },
  {
    id: 7,
    name: 'Rangpur',
    image: '/images/division_imgs/rangpur.jpg',
    tourPlaces: 27
  },
  {
    id: 8,
    name: 'Sylhet',
    image: '/images/division_imgs/sylhet.jpg',
    tourPlaces: 33
  }
];

async function seedBangladeshDestinations() {
  try {
    await mongoose.connect(MONGODB_URI);
    
    await BangladeshDestination.deleteMany({});
    const result = await BangladeshDestination.insertMany(destinations);
    
    console.log(`Successfully seeded ${result.length} Bangladesh destinations`);
    
    await mongoose.disconnect();
    process.exit(0);
    
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

seedBangladeshDestinations();