import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/authOptions';
import { dbConnect } from '@/lib/db/connect';
import StripePaymentAccountModel from '@/models/payments/payment-account.model';
import { PAYMENT_OWNER_TYPE, PAYMENT_PURPOSE, CARD_BRAND } from '@/constants/payment/payment.const';

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();

    const paymentMethods = await StripePaymentAccountModel.find({
      ownerId: session.user.id,
      isDeleted: false,
    }).sort({ createdAt: -1 }).lean();

    return NextResponse.json(paymentMethods);
  } catch (err: unknown) {
    console.error('[GET /api/traveler/payment-methods]', err);
    return NextResponse.json({ error: 'Failed to fetch payment methods' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { cardNumber, expMonth, expYear, methodType, nameOnCard } = await req.json();

    if (!cardNumber || !expMonth || !expYear || !methodType) {
      return NextResponse.json({ error: 'Missing card details' }, { status: 400 });
    }

    await dbConnect();

    // Mock generating a Stripe PaymentMethod ID and Customer ID
    const mockPaymentMethodId = `pm_mock_${Math.random().toString(36).substring(2, 15)}`;
    const mockCustomerId = `cus_mock_${session.user.id.substring(0, 8)}`;
    
    let brand = CARD_BRAND.UNKNOWN;
    if (cardNumber.startsWith('4')) {
      brand = CARD_BRAND.VISA;
    } else if (cardNumber.startsWith('5')) {
      brand = CARD_BRAND.MASTERCARD;
    } else if (methodType === 'visa') {
        brand = CARD_BRAND.VISA;
    }

    const last4 = cardNumber.slice(-4);

    const newPaymentMethod = await StripePaymentAccountModel.create({
      ownerType: PAYMENT_OWNER_TYPE.TRAVELER,
      ownerId: session.user.id,
      purpose: PAYMENT_PURPOSE.BLOCK_ACCOUNT,
      stripeCustomerId: mockCustomerId,
      stripePaymentMethodId: mockPaymentMethodId,
      card: {
        brand,
        last4,
        expMonth: parseInt(expMonth),
        expYear: parseInt(expYear),
      },
      isActive: true,
      label: nameOnCard || `${brand.charAt(0).toUpperCase() + brand.slice(1)} •••• ${last4}`
    });

    return NextResponse.json(newPaymentMethod, { status: 201 });
  } catch (err: unknown) {
    console.error('[POST /api/traveler/payment-methods]', err);
    const errorMessage = err instanceof Error ? err.message : 'Internal server error';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
