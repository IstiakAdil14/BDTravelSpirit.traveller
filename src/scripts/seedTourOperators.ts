import mongoose from 'mongoose';
import { tourOperators } from '../data/tourOperators';
import TourOperator from '../models/tourOperator.model';

const MONGODB_URI = 'mongodb+srv://istiakadil:istiakadil@cluster0.lbx8jdk.mongodb.net/bd-travel-spirit-client?retryWrites=true&w=majority&appName=Cluster0';

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