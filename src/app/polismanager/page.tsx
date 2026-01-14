import { Metadata } from 'next';
import { Hero, Features, FAQ } from '@/components/sections';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import {
  Shield,
  Receipt,
  FileBarChart,
  BarChart3,
  UserCheck,
  Bell
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'PolisManager',
  description: 'Die einzige echte Lösung zur Verwaltung Ihrer Kreditversicherung. Verwalten Sie Kreditlimits, Umsatzmeldungen und Berichte in einer Anwendung.',
};

const features = [
  {
    title: 'Kreditlimits',
    description: 'Beantragen und verwalten Sie Kreditlimits bei Ihrem Versicherer direkt aus der Software.',
    icon: Shield,
  },
  {
    title: 'Zuweisen ältester Rechnung',
    description: 'Automatische Zuordnung der ältesten Rechnung für korrekte Meldungen.',
    icon: Receipt,
  },
  {
    title: 'Umsatzmeldung',
    description: 'Einfache und schnelle Umsatzmeldungen an Ihren Kreditversicherer.',
    icon: FileBarChart,
  },
  {
    title: 'Berichte',
    description: 'Umfassende Reporting-Funktionen für volle Transparenz.',
    icon: BarChart3,
  },
  {
    title: 'Selbstbewertung',
    description: 'Bewerten Sie Ihre Kunden selbst und ergänzen Sie die Versicherungsdaten.',
    icon: UserCheck,
  },
  {
    title: 'Benachrichtigungen',
    description: 'Automatische Alerts bei Limitänderungen und wichtigen Ereignissen.',
    icon: Bell,
  },
];

const faqItems = [
  {
    question: 'Mit welchen Kreditversicherern arbeitet PolisManager zusammen?',
    answer: 'PolisManager ist kompatibel mit allen großen Kreditversicherern wie Euler Hermes, Coface, Atradius und vielen anderen. Die Schnittstellen werden kontinuierlich erweitert.',
  },
  {
    question: 'Wie funktioniert die Limitbeantragung?',
    answer: 'Sie können Kreditlimits direkt aus PolisManager heraus beantragen. Die Anfrage wird automatisch an Ihren Versicherer übermittelt und Sie erhalten die Antwort direkt im System.',
  },
  {
    question: 'Können mehrere Policen verwaltet werden?',
    answer: 'Ja, PolisManager unterstützt die Verwaltung mehrerer Kreditversicherungspolicen gleichzeitig. Ideal für Unternehmen mit verschiedenen Gesellschaften oder internationalen Policen.',
  },
  {
    question: 'Wie werden Umsatzmeldungen erstellt?',
    answer: 'Umsatzmeldungen werden automatisch auf Basis Ihrer Debitorendaten erstellt. Sie können die Meldung vor dem Versand prüfen und freigeben.',
  },
];

export default function PolisManagerPage() {
  return (
    <>
      <Hero
        title="PolisManager"
        subtitle="Die einzige echte Lösung zur Verwaltung Ihrer Kreditversicherung. Behalten Sie den Überblick über Limits, Umsatzmeldungen und Schäden."
        primaryCta={{
          text: 'Demo anfordern',
          href: '/kontakt',
        }}
        secondaryCta={{
          text: 'Mehr erfahren',
          href: '#features',
        }}
      />

      <Features
        title="Kreditversicherung leicht gemacht"
        subtitle="Verwalten Sie Ihre Kreditversicherung effizient und sparen Sie wertvolle Zeit"
        features={features}
        columns={3}
        background="gray"
      />

      <Section background="white" id="features">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-6">
              Maximieren Sie Ihren Versicherungsschutz
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              PolisManager hilft Ihnen, das Maximum aus Ihrer Kreditversicherung
              herauszuholen. Behalten Sie den Überblick über Ihre Limits, erhalten
              Sie rechtzeitig Warnungen und melden Sie Umsätze mit wenigen Klicks.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center text-gray-700">
                <span className="w-2 h-2 bg-primary rounded-full mr-3" />
                Direkte Anbindung an Kreditversicherer
              </li>
              <li className="flex items-center text-gray-700">
                <span className="w-2 h-2 bg-primary rounded-full mr-3" />
                Automatische Limitüberwachung
              </li>
              <li className="flex items-center text-gray-700">
                <span className="w-2 h-2 bg-primary rounded-full mr-3" />
                Vereinfachte Schadenmeldung
              </li>
              <li className="flex items-center text-gray-700">
                <span className="w-2 h-2 bg-primary rounded-full mr-3" />
                Compliance-konforme Dokumentation
              </li>
            </ul>
            <Button href="/kontakt" variant="primary" size="lg">
              Kostenlose Beratung
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
        subtitle="Erfahren Sie mehr über PolisManager"
        items={faqItems}
      />
    </>
  );
}
