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

const newLocation = {
  id: '1',
  name: 'Cox\'s Bazar Beach',
  image: '/images/division_imgs/chittagong.jpg',
  description: 'Experience the world\'s longest natural sea beach with pristine sands and crystal-clear waters.',
  duration: '3-5 days',
  highlights: ['Beach', 'Sunset views', 'Local cuisine']
};

async function addLocation() {
  try {
    await mongoose.connect(MONGODB_URI);
    
    const existingLocation = await TourLocation.findOne({ id: newLocation.id });
    
    if (existingLocation) {
      await TourLocation.findOneAndUpdate({ id: newLocation.id }, newLocation);
      console.log('Updated existing location: Cox\'s Bazar Beach');
    } else {
      await TourLocation.create(newLocation);
      console.log('Added new location: Cox\'s Bazar Beach');
    }
    
    await mongoose.disconnect();
    process.exit(0);
    
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

addLocation();