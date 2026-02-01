import mongoose from 'mongoose';
import TourOperator from '../models/tourOperator.model';

const MONGODB_URI = 'mongodb+srv://istiakadil:istiakadil@cluster0.lbx8jdk.mongodb.net/bd-travel-spirit-client?retryWrites=true&w=majority&appName=Cluster0';

async function checkData() {
  await mongoose.connect(MONGODB_URI);
  const count = await TourOperator.countDocuments();
  console.log('Tour operators count:', count);
  process.exit(0);
}

checkData();