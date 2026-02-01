
import mongoose from "mongoose";
import { faker } from "@faker-js/faker";
import fs from "fs";
import path from "path";

// Import Models (using relative paths to avoid alias issues in script)
import { TourModel } from "../models/tour.model";
import { GuideModel } from "../models/guide.model";
import { AssetModel } from "../models/asset.model";
import { UserModel } from "../models/user.model";
import { ReviewModel } from "../models/review.model";
import { TourFAQModel } from "../models/tourFAQ.model";
import Region from "../models/region.model";
import Location from "../models/location.model";

// Import Enums
import { TOUR_STATUS, AUDIENCE_TYPE, CONTENT_CATEGORY, DIFFICULTY_LEVEL, PAYMENT_METHOD, TRANSPORT_MODE, CURRENCY, SEASON } from "../constants/tour.const";
import { GUIDE_STATUS, GUIDE_SOCIAL_PLATFORM } from "../constants/guide.const";
import { ASSET_TYPE, STORAGE_PROVIDER, VISIBILITY, MODERATION_STATUS } from "../constants/asset.const";
import { USER_ROLE, ACCOUNT_STATUS } from "../constants/user.const";

// Import Static Data
import { ourTourLocations } from "../constants/ourTourLocations";

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
            if (key && !process.env[key]) {
                process.env[key] = value;
            }
        }
    });
}

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error("Please define the MONGODB_URI environment variable inside .env.local");
    process.exit(1);
}

// Deterministic seed
const SEED = 12345;
faker.seed(SEED);

// Helper for random items
const random = <T>(arr: T[]): T => arr[faker.number.int({ min: 0, max: arr.length - 1 })];
const randomSubset = <T>(arr: T[], max = 3): T[] => faker.helpers.arrayElements(arr, faker.number.int({ min: 1, max }));

async function createAsset(adminId: mongoose.Types.ObjectId, title: string, keyword: string) {
    const id = faker.string.uuid();
    // Using picsum as placeholder because publicUrl validation requires https
    const url = `https://picsum.photos/seed/${encodeURIComponent(keyword || id)}/1200/800`;

    return await AssetModel.create({
        storageProvider: STORAGE_PROVIDER.CLOUDINARY,
        objectKey: `mock/${id}`,
        publicUrl: url,
        contentType: "image/jpeg",
        fileSize: 1024 * 1024,
        checksum: faker.string.hexadecimal({ length: 64 }),
        assetType: ASSET_TYPE.IMAGE,
        uploadedBy: adminId,
        visibility: VISIBILITY.PUBLIC,
        moderationStatus: MODERATION_STATUS.APPROVED,
        title: title,
    });
}

async function seed() {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI!);
    console.log("Connected.");

    console.log("Clearing existing data (except TourOperators)...");
    await TourModel.deleteMany({});
    await GuideModel.deleteMany({});
    await AssetModel.deleteMany({});
    await UserModel.deleteMany({});
    await ReviewModel.deleteMany({});
    await TourFAQModel.deleteMany({});
    await Region.deleteMany({});
    await Location.deleteMany({});

    console.log("Seeding Regions...");
    const regions = ['Barishal', 'Chittagong', 'Dhaka', 'Khulna', 'Mymensingh', 'Rajshahi', 'Rangpur', 'Sylhet'];
    for (const regionName of regions) {
        await Region.create({
            name: regionName,
            image: `https://picsum.photos/seed/${regionName.toLowerCase()}/1200/600`
        });
    }

    console.log("Seeding Users...");
    const admin = await UserModel.create({
        name: "Admin User",
        email: "admin@example.com",
        role: USER_ROLE.ADMIN,
        accountStatus: ACCOUNT_STATUS.ACTIVE,
        isVerified: true,
        password: "password123", // In real app, hash this
    });

    const users: any[] = [];
    for (let i = 0; i < 10; i++) {
        const user = await UserModel.create({
            name: faker.person.fullName(),
            email: faker.internet.email().toLowerCase(),
            role: USER_ROLE.TRAVELER,
            accountStatus: ACCOUNT_STATUS.ACTIVE,
            isVerified: true,
            password: "password123", // Added password
        });
        users.push(user);
    }
    console.log(`Created ${users.length + 1} users.`);

    console.log("Seeding Guides...");
    const guides: any[] = [];
    for (let i = 0; i < 5; i++) {
        const guide = await GuideModel.create({
            companyName: faker.company.name(),
            bio: faker.lorem.paragraph(),
            social: [
                { platform: GUIDE_SOCIAL_PLATFORM.FACEBOOK, url: `https://facebook.com/${faker.lorem.slug()}` }
            ],
            owner: {
                name: faker.person.fullName(),
                email: faker.internet.email().toLowerCase(),
                phone: "+88017" + faker.string.numeric(8),
                password: "password123", // Added password
            },
            status: GUIDE_STATUS.APPROVED,
            documents: [],
        });
        guides.push(guide);
    }
    console.log(`Created ${guides.length} guides.`);

    const mapAudience = (a: string) => {
        const val = a.toLowerCase();
        return Object.values(AUDIENCE_TYPE).includes(val as any) ? val : AUDIENCE_TYPE.FAMILIES;
    };

    const mapCategory = (c: string) => {
        const val = c.toLowerCase().replace(/\s+/g, '_');
        return Object.values(CONTENT_CATEGORY).includes(val as any) ? val : CONTENT_CATEGORY.NATURE;
    };

    const mapTransport = (t: string) => {
        const val = t.toLowerCase().replace(/\s+/g, '_');
        return Object.values(TRANSPORT_MODE).includes(val as any) ? val : TRANSPORT_MODE.BUS;
    };

    const mapSeason = (s: string) => {
        const val = s.toLowerCase();
        return Object.values(SEASON).includes(val as any) ? val : SEASON.YEAR_ROUND;
    };

    const mapDifficulty = (d: string) => {
        const val = d.toLowerCase();
        return Object.values(DIFFICULTY_LEVEL).includes(val as any) ? val : DIFFICULTY_LEVEL.EASY;
    };

    const mapPayment = (p: string) => {
        const val = p.toLowerCase();
        return Object.values(PAYMENT_METHOD).includes(val as any) ? val : PAYMENT_METHOD.CASH;
    };

    const RAW_TOURS = [
        {
            title: "Kuakata Sea Beach Escape",
            slug: "kuakata-sea-beach-barishal",
            status: "published",
            summary: "Enjoy sunrise and sunset at Bangladesh’s iconic sea beach.",
            heroImage: "kuakata_hero",
            isFeatured: true,
            gallery: ["k1.jpg", "k2.jpg"],
            videos: ["k.mp4"],
            destinations: [{ city: "Kuakata", country: "Bangladesh" }],
            highlights: ["Sunrise", "Sunset", "Sea View"],
            images: ["img1"],
            content: ["Kuakata is unique for its panoramic sea views."],
            attractions: ["Gangamati Forest"],
            activities: ["Beach Walk", "Photography"],
            bestSeason: ["Winter"],
            audience: ["Families", "Couples"],
            categories: ["beaches"],
            mainLocation: { address: { city: "Kuakata", region: "barishal", country: "Bangladesh" } },
            transportModes: ["bus", "boat"],
            basePrice: { amount: 8500, currency: "BDT" },
            duration: { days: 3 },
            paymentMethods: ["cash", "bkash"],
            licenseRequired: false,
            accessibility: { wheelchair: false, familyFriendly: true, petFriendly: false },
            cancellationPolicy: { refundable: true },
            rules: ["No littering"],
            refundPolicy: { method: ["bkash"] },
            ratings: { average: 4.7, count: 410 },
            wishlistCount: 120,
            popularityScore: 88,
            featured: true,
            authorId: admin._id,
            tags: ["sea", "barishal"],
            publishedAt: new Date(),
            readingTime: 3,
            wordCount: 420,
            allowComments: true,
            viewCount: 1200,
            likeCount: 340,
            shareCount: 80,
            itinerary: [
                { dayNumber: 1, title: "Arrival", description: "Arrive at Kuakata and check into hotel." },
                { dayNumber: 2, title: "Beach Day", description: "Enjoy the sea beach, sunrise and sunset." },
                { dayNumber: 3, title: "Return", description: "Souvenir shopping and departure." }
            ],
            inclusions: [{ label: "Hotel", description: "3-star accommodation" }, { label: "Breakfast", description: "Complimentary breakfast" }],
            exclusions: [{ label: "Personal cost", description: "Personal expenses and tips" }],
        },
        {
            title: "Durga Sagar Tour",
            slug: "durga-sagar-barishal",
            status: "published",
            summary: "Largest man-made pond in Bangladesh.",
            heroImage: "durga",
            isFeatured: false,
            gallery: ["d1"],
            destinations: [{ city: "Barishal", country: "Bangladesh" }],
            highlights: ["Lake", "Island"],
            bestSeason: ["Winter"],
            audience: ["Families"],
            categories: ["nature"],
            mainLocation: { address: { city: "Barishal", region: "barishal", country: "Bangladesh" } },
            transportModes: ["bus"],
            basePrice: { amount: 4500, currency: "BDT" },
            duration: { days: 1 },
            paymentMethods: ["cash"],
            accessibility: { wheelchair: false, familyFriendly: true, petFriendly: false },
            cancellationPolicy: { refundable: true },
            ratings: { average: 4.4, count: 210 },
            authorId: admin._id,
            itinerary: [{ dayNumber: 1, title: "Visit & Return", description: "Explore the pond and return." }],
            inclusions: [{ label: "Entry", description: "Entry fees included" }],
        },
        {
            title: "Floating Market Experience",
            slug: "floating-market-barishal",
            status: "published",
            summary: "Traditional floating vegetable markets.",
            heroImage: "float",
            isFeatured: false,
            gallery: ["f1"],
            destinations: [{ city: "Banaripara", country: "Bangladesh" }],
            highlights: ["Local Life"],
            bestSeason: ["Winter"],
            audience: ["Explorers"],
            categories: ["culture_history"],
            mainLocation: { address: { city: "Banaripara", region: "barishal", country: "Bangladesh" } },
            transportModes: ["boat"],
            basePrice: { amount: 3800, currency: "BDT" },
            duration: { days: 1 },
            paymentMethods: ["cash"],
            accessibility: { wheelchair: false, familyFriendly: true, petFriendly: false },
            ratings: { average: 4.3, count: 180 },
            authorId: admin._id,
            itinerary: [{ dayNumber: 1, title: "Market Tour", description: "Early morning boat tour of the market." }],
            inclusions: [{ label: "Boat", description: "Boat rental included" }],
        },
        {
            title: "Lebur Char Mangrove",
            slug: "lebur-char-barishal",
            status: "published",
            summary: "Quiet mangrove island near Kuakata.",
            heroImage: "lebur",
            isFeatured: false,
            gallery: ["l1"],
            destinations: [{ city: "Kuakata", country: "Bangladesh" }],
            highlights: ["Mangrove", "Wildlife"],
            bestSeason: ["Winter"],
            audience: ["Families"],
            categories: ["nature"],
            mainLocation: { address: { city: "Kuakata", region: "barishal", country: "Bangladesh" } },
            transportModes: ["boat"],
            basePrice: { amount: 5200, currency: "BDT" },
            duration: { days: 2 },
            paymentMethods: ["cash"],
            ratings: { average: 4.5, count: 190 },
            authorId: admin._id,
            itinerary: [{ dayNumber: 1, title: "Boat & Explore", description: "Explore the mangrove island." }],
            inclusions: [{ label: "Boat", description: "Boat rental included" }],
        },
        {
            title: "Fatrar Char Eco Tour",
            slug: "fatrar-char-barishal",
            status: "published",
            summary: "Remote coastal island adventure.",
            heroImage: "fatrar",
            isFeatured: false,
            gallery: ["fc1"],
            destinations: [{ city: "Kalapara", country: "Bangladesh" }],
            highlights: ["Coast", "Nature"],
            bestSeason: ["Winter"],
            audience: ["Adventure Seekers"],
            categories: ["nature"],
            mainLocation: { address: { city: "Kalapara", region: "barishal", country: "Bangladesh" } },
            transportModes: ["boat"],
            basePrice: { amount: 6200, currency: "BDT" },
            duration: { days: 2 },
            paymentMethods: ["cash"],
            ratings: { average: 4.2, count: 150 },
            authorId: admin._id,
            itinerary: [{ dayNumber: 1, title: "Camp & Return", description: "Explore and return." }],
            inclusions: [{ label: "Guide", description: "Local guide included" }],
        },
        {
            title: "Cox’s Bazar Beach Holiday",
            slug: "coxs-bazar-chittagong",
            status: "published",
            summary: "World’s longest sandy sea beach.",
            heroImage: "cox",
            isFeatured: true,
            gallery: ["c1"],
            destinations: [{ city: "Cox's Bazar", country: "Bangladesh" }],
            highlights: ["Beach", "Marine Drive"],
            bestSeason: ["Winter"],
            audience: ["Families", "Couples"],
            categories: ["beaches"],
            mainLocation: { address: { city: "Cox's Bazar", region: "chittagong", country: "Bangladesh" } },
            transportModes: ["bus", "domestic_flight"],
            basePrice: { amount: 12000, currency: "BDT" },
            duration: { days: 4 },
            paymentMethods: ["cash", "bkash"],
            ratings: { average: 4.9, count: 1500 },
            authorId: admin._id,
            itinerary: [
                { dayNumber: 1, title: "Arrival", description: "Check into the hotel." },
                { dayNumber: 2, title: "Beach", description: "Full day at the beach." },
                { dayNumber: 3, title: "Explore", description: "Marine drive and local market." },
                { dayNumber: 4, title: "Return", description: "Departure." }
            ],
            inclusions: [{ label: "Hotel", description: "Beachfront hotel" }, { label: "Breakfast", description: "Buffet breakfast" }],
        }
    ];

    // Generate 34 more tours to reach 40
    const divisionList = ['barishal', 'chittagong', 'dhaka', 'khulna', 'mymensingh', 'rajshahi', 'rangpur', 'sylhet'];
    const titles = ["Sundarbans Wildlife", "Sajek Valley Cloud Tour", "Bandarban Hill Adventure", "Saint Martin Coral Island", "Rangamati Lake Escape", "Sylhet Tea Garden", "Ratargul Swamp Forest", "Bisnakandi River", "Mainamati Hill", "Paharpur Buddhist Vihara", "Somapura Mahavihara", "Sixty Dome Mosque", "Kantajew Temple", "Bichanakandi Stone Collection", "Jaflong Beauty", "Lalakhal River", "Sreemangal Tea", "Tanguar Haor Haor", "Lauwachara Rain Forest", "Nijhum Dwip", "Monpura Island", "Kuakata Sunrise", "Patuakhali Mangrove", "Barishal Floating Market", "Dhaka City Tour", "Lalbagh Fort", "Ahsan Manzil", "Sonargaon Museum", "National Zoo", "Botanical Garden", "Bhola Island", "Sandwip Adventure", "Hatiya Isolated Island", "Sitakunda Hill Trekking"];

    for (let i = 0; i < 34; i++) {
        const title = titles[i] || `${faker.location.city()} Discovery`;
        const div = divisionList[i % divisionList.length];
        RAW_TOURS.push({
            title: title,
            slug: title.toLowerCase().replace(/\s+/g, '-') + `-${faker.string.alphanumeric(4)}`,
            status: "published",
            summary: faker.lorem.sentence(),
            heroImage: title.toLowerCase().replace(/\s+/g, '-'),
            isFeatured: Math.random() > 0.8,
            gallery: [faker.string.uuid()],
            destinations: [{ city: faker.location.city(), country: "Bangladesh" }],
            highlights: [faker.lorem.word(), faker.lorem.word()],
            bestSeason: ["Winter"],
            audience: ["Families"],
            categories: [faker.helpers.arrayElement(Object.values(CONTENT_CATEGORY))],
            mainLocation: { address: { city: faker.location.city(), region: div, country: "Bangladesh" } },
            transportModes: ["bus"],
            basePrice: { amount: faker.number.int({ min: 3000, max: 20000 }), currency: "BDT" },
            duration: { days: faker.number.int({ min: 1, max: 5 }) },
            paymentMethods: ["cash"],
            ratings: { average: 4.0 + Math.random(), count: faker.number.int({ min: 10, max: 500 }) },
            authorId: admin._id,
            itinerary: [{ dayNumber: 1, title: "Discovery", description: faker.lorem.paragraph() }],
            inclusions: [{ label: "Guide", description: "Local guide" }],
        } as any);
    }

    console.log(`Prepared ${RAW_TOURS.length} tours from dataset.`);

    for (const raw of RAW_TOURS) {
        const adminId = admin._id as mongoose.Types.ObjectId;
        const heroAsset = await createAsset(adminId, raw.title, (raw.heroImage as string));
        const galleryAssets: any[] = [];
        for (const g of raw.gallery || []) {
            galleryAssets.push(await createAsset(adminId, `${raw.title} Gallery`, g));
        }

        const regionKey = raw.mainLocation?.address?.region?.toLowerCase() || 'dhaka';

        // Map Enums properly
        const audience = (raw.audience || []).map(mapAudience);
        const categories = (raw.categories || []).map(mapCategory);
        const transportModes = (raw.transportModes || []).map(mapTransport);
        const paymentMethods = (raw.paymentMethods || []).map(mapPayment);
        const bestSeason = (raw.bestSeason || []).map(mapSeason);
        const difficulty = mapDifficulty((raw as any).difficulty || 'easy');

        // Create Listing Location
        await Location.create({
            name: raw.title,
            slug: raw.slug,
            region: regionKey,
            image: heroAsset.publicUrl,
            duration: `${raw.duration?.days} days`,
            price: raw.basePrice?.amount,
            shortDescription: raw.summary,
            rating: raw.ratings?.average,
        });

        // Create Full Tour
        const tour = await TourModel.create({
            ...raw,
            audience,
            categories,
            transportModes,
            paymentMethods,
            bestSeason,
            difficulty,
            companyId: random(guides)._id,
            guideIds: [random(guides)._id], // Randomly pick a guide
            heroImage: heroAsset._id,
            gallery: galleryAssets.map(a => a._id),
            itinerary: (raw.itinerary as any[]).map(item => ({
                ...item,
                images: [galleryAssets[0]._id]
            })),
            destinations: (raw.destinations as any[]).map(d => ({
                ...d,
                description: raw.summary,
                highlights: raw.highlights,
                images: [galleryAssets[0]._id]
            })),
            publishedAt: raw.publishedAt || new Date(),
        });

        // Add random reviews
        const selectedUsers = faker.helpers.arrayElements(users, faker.number.int({ min: 1, max: 3 }));
        for (const user of selectedUsers) {
            await ReviewModel.create({
                tour: tour._id,
                user: user._id,
                rating: faker.number.int({ min: 4, max: 5 }),
                comment: faker.lorem.sentence(),
            });
        }
    }

    console.log("Seed complete!");
    await mongoose.disconnect();
}

seed().catch(err => {
    console.error(err);
    process.exit(1);
});

