import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { OrderFlow } from '@/components/auskunft/OrderFlow';
import { getCompanyById } from '@/lib/gcc/client';
import { PRODUCT_CATALOG, type ProductId } from '@/lib/gcc/products';
import type { Company } from '@/lib/gcc/types';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ products?: string }>;
};

export default async function OrderPage({ params, searchParams }: Props) {
  const { id } = await params;
  const { products: productsParam } = await searchParams;

  let company: Company | null = null;
  try {
    company = await getCompanyById(decodeURIComponent(id));
  } catch {
    company = null;
  }
  if (!company) notFound();

  const validIds = PRODUCT_CATALOG.map((p) => p.id);
  const requested = (productsParam ?? 'full')
    .split(',')
    .map((s) => s.trim())
    .filter((s): s is ProductId => (validIds as string[]).includes(s));
  const productIds: ProductId[] = requested.length ? requested : ['full'];

  return (
    <>
      <section className="bg-navy text-white py-8">
        <Container>
          <Link
            href={`/auskunft/unternehmen/${encodeURIComponent(id)}`}
            className="inline-flex items-center gap-2 text-gray-300 hover:text-primary text-sm mb-3"
          >
            <ArrowLeft className="w-4 h-4" />
            Zurück zum Unternehmen
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold">Bestellung abschließen</h1>
          <p className="text-gray-300 mt-2">{company.name}</p>
        </Container>
      </section>

      <section className="py-10 bg-gray-50 min-h-[60vh]">
        <Container>
          <OrderFlow company={company} productIds={productIds} />
        </Container>
      </section>
    </>
  );
}
