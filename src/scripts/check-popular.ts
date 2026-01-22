import mongoose from "mongoose";
import * as dotenv from "dotenv";
import path from "path";
import PopularDestination from "../models/popularDestination.model";

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

        const destinations = await PopularDestination.find({});
        console.log(`Found ${destinations.length} popular destinations.`);

        destinations.forEach(d => {
            console.log(`- ${d.name} (${d.region}): ${d.image?.src ? 'Image present' : 'IMAGE MISSING'}`);
            if (d.image?.src) console.log(`  URL: ${d.image.src}`);
        });

    } catch (error) {
        console.error("Check failed:", error);
    } finally {
        await mongoose.disconnect();
    }
}

checkRecords();
