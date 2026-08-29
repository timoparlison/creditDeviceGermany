import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { CheckCircle2, XCircle } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { AuthCard } from '@/components/customer/AuthCard';
import { activateAccount } from '@/lib/customer/client';

export const runtime = 'edge';

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ key?: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Account' });
  return { title: t('activate.title'), robots: { index: false, follow: false } };
}

export default async function ActivatePage({ params, searchParams }: Props) {
  const { locale } = await params;
  const { key } = await searchParams;
  const t = await getTranslations({ locale, namespace: 'Account' });

  let activated = false;
  if (key) {
    try {
      await activateAccount(key);
      activated = true;
    } catch {
      activated = false;
    }
  }

  return (
    <AuthCard title={t('activate.title')}>
      <div className="space-y-4 text-center">
        {activated ? (
          <>
            <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto" />
            <p className="text-gray-700">{t('activate.successBody')}</p>
          </>
        ) : (
          <>
            <XCircle className="w-12 h-12 text-red-500 mx-auto" />
            <p className="text-gray-700">
              {key ? t('activate.errorBody') : t('activate.missingKey')}
            </p>
          </>
        )}
        <Link
          href="/konto/login"
          className="inline-block px-6 py-3 bg-primary text-white font-semibold rounded-md hover:bg-primary-dark transition-colors"
        >
          {t('activate.toLogin')}
        </Link>
      </div>
    </AuthCard>
  );
}
