import { Metadata } from 'next';
import { Hero } from '@/components/sections';
import { Section } from '@/components/ui/Section';
import { ContactForm } from '@/components/forms';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { JsonLd, breadcrumbSchema } from '@/components/seo/JsonLd';
import { SITE_URL } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Kontakt — CreditDevice GmbH Hamburg',
  description:
    'Kontaktieren Sie die CreditDevice GmbH in Hamburg. Wir beraten Sie persönlich zu Bonitätsinformationen, Credit Management Software und Kreditversicherung.',
  alternates: { canonical: '/kontakt' },
};

const contactPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  '@id': `${SITE_URL}/kontakt#contactpage`,
  url: `${SITE_URL}/kontakt`,
  name: 'Kontakt — CreditDevice GmbH Hamburg',
  inLanguage: 'de-DE',
  about: { '@id': `${SITE_URL}/#organization` },
};

const contactInfo = [
  {
    icon: Mail,
    title: 'E-Mail',
    content: 'info@creditdevice.de',
    href: 'mailto:info@creditdevice.de',
  },
  {
    icon: Phone,
    title: 'Telefon',
    content: '040 / 890 69 29 - 90',
    href: 'tel:+4940890692990',
  },
  {
    icon: MapPin,
    title: 'Adresse',
    content: 'Winsbergring 10\n22525 Hamburg',
  },
  {
    icon: Clock,
    title: 'Geschäftszeiten',
    content: 'Mo - Fr: 9:00 - 17:00 Uhr',
  },
];

export default function KontaktPage() {
  return (
    <>
      <JsonLd
        data={[
          contactPageSchema,
          breadcrumbSchema([
            { name: 'Startseite', path: '/' },
            { name: 'Kontakt', path: '/kontakt' },
          ]),
        ]}
      />
      <Hero
        title="Kontakt"
        subtitle="Haben Sie Fragen oder möchten Sie mehr über unsere Lösungen erfahren? Wir freuen uns auf Ihre Nachricht."
        image="/credTitelBildNachTeamsCall.png"
        imageAlt="CreditDevice Team im Gespräch nach einem Credit-Management-Beratungstermin"
      />

      <Section background="white">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-bold text-navy mb-2">
              Ihr Ansprechpartner
            </h2>
            <p className="text-lg font-semibold text-primary mb-6">Sven Buckenberger</p>
            <div className="space-y-6">
              {contactInfo.map((item) => {
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
                    <a
                      key={item.title}
                      href={item.href}
                      className="flex items-start gap-4 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      {inner}
                    </a>
                  );
                }

                return (
                  <div key={item.title} className="flex items-start gap-4">
                    {inner}
                  </div>
                );
              })}
            </div>

            <div className="mt-8 p-6 bg-navy rounded-xl text-white">
              <h3 className="font-bold text-lg mb-2">Demo vereinbaren</h3>
              <p className="text-gray-300 text-sm mb-4">
                Möchten Sie CreditDevice in Aktion sehen? Vereinbaren Sie eine Demo mit unseren Experten.
              </p>
              <p className="text-primary font-semibold">
                Jetzt Formular ausfüllen
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-gray-50 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-navy mb-2">
                Schreiben Sie uns
              </h2>
              <p className="text-gray-600 mb-8">
                Füllen Sie das Formular aus und wir melden uns schnellstmöglich bei Ihnen.
              </p>
              <ContactForm />
            </div>
          </div>
        </div>
      </Section>

      {/* Map or CTA Section */}
      <Section background="gray">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-navy mb-4">
            CreditDevice GmbH
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Besuchen Sie uns in Hamburg oder kontaktieren Sie uns telefonisch –
            wir beraten Sie gerne persönlich zu unseren Credit Management Lösungen.
          </p>
          <div className="bg-white rounded-xl shadow-sm p-6 max-w-lg mx-auto">
            <div className="flex items-center justify-center gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">2500+</div>
                <div className="text-sm text-gray-500">Aktive Kunden</div>
              </div>
              <div className="w-px h-12 bg-gray-200" />
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">200+</div>
                <div className="text-sm text-gray-500">Länder</div>
              </div>
              <div className="w-px h-12 bg-gray-200" />
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">15+</div>
                <div className="text-sm text-gray-500">Jahre Erfahrung</div>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
