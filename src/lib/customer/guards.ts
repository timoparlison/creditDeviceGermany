// Server-side guards for portal pages (server components only).

import { redirect } from 'next/navigation';
import { getPathname } from '@/i18n/navigation';
import { getCustomerAccount } from './client';
import { getSessionToken } from './session';
import type { CustomerAccount } from './types';

/** Returns token + account of an APPROVED customer, otherwise redirects to login or the account home. */
export async function requireApprovedAccount(
  locale: string,
): Promise<{ token: string; account: CustomerAccount }> {
  const token = await getSessionToken();
  if (!token) redirect(getPathname({ href: '/konto/login', locale }));
  const account = await getCustomerAccount(token);
  if (!account || account.status !== 'APPROVED') redirect(getPathname({ href: '/konto', locale }));
  return { token, account };
}
