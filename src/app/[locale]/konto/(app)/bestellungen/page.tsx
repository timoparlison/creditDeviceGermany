import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { requireApprovedAccount } from '@/lib/customer/guards';
import { OrderList } from '@/components/customer/OrderList';

export const runtime = 'edge';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Account' });
  return { title: t('orders.title'), robots: { index: false, follow: false } };
}

export default async function OrdersPage({ params }: Props) {
  const { locale } = await params;
  await requireApprovedAccount(locale);
  const t = await getTranslations({ locale, namespace: 'Account' });

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-navy">{t('orders.title')}</h2>
      <OrderList />
    </div>
  );
}
