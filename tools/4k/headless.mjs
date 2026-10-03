#!/usr/bin/env node
// Run a packed sequence in headless Chromium through the preview host and report the result.
//
//   node headless.mjs <dist/name.js> [--m manifest.json] [--shots 0.5,2,4] [--size 1920x1080] [--timeout 30] [--gpu]
//
// Paths are relative to the current directory, which is served as the web root;
// this tool folder (preview.html) is mounted at /__4k/. --serve only serves and prints the URL.
//
// Prints console messages, the final page title ("done N s" or "error: ...") and writes
// screenshots to dist/shots/<name>-<t>.png. Needs a static server for this folder, which
// it starts itself. Exit code 0 only when the sequence resolved.
// The browser binary is $CHROMIUM if set (e.g. Playwright's chrome in CI), else `chromium`.

import { spawn } from 'node:child_process';
import { createServer } from 'node:http';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { extname, join, basename, resolve } from 'node:path';

const args = process.argv.slice(2);
const opt = (k, d) => (args.includes(k) ? args[args.indexOf(k) + 1] : d);
const seq = args.find((a) => a.endsWith('.js'));
const shots = opt('--shots', '').split(',').filter(Boolean).map(Number);
const [W, H] = opt('--size', '1920x1080').split('x').map(Number);
const timeout = +opt('--timeout', 30) * 1e3;
const root = resolve('.');
const toolDir = new URL('.', import.meta.url).pathname;
const manifest = opt('--m', '');

const types = { '.html': 'text/html', '.js': 'text/javascript', '.json': 'application/json', '.png': 'image/png', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.ogg': 'audio/ogg', '.wav': 'audio/wav' };
const server = createServer(async (req, res) => {
  try {
    const path = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    const p = path.startsWith('/__4k/') ? join(toolDir, path.slice(6)) : join(root, path);
    if (!p.startsWith(root) && !p.startsWith(toolDir)) throw 0;
    const body = await readFile(p);
    res.writeHead(200, { 'content-type': types[extname(p)] || 'application/octet-stream' });
    res.end(body);
  } catch {
    res.writeHead(404).end();
  }
}).listen(0, '127.0.0.1');
await new Promise((r) => server.once('listening', r));
const port = server.address().port;
if (args.includes('--serve')) {
  // Interactive mode: just serve and print the URL to open in a normal browser.
  console.log(`open http://127.0.0.1:${port}/__4k/preview.html?s=/${seq}&hud=1${manifest ? '&m=/' + manifest : ''}`);
  await new Promise(() => {});
}

const flags = [
  '--headless=new', '--no-sandbox', '--remote-debugging-port=0', '--autoplay-policy=no-user-gesture-required',
  `--window-size=${W},${H}`, '--hide-scrollbars', '--mute-audio',
  ...(args.includes('--gpu') ? ['--enable-gpu', '--ignore-gpu-blocklist'] : ['--enable-unsafe-swiftshader']),
  'about:blank',
];
const chrome = spawn(process.env.CHROMIUM ?? 'chromium', flags, { stdio: ['ignore', 'ignore', 'pipe'] });
const wsUrl = await new Promise((ok) => {
  let buf = '';
  chrome.stderr.on('data', (d) => {
    buf += d;
    const m = buf.match(/DevTools listening on (ws:\/\/\S+)/);
    if (m) ok(m[1]);
  });
});

// Minimal CDP client: browser connection -> page target -> flattened session.
const ws = new WebSocket(wsUrl);
await new Promise((r) => (ws.onopen = r));
let id = 0;
const pending = new Map();
const listeners = [];
ws.onmessage = (e) => {
  const m = JSON.parse(e.data);
  if (m.id && pending.has(m.id)) {
    const { ok, fail } = pending.get(m.id);
    pending.delete(m.id);
    m.error ? fail(new Error(m.error.message)) : ok(m.result);
  } else listeners.forEach((f) => f(m));
};
const send = (method, params = {}, sessionId) =>
  new Promise((ok, fail) => {
    pending.set(++id, { ok, fail });
    ws.send(JSON.stringify({ id, method, params, sessionId }));
  });

const { targetId } = await send('Target.createTarget', { url: 'about:blank' });
const { sessionId } = await send('Target.attachToTarget', { targetId, flatten: true });
const s = (m, p) => send(m, p, sessionId);
listeners.push((m) => {
  if (m.method === 'Runtime.consoleAPICalled') console.log('console:', m.params.args.map((a) => a.value ?? a.description).join(' '));
  if (m.method === 'Runtime.exceptionThrown') console.log('exception:', m.params.exceptionDetails.exception?.description ?? m.params.exceptionDetails.text);
});
await s('Runtime.enable');
await s('Page.enable');
await s('Emulation.setDeviceMetricsOverride', { width: W, height: H, deviceScaleFactor: 1, mobile: false });
await s('Page.navigate', { url: `http://127.0.0.1:${port}/__4k/preview.html?s=/${seq}&auto=1&hud=1${manifest ? '&m=/' + manifest : ''}` });

const title = async () => (await s('Runtime.evaluate', { expression: 'document.title', returnByValue: true })).result.value;
const t0 = Date.now();
const outDir = join(root, 'dist', 'shots');
await mkdir(outDir, { recursive: true });
const pendingShots = [...shots].sort((a, b) => a - b);
let result;
while (Date.now() - t0 < timeout) {
  const t = (Date.now() - t0) / 1e3;
  if (pendingShots.length && t >= pendingShots[0]) {
    const at = pendingShots.shift();
    const { data } = await s('Page.captureScreenshot', { format: 'png' });
    const f = join(outDir, `${basename(seq, '.js')}-${at}.png`);
    await writeFile(f, Buffer.from(data, 'base64'));
    console.log('shot:', f);
  }
  result = await title();
  if (/^(done|error)/.test(result)) break;
  await new Promise((r) => setTimeout(r, 50));
}
console.log('result:', result);
chrome.kill();
server.close();
ws.close();
process.exit(/^done/.test(result) ? 0 : 1);
