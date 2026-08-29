'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { apiPost, fieldErrorMap } from '@/lib/customer/api';
import { FormError, FormSuccess, SubmitButton, TextField } from './ui';
import type { CustomerError } from '@/lib/customer/types';

type FormState = {
  login: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  street: string;
  zip: string;
  city: string;
  country: string;
  vatId: string;
};

const EMPTY: FormState = {
  login: '',
  password: '',
  firstName: '',
  lastName: '',
  email: '',
  company: '',
  street: '',
  zip: '',
  city: '',
  country: 'DE',
  vatId: '',
};

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
    setLoading(true);
    setError(null);
    setFieldErrors({});

    const result = await apiPost('/api/customer/auth/register', {
      ...form,
      vatId: form.vatId || undefined,
      langKey: locale,
    });

    if (!result.ok) {
      const err = result.error as CustomerError;
      setError(err.message || t('register.error'));
      setFieldErrors(fieldErrorMap(err));
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
        error={fieldErrors.email}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TextField
          label={t('register.username')}
          name="login"
          value={form.login}
          onChange={(v) => set('login', v)}
          required
          autoComplete="username"
          disabled={loading}
          error={fieldErrors.login}
          hint={t('register.usernameHint')}
        />
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
      </div>

      <TextField
        label={t('register.company')}
        name="company"
        value={form.company}
        onChange={(v) => set('company', v)}
        required
        autoComplete="organization"
        disabled={loading}
        error={fieldErrors.company}
      />
      <TextField
        label={t('register.street')}
        name="street"
        value={form.street}
        onChange={(v) => set('street', v)}
        required
        autoComplete="street-address"
        disabled={loading}
        error={fieldErrors.street}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <TextField
          label={t('register.zip')}
          name="zip"
          value={form.zip}
          onChange={(v) => set('zip', v)}
          required
          autoComplete="postal-code"
          disabled={loading}
          error={fieldErrors.zip}
        />
        <TextField
          label={t('register.city')}
          name="city"
          value={form.city}
          onChange={(v) => set('city', v)}
          required
          autoComplete="address-level2"
          disabled={loading}
          error={fieldErrors.city}
        />
        <TextField
          label={t('register.country')}
          name="country"
          value={form.country}
          onChange={(v) => set('country', v)}
          autoComplete="country"
          disabled={loading}
          error={fieldErrors.country}
        />
      </div>

      <TextField
        label={t('register.vatId')}
        name="vatId"
        value={form.vatId}
        onChange={(v) => set('vatId', v)}
        disabled={loading}
        error={fieldErrors.vatId}
      />

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
