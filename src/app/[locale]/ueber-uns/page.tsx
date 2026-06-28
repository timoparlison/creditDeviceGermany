import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { JsonLd, breadcrumbSchema } from '@/components/seo/JsonLd';
import { SITE_URL } from '@/lib/seo';
import Image from 'next/image';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });
  return {
    title: t('about.title'),
    description: t('about.description'),
    alternates: { canonical: locale === 'de' ? '/ueber-uns' : `/${locale}/about` },
    openGraph: {
      title: t('about.title'),
      description: t('about.description'),
      url: `${SITE_URL}/ueber-uns`,
      type: 'website',
    },
  };
}

export default async function UeberUnsPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'About' });

  const karriere = [
    { zeit: '1988 – 1991', text: t('management.career1') },
    { zeit: '1991 – 2010', text: t('management.career2') },
    { zeit: '2011', text: t('management.career3') },
    { zeit: '2017', text: t('management.career4') },
    { zeit: '2020', text: t('management.career5') },
    { zeit: '2021', text: t('management.career6') },
  ];

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: t('breadcrumb'), path: '/ueber-uns' },
        ])}
      />

      {/* Hero */}
      <section className="relative bg-navy text-white py-16 md:py-24 overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl" />
        <Container className="relative z-10">
          <div className="max-w-3xl">
            <p className="text-primary font-semibold mb-3 tracking-wide uppercase text-sm">{t('hero.tagline')}</p>
            <h1 className="text-4xl md:text-5xl font-bold leading-[1.1] mb-5">
              <span className="text-primary">{t('hero.title')}</span>
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed">{t('hero.subtitle')}</p>
          </div>
        </Container>
      </section>

      {/* Stats */}
      <Section background="gray">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: '2017', label: t('stats.founded') },
            { value: '35+', label: t('stats.experience') },
            { value: '2500+', label: t('stats.customers') },
            { value: '200+', label: t('stats.countries') },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-4xl font-bold text-primary mb-1">{stat.value}</div>
              <div className="text-gray-600 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* History */}
      <Section background="white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-6">{t('history.title')}</h2>
            <p className="text-lg text-gray-600 mb-4">{t('history.body1')}</p>
            <p className="text-lg text-gray-600 mb-4">{t('history.body2')}</p>
            <p className="text-lg text-gray-600 mb-4">{t('history.body3')}</p>
            <p className="text-lg text-gray-600">{t('history.body4')}</p>
          </div>
          <div className="bg-gradient-to-br from-navy to-navy-dark rounded-2xl p-8 text-white space-y-4">
            <h3 className="text-xl font-bold mb-2">{t('history.claimTitle')}</h3>
            <p className="text-gray-300 text-lg italic leading-relaxed">{t('history.claim')}</p>
            <p className="text-primary font-semibold mt-4">{t('history.claimAuthor')}</p>
          </div>
        </div>
      </Section>

      {/* Management */}
      <Section background="gray">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-10 text-center">{t('management.title')}</h2>
          <div className="bg-white rounded-2xl shadow-sm p-8 md:p-10">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-navy mb-1">{t('management.name')}</h3>
                <p className="text-primary font-semibold mb-1">{t('management.role')}</p>
                <p className="text-gray-500 text-sm mb-4">{t('management.details')}</p>
                <p className="text-gray-600 mb-6">{t('management.bio')}</p>
                <div className="inline-block bg-navy/5 rounded-lg px-4 py-2">
                  <span className="text-navy font-semibold italic text-sm">{t('management.quote')}</span>
                </div>
              </div>
            </div>

            {/* Career Timeline */}
            <div className="mt-8 border-t pt-8">
              <h4 className="font-bold text-navy mb-6">{t('management.careerTitle')}</h4>
              <div className="space-y-4">
                {karriere.map((item) => (
                  <div key={item.zeit} className="flex gap-4">
                    <div className="w-28 flex-shrink-0">
                      <span className="text-sm font-semibold text-primary">{item.zeit}</span>
                    </div>
                    <div className="flex-1 border-l border-gray-200 pl-4">
                      <p className="text-gray-600 text-sm">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Memberships */}
            <div className="mt-8 border-t pt-8">
              <h4 className="font-bold text-navy mb-4">{t('management.membershipsTitle')}</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full mt-1.5 flex-shrink-0" />
                  <a href="https://www.febis.org" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                    {t('management.membership1')}
                  </a>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full mt-1.5 flex-shrink-0" />
                  {t('management.membership2')}
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full mt-1.5 flex-shrink-0" />
                  {t('management.membership3')}
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full mt-1.5 flex-shrink-0" />
                  <a href="https://www.veek-hamburg.de/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                    {t('management.membership4')}
                  </a>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full mt-1.5 flex-shrink-0" />
                  {t('management.membership5')}
                </li>
              </ul>
              <div className="mt-6 flex flex-wrap items-center gap-8">
                <a href="https://www.febis.org" target="_blank" rel="noopener noreferrer">
                  <Image
                    src="/febis-logo-en-de-gradient.png"
                    alt="FEBIS – Federation of Business Information Services"
                    width={160}
                    height={60}
                    className="object-contain hover:opacity-80 transition-opacity"
                  />
                </a>
                <a href="https://www.veek-hamburg.de/" target="_blank" rel="noopener noreferrer">
                  <Image
                    src="/230904_VEEK_Logo.png"
                    alt="Versammlung Ehrbarer Kaufleute zu Hamburg e.V. (VEEK)"
                    width={80}
                    height={60}
                    className="object-contain hover:opacity-80 transition-opacity"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section background="white">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-navy mb-4">{t('cta.title')}</h2>
          <p className="text-lg text-gray-600 mb-8">{t('cta.subtitle')}</p>
          <Button href="/kontakt" variant="primary" size="lg">{t('cta.button')}</Button>
        </div>
      </Section>
    </>
  );
}
