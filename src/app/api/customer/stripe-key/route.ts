import { NextResponse } from 'next/server';
import { getStripeFeKey } from '@/lib/customer/client';
import { errorResponse, requireToken } from '@/lib/customer/route-helpers';

export const runtime = 'edge';

/** Authenticated proxy for the Stripe publishable key (customer area). */
export async function GET() {
  const token = await requireToken();
  if (token instanceof NextResponse) return token;

  try {
    const data = await getStripeFeKey(token);
    return NextResponse.json(data);
  } catch (e) {
    return errorResponse(e);
  }
}
