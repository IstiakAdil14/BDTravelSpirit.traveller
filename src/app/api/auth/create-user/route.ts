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

    const created = await UserModel.create({
      name,
      email,
      image,
      role: "traveler",
      emailVerified: new Date(),
    });

    return NextResponse.json({ success: true, userId: created._id });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
  }
}