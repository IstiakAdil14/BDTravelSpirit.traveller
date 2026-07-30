import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/db/connect";
import mongoose from "mongoose";
import { heroSlides as fallbackSlides } from "@/data/heroSlides";

export async function GET() {
    try {
        await dbConnect();
        const collection = mongoose.connection.db?.collection('heroslides');
        let dbSlides: any[] = [];
        if (collection) {
            dbSlides = await collection.find({ isActive: true }).sort({ order: 1 }).toArray();
        }
        const data = dbSlides.length > 0 ? dbSlides.map((slide: any) => ({
            ...slide,
            _id: slide._id.toString()
        })) : fallbackSlides;

        return NextResponse.json({
            success: true,
            data,
        });
    } catch (error: any) {
        console.error("Failed to fetch hero slides:", error);
        return NextResponse.json({ error: "Failed to fetch hero slides" }, { status: 500 });
    }
}
