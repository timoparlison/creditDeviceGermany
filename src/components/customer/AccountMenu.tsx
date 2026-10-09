'use client';

import { useTranslations } from 'next-intl';
import { UserRound } from 'lucide-react';
import { Link, useRouter } from '@/i18n/navigation';
import { useCustomerAuth } from './CustomerAuthProvider';

/** Compact account entry for the site header. */
export function AccountMenu({ onNavigate }: { onNavigate?: () => void }) {
  const t = useTranslations('Account');
  const router = useRouter();
  const { status, account, logout } = useCustomerAuth();

  const onLogout = async () => {
    await logout();
    onNavigate?.();
    router.replace('/');
  };

  if (status === 'authenticated' && account) {
    return (
      <div className="flex items-center gap-3">
        <Link
          href="/konto"
          onClick={onNavigate}
          className="flex items-center gap-1.5 text-navy hover:text-primary font-medium transition-colors"
        >
          <UserRound className="h-4 w-4" />
          {t('nav.myAccount')}
        </Link>
        <button
          type="button"
          onClick={onLogout}
          className="text-sm text-gray-500 hover:text-primary transition-colors"
        >
          {t('nav.logout')}
        </button>
      </div>
    );
  }

  return (
    <Link
      href="/konto/login"
      onClick={onNavigate}
      className="flex items-center gap-1.5 text-navy hover:text-primary font-medium transition-colors"
    >
      <UserRound className="h-4 w-4" />
      {t('login.submit')}
    </Link>
  );
}
