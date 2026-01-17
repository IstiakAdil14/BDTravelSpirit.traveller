import mongoose, { Types } from 'mongoose';

const MONGODB_URI = 'mongodb+srv://istiakadil:istiakadil@cluster0.lbx8jdk.mongodb.net/bd-travel-spirit-client?retryWrites=true&w=majority&appName=Cluster0';

// Tour Schema (simplified for seeding)
const TourSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  status: { type: String, default: 'published' },
  summary: { type: String, required: true },
  destinations: [{
    city: String,
    district: String,
    country: String,
    region: String,
    description: String
  }],
  basePrice: {
    amount: { type: Number, required: true },
    currency: { type: String, required: true }
  },
  duration: {
    days: Number,
    nights: Number
  },
  authorId: { type: mongoose.Schema.Types.ObjectId, required: true },
  publishedAt: Date
}, { timestamps: true });

const TourModel = mongoose.models.Tour || mongoose.model('Tour', TourSchema);

const sampleTours = [
  {
    title: "Cox's Bazar Beach Adventure",
    slug: "coxs-bazar-beach-adventure",
    status: "published",
    summary: "Experience the world's longest natural sea beach with pristine sands and crystal-clear waters.",
    destinations: [{
      city: "Cox's Bazar",
      district: "Cox's Bazar",
      country: "Bangladesh",
      region: "chittagong",
      description: "World's longest natural sea beach"
    }],
    basePrice: { amount: 5000, currency: "BDT" },
    duration: { days: 3, nights: 2 },
    authorId: new Types.ObjectId(),
    publishedAt: new Date()
  },
  {
    title: "Sundarbans Wildlife Safari",
    slug: "sundarbans-wildlife-safari",
    status: "published",
    summary: "Explore the largest mangrove forest and spot the Royal Bengal Tiger.",
    destinations: [{
      city: "Khulna",
      district: "Khulna",
      country: "Bangladesh",
      region: "khulna",
      description: "Gateway to Sundarbans mangrove forest"
    }],
    basePrice: { amount: 8000, currency: "BDT" },
    duration: { days: 4, nights: 3 },
    authorId: new Types.ObjectId(),
    publishedAt: new Date()
  },
  {
    title: "Sylhet Tea Garden Tour",
    slug: "sylhet-tea-garden-tour",
    status: "published",
    summary: "Wander through lush green tea plantations in Bangladesh's hill tracts.",
    destinations: [{
      city: "Sylhet",
      district: "Sylhet",
      country: "Bangladesh",
      region: "sylhet",
      description: "Beautiful tea gardens and hills"
    }],
    basePrice: { amount: 4500, currency: "BDT" },
    duration: { days: 2, nights: 1 },
    authorId: new Types.ObjectId(),
    publishedAt: new Date()
  },
  {
    title: "Old Dhaka Heritage Walk",
    slug: "old-dhaka-heritage-walk",
    status: "published",
    summary: "Explore historic mosques, temples, and colonial architecture of Dhaka.",
    destinations: [{
      city: "Dhaka",
      district: "Dhaka",
      country: "Bangladesh",
      region: "dhaka",
      description: "Historic capital city with rich heritage"
    }],
    basePrice: { amount: 2000, currency: "BDT" },
    duration: { days: 1, nights: 0 },
    authorId: new Types.ObjectId(),
    publishedAt: new Date()
  },
  {
    title: "Bandarban Hill Trek",
    slug: "bandarban-hill-trek",
    status: "published",
    summary: "Trek through misty mountains and experience indigenous culture.",
    destinations: [{
      city: "Bandarban",
      district: "Bandarban",
      country: "Bangladesh",
      region: "chittagong",
      description: "Mountainous region with tribal culture"
    }],
    basePrice: { amount: 6000, currency: "BDT" },
    duration: { days: 3, nights: 2 },
    authorId: new Types.ObjectId(),
    publishedAt: new Date()
  },
  {
    title: "Rangpur Cultural Experience",
    slug: "rangpur-cultural-experience",
    status: "published",
    summary: "Discover the rich cultural heritage of northern Bangladesh.",
    destinations: [{
      city: "Rangpur",
      district: "Rangpur",
      country: "Bangladesh",
      region: "rangpur",
      description: "Cultural hub of northern Bangladesh"
    }],
    basePrice: { amount: 3500, currency: "BDT" },
    duration: { days: 2, nights: 1 },
    authorId: new Types.ObjectId(),
    publishedAt: new Date()
  }
];

async function seedTours() {
  try {
    await mongoose.connect(MONGODB_URI);
    
    console.log('Seeding tours...');
    
    // Clear existing tours
    await TourModel.deleteMany({});
    
    // Insert sample tours
    const result = await TourModel.insertMany(sampleTours);
    
    console.log(`Successfully seeded ${result.length} tours`);
    await mongoose.disconnect();
    process.exit(0);
    
  } catch (error) {
    console.error('Error seeding tours:', error);
    process.exit(1);
  }
}

seedTours();