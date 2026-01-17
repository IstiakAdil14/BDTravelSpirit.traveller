const mongoose = require('mongoose');

const LocationSchema = new mongoose.Schema({
  name: String,
  region: String,
  image: String,
  duration: String,
  price: Number,
  shortDescription: String,
  rating: Number,
}, { timestamps: true });

const Location = mongoose.model('Location', LocationSchema);

const locations = [
  // Barishal
  { "name": "Kuakata Sea Beach", "region": "barishal", "image": "/images/kuakata.jpg", "duration": "3 Days 2 Nights", "price": 11000, "shortDescription": "Rare beach to see sunrise and sunset", "rating": 4.6 },
  { "name": "Floating Guava Market", "region": "barishal", "image": "/images/guava-market.jpg", "duration": "1 Day", "price": 3000, "shortDescription": "Traditional floating market experience", "rating": 4.5 },
  { "name": "Durga Sagar", "region": "barishal", "image": "/images/durga-sagar.jpg", "duration": "Half Day", "price": 2000, "shortDescription": "Largest man-made pond in Bangladesh", "rating": 4.3 },
  { "name": "Fatrar Char", "region": "barishal", "image": "/images/fatrar-char.jpg", "duration": "2 Days 1 Night", "price": 6500, "shortDescription": "Untouched island near Kuakata", "rating": 4.4 },
  { "name": "Gangamati Reserved Forest", "region": "barishal", "image": "/images/gangamati.jpg", "duration": "1 Day", "price": 2800, "shortDescription": "Mangrove forest and beach walk", "rating": 4.2 },
  { "name": "Char Montaz", "region": "barishal", "image": "/images/char-montaz.jpg", "duration": "2 Days 1 Night", "price": 6000, "shortDescription": "Quiet coastal island escape", "rating": 4.3 },
  { "name": "Oxford Mission Church", "region": "barishal", "image": "/images/oxford-mission.jpg", "duration": "Half Day", "price": 1800, "shortDescription": "Historic church beside river", "rating": 4.2 },
  { "name": "Bibichini Shahi Mosque", "region": "barishal", "image": "/images/bibichini.jpg", "duration": "Half Day", "price": 1500, "shortDescription": "Ancient Mughal-era mosque", "rating": 4.1 },
  { "name": "Sugandha River Cruise", "region": "barishal", "image": "/images/sugandha.jpg", "duration": "1 Day", "price": 3500, "shortDescription": "Relaxing river cruise experience", "rating": 4.4 },
  { "name": "Laldia Coastal Forest", "region": "barishal", "image": "/images/laldia.jpg", "duration": "1 Day", "price": 2500, "shortDescription": "Coastal forest trail and wildlife", "rating": 4.1 },
  
  // Chittagong
  { "name": "Cox's Bazar Sea Beach", "region": "chittagong", "image": "/images/cox.jpg", "duration": "3 Days 2 Nights", "price": 12000, "shortDescription": "World's longest natural sea beach", "rating": 4.8 },
  { "name": "Saint Martin's Island", "region": "chittagong", "image": "/images/saint-martin.jpg", "duration": "3 Days 2 Nights", "price": 15000, "shortDescription": "Only coral island in Bangladesh", "rating": 4.7 },
  { "name": "Sajek Valley", "region": "chittagong", "image": "/images/sajek.jpg", "duration": "3 Days 2 Nights", "price": 10000, "shortDescription": "Queen of hills with clouds", "rating": 4.9 },
  { "name": "Nilgiri Hills", "region": "chittagong", "image": "/images/nilgiri.jpg", "duration": "2 Days 1 Night", "price": 8500, "shortDescription": "Hilltop resort and cloud view", "rating": 4.5 },
  { "name": "Nafakhum Waterfall", "region": "chittagong", "image": "/images/nafakhum.jpg", "duration": "2 Days 1 Night", "price": 9000, "shortDescription": "Largest waterfall in Bangladesh", "rating": 4.6 },
  { "name": "Kaptai Lake", "region": "chittagong", "image": "/images/kaptai.jpg", "duration": "1 Day", "price": 4000, "shortDescription": "Largest man-made lake", "rating": 4.4 },
  { "name": "Patenga Sea Beach", "region": "chittagong", "image": "/images/patenga.jpg", "duration": "Half Day", "price": 2000, "shortDescription": "Popular city sea beach", "rating": 4.2 },
  { "name": "Boga Lake", "region": "chittagong", "image": "/images/boga.jpg", "duration": "2 Days 1 Night", "price": 9500, "shortDescription": "Mystical high-altitude lake", "rating": 4.6 },
  { "name": "Rangamati Hill District", "region": "chittagong", "image": "/images/rangamati.jpg", "duration": "2 Days 1 Night", "price": 7000, "shortDescription": "Hill town with tribal culture", "rating": 4.5 },
  { "name": "Himchari Waterfall", "region": "chittagong", "image": "/images/himchari.jpg", "duration": "Half Day", "price": 1800, "shortDescription": "Waterfall near Cox's Bazar", "rating": 4.3 },
  
  // Dhaka
  { "name": "Ahsan Manzil", "region": "dhaka", "image": "/images/ahsan-manzil.jpg", "duration": "Half Day", "price": 1500, "shortDescription": "Historic pink palace", "rating": 4.3 },
  { "name": "Sonargaon Heritage Park", "region": "dhaka", "image": "/images/sonargaon.jpg", "duration": "1 Day", "price": 2500, "shortDescription": "Ancient capital of Bengal", "rating": 4.4 },
  { "name": "Panam Nagar", "region": "dhaka", "image": "/images/panam-nagar.jpg", "duration": "1 Day", "price": 2800, "shortDescription": "Abandoned historic city", "rating": 4.5 },
  { "name": "National Parliament House", "region": "dhaka", "image": "/images/parliament.jpg", "duration": "Half Day", "price": 2000, "shortDescription": "Architectural masterpiece", "rating": 4.6 },
  { "name": "Bhawal National Park", "region": "dhaka", "image": "/images/bhawal.jpg", "duration": "1 Day", "price": 3000, "shortDescription": "Green forest near Dhaka", "rating": 4.2 },
  { "name": "Lalbagh Fort", "region": "dhaka", "image": "/images/lalbagh.jpg", "duration": "Half Day", "price": 1800, "shortDescription": "Mughal-era fort", "rating": 4.4 },
  { "name": "Hatirjheel Lake", "region": "dhaka", "image": "/images/hatirjheel.jpg", "duration": "Half Day", "price": 1200, "shortDescription": "Urban lake and night view", "rating": 4.3 },
  { "name": "Ramna Park", "region": "dhaka", "image": "/images/ramna.jpg", "duration": "Half Day", "price": 1000, "shortDescription": "Green park in city center", "rating": 4.2 },
  { "name": "Bangabandhu Memorial Museum", "region": "dhaka", "image": "/images/bangabandhu.jpg", "duration": "Half Day", "price": 1500, "shortDescription": "Historic national museum", "rating": 4.5 },
  { "name": "Keraniganj River Tour", "region": "dhaka", "image": "/images/keraniganj.jpg", "duration": "1 Day", "price": 3200, "shortDescription": "Riverside village experience", "rating": 4.1 },
  
  // Khulna
  { "name": "Sundarbans Mangrove Forest", "region": "khulna", "image": "/images/sundarbans.jpg", "duration": "3 Days 2 Nights", "price": 18000, "shortDescription": "Largest mangrove forest", "rating": 4.9 },
  { "name": "Katka Beach", "region": "khulna", "image": "/images/katka.jpg", "duration": "2 Days 1 Night", "price": 9000, "shortDescription": "Wild beach inside Sundarbans", "rating": 4.6 },
  { "name": "Hiran Point", "region": "khulna", "image": "/images/hiran-point.jpg", "duration": "2 Days 1 Night", "price": 8500, "shortDescription": "Wildlife observation zone", "rating": 4.5 },
  { "name": "Sixty Dome Mosque", "region": "khulna", "image": "/images/sixty-dome.jpg", "duration": "Half Day", "price": 2000, "shortDescription": "UNESCO World Heritage mosque", "rating": 4.7 },
  { "name": "Khan Jahan Ali Tomb", "region": "khulna", "image": "/images/khan-jahan.jpg", "duration": "Half Day", "price": 1500, "shortDescription": "Historic saint shrine", "rating": 4.4 },
  { "name": "Rupsha River Cruise", "region": "khulna", "image": "/images/rupsha.jpg", "duration": "1 Day", "price": 3500, "shortDescription": "River cruise experience", "rating": 4.3 },
  { "name": "Mongla Port Area", "region": "khulna", "image": "/images/mongla.jpg", "duration": "Half Day", "price": 1800, "shortDescription": "Second largest seaport", "rating": 4.1 },
  { "name": "Dublar Char", "region": "khulna", "image": "/images/dublar-char.jpg", "duration": "2 Days 1 Night", "price": 10000, "shortDescription": "Fishing island in Sundarbans", "rating": 4.6 },
  { "name": "Bagerhat Museum", "region": "khulna", "image": "/images/bagerhat.jpg", "duration": "Half Day", "price": 1500, "shortDescription": "History of Bagerhat region", "rating": 4.2 },
  { "name": "Pasur River Wildlife Zone", "region": "khulna", "image": "/images/pasur.jpg", "duration": "1 Day", "price": 5000, "shortDescription": "River wildlife safari", "rating": 4.4 },
  
  // Mymensingh
  { "name": "Madhutila Eco Park", "region": "mymensingh", "image": "/images/madhutila.jpg", "duration": "1 Day", "price": 2500, "shortDescription": "Eco park with hills and lakes", "rating": 4.4 },
  { "name": "Birishiri", "region": "mymensingh", "image": "/images/birishiri.jpg", "duration": "2 Days 1 Night", "price": 7000, "shortDescription": "Ceramic hills and river view", "rating": 4.6 },
  { "name": "Durgapur China Clay Hills", "region": "mymensingh", "image": "/images/china-clay.jpg", "duration": "1 Day", "price": 3500, "shortDescription": "White clay hills landscape", "rating": 4.5 },
  { "name": "Shomeshwari River", "region": "mymensingh", "image": "/images/shomeshwari.jpg", "duration": "1 Day", "price": 3000, "shortDescription": "Clear river with border view", "rating": 4.4 },
  { "name": "Hajong Tribal Village", "region": "mymensingh", "image": "/images/hajong.jpg", "duration": "1 Day", "price": 2800, "shortDescription": "Indigenous culture experience", "rating": 4.3 },
  { "name": "Bangladesh Agricultural University Campus", "region": "mymensingh", "image": "/images/bau.jpg", "duration": "Half Day", "price": 1200, "shortDescription": "Largest agricultural university", "rating": 4.2 },
  { "name": "Muktagacha Zamindar Bari", "region": "mymensingh", "image": "/images/muktagacha.jpg", "duration": "Half Day", "price": 2000, "shortDescription": "Historic zamindar palace", "rating": 4.3 },
  { "name": "Kangsa River", "region": "mymensingh", "image": "/images/kangsa.jpg", "duration": "1 Day", "price": 2800, "shortDescription": "River and countryside scenery", "rating": 4.1 },
  { "name": "Garo Hills", "region": "mymensingh", "image": "/images/garo.jpg", "duration": "2 Days 1 Night", "price": 7500, "shortDescription": "Hilly forest and tribal life", "rating": 4.6 },
  { "name": "Susang Durgapur Museum", "region": "mymensingh", "image": "/images/susang.jpg", "duration": "Half Day", "price": 1500, "shortDescription": "Local history museum", "rating": 4.2 },
  
  // Rajshahi
  { "name": "Mahasthangarh", "region": "rajshahi", "image": "/images/mahasthangarh.jpg", "duration": "1 Day", "price": 4000, "shortDescription": "Oldest archaeological site", "rating": 4.6 },
  { "name": "Paharpur Buddhist Vihara", "region": "rajshahi", "image": "/images/paharpur.jpg", "duration": "1 Day", "price": 4500, "shortDescription": "UNESCO heritage monastery", "rating": 4.7 },
  { "name": "Kantaji Temple", "region": "rajshahi", "image": "/images/kantaji.jpg", "duration": "1 Day", "price": 3000, "shortDescription": "Terracotta Hindu temple", "rating": 4.6 },
  { "name": "Varendra Museum", "region": "rajshahi", "image": "/images/varendra.jpg", "duration": "Half Day", "price": 2000, "shortDescription": "Largest museum in north Bengal", "rating": 4.3 },
  { "name": "Padma River Bank", "region": "rajshahi", "image": "/images/padma.jpg", "duration": "Half Day", "price": 1500, "shortDescription": "Scenic river sunset view", "rating": 4.4 },
  { "name": "Bagha Mosque", "region": "rajshahi", "image": "/images/bagha.jpg", "duration": "Half Day", "price": 1800, "shortDescription": "Historic terracotta mosque", "rating": 4.5 },
  { "name": "Chalan Beel", "region": "rajshahi", "image": "/images/chalan-beel.jpg", "duration": "1 Day", "price": 3500, "shortDescription": "Largest wetland in Bangladesh", "rating": 4.4 },
  { "name": "Somapura Museum", "region": "rajshahi", "image": "/images/somapura.jpg", "duration": "Half Day", "price": 2000, "shortDescription": "Artifacts of Buddhist era", "rating": 4.3 },
  { "name": "Naogaon Rural Life Tour", "region": "rajshahi", "image": "/images/naogaon.jpg", "duration": "1 Day", "price": 2800, "shortDescription": "Village and culture tour", "rating": 4.2 },
  { "name": "Rajshahi Silk Factory Visit", "region": "rajshahi", "image": "/images/silk.jpg", "duration": "Half Day", "price": 1500, "shortDescription": "Famous silk industry tour", "rating": 4.1 },
  
  // Rangpur
  { "name": "Tajhat Palace", "region": "rangpur", "image": "/images/tajhat.jpg", "duration": "Half Day", "price": 2000, "shortDescription": "Historic zamindar palace", "rating": 4.5 },
  { "name": "Kantajew Temple Area", "region": "rangpur", "image": "/images/kantajew.jpg", "duration": "1 Day", "price": 3000, "shortDescription": "Terracotta temple region", "rating": 4.6 },
  { "name": "Teesta Barrage", "region": "rangpur", "image": "/images/teesta.jpg", "duration": "Half Day", "price": 1800, "shortDescription": "River barrage and sunset", "rating": 4.4 },
  { "name": "Chilmari River Port", "region": "rangpur", "image": "/images/chilmari.jpg", "duration": "1 Day", "price": 2800, "shortDescription": "River port town experience", "rating": 4.2 },
  { "name": "Vinno Jagat Theme Park", "region": "rangpur", "image": "/images/vinno-jagat.jpg", "duration": "1 Day", "price": 2500, "shortDescription": "Family-friendly theme park", "rating": 4.3 },
  { "name": "Begum Rokeya Memorial", "region": "rangpur", "image": "/images/rokeya.jpg", "duration": "Half Day", "price": 1500, "shortDescription": "Birthplace of Begum Rokeya", "rating": 4.4 },
  { "name": "Nilphamari Countryside Tour", "region": "rangpur", "image": "/images/nilphamari.jpg", "duration": "1 Day", "price": 2200, "shortDescription": "Rural life and fields", "rating": 4.1 },
  { "name": "Uttara Export Processing Zone", "region": "rangpur", "image": "/images/uttara-epz.jpg", "duration": "Half Day", "price": 2000, "shortDescription": "Industrial development area", "rating": 4.0 },
  { "name": "Dinamajpur Rajbari", "region": "rangpur", "image": "/images/dinajpur.jpg", "duration": "Half Day", "price": 2200, "shortDescription": "Historic palace ruins", "rating": 4.3 },
  { "name": "Birganj Eco Village", "region": "rangpur", "image": "/images/birganj.jpg", "duration": "1 Day", "price": 2600, "shortDescription": "Eco village tourism", "rating": 4.2 },
  
  // Sylhet
  { "name": "Ratargul Swamp Forest", "region": "sylhet", "image": "/images/ratargul.jpg", "duration": "2 Days 1 Night", "price": 7000, "shortDescription": "Only swamp forest in Bangladesh", "rating": 4.7 },
  { "name": "Jaflong", "region": "sylhet", "image": "/images/jaflong.jpg", "duration": "1 Day", "price": 3500, "shortDescription": "Tea gardens and river stones", "rating": 4.4 },
  { "name": "Bichanakandi", "region": "sylhet", "image": "/images/bichanakandi.jpg", "duration": "1 Day", "price": 4000, "shortDescription": "Crystal river and hills", "rating": 4.6 },
  { "name": "Lawachara National Park", "region": "sylhet", "image": "/images/lawachara.jpg", "duration": "1 Day", "price": 3000, "shortDescription": "Rainforest and wildlife", "rating": 4.3 },
  { "name": "Madhabkunda Waterfall", "region": "sylhet", "image": "/images/madhabkunda.jpg", "duration": "1 Day", "price": 4500, "shortDescription": "Largest waterfall in Sylhet", "rating": 4.5 },
  { "name": "Srimangal Tea Gardens", "region": "sylhet", "image": "/images/srimangal.jpg", "duration": "2 Days 1 Night", "price": 6000, "shortDescription": "Tea capital of Bangladesh", "rating": 4.6 },
  { "name": "Ham Ham Waterfall", "region": "sylhet", "image": "/images/hamham.jpg", "duration": "2 Days 1 Night", "price": 7500, "shortDescription": "Hidden jungle waterfall", "rating": 4.7 },
  { "name": "Malnichera Tea Estate", "region": "sylhet", "image": "/images/malnichera.jpg", "duration": "Half Day", "price": 2000, "shortDescription": "Oldest tea garden", "rating": 4.4 },
  { "name": "Shahjalal Mazar", "region": "sylhet", "image": "/images/shahjalal.jpg", "duration": "Half Day", "price": 1500, "shortDescription": "Famous spiritual site", "rating": 4.5 },
  { "name": "Tilagor Eco Park", "region": "sylhet", "image": "/images/tilagor.jpg", "duration": "1 Day", "price": 2500, "shortDescription": "Eco park and hills", "rating": 4.2 }
];

async function seedLocations() {
  try {
    await mongoose.connect('mongodb+srv://istiakadil:istiakadil@cluster0.lbx8jdk.mongodb.net/bd-travel-spirit-client?retryWrites=true&w=majority&appName=Cluster0');
    
    await Location.deleteMany({});
    await Location.insertMany(locations);
    
    console.log('Successfully seeded locations!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding locations:', error);
    process.exit(1);
  }
}

seedLocations();