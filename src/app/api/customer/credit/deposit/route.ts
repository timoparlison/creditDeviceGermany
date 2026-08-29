import { NextRequest, NextResponse } from 'next/server';
import { createCreditDeposit } from '@/lib/customer/client';
import { errorResponse, requireToken } from '@/lib/customer/route-helpers';

export const runtime = 'edge';

const MIN_DEPOSIT = 10;

export async function POST(req: NextRequest) {
  const token = await requireToken();
  if (token instanceof NextResponse) return token;

  let body: { amount?: number };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ message: 'Ungültige Anfrage.', status: 400 }, { status: 400 });
  }

  const amount = Number(body.amount);
  if (!Number.isFinite(amount) || amount < MIN_DEPOSIT) {
    return NextResponse.json(
      { message: `Der Mindestbetrag beträgt ${MIN_DEPOSIT},00 €.`, status: 400 },
      { status: 400 },
    );
  }

  try {
    const data = await createCreditDeposit(token, Math.round(amount * 100) / 100);
    return NextResponse.json(data);
  } catch (e) {
    return errorResponse(e);
  }
}
