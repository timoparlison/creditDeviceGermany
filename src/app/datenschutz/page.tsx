import { Metadata } from 'next';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';

export const metadata: Metadata = {
  title: 'Datenschutzerklärung',
  description: 'Datenschutzerklärung der CreditDevice GmbH gemäß DSGVO',
};

export default function DatenschutzPage() {
  return (
    <>
      <div className="bg-navy py-16">
        <Container>
          <h1 className="text-4xl font-bold text-white">Datenschutzerklärung</h1>
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
                Telefon: 040 / 89 069 29 90<br />
                E-Mail: <a href="mailto:info@creditdevice.de" className="text-primary hover:underline">info@creditdevice.de</a>
              </p>
            </div>

            <h2 className="text-2xl font-bold text-navy mb-4">2. Allgemeine Hinweise zur Datenverarbeitung</h2>
            <div className="mb-8">
              <p className="text-gray-700 leading-relaxed">
                Wir nehmen den Schutz Ihrer persönlichen Daten sehr ernst und behandeln Ihre personenbezogenen
                Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften sowie dieser
                Datenschutzerklärung.
              </p>
              <p className="text-gray-700 leading-relaxed mt-4">
                Die Nutzung unserer Website ist in der Regel ohne Angabe personenbezogener Daten möglich.
                Soweit auf unseren Seiten personenbezogene Daten (beispielsweise Name, Anschrift oder
                E-Mail-Adressen) erhoben werden, erfolgt dies, soweit möglich, stets auf freiwilliger Basis.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-navy mb-4">3. Erhebung und Speicherung personenbezogener Daten</h2>
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-navy mb-3">a) Beim Besuch der Website</h3>
              <p className="text-gray-700 leading-relaxed">
                Beim Aufrufen unserer Website werden durch den auf Ihrem Endgerät zum Einsatz kommenden Browser
                automatisch Informationen an den Server unserer Website gesendet. Diese Informationen werden
                temporär in einem sog. Logfile gespeichert. Folgende Informationen werden dabei ohne Ihr Zutun
                erfasst und bis zur automatisierten Löschung gespeichert:
              </p>
              <ul className="list-disc list-inside text-gray-700 mt-4 space-y-2">
                <li>IP-Adresse des anfragenden Rechners</li>
                <li>Datum und Uhrzeit des Zugriffs</li>
                <li>Name und URL der abgerufenen Datei</li>
                <li>Website, von der aus der Zugriff erfolgt (Referrer-URL)</li>
                <li>Verwendeter Browser und ggf. das Betriebssystem Ihres Rechners</li>
                <li>Name Ihres Access-Providers</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-4">
                Die Rechtsgrundlage für die Datenverarbeitung ist Art. 6 Abs. 1 S. 1 lit. f DSGVO. Unser
                berechtigtes Interesse folgt aus den oben aufgelisteten Zwecken zur Datenerhebung.
              </p>

              <h3 className="text-xl font-semibold text-navy mb-3 mt-6">b) Bei Nutzung unseres Kontaktformulars</h3>
              <p className="text-gray-700 leading-relaxed">
                Bei Fragen jeglicher Art bieten wir Ihnen die Möglichkeit, mit uns über ein auf der Website
                bereitgestelltes Formular Kontakt aufzunehmen. Dabei ist die Angabe einer gültigen
                E-Mail-Adresse erforderlich, damit wir wissen, von wem die Anfrage stammt und um diese
                beantworten zu können. Weitere Angaben können freiwillig getätigt werden.
              </p>
              <p className="text-gray-700 leading-relaxed mt-4">
                Die Datenverarbeitung zum Zwecke der Kontaktaufnahme mit uns erfolgt nach Art. 6 Abs. 1 S. 1
                lit. a DSGVO auf Grundlage Ihrer freiwillig erteilten Einwilligung.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-navy mb-4">4. Verwendung von Cookies</h2>
            <div className="mb-8">
              <p className="text-gray-700 leading-relaxed">
                Unsere Website verwendet Cookies. Bei Cookies handelt es sich um kleine Textdateien, die
                lokal im Zwischenspeicher Ihres Internet-Browsers gespeichert werden. Die Cookies ermöglichen
                die Wiedererkennung Ihres Internet-Browsers.
              </p>
              <p className="text-gray-700 leading-relaxed mt-4">
                Wir setzen Cookies ein, um unsere Website nutzerfreundlicher zu gestalten. Einige Elemente
                unserer Internetseite erfordern es, dass der aufrufende Browser auch nach einem Seitenwechsel
                identifiziert werden kann.
              </p>
              <p className="text-gray-700 leading-relaxed mt-4">
                Die Rechtsgrundlage für die Verarbeitung personenbezogener Daten unter Verwendung von Cookies
                ist Art. 6 Abs. 1 lit. f DSGVO. Sie können Ihren Browser so einstellen, dass Sie über das
                Setzen von Cookies informiert werden und Cookies nur im Einzelfall erlauben, die Annahme
                von Cookies für bestimmte Fälle oder generell ausschließen sowie das automatische Löschen
                der Cookies beim Schließen des Browsers aktivieren.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-navy mb-4">5. Weitergabe von Daten</h2>
            <div className="mb-8">
              <p className="text-gray-700 leading-relaxed">
                Eine Übermittlung Ihrer persönlichen Daten an Dritte zu anderen als den im Folgenden
                aufgeführten Zwecken findet nicht statt. Wir geben Ihre persönlichen Daten nur an Dritte
                weiter, wenn:
              </p>
              <ul className="list-disc list-inside text-gray-700 mt-4 space-y-2">
                <li>Sie Ihre nach Art. 6 Abs. 1 S. 1 lit. a DSGVO ausdrückliche Einwilligung dazu erteilt haben</li>
                <li>die Weitergabe nach Art. 6 Abs. 1 S. 1 lit. f DSGVO zur Wahrung unserer berechtigten Interessen zulässig ist</li>
                <li>für den Fall, dass für die Weitergabe nach Art. 6 Abs. 1 S. 1 lit. c DSGVO eine gesetzliche Verpflichtung besteht</li>
                <li>dies gesetzlich zulässig und nach Art. 6 Abs. 1 S. 1 lit. b DSGVO für die Abwicklung von Vertragsverhältnissen erforderlich ist</li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold text-navy mb-4">6. Ihre Rechte</h2>
            <div className="mb-8">
              <p className="text-gray-700 leading-relaxed">
                Sie haben gegenüber uns folgende Rechte hinsichtlich der Sie betreffenden personenbezogenen Daten:
              </p>
              <ul className="list-disc list-inside text-gray-700 mt-4 space-y-2">
                <li><strong>Auskunftsrecht</strong> (Art. 15 DSGVO)</li>
                <li><strong>Recht auf Berichtigung</strong> (Art. 16 DSGVO)</li>
                <li><strong>Recht auf Löschung</strong> (Art. 17 DSGVO)</li>
                <li><strong>Recht auf Einschränkung der Verarbeitung</strong> (Art. 18 DSGVO)</li>
                <li><strong>Recht auf Datenübertragbarkeit</strong> (Art. 20 DSGVO)</li>
                <li><strong>Widerspruchsrecht</strong> (Art. 21 DSGVO)</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-4">
                Sie haben zudem das Recht, sich bei einer Datenschutz-Aufsichtsbehörde über die Verarbeitung
                Ihrer personenbezogenen Daten durch uns zu beschweren.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-navy mb-4">7. Widerspruch gegen Werbe-Mails</h2>
            <div className="mb-8">
              <p className="text-gray-700 leading-relaxed">
                Der Nutzung von im Rahmen der Impressumspflicht veröffentlichten Kontaktdaten zur Übersendung
                von nicht ausdrücklich angeforderter Werbung und Informationsmaterialien wird hiermit
                widersprochen. Die Betreiber der Seiten behalten sich ausdrücklich rechtliche Schritte im
                Falle der unverlangten Zusendung von Werbeinformationen, etwa durch Spam-E-Mails, vor.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-navy mb-4">8. Datensicherheit</h2>
            <div className="mb-8">
              <p className="text-gray-700 leading-relaxed">
                Wir verwenden innerhalb des Website-Besuchs das verbreitete SSL-Verfahren (Secure Socket Layer)
                in Verbindung mit der jeweils höchsten Verschlüsselungsstufe, die von Ihrem Browser unterstützt
                wird. In der Regel handelt es sich dabei um eine 256-Bit-Verschlüsselung.
              </p>
              <p className="text-gray-700 leading-relaxed mt-4">
                Wir bedienen uns geeigneter technischer und organisatorischer Sicherheitsmaßnahmen, um Ihre
                Daten gegen zufällige oder vorsätzliche Manipulationen, teilweisen oder vollständigen Verlust,
                Zerstörung oder gegen den unbefugten Zugriff Dritter zu schützen. Unsere Sicherheitsmaßnahmen
                werden entsprechend der technologischen Entwicklung fortlaufend verbessert.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-navy mb-4">9. Aktualität und Änderung dieser Datenschutzerklärung</h2>
            <div className="mb-8">
              <p className="text-gray-700 leading-relaxed">
                Diese Datenschutzerklärung ist aktuell gültig und hat den Stand Januar 2024.
              </p>
              <p className="text-gray-700 leading-relaxed mt-4">
                Durch die Weiterentwicklung unserer Website und Angebote darüber oder aufgrund geänderter
                gesetzlicher beziehungsweise behördlicher Vorgaben kann es notwendig werden, diese
                Datenschutzerklärung zu ändern. Die jeweils aktuelle Datenschutzerklärung kann jederzeit
                auf der Website unter „Datenschutz" von Ihnen abgerufen und ausgedruckt werden.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-navy mb-4">10. Fragen zum Datenschutz</h2>
            <div className="mb-8">
              <p className="text-gray-700 leading-relaxed">
                Wenn Sie Fragen zum Datenschutz haben, schreiben Sie uns bitte eine E-Mail an:
                <a href="mailto:info@creditdevice.de" className="text-primary hover:underline ml-1">
                  info@creditdevice.de
                </a>
              </p>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
