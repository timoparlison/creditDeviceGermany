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
    title: t('privacy.title'),
    description: t('privacy.description'),
    alternates: { canonical: locale === 'de' ? '/datenschutz/' : `/${locale}/privacy-policy/` },
  };
}

export default async function DatenschutzPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Privacy' });

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: t('breadcrumb'), path: '/datenschutz' },
        ])}
      />
      <div className="bg-navy py-16">
        <Container>
          <h1 className="text-4xl font-bold text-white">{t('title')}</h1>
          {t('notice') && (
            <p className="text-gray-300 mt-3 max-w-2xl">{t('notice')}</p>
          )}
        </Container>
      </div>

      <Section background="white">
        <div className="max-w-3xl">
          <div className="prose prose-lg">

            <h2 className="text-2xl font-bold text-navy mb-4">1. Verantwortlicher</h2>
            <div className="mb-8">
              <p className="text-gray-700 leading-relaxed">
                Verantwortlicher im Sinne der Datenschutz-Grundverordnung (DSGVO) ist:
              </p>
              <p className="text-gray-700 leading-relaxed mt-4">
                <strong className="text-navy">CreditDevice GmbH</strong><br />
                Winsbergring 10<br />
                22525 Hamburg<br /><br />
                Telefon: 040 / 890 69 29 - 90<br />
                E-Mail: <a href="mailto:info@creditdevice.de" className="text-primary hover:underline">info@creditdevice.de</a>
              </p>
            </div>

            <h2 className="text-2xl font-bold text-navy mb-4">2. Allgemeine Hinweise</h2>
            <div className="mb-8">
              <p className="text-gray-700 leading-relaxed">
                Wir nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Diese Datenschutzerklärung
                informiert Sie darüber, welche personenbezogenen Daten wir erheben, zu welchen Zwecken
                und auf welcher Rechtsgrundlage wir sie verarbeiten und welche Rechte Ihnen zustehen.
              </p>
              <p className="text-gray-700 leading-relaxed mt-4">
                Maßgebliche Rechtsgrundlagen sind die Datenschutz-Grundverordnung (DSGVO), das
                Bundesdatenschutzgesetz (BDSG) sowie das Telekommunikation-Telemedien-Datenschutz-Gesetz
                (TTDSG).
              </p>
            </div>

            <h2 className="text-2xl font-bold text-navy mb-4">3. Hosting — Cloudflare Pages</h2>
            <div className="mb-8">
              <p className="text-gray-700 leading-relaxed">
                Diese Website wird auf der Infrastruktur von <strong>Cloudflare, Inc.</strong> (101 Townsend St.,
                San Francisco, CA 94107, USA) über den Dienst Cloudflare Pages gehostet. Beim Aufruf
                unserer Website verarbeitet Cloudflare automatisch folgende Daten:
              </p>
              <ul className="list-disc list-inside text-gray-700 mt-4 space-y-2">
                <li>IP-Adresse des anfragenden Geräts</li>
                <li>Datum und Uhrzeit des Zugriffs</li>
                <li>Aufgerufene URL</li>
                <li>Übertragene Datenmenge</li>
                <li>Browser-Typ und Betriebssystem</li>
                <li>Referrer-URL</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-4">
                Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Cloudflare speichert
                Server-Logs in der Regel für maximal 7 Tage. Da Cloudflare ein US-amerikanisches Unternehmen
                ist, findet eine Übermittlung personenbezogener Daten in die USA statt. Die Übermittlung
                erfolgt auf Grundlage der EU-Standardvertragsklauseln (Art. 46 Abs. 2 lit. c DSGVO).
              </p>
              <p className="text-gray-700 leading-relaxed mt-4">
                Weitere Informationen finden Sie in der{' '}
                <a href="https://www.cloudflare.com/de-de/privacypolicy/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  Datenschutzerklärung von Cloudflare
                </a>.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-navy mb-4">4. Cookies</h2>
            <div className="mb-8">
              <p className="text-gray-700 leading-relaxed">
                Unsere Website setzt ausschließlich technisch notwendige Cookies ein. Diese Cookies sind
                für den Betrieb der Website erforderlich und können nicht deaktiviert werden. Sie speichern
                keine personenbezogenen Daten und werden nicht zu Werbe- oder Trackingzwecken verwendet.
              </p>
              <p className="text-gray-700 leading-relaxed mt-4">
                Technisch notwendige Cookies werden nach § 25 Abs. 2 Nr. 2 TTDSG ohne Einwilligung gesetzt.
                Rechtsgrundlage für die Datenverarbeitung ist Art. 6 Abs. 1 lit. f DSGVO.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-navy mb-4">5. Kontaktformular</h2>
            <div className="mb-8">
              <p className="text-gray-700 leading-relaxed">
                Wenn Sie uns über unser Kontaktformular schreiben, werden die von Ihnen angegebenen Daten
                zur Bearbeitung Ihrer Anfrage gespeichert und verarbeitet. Rechtsgrundlage ist
                Art. 6 Abs. 1 lit. f DSGVO. Die Daten werden spätestens nach 6 Monaten gelöscht.
              </p>
              <h3 className="text-xl font-semibold text-navy mb-3 mt-6">E-Mail-Versand über Brevo</h3>
              <p className="text-gray-700 leading-relaxed">
                Die Übertragung der Kontaktformulardaten erfolgt über den Dienst <strong>Brevo</strong> (Sendinblue
                GmbH, Köpenicker Str. 126, 10179 Berlin, Deutschland). Brevo ist als Auftragsverarbeiter
                gemäß Art. 28 DSGVO vertraglich gebunden.
              </p>
              <p className="text-gray-700 leading-relaxed mt-4">
                Weitere Informationen:{' '}
                <a href="https://www.brevo.com/de/legal/privacypolicy/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  Datenschutzerklärung von Brevo
                </a>.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-navy mb-4">6. Zahlungsabwicklung — Stripe</h2>
            <div className="mb-8">
              <p className="text-gray-700 leading-relaxed">
                Für die Abwicklung von Zahlungen nutzen wir <strong>Stripe Payments Europe, Ltd.</strong>
                Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO. Stripe ist im Rahmen des EU-U.S. Data
                Privacy Framework zertifiziert.
              </p>
              <p className="text-gray-700 leading-relaxed mt-4">
                Weitere Informationen:{' '}
                <a href="https://stripe.com/de/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  Datenschutzerklärung von Stripe
                </a>.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-navy mb-4">7. Weitergabe von Daten</h2>
            <div className="mb-8">
              <p className="text-gray-700 leading-relaxed">
                Eine Weitergabe Ihrer personenbezogenen Daten an Dritte findet nur statt, soweit dies
                zur Vertragserfüllung notwendig ist, wir gesetzlich dazu verpflichtet sind oder Sie
                ausdrücklich eingewilligt haben.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-navy mb-4">8. Ihre Rechte</h2>
            <div className="mb-8">
              <ul className="list-disc list-inside text-gray-700 mt-4 space-y-2">
                <li><strong>Auskunftsrecht</strong> — Art. 15 DSGVO</li>
                <li><strong>Recht auf Berichtigung</strong> — Art. 16 DSGVO</li>
                <li><strong>Recht auf Löschung</strong> — Art. 17 DSGVO</li>
                <li><strong>Recht auf Einschränkung der Verarbeitung</strong> — Art. 18 DSGVO</li>
                <li><strong>Recht auf Datenübertragbarkeit</strong> — Art. 20 DSGVO</li>
                <li><strong>Widerspruchsrecht</strong> — Art. 21 DSGVO</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-4">
                Zuständige Aufsichtsbehörde:<br />
                <strong className="text-navy">Der Hamburgische Beauftragte für Datenschutz und Informationsfreiheit</strong><br />
                Ludwig-Erhard-Str. 22, 20459 Hamburg —{' '}
                <a href="https://datenschutz.hamburg.de" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  datenschutz.hamburg.de
                </a>
              </p>
            </div>

            <h2 className="text-2xl font-bold text-navy mb-4">9. Datensicherheit</h2>
            <div className="mb-8">
              <p className="text-gray-700 leading-relaxed">
                Unsere Website nutzt zur Übertragung von Daten ausschließlich TLS-Verschlüsselung.
                Wir sind nach ISO/IEC 27001 zertifiziert.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-navy mb-4">10. Aktualität</h2>
            <div className="mb-8">
              <p className="text-gray-700 leading-relaxed">
                Stand: <strong>Juni 2026</strong>.
              </p>
            </div>

          </div>
        </div>
      </Section>
    </>
  );
}
