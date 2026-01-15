import Image from 'next/image';

const customerLogos = [
  {
    src: 'https://206.wpcdnnode.com/creditdevice.com/wp-content/uploads/2025/09/Debiteurenbeheer-39.png',
    alt: 'Kunde 1',
  },
  {
    src: 'https://206.wpcdnnode.com/creditdevice.com/wp-content/uploads/2025/09/Debiteurenbeheer-40.png',
    alt: 'Kunde 2',
  },
  {
    src: 'https://206.wpcdnnode.com/creditdevice.com/wp-content/uploads/2025/09/Debiteurenbeheer-41.png',
    alt: 'Kunde 3',
  },
  {
    src: 'https://206.wpcdnnode.com/creditdevice.com/wp-content/uploads/2025/09/Debiteurenbeheer-42.png',
    alt: 'Kunde 4',
  },
  {
    src: 'https://206.wpcdnnode.com/creditdevice.com/wp-content/uploads/2025/09/Debiteurenbeheer-43.png',
    alt: 'Kunde 5',
  },
  {
    src: 'https://206.wpcdnnode.com/creditdevice.com/wp-content/uploads/2025/09/Debiteurenbeheer-45.png',
    alt: 'Kunde 6',
  },
  {
    src: 'https://206.wpcdnnode.com/creditdevice.com/wp-content/uploads/2025/09/Debiteurenbeheer-46.png',
    alt: 'Kunde 7',
  },
];

export function CustomerLogos() {
  return (
    <section className="py-10 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm text-navy/60 mb-8 uppercase tracking-wider font-medium">
          Weltweit vertraut von führenden Unternehmen
        </p>
        <div className="relative overflow-hidden">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10" />

          <div className="flex animate-scroll gap-16 items-center">
            {[...customerLogos, ...customerLogos].map((logo, index) => (
              <div
                key={index}
                className="flex-shrink-0 grayscale hover:grayscale-0 opacity-50 hover:opacity-100 transition-all duration-300"
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={140}
                  height={70}
                  className="h-14 w-auto object-contain"
                  unoptimized
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
