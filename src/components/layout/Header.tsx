'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';

const navigation = [
  {
    name: 'Produkte',
    href: '#',
    children: [
      {
        name: 'Bonitätsinformationen',
        href: '/bonitaetsinformationen',
        description: 'Zuverlässige Daten und intelligente Einblicke',
      },
      {
        name: 'Credit Management Software',
        href: '/credit-management-software',
        description: 'Effizientes Debitorenmanagement',
      },
      {
        name: 'PolisManager',
        href: '/polismanager',
        description: 'Verwaltung Ihrer Kreditversicherung',
      },
    ],
  },
  { name: 'Über uns', href: '/ueber-uns' },
  { name: 'Kontakt', href: '/kontakt' },
];

const loginLinks = [
  { name: 'Debitorenmanagement', href: 'https://app.directdevice.info/dam/auth/login/' },
  { name: 'PolisManager', href: 'https://app.directdevice.info/dam/auth/login/' },
  { name: 'Bonitätsinformationen', href: 'https://kredietinformatie.creditdevice.nl/dam/auth/login/' },
  { name: 'SalesOptimizer', href: 'https://nl.salesoptimizer.eu/' },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [loginDropdownOpen, setLoginDropdownOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <Container>
        <nav className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="https://206.wpcdnnode.com/creditdevice.com/wp-content/uploads/2020/07/creditdevice-logo-orange.svg"
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

                {/* Dropdown Menu */}
                {item.children && activeDropdown === item.name && (
                  <div className="absolute top-full left-0 w-72 bg-white shadow-lg rounded-lg py-4 mt-2">
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
                Login
                <ChevronDown className="h-4 w-4" />
              </button>
              {loginDropdownOpen && (
                <div className="absolute top-full right-0 w-56 bg-white shadow-lg rounded-lg py-2 mt-2">
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
              )}
            </div>

            <Button href="/kontakt" variant="primary">
              Demo anfordern
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="lg:hidden p-2 text-navy"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </nav>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t">
            {navigation.map((item) => (
              <div key={item.name} className="py-2">
                {item.children ? (
                  <div>
                    <span className="block font-medium text-navy px-2 py-2">
                      {item.name}
                    </span>
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

            {/* Mobile Login Links */}
            <div className="py-2 border-t mt-2">
              <span className="block font-medium text-navy px-2 py-2">Login</span>
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

            <div className="mt-4 px-2">
              <Button href="/kontakt" variant="primary" className="w-full">
                Demo anfordern
              </Button>
            </div>
          </div>
        )}
      </Container>
    </header>
  );
}
