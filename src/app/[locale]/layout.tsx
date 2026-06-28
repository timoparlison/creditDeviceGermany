import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { Header, Footer } from '@/components/layout';
import { JsonLd, organizationSchema, websiteSchema } from '@/components/seo/JsonLd';
import { SITE_URL } from '@/lib/seo';
import { routing } from '@/i18n/routing';

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Omit<Props, 'children'>): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  const localeAlternates: Record<string, string> = {};
  for (const loc of routing.locales) {
    localeAlternates[loc] = loc === 'de' ? SITE_URL : `${SITE_URL}/${loc}`;
  }

  return {
    title: {
      default: t('home.title'),
      template: '%s | CreditDevice',
    },
    description: t('home.description'),
    openGraph: {
      type: 'website',
      locale: locale.replace('-', '_'),
      url: SITE_URL,
      siteName: 'CreditDevice',
      title: t('home.title'),
      description: t('home.description'),
    },
    twitter: {
      card: 'summary_large_image',
      title: t('home.title'),
      description: t('home.description'),
    },
    alternates: {
      canonical: locale === 'de' ? '/' : `/${locale}`,
      languages: localeAlternates,
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <JsonLd data={[organizationSchema(), websiteSchema()]} />
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </NextIntlClientProvider>
  );
}
