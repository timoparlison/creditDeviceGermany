import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { ProductPicker } from '@/components/auskunft/ProductPicker';
import { getCompanyById } from '@/lib/gcc/client';
import type { Company } from '@/lib/gcc/types';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  try {
    const company = await getCompanyById(decodeURIComponent(id));
    return { title: company ? `${company.name} – Auskunft bestellen` : 'Auskunft bestellen' };
  } catch {
    return { title: 'Auskunft bestellen' };
  }
}

export default async function CompanyDetailPage({ params }: Props) {
  const { id } = await params;
  let company: Company | null = null;
  try {
    company = await getCompanyById(decodeURIComponent(id));
  } catch {
    company = null;
  }
  if (!company) notFound();

  return (
    <>
      <section className="bg-navy text-white py-8">
        <Container>
          <Link
            href="/auskunft/ergebnisse"
            className="inline-flex items-center gap-2 text-gray-300 hover:text-primary text-sm mb-3"
          >
            <ArrowLeft className="w-4 h-4" />
            Zurück zur Suche
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold">{company.name}</h1>
          {company.address?.simpleValue && (
            <p className="text-gray-300 mt-2">{company.address.simpleValue}</p>
          )}
        </Container>
      </section>

      <section className="py-10 bg-gray-50 min-h-[60vh]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b bg-gray-50">
                  <h2 className="font-bold text-navy">Gewähltes Unternehmen</h2>
                </div>
                <dl className="divide-y">
                  <Row label="ID" value={company.id} />
                  <Row label="Status" value={company.status} />
                  <Row label="Name" value={company.name} />
                  <Row label="HR-Nr." value={company.regNo ?? undefined} />
                  <Row label="USt-IdNr." value={(company.vatNo ?? []).join(', ')} />
                  <Row label="Typ" value={company.type} />
                  <Row label="TradingNames" value={(company.tradingNames ?? []).join(', ')} />
                  <Row label="Straße" value={company.address?.street} />
                  <Row label="PLZ" value={company.address?.postCode?.toString()} />
                  <Row label="Stadt" value={company.address?.city} />
                  <Row label="Land" value={company.country} />
                  <Row label="Date" value={company.dateOfLatestAccounts ?? undefined} />
                  <Row label="DateOfLatestChange" value={company.dateOfLatestChange ?? undefined} />
                  <Row label="MatchScore" value={company.matchScore?.toString()} />
                  <Row label="Description" value={company.statusDescription} />
                  <Row label="PreviousNames" value={(company.previousNames ?? []).join(', ')} />
                </dl>
              </div>
            </div>

            <div>
              <ProductPicker company={company} />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

function Row({ label, value }: { label: string; value?: string }) {
  return (
    <div className="grid grid-cols-3 gap-3 px-6 py-3 text-sm">
      <dt className="font-semibold text-gray-600">{label}</dt>
      <dd className="col-span-2 text-navy break-words">{value || '–'}</dd>
    </div>
  );
}
