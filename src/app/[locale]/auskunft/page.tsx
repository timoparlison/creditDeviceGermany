import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SearchForm } from '@/components/auskunft/SearchForm';
import { Globe, ShieldCheck, Zap } from 'lucide-react';
import { JsonLd, breadcrumbSchema } from '@/components/seo/JsonLd';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });
  return {
    title: t('creditInquiry.title'),
    description: t('creditInquiry.description'),
    alternates: { canonical: locale === 'de' ? '/auskunft/' : `/${locale}/credit-inquiry/` },
  };
}

export default async function AuskunftPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'CreditInquiry' });

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: t('breadcrumb'), path: '/auskunft' },
        ])}
      />
      <section className="relative bg-navy text-white py-16 md:py-24 overflow-hidden">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-white/5" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl" />
        <Container className="relative z-10">
          <div className="max-w-3xl">
            <p className="text-primary font-semibold mb-3 tracking-wide uppercase text-sm">
              {t('tagline')}
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-[3.25rem] font-bold leading-[1.1] mb-5">
              {t('title')}
            </h1>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">{t('subtitle')}</p>
          </div>
          <div className="bg-white rounded-2xl shadow-2xl p-5 md:p-6 max-w-4xl">
            <SearchForm variant="light" />
          </div>
        </Container>
      </section>

      <Section background="white">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Globe className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-bold text-navy mb-1">{t('worldwide')}</h3>
              <p className="text-gray-600 text-sm">{t('worldwideDesc')}</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Zap className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-bold text-navy mb-1">{t('fastDelivery')}</h3>
              <p className="text-gray-600 text-sm">{t('fastDeliveryDesc')}</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-bold text-navy mb-1">{t('securePayment')}</h3>
              <p className="text-gray-600 text-sm">{t('securePaymentDesc')}</p>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
