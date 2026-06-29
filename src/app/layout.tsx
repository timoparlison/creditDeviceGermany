import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import './globals.css';

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
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const messages = await getMessages();
  return (
    <html className={`${openSans.variable}`}>
      <body className="font-sans antialiased">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
