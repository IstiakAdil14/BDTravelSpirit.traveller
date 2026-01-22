import mongoose from "mongoose";
import * as dotenv from "dotenv";
import path from "path";
import TourLocation from "../models/tourLocation.model";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const MONGODB_URI = process.env.MONGODB_URI;

async function checkRecords() {
    if (!MONGODB_URI) {
        console.error("MONGODB_URI not found");
        process.exit(1);
    }

    try {
        await mongoose.connect(MONGODB_URI);
        console.log("Connected to MongoDB.");

        const locations = await TourLocation.find({});
        console.log(`Found ${locations.length} tour locations.`);

        locations.forEach(l => {
            console.log(`- ${l.name}: ${l.image ? 'Image present' : 'IMAGE MISSING'}`);
            if (l.image) console.log(`  URL: ${l.image}`);
        });

    } catch (error) {
        console.error("Check failed:", error);
    } finally {
        await mongoose.disconnect();
    }
}

checkRecords();
