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

async function getTourLocations() {
  try {
    await mongoose.connect(MONGODB_URI);
    
    const locations = await TourLocation.find({});
    
    console.log('\n=== TOUR LOCATIONS FROM DATABASE ===\n');
    
    if (locations.length === 0) {
      console.log('No tour locations found in database.');
    } else {
      locations.forEach((location, index) => {
        console.log(`${index + 1}. ${location.name}`);
        console.log(`   ID: ${location.id}`);
        console.log(`   Duration: ${location.duration}`);
        console.log(`   Description: ${location.description}`);
        console.log(`   Highlights: ${location.highlights.join(', ')}`);
        console.log('   ---');
      });
      
      console.log(`\nTotal locations: ${locations.length}`);
    }
    
    await mongoose.disconnect();
    process.exit(0);
    
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

getTourLocations();