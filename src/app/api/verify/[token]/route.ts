import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/db/connect";
import BookingModel from "@/models/tours/booking.model";
import crypto from "crypto";

// Make sure necessary models are registered before populating
import "@/models/tours/tour.model";
import "@/models/travelers/traveler.model";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    const { token } = await params;

    if (!token || !token.includes(".")) {
      return NextResponse.json({ error: "Invalid token format" }, { status: 400 });
    }

    const [encodedRef, signature] = token.split(".");
    const bookingReference = Buffer.from(encodedRef, "base64url").toString("utf8");

    // Verify signature
    const secret = process.env.NEXTAUTH_SECRET || "default_verification_secret";
    const expectedSignature = crypto.createHmac("sha256", secret).update(bookingReference).digest("base64url");

    if (signature !== expectedSignature) {
      return NextResponse.json({ error: "Invalid or tampered token" }, { status: 400 });
    }

    await dbConnect();

    // Fetch Booking with minimal populations
    const booking = await BookingModel.findOne({ bookingReference })
      .populate("tour", "title departure operatingWindow meetingPoint")
      .populate("traveler", "name")
      .lean() as any;

    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    // Resolve Travel Dates
    let travelDate = "TBD";
    if (booking.tour?.departure?.date) {
      travelDate = new Date(booking.tour.departure.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    } else if (booking.tour?.operatingWindow?.startDate && booking.tour?.operatingWindow?.endDate) {
      const s = new Date(booking.tour.operatingWindow.startDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
      const e = new Date(booking.tour.operatingWindow.endDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
      travelDate = `${s} - ${e}`;
    }

    const meetingPoint = booking.tour?.meetingPoint || booking.tour?.departure?.meetingPoint || "See itinerary for details";

    const verificationData = {
      bookingReference: booking.bookingReference,
      tourName: booking.tour?.title || "Unknown Tour",
      travelerName: booking.traveler?.name || "Traveler",
      travelDate,
      participants: booking.totalParticipants || 1,
      status: booking.status,
      paymentStatus: booking.payment?.status || "pending",
      meetingPoint,
    };

    return NextResponse.json(verificationData);
  } catch (error) {
    console.error("Error verifying booking:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
