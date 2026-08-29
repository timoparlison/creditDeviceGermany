// Server-side HTTP client for the registered-customer backend (GccOrder).
// Only ever imported from route handlers / server components — never shipped to
// the browser. The JWT lives in an httpOnly cookie; callers pass it explicitly.

import type {
  Account,
  AuthResponse,
  CreditBalance,
  CreditTransaction,
  CustomerDashboard,
  CustomerRegistrationRequest,
  DepositResponse,
  LoginRequest,
  Page,
  ProblemFieldError,
  ResetPasswordFinishRequest,
} from './types';

const BASE = process.env.GCC_BACKEND_URL ?? 'https://gccstage.herokuapp.com';

export class CustomerBackendError extends Error {
  constructor(
    message: string,
    public status: number,
    public fieldErrors?: ProblemFieldError[],
  ) {
    super(message);
    this.name = 'CustomerBackendError';
  }
}

type ProblemJson = {
  title?: string;
  detail?: string;
  message?: string;
  fieldErrors?: ProblemFieldError[];
};

function messageFromProblem(body: unknown, status: number): string {
  if (body && typeof body === 'object') {
    const p = body as ProblemJson;
    // JHipster localises `detail`; `title` is a stable fallback.
    return p.detail || p.title || p.message || `Backend ${status}`;
  }
  if (typeof body === 'string' && body.trim()) return body;
  return `Backend ${status}`;
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

async function request<T>(path: string, opts: RequestOptions = {}): Promise<T> {
  const url = new URL(`${BASE}${path}`);
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
    );
  }

  return parsed as T;
}

// --- Auth (F-001) ---------------------------------------------------------

export function authenticate(payload: LoginRequest): Promise<AuthResponse> {
  return request<AuthResponse>('/api/authenticate', { json: payload });
}

export function getAccount(token: string): Promise<Account> {
  return request<Account>('/api/account', { token });
}

export async function register(
  payload: CustomerRegistrationRequest,
): Promise<void> {
  await request<void>('/api/customer/register', { json: payload });
}

export async function activateAccount(key: string): Promise<void> {
  await request<void>('/api/activate', { method: 'GET', query: { key } });
}

export async function resetPasswordInit(email: string): Promise<void> {
  await request<void>('/api/account/reset-password/init', { text: email });
}

export async function resetPasswordFinish(
  payload: ResetPasswordFinishRequest,
): Promise<void> {
  await request<void>('/api/account/reset-password/finish', { json: payload });
}

// --- Dashboard (F-005) --------------------------------------------------

export function getDashboard(token: string): Promise<CustomerDashboard> {
  return request<CustomerDashboard>('/api/customer/dashboard', { token });
}

// --- Credit / Guthaben (F-002) ----------------------------------------

export function getCreditBalance(token: string): Promise<CreditBalance> {
  return request<CreditBalance>('/api/customer/credit/balance', { token });
}

export function getCreditTransactions(
  token: string,
  params: { page?: number; size?: number; sort?: string } = {},
): Promise<Page<CreditTransaction>> {
  return request<Page<CreditTransaction>>('/api/customer/credit/transactions', {
    token,
    query: {
      page: params.page ?? 0,
      size: params.size ?? 20,
      sort: params.sort ?? 'createdAt,desc',
    },
  });
}

export function createCreditDeposit(
  token: string,
  amount: number,
): Promise<DepositResponse> {
  return request<DepositResponse>('/api/customer/credit/deposit', {
    token,
    json: { amount },
  });
}

/**
 * Stripe publishable key. On the `feature/Bestellsystem` branch `/api/payment/**`
 * requires authentication, so this must be called with a session token.
 */
export function getStripeFeKey(token: string): Promise<{ stripeKey: string }> {
  return request<{ stripeKey: string }>('/api/payment/stripeFeKey', { token });
}
