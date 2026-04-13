import { NextResponse } from 'next/server';
import { getStripeKey } from '@/lib/gcc/client';

export async function GET() {
  try {
    const data = await getStripeKey();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: 'Stripe-Key konnte nicht geladen werden.' },
      { status: 502 },
    );
  }
}
