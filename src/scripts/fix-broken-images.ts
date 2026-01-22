
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import path from "path";
import TourLocation from "../models/tourLocation.model";
import TourOperator from "../models/tourOperator.model";
import BangladeshDestination from "../models/bangladeshDestination.model";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const MONGODB_URI = process.env.MONGODB_URI;

const divisionImages: Record<string, string> = {
    "Khulna": "https://images.unsplash.com/photo-1623124803126-11f879683935?q=80&w=2000",
    "Barisal": "https://images.unsplash.com/photo-1629813134375-7b565a043c94?q=80&w=2000",
    "Chittagong": "https://images.unsplash.com/photo-1616428796245-7e0450531cc2?q=80&w=2000",
    "Dhaka": "https://images.unsplash.com/photo-1599074914978-2946b69e5740?q=80&w=2000",
    "Rangpur": "https://images.unsplash.com/photo-1594165561183-4948a8aeb41e?q=80&w=2000",
    "Rajshahi": "https://images.unsplash.com/photo-1624383461414-72c1c65d6c29?q=80&w=2000",
    "Sylhet": "https://images.unsplash.com/photo-1588661730045-8276f8272f7d?q=80&w=2000",
    "Mymensingh": "https://images.unsplash.com/photo-1595180058368-2081682f8d85?q=80&w=2000"
};

const operatorLogos: Record<string, string> = {
    "Mountain Trekkers Bangladesh": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=500",
    "Cultural Odyssey Bangladesh": "https://images.unsplash.com/photo-1528605248644-14dd04cb11c7?q=80&w=500",
    "Island Hoppers Bangladesh": "https://images.unsplash.com/photo-1544735032-6a71ddef7964?q=80&w=500",
    "Jungle Expeditions Bangladesh": "https://images.unsplash.com/photo-1540206395-6880f06533c8?q=80&w=500",
    "Luxury Voyages Bangladesh": "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=500",
    "Safari Kingdom Bangladesh": "https://images.unsplash.com/photo-1516426122078-c23e76369d55?q=80&w=500",
    "Island Breeze Tours Bangladesh": "https://images.unsplash.com/photo-1559128399-c950c9aca58e?q=80&w=500",
    "Global Adventures Bangladesh": "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=500",
    "Adventure Seekers Bangladesh": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=500",
    "Historic Horizons Bangladesh": "https://images.unsplash.com/photo-1523733022248-0382a3996924?q=80&w=500",
    "Eco Treks Bangladesh": "https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=500",
    "Desert Trails Bangladesh": "https://images.unsplash.com/photo-1509316785289-025f5b846b35?q=80&w=500",
    "Snow Adventures Bangladesh": "https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?q=80&w=500",
    "Urban Explorers Bangladesh": "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=500",
    "River Rovers Bangladesh": "https://images.unsplash.com/photo-1520038410233-7141ffa9635c?q=80&w=500",
    "Northern Lights Tours Bangladesh": "https://images.unsplash.com/photo-1483347756197-71ef80e95f73?q=80&w=500",
    "Culinary Journeys Bangladesh": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=500",
    "Sunny Escapes Bangladesh": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=500",
    "Volcano Voyagers Bangladesh": "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=500",
    "Safari & Beyond Bangladesh": "https://images.unsplash.com/photo-1472396961693-142e6e269027?q=80&w=500"
};

const tourLocationFixes: Record<string, string> = {
    "Dhaka Old Town": "https://images.unsplash.com/photo-1599074914978-2946b69e5740?q=80&w=2000",
    "Bandarban Hills": "https://images.unsplash.com/photo-1623910543596-370509a259c4?q=80&w=2000",
    "Saint Martin's Island": "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?q=80&w=2000"
};

async function runFixes() {
    if (!MONGODB_URI) {
        console.error("MONGODB_URI not found");
        process.exit(1);
    }

    try {
        await mongoose.connect(MONGODB_URI);
        console.log("Connected to MongoDB.");

        // Fix BangladeshDestinations
        console.log("Fixing BangladeshDestinations...");
        for (const [name, url] of Object.entries(divisionImages)) {
            await BangladeshDestination.updateOne({ name }, { $set: { image: url } });
        }

        // Fix TourOperators
        console.log("Fixing TourOperators...");
        for (const [name, url] of Object.entries(operatorLogos)) {
            await TourOperator.updateOne({ name }, { $set: { logo: url } });
        }

        // Fix TourLocations
        console.log("Fixing TourLocations...");
        for (const [name, url] of Object.entries(tourLocationFixes)) {
            await TourLocation.updateOne({ name }, { $set: { image: url } });
        }

        console.log("All fixes applied successfully!");
    } catch (error) {
        console.error("Fix failed:", error);
    } finally {
        await mongoose.disconnect();
    }
}

runFixes();
