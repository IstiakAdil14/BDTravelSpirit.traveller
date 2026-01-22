import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db/connect';
import UserModel from '@/lib/db/models/User';
import nodemailer from 'nodemailer';
import { storeOTP } from '@/lib/otpStore';

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
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_APP_PASSWORD,
        },
      });
      
      await transporter.sendMail({
        from: process.env.GMAIL_USER,
        to: email,
        subject: 'BD Travel Spirit - Verification Code',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #059669;">Your Verification Code</h2>
            <div style="background-color: #f3f4f6; padding: 20px; text-align: center; margin: 20px 0;">
              <div style="font-size: 32px; font-weight: bold; color: #059669; letter-spacing: 4px;">
                ${otp}
              </div>
            </div>
            <p>This code will expire in 10 minutes.</p>
          </div>
        `,
      });
      
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