import Image from 'next/image';
import { Button } from '../ui/Button';
import { Container } from '../ui/Container';

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

export function Hero({
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  image = 'https://206.wpcdnnode.com/creditdevice.com/wp-content/uploads/2025/09/10-6-1536x386.png',
  showImage = true,
}: HeroProps) {
  return (
    <section className="relative bg-navy text-white py-20 md:py-28 lg:py-32 overflow-hidden min-h-[600px]">
      {/* Decorative circle element */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-white/5" />
      <div className="absolute right-20 top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-white/5" />

      {/* Orange gradient accent */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl" />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-xl">
            <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold mb-6 leading-[1.1]">
              {title}
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-10 leading-relaxed">
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
          {showImage && (
            <div className="hidden lg:block">
              <div className="relative perspective-1000">
                {/* Dashboard mockup with perspective */}
                <div className="relative transform rotate-y-[-8deg] rotate-x-[2deg]">
                  <div className="absolute -inset-4 bg-gradient-to-r from-primary/30 to-primary/10 rounded-2xl blur-2xl" />
                  <div className="relative bg-white rounded-xl shadow-2xl overflow-hidden border border-white/20">
                    <Image
                      src={image}
                      alt="CreditDevice Dashboard"
                      width={700}
                      height={450}
                      className="relative w-full h-auto"
                      unoptimized
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
