'use client';

import { useState, FormEvent } from 'react';
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
  const [formData, setFormData] = useState<FormData>({
    vorname: '',
    nachname: '',
    email: '',
    telefon: '',
    unternehmen: '',
    nachricht: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // TODO: Integration mit Backend-Endpoint
    // Aktuell nur Console-Log für Entwicklung
    console.log('Kontaktformular Daten:', formData);

    // Simuliere API-Call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="bg-green-50 rounded-xl p-8 text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-navy mb-2">Vielen Dank!</h3>
        <p className="text-gray-600">
          Wir haben Ihre Nachricht erhalten und melden uns schnellstmöglich bei Ihnen.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="vorname" className="block text-sm font-medium text-navy mb-2">
            Vorname *
          </label>
          <input
            type="text"
            id="vorname"
            required
            value={formData.vorname}
            onChange={(e) => setFormData({ ...formData, vorname: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-colors"
            placeholder="Ihr Vorname"
          />
        </div>
        <div>
          <label htmlFor="nachname" className="block text-sm font-medium text-navy mb-2">
            Nachname *
          </label>
          <input
            type="text"
            id="nachname"
            required
            value={formData.nachname}
            onChange={(e) => setFormData({ ...formData, nachname: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-colors"
            placeholder="Ihr Nachname"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-navy mb-2">
            E-Mail *
          </label>
          <input
            type="email"
            id="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-colors"
            placeholder="ihre@email.de"
          />
        </div>
        <div>
          <label htmlFor="telefon" className="block text-sm font-medium text-navy mb-2">
            Telefon
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
          Unternehmen
        </label>
        <input
          type="text"
          id="unternehmen"
          value={formData.unternehmen}
          onChange={(e) => setFormData({ ...formData, unternehmen: e.target.value })}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-colors"
          placeholder="Ihr Unternehmen"
        />
      </div>

      <div>
        <label htmlFor="nachricht" className="block text-sm font-medium text-navy mb-2">
          Nachricht *
        </label>
        <textarea
          id="nachricht"
          required
          rows={5}
          value={formData.nachricht}
          onChange={(e) => setFormData({ ...formData, nachricht: e.target.value })}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-colors resize-none"
          placeholder="Wie können wir Ihnen helfen?"
        />
      </div>

      <div className="flex items-start">
        <input
          type="checkbox"
          id="datenschutz"
          required
          className="mt-1 mr-3"
        />
        <label htmlFor="datenschutz" className="text-sm text-gray-600">
          Ich habe die{' '}
          <a href="/datenschutz" className="text-primary hover:underline">
            Datenschutzerklärung
          </a>{' '}
          gelesen und stimme der Verarbeitung meiner Daten zu. *
        </label>
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full md:w-auto"
      >
        {isSubmitting ? (
          'Wird gesendet...'
        ) : (
          <>
            Nachricht senden
            <Send className="w-4 h-4 ml-2" />
          </>
        )}
      </Button>
    </form>
  );
}
