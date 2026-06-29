import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

const distPath = resolve('./node_modules/@cloudflare/next-on-pages/dist/index.js');
let src = readFileSync(distPath, 'utf8');
let changed = false;

// Revert any debug stack trace patch
const withStack = 'const errorMessage = error instanceof Error ? error.message + "\\nStack: " + error.stack : JSON.stringify(error);';
const withoutStack = 'const errorMessage = error instanceof Error ? error.message : JSON.stringify(error);';
if (src.includes(withStack)) {
  src = src.replace(withStack, withoutStack);
  changed = true;
  console.log('Reverted: debug stack trace patch');
}

// Fix next-on-pages bug: _error.func must be removed from invalidFunctions
// BEFORE _not-found check runs, otherwise both being invalid triggers a warning
// and _not-found stays invalid, failing the build.
const buggy =
  '    await tryToFixAppRouterNotFoundFunction(collectedFunctions);\n    await fixAppRouterInvalidErrorFunctions(collectedFunctions);';
const fixed =
  '    await fixAppRouterInvalidErrorFunctions(collectedFunctions);\n    await tryToFixAppRouterNotFoundFunction(collectedFunctions);';

if (src.includes(buggy)) {
  src = src.replace(buggy, fixed);
  changed = true;
  console.log('Patched: next-on-pages call order fixed (_error before _not-found)');
} else if (src.includes(fixed)) {
  console.log('Already patched: next-on-pages call order');
} else {
  console.error('ERROR: Could not find expected code in next-on-pages/dist/index.js — package may have been updated');
  process.exit(1);
}

if (changed) {
  writeFileSync(distPath, src);
}
