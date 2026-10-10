import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getAccount } from '@/lib/customer/client';
import { getSessionToken } from '@/lib/customer/session';
import { ROLE_ADMIN, type Account } from '@/lib/customer/types';
import { AdminShell } from '@/components/admin/AdminShell';

export const runtime = 'edge';

export const metadata: Metadata = { title: 'CreditDevice Admin', robots: { index: false, follow: false } };

/** Admin guard: valid session with ROLE_ADMIN, otherwise back to the admin login. */
export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const token = await getSessionToken();
  if (!token) redirect('/admin/login/');

  let account: Account;
  try {
    account = await getAccount(token);
  } catch {
    redirect('/admin/login/');
  }
  if (!account.authorities.includes(ROLE_ADMIN)) redirect('/admin/login/?denied=1');

  return <AdminShell login={account.login}>{children}</AdminShell>;
}
