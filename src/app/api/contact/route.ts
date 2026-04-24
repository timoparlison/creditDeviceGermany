import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

interface ContactPayload {
  vorname?: string;
  nachname?: string;
  email?: string;
  telefon?: string;
  unternehmen?: string;
  nachricht?: string;
  website?: string;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function isNonEmpty(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(req: NextRequest) {
  let payload: ContactPayload;
  try {
    payload = (await req.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ error: 'Ungültige Anfrage.' }, { status: 400 });
  }

  if (isNonEmpty(payload.website)) {
    return NextResponse.json({ ok: true });
  }

  if (
    !isNonEmpty(payload.vorname) ||
    !isNonEmpty(payload.nachname) ||
    !isNonEmpty(payload.email) ||
    !isNonEmpty(payload.nachricht)
  ) {
    return NextResponse.json(
      { error: 'Bitte Vorname, Nachname, E-Mail und Nachricht angeben.' },
      { status: 400 },
    );
  }

  if (!isValidEmail(payload.email)) {
    return NextResponse.json({ error: 'Ungültige E-Mail-Adresse.' }, { status: 400 });
  }

  const apiKey = process.env.BREVO_API_KEY;
  const senderEmail = process.env.BREVO_SENDER_EMAIL;
  const senderName = process.env.BREVO_SENDER_NAME;
  const toEmail = process.env.BREVO_TO_EMAIL;
  const toName = process.env.BREVO_TO_NAME;

  if (!apiKey || !senderEmail || !senderName || !toEmail || !toName) {
    return NextResponse.json(
      { error: 'E-Mail-Versand ist nicht konfiguriert.' },
      { status: 500 },
    );
  }

  const fullName = `${payload.vorname.trim()} ${payload.nachname.trim()}`;
  const subject = `Neue Kontaktanfrage von ${fullName}`;

  const rows: Array<[string, string]> = [
    ['Name', fullName],
    ['E-Mail', payload.email.trim()],
    ['Telefon', payload.telefon?.trim() || '—'],
    ['Unternehmen', payload.unternehmen?.trim() || '—'],
  ];

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; color: #0f172a; max-width: 640px;">
      <h2 style="color: #041531; margin-bottom: 16px;">Neue Kontaktanfrage</h2>
      <table style="border-collapse: collapse; width: 100%; margin-bottom: 24px;">
        ${rows
          .map(
            ([label, value]) => `
          <tr>
            <td style="padding: 8px 12px; border: 1px solid #e5e7eb; background: #f8fafc; font-weight: 600; width: 30%;">${escapeHtml(label)}</td>
            <td style="padding: 8px 12px; border: 1px solid #e5e7eb;">${escapeHtml(value)}</td>
          </tr>`,
          )
          .join('')}
      </table>
      <h3 style="color: #041531; margin-bottom: 8px;">Nachricht</h3>
      <div style="padding: 16px; border: 1px solid #e5e7eb; background: #f8fafc; white-space: pre-wrap;">${escapeHtml(payload.nachricht.trim())}</div>
    </div>
  `;

  const textContent = [
    `Neue Kontaktanfrage`,
    ``,
    ...rows.map(([label, value]) => `${label}: ${value}`),
    ``,
    `Nachricht:`,
    payload.nachricht.trim(),
  ].join('\n');

  const body = {
    sender: { name: senderName, email: senderEmail },
    to: [{ email: toEmail, name: toName }],
    replyTo: { email: payload.email.trim(), name: fullName },
    subject,
    htmlContent,
    textContent,
  };

  const res = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'api-key': apiKey,
      'content-type': 'application/json',
      accept: 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const details = await res.text().catch(() => '');
    console.error('Brevo send failed', res.status, details);
    return NextResponse.json(
      { error: 'Versand fehlgeschlagen. Bitte versuchen Sie es später erneut.' },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
