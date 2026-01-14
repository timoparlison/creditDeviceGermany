import { Section } from '../ui/Section';
import { Button } from '../ui/Button';
import { Check } from 'lucide-react';

const benefits = [
  'Alle Bonitätsinformationen an einem Ort',
  'Automatisiertes Debitorenmanagement',
  'Vollständige Kreditversicherungsverwaltung',
  'Nahtlose Integration in Ihre Systeme',
  'Echtzeit-Überwachung und Benachrichtigungen',
  'Umfassende Berichterstellung',
];

export function AllInOne() {
  return (
    <Section background="white">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-6">
            Alles in einer Lösung
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            CreditDevice vereint alle Aspekte des Credit Managements in einer einzigen,
            leistungsstarken Plattform. Sparen Sie Zeit, reduzieren Sie Risiken und
            optimieren Sie Ihre Prozesse.
          </p>
          <ul className="space-y-4 mb-8">
            {benefits.map((benefit) => (
              <li key={benefit} className="flex items-start">
                <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                  <Check className="w-4 h-4 text-primary" />
                </div>
                <span className="text-gray-700">{benefit}</span>
              </li>
            ))}
          </ul>
          <Button href="/kontakt" variant="primary" size="lg">
            Kostenlose Demo vereinbaren
          </Button>
        </div>
        <div className="relative">
          <div className="bg-gradient-to-br from-primary/10 to-navy/10 rounded-2xl p-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">CD</span>
                </div>
                <div>
                  <h4 className="font-semibold text-navy">CreditDevice Platform</h4>
                  <p className="text-sm text-gray-500">Unified Credit Management</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-600">Aktive Kunden</span>
                  <span className="font-semibold text-navy">2.500+</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-600">Prozessierte Dossiers</span>
                  <span className="font-semibold text-navy">1.2M+</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-600">Verfügbare Länder</span>
                  <span className="font-semibold text-navy">200+</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
