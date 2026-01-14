import { Metadata } from 'next';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';

export const metadata: Metadata = {
  title: 'Impressum',
  description: 'Impressum der CreditDevice GmbH, Hamburg',
};

export default function ImpressumPage() {
  return (
    <>
      <div className="bg-navy py-16">
        <Container>
          <h1 className="text-4xl font-bold text-white">Impressum</h1>
        </Container>
      </div>

      <Section background="white">
        <div className="max-w-3xl">
          <div className="prose prose-lg">
            <h2 className="text-2xl font-bold text-navy mb-4">Angaben gemäß § 5 TMG</h2>

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
                Telefon: 040 / 89 069 29 90<br />
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

            <h3 className="text-xl font-semibold text-navy mb-3">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h3>
            <div className="mb-8">
              <p className="text-gray-700 leading-relaxed">
                Sven G. Buckenberger<br />
                Winsbergring 10<br />
                22525 Hamburg
              </p>
            </div>

            <h2 className="text-2xl font-bold text-navy mb-4 mt-12">Streitschlichtung</h2>
            <div className="mb-8">
              <p className="text-gray-700 leading-relaxed">
                Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:
                <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline ml-1">
                  https://ec.europa.eu/consumers/odr
                </a>
              </p>
              <p className="text-gray-700 leading-relaxed mt-4">
                Unsere E-Mail-Adresse finden Sie oben im Impressum.
              </p>
              <p className="text-gray-700 leading-relaxed mt-4">
                Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
                Verbraucherschlichtungsstelle teilzunehmen.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-navy mb-4 mt-12">Haftung für Inhalte</h2>
            <div className="mb-8">
              <p className="text-gray-700 leading-relaxed">
                Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach
                den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter
                jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen
                oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
              </p>
              <p className="text-gray-700 leading-relaxed mt-4">
                Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen
                Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt
                der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden
                Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-navy mb-4 mt-12">Haftung für Links</h2>
            <div className="mb-8">
              <p className="text-gray-700 leading-relaxed">
                Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss
                haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte
                der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
                Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft.
                Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.
              </p>
              <p className="text-gray-700 leading-relaxed mt-4">
                Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte
                einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir
                derartige Links umgehend entfernen.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-navy mb-4 mt-12">Urheberrecht</h2>
            <div className="mb-8">
              <p className="text-gray-700 leading-relaxed">
                Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem
                deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung
                außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen
                Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht
                kommerziellen Gebrauch gestattet.
              </p>
              <p className="text-gray-700 leading-relaxed mt-4">
                Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte
                Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie
                trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden
                Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
              </p>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
