import { NextResponse } from 'next/server';
import { ourTourLocations } from '@/constants/tour';

export async function POST() {
  return NextResponse.json({
    success: true,
    message: 'Tour locations saved successfully (mocked)'
  });
}

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      data: ourTourLocations
    }, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching tour locations:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to fetch tour locations',
      error: error.message
    }, { status: 500 });
  }
}