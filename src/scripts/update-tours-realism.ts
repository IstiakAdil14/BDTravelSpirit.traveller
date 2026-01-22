
import mongoose from "mongoose";
import path from "path";
import fs from "fs";
import { TourModel } from "../models/tour.model";

// Load .env.local manually
const envPath = path.resolve(process.cwd(), ".env.local");
if (fs.existsSync(envPath)) {
    const envConfig = fs.readFileSync(envPath, "utf8");
    envConfig.split("\n").forEach((line) => {
        const trimmedLine = line.trim();
        if (!trimmedLine || trimmedLine.startsWith("#")) return;
        const firstEq = trimmedLine.indexOf("=");
        if (firstEq !== -1) {
            const key = trimmedLine.substring(0, firstEq).trim();
            const value = trimmedLine.substring(firstEq + 1).trim().replace(/^"(.*)"$/, '$1').replace(/^'(.*)'$/, '$1');
            if (key && !process.env[key]) process.env[key] = value;
        }
    });
}

const DIVISION_DATA: any = {
    barishal: {
        highlights: ["Floating Markets", "Mangrove Forests", "Sunrise & Sunset", "Riverside Life"],
        attractions: [
            { title: "Floating Guava Market", description: "A unique traditional market on boats in Bhimruli." },
            { title: "Kuakata Sea Beach", description: "The only beach in Bangladesh where you can see both sunrise and sunset." },
            { title: "Guthia Mosque", description: "Beautiful Islamic architecture with 20 domes and 14 minarets." }
        ],
        activities: [
            { title: "Boat Cruising", description: "Explore the narrow canals of the floating markets." },
            { title: "Beach Trekking", description: "Walk along the serene sandy beaches of Kuakata." }
        ],
        tags: ["riverside", "market", "beach", "spiritual"]
    },
    chittagong: {
        highlights: ["Hilly Terrains", "Longest Sea Beach", "Tribal Culture", "Deep Sea Islands"],
        attractions: [
            { title: "Patenga Beach", description: "Popular coastal spot near Chittagong city." },
            { title: "Sajek Valley", description: "The roof of Rangamati, surrounded by mountains and clouds." },
            { title: "Saint Martin Island", description: "The only coral island in Bangladesh." }
        ],
        activities: [
            { title: "Hiking", description: "Trek up the lush green hills of Bandarban." },
            { title: "Snorkeling", description: "Explore marine life in the clear waters of Saint Martin." }
        ],
        tags: ["mountain", "beach", "adventure", "coral"]
    },
    dhaka: {
        highlights: ["Mughal Architecture", "Urban Heritage", "Museums", "Cultural Hub"],
        attractions: [
            { title: "Lalbagh Fort", description: "A 17th-century Mughal fortress complex." },
            { title: "Ahsan Manzil", description: "The Pink Palace and residential head of the Nawab of Dhaka." },
            { title: "National Parliament House", description: "A masterpiece of modern architecture by Louis Kahn." }
        ],
        activities: [
            { title: "Heritage Walk", description: "Explore the narrow lanes of Old Dhaka." },
            { title: "Museum Tour", description: "Visit the Bangladesh National Museum for historical artifacts." }
        ],
        tags: ["history", "mughal", "metropolis", "museum"]
    },
    khulna: {
        highlights: ["Sundarbans", "Mangrove Wildlife", "Heritage Mosques", "Eco-Tourism"],
        attractions: [
            { title: "Sundarbans National Park", description: "Largest mangrove forest in the world and home to the Royal Bengal Tiger." },
            { title: "Sixty Dome Mosque", description: "A UNESCO World Heritage site in Bagerhat." },
            { title: "Karamjal", description: "An eco-tourism center at the gate of Sundarbans." }
        ],
        activities: [
            { title: "Wildlife Safari", description: "Cruise through the mangrove creeks to spot tigers and deer." },
            { title: "Forest Trekking", description: "Walk through the wooden trails of Harbaria." }
        ],
        tags: ["wildlife", "mangrove", "tiger", "unesco"]
    },
    sylhet: {
        highlights: ["Tea Gardens", "Waterfalls", "Swamp Forests", "Stone Collection"],
        attractions: [
            { title: "Malnicherra Tea Estate", description: "The oldest tea garden in the subcontinent." },
            { title: "Ratargul Swamp Forest", description: "The only freshwater swamp forest in Bangladesh." },
            { title: "Jaflong", description: "Natural beauty with hills and stone-collecting rivers." }
        ],
        activities: [
            { title: "Swamp Boat Ride", description: "Navigate through the submerged trees in Ratargul." },
            { title: "Tea Tasting", description: "Enjoy fresh tea in the lush green gardens of Sreemangal." }
        ],
        tags: ["nature", "tea", "rain", "scenery"]
    },
    rajshahi: {
        highlights: ["Silk Industry", "Mango Gardens", "Buddhist Temples", "River Vistas"],
        attractions: [
            { title: "Somapura Mahavihara", description: "One of the most important archaeological sites in the subcontinent." },
            { title: "Varendra Research Museum", description: "Oldest museum in Bangladesh with rare sculptures." },
            { title: "Puthia Temple Complex", description: "Cluster of historic Hindu temples in terracotta style." }
        ],
        activities: [
            { title: "Archaeological Tour", description: "Visit the ancient Buddhist ruins in Paharpur." },
            { title: "River Cruise", description: "Enjoy the sunset on the Padma River." }
        ],
        tags: ["history", "buddhist", "silk", "terracotta"]
    },
    rangpur: {
        highlights: ["Palaces", "Rural Beauty", "Handicrafts", "Historic Sites"],
        attractions: [
            { title: "Tajhat Palace", description: "A grand palace built by a Hindu merchant in the early 20th century." },
            { title: "Kantajew Temple", description: "A stunning terracotta temple in Dinajpur." },
            { title: "Ramsagar", description: "The largest man-made lake in Bangladesh." }
        ],
        activities: [
            { title: "Palace Tour", description: "Explore the architectural beauty of North Bengal palaces." },
            { title: "Cultural Engagement", description: "Visit local Satranji (hand-woven carpet) factories." }
        ],
        tags: ["heritage", "palace", "rural", "terracotta"]
    },
    mymensingh: {
        highlights: ["Agricultural Heritage", "Riverside Scenery", "Historic Zamindar Estates", "Botanical Gardens"],
        attractions: [
            { title: "Shashi Lodge", description: "A beautiful colonial palace of the Mymensingh Maharajas." },
            { title: "Birishiri", description: "Known for the China Clay Hills and Shomeshwari River." },
            { title: "Bangladesh Agricultural University", description: "Sprawling green campus with botanical research." }
        ],
        activities: [
            { title: "River Floating", description: "Cruise on the Brahmaputra River at sunset." },
            { title: "Nature Walk", description: "Explore the clay hills and blue waters of Birishiri." }
        ],
        tags: ["river", "greenery", "colonial", "hills"]
    }
};

async function updateTours() {
    const uri = process.env.MONGODB_URI;
    await mongoose.connect(uri!);
    console.log("Connected for realism update.");

    const tours = await TourModel.find({});
    console.log(`Updating ${tours.length} tours...`);

    for (const tour of tours) {
        const region = tour.mainLocation?.address?.region?.toLowerCase() || 'dhaka';
        const data = DIVISION_DATA[region] || DIVISION_DATA.dhaka;

        // Enrich destinations
        if (tour.destinations && tour.destinations.length > 0) {
            tour.destinations[0].highlights = data.highlights;
            tour.destinations[0].attractions = data.attractions.map((a: any) => ({
                ...a,
                description: a.description + " A must-visit spot in this region."
            }));
            tour.destinations[0].activities = data.activities.map((a: any) => ({
                ...a,
                duration: "3-4 hours",
                rating: 4.8
            }));
            tour.destinations[0].description = `Discover the best of ${region.toUpperCase()}. This area is famous for its ${data.highlights.join(", ")}.`;
        }

        // Enrich basic info
        tour.tags = Array.from(new Set([...(tour.tags || []), ...data.tags]));
        tour.viewCount = Math.floor(Math.random() * 5000) + 1000;
        tour.likeCount = Math.floor(tour.viewCount * 0.1);
        tour.shareCount = Math.floor(tour.likeCount * 0.2);
        tour.wordCount = Math.floor(Math.random() * 1000) + 500;
        tour.readingTime = Math.ceil(tour.wordCount / 200);

        // Pickup options
        tour.pickupOptions = [{ city: "Dhaka", price: 0, currency: "BDT" }, { city: tour.mainLocation.address.city, price: 500, currency: "BDT" }];

        // Inclusions/Exclusions
        tour.inclusions = [
            ...(tour.inclusions || []),
            { label: "Wi-Fi", description: "Free high-speed internet in hotels." },
            { label: "Bottled Water", description: "Unlimited access to safe drinking water." }
        ];
        tour.exclusions = [
            ...(tour.exclusions || []),
            { label: "Insurance", description: "Travel insurance is not included." },
            { label: "Alcohol", description: "Any alcoholic beverages are excluded." }
        ];

        // Accessibility notes
        tour.accessibility = {
            ...tour.accessibility,
            notes: "Please inform us in advance if you require special assistance. Most sites are family-friendly."
        };

        tour.markModified('destinations');
        tour.markModified('pickupOptions');
        tour.markModified('inclusions');
        tour.markModified('exclusions');
        tour.markModified('accessibility');

        await tour.save();
        console.log(`Updated realism for: ${tour.title}`);
    }

    console.log("Realism update complete!");
    await mongoose.disconnect();
}

updateTours();
