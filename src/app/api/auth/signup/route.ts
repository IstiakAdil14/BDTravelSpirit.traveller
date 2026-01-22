import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db/connect';
import UserModel from '@/lib/db/models/User';
import bcrypt from 'bcrypt';

export async function POST(request: NextRequest) {
  try {
    const { email, name, password } = await request.json();
    
    await connectToDatabase();
    
    // Check if user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: 'Account already exists' }, { status: 400 });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);
    
    // Create user
    const user = await UserModel.create({
      name,
      email,
      password: hashedPassword,
      role: 'traveler',
      emailVerified: new Date(),
    });
    
    return NextResponse.json({ ok: true, user: { id: user._id, email: user.email, name: user.name } });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create account' }, { status: 500 });
  }
}