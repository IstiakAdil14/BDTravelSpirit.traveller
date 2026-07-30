import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db/connect';
import UserModel from '@/lib/db/models/User';
import bcrypt from 'bcrypt';
import { verifyOTP } from '@/lib/otpStore';

export async function POST(request: NextRequest) {
  try {
    const { email, name, password, otp } = await request.json();
    
    // 1. Verify OTP
    const isValidOTP = verifyOTP(email, otp);
    if (!isValidOTP) {
      return NextResponse.json({ error: 'Invalid or expired OTP' }, { status: 400 });
    }
    
    await connectToDatabase();
    
    // 2. Check if user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: 'Account already exists' }, { status: 400 });
    }
    
    // 3. Create User
    const newUser = await UserModel.create({
      name,
      email,
      password: password, // Mongoose pre-save hook will hash this automatically
      role: 'traveler',
      emailVerified: new Date(),
    });
    
    // 4. Generate Default Avatar
    const AssetFileModel = (await import("@/models/assets/asset-file.model")).default;
    const AssetModel = (await import("@/models/assets/asset.model")).default;
    const { ASSET_TYPE, STORAGE_PROVIDER, VISIBILITY } = await import("@/constants/common/asset.const");

    const defaultAvatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`;
    
    const assetFile = await AssetFileModel.create({
      storageProvider: STORAGE_PROVIDER.LOCAL,
      objectKey: email + "-default-avatar",
      publicUrl: defaultAvatarUrl,
      contentType: "image/png",
      fileSize: 0,
      checksum: email + "-avatar-" + Date.now()
    });

    const asset = await AssetModel.create({
      file: assetFile._id,
      assetType: ASSET_TYPE.IMAGE,
      visibility: VISIBILITY.PUBLIC
    });

    // Update User with avatar bypassing strict schema
    await UserModel.collection.updateOne(
      { _id: newUser._id },
      { $set: { avatar: asset._id } }
    );
    
    // 5. Create Traveler Profile
    const { TravelerModel } = await import("@/models/travelers/traveler.model");
    await TravelerModel.create({
      user: newUser._id,
      name: newUser.name,
      avatar: asset._id,
      isVerified: true,
      accountStatus: "active",
      location: null,
    });
    
    return NextResponse.json({ 
      ok: true, 
      user: { id: newUser._id, email: newUser.email, name: newUser.name } 
    });
  } catch (error: any) {
    console.error("Signup error:", error);
    return NextResponse.json({ error: error.message || 'Failed to create account' }, { status: 500 });
  }
}
