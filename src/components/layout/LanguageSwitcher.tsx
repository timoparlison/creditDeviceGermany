'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import { useEffect, useRef, useState, useTransition } from 'react';
import { locales } from '@/i18n/routing';
import { Globe } from 'lucide-react';

const LOCALE_LABELS: Record<string, string> = {
  de: 'Deutsch',
  en: 'English',
  es: 'Español',
  fr: 'Français',
  it: 'Italiano',
  nl: 'Nederlands',
  sv: 'Svenska',
  no: 'Norsk',
  da: 'Dansk',
  fi: 'Suomi',
};

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function onClickOutside(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, [open]);

  function onChange(newLocale: string) {
    setOpen(false);
    startTransition(() => {
      router.replace(pathname, { locale: newLocale });
    });
  }

  return (
    <div className="relative" ref={containerRef}>
      <button
        className="flex items-center gap-1.5 text-navy hover:text-primary font-medium transition-colors px-1"
        aria-label="Select language"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
      >
        <Globe className="h-4 w-4" />
        <span className="uppercase text-sm">{locale}</span>
      </button>
      {open && (
        <div className="absolute top-full right-0 w-40 pt-2">
          <div className="bg-white shadow-lg rounded-lg py-2 border border-gray-100">
            {locales.map((l) => (
              <button
                key={l}
                onClick={() => onChange(l)}
                disabled={isPending}
                className={`w-full text-left px-4 py-2 text-sm transition-colors hover:bg-gray-50 hover:text-primary ${
                  l === locale ? 'text-primary font-semibold' : 'text-navy'
                }`}
              >
                {LOCALE_LABELS[l]}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
