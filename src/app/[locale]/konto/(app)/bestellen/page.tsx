import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { requireApprovedAccount } from '@/lib/customer/guards';
import { PortalOrder } from '@/components/customer/PortalOrder';

export const runtime = 'edge';

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ product?: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Account' });
  return { title: t('order.title'), robots: { index: false, follow: false } };
}

export default async function OrderPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const { product } = await searchParams;
  await requireApprovedAccount(locale);
  const t = await getTranslations({ locale, namespace: 'Account' });

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-navy">{t('order.title')}</h2>
      <PortalOrder initialTab={product === 'PEP' ? 'PEP' : 'FULL'} />
    </div>
  );
}
