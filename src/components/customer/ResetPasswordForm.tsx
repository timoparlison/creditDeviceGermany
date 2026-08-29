'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { apiPost } from '@/lib/customer/api';
import { FormError, FormSuccess, SubmitButton, TextField } from './ui';

export function ResetPasswordForm() {
  const t = useTranslations('Account');
  const params = useSearchParams();
  const key = params.get('key') ?? '';

  const [newPassword, setNewPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  if (!key) {
    return <FormError message={t('resetPassword.missingKey')} />;
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirm) {
      setError(t('resetPassword.mismatch'));
      return;
    }
    setLoading(true);
    setError(null);

    const result = await apiPost('/api/customer/auth/reset-password/finish', {
      key,
      newPassword,
    });
    if (!result.ok) {
      setError(result.error.status === 400 ? t('resetPassword.invalidKey') : result.error.message);
      setLoading(false);
      return;
    }
    setDone(true);
    setLoading(false);
  };

  if (done) {
    return (
      <div className="space-y-4">
        <FormSuccess message={t('resetPassword.success')} />
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
        label={t('resetPassword.newPassword')}
        name="newPassword"
        type="password"
        value={newPassword}
        onChange={setNewPassword}
        required
        autoComplete="new-password"
        disabled={loading}
      />
      <TextField
        label={t('resetPassword.confirmPassword')}
        name="confirmPassword"
        type="password"
        value={confirm}
        onChange={setConfirm}
        required
        autoComplete="new-password"
        disabled={loading}
      />
      <SubmitButton loading={loading}>{t('resetPassword.submit')}</SubmitButton>
    </form>
  );
}
