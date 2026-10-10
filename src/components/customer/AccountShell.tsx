'use client';

import { useTranslations } from 'next-intl';
import { FileText, KeyRound, LayoutDashboard, List, LogOut, ShoppingCart } from 'lucide-react';
import { Link, usePathname, useRouter } from '@/i18n/navigation';
import { Container } from '@/components/ui/Container';
import { useCustomerAuth } from './CustomerAuthProvider';
import type { Account } from '@/lib/customer/types';

type NavItem = {
  href: '/konto' | '/konto/bestellen' | '/konto/bestellungen' | '/konto/rechnungen' | '/konto/api-zugang';
  labelKey: string;
  icon: typeof LayoutDashboard;
  /** Only shown for approved customer accounts. */
  approvedOnly?: boolean;
};

const NAV: NavItem[] = [
  { href: '/konto', labelKey: 'nav.overview', icon: LayoutDashboard },
  { href: '/konto/bestellen', labelKey: 'nav.order', icon: ShoppingCart, approvedOnly: true },
  { href: '/konto/bestellungen', labelKey: 'nav.orders', icon: List, approvedOnly: true },
  { href: '/konto/rechnungen', labelKey: 'nav.invoices', icon: FileText, approvedOnly: true },
  { href: '/konto/api-zugang', labelKey: 'nav.api', icon: KeyRound, approvedOnly: true },
];

export function AccountShell({
  account,
  approved,
  customerNumber,
  children,
}: {
  account: Account;
  approved: boolean;
  customerNumber: string | null;
  children: React.ReactNode;
}) {
  const t = useTranslations('Account');
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useCustomerAuth();

  const onLogout = async () => {
    await logout();
    router.replace('/konto/login');
  };

  const displayName =
    [account.firstName, account.lastName].filter(Boolean).join(' ') || account.login;

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <Container>
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-navy">{t('nav.myAccount')}</h1>
          <p className="text-gray-600">
            {displayName}
            {customerNumber && (
              <span className="ml-2 text-gray-400">· {t('nav.customerNumber', { number: customerNumber })}</span>
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-8">
          <aside>
            <nav className="bg-white rounded-xl shadow-sm border border-gray-100 p-2">
              {NAV.filter((item) => approved || !item.approvedOnly).map((item) => {
                const active =
                  item.href === '/konto'
                    ? pathname === '/konto'
                    : pathname.startsWith(item.href);
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      active
                        ? 'bg-primary/10 text-primary'
                        : 'text-navy hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {t(item.labelKey)}
                  </Link>
                );
              })}
              <button
                type="button"
                onClick={onLogout}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-navy hover:bg-gray-50 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                {t('nav.logout')}
              </button>
            </nav>
          </aside>

          <div className="min-w-0">{children}</div>
        </div>
      </Container>
    </div>
  );
}
