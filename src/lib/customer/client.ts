// Server-side HTTP client for the customer portal / admin backend (GccOrder, Bestellsystem V2).
// Only ever imported from route handlers / server components — never shipped to
// the browser. The JWT lives in an httpOnly cookie; callers pass it explicitly.

import type {
  Account,
  AccountOverview,
  AuthResponse,
  CollectiveInvoiceView,
  CustomerAccount,
  LoginRequest,
  PriceQuote,
  ProblemFieldError,
  RegistrationRequest,
  ResetPasswordFinishRequest,
} from './types';

export const BACKEND_BASE = process.env.GCC_BACKEND_URL ?? 'https://gccstage.herokuapp.com';

export class CustomerBackendError extends Error {
  constructor(
    message: string,
    public status: number,
    public fieldErrors?: ProblemFieldError[],
    /** Backend message key, e.g. 'error.creditLimitExceeded'. */
    public code?: string,
  ) {
    super(message);
    this.name = 'CustomerBackendError';
  }
}

export type ProblemJson = {
  title?: string;
  detail?: string;
  message?: string;
  fieldErrors?: ProblemFieldError[];
};

export function messageFromProblem(body: unknown, status: number): string {
  if (body && typeof body === 'object') {
    const p = body as ProblemJson;
    // JHipster localises `detail`; `title` is a stable fallback.
    return p.detail || p.title || p.message || `Backend ${status}`;
  }
  if (typeof body === 'string' && body.trim()) return body;
  return `Backend ${status}`;
}

/** JHipster puts the translation key (`error.xyz`) into `message`. */
export function codeFromProblem(body: unknown): string | undefined {
  if (body && typeof body === 'object') {
    const m = (body as ProblemJson).message;
    if (typeof m === 'string' && m.startsWith('error.')) return m;
  }
  return undefined;
}

type RequestOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  token?: string;
  /** JSON body; omitted for GET. */
  json?: unknown;
  /** Raw text body (used for reset-password/init which is text/plain). */
  text?: string;
  query?: Record<string, string | number | undefined>;
};

export async function request<T>(path: string, opts: RequestOptions = {}): Promise<T> {
  const url = new URL(`${BACKEND_BASE}${path}`);
  if (opts.query) {
    for (const [k, v] of Object.entries(opts.query)) {
      if (v !== undefined) url.searchParams.set(k, String(v));
    }
  }

  const headers: Record<string, string> = {};
  if (opts.token) headers.Authorization = `Bearer ${opts.token}`;
  let body: string | undefined;
  if (opts.json !== undefined) {
    headers['Content-Type'] = 'application/json';
    body = JSON.stringify(opts.json);
  } else if (opts.text !== undefined) {
    headers['Content-Type'] = 'text/plain';
    body = opts.text;
  }

  // NOTE: no `cache` option — the Cloudflare Workers runtime throws on it.
  const res = await fetch(url.toString(), {
    method: opts.method ?? (body ? 'POST' : 'GET'),
    headers,
    body,
  });

  const raw = await res.text();
  let parsed: unknown;
  try {
    parsed = raw ? JSON.parse(raw) : undefined;
  } catch {
    parsed = raw || undefined;
  }

  if (!res.ok) {
    const p = (parsed ?? {}) as ProblemJson;
    throw new CustomerBackendError(
      messageFromProblem(parsed, res.status),
      res.status,
      p.fieldErrors,
      codeFromProblem(parsed),
    );
  }

  return parsed as T;
}

// --- Auth (JHipster) ------------------------------------------------------

export function authenticate(payload: LoginRequest): Promise<AuthResponse> {
  return request<AuthResponse>('/api/authenticate', { json: payload });
}

export function getAccount(token: string): Promise<Account> {
  return request<Account>('/api/account', { token });
}

export async function register(payload: RegistrationRequest): Promise<void> {
  await request<void>('/api/register', { json: payload });
}

export async function activateAccount(key: string): Promise<void> {
  await request<void>('/api/activate', { method: 'GET', query: { key } });
}

export async function resetPasswordInit(email: string): Promise<void> {
  await request<void>('/api/account/reset-password/init', { text: email });
}

export async function resetPasswordFinish(payload: ResetPasswordFinishRequest): Promise<void> {
  await request<void>('/api/account/reset-password/finish', { json: payload });
}

// --- Portal ------------------------------------------------------------------

/** Own customer account, or `null` if no application was submitted yet (backend 404). */
export async function getCustomerAccount(token: string): Promise<CustomerAccount | null> {
  try {
    return await request<CustomerAccount>('/api/portal/account', { token });
  } catch (e) {
    if (e instanceof CustomerBackendError && e.status === 404) return null;
    throw e;
  }
}

export function getAccountOverview(token: string): Promise<AccountOverview> {
  return request<AccountOverview>('/api/portal/account/overview', { token });
}

/** Own prices incl. discount and VAT; without filter one row per product and price zone. */
export function getPrices(
  token: string,
  filter: { country?: string; creditSafeObjectId?: string } = {},
): Promise<PriceQuote[]> {
  return request<PriceQuote[]>('/api/portal/prices', { token, query: filter });
}

export function getInvoices(token: string): Promise<CollectiveInvoiceView[]> {
  return request<CollectiveInvoiceView[]>('/api/portal/invoices', { token });
}
