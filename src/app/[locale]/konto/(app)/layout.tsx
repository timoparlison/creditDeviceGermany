import { redirect } from 'next/navigation';
import { getLocale } from 'next-intl/server';
import { getPathname } from '@/i18n/navigation';
import { getAccount } from '@/lib/customer/client';
import { getSessionToken } from '@/lib/customer/session';
import { AccountShell } from '@/components/customer/AccountShell';

export const runtime = 'edge';

export default async function AccountAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const loginPath = getPathname({ href: '/konto/login', locale });

  const token = await getSessionToken();
  if (!token) redirect(loginPath);

  try {
    const account = await getAccount(token);
    return <AccountShell account={account}>{children}</AccountShell>;
  } catch {
    // Cookie present but token rejected/expired — send to login.
    redirect(loginPath);
  }
}
