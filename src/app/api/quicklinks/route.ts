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

const quickLinksCategorySchema = new mongoose.Schema({
  name: String,
  subCategories: [{
    name: String,
    tours: [{
      name: String,
      region: String,
      img: String,
      url: String,
      cloudinaryId: String
    }]
  }]
});

const QuickLinksCategory = mongoose.models.QuickLinksCategory || 
  mongoose.model('QuickLinksCategory', quickLinksCategorySchema);

export async function GET() {
  try {
    await connectDB();
    const categories = await QuickLinksCategory.find({}).lean();
    return NextResponse.json(categories);
  } catch (error) {
    console.error('Error fetching quicklinks:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}