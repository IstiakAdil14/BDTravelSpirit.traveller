import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/db/connect";
import UserModel from "@/lib/db/models/User";

export async function POST(request: NextRequest) {
  try {
    const { email, name, image } = await request.json();
    
    await connectToDatabase();
    const existingUser = await UserModel.findOne({ email });
    
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }
    let avatarId = undefined;
    if (image) {
      const AssetFileModel = (await import("@/models/assets/asset-file.model")).default;
      const AssetModel = (await import("@/models/assets/asset.model")).default;
      const { ASSET_TYPE, STORAGE_PROVIDER, VISIBILITY } = await import("@/constants/common/asset.const");

      const assetFile = await AssetFileModel.create({
        storageProvider: STORAGE_PROVIDER.LOCAL,
        objectKey: email + "-google-avatar",
        publicUrl: image,
        contentType: "image/jpeg",
        fileSize: 0,
        checksum: email + "-avatar-" + Date.now()
      });
      const asset = await AssetModel.create({
        file: assetFile._id,
        assetType: ASSET_TYPE.IMAGE,
        visibility: VISIBILITY.PUBLIC
      });
      avatarId = asset._id;
    }

    const created = await UserModel.create({
      name,
      email,
      role: "traveler",
      emailVerified: new Date(),
    });

    if (avatarId) {
      await UserModel.collection.updateOne(
        { _id: created._id },
        { $set: { avatar: avatarId } }
      );
    }

    return NextResponse.json({ success: true, userId: created._id });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
  }
}