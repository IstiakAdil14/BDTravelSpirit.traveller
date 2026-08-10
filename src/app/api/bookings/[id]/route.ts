import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";
import { dbConnect } from "@/lib/db/connect";
import BookingModel from "@/models/tours/booking.model";
import { ReviewModel } from "@/models/tours/review.model";
import { UserModel } from "@/models/user.model";
import mongoose from "mongoose";
import crypto from "crypto";

// Make sure necessary models are registered before populating
import "@/models/tours/tour.model";
import "@/models/travelers/traveler.model";
import "@/models/guide/guide.model";
import "@/models/assets/asset-file.model"; // for heroImage

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    // Validate ID
    let query = {};
    if (mongoose.Types.ObjectId.isValid(id)) {
      query = { _id: id };
    } else {
      // Assume it's a booking reference
      query = { bookingReference: id };
    }

    // 1. Fetch Booking with Deep Populations
    const booking = await BookingModel.findOne(query)
      .populate({
        path: "tour",
        populate: [
          { path: "companyId", select: "companyName owner address status" },
          { path: "heroImage", populate: { path: "file", select: "publicUrl" } },
        ],
      })
      .populate("traveler", "user name phone address")
      .lean() as any;

    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    // 2. Security Check: Only the traveler who booked (or an admin) can view this
    // The session.user.id refers to the User model ID. We need to match it with booking.traveler.user
    if (booking.traveler?.user?.toString() !== session.user.id) {
      // Allow if user is admin - checking via DB since session role might be 'traveler' for OAuth
      const user = await UserModel.findById(session.user.id);
      if (user?.role !== "admin") {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      }
    }

    // 3. Fetch specific Traveler Review (if any)
    const review = await ReviewModel.findOne({
      tour: booking.tour?._id,
      user: booking.traveler?._id,
    }).lean();

    // 4. Construct the Curated DTO

    // Calculate Financials
    const basePrice = booking.tour?.basePrice?.amount || 0;
    const totalParticipants = booking.totalParticipants || 1;
    const subTotal = basePrice * totalParticipants;
    const totalPaid = booking.totalPaid || 0;

    // Resolve Travel Dates
    let travelDates = "TBD";
    if (booking.tour?.departure?.date) {
      travelDates = new Date(booking.tour.departure.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    } else if (booking.tour?.operatingWindow?.startDate && booking.tour?.operatingWindow?.endDate) {
      const s = new Date(booking.tour.operatingWindow.startDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
      const e = new Date(booking.tour.operatingWindow.endDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
      travelDates = `${s} - ${e}`;
    }

    // Construct deterministic Timeline from states
    const timeline = [];
    if (booking.createdAt) {
      timeline.push({ label: "Booking Created", date: booking.createdAt, status: "completed" });
    }
    
    if (booking.payment?.status === "paid") {
      timeline.push({ label: "Payment Received", date: booking.payment.paidAt || booking.updatedAt, status: "completed" });
    } else if (booking.status !== "cancelled") {
      timeline.push({ label: "Payment Pending", date: null, status: "upcoming" });
    }

    if (booking.status === "confirmed" || booking.status === "completed") {
      timeline.push({ label: "Confirmation Sent", date: booking.updatedAt, status: "completed" });
    } else if (booking.status !== "cancelled") {
      timeline.push({ label: "Confirmation Sent", date: null, status: "upcoming" });
    }

    if (booking.status === "completed") {
      timeline.push({ label: "Tour Completed", date: booking.updatedAt, status: "completed" });
    } else if (booking.status !== "cancelled") {
      timeline.push({ label: "Tour Scheduled", date: null, status: "upcoming" });
      timeline.push({ label: "Tour Completed", date: null, status: "upcoming" });
    }

    if (booking.status === "cancelled") {
      timeline.push({ label: "Booking Cancelled", date: booking.cancellation?.cancelledAt || booking.updatedAt, status: "cancelled" });
    }

    const bookingRefForToken = booking.bookingReference || booking._id.toString();
    const secret = process.env.NEXTAUTH_SECRET || "default_verification_secret";
    const signature = crypto.createHmac('sha256', secret).update(bookingRefForToken).digest('base64url');
    const verificationToken = `${Buffer.from(bookingRefForToken).toString('base64url')}.${signature}`;

    const dto = {
      bookingSummary: {
        id: booking.bookingReference || booking._id.toString().slice(-6).toUpperCase(),
        verificationToken,
        status: booking.status,
        bookedAt: booking.bookedAt || booking.createdAt,
        lastUpdated: booking.updatedAt,
        totalParticipants,
        travelDates,
      },
      financials: {
        basePrice,
        subTotal,
        discounts: booking.discounts || [],
        totalPaid,
        paymentMethod: booking.payment?.method || "N/A",
        paymentStatus: booking.payment?.status || "pending",
        transactionId: booking.payment?.transactionId || null,
        currency: booking.tour?.basePrice?.currency || "BDT",
      },
      traveler: {
        name: booking.traveler?.name || "Traveler",
        email: session.user.email, // using session email as traveler email is usually user email
        phone: booking.traveler?.phone || "",
        emergencyContact: booking.tour?.emergencyContacts || null, // from tour schema as fallback
      },
      operator: {
        name: booking.tour?.companyId?.companyName || "Unknown Operator",
        verified: booking.tour?.companyId?.status === "approved",
        phone: booking.tour?.companyId?.owner?.phone || "N/A",
        email: "support@bdtravelspirit.com", // Fallback if Guide email not directly exposed
      },
      tourDetails: {
        title: booking.tour?.title || "Unknown Tour",
        heroImage: booking.tour?.heroImage?.file?.publicUrl || "",
        duration: booking.tour?.duration?.days ? `${booking.tour.duration.days} Days / ${booking.tour.duration.nights || 0} Nights` : "1 Day",
        location: [booking.tour?.mainLocation?.address?.city, booking.tour?.mainLocation?.address?.district].filter(Boolean).join(", ") || "Bangladesh",
        transport: booking.tour?.transportModes?.join(", ") || "N/A",
        meetingPoint: booking.tour?.meetingPoint || booking.tour?.departure?.meetingPoint || "See itinerary for details",
        pickupTime: booking.tour?.departure?.date ? new Date(booking.tour.departure.date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : "N/A",
        packingList: booking.tour?.packingList || [],
      },
      itinerary: booking.tour?.itinerary || [],
      inclusionsExclusions: {
        inclusions: booking.tour?.inclusions || [],
        exclusions: booking.tour?.exclusions || [],
      },
      policies: {
        cancellation: booking.tour?.cancellationPolicy || null,
        refund: booking.tour?.refundPolicy || null,
        terms: booking.tour?.terms || null,
      },
      timeline,
      review: review || null,
    };

    return NextResponse.json(dto);
  } catch (error) {
    console.error("Error fetching booking details:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
