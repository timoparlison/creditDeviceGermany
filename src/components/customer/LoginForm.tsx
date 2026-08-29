'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { apiPost } from '@/lib/customer/api';
import { useCustomerAuth } from './CustomerAuthProvider';
import { FormError, SubmitButton, TextField } from './ui';
import type { Account } from '@/lib/customer/types';

export function LoginForm() {
  const t = useTranslations('Account');
  const router = useRouter();
  const params = useSearchParams();
  const { refresh } = useCustomerAuth();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const result = await apiPost<{ account: Account }>('/api/customer/auth/login', {
      username,
      password,
      rememberMe,
    });

    if (!result.ok) {
      if (result.error.code === 'NOT_ACTIVATED') {
        setError(t('login.notActivated'));
      } else if (result.error.status === 401) {
        setError(t('login.error'));
      } else {
        setError(result.error.message);
      }
      setLoading(false);
      return;
    }

    if (!result.data.account.activated) {
      setError(t('login.notActivated'));
      setLoading(false);
      return;
    }

    await refresh();
    const redirect = params.get('redirect');
    router.replace(redirect && redirect.startsWith('/') ? redirect : '/konto');
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <FormError message={error} />

      <TextField
        label={t('login.username')}
        name="username"
        value={username}
        onChange={setUsername}
        required
        autoComplete="username"
        disabled={loading}
      />
      <TextField
        label={t('login.password')}
        name="password"
        type="password"
        value={password}
        onChange={setPassword}
        required
        autoComplete="current-password"
        disabled={loading}
      />

      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center gap-2 text-gray-700">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            disabled={loading}
            className="rounded border-gray-300 text-primary focus:ring-primary"
          />
          {t('login.rememberMe')}
        </label>
        <Link href="/konto/passwort-vergessen" className="text-primary hover:underline">
          {t('login.forgotPassword')}
        </Link>
      </div>

      <SubmitButton loading={loading}>{t('login.submit')}</SubmitButton>

      <p className="text-sm text-gray-600 text-center">
        {t('login.noAccount')}{' '}
        <Link href="/konto/registrieren" className="text-primary hover:underline font-medium">
          {t('login.registerLink')}
        </Link>
      </p>
    </form>
  );
}
