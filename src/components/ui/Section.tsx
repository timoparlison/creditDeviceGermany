import { ReactNode } from 'react';
import { Container } from './Container';

interface SectionProps {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  id?: string;
  background?: 'white' | 'gray' | 'navy';
}

export function Section({
  children,
  className = '',
  containerClassName = '',
  id,
  background = 'white',
}: SectionProps) {
  const bgStyles = {
    white: 'bg-white',
    gray: 'bg-gray-50',
    navy: 'bg-navy text-white',
  };

  return (
    <section id={id} className={`py-16 md:py-24 ${bgStyles[background]} ${className}`}>
      <Container className={containerClassName}>
        {children}
      </Container>
    </section>
  );
}
