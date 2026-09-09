import { NextRequest, NextResponse } from 'next/server';
import { submitPepCheck } from '@/lib/gcc/client';
import type { PepCheckOrderDto } from '@/lib/gcc/types';

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  const body = (await req.json()) as Partial<PepCheckOrderDto>;

  if (!body?.search?.name || !body?.paymentIntentId) {
    return NextResponse.json(
      { error: 'search.name und paymentIntentId sind erforderlich.' },
      { status: 400 },
    );
  }

  const result = await submitPepCheck(body as PepCheckOrderDto);

  if (result.ok && result.data) {
    return NextResponse.json(result.data, { status: 200 });
  }

  // Fehler-Bodies sind laut Backend leer – Entscheidung am Status.
  const headers: Record<string, string> = {};
  if (result.status === 429 && result.retryAfterSeconds !== undefined) {
    headers['X-Rate-Limit-Retry-After-Seconds'] = String(result.retryAfterSeconds);
  }
  return NextResponse.json(
    { error: 'pepCheck fehlgeschlagen.', retryAfterSeconds: result.retryAfterSeconds ?? null },
    { status: result.status || 502, headers },
  );
}
