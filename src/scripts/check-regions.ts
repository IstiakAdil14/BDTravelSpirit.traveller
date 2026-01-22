import mongoose from "mongoose";
import * as dotenv from "dotenv";
import path from "path";
import BangladeshDestination from "../models/bangladeshDestination.model";

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

        const destinations = await BangladeshDestination.find({});
        console.log(`Found ${destinations.length} destinations.`);

        destinations.forEach(d => {
            console.log(`- ${d.name}: ${d.image ? 'Image present' : 'IMAGE MISSING'}`);
            if (d.image) console.log(`  URL: ${d.image}`);
        });

    } catch (error) {
        console.error("Check failed:", error);
    } finally {
        await mongoose.disconnect();
    }
}

checkRecords();
