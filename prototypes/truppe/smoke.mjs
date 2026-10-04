// Rauchtest für den Truppen-Prototyp: lädt die Seite headless, spielt Auswahl, Squad, Befehle und Prompt durch,
// spult die Simulation vor und legt Screenshots ab. Aufruf: node prototypes/truppe/smoke.mjs [ausgabeordner]
import { execSync } from 'node:child_process';
import { mkdirSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const out = resolve(process.argv[2] || join(here, 'shots'));
mkdirSync(out, { recursive: true });

let chromium;
try { ({ chromium } = await import('playwright')); }
catch { ({ chromium } = createRequire(join(execSync('npm root -g').toString().trim(), 'x'))('playwright')); }

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM || undefined, args: ['--allow-file-access-from-files'] });
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
const errors = [];
page.on('pageerror', e => errors.push(String(e)));
page.on('console', m => { if (m.type() === 'error' && !/fonts\.(googleapis|gstatic)/.test(m.text() + (m.location().url || ''))) errors.push(m.text()); });
page.on('requestfailed', r => { if (!/fonts\.(googleapis|gstatic)/.test(r.url())) errors.push('request failed: ' + r.url()); });

await page.goto(pathToFileURL(join(here, 'index.html')).href);
await page.evaluate(() => window.__truppe.ready);
await page.waitForTimeout(300);
await page.screenshot({ path: join(out, '0_hilfe.png') });

const check = (ok, msg) => { if (!ok) { errors.push('FAIL ' + msg); } console.log((ok ? 'ok   ' : 'FAIL ') + msg); };
await page.keyboard.press('Space'); // schließt die Hilfe
const box = await page.locator('#c').boundingBox();

// Übersicht bei Zoom 0,6: leeres Papier, Bleistift, Tusche (Fog, GDD § 18)
await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
await page.mouse.wheel(0, 100);
await page.waitForTimeout(200);
await page.screenshot({ path: join(out, '0_uebersicht.png') });
await page.mouse.wheel(0, -100);
await page.waitForTimeout(100);

// Rahmen um die Startgruppe ziehen
const pts = await page.evaluate(() => {
  const T = window.__truppe, us = T.S.units.filter(u => u.team === 'orc' && u.type !== 'crawler');
  return us.map(u => T.toScreen(u.x, u.y));
});
const xs = pts.map(p => p.x), ys = pts.map(p => p.y);
await page.mouse.move(box.x + Math.min(...xs) - 40, box.y + Math.min(...ys) - 60);
await page.mouse.down();
await page.mouse.move(box.x + Math.max(...xs) + 40, box.y + Math.max(...ys) + 20, { steps: 8 });
await page.mouse.up();
const nSel = await page.evaluate(() => window.__truppe.sel.length);
check(nSel === 6, `Rahmenauswahl erfasst die Truppe (${nSel}/6)`);

await page.keyboard.press('Shift+Digit1');
const sq = await page.evaluate(() => window.__truppe.S.units.filter(u => u.squad === 1).length);
check(sq === 6, `Shift+1 bindet Squad 1 (${sq})`);
await page.waitForTimeout(250);
await page.screenshot({ path: join(out, '1_auswahl.png') });

// Rechtsklick: Formation nach rechts
await page.mouse.click(box.x + box.width * 0.75, box.y + box.height * 0.45, { button: 'right' });
await page.evaluate(() => window.__truppe.step(6));
await page.waitForTimeout(200);
const spread = await page.evaluate(() => {
  const us = window.__truppe.S.units.filter(u => u.squad === 1);
  let min = Infinity; for (const a of us) for (const b of us) if (a !== b) min = Math.min(min, Math.hypot(a.x - b.x, a.y - b.y));
  return { min: Math.round(min), moving: us.filter(u => u.order).length };
});
check(spread.min > 20, `Formation ohne Überlappung (min. Abstand ${spread.min} px, noch unterwegs ${spread.moving})`);
await page.screenshot({ path: join(out, '2_formation.png') });

// Prompt HUNT ANY, dann vorspulen
await page.keyboard.press('KeyE');
const dir = await page.evaluate(() => window.__truppe.S.squads[0].dir);
check(dir === 'HUNT', `E setzt den Prompt HUNT (${dir})`);
await page.evaluate(() => window.__truppe.step(40));
await page.waitForTimeout(200);
await page.screenshot({ path: join(out, '3_hunt.png') });

const st = await page.evaluate(() => {
  const S = window.__truppe.S;
  return { t: Math.round(S.t), tokens: Math.round(S.tokens), orc: S.units.filter(u => u.team === 'orc').length, mono: S.units.filter(u => u.team === 'mono').length,
    explored: S.over, brood: Math.round(S.blds.find(b => b.kind === 'brood').hp), crawlerCarry: S.units.filter(u => u.type === 'crawler').map(u => u.order && u.order.ph) };
});
console.log('Zustand', JSON.stringify(st));
check(st.tokens > 1000 || st.crawlerCarry.length, 'CRAWLER sammelt');

// Produktion: zwei EXECUTOR
await page.click('.bi[data-k="executor"]');
await page.click('.bi[data-k="executor"]');
await page.evaluate(() => window.__truppe.step(9));
const prod = await page.evaluate(() => window.__truppe.S.units.filter(u => u.team === 'orc' && u.type === 'executor').length);
console.log('EXECUTOR nach Produktion', prod);

// Zoom 1,5 auf die Truppe
await page.keyboard.press('Digit1'); await page.keyboard.press('Digit1');
await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
await page.mouse.wheel(0, -100);
await page.waitForTimeout(300);
await page.screenshot({ path: join(out, '4_zoom.png') });

// Bis zum Ende spulen
await page.evaluate(() => window.__truppe.step(240));
await page.waitForTimeout(300);
await page.screenshot({ path: join(out, '5_spaeter.png') });
console.log('Ende', await page.evaluate(() => ({ over: window.__truppe.S.over, t: Math.round(window.__truppe.S.t), wave: window.__truppe.S.wave })));

await browser.close();
if (errors.length) { console.error(errors.join('\n')); process.exit(1); }
console.log('Rauchtest ok →', out);
