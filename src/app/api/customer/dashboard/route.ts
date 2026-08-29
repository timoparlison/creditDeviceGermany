import { NextResponse } from 'next/server';
import { getDashboard } from '@/lib/customer/client';
import { errorResponse, requireToken } from '@/lib/customer/route-helpers';

export const runtime = 'edge';

export async function GET() {
  const token = await requireToken();
  if (token instanceof NextResponse) return token;

  try {
    const data = await getDashboard(token);
    return NextResponse.json(data);
  } catch (e) {
    return errorResponse(e);
  }
}
