import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { BACKEND_BASE } from '@/lib/customer/client';
import { requireApprovedAccount } from '@/lib/customer/guards';
import { ApiKeyManager } from '@/components/customer/ApiKeyManager';

export const runtime = 'edge';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Account' });
  return { title: t('api.title'), robots: { index: false, follow: false } };
}

// Public URL of the customer API; defaults to the backend the BFF talks to (prüfen: eigene API-Domain?).
const API_PUBLIC_BASE = process.env.CUSTOMER_API_PUBLIC_URL ?? BACKEND_BASE;

export default async function ApiAccessPage({ params }: Props) {
  const { locale } = await params;
  await requireApprovedAccount(locale);
  const t = await getTranslations({ locale, namespace: 'Account' });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-navy">{t('api.title')}</h2>
        <p className="text-sm text-gray-600 mt-1">{t('api.intro')}</p>
      </div>
      <ApiKeyManager apiBaseUrl={`${API_PUBLIC_BASE}/custapi/v2`} docsUrl={`${API_PUBLIC_BASE}/swagger-ui.html`} />
    </div>
  );
}
