# CreditDevice.de

Deutsche Website für CreditDevice GmbH - Credit Management Software

## Tech-Stack

- **Framework:** Next.js 14 (App Router)
- **Sprache:** TypeScript
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Deployment:** Cloudflare Pages (Static Export)

## Projektstruktur

```
src/
├── app/                  # Next.js App Router Seiten
├── components/
│   ├── layout/          # Header, Footer, Navigation
│   ├── ui/              # Wiederverwendbare UI-Komponenten
│   ├── sections/        # Seiten-Sektionen (Hero, Features, etc.)
│   └── forms/           # Formulare (Kontakt, Demo-Anfrage)
└── styles/              # Globale Styles
```

## Installation

```bash
npm install
```

## Entwicklung

```bash
npm run dev
```

Öffne [http://localhost:3000](http://localhost:3000) im Browser.

## Build

```bash
npm run build
```

Der statische Export wird im `out/` Verzeichnis erstellt.

## Deployment

Das Projekt ist für Cloudflare Pages konfiguriert:

1. Repository mit Cloudflare Pages verbinden
2. Build Command: `npm run build`
3. Output Directory: `out`

## Seiten

- `/` - Startseite
- `/bonitaetsinformationen` - Bonitätsinformationen
- `/credit-management-software` - Credit Management Software
- `/polismanager` - PolisManager
- `/kontakt` - Kontaktformular
- `/impressum` - Impressum
- `/datenschutz` - Datenschutzerklärung

## Lizenz

Proprietär - CreditDevice GmbH
