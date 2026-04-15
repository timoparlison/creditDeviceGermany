import { NextRequest, NextResponse } from 'next/server';
import { downloadCreditInformation } from '@/lib/gcc/client';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  const creditSafeObjectId = req.nextUrl.searchParams.get('creditSafeObjectId');
  if (!creditSafeObjectId) {
    return NextResponse.json({ error: 'creditSafeObjectId fehlt.' }, { status: 400 });
  }
  const result = await downloadCreditInformation(creditSafeObjectId);
  if (!result.ok || !result.blob) {
    return NextResponse.json(
      { error: 'Download fehlgeschlagen.' },
      { status: result.status || 502 },
    );
  }
  return new NextResponse(result.blob, {
    status: 200,
    headers: {
      'Content-Type': result.contentType ?? 'application/pdf',
      'Content-Disposition': `inline; filename="creditinformation${creditSafeObjectId}.pdf"`,
    },
  });
}
