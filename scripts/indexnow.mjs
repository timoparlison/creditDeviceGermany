/**
 * IndexNow: Meldet alle URLs der Live-Sitemap an Bing, Yandex & Co.
 * Neue/geänderte Seiten werden so schneller indexiert — relevant u. a.
 * für die ChatGPT-Suche, die auf den Bing-Index zurückgreift.
 *
 * Voraussetzung: Die Key-Datei (public/<KEY>.txt) ist deployed und unter
 * https://creditdevice.de/<KEY>.txt erreichbar.
 *
 * Aufruf: npm run indexnow
 */

const SITE = 'https://creditdevice.de';
const HOST = 'creditdevice.de';
const KEY = 'c38d1b281e63c169499d2df7697fd854';

async function main() {
  const sitemapRes = await fetch(`${SITE}/sitemap.xml`);
  if (!sitemapRes.ok) {
    throw new Error(`Sitemap nicht erreichbar: HTTP ${sitemapRes.status}`);
  }
  const xml = await sitemapRes.text();

  // <loc>-Einträge (deutsche URLs) + hreflang-Alternates (alle Sprachen)
  const urls = new Set();
  for (const match of xml.matchAll(/<loc>(https:\/\/creditdevice\.de[^<]+)<\/loc>/g)) {
    urls.add(match[1]);
  }
  for (const match of xml.matchAll(/href="(https:\/\/creditdevice\.de[^"]+)"/g)) {
    urls.add(match[1]);
  }

  const urlList = [...urls];
  console.log(`${urlList.length} URLs in der Sitemap gefunden, sende an IndexNow …`);

  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({
      host: HOST,
      key: KEY,
      keyLocation: `${SITE}/${KEY}.txt`,
      urlList,
    }),
  });

  console.log(`IndexNow-Antwort: HTTP ${res.status} ${res.statusText}`);
  if (!res.ok) process.exit(1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
