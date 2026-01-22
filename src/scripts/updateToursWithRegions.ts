import { dbConnect } from '@/lib/db/connect';
import { TourModel } from '@/models/tour.model';

// Region mapping based on districts/cities
const regionMapping: Record<string, string> = {
  // Dhaka Division
  'Dhaka': 'Dhaka',
  'Faridpur': 'Dhaka',
  'Gazipur': 'Dhaka',
  'Gopalganj': 'Dhaka',
  'Kishoreganj': 'Dhaka',
  'Madaripur': 'Dhaka',
  'Manikganj': 'Dhaka',
  'Munshiganj': 'Dhaka',
  'Narayanganj': 'Dhaka',
  'Narsingdi': 'Dhaka',
  'Rajbari': 'Dhaka',
  'Shariatpur': 'Dhaka',
  'Tangail': 'Dhaka',
  
  // Chittagong Division
  'Chittagong': 'Chittagong',
  'Bandarban': 'Chittagong',
  'Brahmanbaria': 'Chittagong',
  'Chandpur': 'Chittagong',
  'Comilla': 'Chittagong',
  'Cox\'s Bazar': 'Chittagong',
  'Feni': 'Chittagong',
  'Khagrachhari': 'Chittagong',
  'Lakshmipur': 'Chittagong',
  'Noakhali': 'Chittagong',
  'Rangamati': 'Chittagong',
  
  // Rajshahi Division
  'Rajshahi': 'Rajshahi',
  'Bogra': 'Rajshahi',
  'Joypurhat': 'Rajshahi',
  'Naogaon': 'Rajshahi',
  'Natore': 'Rajshahi',
  'Nawabganj': 'Rajshahi',
  'Pabna': 'Rajshahi',
  'Sirajganj': 'Rajshahi',
  
  // Khulna Division
  'Khulna': 'Khulna',
  'Bagerhat': 'Khulna',
  'Chuadanga': 'Khulna',
  'Jessore': 'Khulna',
  'Jhenaidah': 'Khulna',
  'Kushtia': 'Khulna',
  'Magura': 'Khulna',
  'Meherpur': 'Khulna',
  'Narail': 'Khulna',
  'Satkhira': 'Khulna',
  
  // Barisal Division
  'Barisal': 'Barisal',
  'Barguna': 'Barisal',
  'Bhola': 'Barisal',
  'Jhalokati': 'Barisal',
  'Patuakhali': 'Barisal',
  'Pirojpur': 'Barisal',
  
  // Sylhet Division
  'Sylhet': 'Sylhet',
  'Habiganj': 'Sylhet',
  'Moulvibazar': 'Sylhet',
  'Sunamganj': 'Sylhet',
  
  // Rangpur Division
  'Rangpur': 'Rangpur',
  'Dinajpur': 'Rangpur',
  'Gaibandha': 'Rangpur',
  'Kurigram': 'Rangpur',
  'Lalmonirhat': 'Rangpur',
  'Nilphamari': 'Rangpur',
  'Panchagarh': 'Rangpur',
  'Thakurgaon': 'Rangpur',
  
  // Mymensingh Division
  'Mymensingh': 'Mymensingh',
  'Jamalpur': 'Mymensingh',
  'Netrakona': 'Mymensingh',
  'Sherpur': 'Mymensingh'
};

function getRegionFromLocation(city?: string, district?: string, country?: string): string | null {
  if (country !== 'Bangladesh') return null;
  
  // Try to match city first, then district
  const location = city || district;
  if (!location) return null;
  
  // Direct match
  if (regionMapping[location]) {
    return regionMapping[location];
  }
  
  // Fuzzy match for common variations
  const locationLower = location.toLowerCase();
  for (const [key, region] of Object.entries(regionMapping)) {
    if (key.toLowerCase().includes(locationLower) || locationLower.includes(key.toLowerCase())) {
      return region;
    }
  }
  
  return null;
}

async function updateToursWithRegions() {
  try {
    await dbConnect();
    console.log('Connected to database');
    
    // Fetch all tours
    const tours = await TourModel.find({}).lean();
    console.log(`Found ${tours.length} tours to process`);
    
    let updatedCount = 0;
    let skippedCount = 0;
    
    for (const tour of tours) {
      let needsUpdate = false;
      const updateDoc: any = {};
      
      // Update destinations
      if (tour.destinations && Array.isArray(tour.destinations)) {
        const updatedDestinations = tour.destinations.map((destination: any) => {
          const updatedDestination = { ...destination };
          
          // If region is missing or empty, try to determine it
          if (!destination.region) {
            const region = getRegionFromLocation(
              destination.city, 
              destination.district, 
              destination.country
            );
            
            if (region) {
              updatedDestination.region = region;
              needsUpdate = true;
              console.log(`Tour "${tour.title}": Adding region "${region}" for ${destination.city || destination.district}`);
            }
          }
          
          return updatedDestination;
        });
        
        if (needsUpdate) {
          updateDoc.destinations = updatedDestinations;
        }
      }
      
      // Update mainLocation if it exists
      if (tour.mainLocation && tour.mainLocation.address && !tour.mainLocation.address.region) {
        const region = getRegionFromLocation(
          tour.mainLocation.address.city,
          tour.mainLocation.address.district,
          tour.mainLocation.address.country
        );
        
        if (region) {
          updateDoc.mainLocation = {
            ...tour.mainLocation,
            address: {
              ...tour.mainLocation.address,
              region: region
            }
          };
          needsUpdate = true;
          console.log(`Tour "${tour.title}": Adding region "${region}" to mainLocation`);
        }
      }
      
      if (needsUpdate) {
        await TourModel.updateOne(
          { _id: tour._id },
          { $set: updateDoc }
        );
        
        updatedCount++;
        console.log(`✓ Updated tour: ${tour.title}`);
      } else {
        skippedCount++;
        console.log(`- Skipped tour: ${tour.title} (no region updates needed)`);
      }
    }
    
    console.log(`\n=== Update Summary ===`);
    console.log(`Total tours processed: ${tours.length}`);
    console.log(`Tours updated: ${updatedCount}`);
    console.log(`Tours skipped: ${skippedCount}`);
    
  } catch (error) {
    console.error('Error updating tours:', error);
  }
}

// Export for use in other scripts or run directly
export { updateToursWithRegions };

// Run if this file is executed directly
if (require.main === module) {
  updateToursWithRegions()
    .then(() => {
      console.log('Update completed');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Update failed:', error);
      process.exit(1);
    });
}