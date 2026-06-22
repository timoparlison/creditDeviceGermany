import { Metadata } from 'next';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { JsonLd, breadcrumbSchema } from '@/components/seo/JsonLd';
import { SITE_URL } from '@/lib/seo';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Über uns — CreditDevice GmbH Hamburg',
  description:
    'CreditDevice GmbH wurde 2017 gegründet – als Resultat einer über 30-jährigen Expertise im Credit Management. Lernen Sie unser Team und unsere Geschichte kennen.',
  alternates: { canonical: '/ueber-uns' },
  openGraph: {
    title: 'Über uns — CreditDevice GmbH Hamburg',
    description:
      'CreditDevice GmbH: Credit Management Spezialist mit über 30 Jahren Erfahrung.',
    url: `${SITE_URL}/ueber-uns`,
    type: 'website',
  },
};

const karriere = [
  { zeit: '1988 – 1991', text: 'Volontär bei Hermes Kreditversicherungs-AG mit dualem Studium' },
  { zeit: '1991 – 2010', text: '19 Jahre bei Bürgel Wirtschaftsinformationen GmbH & Co. KG als CFO – u. a. 28 Unternehmensübernahmen' },
  { zeit: '2011', text: 'Gründung Hanse Debitoren Management' },
  { zeit: '2017', text: 'Gründung CreditDevice GmbH' },
  { zeit: '2021', text: 'Übernahme GlobalCompanyCheck e.U.' },
];

export default function UeberUnsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Startseite', path: '/' },
          { name: 'Über uns', path: '/ueber-uns' },
        ])}
      />

      {/* Hero */}
      <section className="relative bg-navy text-white py-16 md:py-24 overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl" />
        <Container className="relative z-10">
          <div className="max-w-3xl">
            <p className="text-primary font-semibold mb-3 tracking-wide uppercase text-sm">
              Über uns
            </p>
            <h1 className="text-4xl md:text-5xl font-bold leading-[1.1] mb-5">
              Credit Management —<br />
              <span className="text-primary">aus Leidenschaft</span>
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed">
              CreditDevice GmbH wurde 2017 gegründet – als Resultat einer über 30-jährigen
              Zusammenarbeit und Expertise im Credit Management. Unser Ziel: ein digitales
              Rundum-Sorglos-Paket rund um das Kreditmanagement.
            </p>
          </div>
        </Container>
      </section>

      {/* Zahlen */}
      <Section background="gray">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: '2017', label: 'Gründungsjahr' },
            { value: '35+', label: 'Jahre Erfahrung' },
            { value: '2500+', label: 'Aktive Kunden' },
            { value: '200+', label: 'Länder weltweit' },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-4xl font-bold text-primary mb-1">{stat.value}</div>
              <div className="text-gray-600 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* Geschichte */}
      <Section background="white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-6">
              Unsere Geschichte
            </h2>
            <p className="text-lg text-gray-600 mb-4">
              CreditDevice GmbH entstand 2017 aus einer langjährigen Partnerschaft zwischen
              Hans Geluk (CreditDevice B.V., Niederlande) und Sven Buckenberger. Die Idee:
              das gesammelte Know-how aus Jahrzehnten im europäischen Credit Management in
              einem modernen, digitalen Produkt zu bündeln.
            </p>
            <p className="text-lg text-gray-600 mb-4">
                          2020 erwarb CreditDevice das seit 2011 bestehende Inkassogeschäft der Hanse Debitoren Management.
                        </p>
            <p className="text-lg text-gray-600 mb-4">
              2021 übernahmen wir GlobalCompanyCheck e.U. und erweiterten damit unser Angebot
              um weltweite Online-Firmenauskünfte aus über 200 Ländern – direkt integriert in
              unsere Credit Management Software.
            </p>
            <p className="text-lg text-gray-600">
              Heute bieten wir eine Komplettlösung: Credit Management Software, PolicyManager,
              internationale Kreditinformationen und Inkasso – alles aus einer Hand.
            </p>
          </div>
          <div className="bg-gradient-to-br from-navy to-navy-dark rounded-2xl p-8 text-white space-y-4">
            <h3 className="text-xl font-bold mb-2">Unser Anspruch</h3>
            <p className="text-gray-300 text-lg italic leading-relaxed">
              „Ein digitales Rundum-Sorglos-Paket rund um das Credit Management."
            </p>
            <p className="text-primary font-semibold mt-4">— Sven G. Buckenberger, Geschäftsführer</p>
          </div>
        </div>
      </Section>

      {/* Geschäftsführer */}
      <Section background="gray">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-10 text-center">
            Geschäftsführung
          </h2>
          <div className="bg-white rounded-2xl shadow-sm p-8 md:p-10">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-navy mb-1">Sven G. Buckenberger</h3>
                <p className="text-primary font-semibold mb-1">Geschäftsführender Gesellschafter</p>
                <p className="text-gray-500 text-sm mb-4">Betriebswirt (WA) · geb. 1967</p>
                <p className="text-gray-600 mb-6">
                  Sven Buckenberger bringt über 35 Jahre Erfahrung im europäischen Credit Management mit.
                  Als langjähriges Vorstandsmitglied der Federation of Business Information Services (FEBIS)
                  – seit 1997 – ist er bestens vernetzt in der internationalen Kreditinformationsbranche.
                </p>
                <div className="inline-block bg-navy/5 rounded-lg px-4 py-2">
                  <span className="text-navy font-semibold italic text-sm">„Ein Mann, ein Wort."</span>
                </div>
              </div>
            </div>

            {/* Karriere-Timeline */}
            <div className="mt-8 border-t pt-8">
              <h4 className="font-bold text-navy mb-6">Karriere</h4>
              <div className="space-y-4">
                {karriere.map((item) => (
                  <div key={item.zeit} className="flex gap-4">
                    <div className="w-28 flex-shrink-0">
                      <span className="text-sm font-semibold text-primary">{item.zeit}</span>
                    </div>
                    <div className="flex-1 border-l border-gray-200 pl-4">
                      <p className="text-gray-600 text-sm">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mandate */}
            <div className="mt-8 border-t pt-8">
              <h4 className="font-bold text-navy mb-4">Verbandsmitgliedschaften & Mandate</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full mt-1.5 flex-shrink-0" />
                  <a href="https://www.febis.org" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                    Vorstandsmitglied der Federation of Business Information Services (FEBIS) – seit 1997
                  </a>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full mt-1.5 flex-shrink-0" />
                  Beirat Maritimes Cluster Norddeutschland (2013 – 2016)
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full mt-1.5 flex-shrink-0" />
                  Revisor Maritimes Cluster Norddeutschland (2025 – heute)
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full mt-1.5 flex-shrink-0" />
                  <a href="https://www.veek-hamburg.de/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                    Versammlung Ehrbarer Kaufleute zu Hamburg e.V. (VEEK)
                  </a>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full mt-1.5 flex-shrink-0" />
                  Mitglied in verschiedenen Hamburger Wirtschaftsverbänden
                </li>
              </ul>
              <div className="mt-6 flex flex-wrap items-center gap-8">
                <a href="https://www.febis.org" target="_blank" rel="noopener noreferrer">
                  <Image
                    src="/febis-logo-en-de-gradient.png"
                    alt="FEBIS – Federation of Business Information Services"
                    width={160}
                    height={60}
                    className="object-contain hover:opacity-80 transition-opacity"
                  />
                </a>
                <a href="https://www.veek-hamburg.de/" target="_blank" rel="noopener noreferrer">
                  <Image
                    src="/230904_VEEK_Logo.png"
                    alt="Versammlung Ehrbarer Kaufleute zu Hamburg e.V. (VEEK)"
                    width={80}
                    height={60}
                    className="object-contain hover:opacity-80 transition-opacity"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section background="white">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-navy mb-4">
            Lernen Sie uns persönlich kennen
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Kontaktieren Sie uns – wir beraten Sie gerne zu unseren Credit Management Lösungen.
          </p>
          <Button href="/kontakt" variant="primary" size="lg">
            Kontakt aufnehmen
          </Button>
        </div>
      </Section>
    </>
  );
}
