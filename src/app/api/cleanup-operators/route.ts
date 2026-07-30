import { NextResponse } from 'next/server';

export async function POST() {
  return NextResponse.json({
    success: true,
    removedCount: 0,
    message: 'Cleanup completed successfully.'
  });
}