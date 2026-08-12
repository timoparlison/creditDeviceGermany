import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import { Section } from '@/components/ui/Section';
import { ContactForm } from '@/components/forms';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { JsonLd, breadcrumbSchema } from '@/components/seo/JsonLd';
import { SITE_URL } from '@/lib/seo';
import { Container } from '@/components/ui/Container';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });
  return {
    title: t('contact.title'),
    description: t('contact.description'),
    alternates: { canonical: locale === 'de' ? '/kontakt/' : `/${locale}/contact/` },
  };
}

export default async function KontaktPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Contact' });

  const contactItems = [
    { icon: Mail, title: t('email'), content: 'info@creditdevice.de', href: 'mailto:info@creditdevice.de' },
    { icon: Phone, title: t('phone'), content: '040 / 890 69 29 - 90', href: 'tel:+4940890692990' },
    { icon: MapPin, title: t('address'), content: 'Winsbergring 10\n22525 Hamburg' },
    { icon: Clock, title: t('businessHours'), content: t('businessHoursValue') },
  ];

  return (
    <>
      <JsonLd
        data={[
          {
            '@context': 'https://schema.org',
            '@type': 'ContactPage',
            '@id': `${SITE_URL}/kontakt#contactpage`,
            url: `${SITE_URL}/kontakt/`,
            name: t('hero.title'),
            inLanguage: locale === 'de' ? 'de-DE' : locale,
            about: { '@id': `${SITE_URL}/#organization` },
          },
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: t('breadcrumb'), path: '/kontakt' },
          ]),
        ]}
      />

      {/* Hero */}
      <section className="relative bg-navy text-white py-16 md:py-24 overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl" />
        <Container className="relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold leading-[1.1] mb-5">{t('hero.title')}</h1>
            <p className="text-lg text-gray-300 leading-relaxed">{t('hero.subtitle')}</p>
          </div>
        </Container>
      </section>

      <Section background="white">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-bold text-navy mb-2">{t('contactPerson')}</h2>
            <p className="text-lg font-semibold text-primary mb-6">Sven Buckenberger</p>
            <div className="space-y-6">
              {contactItems.map((item) => {
                const IconComponent = item.icon;
                const inner = (
                  <>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-navy mb-1">{item.title}</h3>
                      <p className="text-gray-600 whitespace-pre-line">{item.content}</p>
                    </div>
                  </>
                );
                if (item.href) {
                  return (
                    <a key={item.title} href={item.href} className="flex items-start gap-4 rounded-lg hover:bg-gray-50 transition-colors">
                      {inner}
                    </a>
                  );
                }
                return (
                  <div key={item.title} className="flex items-start gap-4">{inner}</div>
                );
              })}
            </div>

            <div className="mt-8 p-6 bg-navy rounded-xl text-white">
              <h3 className="font-bold text-lg mb-2">{t('demoBox.title')}</h3>
              <p className="text-gray-300 text-sm mb-4">{t('demoBox.body')}</p>
              <p className="text-primary font-semibold">{t('demoBox.cta')}</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-gray-50 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-navy mb-2">{t('formSection.title')}</h2>
              <p className="text-gray-600 mb-8">{t('formSection.subtitle')}</p>
              <ContactForm />
            </div>
          </div>
        </div>
      </Section>

      <Section background="gray">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-navy mb-4">{t('stats.title')}</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">{t('stats.body')}</p>
          <div className="bg-white rounded-xl shadow-sm p-6 max-w-lg mx-auto">
            <div className="flex items-center justify-center gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">2500+</div>
                <div className="text-sm text-gray-500">{t('stats.activeCustomers')}</div>
              </div>
              <div className="w-px h-12 bg-gray-200" />
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">200+</div>
                <div className="text-sm text-gray-500">{t('stats.countries')}</div>
              </div>
              <div className="w-px h-12 bg-gray-200" />
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">35+</div>
                <div className="text-sm text-gray-500">{t('stats.yearsExperience')}</div>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
