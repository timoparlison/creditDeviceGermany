import { Metadata } from 'next';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { JsonLd, breadcrumbSchema } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Datenschutzerklärung',
  description: 'Datenschutzerklärung der CreditDevice GmbH gemäß DSGVO und TTDSG.',
  alternates: { canonical: '/datenschutz' },
};

export default function DatenschutzPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Startseite', path: '/' },
          { name: 'Datenschutz', path: '/datenschutz' },
        ])}
      />
      <div className="bg-navy py-16">
        <Container>
          <h1 className="text-4xl font-bold text-white">Datenschutzerklärung</h1>
        </Container>
      </div>

      <Section background="white">
        <div className="max-w-3xl">
          <div className="prose prose-lg">

            {/* 1. Verantwortlicher */}
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

            {/* 2. Allgemeines */}
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

            {/* 3. Hosting */}
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
                Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Unser berechtigtes
                Interesse besteht in der sicheren, schnellen und zuverlässigen Bereitstellung unserer Website.
                Cloudflare speichert Server-Logs in der Regel für maximal 7 Tage.
              </p>
              <p className="text-gray-700 leading-relaxed mt-4">
                Da Cloudflare ein US-amerikanisches Unternehmen ist, findet eine Übermittlung personenbezogener
                Daten in die USA statt. Die Übermittlung erfolgt auf Grundlage der EU-Standardvertragsklauseln
                (Art. 46 Abs. 2 lit. c DSGVO). Cloudflare ist außerdem im Rahmen des EU-U.S. Data Privacy
                Framework zertifiziert.
              </p>
              <p className="text-gray-700 leading-relaxed mt-4">
                Weitere Informationen finden Sie in der{' '}
                <a href="https://www.cloudflare.com/de-de/privacypolicy/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  Datenschutzerklärung von Cloudflare
                </a>.
              </p>
            </div>

            {/* 4. Cookies */}
            <h2 className="text-2xl font-bold text-navy mb-4">4. Cookies</h2>
            <div className="mb-8">
              <p className="text-gray-700 leading-relaxed">
                Unsere Website setzt ausschließlich technisch notwendige Cookies ein. Diese Cookies sind
                für den Betrieb der Website erforderlich und können nicht deaktiviert werden. Sie speichern
                keine personenbezogenen Daten und werden nicht zu Werbe- oder Trackingzwecken verwendet.
              </p>
              <p className="text-gray-700 leading-relaxed mt-4">
                Technisch notwendige Cookies werden nach § 25 Abs. 2 Nr. 2 TTDSG ohne Einwilligung gesetzt,
                da sie für die Bereitstellung des von Ihnen ausdrücklich gewünschten Dienstes unbedingt
                erforderlich sind. Rechtsgrundlage für die Datenverarbeitung ist Art. 6 Abs. 1 lit. f DSGVO.
              </p>
              <p className="text-gray-700 leading-relaxed mt-4">
                Sie können Ihren Browser so einstellen, dass er Sie über das Setzen von Cookies informiert
                oder Cookies generell ablehnt. Bei der Deaktivierung technisch notwendiger Cookies kann die
                Funktionsfähigkeit der Website eingeschränkt sein.
              </p>
            </div>

            {/* 5. Kontaktformular */}
            <h2 className="text-2xl font-bold text-navy mb-4">5. Kontaktformular</h2>
            <div className="mb-8">
              <p className="text-gray-700 leading-relaxed">
                Wenn Sie uns über unser Kontaktformular schreiben, werden die von Ihnen angegebenen Daten
                (Name, E-Mail-Adresse, ggf. Telefonnummer und Ihre Nachricht) zur Bearbeitung Ihrer Anfrage
                gespeichert und verarbeitet.
              </p>
              <p className="text-gray-700 leading-relaxed mt-4">
                Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Unser berechtigtes Interesse liegt in der
                Beantwortung Ihrer Kontaktanfrage. Soweit Ihre Anfrage auf den Abschluss eines Vertrages
                gerichtet ist, ist zusätzliche Rechtsgrundlage Art. 6 Abs. 1 lit. b DSGVO.
              </p>
              <p className="text-gray-700 leading-relaxed mt-4">
                Die Daten werden gelöscht, sobald Ihre Anfrage abschließend bearbeitet ist und keine
                gesetzlichen Aufbewahrungspflichten entgegenstehen, spätestens jedoch nach 6 Monaten.
              </p>
              <h3 className="text-xl font-semibold text-navy mb-3 mt-6">E-Mail-Versand über Brevo</h3>
              <p className="text-gray-700 leading-relaxed">
                Die Übertragung der Kontaktformulardaten erfolgt über den Dienst <strong>Brevo</strong> (Sendinblue
                GmbH, Köpenicker Str. 126, 10179 Berlin, Deutschland). Brevo ist als Auftragsverarbeiter
                gemäß Art. 28 DSGVO vertraglich gebunden und verarbeitet die Daten ausschließlich zur
                Übermittlung der Nachricht an uns.
              </p>
              <p className="text-gray-700 leading-relaxed mt-4">
                Weitere Informationen finden Sie in der{' '}
                <a href="https://www.brevo.com/de/legal/privacypolicy/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  Datenschutzerklärung von Brevo
                </a>.
              </p>
            </div>

            {/* 6. Zahlungsabwicklung */}
            <h2 className="text-2xl font-bold text-navy mb-4">6. Zahlungsabwicklung — Stripe</h2>
            <div className="mb-8">
              <p className="text-gray-700 leading-relaxed">
                Für die Abwicklung von Zahlungen (Kreditkarte, SEPA-Lastschrift) nutzen wir den Dienst
                von <strong>Stripe Payments Europe, Ltd.</strong> (1 Grand Canal Street Lower, Grand Canal Dock,
                Dublin, D02 H210, Irland) sowie seiner Muttergesellschaft Stripe, Inc. (354 Oyster Point
                Blvd, South San Francisco, CA 94080, USA).
              </p>
              <p className="text-gray-700 leading-relaxed mt-4">
                Bei der Auswahl einer Zahlungsmethode und dem Abschluss des Bestellvorgangs übermittelt
                Stripe folgende Daten:
              </p>
              <ul className="list-disc list-inside text-gray-700 mt-4 space-y-2">
                <li>Name und Rechnungsadresse</li>
                <li>Zahlungsdaten (Kartennummer, IBAN o. Ä. — verschlüsselt, nicht von uns gespeichert)</li>
                <li>Bestellbetrag und Währung</li>
                <li>IP-Adresse und Browser-Informationen (zur Betrugsprävention)</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-4">
                Wir haben zu keinem Zeitpunkt Zugriff auf vollständige Zahlungsdaten. Diese werden
                ausschließlich durch Stripe verarbeitet.
              </p>
              <p className="text-gray-700 leading-relaxed mt-4">
                Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung). Zahlungsdaten werden
                entsprechend der handels- und steuerrechtlichen Aufbewahrungsfristen für bis zu 10 Jahre
                gespeichert (§§ 238, 257 HGB; § 147 AO).
              </p>
              <p className="text-gray-700 leading-relaxed mt-4">
                Da Stripe auch Daten in den USA verarbeitet, findet eine Drittlandübermittlung statt.
                Die Übermittlung erfolgt auf Grundlage der EU-Standardvertragsklauseln (Art. 46 Abs. 2
                lit. c DSGVO). Stripe ist zudem im Rahmen des EU-U.S. Data Privacy Framework zertifiziert.
              </p>
              <p className="text-gray-700 leading-relaxed mt-4">
                Weitere Informationen finden Sie in der{' '}
                <a href="https://stripe.com/de/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  Datenschutzerklärung von Stripe
                </a>.
              </p>
            </div>

            {/* 7. Weitergabe an Dritte */}
            <h2 className="text-2xl font-bold text-navy mb-4">7. Weitergabe von Daten</h2>
            <div className="mb-8">
              <p className="text-gray-700 leading-relaxed">
                Eine Weitergabe Ihrer personenbezogenen Daten an Dritte findet nur statt, soweit dies
                zur Vertragserfüllung notwendig ist, wir gesetzlich dazu verpflichtet sind oder Sie
                ausdrücklich eingewilligt haben. Die im Rahmen der Nutzung unserer Dienste eingesetzten
                Auftragsverarbeiter (Cloudflare, Brevo, Stripe) sind vertraglich zur Einhaltung der
                Datenschutzvorschriften verpflichtet.
              </p>
            </div>

            {/* 8. Ihre Rechte */}
            <h2 className="text-2xl font-bold text-navy mb-4">8. Ihre Rechte</h2>
            <div className="mb-8">
              <p className="text-gray-700 leading-relaxed">
                Ihnen stehen gegenüber uns folgende Rechte zu:
              </p>
              <ul className="list-disc list-inside text-gray-700 mt-4 space-y-2">
                <li><strong>Auskunftsrecht</strong> — Art. 15 DSGVO</li>
                <li><strong>Recht auf Berichtigung</strong> — Art. 16 DSGVO</li>
                <li><strong>Recht auf Löschung</strong> — Art. 17 DSGVO</li>
                <li><strong>Recht auf Einschränkung der Verarbeitung</strong> — Art. 18 DSGVO</li>
                <li><strong>Recht auf Datenübertragbarkeit</strong> — Art. 20 DSGVO</li>
                <li><strong>Widerspruchsrecht</strong> — Art. 21 DSGVO</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-4">
                Soweit die Verarbeitung auf einer Einwilligung beruht, haben Sie das Recht, diese
                jederzeit mit Wirkung für die Zukunft zu widerrufen (Art. 7 Abs. 3 DSGVO). Die
                Rechtmäßigkeit der bis zum Widerruf erfolgten Verarbeitung bleibt davon unberührt.
              </p>
              <p className="text-gray-700 leading-relaxed mt-4">
                Sie haben zudem das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren.
                Die für uns zuständige Behörde ist:
              </p>
              <p className="text-gray-700 leading-relaxed mt-4">
                <strong className="text-navy">Der Hamburgische Beauftragte für Datenschutz und Informationsfreiheit</strong><br />
                Ludwig-Erhard-Str. 22<br />
                20459 Hamburg<br />
                <a href="https://datenschutz.hamburg.de" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  datenschutz.hamburg.de
                </a>
              </p>
            </div>

            {/* 9. Widerspruch Werbe-Mails */}
            <h2 className="text-2xl font-bold text-navy mb-4">9. Widerspruch gegen Werbe-Mails</h2>
            <div className="mb-8">
              <p className="text-gray-700 leading-relaxed">
                Der Nutzung von im Rahmen der Impressumspflicht veröffentlichten Kontaktdaten zur
                Übersendung von nicht ausdrücklich angeforderter Werbung und Informationsmaterialien
                wird hiermit widersprochen. Wir behalten uns ausdrücklich rechtliche Schritte für den
                Fall der unverlangten Zusendung von Werbeinformationen, etwa durch Spam-E-Mails, vor.
              </p>
            </div>

            {/* 10. Datensicherheit */}
            <h2 className="text-2xl font-bold text-navy mb-4">10. Datensicherheit</h2>
            <div className="mb-8">
              <p className="text-gray-700 leading-relaxed">
                Unsere Website nutzt zur Übertragung von Daten ausschließlich TLS-Verschlüsselung
                (Transport Layer Security). Wir treffen darüber hinaus geeignete technische und
                organisatorische Maßnahmen, um Ihre Daten gegen unbefugten Zugriff, Verlust oder
                Manipulation zu schützen.
              </p>
            </div>

            {/* 11. Aktualität */}
            <h2 className="text-2xl font-bold text-navy mb-4">11. Aktualität dieser Datenschutzerklärung</h2>
            <div className="mb-8">
              <p className="text-gray-700 leading-relaxed">
                Diese Datenschutzerklärung hat den Stand <strong>Juni 2026</strong>. Wir behalten uns vor,
                sie bei Änderungen unserer Website oder aufgrund geänderter rechtlicher Vorgaben
                anzupassen. Die jeweils aktuelle Version ist jederzeit unter „Datenschutz" auf
                unserer Website abrufbar.
              </p>
            </div>

          </div>
        </div>
      </Section>
    </>
  );
}
