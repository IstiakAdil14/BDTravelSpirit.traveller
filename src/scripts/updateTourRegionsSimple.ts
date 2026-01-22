import { config } from 'dotenv';
import { dbConnect } from '@/lib/db/connect';
import { TourModel } from '@/models/tour.model';

// Load environment variables
config({ path: '.env.local' });

// Comprehensive region mapping based on tour names/locations
const regionMapping: Record<string, string> = {
  // Dhaka Division
  'Dhaka': 'Dhaka',
  'Lalbagh': 'Dhaka',
  'Ahsan Manzil': 'Dhaka',
  'Sonargaon': 'Dhaka',
  'National Zoo': 'Dhaka',
  'Botanical Garden': 'Dhaka',
  
  // Chittagong Division
  'Chittagong': 'Chittagong',
  'Cox\'s Bazar': 'Chittagong',
  'Bandarban': 'Chittagong',
  'Rangamati': 'Chittagong',
  'Saint Martin': 'Chittagong',
  'Sajek': 'Chittagong',
  'Sitakunda': 'Chittagong',
  'Sandwip': 'Chittagong',
  'Mainamati': 'Chittagong',
  
  // Sylhet Division
  'Sylhet': 'Sylhet',
  'Ratargul': 'Sylhet',
  'Bisnakandi': 'Sylhet',
  'Bichanakandi': 'Sylhet',
  'Jaflong': 'Sylhet',
  'Lalakhal': 'Sylhet',
  'Sreemangal': 'Sylhet',
  'Tanguar Haor': 'Sylhet',
  'Lauwachara': 'Sylhet',
  
  // Barisal Division
  'Barisal': 'Barisal',
  'Barishal': 'Barisal',
  'Kuakata': 'Barisal',
  'Durga Sagar': 'Barisal',
  'Floating Market': 'Barisal',
  'Lebur Char': 'Barisal',
  'Fatrar Char': 'Barisal',
  'Nijhum Dwip': 'Barisal',
  'Monpura': 'Barisal',
  'Patuakhali': 'Barisal',
  'Bhola': 'Barisal',
  'Hatiya': 'Barisal',
  
  // Khulna Division
  'Khulna': 'Khulna',
  'Sundarbans': 'Khulna',
  'Sixty Dome': 'Khulna',
  
  // Rajshahi Division
  'Rajshahi': 'Rajshahi',
  'Paharpur': 'Rajshahi',
  'Somapura': 'Rajshahi',
  'Kantajew': 'Rajshahi',
  
  // Rangpur Division
  'Rangpur': 'Rangpur',
  
  // Mymensingh Division
  'Mymensingh': 'Mymensingh'
};

function getRegionFromTourName(tourName: string): string | null {
  const nameLower = tourName.toLowerCase();
  for (const [location, region] of Object.entries(regionMapping)) {
    if (nameLower.includes(location.toLowerCase())) {
      return region;
    }
  }
  return null;
}

async function updateTourRegions() {
  try {
    await dbConnect();
    console.log('Connected to database');
    
    // Step 1: Fetch data from tours table
    const tours = await TourModel.find({});
    console.log(`Step 1: Fetched ${tours.length} tours from database`);
    
    let updated = 0;
    
    for (const tour of tours) {
      // Step 2: Delete previous region values
      await TourModel.updateOne(
        { _id: tour._id },
        { 
          $unset: { 
            'destinations.$[].region': '',
            'mainLocation.address.region': ''
          }
        }
      );
      
      // Step 3: Put new region values according to tour names
      const newRegion = getRegionFromTourName(tour.title);
      
      if (newRegion) {
        const updateDoc: any = {};
        
        // Update destinations region
        if (tour.destinations && tour.destinations.length > 0) {
          updateDoc.destinations = tour.destinations.map((dest: any) => ({
            ...dest,
            region: newRegion
          }));
        }
        
        // Update mainLocation region
        if (tour.mainLocation && tour.mainLocation.address) {
          updateDoc.mainLocation = {
            ...tour.mainLocation,
            address: {
              ...tour.mainLocation.address,
              region: newRegion
            }
          };
        }
        
        await TourModel.updateOne({ _id: tour._id }, { $set: updateDoc });
        console.log(`Updated "${tour.title}" with region: ${newRegion}`);
        updated++;
      }
    }
    
    console.log(`\nCompleted: ${updated} tours updated with new regions`);
    
  } catch (error) {
    console.error('Error:', error);
  }
}

// Run if this file is executed directly
if (require.main === module) {
  updateTourRegions().then(() => process.exit(0));
}

export { updateTourRegions };