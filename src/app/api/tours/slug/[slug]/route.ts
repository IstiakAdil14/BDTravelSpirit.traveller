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

    // Return just the tour object, not the nested structure
    return NextResponse.json(data.tour);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}