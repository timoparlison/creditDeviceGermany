import { getTranslations } from 'next-intl/server';
import { CheckCircle2 } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Link } from '@/i18n/navigation';  // /bonitaetsinformationen IS in routing config

type Props = { params: Promise<{ locale: string }> };

export const metadata = {
  title: 'Bestellung bestätigt',
  robots: { index: false, follow: false },
};

export default async function ConfirmationPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'AuskunftConfirmation' });

  return (
    <section className="py-16 md:py-24 bg-gray-50 min-h-[60vh]">
      <Container>
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow border border-gray-100 p-8 md:p-12 text-center">
          <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-3xl md:text-4xl font-bold text-navy mb-3">{t('title')}</h1>
          <p className="text-gray-600 mb-8">{t('body')}</p>
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          <Link
            href={'/bonitaetsinformationen' as any}
            className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white font-semibold rounded-md hover:bg-primary-dark transition-colors"
          >
            {t('cta')}
          </Link>
        </div>
      </Container>
    </section>
  );
}
