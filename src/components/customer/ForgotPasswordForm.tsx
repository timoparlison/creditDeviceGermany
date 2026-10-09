'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { apiPost } from '@/lib/customer/api';
import { FormError, FormSuccess, SubmitButton, TextField } from './ui';

export function ForgotPasswordForm() {
  const t = useTranslations('Account');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const result = await apiPost('/api/customer/auth/reset-password/init', { email });
    if (!result.ok) {
      setError(result.error.message);
      setLoading(false);
      return;
    }
    setDone(true);
    setLoading(false);
  };

  if (done) {
    return (
      <div className="space-y-4">
        <FormSuccess message={t('forgotPassword.success')} />
        <Link
          href="/konto/login"
          className="block text-center text-primary hover:underline font-medium"
        >
          {t('forgotPassword.backToLogin')}
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <FormError message={error} />
      <TextField
        label={t('forgotPassword.email')}
        name="email"
        type="email"
        value={email}
        onChange={setEmail}
        required
        autoComplete="email"
        disabled={loading}
      />
      <SubmitButton loading={loading}>{t('forgotPassword.submit')}</SubmitButton>
      <Link
        href="/konto/login"
        className="block text-center text-sm text-gray-600 hover:text-primary"
      >
        {t('forgotPassword.backToLogin')}
      </Link>
    </form>
  );
}
