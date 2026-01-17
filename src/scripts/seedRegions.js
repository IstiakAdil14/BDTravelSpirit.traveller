const mongoose = require('mongoose');

const RegionSchema = new mongoose.Schema({
  name: String,
  image: String,
}, { timestamps: true });

const Region = mongoose.model('Region', RegionSchema);

const regions = [
  { name: "Barishal", image: "/images/division_imgs/barisal.jpg" },
  { name: "Chittagong", image: "/images/division_imgs/chittagong.jpg" },
  { name: "Dhaka", image: "/images/division_imgs/dhaka.jpg" },
  { name: "Khulna", image: "/images/division_imgs/khulna.jpg" },
  { name: "Mymensingh", image: "/images/division_imgs/mymensingh.jpg" },
  { name: "Rajshahi", image: "/images/division_imgs/rajshahi.jpg" },
  { name: "Rangpur", image: "/images/division_imgs/rangpur.jpg" },
  { name: "Sylhet", image: "/images/division_imgs/sylhet.jpg" }
];

async function seedRegions() {
  try {
    await mongoose.connect('mongodb+srv://istiakadil:istiakadil@cluster0.lbx8jdk.mongodb.net/bd-travel-spirit-client?retryWrites=true&w=majority&appName=Cluster0');
    
    await Region.deleteMany({});
    await Region.insertMany(regions);
    
    console.log('Successfully seeded regions!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding regions:', error);
    process.exit(1);
  }
}

seedRegions();