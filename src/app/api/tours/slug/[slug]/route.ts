import { NextResponse } from "next/server";
import { getFullTourBySlug } from "@/lib/tourService";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const data = await getFullTourBySlug(slug);

    if (!data || !data.tour) {
      return NextResponse.json({ error: "Tour not found" }, { status: 404 });
    }

    // Return the tour object with nested relations merged in
    return NextResponse.json({
      ...data.tour,
      reviews: data.reviews,
      faqs: data.faqs,
      gallery: data.gallery,
      recommendations: data.recommendations
    });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}