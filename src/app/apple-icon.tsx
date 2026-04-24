import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#041531',
          color: '#F08013',
          fontSize: 120,
          fontWeight: 800,
          letterSpacing: -4,
          fontFamily: 'sans-serif',
        }}
      >
        C
      </div>
    ),
    { ...size }
  );
}
