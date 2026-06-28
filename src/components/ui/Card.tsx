import { ReactNode } from 'react';
import { Link } from '@/i18n/navigation';

interface CardProps {
  children: ReactNode;
  className?: string;
  href?: string;
  hover?: boolean;
}

export function Card({ children, className = '', href, hover = true }: CardProps) {
  const baseStyles = `bg-white rounded-lg shadow-md p-6 ${hover ? 'transition-shadow duration-200 hover:shadow-lg' : ''} ${className}`;

  if (href) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const typedHref = href as any;
    return (
      <Link href={typedHref} className={`block ${baseStyles}`}>
        {children}
      </Link>
    );
  }

  return (
    <div className={baseStyles}>
      {children}
    </div>
  );
}
