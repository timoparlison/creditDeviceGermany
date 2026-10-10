'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { apiPost, fieldErrorMap } from '@/lib/customer/api';
import { APPLICATION_COUNTRIES, LEGITIMATE_INTERESTS, countryName } from '@/lib/customer/countries';
import type { CustomerAccount, CustomerApplication } from '@/lib/customer/types';
import { FormError, SelectField, SubmitButton, TextField } from './ui';

type Props = {
  /** Prefill: previous (rejected) application, or name/e-mail of the logged-in user. */
  initial: Partial<CustomerApplication>;
};

export function ApplicationForm({ initial }: Props) {
  const t = useTranslations('Account');
  const locale = useLocale();
  const router = useRouter();

  const [form, setForm] = useState<CustomerApplication>({
    company: initial.company ?? '',
    firstname: initial.firstname ?? '',
    lastname: initial.lastname ?? '',
    email: initial.email ?? '',
    street: initial.street ?? '',
    zip: initial.zip ?? '',
    city: initial.city ?? '',
    country: initial.country ?? 'DE',
    vatId: initial.vatId ?? '',
    legitimate: initial.legitimate ?? LEGITIMATE_INTERESTS[0].value,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const set = <K extends keyof CustomerApplication>(key: K, value: CustomerApplication[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const countryOptions = useMemo(
    () =>
      APPLICATION_COUNTRIES.map((c) => ({ value: c, label: countryName(c, locale) })).sort((a, b) =>
        a.value === 'DE' ? -1 : b.value === 'DE' ? 1 : a.label.localeCompare(b.label, locale),
      ),
    [locale],
  );
  const legitimateOptions: { value: string; label: string }[] = LEGITIMATE_INTERESTS.map((o) => ({
    value: o.value,
    label: t(`application.legitimateOptions.${o.key}`),
  }));
  // Keep a previously stored free-text reason selectable.
  if (!legitimateOptions.some((o) => o.value === form.legitimate)) {
    legitimateOptions.push({ value: form.legitimate, label: form.legitimate });
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setFieldErrors({});

    const result = await apiPost<CustomerAccount>('/api/customer/portal/application', {
      ...form,
      vatId: form.vatId?.trim() || undefined,
    });

    if (!result.ok) {
      if (result.error.status === 409) {
        // Application already exists (e.g. submitted in another tab) — show the current status.
        router.refresh();
        return;
      }
      setError(t('application.error'));
      setFieldErrors(fieldErrorMap(result.error));
      setLoading(false);
      return;
    }
    router.refresh();
  };

  const field = (key: keyof CustomerApplication) => ({
    name: key,
    value: String(form[key] ?? ''),
    onChange: (v: string) => set(key, v),
    disabled: loading,
    error: fieldErrors[key],
  });

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <FormError message={error} />

      <TextField label={t('application.company')} required autoComplete="organization" {...field('company')} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TextField label={t('register.firstName')} required autoComplete="given-name" {...field('firstname')} />
        <TextField label={t('register.lastName')} required autoComplete="family-name" {...field('lastname')} />
      </div>
      <TextField
        label={t('application.email')}
        type="email"
        required
        autoComplete="email"
        hint={t('application.emailHint')}
        {...field('email')}
      />
      <TextField label={t('application.street')} required autoComplete="street-address" {...field('street')} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <TextField label={t('application.zip')} required autoComplete="postal-code" {...field('zip')} />
        <div className="md:col-span-2">
          <TextField label={t('application.city')} required autoComplete="address-level2" {...field('city')} />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SelectField label={t('application.country')} required options={countryOptions} {...field('country')} />
        <TextField label={t('application.vatId')} hint={t('application.vatIdHint')} {...field('vatId')} />
      </div>
      <SelectField
        label={t('application.legitimate')}
        required
        options={legitimateOptions}
        hint={t('application.legitimateHint')}
        {...field('legitimate')}
      />

      <SubmitButton loading={loading}>{t('application.submit')}</SubmitButton>
    </form>
  );
}
