import { dbConnect } from '@/lib/db/connect';
import TourLocation from '@/models/tourLocation.model';
import { ourTourLocations } from '@/constants/ourTourLocations';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

async function seedTourLocations() {
  try {
    await dbConnect();

    console.log('Seeding tour locations...');

    // Clear existing data
    await TourLocation.deleteMany({});

    // Insert new data
    const result = await TourLocation.insertMany(ourTourLocations);

    console.log(`Successfully seeded ${result.length} tour locations`);
    process.exit(0);

  } catch (error) {
    console.error('Error seeding tour locations:', error);
    process.exit(1);
  }
}

seedTourLocations();