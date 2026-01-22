import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/db/connect";
import { HeroSlideModel } from "@/models/heroSlide.model";

export async function GET() {
    try {
        await dbConnect();
        const slides = await HeroSlideModel.find({ isActive: true }).sort({ order: 1 });
        return NextResponse.json(slides);
    } catch (error: any) {
        console.error("Failed to fetch hero slides:", error);
        return NextResponse.json({ error: "Failed to fetch hero slides" }, { status: 500 });
    }
}
