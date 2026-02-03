import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db/connect';
import Region from '@/models/region.model';

export async function GET(request: Request, { params }: { params: Promise<{ region: string }> }) {
  try {
    await dbConnect();
    const { region } = await params;
    const regionData = await Region.findOne({ name: region }).lean();
    
    if (!regionData) {
      return NextResponse.json({ error: 'Region not found' }, { status: 404 });
    }
    
    return NextResponse.json(regionData);
  } catch (error) {
    console.error('Error fetching region:', error);
    return NextResponse.json({ error: 'Failed to fetch region' }, { status: 500 });
  }
}