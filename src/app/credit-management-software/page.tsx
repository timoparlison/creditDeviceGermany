import { Metadata } from 'next';
import { Hero, Features, FAQ } from '@/components/sections';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import {
  Eye,
  Languages,
  FileBarChart2,
  ListChecks,
  Network,
  MessageSquareWarning,
} from 'lucide-react';
import {
  JsonLd,
  breadcrumbSchema,
  faqSchema,
  softwareApplicationSchema,
} from '@/components/seo/JsonLd';
import { SITE_URL } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Credit Management Software — Professionelles Debitoren-Management',
  description:
    'Ein besserer Cashflow, klare Berichte und effektive Kommunikation dank einer Anwendung. Die Credit Management Software von CreditDevice geht über reines Debitoren-Management hinaus.',
  alternates: { canonical: '/credit-management-software' },
  openGraph: {
    title: 'Credit Management Software — Professionelles Debitoren-Management',
    description:
      'Ein besserer Cashflow, klare Berichte und effektive Kommunikation dank einer Anwendung.',
    url: `${SITE_URL}/credit-management-software`,
    type: 'website',
  },
};

const features = [
  {
    title: 'Volle Transparenz über Ihre Debitoren',
    description: 'Module für Kreditinformationen, Debitoren-Management, Risikoanalyse und Kreditversicherung in einer Anwendung. Der aktuelle Status jedes Debitors ist für jeden im Unternehmen klar.',
    icon: Eye,
  },
  {
    title: 'Rechnungen früher bezahlt',
    description: 'Sprechen Sie die Sprache Ihres Debitors: passen Sie Reihenfolge, Inhalt, Sprache und Struktur des Workflows pro Kundenprofil an. Der richtige Ton – und Sie werden früher bezahlt.',
    icon: Languages,
  },
  {
    title: 'Maßgeschneiderte Berichte',
    description: 'Informieren Sie die Geschäftsleitung monatlich über die größten Debitor oder die Kundenbetreuer wöchentlich über offene Posten. Automatisch über unser flexibles Berichtstool.',
    icon: FileBarChart2,
  },
  {
    title: 'Zeit sparen mit Aktionslisten',
    description: 'Arbeiten Sie täglich anhand von Aktionslisten und vermeiden Sie verspätete Zahlungen. Die Kundenprofile bestimmen, welche Aktion wann geplant ist.',
    icon: ListChecks,
  },
  {
    title: 'Auf Konzernebene anmahnen',
    description: 'Verknüpfen Sie mehrere Debitorennummern desselben Kunden. Sehr praktisch für Mutter- und Tochtergesellschaften – alle auf einmal anmahnen, mit Vergleich zum Kreditlimit auf jeder Ebene.',
    icon: Network,
  },
  {
    title: 'Schnelle Reklamationsbearbeitung',
    description: 'Erfassen Sie Reklamationen einfach und sorgen Sie durch klare Kommunikation und Eskalation dafür, dass sie schnell bearbeitet werden.',
    icon: MessageSquareWarning,
  },
];

const faqItems = [
  {
    question: 'Warum Credit Management Software zusätzlich zur Buchhaltung?',
    answer: 'Sie haben bereits eine Buchhaltungssoftware – doch oft ist ein traditionelles Paket nicht flexibel und vielseitig genug für ein modernes Kreditmanagement. Unsere Software ist genau dafür gebaut.',
  },
  {
    question: 'Wie ist die Credit Management Software mit Kreditinformationen verknüpft?',
    answer: 'Die Software ist direkt mit Kreditinformationsdatenbanken verbunden. Sie haben Online-Zugang zu mehr als 430 Millionen Unternehmen weltweit – eine wertvolle Kombination für ein vollständiges Bild Ihrer Debitoren.',
  },
  {
    question: 'Wie hängt die Software mit dem PolicyManager zusammen?',
    answer: 'Mit dem Benachrichtigungssystem des PolicyManagers erfüllen Sie die Obliegenheiten Ihres Kreditversicherers rechtzeitig. Sie verlieren nie den Versicherungsschutz und erfüllen die Obliegenheiten für Entschädigungsansprüche.',
  },
  {
    question: 'Gibt es Benutzerlizenzen?',
    answer: 'Nein. CreditDevice verwendet Unternehmenslizenzen, in denen alle User inklusive sind.',
  },
  {
    question: 'Welche Berechtigungsstrukturen gibt es für Benutzer?',
    answer: 'Es gibt sowohl ein flexibles Rollensystem, sowie eine Möglichkeit zur Datenfilterung wie beispielsweise Abbildung von Mandatenstrukturen und Ländern.',
  }
];

export default function CreditManagementSoftwarePage() {
  return (
    <>
      <JsonLd
        data={[
          softwareApplicationSchema({
            name: 'CreditDevice Credit Management Software',
            description:
              'Credit Management Software mit zentralem Dossier, automatisierten Workflows, Debitorenportal und ERP-Integration.',
            url: `${SITE_URL}/credit-management-software`,
          }),
          faqSchema(faqItems),
          breadcrumbSchema([
            { name: 'Startseite', path: '/' },
            { name: 'Credit Management Software', path: '/credit-management-software' },
          ]),
        ]}
      />
      <Hero
        title="Professionelles Debitoren-Management"
        subtitle="Ein besserer Cashflow, klare Berichte und effektive Kommunikation dank einer Anwendung."
        primaryCta={{
          text: 'Demo anfordern',
          href: '/kontakt',
        }}
        secondaryCta={{
          text: 'Angebot anfordern',
          href: '/kontakt',
        }}
        image="https://206.wpcdnnode.com/creditdevice.com/wp-content/uploads/2024/02/Foto-van-Marcel-en-Olav-scaled.webp"
        imageAlt="Credit-Management-Software von CreditDevice — zentrale Übersicht für Debitoren-Management und Mahnwesen"
      />

      <Features
        title="Was unsere Software auszeichnet"
        subtitle="Bei CreditDevice wählen Sie das für Sie passende Paket – Module für Kreditinformationen, Debitoren-Management, Risikoanalyse und Kreditversicherung in einer Anwendung."
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
              Wie einzigartig ist CreditDevice?
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Wir sind der Meinung, dass jeder Kreditmanager von nur einer Anwendung für alle
              Dienstleistungen im Bereich Kreditmanagement profitiert: die Verwaltung Ihrer
              Kreditversicherungspolice, Ihr Debitoren-Management, die Erfassung von
              Kreditinformationen und die Analyse von Risiken.
            </p>
            <p className="text-lg text-gray-600 mb-6">
              Unsere selbst entwickelte Credit Management Software ist mit verschiedenen
              Kreditinformationsdatenbank verknüpft – direkter Online-Zugang zu mehr als
              430 Millionen Unternehmen weltweit.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center text-gray-700">
                            <span className="w-2 h-2 bg-primary rounded-full mr-3" />
                            Eine Unternehmenslizenz - alle User inklusive
                          </li>
              <li className="flex items-center text-gray-700">
                <span className="w-2 h-2 bg-primary rounded-full mr-3" />
                Über 430 Mio. Unternehmen weltweit
              </li>
              <li className="flex items-center text-gray-700">
                <span className="w-2 h-2 bg-primary rounded-full mr-3" />
                Kombinierbar mit PolicyManager
              </li>
            </ul>
            <Button href="/kontakt" variant="primary" size="lg">
              Demo anfragen
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
