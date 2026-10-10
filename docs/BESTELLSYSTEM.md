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
| 1 | Auth-Basis aus Phase 1 übernehmen und auf V2 umstellen (lib/customer, Login, Registrierung via `/api/register`, Aktivierung, Passwort-Reset, Middleware, Routing, Header-Menü, Provider). Guthaben-Teile weglassen. Build grün. | ✅ |
| 2 | Antrag + Kontostatus: `/konto` zeigt je nach Status Antragsformular / „wird geprüft“ / abgelehnt (Grund + neu beantragen) / freigegeben | ✅ |
| 3 | Übersicht (freigegeben): Limit, verbraucht, verfügbar, Rabatte; Preisliste je Zone | ✅ |
| 4 | Bestellen im Portal: Vollauskunft (Firmensuche → Preis → bestellen) und PEP; 402/502 sauber anzeigen | ✅ |
| 5 | Bestellungen: Liste mit Filtern + Paging, Detail, PDF-Download | ✅ |
| 6 | Sammelrechnungen: Liste + PDF | ✅ |
| 7 | API-Keys: Live/Test erzeugen/rotieren (Klartext einmalig), Übersicht, Link auf Swagger-Doku | ✅ |
| 8 | Admin: Login/Guard, Kontenliste mit Statusfilter, Freigeben/Ablehnen, Konditionen ändern, Key widerrufen, Abrechnungslauf | ✅ |
| 9 | Feinschliff: Übersetzungen alle Locales, robots/noindex, Konto ändern/Passwort ändern, CLAUDE.md, Smoke-Test gegen lokales Backend | ⬜ |

## Offene Punkte / Annahmen (prüfen)

- Backend: `jhipster.mail.base-url` in `application-prod.yml` ist noch Platzhalter (`my-server-url-to-change`)
  → Aktivierungs-/Reset-Mails zeigen sonst ins Leere. Muss auf `https://creditdevice.de` (prüfen).
- Backend: Login-Name bei Registrierung = E-Mail-Adresse (Frontend setzt `login = email`) (prüfen).
- PEP-Gastpreis ist im Frontend gespiegelt (`src/components/pep/PepCheckFlow.tsx`), Backend-Preis noch Platzhalter.
- Backend `PricingService.countryToPriceZone`: Zone 1 enthält `IR` (Iran) – vermutlich `IE` (Irland) gemeint.
- Öffentliche URL der Kunden-API/Swagger: Env `CUSTOMER_API_PUBLIC_URL` (Default `GCC_BACKEND_URL`) – eigene Domain wie api.creditdevice.de? (prüfen)
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
  - `npm run build:next` grün (nach Platz schaffen) → Schritt 1 ✅
- 2026-10-09 Schritt 2 ✅: `(app)/page.tsx` (Status-Weiche, Stammdaten, Konditionen), `ApplicationForm.tsx`, `lib/customer/countries.ts`
  (Länderliste + Auswahl „berechtigtes Interesse“ (prüfen)), `ui.tsx` + `SelectField`/`Card`. Build grün. Nicht gegen Backend getestet (lief nicht).
- 2026-10-09 Schritt 3 ✅: `AccountOverviewPanel.tsx` (Limit-Balken, Preistabelle), `client.ts` `getAccountOverview`/`getPrices`, Texte overview/prices/products/zones.
- 2026-10-09 Schritt 4 ✅: `PortalOrder.tsx` (Reiter FULL/PEP; Firmensuche über bestehende öffentliche Route `/api/gcc/search`,
  Preis über `/prices?creditSafeObjectId=`, Bestellung über Proxy; PEP-Formular nutzt exportierte Bausteine aus `PepCheckFlow.tsx`:
  `SEARCH_TYPES`, `MultiCountrySelect`, `PepResultCard`, `splitList`), Seite `(app)/bestellen`, `lib/customer/guards.ts`
  (`requireApprovedAccount`), Layout lädt Kontostatus → `AccountShell` zeigt Bestell-Menüs nur bei APPROVED + Kundennummer.
  Report-Sprache wählbar de/en (prüfen: weitere Sprachen bei CreditSafe?).
- 2026-10-09 Schritt 5 ✅: `OrderList.tsx` (Filter Produkt/Von/Bis/Referenz, Paging über `X-Total-Count`, aufklappbares Detail mit Preisaufschlüsselung + PEP-Treffern, PDF-Link), Seite `(app)/bestellungen`.
- 2026-10-09 Schritt 6 ✅: Seite `(app)/rechnungen` (serverseitig, `client.getInvoices`), Routen `/konto/rechnungen`, `/konto/api-zugang`, Navigation ergänzt.
- 2026-10-09 Schritt 7 ✅: `ApiKeyManager.tsx` + Seite `(app)/api-zugang` (Live/Test, Klartext einmalig + Kopieren, Bestätigung beim Rotieren, Doku-Link `${CUSTOMER_API_PUBLIC_URL ?? GCC_BACKEND_URL}/swagger-ui.html`). Build grün (Schritte 4–7).
- 2026-10-09 Schritt 8 ✅: Admin unter `src/app/admin/`: `login/page.tsx` + `components/admin/AdminLoginForm.tsx` (Login über
  `/api/customer/auth/login`, ohne ROLE_ADMIN sofort Logout), Route-Gruppe `(secure)/layout.tsx` (Guard ROLE_ADMIN) mit `AdminShell`,
  `(secure)/page.tsx` → `AdminAccounts.tsx` (Statusfilter, Detail, Freigeben mit Limit+Rabatten, Ablehnen mit Grund, Konditionen ändern,
  Keys widerrufen), `(secure)/abrechnung` → `BillingRunForm.tsx`. Proxy `api/admin/[...path]`. `api.ts` + `apiPut`/`apiDelete`.
  robots: `/admin/` gesperrt. Nur Deutsch. Build grün.
- 2026-10-09 Schritt 9 (läuft): erledigt → Passwort ändern (`api/customer/auth/change-password` + `ChangePasswordForm`, unten auf `/konto`),
  Schnellzugriff „bestellen“ im Freigabe-Banner, Übersetzungen aller 10 Sprachen (194 Keys, Platzhalter geprüft), CLAUDE.md-Abschnitt.
  `npm run build` (next-on-pages) grün. Smoke-Test ohne Backend (Dev-Server) grün: Seiten in de/en/fr/fi, Gate-Redirects `/konto`,
  `/en/account/*`, `/admin/*`, Mail-Links → `/konto/aktivieren`, `/konto/passwort-zuruecksetzen`, Proxys → 401 ohne Session.
  **Offen in Schritt 9:** Ende-zu-Ende-Test gegen laufendes Backend (siehe Testdrehbuch unten). ESLint-Config ist vorbestehend
  inkompatibel (Flat-Config-Imports für Next 16, installiert 15.5.2) – nicht Teil des Bestellsystems.

- 2026-10-10 Korrektur (Timo): kein eigener Anmelde-Button im Header. Das Portal ist der **dritte Eintrag im Login-Dropdown**
  (neben CreditManagement/PolicyManagement), Label `Account.nav.portal` („Auskunftsportal“), Link `/konto` (Middleware → Login).
  `AccountMenu.tsx` entfernt.
- 2026-10-10 Korrektur (Timo): Admin landete nach Portal-Login im Antragsformular. Jetzt: `LoginForm` schickt ROLE_ADMIN nach `/admin/`,
  `(app)/layout.tsx` leitet Admins bei jedem `/konto`-Aufruf nach `/admin/` um.
- 2026-10-10 „Oberfläche kann noch nicht mit API-Keys umgehen“ (Timo, Symptom noch nicht genau bekannt): `ApiKeyManager` robuster –
  schlägt `GET /api-keys` fehl, bleiben die Erzeugen-Buttons nutzbar, Fehler zeigen HTTP-Status + Backend-Key; `format.ts` toleriert
  Zahl-/Array-Zeitstempel. Vertrag Frontend↔Backend geprüft, passt. Ursache offen (prüfen: Stand des Test-Backends, enthält es R-AX-6/7?).

## Testdrehbuch Ende-zu-Ende (lokales Backend auf :8080)

1. `/konto/registrieren` → Mail-Link (lokal Backend-Log/Mailcatcher) → `/konto/aktivieren` → Login.
2. `/konto` zeigt Antragsformular → absenden → Status „wird geprüft“.
3. `/admin/login` als Admin → Antrag freigeben (Limit z. B. 100 €, Rabatt FULL 10 %).
4. `/konto` → Übersicht/Preise (Rabatt sichtbar), Menü Bestellen/Bestellungen/Rechnungen/API.
5. Vollauskunft + PEP bestellen → Erfolg, PDF; Limit überschreiten → Meldung (402).
6. `/konto/bestellungen` Filter/Paging/Detail; `/konto/api-zugang` Test-Key erzeugen, einmalige Anzeige.
7. Admin: Abrechnung für aktuelle Periode starten → `/konto/rechnungen` zeigt Sammelrechnung + PDF.
8. Admin: Antrag ablehnen → Kunde sieht Grund und kann neu beantragen.
