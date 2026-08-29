import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { BalancePanel } from '@/components/customer/BalancePanel';

export const runtime = 'edge';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Account' });
  return { title: t('balance.title'), robots: { index: false, follow: false } };
}

export default async function BalancePage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Account' });

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold text-navy">{t('balance.title')}</h1>
      <BalancePanel />
    </div>
  );
}
