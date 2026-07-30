import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/getCurrentUser";
import { dbConnect } from "@/lib/db/connect";
import UserModel from "@/lib/db/models/User";
import { AssetModel } from "@/models/assets/asset.model";

export async function PUT(req: NextRequest) {
    try {
        const user = await getCurrentUser();
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const { assetId } = body;

        if (!assetId) {
            return NextResponse.json({ error: "No asset ID provided" }, { status: 400 });
        }

        await dbConnect();

        // Verify asset exists
        const asset = await AssetModel.findById(assetId);
        if (!asset) {
            return NextResponse.json({ error: "Asset not found" }, { status: 404 });
        }

        // 1. Update Legacy UserModel (using collection updateOne to bypass schema strictness if needed)
        const mongoose = require("mongoose");
        const objectId = new mongoose.Types.ObjectId(user.id);
        await UserModel.collection.updateOne(
            { _id: objectId },
            { $set: { avatar: asset._id } }
        );

        // 2. Update Traveler Profile if it exists
        if (user.role === "traveler") {
            const { TravelerModel } = await import("@/models/travelers/traveler.model");
            await TravelerModel.findOneAndUpdate(
                { user: objectId },
                { avatar: asset._id }
            );
        }

        return NextResponse.json({ success: true, avatarId: asset._id });
    } catch (error: any) {
        console.error("Error updating avatar:", error);
        return NextResponse.json({ error: error.message || "Failed to update avatar" }, { status: 500 });
    }
}

