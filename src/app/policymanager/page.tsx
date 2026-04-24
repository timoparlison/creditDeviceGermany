import { Metadata } from 'next';
import { Hero, Features, FAQ } from '@/components/sections';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import {
  JsonLd,
  breadcrumbSchema,
  faqSchema,
  softwareApplicationSchema,
} from '@/components/seo/JsonLd';
import { SITE_URL } from '@/lib/seo';
import {
  Euro,
  BellRing,
  Clock,
  RefreshCw,
  Calculator,
  FileSearch,
  Layers,
  FolderArchive,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'PolicyManager — Ihr neuer bester Freund für die Kreditversicherung',
  description:
    'Der PolicyManager wurde in Zusammenarbeit mit Atradius, Coface und Euler Hermes entwickelt, um die Verwaltung Ihrer Kreditversicherungspolice zu optimieren – ab 300 € pro Monat.',
  alternates: { canonical: '/policymanager' },
  openGraph: {
    title: 'PolicyManager — Ihr neuer bester Freund für die Kreditversicherung',
    description:
      'In Zusammenarbeit mit Atradius, Coface und Euler Hermes entwickelt – ab 300 € pro Monat.',
    url: `${SITE_URL}/policymanager`,
    type: 'website',
  },
};

const features = [
  {
    title: 'Erschwingliches Abonnement',
    description: 'Der PolicyManager ist schon ab 300 Euro pro Monat erhältlich – auch für KMU in Reichweite.',
    icon: Euro,
  },
  {
    title: 'Automatische Erinnerung',
    description: 'Sie erhalten automatisch ein Signal, zum Beispiel bei Überziehung oder Überschreitung eines Limits. Sie sind immer pünktlich.',
    icon: BellRing,
  },
  {
    title: 'Sie sparen Zeit',
    description: 'Manuelle Operationen und Suchvorgänge entfallen. Zeit, die Sie nutzen, um den Verlust des Versicherungsschutzes zu verhindern.',
    icon: Clock,
  },
  {
    title: 'Immer aktuelle Daten',
    description: 'Tägliche – manchmal mehrmals tägliche – Updates zum Status Ihrer Kreditlimits. Entscheidungen, Rücknahmen und Reduzierungen sind sofort sichtbar.',
    icon: RefreshCw,
  },
  {
    title: 'Kreditlimitkosten analysieren',
    description: 'Analysieren Sie, welches Kreditlimit für Ihren Kunden am besten geeignet ist – oder ersetzen Sie ein kostenpflichtiges Limit durch ein kostenloses Selbstbewertungslimit.',
    icon: Calculator,
  },
  {
    title: 'Wertvolle Kreditauskünfte',
    description: 'Kreditauskünfte sind das ideale Instrument zur Festlegung eines gedeckten Kreditlimits – vollständig in alle Module integriert und erschwinglich.',
    icon: FileSearch,
  },
  {
    title: 'Ein Unternehmen, ein Limit',
    description: 'Der PolicyManager erkennt Unternehmen mit mehreren Debitorennummern und verknüpft alle Rechnungen mit einem einzigen Limit – über die Handelsregister­nummer.',
    icon: Layers,
  },
  {
    title: 'Geordnete Wiedervorlage',
    description: 'Im Schadensfall mit zwei Mausklicks ein Excel-Dokument mit überfälligen Rechnungen und Historie – Obliegenheiten des Versicherers vollständig erfüllt.',
    icon: FolderArchive,
  },
];

const faqItems = [
  {
    question: 'Mit welchen Kreditversicherern wurde der PolicyManager entwickelt?',
    answer: 'Der PolicyManager wurde in Zusammenarbeit mit Atradius, Coface und Euler Hermes entwickelt, um die Verwaltung Ihrer Kreditversicherungspolice zu optimieren und zu erleichtern.',
  },
  {
    question: 'Was kostet der PolicyManager?',
    answer: 'Der PolicyManager ist schon ab 300 Euro pro Monat erhältlich. Das Produkt liegt damit auch in Reichweite von KMU.',
  },
  {
    question: 'Wie werden Daten mit dem Versicherer ausgetauscht?',
    answer: 'Ein praktischer Webservice mit dem Versicherer sorgt dafür, dass Informationen automatisch ausgetauscht werden. Mit jeder Aktualisierung generiert das System automatisch neue Listen und Benachrichtigungen – das minimiert Fehler und spart Zeit.',
  },
  {
    question: 'Wie hilft der PolicyManager bei Selbstbewertungen?',
    answer: 'Die Festlegung eigener Limits auf Basis von Zahlungserfahrungen ist rechenintensiv. Der PolicyManager verwendet die gleiche Berechnungsmethode wie die Versicherer – Sie erhalten sofort Ihr Kreditlimit samt Berechnung.',
  },
];

export default function PolicyManagerPage() {
  return (
    <>
      <JsonLd
        data={[
          softwareApplicationSchema({
            name: 'PolicyManager',
            description:
              'Software zur zentralen Verwaltung Ihrer Kreditversicherung — Limits, Umsatzmeldungen und Schadenmanagement.',
            url: `${SITE_URL}/policymanager`,
          }),
          faqSchema(faqItems),
          breadcrumbSchema([
            { name: 'Startseite', path: '/' },
            { name: 'PolicyManager', path: '/policymanager' },
          ]),
        ]}
      />
      <Hero
        title="PolicyManager — Ihr neuer bester Freund"
        subtitle="Der PolicyManager wurde in Zusammenarbeit mit Atradius, Coface und Euler Hermes entwickelt, um die Verwaltung Ihrer Kreditversicherungspolice zu optimieren. Ein Tool, das Risiken vermeidet – durch rechtzeitige Maßnahmen."
        primaryCta={{
          text: 'Kostenlose Demo anfordern',
          href: '/kontakt',
        }}
        secondaryCta={{
          text: 'Vorteile entdecken',
          href: '#features',
        }}
        image="https://206.wpcdnnode.com/creditdevice.com/wp-content/uploads/2024/04/Roos_homepage-902x1024.webp"
        imageAlt="PolicyManager-Oberfläche zur Verwaltung von Kreditversicherungs-Limits und Umsatzmeldungen"
      />

      <Features
        title="Entdecken Sie Ihre Vorteile"
        subtitle="Die manuelle Verwaltung einer Kreditversicherungspolice ist viel Arbeit. Der PolicyManager nimmt Ihnen all das ab – und minimiert die Fehleranfälligkeit."
        features={features}
        columns={3}
        background="gray"
      />

      <Section background="white" id="features">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-6">
              Alles in einer Anwendung
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Mit den Credit-Management-Modulen von CreditDevice kombinieren Sie alles in einer
              Anwendung: die Verwaltung Ihrer Kreditversicherung, Ihr Debitoren-Management,
              die Erfassung von Kreditinformationen und die Analyse von Risiken.
            </p>
            <p className="text-lg text-gray-600 mb-6">
              Mit dem PolicyManager verwalten Sie Ihre Kreditversicherungspolice perfekt –
              alle Module sind miteinander kompatibel, Sie müssen nicht zwischen Systemen wechseln.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center text-gray-700">
                <span className="w-2 h-2 bg-primary rounded-full mr-3" />
                Direkte Anbindung an die Datenbank Ihres Versicherers
              </li>
              <li className="flex items-center text-gray-700">
                <span className="w-2 h-2 bg-primary rounded-full mr-3" />
                Tägliche Updates – manchmal mehrmals täglich
              </li>
              <li className="flex items-center text-gray-700">
                <span className="w-2 h-2 bg-primary rounded-full mr-3" />
                Kompatibel mit Atradius, Coface, Euler Hermes
              </li>
              <li className="flex items-center text-gray-700">
                <span className="w-2 h-2 bg-primary rounded-full mr-3" />
                Obliegenheiten im Schadensfall vollständig erfüllt
              </li>
            </ul>
            <Button href="/kontakt" variant="primary" size="lg">
              Kostenlose Demo anfordern
            </Button>
          </div>
          <div className="bg-gradient-to-br from-primary/10 to-navy/10 rounded-2xl p-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="font-bold text-navy text-lg mb-4">Kreditlimit-Übersicht</h3>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-navy">Mustermann GmbH</span>
                    <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">Aktiv</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Limit</span>
                    <span className="font-semibold text-navy">€ 250.000</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Ausnutzung</span>
                    <span className="font-semibold text-primary">78%</span>
                  </div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-navy">Beispiel AG</span>
                    <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full">Prüfung</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Limit beantragt</span>
                    <span className="font-semibold text-navy">€ 500.000</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Status</span>
                    <span className="font-semibold text-yellow-600">In Bearbeitung</span>
                  </div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-navy">Test KG</span>
                    <span className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded-full">Warnung</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Limit</span>
                    <span className="font-semibold text-navy">€ 100.000</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Ausnutzung</span>
                    <span className="font-semibold text-red-500">95%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <FAQ
        title="Häufig gestellte Fragen"
        subtitle="Erfahren Sie mehr über PolicyManager"
        items={faqItems}
      />
    </>
  );
}
