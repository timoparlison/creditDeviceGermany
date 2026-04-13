import { NextRequest, NextResponse } from 'next/server';
import { GccBackendError, searchCompanies } from '@/lib/gcc/client';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get('name')?.trim() ?? '';
  const countries = searchParams.get('countries') ?? 'de';
  const page = Number(searchParams.get('page') ?? '1');
  const size = Number(searchParams.get('size') ?? '20');

  if (name.length < 2) {
    return NextResponse.json(
      { error: 'Bitte mindestens 2 Zeichen eingeben.' },
      { status: 400 },
    );
  }

  try {
    const data = await searchCompanies({ name, countries, page, size });
    return NextResponse.json(data);
  } catch (e) {
    if (e instanceof GccBackendError) {
      return NextResponse.json(
        { error: 'Suche fehlgeschlagen.', details: e.body },
        { status: e.status },
      );
    }
    return NextResponse.json(
      { error: 'Backend nicht erreichbar.' },
      { status: 502 },
    );
  }
}
