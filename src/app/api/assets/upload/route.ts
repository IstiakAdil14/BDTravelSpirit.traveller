import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/db/connect";
import { AssetModel } from "@/models/assets/asset.model";
import AssetFileModel from "@/models/assets/asset-file.model";
import cloudinary from "@/lib/cloudinary";
import { getCurrentUser } from "@/lib/auth/getCurrentUser";
import { ASSET_TYPE, STORAGE_PROVIDER, VISIBILITY } from "@/constants/common";
import { MODERATION_STATUS } from "@/constants/tour";
import crypto from "crypto";

export async function POST(req: NextRequest) {
    try {
        const user = await getCurrentUser();
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const formData = await req.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
        }

        await dbConnect();



// 1. Calculate Checksum for deduplication
const bytes = await file.arrayBuffer();
const buffer = Buffer.from(bytes);
const checksum = crypto.createHash("sha256").update(buffer).digest("hex");

// 2. Check if asset file already exists
let assetFile = await AssetFileModel.findOne({ checksum });

if (!assetFile) {
    // 4. Upload to Cloudinary using stream
    const uploadPromise = new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: "bd-travel-spirit",
                resource_type: "auto",
            },
            (error, result) => {
                if (error) reject(error);
                else resolve(result);
            }
        );
        uploadStream.end(buffer);
    });

    const cloudinaryResult = (await uploadPromise) as any;

    assetFile = await AssetFileModel.create({
        storageProvider: STORAGE_PROVIDER.CLOUDINARY,
        objectKey: cloudinaryResult.public_id,
        publicUrl: cloudinaryResult.secure_url,
        contentType: file.type,
        fileSize: file.size,
        checksum,
    });
}

// 3. Determine Asset Type
let assetType = ASSET_TYPE.OTHER;
if (file.type.startsWith("image/")) assetType = ASSET_TYPE.IMAGE;
else if (file.type.startsWith("video/")) assetType = ASSET_TYPE.VIDEO;
else if (file.type.startsWith("audio/")) assetType = ASSET_TYPE.AUDIO;
else if (file.type === "application/pdf") assetType = ASSET_TYPE.DOCUMENT;

// 5. Create Asset record
const asset = await AssetModel.create({
    file: assetFile._id,
    assetType,
    title: file.name,
    visibility: VISIBILITY.PUBLIC,
    // moderationStatus: MODERATION_STATUS.APPROVED, // Add if needed by schema
});

        return NextResponse.json(asset);
    } catch (error: any) {
        console.error("Upload error:", error);
        return NextResponse.json({ error: error.message || "Upload failed" }, { status: 500 });
    }
}
