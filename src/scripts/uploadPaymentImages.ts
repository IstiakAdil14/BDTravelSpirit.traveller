import { config } from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';
import path from 'path';

// Load environment variables
config({ path: '.env.local' });

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const paymentImages = [
  { name: 'bkash', path: 'public/images/payments/bkash.png' },
  { name: 'nogod', path: 'public/images/payments/nogod.png' },
  { name: 'rocket', path: 'public/images/payments/rocket.png' },
  { name: 'stripe', path: 'public/images/payments/stripe.png' },
  { name: 'mastercard', path: 'public/images/payments/mastercard.png' },
  { name: 'paypal', path: 'public/images/payments/paypal.png' },
  { name: 'upai', path: 'public/images/payments/upai.png' },
  { name: 'visa', path: 'public/images/payments/visa.png' },
];

async function uploadPaymentImages() {
  try {
    for (const image of paymentImages) {
      const result = await cloudinary.uploader.upload(image.path, {
        folder: 'payments',
        public_id: image.name,
        overwrite: true,
      });
      
      console.log(`✅ Uploaded: ${image.name} -> ${result.secure_url}`);
    }
    
    console.log('🎉 All payment images uploaded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error uploading images:', error);
    process.exit(1);
  }
}

uploadPaymentImages();