'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { apiPost, fieldErrorMap } from '@/lib/customer/api';
import { FormError, FormSuccess, SubmitButton, TextField } from './ui';

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirm: string;
};

const EMPTY: FormState = { firstName: '', lastName: '', email: '', password: '', confirm: '' };

export function RegisterForm() {
  const t = useTranslations('Account');
  const locale = useLocale();

  const [form, setForm] = useState<FormState>(EMPTY);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirm) {
      setFieldErrors({ confirm: t('resetPassword.mismatch') });
      return;
    }
    setLoading(true);
    setError(null);
    setFieldErrors({});

    const result = await apiPost('/api/customer/auth/register', {
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      password: form.password,
      langKey: locale,
    });

    if (!result.ok) {
      const { code } = result.error;
      if (code === 'error.emailexists' || code === 'error.userexists') {
        setError(t('register.emailExists'));
      } else {
        setError(t('register.error'));
        setFieldErrors(fieldErrorMap(result.error));
      }
      setLoading(false);
      return;
    }

    setDone(true);
    setLoading(false);
  };

  if (done) {
    return (
      <div className="space-y-4">
        <FormSuccess message={t('register.success')} />
        <Link
          href="/konto/login"
          className="block text-center text-primary hover:underline font-medium"
        >
          {t('register.loginLink')}
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <FormError message={error} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TextField
          label={t('register.firstName')}
          name="firstName"
          value={form.firstName}
          onChange={(v) => set('firstName', v)}
          required
          autoComplete="given-name"
          disabled={loading}
          error={fieldErrors.firstName}
        />
        <TextField
          label={t('register.lastName')}
          name="lastName"
          value={form.lastName}
          onChange={(v) => set('lastName', v)}
          required
          autoComplete="family-name"
          disabled={loading}
          error={fieldErrors.lastName}
        />
      </div>

      <TextField
        label={t('register.email')}
        name="email"
        type="email"
        value={form.email}
        onChange={(v) => set('email', v)}
        required
        autoComplete="email"
        disabled={loading}
        error={fieldErrors.email || fieldErrors.login}
        hint={t('register.emailHint')}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TextField
          label={t('register.password')}
          name="password"
          type="password"
          value={form.password}
          onChange={(v) => set('password', v)}
          required
          autoComplete="new-password"
          disabled={loading}
          error={fieldErrors.password}
          hint={t('register.passwordHint')}
        />
        <TextField
          label={t('resetPassword.confirmPassword')}
          name="confirm"
          type="password"
          value={form.confirm}
          onChange={(v) => set('confirm', v)}
          required
          autoComplete="new-password"
          disabled={loading}
          error={fieldErrors.confirm}
        />
      </div>

      <p className="text-xs text-gray-500">{t('register.nextStepHint')}</p>

      <SubmitButton loading={loading}>{t('register.submit')}</SubmitButton>

      <p className="text-sm text-gray-600 text-center">
        {t('register.haveAccount')}{' '}
        <Link href="/konto/login" className="text-primary hover:underline font-medium">
          {t('register.loginLink')}
        </Link>
      </p>
    </form>
  );
}
