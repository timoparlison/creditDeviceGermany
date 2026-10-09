# Bestellsystem V2 – Kundenportal + Admin (Frontend)

Plan und Fortschritt. **Nach einer Unterbrechung hier weitermachen:** nächster offener Schritt = erster
Schritt ohne ✅. Nach jedem Schritt Status + Notizen hier aktualisieren.

- Branch: `feature/Bestellsystem_v2` (Frontend), Backend `../GccOrder` Branch `feature/Bestellsystem_V2`
- Backend-Vertrag (Quelle der Wahrheit): `GccOrder/docs/requirements/bestellsystem-v2.md`
  (Kap. 2–8 + Kap. 14), DTOs in `GccOrder/src/main/kotlin/.../service/{customer,order,billing}/*Dtos.kt`,
  Controller `web/rest/portal/*`, `web/rest/admin/*`.
- Alter Phase-1-Stand (Guthaben-Modell, veraltet): lokaler Branch `backup/Bestellsystem-phase1` (3e5a6d0).
  Daraus wird nur Wiederverwendbares übernommen (Auth/BFF, UI-Bausteine). **Nicht** blind mergen –
  der Branch ist älter als die PEP-Seite und entfernt sie aus Header/Routing.

## Architektur (festgelegt)

- **BFF:** JWT im httpOnly-Cookie `cd_session`; Browser spricht nur mit Next-Route-Handlern unter
  `src/app/api/customer/**` bzw. `src/app/api/admin/**` (edge runtime), die mit Bearer-Token an
  `GCC_BACKEND_URL` weiterreichen. Kein `cache:` in `fetch` (Workers-Runtime wirft).
- **Kundenportal:** `src/app/[locale]/konto/**` (de) / `/account/**` (andere Locales), alle 10 Sprachen.
- **Admin:** `src/app/admin/**` außerhalb von `[locale]`, nur Deutsch, `noindex`, in `robots.ts` gesperrt.
  Login über dieselbe JHipster-Anmeldung; Zugriff nur mit `ROLE_ADMIN` (aus `/api/account` `authorities`),
  Prüfung im Layout und in jedem Admin-Route-Handler (Backend prüft zusätzlich).
- **Mail-Links des Backends:** `/account/activate?key=` und `/account/reset/finish?key=` → Middleware
  leitet auf die lokalisierten Seiten um.

## Backend-Endpunkte (Kurzreferenz)

| Zweck | Endpunkt |
|---|---|
| Registrieren / Aktivieren | `POST /api/register` {login,email,password,firstName,lastName,langKey}, `GET /api/activate?key=` |
| Login / Konto | `POST /api/authenticate` → `id_token`; `GET /api/account` |
| Passwort | `POST /api/account/reset-password/init` (text), `/finish` {key,newPassword}, `POST /api/account/change-password` |
| Antrag / Status | `POST /api/portal/application`, `GET /api/portal/account` (404 = kein Antrag) |
| Übersicht / Preise | `GET /api/portal/account/overview`, `GET /api/portal/prices?country=|creditSafeObjectId=` |
| Bestellen | `POST /api/portal/orders/full` {creditSafeObjectId,isoLanguageCode?,reasonCode?,customerReference?}, `POST /api/portal/orders/pep` {search,customerReference?} |
| Bestellungen | `GET /api/portal/orders?page&size&product&from&to&customerReference` (Header `X-Total-Count`), `GET …/orders/{id}`, `GET …/orders/{id}/pdf` |
| Rechnungen | `GET /api/portal/invoices`, `GET …/invoices/{id}/pdf` |
| API-Keys | `POST /api/portal/api-key?mode=LIVE|TEST` → {apiKey} einmalig, `GET /api/portal/api-keys` |
| Admin | `GET /api/admin/customer-accounts?status=`, `POST …/{id}/approve` {creditLimitGross,productDiscounts}, `POST …/{id}/reject` {reason}, `PUT …/{id}/conditions`, `DELETE …/{id}/api-key`, `POST /api/admin/billing-runs` {period:"yyyy-MM"} |
| Firmensuche (öffentlich) | `GET /api/customer-query-results` (wie Gast-Shop, `src/lib/gcc`) |

Fehler: 401 nicht angemeldet, 403 `error.customerNotApproved`, 402 `error.creditLimitExceeded`,
409 Antrag existiert, 502 Provider-Fehler, 400 `error.invalidRequest`.

## Schritte

| # | Schritt | Status |
|---|---|---|
| 0 | Plan-Datei, Phase-1-Basis gesichert (`backup/Bestellsystem-phase1`) | ✅ |
| 1 | Auth-Basis aus Phase 1 übernehmen und auf V2 umstellen (lib/customer, Login, Registrierung via `/api/register`, Aktivierung, Passwort-Reset, Middleware, Routing, Header-Menü, Provider). Guthaben-Teile weglassen. Build grün. | ⬜ |
| 2 | Antrag + Kontostatus: `/konto` zeigt je nach Status Antragsformular / „wird geprüft“ / abgelehnt (Grund + neu beantragen) / freigegeben | ⬜ |
| 3 | Übersicht (freigegeben): Limit, verbraucht, verfügbar, Rabatte; Preisliste je Zone | ⬜ |
| 4 | Bestellen im Portal: Vollauskunft (Firmensuche → Preis → bestellen) und PEP; 402/502 sauber anzeigen | ⬜ |
| 5 | Bestellungen: Liste mit Filtern + Paging, Detail, PDF-Download | ⬜ |
| 6 | Sammelrechnungen: Liste + PDF | ⬜ |
| 7 | API-Keys: Live/Test erzeugen/rotieren (Klartext einmalig), Übersicht, Link auf Swagger-Doku | ⬜ |
| 8 | Admin: Login/Guard, Kontenliste mit Statusfilter, Freigeben/Ablehnen, Konditionen ändern, Key widerrufen, Abrechnungslauf | ⬜ |
| 9 | Feinschliff: Übersetzungen alle Locales, robots/noindex, Konto ändern/Passwort ändern, CLAUDE.md, Smoke-Test gegen lokales Backend | ⬜ |

## Offene Punkte / Annahmen (prüfen)

- Backend: `jhipster.mail.base-url` in `application-prod.yml` ist noch Platzhalter (`my-server-url-to-change`)
  → Aktivierungs-/Reset-Mails zeigen sonst ins Leere. Muss auf `https://creditdevice.de` (prüfen).
- Backend: Login-Name bei Registrierung = E-Mail-Adresse (Frontend setzt `login = email`) (prüfen).
- PEP-Gastpreis ist im Frontend gespiegelt (`src/components/pep/PepCheckFlow.tsx`), Backend-Preis noch Platzhalter.
- Nicht-de Übersetzungen maschinell → fachlich gegenlesen.

## Fortschritts-Notizen

- 2026-10-09: Analyse abgeschlossen, Plan angelegt.
- 2026-10-09 Schritt 1 (Code fertig, Build noch nicht verifiziert – Platte voll, ENOSPC):
  - übernommen aus Backup: Auth-Routen, Login/Forgot/Reset/Aktivieren-Seiten, `ui.tsx`, `AuthCard`, `AccountMenu`, `AccountShell`, `CustomerAuthProvider`, `(app)/layout.tsx`
  - neu/umgeschrieben: `lib/customer/types.ts` (V2-DTOs komplett), `client.ts` (V2, `codeFromProblem`), `proxy.ts` + Route
    `api/customer/portal/[...path]` (generischer BFF-Proxy), Register → `/api/register` (login = E-Mail), `RegisterForm` (nur Person + Passwort),
    `middleware.ts` (Mail-Link-Redirects, `/admin`-Gate, Konto-Gate), `routing.ts` (Konto-Pfade), Header `AccountMenu`, `[locale]/layout.tsx` Provider
  - Übersetzungen: `src/messages/account/{de,en}.json`, in `src/i18n/request.ts` als Namespace `Account` gemergt (Fallback en)
  - `tsc --noEmit` grün. ESLint-Config kaputt (`eslint-config-next/core-web-vitals` nicht gefunden) – vorbestehend, (prüfen)
  - Offen in Schritt 1: `npm run build:next` grün bekommen (Platz schaffen), dann Status ✅
