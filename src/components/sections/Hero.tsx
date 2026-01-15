import Image from 'next/image';
import { Button } from '../ui/Button';
import { Container } from '../ui/Container';
import { Layers } from 'lucide-react';

interface HeroProps {
  title: string;
  subtitle: string;
  primaryCta?: {
    text: string;
    href: string;
  };
  secondaryCta?: {
    text: string;
    href: string;
  };
  image?: string;
  showImage?: boolean;
}

// Floating Badge Components
function AllesInEinemBadge() {
  return (
    <div className="bg-white rounded-full shadow-xl px-5 py-3 flex items-center gap-3 animate-float-slow">
      <div className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden">
        {/* Pie chart icon similar to original */}
        <svg viewBox="0 0 40 40" className="w-10 h-10">
          <circle cx="20" cy="20" r="16" fill="#F08013" />
          <path
            d="M 20 20 L 20 4 A 16 16 0 0 1 36 20 Z"
            fill="#041531"
          />
          <circle cx="20" cy="20" r="8" fill="white" />
        </svg>
      </div>
      <span className="text-navy font-semibold text-sm whitespace-nowrap">Alles in einem</span>
    </div>
  );
}

function SparenBadge() {
  return (
    <div className="bg-white rounded-full shadow-xl px-5 py-3 flex items-center gap-3 animate-float">
      <div className="w-10 h-10 relative flex items-center justify-center">
        {/* Semi-circle gauge icon */}
        <svg viewBox="0 0 40 40" className="w-10 h-10">
          <path
            d="M 4 24 A 16 16 0 0 1 36 24"
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <path
            d="M 4 24 A 16 16 0 0 1 20 8"
            fill="none"
            stroke="#041531"
            strokeWidth="6"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <div className="flex flex-col">
        <span className="text-navy font-semibold text-sm whitespace-nowrap">Sparen Sie bis zu 40%</span>
        <span className="text-gray-500 text-xs">Days Sales Outstanding</span>
      </div>
    </div>
  );
}

export function Hero({
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  image = 'https://206.wpcdnnode.com/creditdevice.com/wp-content/uploads/2025/11/Debiteurenbeheer-48.webp',
  showImage = true,
}: HeroProps) {
  return (
    <section className="relative bg-navy text-white pt-12 pb-8 md:pt-16 md:pb-12 lg:pt-20 lg:pb-16 overflow-hidden">
      {/* Decorative circle elements */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-white/5" />
      <div className="absolute right-20 top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-white/5" />

      {/* Orange gradient accent */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl" />

      <Container className="relative z-10">
        {/* Header row: Title left, Subtitle + CTAs right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start mb-12 lg:mb-16">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold leading-[1.1]">
              {title}
            </h1>
          </div>
          <div className="lg:pt-2">
            <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
              {subtitle}
            </p>
            {(primaryCta || secondaryCta) && (
              <div className="flex flex-col sm:flex-row gap-4">
                {primaryCta && (
                  <Button href={primaryCta.href} variant="primary" size="lg">
                    {primaryCta.text}
                  </Button>
                )}
                {secondaryCta && (
                  <Button href={secondaryCta.href} variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-navy">
                    {secondaryCta.text}
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Dashboard image with floating badges */}
        {showImage && (
          <div className="relative">
            {/* Floating Badges - positioned on the left */}
            <div className="hidden lg:flex flex-col gap-4 absolute left-0 bottom-8 z-20">
              <AllesInEinemBadge />
              <SparenBadge />
            </div>

            {/* Dashboard mockup - centered */}
            <div className="relative max-w-5xl mx-auto">
              <div className="relative">
                {/* Glow effect behind the image */}
                <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-primary/10 to-transparent rounded-3xl blur-2xl" />

                {/* Laptop/Browser frame */}
                <div className="relative bg-gray-800 rounded-t-xl pt-2 px-2 shadow-2xl">
                  {/* Browser top bar */}
                  <div className="flex items-center gap-2 px-3 py-2 bg-gray-700 rounded-t-lg">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500" />
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                    </div>
                    <div className="flex-1 mx-4">
                      <div className="bg-gray-600 rounded px-3 py-1 text-xs text-gray-400 flex items-center gap-2">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <span>app.creditdevice.com</span>
                      </div>
                    </div>
                  </div>

                  {/* Dashboard screenshot */}
                  <div className="bg-white rounded-b-lg overflow-hidden">
                    <Image
                      src={image}
                      alt="CreditDevice Dashboard"
                      width={1200}
                      height={700}
                      className="w-full h-auto"
                      unoptimized
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}
