import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";
import * as dotenv from "dotenv";
import path from "path";
import { HeroSlideModel } from "../models/heroSlide.model";

// Load .env.local
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error("Please define the MONGODB_URI environment variable inside .env.local");
    process.exit(1);
}

const slidesData = [
    {
        localPath: path.resolve("C:/Users/Hussain/.gemini/antigravity/brain/99f2f823-2323-4728-8b36-97d5b2730953/hero_bangladesh_landscape_1769086854279.png"),
        title: "Discover Bangladesh",
        subtitle: "Authentic experiences await",
        alt: "Scenic view of Bangladesh landscape",
        order: 1
    },
    {
        localPath: path.resolve("C:/Users/Hussain/.gemini/antigravity/brain/99f2f823-2323-4728-8b36-97d5b2730953/hero_heritage_bangladesh_1769086873129.png"),
        title: "Heritage & Adventure",
        subtitle: "Explore the heart of Bengal",
        alt: "Cultural heritage sites of Bangladesh",
        order: 2
    },
    {
        localPath: path.resolve("C:/Users/Hussain/.gemini/antigravity/brain/99f2f823-2323-4728-8b36-97d5b2730953/hero_sustainable_tourism_bangladesh_1769086893196.png"),
        title: "Sustainable & Tourism",
        subtitle: "Travel responsibly, experience deeply",
        alt: "Sustainable tourism in Bangladesh",
        order: 3
    }
];

async function seedHeroSlides() {
    try {
        console.log("Connecting to MongoDB...");
        await mongoose.connect(MONGODB_URI!);
        console.log("Connected.");

        console.log("Clearing existing Hero Slides...");
        await HeroSlideModel.deleteMany({});

        for (const data of slidesData) {
            console.log(`Uploading ${data.title} image to Cloudinary...`);
            const result = await cloudinary.uploader.upload(data.localPath, {
                folder: "bd-travel-spirit/hero",
                resource_type: "auto",
            });

            console.log(`Creating Hero Slide record for: ${data.title}`);
            await HeroSlideModel.create({
                image: result.secure_url,
                title: data.title,
                subtitle: data.subtitle,
                alt: data.alt,
                order: data.order,
                isActive: true
            });
        }

        console.log("Hero Slides seeding complete!");
    } catch (error) {
        console.error("Seeding failed:", error);
    } finally {
        await mongoose.disconnect();
    }
}

seedHeroSlides();
