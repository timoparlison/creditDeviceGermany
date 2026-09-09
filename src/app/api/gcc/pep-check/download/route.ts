import { NextRequest, NextResponse } from 'next/server';
import { downloadPepReport } from '@/lib/gcc/client';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  const firstLinkOrderUUID = req.nextUrl.searchParams.get('firstLinkOrderUUID');
  if (!firstLinkOrderUUID) {
    return NextResponse.json({ error: 'firstLinkOrderUUID fehlt.' }, { status: 400 });
  }

  const result = await downloadPepReport(firstLinkOrderUUID);
  if (!result.ok || !result.blob) {
    return NextResponse.json(
      { error: 'Report (noch) nicht verfügbar.' },
      { status: result.status || 502 },
    );
  }

  return new NextResponse(result.blob, {
    status: 200,
    headers: {
      'Content-Type': result.contentType ?? 'application/pdf',
      'Content-Disposition': `inline; filename="pep-check-${firstLinkOrderUUID}.pdf"`,
    },
  });
}
