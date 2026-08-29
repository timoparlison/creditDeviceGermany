'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';
import { LanguageSwitcher } from './LanguageSwitcher';
import { AccountMenu } from '../customer/AccountMenu';

const loginLinks = [
  { name: 'CreditManagement', href: 'https://app.directdevice.info/dam/auth/login/' },
  { name: 'PolicyManagement', href: 'https://app.directdevice.info/dam/auth/login/' },
];

export function Header() {
  const t = useTranslations('Navigation');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [loginDropdownOpen, setLoginDropdownOpen] = useState(false);

  const navigation = [
    {
      name: t('products'),
      href: '#' as const,
      children: [
        {
          name: t('creditInformation'),
          href: '/bonitaetsinformationen' as const,
          description: t('creditInformationDesc'),
        },
        {
          name: t('creditManagementSoftware'),
          href: '/credit-management-software' as const,
          description: t('creditManagementSoftwareDesc'),
        },
        {
          name: t('policyManager'),
          href: '/policymanager' as const,
          description: t('policyManagerDesc'),
        },
      ],
    },
    { name: t('aboutUs'), href: '/ueber-uns' as const },
    { name: t('contact'), href: '/kontakt' as const },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <Container>
        <nav className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/creditdevice-logo-orange.svg"
              alt="CreditDevice"
              width={180}
              height={40}
              className="h-10 w-auto"
              unoptimized
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:gap-8">
            {navigation.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => item.children && setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {item.children ? (
                  <button className="flex items-center gap-1 text-navy hover:text-primary font-medium transition-colors">
                    {item.name}
                    <ChevronDown className="h-4 w-4" />
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className="text-navy hover:text-primary font-medium transition-colors"
                  >
                    {item.name}
                  </Link>
                )}

                {item.children && activeDropdown === item.name && (
                  <div className="absolute top-full left-0 w-72 pt-2">
                    <div className="bg-white shadow-lg rounded-lg py-4">
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          className="block px-4 py-3 hover:bg-gray-50 transition-colors"
                        >
                          <span className="block font-medium text-navy">{child.name}</span>
                          <span className="block text-sm text-gray-500">{child.description}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Login Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setLoginDropdownOpen(true)}
              onMouseLeave={() => setLoginDropdownOpen(false)}
            >
              <button className="flex items-center gap-1 text-navy hover:text-primary font-medium transition-colors">
                {t('login')}
                <ChevronDown className="h-4 w-4" />
              </button>
              {loginDropdownOpen && (
                <div className="absolute top-full right-0 w-56 pt-2">
                  <div className="bg-white shadow-lg rounded-lg py-2">
                    {loginLinks.map((link) => (
                      <a
                        key={link.name}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block px-4 py-2 text-navy hover:bg-gray-50 hover:text-primary transition-colors"
                      >
                        {link.name}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <AccountMenu />

            <LanguageSwitcher />

            <Button href="/kontakt" variant="primary">
              {t('requestDemo')}
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="lg:hidden p-2 text-navy"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t">
            {navigation.map((item) => (
              <div key={item.name} className="py-2">
                {item.children ? (
                  <div>
                    <span className="block font-medium text-navy px-2 py-2">{item.name}</span>
                    <div className="pl-4">
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          className="block px-2 py-2 text-gray-600 hover:text-primary"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className="block px-2 py-2 font-medium text-navy hover:text-primary"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}

            <div className="py-2 border-t mt-2">
              <span className="block font-medium text-navy px-2 py-2">{t('login')}</span>
              <div className="pl-4">
                {loginLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-2 py-2 text-gray-600 hover:text-primary"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>

            <div className="py-2 border-t mt-2 px-2">
              <AccountMenu onNavigate={() => setMobileMenuOpen(false)} />
            </div>

            <div className="py-2 border-t mt-2 px-2">
              <LanguageSwitcher />
            </div>

            <div className="mt-4 px-2">
              <Button href="/kontakt" variant="primary" className="w-full">
                {t('requestDemo')}
              </Button>
            </div>
          </div>
        )}
      </Container>
    </header>
  );
}
