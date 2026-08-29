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
