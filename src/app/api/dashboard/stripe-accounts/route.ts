import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";
import { dbConnect } from "@/lib/db/connect";
import StripePaymentAccountModel from "@/models/payments/payment-account.model";
import UserModel from "@/lib/db/models/User";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2026-06-24.dahlia" as any,
});

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const user = await UserModel.findOne({ email: session.user.email });
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    const body = await req.json();
    const { label, stripePaymentMethodId } = body;

    if (!stripePaymentMethodId) {
      return NextResponse.json({ error: "stripePaymentMethodId is required" }, { status: 400 });
    }

    // Check if user already has a real Stripe customer ID
    const existingAccount = await StripePaymentAccountModel.findOne({ 
      ownerId: user._id,
      stripeCustomerId: { $not: /^cus_mock_/ } 
    });
    let customerId = existingAccount?.stripeCustomerId;

    // If no real customer exists, or if it was a mock one, create a new one
    if (!customerId || customerId.startsWith('cus_mock_')) {
      // Create new Stripe Customer
      const customer = await stripe.customers.create({
        email: user.email,
        name: user.name,
      });
      customerId = customer.id;
    }

    // Attach Payment Method to Customer
    const paymentMethod = await stripe.paymentMethods.attach(stripePaymentMethodId, {
      customer: customerId,
    });

    // Create the DB record with actual Stripe data
    const newAccount = await StripePaymentAccountModel.create({
      ownerType: "traveler",
      ownerId: user._id,
      purpose: "block_account",
      label,
      stripeCustomerId: customerId,
      stripePaymentMethodId: paymentMethod.id,
      card: {
        brand: paymentMethod.card?.brand,
        last4: paymentMethod.card?.last4,
        expMonth: paymentMethod.card?.exp_month,
        expYear: paymentMethod.card?.exp_year,
      },
      isActive: true,
      isBackup: false,
    });

    return NextResponse.json({ success: true, account: newAccount }, { status: 201 });
  } catch (err: any) {
    console.error("Stripe Account POST error:", err);
    return NextResponse.json({ error: err.message || "Internal server error" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const user = await UserModel.findOne({ email: session.user.email });
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    const body = await req.json();
    const { id, label } = body;

    if (!id) return NextResponse.json({ error: "Account ID is required" }, { status: 400 });

    const updatedAccount = await StripePaymentAccountModel.findOneAndUpdate(
      { _id: id, ownerId: user._id },
      { $set: { label } },
      { new: true }
    );

    if (!updatedAccount) {
      return NextResponse.json({ error: "Account not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, account: updatedAccount });
  } catch (err: any) {
    console.error("Stripe Account PUT error:", err);
    return NextResponse.json({ error: err.message || "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const user = await UserModel.findOne({ email: session.user.email });
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if (!id) return NextResponse.json({ error: "Account ID is required" }, { status: 400 });

    const account = await StripePaymentAccountModel.findOne({ _id: id, ownerId: user._id });
    if (!account) {
      return NextResponse.json({ error: "Account not found or unauthorized" }, { status: 404 });
    }

    // Detach from Stripe
    try {
      if (!account.stripePaymentMethodId.startsWith('pm_mock')) {
        await stripe.paymentMethods.detach(account.stripePaymentMethodId);
      }
    } catch (e) {
      console.warn("Could not detach from Stripe:", e);
    }

    account.isDeleted = true;
    account.deletedAt = new Date();
    await account.save();

    return NextResponse.json({ success: true, message: "Payment method removed" });
  } catch (err: any) {
    console.error("Stripe Account DELETE error:", err);
    return NextResponse.json({ error: err.message || "Internal server error" }, { status: 500 });
  }
}
