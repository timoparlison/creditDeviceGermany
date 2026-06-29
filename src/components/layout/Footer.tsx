'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Container } from '../ui/Container';
import { Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  const t = useTranslations('Footer');
  const nav = useTranslations('Navigation');

  const footerLinks = {
    produkte: [
      { name: nav('creditInformation'), href: '/bonitaetsinformationen' as const },
      { name: nav('creditManagementSoftware'), href: '/credit-management-software' as const },
      { name: nav('policyManager'), href: '/policymanager' as const },
    ],
    unternehmen: [
      { name: nav('aboutUs'), href: '/ueber-uns' as const },
      { name: nav('contact'), href: '/kontakt' as const },
    ],
    service: [
      { name: t('requestDemo'), href: '/kontakt' as const },
    ],
    rechtliches: [
      { name: t('imprint'), href: '/impressum' as const },
      { name: t('privacyPolicy'), href: '/datenschutz' as const },
    ],
  };

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
            <p className="text-gray-300 mb-6 leading-relaxed">{t('tagline')}</p>
            <div className="space-y-3 mb-6">
              <a
                href="mailto:info@creditdevice.de"
                className="flex items-center gap-3 text-gray-300 hover:text-primary transition-colors"
              >
                <Mail className="h-5 w-5 text-primary" />
                info@creditdevice.de
              </a>
              <a
                href="tel:+4940890692990"
                className="flex items-center gap-3 text-gray-300 hover:text-primary transition-colors"
              >
                <Phone className="h-5 w-5 text-primary" />
                040 / 890 69 29 - 90
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
          </div>

          {/* Products */}
          <div>
            <h3 className="font-semibold text-lg mb-4">{t('products')}</h3>
            <ul className="space-y-3">
              {footerLinks.produkte.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-300 hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-lg mb-4">{t('company')}</h3>
            <ul className="space-y-3">
              {footerLinks.unternehmen.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-300 hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service */}
          <div>
            <h3 className="font-semibold text-lg mb-4">{t('service')}</h3>
            <ul className="space-y-3">
              {footerLinks.service.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-300 hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal + ISO Badge */}
          <div>
            <h3 className="font-semibold text-lg mb-4">{t('legal')}</h3>
            <ul className="space-y-3 mb-6">
              {footerLinks.rechtliches.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-300 hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
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
            © {new Date().getFullYear()} CreditDevice GmbH. {t('allRightsReserved')}
          </p>
          <div className="flex flex-wrap gap-4 text-sm text-gray-400">
            <Link href="/impressum" className="hover:text-primary transition-colors">
              {t('imprint')}
            </Link>
            <Link href="/datenschutz" className="hover:text-primary transition-colors">
              {t('privacyPolicy')}
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
