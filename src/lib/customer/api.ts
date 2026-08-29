// Client-side fetch helpers for the /api/customer/** BFF routes.
// Safe to import into 'use client' components.

import type { CustomerError } from './types';

export type ApiResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: CustomerError };

async function toResult<T>(res: Response): Promise<ApiResult<T>> {
  let body: unknown;
  try {
    body = await res.json();
  } catch {
    body = undefined;
  }

  if (res.ok) {
    return { ok: true, data: (body ?? undefined) as T };
  }

  const b = (body ?? {}) as Partial<CustomerError>;
  return {
    ok: false,
    error: {
      message: b.message || 'Es ist ein Fehler aufgetreten.',
      status: b.status ?? res.status,
      code: b.code,
      fieldErrors: b.fieldErrors,
    },
  };
}

export async function apiPost<T = unknown>(
  path: string,
  body?: unknown,
): Promise<ApiResult<T>> {
  try {
    const res = await fetch(path, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: body === undefined ? undefined : JSON.stringify(body),
    });
    return toResult<T>(res);
  } catch {
    return {
      ok: false,
      error: { message: 'Server nicht erreichbar.', status: 0 },
    };
  }
}

export async function apiGet<T = unknown>(path: string): Promise<ApiResult<T>> {
  try {
    const res = await fetch(path, { headers: { Accept: 'application/json' } });
    return toResult<T>(res);
  } catch {
    return {
      ok: false,
      error: { message: 'Server nicht erreichbar.', status: 0 },
    };
  }
}

/** Flattens fieldErrors to a `{ field: message }` map for form rendering. */
export function fieldErrorMap(error: CustomerError | undefined): Record<string, string> {
  const map: Record<string, string> = {};
  for (const fe of error?.fieldErrors ?? []) {
    if (fe.field && !map[fe.field]) map[fe.field] = fe.message;
  }
  return map;
}
