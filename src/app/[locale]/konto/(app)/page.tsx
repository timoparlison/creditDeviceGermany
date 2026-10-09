import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export const runtime = 'edge';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Account' });
  return { title: t('nav.myAccount'), robots: { index: false, follow: false } };
}

export default async function AccountHomePage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Account' });
  return <h2 className="text-xl font-semibold text-navy">{t('nav.overview')}</h2>;
}
