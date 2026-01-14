import Link from 'next/link';
import Image from 'next/image';
import { Container } from '../ui/Container';
import { Mail, Phone, MapPin } from 'lucide-react';

const footerLinks = {
  produkte: [
    { name: 'Bonitätsinformationen', href: '/bonitaetsinformationen' },
    { name: 'Credit Management Software', href: '/credit-management-software' },
    { name: 'PolisManager', href: '/polismanager' },
  ],
  unternehmen: [
    { name: 'Über uns', href: '/ueber-uns' },
    { name: 'Kontakt', href: '/kontakt' },
    { name: 'Karriere', href: '/karriere' },
  ],
  rechtliches: [
    { name: 'Impressum', href: '/impressum' },
    { name: 'Datenschutz', href: '/datenschutz' },
    { name: 'AGB', href: '/agb' },
  ],
};

export function Footer() {
  return (
    <footer className="bg-navy text-white">
      <Container className="py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Image
              src="https://206.wpcdnnode.com/creditdevice.com/wp-content/uploads/2020/07/creditdevice-logo-orange.svg"
              alt="CreditDevice"
              width={160}
              height={36}
              className="h-9 w-auto mb-4"
              unoptimized
            />
            <p className="text-gray-300 mb-6 max-w-sm">
              Ihr Partner für professionelles Credit Management. Vermeiden Sie finanzielle Risiken mit unserer leistungsstarken Software.
            </p>
            <div className="space-y-3">
              <a
                href="mailto:info@creditdevice.de"
                className="flex items-center gap-2 text-gray-300 hover:text-primary transition-colors"
              >
                <Mail className="h-5 w-5" />
                info@creditdevice.de
              </a>
              <a
                href="tel:+494089069290"
                className="flex items-center gap-2 text-gray-300 hover:text-primary transition-colors"
              >
                <Phone className="h-5 w-5" />
                040 / 89 069 29 90
              </a>
              <div className="flex items-start gap-2 text-gray-300">
                <MapPin className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <span>
                  CreditDevice GmbH<br />
                  Winsbergring 10<br />
                  22525 Hamburg
                </span>
              </div>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Produkte</h3>
            <ul className="space-y-2">
              {footerLinks.produkte.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Unternehmen</h3>
            <ul className="space-y-2">
              {footerLinks.unternehmen.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Rechtliches</h3>
            <ul className="space-y-2">
              {footerLinks.rechtliches.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} CreditDevice GmbH. Alle Rechte vorbehalten.
          </p>
          <p className="text-gray-400 text-sm mt-2 md:mt-0">
            Eingetragenes Inkassounternehmen nach dem RDG
          </p>
        </div>
      </Container>
    </footer>
  );
}
