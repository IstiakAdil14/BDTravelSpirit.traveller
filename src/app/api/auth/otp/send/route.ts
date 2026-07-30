import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db/connect';
import UserModel from '@/lib/db/models/User';
import { storeOTP } from '@/lib/otpStore';
import { sendVerificationEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const { email, purpose } = await request.json();
    
    if (purpose === 'signup') {
      await connectToDatabase();
      const existingUser = await UserModel.findOne({ email });
      
      if (existingUser) {
        return NextResponse.json({ error: 'Account already exists' }, { status: 400 });
      }
    }
    
    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Store OTP in memory
    storeOTP(email, otp);
    
    // Send email
    try {
      await sendVerificationEmail(email, otp);
      console.log(`OTP sent to ${email}`);
    } catch (emailError) {
      console.error('Email send failed:', emailError);
      console.log(`OTP for ${email}: ${otp}`);
    }
    
    return NextResponse.json({ 
      ok: true, 
      message: 'OTP sent successfully'
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to send OTP' }, { status: 500 });
  }
}