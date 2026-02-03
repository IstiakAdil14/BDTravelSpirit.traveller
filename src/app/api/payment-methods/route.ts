import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://istiakadil:istiakadil@cluster0.lbx8jdk.mongodb.net/bd-travel-spirit-client?retryWrites=true&w=majority&appName=Cluster0';

declare global {
  var mongoose: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
}

if (!(global as any).mongoose) {
  (global as any).mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if ((global as any).mongoose.conn) {
    return (global as any).mongoose.conn;
  }

  if (!(global as any).mongoose.promise) {
    (global as any).mongoose.promise = mongoose.connect(MONGODB_URI);
  }

  (global as any).mongoose.conn = await (global as any).mongoose.promise;
  return (global as any).mongoose.conn;
}

const paymentMethodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  imageUrl: { type: String, required: true },
  cloudinaryId: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  order: { type: Number, default: 0 }
});

const PaymentMethod = mongoose.models.PaymentMethod || mongoose.model('PaymentMethod', paymentMethodSchema);

export async function GET() {
  try {
    await connectDB();
    const paymentMethods = await PaymentMethod.find({ isActive: true }).sort({ order: 1 }).lean();
    return NextResponse.json(paymentMethods);
  } catch (error) {
    console.error('Error fetching payment methods:', error);
    return NextResponse.json({ error: 'Failed to fetch payment methods' }, { status: 500 });
  }
}