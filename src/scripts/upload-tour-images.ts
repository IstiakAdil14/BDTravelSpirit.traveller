
import { v2 as cloudinary } from "cloudinary";
import * as dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});

const images = [
    { name: "Cox's Bazar Beach", path: "C:/Users/Hussain/.gemini/antigravity/brain/99f2f823-2323-4728-8b36-97d5b2730953/tour_cox_bazar_beach_1769089346940.png" },
    { name: "Sundarbans Mangrove Forest", path: "C:/Users/Hussain/.gemini/antigravity/brain/99f2f823-2323-4728-8b36-97d5b2730953/tour_sundarbans_mangrove_1769089370661.png" },
    { name: "Sylhet Tea Gardens", path: "C:/Users/Hussain/.gemini/antigravity/brain/99f2f823-2323-4728-8b36-97d5b2730953/tour_sylhet_tea_garden_1769089398489.png" }
];

import * as fs from "fs";

async function run() {
    console.log("Starting upload...");
    const results = [];
    for (const img of images) {
        try {
            const result = await cloudinary.uploader.upload(img.path, {
                folder: "bd-travel-spirit/tour-locations",
            });
            console.log(`UPLOAD_SUCCESS: ${img.name} -> ${result.secure_url}`);
            results.push({ name: img.name, url: result.secure_url });
        } catch (error) {
            console.error(`UPLOAD_FAILED: ${img.name}`, error);
        }
    }
    fs.writeFileSync("src/scripts/upload_results.json", JSON.stringify(results, null, 2));
    console.log("Results saved to src/scripts/upload_results.json");
}

run();
