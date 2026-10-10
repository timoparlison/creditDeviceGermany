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

## Customer portal & admin (Bestellsystem V2)

- **Plan, status and resume point: `docs/BESTELLSYSTEM.md`** — read it first when working on the customer area
  and update it after each step.
- Backend: separate repo `../GccOrder` (JHipster/Spring Boot, JWT). Contract: `GccOrder/docs/requirements/bestellsystem-v2.md`.
- **BFF pattern:** JWT in httpOnly cookie `cd_session`; the browser only calls Next route handlers:
  `src/app/api/customer/auth/**` (login/register/reset/change-password) and the generic pass-through proxies
  `src/app/api/customer/portal/[...path]` → backend `/api/portal/**` and `src/app/api/admin/[...path]` → `/api/admin/**`
  (`src/lib/customer/proxy.ts`). Never call the backend directly from the client.
- Portal pages: `src/app/[locale]/konto/**` (de) / `/account/**` (other locales); `(app)/` route group = logged-in area,
  approved-only pages use `requireApprovedAccount` (`src/lib/customer/guards.ts`).
- Admin: `src/app/admin/**` (German only, outside next-intl, `ROLE_ADMIN` guard in `(secure)/layout.tsx`).
- `src/middleware.ts` gates `/konto`, `/account` and `/admin` by cookie and redirects the backend mail links
  (`/account/activate`, `/account/reset/finish`).
- Translations: namespace `Account` lives in `src/messages/account/<locale>.json` and is merged in
  `src/i18n/request.ts` (fallback en). Non-de texts are machine-translated.

## Conventions

- Prices in the UI use German comma format (`22,69`); schema.org JSON-LD requires dot decimals (`22.69`).
- Images: prefer local files in `public/`. Several content images still reference the legacy
  WordPress CDN (`206.wpcdnnode.com`) and should be migrated to `public/` over time.
