'use client';

import { useState, FormEvent } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Button } from '../ui/Button';
import { Send, CheckCircle } from 'lucide-react';

interface FormData {
  vorname: string;
  nachname: string;
  email: string;
  telefon: string;
  unternehmen: string;
  nachricht: string;
}

export function ContactForm() {
  const t = useTranslations('ContactForm');
  const [formData, setFormData] = useState<FormData>({
    vorname: '',
    nachname: '',
    email: '',
    telefon: '',
    unternehmen: '',
    nachricht: '',
  });
  const [website, setWebsite] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ ...formData, website }),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(data.error ?? t('sendFailed'));
      }

      setIsSubmitted(true);
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : t('sendFailed'));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-green-50 rounded-xl p-8 text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-navy mb-2">{t('successTitle')}</h3>
        <p className="text-gray-600">{t('successBody')}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Website (bitte freilassen)</label>
        <input
          type="text"
          id="website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="vorname" className="block text-sm font-medium text-navy mb-2">
            {t('firstName')} {t('required')}
          </label>
          <input
            type="text"
            id="vorname"
            required
            value={formData.vorname}
            onChange={(e) => setFormData({ ...formData, vorname: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-colors"
            placeholder={t('firstNamePlaceholder')}
          />
        </div>
        <div>
          <label htmlFor="nachname" className="block text-sm font-medium text-navy mb-2">
            {t('lastName')} {t('required')}
          </label>
          <input
            type="text"
            id="nachname"
            required
            value={formData.nachname}
            onChange={(e) => setFormData({ ...formData, nachname: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-colors"
            placeholder={t('lastNamePlaceholder')}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-navy mb-2">
            {t('email')} {t('required')}
          </label>
          <input
            type="email"
            id="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-colors"
            placeholder={t('emailPlaceholder')}
          />
        </div>
        <div>
          <label htmlFor="telefon" className="block text-sm font-medium text-navy mb-2">
            {t('phone')}
          </label>
          <input
            type="tel"
            id="telefon"
            value={formData.telefon}
            onChange={(e) => setFormData({ ...formData, telefon: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-colors"
            placeholder="+49 40 123456"
          />
        </div>
      </div>

      <div>
        <label htmlFor="unternehmen" className="block text-sm font-medium text-navy mb-2">
          {t('company')}
        </label>
        <input
          type="text"
          id="unternehmen"
          value={formData.unternehmen}
          onChange={(e) => setFormData({ ...formData, unternehmen: e.target.value })}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-colors"
          placeholder={t('companyPlaceholder')}
        />
      </div>

      <div>
        <label htmlFor="nachricht" className="block text-sm font-medium text-navy mb-2">
          {t('message')} {t('required')}
        </label>
        <textarea
          id="nachricht"
          required
          rows={5}
          value={formData.nachricht}
          onChange={(e) => setFormData({ ...formData, nachricht: e.target.value })}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-colors resize-none"
          placeholder={t('messagePlaceholder')}
        />
      </div>

      <div className="flex items-start">
        <input type="checkbox" id="datenschutz" required className="mt-1 mr-3" />
        <label htmlFor="datenschutz" className="text-sm text-gray-600">
          {t('privacyText')}{' '}
          <Link href="/datenschutz" className="text-primary hover:underline">
            {t('privacyLink')}
          </Link>{' '}
          {t('privacyText2')} {t('required')}
        </label>
      </div>

      {errorMessage && (
        <div role="alert" className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {errorMessage}
        </div>
      )}

      <Button type="submit" variant="primary" size="lg" className="w-full md:w-auto" disabled={isSubmitting}>
        {isSubmitting ? (
          t('sending')
        ) : (
          <>
            {t('send')}
            <Send className="w-4 h-4 ml-2" />
          </>
        )}
      </Button>
    </form>
  );
}
