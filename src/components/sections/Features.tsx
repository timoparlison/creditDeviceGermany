import Link from 'next/link';
import { Section } from '../ui/Section';
import { Card } from '../ui/Card';
import { LucideIcon } from 'lucide-react';

interface Feature {
  title: string;
  description: string;
  icon: LucideIcon;
  href?: string;
}

interface FeaturesProps {
  title?: string;
  subtitle?: string;
  features: Feature[];
  columns?: 2 | 3 | 4;
  background?: 'white' | 'gray' | 'navy';
}

export function Features({
  title,
  subtitle,
  features,
  columns = 3,
  background = 'white',
}: FeaturesProps) {
  const gridCols = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-2 lg:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <Section background={background}>
      {(title || subtitle) && (
        <div className="text-center mb-12">
          {title && (
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${background === 'navy' ? 'text-white' : 'text-navy'}`}>
              {title}
            </h2>
          )}
          {subtitle && (
            <p className={`text-lg max-w-2xl mx-auto ${background === 'navy' ? 'text-gray-300' : 'text-gray-600'}`}>
              {subtitle}
            </p>
          )}
        </div>
      )}

      <div className={`grid grid-cols-1 ${gridCols[columns]} gap-6 md:gap-8`}>
        {features.map((feature) => {
          const IconComponent = feature.icon;
          const content = (
            <>
              <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <IconComponent className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-navy mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </>
          );

          if (feature.href) {
            return (
              <Card key={feature.title} href={feature.href}>
                {content}
              </Card>
            );
          }

          return (
            <Card key={feature.title} hover={false}>
              {content}
            </Card>
          );
        })}
      </div>
    </Section>
  );
}
