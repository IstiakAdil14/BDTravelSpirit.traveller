import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/db/connect";
import UserModel from "@/lib/db/models/User";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();
    
    await connectToDatabase();
    const existingUser = await UserModel.findOne({ email });
    
    return NextResponse.json({ exists: !!existingUser });
  } catch (error) {
    return NextResponse.json({ exists: false });
  }
}