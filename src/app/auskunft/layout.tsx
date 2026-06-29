import { Header, Footer } from '@/components/layout';

export const runtime = 'edge';

export default function AuskunftLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}
