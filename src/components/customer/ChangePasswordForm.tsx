'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { apiPost } from '@/lib/customer/api';
import { FormError, FormSuccess, TextField } from './ui';

export function ChangePasswordForm() {
  const t = useTranslations('Account');
  const [current, setCurrent] = useState('');
  const [next, setNext] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ok, setOk] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setOk(false);
    if (next !== confirm) {
      setError(t('resetPassword.mismatch'));
      return;
    }
    setLoading(true);
    setError(null);
    const res = await apiPost('/api/customer/auth/change-password', { currentPassword: current, newPassword: next });
    setLoading(false);
    if (!res.ok) {
      setError(t('password.error'));
      return;
    }
    setOk(true);
    setCurrent('');
    setNext('');
    setConfirm('');
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <FormError message={error} />
      <FormSuccess message={ok ? t('password.success') : null} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <TextField label={t('password.current')} name="currentPassword" type="password" value={current} onChange={setCurrent} required autoComplete="current-password" disabled={loading} />
        <TextField label={t('resetPassword.newPassword')} name="newPassword" type="password" value={next} onChange={setNext} required autoComplete="new-password" disabled={loading} />
        <TextField label={t('resetPassword.confirmPassword')} name="confirmPassword" type="password" value={confirm} onChange={setConfirm} required autoComplete="new-password" disabled={loading} />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="px-5 py-2 rounded-md border border-gray-300 text-navy font-semibold hover:bg-gray-50 disabled:opacity-60"
      >
        {t('password.submit')}
      </button>
    </form>
  );
}
