import Link from 'next/link';
import Image from 'next/image';
import { Container } from '../ui/Container';
import { Mail, Phone, MapPin, Linkedin, Youtube } from 'lucide-react';

const footerLinks = {
  produkte: [
    { name: 'Bonitätsinformationen', href: '/bonitaetsinformationen' },
    { name: 'Credit Management Software', href: '/credit-management-software' },
    { name: 'PolisManager', href: '/polismanager' },
  ],
  unternehmen: [
    { name: 'Über uns', href: '/ueber-uns' },
    { name: 'Kontakt', href: '/kontakt' },
    { name: 'Blog', href: '/blog' },
  ],
  service: [
    { name: 'Demo anfordern', href: '/kontakt' },
    { name: 'Hilfe-Center', href: '/hilfe' },
    { name: 'Integrationen', href: '/integrationen' },
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
      <Container className="py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Image
              src="https://206.wpcdnnode.com/creditdevice.com/wp-content/uploads/2020/07/creditdevice-logo-orange.svg"
              alt="CreditDevice"
              width={160}
              height={36}
              className="h-9 w-auto mb-6"
              unoptimized
            />
            <p className="text-gray-300 mb-6 leading-relaxed">
              Ihr Partner für professionelles Credit Management. Vermeiden Sie finanzielle Risiken mit unserer leistungsstarken Software.
            </p>
            <div className="space-y-3 mb-6">
              <a
                href="mailto:info@creditdevice.de"
                className="flex items-center gap-3 text-gray-300 hover:text-primary transition-colors"
              >
                <Mail className="h-5 w-5 text-primary" />
                info@creditdevice.de
              </a>
              <a
                href="tel:+494089069290"
                className="flex items-center gap-3 text-gray-300 hover:text-primary transition-colors"
              >
                <Phone className="h-5 w-5 text-primary" />
                040 / 89 069 29 90
              </a>
              <div className="flex items-start gap-3 text-gray-300">
                <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span>
                  CreditDevice GmbH<br />
                  Winsbergring 10<br />
                  22525 Hamburg
                </span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-3">
              <a
                href="https://www.linkedin.com/company/creditdevice/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://www.youtube.com/@creditdevice"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Produkte</h3>
            <ul className="space-y-3">
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
            <ul className="space-y-3">
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

          {/* Service */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Service</h3>
            <ul className="space-y-3">
              {footerLinks.service.map((link) => (
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

          {/* Legal + ISO Badge */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Rechtliches</h3>
            <ul className="space-y-3 mb-6">
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

            {/* ISO Badge */}
            <Image
              src="https://206.wpcdnnode.com/creditdevice.com/wp-content/uploads/2022/03/ISOIEC-27001.png"
              alt="ISO/IEC 27001 Zertifiziert"
              width={80}
              height={80}
              className="opacity-80 hover:opacity-100 transition-opacity"
              unoptimized
            />
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} CreditDevice GmbH. Alle Rechte vorbehalten.
          </p>
          <div className="flex flex-wrap gap-4 text-sm text-gray-400">
            <span>Eingetragenes Inkassounternehmen nach dem RDG</span>
            <span className="hidden md:inline">|</span>
            <Link href="/impressum" className="hover:text-primary transition-colors">
              Impressum
            </Link>
            <Link href="/datenschutz" className="hover:text-primary transition-colors">
              Datenschutz
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
