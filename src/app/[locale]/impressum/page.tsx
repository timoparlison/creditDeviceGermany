import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { JsonLd, breadcrumbSchema } from '@/components/seo/JsonLd';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });
  return {
    title: t('imprint.title'),
    description: t('imprint.description'),
    alternates: { canonical: locale === 'de' ? '/impressum' : `/${locale}/legal-notice` },
  };
}

export default async function ImpressumPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Imprint' });

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: t('breadcrumb'), path: '/impressum' },
        ])}
      />
      <div className="bg-navy py-16">
        <Container>
          <h1 className="text-4xl font-bold text-white">{t('title')}</h1>
        </Container>
      </div>

      <Section background="white">
        <div className="max-w-3xl">
          <div className="prose prose-lg">
            <h2 className="text-2xl font-bold text-navy mb-4">Angaben gemäß § 5 DDG</h2>

            <div className="mb-8">
              <p className="text-gray-700 leading-relaxed">
                <strong className="text-navy">CreditDevice GmbH</strong><br />
                Winsbergring 10<br />
                22525 Hamburg
              </p>
            </div>

            <h3 className="text-xl font-semibold text-navy mb-3">Kontakt</h3>
            <div className="mb-8">
              <p className="text-gray-700 leading-relaxed">
                Telefon: 040 / 890 69 29 - 90<br />
                E-Mail: <a href="mailto:info@creditdevice.de" className="text-primary hover:underline">info@creditdevice.de</a>
              </p>
            </div>

            <h3 className="text-xl font-semibold text-navy mb-3">Vertreten durch</h3>
            <div className="mb-8">
              <p className="text-gray-700 leading-relaxed">
                Vertretungsberechtigter Geschäftsführer: Sven G. Buckenberger
              </p>
            </div>

            <h3 className="text-xl font-semibold text-navy mb-3">Registereintrag</h3>
            <div className="mb-8">
              <p className="text-gray-700 leading-relaxed">
                Registergericht: Amtsgericht Hamburg<br />
                Registernummer: HRB 148 329
              </p>
            </div>

            <h3 className="text-xl font-semibold text-navy mb-3">Umsatzsteuer-Identifikationsnummer</h3>
            <div className="mb-8">
              <p className="text-gray-700 leading-relaxed">
                Umsatzsteuer-ID gemäß § 27a Umsatzsteuergesetz:<br />
                DE 313990199
              </p>
            </div>

            <h3 className="text-xl font-semibold text-navy mb-3">Aufsichtsbehörde</h3>
            <div className="mb-8">
              <p className="text-gray-700 leading-relaxed">
                Eingetragenes Inkassounternehmen nach dem Rechtsdienstleistungsgesetz (RDG)<br /><br />
                Registrierungsbehörde:<br />
                Amtsgericht Hamburg<br />
                Sievekingplatz 1<br />
                20355 Hamburg<br /><br />
                Aktenzeichen: 3712E/01/0672
              </p>
            </div>

            <h3 className="text-xl font-semibold text-navy mb-3">Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h3>
            <div className="mb-8">
              <p className="text-gray-700 leading-relaxed">
                Sven G. Buckenberger<br />
                Winsbergring 10<br />
                22525 Hamburg
              </p>
            </div>

            <h2 className="text-2xl font-bold text-navy mb-4 mt-12">Verbraucherstreitbeilegung</h2>
            <div className="mb-8">
              <p className="text-gray-700 leading-relaxed">
                Wir sind nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren
                vor einer Verbraucherschlichtungsstelle im Sinne des VSBG teilzunehmen.
              </p>
              <p className="text-gray-700 leading-relaxed mt-4">
                Hinweis: Die von der Europäischen Kommission gemäß Art. 14 Abs. 1 der
                ODR-Verordnung bereitgestellte Online-Streitbeilegungsplattform wurde zum
                20. Juli 2025 eingestellt.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-navy mb-4 mt-12">Haftung für Inhalte</h2>
            <div className="mb-8">
              <p className="text-gray-700 leading-relaxed">
                Als Diensteanbieter sind wir gemäß § 1 Abs. 1 DDG für eigene Inhalte auf diesen Seiten
                nach den allgemeinen Gesetzen verantwortlich.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-navy mb-4 mt-12">Urheberrecht</h2>
            <div className="mb-8">
              <p className="text-gray-700 leading-relaxed">
                Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen
                dem deutschen Urheberrecht. Vervielfältigung, Bearbeitung und Verbreitung außerhalb der
                Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors.
              </p>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
