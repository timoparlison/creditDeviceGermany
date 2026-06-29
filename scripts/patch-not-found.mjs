import { readFileSync, writeFileSync, existsSync } from 'fs';

const paths = [
  '.vercel/output/functions/_not-found.func/.vc-config.json',
  '.vercel/output/functions/_not-found.rsc.func/.vc-config.json',
];

for (const path of paths) {
  if (existsSync(path)) {
    const config = JSON.parse(readFileSync(path, 'utf8'));
    config.runtime = 'edge';
    writeFileSync(path, JSON.stringify(config, null, 2));
    console.log(`Patched: ${path}`);
  }
}
