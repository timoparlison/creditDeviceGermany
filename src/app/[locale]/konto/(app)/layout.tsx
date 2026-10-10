import { redirect } from 'next/navigation';
import { getLocale } from 'next-intl/server';
import { getPathname } from '@/i18n/navigation';
import { getAccount, getCustomerAccount } from '@/lib/customer/client';
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

  let shell: { account: Awaited<ReturnType<typeof getAccount>>; approved: boolean; customerNumber: string | null };
  try {
    const [account, customerAccount] = await Promise.all([getAccount(token), getCustomerAccount(token)]);
    shell = {
      account,
      approved: customerAccount?.status === 'APPROVED',
      customerNumber: customerAccount?.customerNumber ?? null,
    };
  } catch {
    // Cookie present but token rejected/expired — send to login.
    redirect(loginPath);
  }
  return (
    <AccountShell account={shell.account} approved={shell.approved} customerNumber={shell.customerNumber}>
      {children}
    </AccountShell>
  );
}
