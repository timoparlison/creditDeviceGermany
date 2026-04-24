import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'CreditDevice — Ihr Partner für Credit Management';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 80,
          background: 'linear-gradient(135deg, #041531 0%, #0a2550 60%, #1a3a6b 100%)',
          color: '#ffffff',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: '50%',
              background: '#F08013',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 32,
              fontWeight: 800,
            }}
          >
            C
          </div>
          <div style={{ fontSize: 36, fontWeight: 700, letterSpacing: -0.5 }}>CreditDevice</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div
            style={{
              fontSize: 72,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: -1.5,
              maxWidth: 1000,
            }}
          >
            Ihr Partner für Credit Management
          </div>
          <div style={{ fontSize: 30, color: '#cbd5e1', maxWidth: 960, lineHeight: 1.3 }}>
            Bonitätsinformationen · Debitorenmanagement · Kreditversicherung
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: 24, color: '#94a3b8' }}>creditdevice.de</div>
          <div
            style={{
              display: 'flex',
              padding: '12px 24px',
              borderRadius: 9999,
              background: '#F08013',
              fontSize: 22,
              fontWeight: 700,
            }}
          >
            Demo anfordern →
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
