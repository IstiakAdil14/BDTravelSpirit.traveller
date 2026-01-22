import { v2 as cloudinary } from 'cloudinary';
import * as dotenv from 'dotenv';
import path from 'path';

// Load .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});

async function testCloudinary() {
    console.log('Testing Cloudinary configuration...');
    console.log('Cloud Name:', process.env.CLOUDINARY_CLOUD_NAME);

    try {
        const result = await cloudinary.api.ping();
        console.log('Ping Result:', result);
        if (result.status === 'ok') {
            console.log('SUCCESS: Cloudinary is correctly configured and reachable.');
        } else {
            console.log('FAILURE: Cloudinary ping returned unexpected status:', result.status);
        }
    } catch (error) {
        console.error('ERROR: Cloudinary connection failed:', error);
    }
}

testCloudinary();
