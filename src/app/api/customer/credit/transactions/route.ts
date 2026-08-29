import { NextRequest, NextResponse } from 'next/server';
import { getCreditTransactions } from '@/lib/customer/client';
import { errorResponse, requireToken } from '@/lib/customer/route-helpers';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  const token = await requireToken();
  if (token instanceof NextResponse) return token;

  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get('page') ?? '0');
  const size = Number(searchParams.get('size') ?? '20');
  const sort = searchParams.get('sort') ?? 'createdAt,desc';

  try {
    const data = await getCreditTransactions(token, {
      page: Number.isFinite(page) ? page : 0,
      size: Number.isFinite(size) ? Math.min(size, 100) : 20,
      sort,
    });
    return NextResponse.json(data);
  } catch (e) {
    return errorResponse(e);
  }
}
