import { NextResponse } from 'next/server';
import { tourOperators } from '@/data/tourOperators';

export async function POST() {
  return NextResponse.json({
    success: true,
    message: `Successfully seeded ${tourOperators.length} tour operators`
  });
}

export async function GET() {
  return NextResponse.json({
    success: true,
    message: `${tourOperators.length} tour operators already exist`
  });
}