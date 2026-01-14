import { Metadata } from 'next';
import { Hero, Features, FAQ } from '@/components/sections';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import {
  FolderOpen,
  Mail,
  BarChart,
  Globe,
  GitBranch,
  CreditCard,
  MessageSquare,
  Handshake,
  FileText
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Credit Management Software',
  description: 'Sparen Sie Zeit, Geld und Energie mit unserer Credit Management Software. Ihr Schlüssel zu effizientem Debitorenmanagement.',
};

const features = [
  {
    title: 'Zentrales Dossier',
    description: 'Alle Kundeninformationen, Kommunikation und Dokumente an einem Ort.',
    icon: FolderOpen,
  },
  {
    title: 'E-Mail-Integration',
    description: 'Automatische Zuordnung von E-Mails zu Kundendossiers.',
    icon: Mail,
  },
  {
    title: 'Berichte & Analytics',
    description: 'Umfassende Reporting-Funktionen für volle Transparenz.',
    icon: BarChart,
  },
  {
    title: 'Debitorenportal',
    description: 'Self-Service-Portal für Ihre Kunden.',
    icon: Globe,
  },
  {
    title: 'Workflows',
    description: 'Automatisierte Prozesse für effizientes Arbeiten.',
    icon: GitBranch,
  },
  {
    title: 'Online-Zahlung',
    description: 'Einfache Zahlungsmöglichkeiten für schnelleren Geldeingang.',
    icon: CreditCard,
  },
  {
    title: 'Beschwerdemanagement',
    description: 'Strukturierte Bearbeitung von Kundenanliegen.',
    icon: MessageSquare,
  },
  {
    title: 'Zahlungsvereinbarungen',
    description: 'Flexible Ratenzahlungen und Stundungen.',
    icon: Handshake,
  },
  {
    title: 'Fakturierung',
    description: 'Integrierte Rechnungserstellung und -verwaltung.',
    icon: FileText,
  },
];

const faqItems = [
  {
    question: 'Wie funktioniert das zentrale Dossier?',
    answer: 'Das zentrale Dossier sammelt alle relevanten Informationen zu einem Debitor an einem Ort: Stammdaten, Bonitätsinformationen, offene Posten, Kommunikationshistorie und Dokumente. So haben Sie immer den vollständigen Überblick.',
  },
  {
    question: 'Können automatische Mahnläufe eingerichtet werden?',
    answer: 'Ja, Sie können vollständig automatisierte Mahnläufe konfigurieren. Definieren Sie Mahnstufen, Fristen und Eskalationspfade individuell für verschiedene Kundengruppen.',
  },
  {
    question: 'Wie funktioniert das Debitorenportal?',
    answer: 'Das Debitorenportal ist eine Self-Service-Plattform für Ihre Kunden. Dort können sie offene Rechnungen einsehen, Zahlungen vornehmen, Reklamationen einreichen und Ratenzahlungen vereinbaren.',
  },
  {
    question: 'Welche Schnittstellen werden unterstützt?',
    answer: 'Wir bieten Standardschnittstellen zu gängigen ERP-Systemen wie SAP, Microsoft Dynamics und vielen anderen. Zusätzlich steht eine REST-API für individuelle Integrationen zur Verfügung.',
  },
];

export default function CreditManagementSoftwarePage() {
  return (
    <>
      <Hero
        title="Credit Management Software"
        subtitle="Sparen Sie Zeit, Geld und Energie – Ihr Schlüssel zu effizientem Debitorenmanagement. Automatisieren Sie Prozesse und behalten Sie den Überblick."
        primaryCta={{
          text: 'Demo anfordern',
          href: '/kontakt',
        }}
        secondaryCta={{
          text: 'Features entdecken',
          href: '#features',
        }}
      />

      <Features
        title="Leistungsstarke Funktionen"
        subtitle="Entdecken Sie alle Funktionen unserer Credit Management Software"
        features={features}
        columns={3}
        background="gray"
      />

      <Section background="white" id="features">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <div className="bg-gray-50 rounded-2xl p-6">
              <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-semibold text-navy">Debitorenübersicht</span>
                  <span className="text-xs text-gray-500">Heute</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Offene Posten</span>
                    <span className="font-medium text-navy">€ 847.250</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Überfällig</span>
                    <span className="font-medium text-red-500">€ 125.430</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">In Mahnung</span>
                    <span className="font-medium text-orange-500">€ 45.200</span>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-semibold text-navy">Aktive Workflows</span>
                  <span className="text-primary text-sm font-medium">23 aktiv</span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span className="text-sm text-gray-600">Zahlungserinnerung (12)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                    <span className="text-sm text-gray-600">1. Mahnung (7)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full" />
                    <span className="text-sm text-gray-600">Inkasso (4)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-6">
              Volle Kontrolle über Ihre Debitoren
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Unsere Credit Management Software gibt Ihnen alle Werkzeuge an die Hand,
              um Ihre Forderungen effizient zu verwalten. Von der automatischen
              Mahnung bis zur Inkasso-Übergabe – alles in einem System.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center text-gray-700">
                <span className="w-2 h-2 bg-primary rounded-full mr-3" />
                Automatisierte Mahnprozesse
              </li>
              <li className="flex items-center text-gray-700">
                <span className="w-2 h-2 bg-primary rounded-full mr-3" />
                Echtzeit-Dashboards und KPIs
              </li>
              <li className="flex items-center text-gray-700">
                <span className="w-2 h-2 bg-primary rounded-full mr-3" />
                Flexible Eskalationsstufen
              </li>
              <li className="flex items-center text-gray-700">
                <span className="w-2 h-2 bg-primary rounded-full mr-3" />
                Nahtlose ERP-Integration
              </li>
            </ul>
            <Button href="/kontakt" variant="primary" size="lg">
              Jetzt Demo vereinbaren
            </Button>
          </div>
        </div>
      </Section>

      <FAQ
        title="Häufig gestellte Fragen"
        subtitle="Erfahren Sie mehr über unsere Credit Management Software"
        items={faqItems}
      />
    </>
  );
}
