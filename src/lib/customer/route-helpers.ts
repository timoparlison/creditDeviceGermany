// Shared helpers for the /api/customer/** BFF route handlers.

import { NextResponse } from 'next/server';
import { CustomerBackendError } from './client';
import { getSessionToken } from './session';

/** Maps a thrown error to a JSON response the client-side forms understand. */
export function errorResponse(e: unknown): NextResponse {
  if (e instanceof CustomerBackendError) {
    return NextResponse.json(
      { message: e.message, fieldErrors: e.fieldErrors ?? undefined, status: e.status },
      { status: e.status },
    );
  }
  return NextResponse.json(
    { message: 'Backend nicht erreichbar.', status: 502 },
    { status: 502 },
  );
}

/**
 * Reads the session token; returns it, or a 401 response if there is none.
 * Usage: `const token = await requireToken(); if (token instanceof NextResponse) return token;`
 */
export async function requireToken(): Promise<string | NextResponse> {
  const token = await getSessionToken();
  if (!token) {
    return NextResponse.json(
      { message: 'Nicht angemeldet.', status: 401 },
      { status: 401 },
    );
  }
  return token;
}
