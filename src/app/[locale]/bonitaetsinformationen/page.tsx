import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Features, FAQ } from '@/components/sections';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { SearchForm } from '@/components/auskunft/SearchForm';
import { Globe, TrendingUp, Database } from 'lucide-react';
import { JsonLd, breadcrumbSchema, faqSchema } from '@/components/seo/JsonLd';
import { SITE_URL } from '@/lib/seo';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });
  return {
    title: t('creditInformation.title'),
    description: t('creditInformation.description'),
    alternates: { canonical: locale === 'de' ? '/bonitaetsinformationen' : `/${locale}/credit-information` },
    openGraph: { title: t('creditInformation.title'), description: t('creditInformation.description'), url: `${SITE_URL}/bonitaetsinformationen`, type: 'website' },
  };
}

export default async function BonitaetsinformationenPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'CreditInformation' });

  const features = [
    { title: t('features.international.title'), description: t('features.international.description'), icon: Globe },
    { title: t('features.payPerUse.title'), description: t('features.payPerUse.description'), icon: TrendingUp },
    { title: t('features.api.title'), description: t('features.api.description'), icon: Database },
  ];

  const faqItems = [
    { question: t('faq.q1'), answer: t('faq.a1') },
    { question: t('faq.q2'), answer: t('faq.a2') },
    { question: t('faq.q3'), answer: t('faq.a3') },
    { question: t('faq.q4'), answer: t('faq.a4') },
  ];

  const pricing = [
    { zone: t('pricing.zone1Name'), countries: t('pricing.zone1Countries'), net: '22,69', gross: '27,00', highlight: true },
    { zone: t('pricing.zone2Name'), countries: t('pricing.zone2Countries'), net: '27,73', gross: '33,00', highlight: false },
    { zone: t('pricing.zone3Name'), countries: t('pricing.zone3Countries'), net: '35,29', gross: '42,00', highlight: false },
    { zone: t('pricing.zone4Name'), countries: t('pricing.zone4Countries'), net: '60,50', gross: '72,00', highlight: false },
  ];

  return (
    <>
      <JsonLd data={[faqSchema(faqItems), breadcrumbSchema([{ name: 'Home', path: '/' }, { name: t('breadcrumb'), path: '/bonitaetsinformationen' }])]} />

      <section className="relative bg-navy text-white py-16 md:py-24 overflow-hidden">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-white/5" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl" />
        <Container className="relative z-10">
          <div className="max-w-3xl">
            <p className="text-primary font-semibold mb-3 tracking-wide uppercase text-sm">{t('hero.tagline')}</p>
            <h1 className="text-4xl md:text-5xl lg:text-[3.25rem] font-bold leading-[1.1] mb-5">
              <span className="text-primary">{t('hero.titlePart1')}</span> {t('hero.titlePart2')}
            </h1>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">{t('hero.subtitle')}</p>
          </div>
          <div className="bg-white rounded-2xl shadow-2xl p-5 md:p-6 max-w-4xl">
            <SearchForm variant="light" />
          </div>
        </Container>
      </section>

      <Features title={t('features.title')} subtitle={t('features.subtitle')} features={features} columns={3} background="gray" />

      <Section background="gray">
        <h2 className="text-3xl md:text-4xl font-bold text-navy mb-3 text-center">{t('pricing.title')}</h2>
        <p className="text-gray-500 text-center mb-10">{t('pricing.subtitle')}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          {pricing.map((item) => (
            <div key={item.zone} className={`rounded-2xl p-6 flex flex-col ${item.highlight ? 'bg-navy text-white' : 'bg-white text-navy border border-gray-100'}`}>
              <div className="mb-4">
                <p className="text-xs font-semibold uppercase tracking-wide mb-1 text-primary">{t('pricing.priceZoneLabel')}</p>
                <h3 className="text-lg font-bold mb-3">{item.zone}</h3>
                <p className={`text-sm leading-relaxed ${item.highlight ? 'text-gray-300' : 'text-gray-500'}`}>{item.countries}</p>
              </div>
              <div className={`mt-auto pt-5 border-t ${item.highlight ? 'border-white/20' : 'border-gray-100'}`}>
                <div className="flex items-end gap-3">
                  <div>
                    <p className="text-xs mb-0.5 text-gray-400">{t('pricing.netLabel')}</p>
                    <p className="text-2xl font-bold">{item.net} €</p>
                  </div>
                  <div className={`text-sm mb-1 ${item.highlight ? 'text-gray-300' : 'text-gray-500'}`}>/ {item.gross} € {t('pricing.grossLabel')}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section background="white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-6">{t('riskSection.title')}</h2>
            <p className="text-lg text-gray-600 mb-6">{t('riskSection.body')}</p>
            <ul className="space-y-3 mb-8">
              {(['bullet1', 'bullet2', 'bullet3'] as const).map((k) => (
                <li key={k} className="flex items-center text-gray-700">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3" />
                  {t(`riskSection.${k}`)}
                </li>
              ))}
            </ul>
            <Button href="/kontakt" variant="primary" size="lg">{t('riskSection.cta')}</Button>
          </div>
          <div className="bg-gradient-to-br from-navy to-navy-dark rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-6">{t('riskSection.infoTitle')}</h3>
            <div className="space-y-4">
              {(['info1', 'info2', 'info3', 'info4', 'info5', 'info6'] as const).map((k) => (
                <div key={k} className="flex justify-between items-center p-4 bg-white/10 rounded-lg">
                  <span>{t(`riskSection.${k}Label`)}</span>
                  <span className="text-primary font-semibold">{t(`riskSection.${k}Value`)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <FAQ title={t('faq.title')} subtitle={t('faq.subtitle')} items={faqItems} />
    </>
  );
}
