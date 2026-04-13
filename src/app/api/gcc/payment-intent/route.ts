import { NextRequest, NextResponse } from 'next/server';
import { createPaymentIntent, GccBackendError } from '@/lib/gcc/client';
import type { CreatePaymentRequest } from '@/lib/gcc/types';

export async function POST(req: NextRequest) {
  const body = (await req.json()) as Partial<CreatePaymentRequest>;
  if (!body.objectId || !body.productName) {
    return NextResponse.json(
      { error: 'objectId und productName sind erforderlich.' },
      { status: 400 },
    );
  }
  try {
    const data = await createPaymentIntent({
      objectId: body.objectId,
      productName: body.productName,
      id: body.id ?? '',
      vatId: body.vatId ?? null,
    });
    return NextResponse.json(data);
  } catch (e) {
    if (e instanceof GccBackendError) {
      return NextResponse.json(
        { error: 'Payment Intent konnte nicht erstellt werden.', details: e.body },
        { status: e.status },
      );
    }
    return NextResponse.json({ error: 'Backend-Fehler.' }, { status: 502 });
  }
}
