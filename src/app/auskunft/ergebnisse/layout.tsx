import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Suchergebnisse',
  robots: { index: false, follow: false },
};

export default function ErgebnisseLayout({ children }: { children: React.ReactNode }) {
  return children;
}
