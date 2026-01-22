import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/db/connect";
import { AssetModel } from "@/models/asset.model";
import cloudinary from "@/lib/cloudinary";
import { getCurrentUser } from "@/lib/auth/getCurrentUser";
import { ASSET_TYPE, STORAGE_PROVIDER, VISIBILITY, MODERATION_STATUS } from "@/constants/asset.const";
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

        // 2. Check if asset already exists
        const existingAsset = await AssetModel.findOne({ checksum, deletedAt: null });
        if (existingAsset) {
            return NextResponse.json(existingAsset);
        }

        // 3. Determine Asset Type
        let assetType = ASSET_TYPE.OTHER;
        if (file.type.startsWith("image/")) assetType = ASSET_TYPE.IMAGE;
        else if (file.type.startsWith("video/")) assetType = ASSET_TYPE.VIDEO;
        else if (file.type.startsWith("audio/")) assetType = ASSET_TYPE.AUDIO;
        else if (file.type === "application/pdf") assetType = ASSET_TYPE.DOCUMENT;

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

        // 5. Create Asset record
        const asset = await AssetModel.create({
            storageProvider: STORAGE_PROVIDER.CLOUDINARY,
            objectKey: cloudinaryResult.public_id,
            publicUrl: cloudinaryResult.secure_url,
            contentType: file.type,
            fileSize: file.size,
            checksum,
            assetType,
            uploadedBy: user.id,
            visibility: VISIBILITY.PUBLIC,
            moderationStatus: MODERATION_STATUS.APPROVED, // Auto-approve for now or set to pending
            title: file.name,
        });

        return NextResponse.json(asset);
    } catch (error: any) {
        console.error("Upload error:", error);
        return NextResponse.json({ error: error.message || "Upload failed" }, { status: 500 });
    }
}
