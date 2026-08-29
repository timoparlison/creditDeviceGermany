# Backend

Das Backend für den Kundenkonto- und Bestellbereich dieser Website wird in einem
**separaten Repository** verwaltet:

- **Pfad:** `/Users/timo/IdeaProjects/pcc/auskunftsbereich/GccOrder`
- **Stack:** JHipster / Spring Boot (Kotlin), JWT-Auth (stateless, Bearer-Token),
  REST-APIs unter `/api/customer/**` (Kunden) und `/api/admin/**` (Admin).
- Aktueller Feature-Branch dort: `feature/Bestellsystem`.

## Frontend-Vertrag / API-Referenz

Die maßgebliche, KI-agnostische Schnittstellenbeschreibung für dieses Frontend
liegt im Backend-Repo:

- **`GccOrder/docs/features/FOR_AI_FRONTEND.md`** — zentrale API-Referenz
  (Auth, Endpunkte, DTOs, Enums, Fehlerbehandlung, Produkte/Preise).
- Weitere Feature-Dokumente im selben Ordner (`GccOrder/docs/features/`):
  - `README.md` — Feature-Übersicht
  - `auth-and-registration.md` — F-001 Registrierung, Login, Aktivierung, Passwort-Reset
  - `stripe-credit.md` — F-002 Guthaben aufladen via Stripe
  - `api-key.md` — F-003 API-Key-Verwaltung
  - `invoice-payment-request.md` — F-004 Rechnungszahlung beantragen
  - `customer-dashboard.md` — F-005 Kunden-Dashboard (`GET /api/customer/dashboard`)
  - `monthly-collective-invoice.md` — F-006 Sammelrechnungen

## Eckpunkte

- Base-URL konfigurierbar halten (lokal `http://localhost:8080`).
- Login: `POST /api/authenticate` → `id_token`; danach `Authorization: Bearer <id_token>`.
- Gastbestellung bleibt unverändert über `/api/creditInformation` und `/api/payment/**`.
- Zahlungsarten für registrierte Kunden: `STRIPE`, `CREDIT` (Guthaben), `INVOICE` (nach Freigabe).
- Beträge als `BigDecimal` (2 Dezimalstellen), Währung `EUR`.
- Kein dedizierter Produkt-/Preis-Endpunkt; Standardprodukt `FULL` (Vollauskunft).
  Produktbezeichnung/-preis nicht im Frontend hartcodieren.

> Bei Backend-Änderungen an Endpunkten/DTOs/Enums wird `FOR_AI_FRONTEND.md` im
> Backend-Repo aktualisiert — dort nachschlagen, nicht raten.

## Frontend-Stand (Bestellsystem / Kundenbereich)

Stufenweise Umsetzung. **Phase 1 umgesetzt:** F-001 Auth, F-005 Dashboard-Grundgerüst,
F-002 Guthaben.

- **Auth-Architektur:** BFF-Proxy. JWT liegt in einem httpOnly-Cookie `cd_session`;
  der Browser spricht nie direkt mit `GccOrder`, sondern nur mit den Next-Route-Handlern
  unter `src/app/api/customer/**` (alle `runtime = 'edge'`).
- **Integrationsschicht:** `src/lib/customer/` — `client.ts` (server-seitige Fetch-Wrapper
  gegen `GCC_BACKEND_URL`), `session.ts` (Cookie), `api.ts` (Client-Fetch-Helfer für Forms),
  `types.ts` (DTOs), `format.ts`, `route-helpers.ts`, `constants.ts`.
- **Seiten:** `src/app/[locale]/konto/` — `login`, `registrieren`, `passwort-vergessen`,
  `passwort-zuruecksetzen` (öffentlich); `(app)/` Route-Gruppe mit Auth-Guard-Layout →
  `(app)/page.tsx` = Dashboard (`/konto`), `(app)/guthaben/page.tsx` (`/konto/guthaben`).
  Andere Locales: `/account`, `/account/login`, …
- **Routing:** `src/i18n/routing.ts` `pathnames` erweitert; `PROTECTED_PREFIX`/
  `PUBLIC_ACCOUNT_ROUTES` exportiert. `src/middleware.ts` umschließt die next-intl-Middleware
  und leitet ohne `cd_session`-Cookie auf die Login-Seite um.
- **Komponenten:** `src/components/customer/` — `CustomerAuthProvider` (Client-Context,
  im `[locale]/layout.tsx` eingebunden), `AccountMenu` (Header), `AccountShell` (Sidebar),
  `LoginForm` / `RegisterForm` / `ForgotPasswordForm` / `ResetPasswordForm`,
  `BalancePanel`, `DepositForm` (Stripe `PaymentElement`).
- **i18n:** Namespace `Account` in allen 10 `src/messages/*.json`. DE handgeschrieben,
  die anderen 9 maschinell übersetzt → **fachlich gegenlesen**, v. a. Zahlungs-/Rechtstexte.
- **Nicht umgesetzt:** F-003 API-Key, F-004 Rechnungsantrag, F-006 Sammelrechnungen
  (Backend-DTO-Felder dafür sind in `types.ts` schon vorbereitet), Checkout-Integration
  der Zahlungsart Guthaben/Rechnung — dafür fehlt noch ein Kunden-Bestell-Endpoint
  im Backend (im Dashboard-DTO taucht `paymentMethod: CREDIT` auf, aber `FOR_AI_FRONTEND.md`
  dokumentiert nur den Gast-Weg `POST /api/creditInformation`).

### Bekannte offene Punkte / Annahmen

- Konservative Defaults bis zur Business-Klärung: API-Key sofort & ohne Preisanzeige,
  Rechnungsantrag nur Link-Eingabe (kein Datei-Upload), kein Guthaben-Höchstbetrag,
  Mindestaufladung 10 €.
- `not activated`-Login: JHipster liefert 401 mit englischem Text `"User <login> was not
  activated"`; der Login-Route-Handler mappt das auf `{ code: 'NOT_ACTIVATED' }` (403).
- `GET /api/customer/dashboard` wirft 500 (`No registered customer found for user N`) für
  JHipster-User ohne `RegisteredCustomer`-Profil (z. B. `admin`/`user`). Für echte, über
  `/api/customer/register` angelegte Kunden nicht relevant.
