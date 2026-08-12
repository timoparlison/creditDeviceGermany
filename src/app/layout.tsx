import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import './globals.css';
import deMessages from '../messages/de.json';

export const runtime = 'edge';

const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-open-sans',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://creditdevice.de'),
  applicationName: 'CreditDevice',
  authors: [{ name: 'CreditDevice GmbH' }],
  creator: 'CreditDevice GmbH',
  publisher: 'CreditDevice GmbH',
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
  formatDetection: { email: false, telephone: false },
  verification: {
    // TODO: Google Search Console — HTML-Tag-Methode wählen und den content-Wert
    // des meta-Tags hier eintragen, dann neu deployen.
    // google: 'GOOGLE_SEARCH_CONSOLE_TOKEN_HIER',
    other: {
      // Bing Webmaster Tools
      'msvalidate.01': '4F80A76756EAEFC2D21CEE7A16662732',
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className={`${openSans.variable}`}>
      <body className="font-sans antialiased">
        <NextIntlClientProvider locale="de" messages={deMessages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
