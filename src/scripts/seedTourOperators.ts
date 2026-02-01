import mongoose from 'mongoose';
import { tourOperators } from '../data/tourOperators';

const MONGODB_URI = 'mongodb+srv://istiakadil:istiakadil@cluster0.lbx8jdk.mongodb.net/bd-travel-spirit-client?retryWrites=true&w=majority&appName=Cluster0';

const TourOperatorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  logo: { type: String, required: true },
  rating: { type: Number, required: true },
  reviewCount: { type: Number, required: true },
  tagline: { type: String, required: true },
  regions: [{ type: String, required: true }],
  stats: {
    toursCompleted: { type: Number, required: true },
    travelersServed: { type: Number, required: true },
    regionsCovered: { type: Number, required: true },
    experienceYears: { type: Number, required: true }
  },
  services: [{ type: String, required: true }],
  specializations: [{ type: String, required: true }],
  verified: { type: Boolean, required: true },
  about: { type: String, required: true },
  gallery: [{ type: String, required: true }],
  tours: [{
    id: { type: Number, required: true },
    name: { type: String, required: true },
    duration: { type: String, required: true },
    price: { type: Number, required: true },
    rating: { type: Number, required: true },
    image: { type: String, required: true }
  }]
}, { timestamps: true });

const TourOperator = mongoose.models.TourOperator || mongoose.model('TourOperator', TourOperatorSchema);

async function seedTourOperators() {
  try {
    await mongoose.connect(MONGODB_URI);
    
    await TourOperator.deleteMany({});
    const result = await TourOperator.insertMany(tourOperators);
    
    console.log(`Successfully seeded ${result.length} tour operators`);
    
    await mongoose.disconnect();
    process.exit(0);
    
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

seedTourOperators();