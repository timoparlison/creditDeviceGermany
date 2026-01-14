import { ReactNode } from 'react';
import Link from 'next/link';

interface CardProps {
  children: ReactNode;
  className?: string;
  href?: string;
  hover?: boolean;
}

export function Card({ children, className = '', href, hover = true }: CardProps) {
  const baseStyles = `bg-white rounded-lg shadow-md p-6 ${hover ? 'transition-shadow duration-200 hover:shadow-lg' : ''} ${className}`;

  if (href) {
    return (
      <Link href={href} className={`block ${baseStyles}`}>
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
