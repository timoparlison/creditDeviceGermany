// Generic BFF pass-through for the portal and admin APIs. The route handlers under
// src/app/api/customer/portal/[...path] and src/app/api/admin/[...path] forward the request
// with the session JWT as Bearer token; authorisation is enforced by the backend.

import { NextRequest, NextResponse } from 'next/server';
import { BACKEND_BASE, codeFromProblem, messageFromProblem, type ProblemJson } from './client';
import { SESSION_COOKIE } from './constants';

/** Response headers the client needs (paging, PDF downloads, test mode). */
const PASS_HEADERS = ['content-type', 'content-disposition', 'x-total-count', 'x-test-mode'];

type Params = { params: Promise<{ path?: string[] }> };

export function createProxy(backendPrefix: '/api/portal' | '/api/admin') {
  return async function handler(req: NextRequest, { params }: Params): Promise<Response> {
    const token = req.cookies.get(SESSION_COOKIE)?.value;
    if (!token) {
      return NextResponse.json({ message: 'Nicht angemeldet.', status: 401 }, { status: 401 });
    }

    const { path = [] } = await params;
    if (path.some((seg) => seg === '..' || seg === '.' || seg === '')) {
      return NextResponse.json({ message: 'Ungültiger Pfad.', status: 400 }, { status: 400 });
    }
    const target = `${BACKEND_BASE}${backendPrefix}/${path.map(encodeURIComponent).join('/')}${req.nextUrl.search}`;

    const headers: Record<string, string> = {
      Authorization: `Bearer ${token}`,
      Accept: req.headers.get('accept') ?? 'application/json',
    };
    const hasBody = req.method !== 'GET' && req.method !== 'HEAD';
    const body = hasBody ? await req.text() : undefined;
    if (body) headers['Content-Type'] = req.headers.get('content-type') ?? 'application/json';

    let res: Response;
    try {
      // NOTE: no `cache` option — the Cloudflare Workers runtime throws on it.
      res = await fetch(target, { method: req.method, headers, body: body || undefined });
    } catch {
      return NextResponse.json({ message: 'Backend nicht erreichbar.', status: 502 }, { status: 502 });
    }

    if (!res.ok) {
      const raw = await res.text();
      let parsed: unknown;
      try {
        parsed = raw ? JSON.parse(raw) : undefined;
      } catch {
        parsed = raw || undefined;
      }
      return NextResponse.json(
        {
          message: messageFromProblem(parsed, res.status),
          code: codeFromProblem(parsed),
          fieldErrors: (parsed as ProblemJson | undefined)?.fieldErrors,
          status: res.status,
        },
        { status: res.status },
      );
    }

    const out = new Headers();
    for (const h of PASS_HEADERS) {
      const v = res.headers.get(h);
      if (v) out.set(h, v);
    }
    return new Response(res.body, { status: res.status, headers: out });
  };
}
