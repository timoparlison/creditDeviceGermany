import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';
import { Header, Footer } from '@/components/layout';
import './globals.css';

const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-open-sans',
});

export const metadata: Metadata = {
  title: {
    default: 'CreditDevice - Ihr Partner für Credit Management',
    template: '%s | CreditDevice',
  },
  description: 'Vermeiden Sie finanzielle Risiken und verwalten Sie Ihr gesamtes Credit Management in einer leistungsstarken Anwendung. Bonitätsinformationen, Debitorenmanagement und Kreditversicherung.',
  keywords: ['Credit Management', 'Bonitätsinformationen', 'Debitorenmanagement', 'Kreditversicherung', 'PolisManager', 'Hamburg'],
  authors: [{ name: 'CreditDevice GmbH' }],
  creator: 'CreditDevice GmbH',
  publisher: 'CreditDevice GmbH',
  metadataBase: new URL('https://creditdevice.de'),
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    url: 'https://creditdevice.de',
    siteName: 'CreditDevice',
    title: 'CreditDevice - Ihr Partner für Credit Management',
    description: 'Vermeiden Sie finanzielle Risiken und verwalten Sie Ihr gesamtes Credit Management in einer leistungsstarken Anwendung.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CreditDevice - Ihr Partner für Credit Management',
    description: 'Vermeiden Sie finanzielle Risiken und verwalten Sie Ihr gesamtes Credit Management in einer leistungsstarken Anwendung.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className={`${openSans.variable} font-sans antialiased`}>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
