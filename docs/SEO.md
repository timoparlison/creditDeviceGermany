# Offene SEO- & KI-Sichtbarkeits-Aufgaben

Dieses Dokument listet den aktuellen Stand und alle offenen SEO-/GEO-Arbeiten für
creditdevice.de. Zielgruppe: zukünftige Entwickler- und KI-Sessions — bitte nach
Erledigung einzelner Punkte aktualisieren.

Stand: 12. August 2026

## Bereits erledigt (August 2026)

- `public/llms.txt` + `public/llms-full.txt` existieren; verlinkt im Footer und per
  `<link rel="alternate" type="text/plain">` in `[locale]/layout.tsx`
- robots.txt erlaubt AI-Crawler explizit (`src/app/robots.ts`)
- Product/Offer-Schema mit den 4 Preiszonen auf `/bonitaetsinformationen/`
  (`creditReportProductSchema` in `src/components/seo/JsonLd.tsx`)
- IndexNow eingerichtet: Key-Datei in `public/`, Script `scripts/indexnow.mjs`,
  Aufruf `npm run indexnow` (nach jedem Deploy mit URL-Änderungen ausführen)
- Trailing-Slash-Kanonisierung: Sitemap, Canonicals, og:urls, Breadcrumbs, llms-Links
  zeigen auf finale Slash-URLs (Site läuft mit `trailingSlash: true`)
- Logo + ISO-Badge lokal in `public/` (vorher altes WordPress-CDN)
- Google-Search-Console-Verifizierung vorbereitet in `src/app/layout.tsx`
  (Platzhalter-Kommentar) — **Token fehlt noch, siehe unten**

## Offen — Technisch

1. **Google Search Console anschließen** (blockiert Datenbasis für alles Weitere):
   Token in `src/app/layout.tsx` eintragen, deployen, Property verifizieren.
2. **In-Page-hreflang**: hreflang hängt nur an der Sitemap. Die Seiten-`alternates`
   in den `generateMetadata`-Funktionen überschreiben die Sprach-Alternaten aus
   `[locale]/layout.tsx` komplett. Lösung: `languages` in den seitenbezogenen
   `alternates` mit ausgeben (Mapping aus `src/i18n/routing.ts` nutzen).
3. **Self-Canonicals pro Sprache klären** (strategische Entscheidung!):
   `/en/policymanager/` und `/en/credit-management-software/` kanonisieren aktuell
   auf die deutsche URL — Widerspruch zu den hreflang-Signalen. Wenn die
   fremdsprachigen Seiten ranken sollen: Self-Canonical pro Locale.
4. **CDN-Bilder migrieren + komprimieren**: `CustomerLogos.tsx`, `WhyUs.tsx`,
   `Hero.tsx` (Default-Image), `[locale]/policymanager/page.tsx`,
   `[locale]/credit-management-software/page.tsx` laden noch von
   `206.wpcdnnode.com`. Achtung: `images.unoptimized: true` in `next.config.ts` —
   Bilder gehen unkomprimiert raus, vor Migration lokal als WebP aufbereiten.
5. **Legacy-Seiten entfernen**: hartcodierte deutsche Seiten unter `src/app/`
   (ohne `[locale]`) sind durch die Middleware unerreichbar, blähen nur den Build
   auf. Vor dem Löschen prüfen, ob intern irgendwo verlinkt.
6. **Sitemap-`lastModified`** steht bei jedem Build auf „heute" für alle Seiten —
   unglaubwürdig, Google ignoriert das eher. Echte Änderungsdaten wären sauberer
   (prüfen: z. B. aus Git-Historie).
7. Kleinigkeiten: ESLint-Config-Warnung (`eslint-config-next/core-web-vitals`
   Auflösung) fixen; `BreadcrumbList` im `[locale]`-Kontext nutzt hartcodiert
   "Home" statt Übersetzung.

## Offen — Content (größter Hebel)

1. **Inkasso-Seite fehlt komplett**: `llms-full.txt` und Homepage nennen Inkasso
   als 4. Produktbaustein, aber es gibt keine Seite im Routing. Keywords:
   „Inkasso Hamburg", „Inkassodienstleister B2B", „Forderungseinzug Unternehmen".
2. **Keyword-Recherche** (erst nach Search Console!): u. a. „Bonitätsauskunft",
   „Wirtschaftsauskunft online", „Firmenauskunft", „Bonitätsprüfung Unternehmen",
   „Debitorenmanagement Software", „Mahnwesen Software". Homepage-Title
   („Ihr Partner für Credit Management") ist zu generisch.
3. **Länder-Landingpages** („Bonitätsauskunft Polen" etc.): 200+ Länder,
   großes Long-Tail-Potenzial. Nur mit echten Datenpunkten pro Land (Quelle,
   Aktualität, Preis, Lieferzeit, Beispiel-Report) umsetzen — sonst
   Thin-Content-/Doorway-Page-Risiko.
4. **Glossar/Ratgeber**: „Was ist ein Bonitätsscore?", „Kreditlimit berechnen",
   „Mahnwesen Ablauf", „Kreditversicherung Vergleich" — jede Seite mit FAQ-Schema.
5. **Original Research / Studien** (z. B. Zahlungsmoral-Report): stärkster Magnet
   für Backlinks und KI-Zitate. Prüfen, ob anonymisiert aggregierbare Daten aus
   den Auskünften verwendbar sind (datenschutzrechtlich klären).
6. **Vergleichsseiten** („Creditreform Alternative" o. ä.): hohe Kaufintention,
   aber wettbewerbsrechtlich heikel — nur sachlich und nach rechtlicher Prüfung.

## Offen — Strukturierte Daten

1. **SoftwareApplication um `offers` ergänzen** (PolicyManager „ab 200 €/Monat"
   ist ein konkreter zitierfähiger Preis, bisher ohne Offer ausgezeichnet).
2. **`sameAs` erweitern**, sobald externe Profile existieren (Wikidata, Crunchbase,
   OMR Reviews).
3. Review-/AggregateRating nur mit echten Kundenbewertungen (sonst Guideline-Risiko).

## Offen — Grounding Page / Presse

1. **`/ueber-uns/` zur kanonischen Faktenseite ausbauen** (oder `/unternehmen` neu):
   Gründung, Geschäftsführung, Produkte mit Preisen, Kennzahlen (200+ Länder,
   430 Mio. Unternehmensprofile, ISO 27001) in nüchternem, zitierfähigem Stil.
2. **Pressebereich `/presse`**: Fact Sheet, Boilerplate, Logo-Downloads — steuert,
   wie Journalisten und KIs über das Unternehmen schreiben.

## Offen — Off-Page / KI-Ökosystem

LLMs antworten vor allem aus Drittquellen. Priorität:

1. **Wikidata-Eintrag** anlegen (machbar); Wikipedia bei KMU-Größe eher schwierig (prüfen).
2. **Software-Verzeichnisse**: OMR Reviews, G2, Capterra — Profile anlegen,
   Bewertungen aktiv einsammeln.
3. **Google Business Profile, Bing Places, Apple Business Connect** — konsistente
   NAP-Daten (Winsbergring 10, 22525 Hamburg, +49 40 890692990).
4. **FEBIS-Profil** nutzen (Geschäftsführer ist Vorstandsmitglied).
5. YouTube-Kanal `@creditdevice` mit Erklärvideos inkl. Transkript bespielen.
6. Fachartikel/Gastbeiträge in Credit-Management-Medien.

## Offen — Messbarkeit

1. **KI-Sichtbarkeit tracken**: feste Testprompt-Liste (z. B. „Was kostet eine
   Bonitätsauskunft?", „Anbieter Credit Management Software Deutschland") monatlich
   in ChatGPT/Perplexity/Gemini abfragen und Ergebnisse dokumentieren. Tools wie
   Peec AI, Otterly, Profound existieren (prüfen — Markt jung).
2. **Cloudflare-Analytics auf AI-Crawler** prüfen (GPTBot, ClaudeBot, PerplexityBot).
3. DSGVO-konformes Conversion-Tracking der Bestellstrecke (Plausible/Matomo o. ä.).

## Offene strategische Fragen (klären, bevor Content priorisiert wird)

- Primäres Ziel: Bestellungen im Auskunft-Shop (Transaktionen) vs. Demo-Anfragen
  für Software/PolicyManager (Leads)? Entscheidet über Länder-Pages vs. Ratgeber.
- Warum hat Inkasso keine Seite — bewusst zurückgestellt oder vergessen?
- Zwei Screenshots aus dem ursprünglichen SEO-Audit (u. a. zur „Grounding Page")
  wurden nie geliefert — ggf. beim Auditor nachfragen.

## Konventionen (bitte einhalten)

- URLs immer mit Trailing Slash (Canonicals, Sitemap, Schema, interne Links).
- Preise: UI mit Komma (`22,69`), schema.org JSON-LD mit Punkt (`22.69`).
- Nach jedem Deploy mit neuen/geänderten URLs: `npm run indexnow`.
- Maschinenlesbare Fakten (Adresse, Preise, Kennzahlen) müssen in
  `public/llms-full.txt` und auf den HTML-Seiten konsistent sein.

## Verifikation nach Änderungen

```bash
npm run build
npx wrangler pages dev .vercel/output/static --port 8788 &
curl -sL http://localhost:8788/bonitaetsinformationen/ | grep -o '"@type":"Product"'
curl -s http://localhost:8788/sitemap.xml | grep -oE '<loc>[^<]+</loc>'
```
