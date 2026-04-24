import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';
import { Header, Footer } from '@/components/layout';
import { JsonLd, organizationSchema, websiteSchema } from '@/components/seo/JsonLd';
import { SITE_URL } from '@/lib/seo';
import './globals.css';

const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-open-sans',
});

export const metadata: Metadata = {
  title: {
    default: 'CreditDevice — Ihr Partner für Credit Management',
    template: '%s | CreditDevice',
  },
  description:
    'Vermeiden Sie finanzielle Risiken und verwalten Sie Ihr gesamtes Credit Management in einer leistungsstarken Anwendung. Bonitätsinformationen, Debitorenmanagement und Kreditversicherung.',
  applicationName: 'CreditDevice',
  authors: [{ name: 'CreditDevice GmbH' }],
  creator: 'CreditDevice GmbH',
  publisher: 'CreditDevice GmbH',
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    url: SITE_URL,
    siteName: 'CreditDevice',
    title: 'CreditDevice — Ihr Partner für Credit Management',
    description:
      'Vermeiden Sie finanzielle Risiken und verwalten Sie Ihr gesamtes Credit Management in einer leistungsstarken Anwendung.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CreditDevice — Ihr Partner für Credit Management',
    description:
      'Vermeiden Sie finanzielle Risiken und verwalten Sie Ihr gesamtes Credit Management in einer leistungsstarken Anwendung.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  formatDetection: {
    email: false,
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de-DE">
      <body className={`${openSans.variable} font-sans antialiased`}>
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
