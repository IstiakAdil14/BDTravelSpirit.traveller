
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

// Import Enums
import { TOUR_STATUS, AUDIENCE_TYPE, CONTENT_CATEGORY, DIFFICULTY_LEVEL, PAYMENT_METHOD, TRANSPORT_MODE, CURRENCY } from "../constants/tour.const";
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

    console.log("Clearing existing data...");
    await TourModel.deleteMany({});
    await GuideModel.deleteMany({});
    await AssetModel.deleteMany({});
    await UserModel.deleteMany({});
    await ReviewModel.deleteMany({});
    await TourFAQModel.deleteMany({});

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
            },
            status: GUIDE_STATUS.APPROVED,
            documents: [],
        });
        guides.push(guide);
    }
    console.log(`Created ${guides.length} guides.`);

    console.log("Seed Static Tours from ourTourLocations...");
    for (const loc of ourTourLocations) {
        const heroAsset = await createAsset(admin._id, loc.name, loc.name.replace(/\s+/g, '-').toLowerCase());
        const galleryAssets = [];
        for (let i = 0; i < 3; i++) {
            galleryAssets.push(await createAsset(admin._id, `${loc.name} Gallery ${i}`, `${loc.name}-gallery-${i}`));
        }

        const tour = await TourModel.create({
            authorId: admin._id,
            companyId: random(guides)._id,
            title: loc.name,
            slug: loc.name.toLowerCase().replace(/\s+/g, '-'),
            status: TOUR_STATUS.PUBLISHED,
            summary: loc.description,
            heroImage: heroAsset._id,
            gallery: galleryAssets.map(a => a._id),
            description: faker.lorem.paragraphs(3),
            destinations: [{
                country: "Bangladesh",
                city: loc.name.split(' ')[0],
                description: loc.description,
                highlights: loc.highlights,
            }],
            basePrice: {
                amount: faker.number.int({ min: 5000, max: 25000 }),
                currency: CURRENCY.BDT,
            },
            duration: { days: parseInt(loc.duration) || 3, nights: (parseInt(loc.duration) || 3) - 1 },
            difficulty: DIFFICULTY_LEVEL.EASY,
            categories: [CONTENT_CATEGORY.NATURE],
            publishedAt: new Date(),
        });

        // Add some random reviews for these static tours
        for (let r = 0; r < 3; r++) {
            await ReviewModel.create({
                tour: tour._id,
                user: random(users)._id,
                rating: faker.number.int({ min: 4, max: 5 }),
                comment: faker.lorem.sentence(),
            });
        }
    }

    console.log("Seeding additional random tours...");
    for (let i = 0; i < 10; i++) {
        const title = `${faker.location.city()} Adventure`;
        const heroAsset = await createAsset(admin._id, title, "adventure");

        await TourModel.create({
            authorId: admin._id,
            companyId: random(guides)._id,
            title: title,
            slug: title.toLowerCase().replace(/\s+/g, '-') + `-${faker.string.alphanumeric(4)}`,
            status: TOUR_STATUS.PUBLISHED,
            summary: faker.lorem.sentence(),
            heroImage: heroAsset._id,
            description: faker.lorem.paragraphs(2),
            destinations: [{
                country: "Bangladesh",
                city: faker.location.city(),
            }],
            basePrice: {
                amount: faker.number.int({ min: 2000, max: 15000 }),
                currency: CURRENCY.BDT,
            },
            duration: { days: faker.number.int({ min: 1, max: 5 }) },
            publishedAt: new Date(),
        });
    }

    console.log("Seed complete!");
    await mongoose.disconnect();
}

seed().catch(err => {
    console.error(err);
    process.exit(1);
});

