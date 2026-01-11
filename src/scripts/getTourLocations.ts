import { dbConnect } from '@/lib/db/connect';
import TourLocation from '@/models/tourLocation.model';

async function getTourLocations() {
  try {
    await dbConnect();
    
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
        console.log(`   Image: ${location.image}`);
        console.log('   ---');
      });
      
      console.log(`\nTotal locations: ${locations.length}`);
    }
    
    process.exit(0);
    
  } catch (error) {
    console.error('Error fetching tour locations:', error);
    process.exit(1);
  }
}

getTourLocations();