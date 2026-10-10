'use client';

import { useCallback, useEffect, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { AlertTriangle, Check, Copy, ExternalLink, KeyRound, Loader2 } from 'lucide-react';
import { apiGet, apiPost } from '@/lib/customer/api';
import { formatDateTime } from '@/lib/customer/format';
import type { ApiKeyMode, ApiKeyView } from '@/lib/customer/types';
import { Card, FormError } from './ui';

const MODES: ApiKeyMode[] = ['LIVE', 'TEST'];

export function ApiKeyManager({ apiBaseUrl, docsUrl }: { apiBaseUrl: string; docsUrl: string }) {
  const t = useTranslations('Account');
  const locale = useLocale();

  const [keys, setKeys] = useState<ApiKeyView[] | null>(null);
  const [busy, setBusy] = useState<ApiKeyMode | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [fresh, setFresh] = useState<{ mode: ApiKeyMode; apiKey: string } | null>(null);
  const [copied, setCopied] = useState(false);

  const load = useCallback(async () => {
    const res = await apiGet<ApiKeyView[]>('/api/customer/portal/api-keys');
    if (res.ok) setKeys(res.data);
    else setError(t('common.loadError'));
  }, [t]);

  useEffect(() => {
    void load();
  }, [load]);

  const create = async (mode: ApiKeyMode, existing: boolean) => {
    if (existing && !window.confirm(t('api.confirmRotate', { mode }))) return;
    setBusy(mode);
    setError(null);
    setCopied(false);
    const res = await apiPost<{ apiKey: string }>(`/api/customer/portal/api-key?mode=${mode}`);
    setBusy(null);
    if (!res.ok) {
      setError(t('api.error'));
      return;
    }
    setFresh({ mode, apiKey: res.data.apiKey });
    void load();
  };

  const copy = async () => {
    if (!fresh) return;
    try {
      await navigator.clipboard.writeText(fresh.apiKey);
      setCopied(true);
    } catch {
      /* clipboard not available — the key stays visible for manual copy */
    }
  };

  return (
    <div className="space-y-6">
      {fresh && (
        <div className="rounded-xl border border-amber-300 bg-amber-50 p-5 space-y-3">
          <p className="flex items-center gap-2 font-semibold text-amber-900">
            <AlertTriangle className="w-5 h-5" />
            {t('api.freshTitle', { mode: fresh.mode })}
          </p>
          <p className="text-sm text-amber-900">{t('api.freshBody')}</p>
          <div className="flex flex-col sm:flex-row gap-2">
            <code className="flex-1 break-all rounded-md bg-white border border-amber-200 px-3 py-2 font-mono text-sm text-navy">
              {fresh.apiKey}
            </code>
            <button
              type="button"
              onClick={copy}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-primary text-white font-semibold hover:bg-primary-dark"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? t('api.copied') : t('api.copy')}
            </button>
          </div>
          <button type="button" onClick={() => setFresh(null)} className="text-sm text-amber-900 underline">
            {t('api.freshDone')}
          </button>
        </div>
      )}

      <FormError message={error} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {MODES.map((mode) => {
          const key = keys?.find((k) => k.mode === mode);
          return (
            <Card key={mode} title={<span className="flex items-center gap-2"><KeyRound className="w-5 h-5" />{t(`api.mode${mode}`)}</span>}>
              <p className="text-sm text-gray-600 mb-4">{t(`api.mode${mode}Desc`)}</p>
              {keys === null ? (
                <p className="text-sm text-gray-500">{t('common.loading')}</p>
              ) : key ? (
                <dl className="text-sm space-y-1 mb-4">
                  <div className="flex justify-between gap-4">
                    <dt className="text-gray-500">{t('api.prefix')}</dt>
                    <dd className="font-mono text-navy">{key.prefix}…</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-gray-500">{t('api.created')}</dt>
                    <dd className="text-navy">{formatDateTime(key.createdAt, locale)}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-gray-500">{t('api.lastUsed')}</dt>
                    <dd className="text-navy">{key.lastUsedAt ? formatDateTime(key.lastUsedAt, locale) : t('api.never')}</dd>
                  </div>
                </dl>
              ) : (
                <p className="text-sm text-gray-500 mb-4">{t('api.none')}</p>
              )}
              <button
                type="button"
                disabled={busy !== null || keys === null}
                onClick={() => create(mode, Boolean(key))}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-md font-semibold disabled:opacity-60 ${
                  key ? 'border border-gray-300 text-navy hover:bg-gray-50' : 'bg-primary text-white hover:bg-primary-dark'
                }`}
              >
                {busy === mode && <Loader2 className="w-4 h-4 animate-spin" />}
                {key ? t('api.rotate') : t('api.create')}
              </button>
            </Card>
          );
        })}
      </div>

      <Card title={t('api.docsTitle')}>
        <div className="text-sm text-gray-700 space-y-3">
          <p>{t('api.docsBody')}</p>
          <dl className="space-y-1">
            <div>
              <dt className="inline text-gray-500">{t('api.baseUrl')}: </dt>
              <dd className="inline font-mono">{apiBaseUrl}</dd>
            </div>
            <div>
              <dt className="inline text-gray-500">{t('api.header')}: </dt>
              <dd className="inline font-mono">ak: &lt;API-Key&gt;</dd>
            </div>
          </dl>
          <a
            href={docsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
          >
            {t('api.docsLink')}
            <ExternalLink className="w-4 h-4" />
          </a>
          <p className="text-xs text-gray-500">{t('api.docsLoginHint')}</p>
        </div>
      </Card>
    </div>
  );
}
