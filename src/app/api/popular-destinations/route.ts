import { NextResponse } from 'next/server';

const MOCK_DESTINATIONS = [
  { id: 1, name: "Cox's Bazar", image: "https://res.cloudinary.com/dc6yqjtm9/image/upload/v1784961439/chittagong_jst73h.webp", popularityScore: 98, totalTours: 15, shortDescription: "The world's longest natural sandy sea beach." },
  { id: 2, name: "Sreemangal", image: "https://res.cloudinary.com/dc6yqjtm9/image/upload/v1784961441/Sylhet_bkuepa.jpg", popularityScore: 95, totalTours: 12, shortDescription: "The tea capital of Bangladesh." },
  { id: 3, name: "Sundarbans", image: "https://res.cloudinary.com/dc6yqjtm9/image/upload/v1784961440/khulnA_rpmozl.jpg", popularityScore: 92, totalTours: 8, shortDescription: "The largest mangrove forest in the world." },
  { id: 4, name: "Sajek Valley", image: "https://res.cloudinary.com/dc6yqjtm9/image/upload/v1784961439/chittagong_jst73h.webp", popularityScore: 90, totalTours: 10, shortDescription: "An emerging tourist spot in Bangladesh." }
];

export async function POST() {
  return NextResponse.json({
    success: true,
    message: 'Destination saved successfully (mocked)'
  });
}

export async function GET() {
  return NextResponse.json({
    success: true,
    data: MOCK_DESTINATIONS
  }, { status: 200 });
}