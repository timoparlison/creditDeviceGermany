# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Corporate website of CreditDevice GmbH (creditdevice.de) — B2B credit management:
online credit reports, credit management software, PolicyManager (credit insurance
policy management), debt collection.

## Tech Stack

- Next.js 15 (App Router, React 19), TypeScript, Tailwind CSS 4
- next-intl: 10 locales — `de` default without prefix, `en/es/fr/it/nl/sv/no/da/fi` with prefix
- Deployment: Cloudflare Pages via `@cloudflare/next-on-pages` + Wrangler (edge runtime)

## Commands

- `npm run dev` — dev server
- `npm run build` — production build (patch script + next-on-pages, output in `.vercel/output/static`)
- `npm run lint` — ESLint
- `npm run pages:preview` / `npm run pages:deploy` — preview / deploy to Cloudflare Pages
- `npm run indexnow` — submit all sitemap URLs to IndexNow (Bing); requires the deployed key file

## Architecture

- `src/app/[locale]/` — all live pages (i18n via next-intl middleware, German served at `/`)
- `src/app/page.tsx`, `src/app/bonitaetsinformationen/` etc. — legacy hardcoded German pages,
  superseded by the `[locale]` routes (prüfen: still needed or removable?)
- `src/messages/*.json` — translations, incl. meta titles/descriptions (`Metadata` namespace)
- `src/lib/seo.ts` — central organization data (name, address, logo) used by JSON-LD
- `src/components/seo/JsonLd.tsx` — schema.org helpers: Organization, WebSite, Breadcrumb,
  FAQPage, SoftwareApplication, Product with per-zone Offers
- `src/app/robots.ts` — robots.txt; AI crawlers (GPTBot, ClaudeBot, PerplexityBot, …) explicitly allowed
- `src/app/sitemap.ts` — sitemap.xml with hreflang alternates for all 10 locales
- `public/llms.txt` + `public/llms-full.txt` — machine-readable company/product description for
  LLMs; linked in the footer and via `<link rel="alternate" type="text/plain">` in `[locale]/layout.tsx`
- `scripts/indexnow.mjs` — IndexNow submission; key file `public/c38d1b281e63c169499d2df7697fd854.txt`
- `src/app/api/gcc/` — API routes for the online credit-report shop (Stripe payments)

## Backend

- The customer-account / ordering backend lives in a **separate repo**:
  `/Users/timo/IdeaProjects/pcc/auskunftsbereich/GccOrder` (JHipster / Spring Boot, JWT).
- Frontend API contract: `GccOrder/docs/features/FOR_AI_FRONTEND.md` (+ per-feature docs in that folder).
- See `docs/BACKEND.md` in this repo for a summary, the current frontend build status,
  and open points. **Read and update `docs/BACKEND.md` when working on the customer area.**

## Customer area (Kundenbereich / Bestellsystem)

- Pages under `src/app/[locale]/konto/` (de) / `/account` (other locales): login, register,
  password reset (public); `(app)/` route group behind an auth-guard layout → dashboard
  (`/konto`) and credit balance (`/konto/guthaben`).
- **BFF pattern:** JWT in an httpOnly cookie `cd_session`; the browser only calls the
  Next route handlers under `src/app/api/customer/**` (all edge runtime), which proxy to
  `GCC_BACKEND_URL` with a Bearer token. Never call the backend directly from the client.
- Integration layer: `src/lib/customer/` (client/session/api/types/format/route-helpers).
- Client auth state: `CustomerAuthProvider` in `src/components/customer/`, mounted in
  `[locale]/layout.tsx`; the Header shows login state via `AccountMenu`.
- `src/middleware.ts` wraps the next-intl middleware to gate the account area by cookie.
- Translations: `Account` namespace in all 10 `src/messages/*.json` (non-de machine-translated).

## Conventions

- Prices in the UI use German comma format (`22,69`); schema.org JSON-LD requires dot decimals (`22.69`).
- Images: prefer local files in `public/`. Several content images still reference the legacy
  WordPress CDN (`206.wpcdnnode.com`) and should be migrated to `public/` over time.

## SEO

- `docs/SEO.md` tracks the status of all SEO/AI-visibility work: what is done,
  what is open, and open strategic questions. Read it first when touching SEO topics
  and keep it up to date when items are completed.
