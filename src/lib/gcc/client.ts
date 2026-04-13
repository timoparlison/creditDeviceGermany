import 'server-only';
import type {
  Company,
  CreatePaymentRequest,
  CreatePaymentResponse,
  CreditInformationOrderDto,
  CustomerQueryResult,
  StripeKeyResponse,
} from './types';

const BASE = process.env.GCC_BACKEND_URL ?? 'https://gccstage.herokuapp.com';

export class GccBackendError extends Error {
  constructor(
    message: string,
    public status: number,
    public body?: unknown,
  ) {
    super(message);
  }
}

async function jsonOrThrow<T>(res: Response): Promise<T> {
  const text = await res.text();
  let body: unknown;
  try {
    body = text ? JSON.parse(text) : undefined;
  } catch {
    body = text;
  }
  if (!res.ok) {
    throw new GccBackendError(`Backend ${res.status}`, res.status, body);
  }
  return body as T;
}

export async function searchCompanies(params: {
  name: string;
  countries: string;
  page?: number;
  size?: number;
}): Promise<CustomerQueryResult> {
  const url = new URL(`${BASE}/api/customer-query-results`);
  url.searchParams.set('name', params.name);
  url.searchParams.set('countries', params.countries);
  url.searchParams.set('page', String(params.page ?? 1));
  url.searchParams.set('size', String(params.size ?? 20));
  url.searchParams.set('sort', 'id,asc');
  const res = await fetch(url.toString(), { cache: 'no-store' });
  return jsonOrThrow<CustomerQueryResult>(res);
}

export async function getCompanyById(id: string): Promise<Company | null> {
  const url = new URL(`${BASE}/api/customer-query-results`);
  url.searchParams.set('id', id);
  url.searchParams.set('page', '1');
  url.searchParams.set('size', '10');
  url.searchParams.set('countries', (id.split('-')[0] ?? 'de').toLowerCase());
  url.searchParams.set('sort', 'id,asc');
  const res = await fetch(url.toString(), { cache: 'no-store' });
  const data = await jsonOrThrow<CustomerQueryResult>(res);
  return data.companies?.[0] ?? null;
}

export async function getStripeKey(): Promise<StripeKeyResponse> {
  const res = await fetch(`${BASE}/api/payment/stripeFeKey`, { cache: 'no-store' });
  return jsonOrThrow<StripeKeyResponse>(res);
}

export async function createPaymentIntent(
  body: CreatePaymentRequest,
): Promise<CreatePaymentResponse> {
  const res = await fetch(`${BASE}/api/payment/create-payment-intent`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    cache: 'no-store',
  });
  return jsonOrThrow<CreatePaymentResponse>(res);
}

export async function cancelPaymentIntent(clientSecret: string): Promise<void> {
  await fetch(`${BASE}/api/payment/cancel-payment-intent`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(clientSecret),
    cache: 'no-store',
  });
}

export async function submitCreditInformation(
  body: CreditInformationOrderDto,
): Promise<{ ok: boolean; status: number; body?: unknown }> {
  const res = await fetch(`${BASE}/api/creditInformation`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    cache: 'no-store',
  });
  const text = await res.text();
  let body_: unknown;
  try {
    body_ = text ? JSON.parse(text) : undefined;
  } catch {
    body_ = text;
  }
  return { ok: res.ok, status: res.status, body: body_ };
}
