import { NextRequest, NextResponse } from 'next/server';
import { submitCreditInformation } from '@/lib/gcc/client';
import type { CreditInformationOrderDto } from '@/lib/gcc/types';

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  const body = (await req.json()) as CreditInformationOrderDto;
  if (!body?.creditSafeObjectId || !body?.reportType) {
    return NextResponse.json(
      { error: 'creditSafeObjectId und reportType sind erforderlich.' },
      { status: 400 },
    );
  }
  const result = await submitCreditInformation(body);
  return NextResponse.json(
    result.ok ? { ok: true } : { error: 'Bestellung fehlgeschlagen.', details: result.body },
    { status: result.status },
  );
}
