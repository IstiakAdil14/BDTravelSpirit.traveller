
import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";
import * as dotenv from "dotenv";
import path from "path";
import fs from "fs";
import crypto from "crypto";

// Models
import { AssetModel } from "../models/asset.model";
import Region from "../models/region.model";
import Location from "../models/location.model";
import PopularDestination from "../models/popularDestination.model";
import BangladeshDestination from "../models/bangladeshDestination.model";
import TourLocation from "../models/tourLocation.model";
import TourOperator from "../models/tourOperator.model";

// Constants
import { STORAGE_PROVIDER } from "../constants/asset.const";

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

async function uploadToCloudinary(url: string, folder: string) {
    try {
        // Direct upload from URL is supported by Cloudinary
        const result = await cloudinary.uploader.upload(url, {
            folder: folder,
            resource_type: "auto",
        });
        return result;
    } catch (error) {
        console.error(`Failed to upload ${url} to Cloudinary:`, error);
        return null;
    }
}

async function migrateAssets() {
    console.log("Migrating Assets...");
    const assets = await AssetModel.find({
        storageProvider: { $ne: STORAGE_PROVIDER.CLOUDINARY },
        deletedAt: null,
    });

    console.log(`Found ${assets.length} assets to migrate.`);

    for (const asset of assets) {
        console.log(`Migrating asset: ${asset.publicUrl}`);
        const result = await uploadToCloudinary(asset.publicUrl, "bd-travel-spirit/assets");
        if (result) {
            asset.storageProvider = STORAGE_PROVIDER.CLOUDINARY;
            asset.objectKey = result.public_id;
            asset.publicUrl = result.secure_url;
            await asset.save();
            console.log(`Successfully migrated to: ${result.secure_url}`);
        }
    }
}

async function migrateRegionImages() {
    console.log("Migrating Region images...");
    const regions = await Region.find({
        image: { $regex: /^(?!https:\/\/res\.cloudinary\.com).*/ } // Not already Cloudinary
    });

    console.log(`Found ${regions.length} regions to migrate.`);

    for (const region of regions) {
        if (!region.image) continue;
        console.log(`Migrating region image: ${region.image}`);
        const result = await uploadToCloudinary(region.image, "bd-travel-spirit/regions");
        if (result) {
            region.image = result.secure_url;
            await region.save();
            console.log(`Successfully migrated to: ${result.secure_url}`);
        }
    }
}

async function migrateLocationImages() {
    console.log("Migrating Location images...");
    const locations = await Location.find({
        image: { $regex: /^(?!https:\/\/res\.cloudinary\.com).*/ }
    });

    console.log(`Found ${locations.length} locations to migrate.`);

    for (const loc of locations) {
        if (!loc.image) continue;
        console.log(`Migrating location image: ${loc.image}`);
        const result = await uploadToCloudinary(loc.image, "bd-travel-spirit/locations");
        if (result) {
            loc.image = result.secure_url;
            await loc.save();
            console.log(`Successfully migrated to: ${result.secure_url}`);
        }
    }
}

async function migratePopularDestinationImages() {
    console.log("Migrating PopularDestination images...");
    const destinations = await PopularDestination.find({
        "image.src": { $regex: /^(?!https:\/\/res\.cloudinary\.com).*/ }
    });

    console.log(`Found ${destinations.length} popular destinations to migrate.`);

    for (const dest of destinations) {
        if (!dest.image?.src) continue;
        console.log(`Migrating popular destination image: ${dest.image.src}`);
        const result = await uploadToCloudinary(dest.image.src, "bd-travel-spirit/popular-destinations");
        if (result) {
            dest.image.src = result.secure_url;
            await dest.save();
            console.log(`Successfully migrated to: ${result.secure_url}`);
        }
    }
}

async function migrateBangladeshDestinationImages() {
    console.log("Migrating BangladeshDestination images...");
    const destinations = await BangladeshDestination.find({
        image: { $regex: /^(?!https:\/\/res\.cloudinary\.com).*/ }
    });

    console.log(`Found ${destinations.length} Bangladesh destinations to migrate.`);

    for (const dest of destinations) {
        if (!dest.image) continue;
        console.log(`Migrating Bangladesh destination image: ${dest.image}`);
        const result = await uploadToCloudinary(dest.image, "bd-travel-spirit/bangladesh-destinations");
        if (result) {
            dest.image = result.secure_url;
            await dest.save();
            console.log(`Successfully migrated to: ${result.secure_url}`);
        }
    }
}

async function migrateTourLocationImages() {
    console.log("Migrating TourLocation images...");
    const tourLocations = await TourLocation.find({
        image: { $regex: /^(?!https:\/\/res\.cloudinary\.com).*/ }
    });

    console.log(`Found ${tourLocations.length} tour locations to migrate.`);

    for (const loc of tourLocations) {
        if (!loc.image) continue;
        console.log(`Migrating tour location image: ${loc.image}`);
        const result = await uploadToCloudinary(loc.image, "bd-travel-spirit/tour-locations");
        if (result) {
            loc.image = result.secure_url;
            await loc.save();
            console.log(`Successfully migrated to: ${result.secure_url}`);
        }
    }
}

async function migrateTourOperatorLogos() {
    console.log("Migrating TourOperator logos...");
    const operators = await TourOperator.find({
        logo: { $regex: /^(?!https:\/\/res\.cloudinary\.com).*/ }
    });

    console.log(`Found ${operators.length} tour operators to migrate.`);

    for (const op of operators) {
        if (!op.logo) continue;
        console.log(`Migrating tour operator logo: ${op.logo}`);
        const result = await uploadToCloudinary(op.logo, "bd-travel-spirit/tour-operators");
        if (result) {
            op.logo = result.secure_url;
            await op.save();
            console.log(`Successfully migrated to: ${result.secure_url}`);
        }
    }
}

async function runMigration() {
    try {
        console.log("Connecting to MongoDB...");
        await mongoose.connect(MONGODB_URI!);
        console.log("Connected.");

        await migrateAssets();
        await migrateRegionImages();
        await migrateLocationImages();
        await migratePopularDestinationImages();
        await migrateBangladeshDestinationImages();
        await migrateTourLocationImages();
        await migrateTourOperatorLogos();

        console.log("Migration finished successfully!");
    } catch (error) {
        console.error("Migration failed:", error);
    } finally {
        await mongoose.disconnect();
    }
}

runMigration();
