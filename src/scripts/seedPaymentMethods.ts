import { getDbClient } from '../lib/db';

const paymentMethods = [
  { 
    name: 'bkash', 
    alt: 'bKash', 
    cloudinaryUrl: 'https://res.cloudinary.com/ddoeqihvb/image/upload/v1/payments/bkash.png',
    order: 0 
  },
  { 
    name: 'nogod', 
    alt: 'Nagad', 
    cloudinaryUrl: 'https://res.cloudinary.com/ddoeqihvb/image/upload/v1/payments/nogod.png',
    order: 1 
  },
  { 
    name: 'rocket', 
    alt: 'Rocket', 
    cloudinaryUrl: 'https://res.cloudinary.com/ddoeqihvb/image/upload/v1/payments/rocket.png',
    order: 2 
  },
  { 
    name: 'stripe', 
    alt: 'Stripe', 
    cloudinaryUrl: 'https://res.cloudinary.com/ddoeqihvb/image/upload/v1/payments/stripe.png',
    order: 3 
  },
  { 
    name: 'mastercard', 
    alt: 'Mastercard', 
    cloudinaryUrl: 'https://res.cloudinary.com/ddoeqihvb/image/upload/v1/payments/mastercard.png',
    order: 4 
  },
  { 
    name: 'paypal', 
    alt: 'PayPal', 
    cloudinaryUrl: 'https://res.cloudinary.com/ddoeqihvb/image/upload/v1/payments/paypal.png',
    order: 5 
  },
  { 
    name: 'upai', 
    alt: 'Upay', 
    cloudinaryUrl: 'https://res.cloudinary.com/ddoeqihvb/image/upload/v1/payments/upai.png',
    order: 6 
  },
  { 
    name: 'visa', 
    alt: 'Visa', 
    cloudinaryUrl: 'https://res.cloudinary.com/ddoeqihvb/image/upload/v1/payments/visa.png',
    order: 7 
  },
];

async function seedPaymentMethods() {
  try {
    const client = await getDbClient();
    const db = client.db('bdtravelspirit');
    
    for (const method of paymentMethods) {
      await db.collection('paymentmethods').updateOne(
        { name: method.name },
        {
          $set: {
            name: method.name,
            alt: method.alt,
            cloudinaryUrl: method.cloudinaryUrl,
            isActive: true,
            order: method.order,
            updatedAt: new Date(),
          },
          $setOnInsert: {
            createdAt: new Date(),
          },
        },
        { upsert: true }
      );
      
      console.log(`✅ Saved: ${method.name}`);
    }
    
    console.log('🎉 All payment methods seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding payment methods:', error);
    process.exit(1);
  }
}

seedPaymentMethods();