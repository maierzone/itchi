// Round-trip test for the byte escaping: every byte sequence must survive
// escape -> x-user-defined decoding -> JS template literal -> Uint8Array.
import { escapeTemplateBytes, pack } from './pack.mjs';
import assert from 'node:assert/strict';

// x-user-defined: 0x00-0x7F -> same code point, 0x80-0xFF -> U+F780-U+F7FF
const xUserDefined = (buf) => String.fromCharCode(...[...buf].map((b) => (b < 0x80 ? b : 0xf700 + b)));
const roundTrip = (bytes) => {
  const { s } = escapeTemplateBytes(bytes);
  const fileBytes = Buffer.from(s, 'latin1');
  const src = 'return Uint8Array.from(`' + xUserDefined(fileBytes) + '`,c=>c.charCodeAt())';
  return Buffer.from(Function(src)());
};

const cases = [
  Buffer.from([...Array(256).keys()]),
  Buffer.from('${${{`\\\\`\r\n\r$\\${', 'latin1'),
  Buffer.from([0x24, 0x7b, 0x5c, 0x24, 0x5c, 0x7b, 0x0d, 0x0d, 0x0a, 0x60, 0x00, 0x30]),
];
for (let n = 0; n < 2000; n++) cases.push(Buffer.from(Array.from({ length: 1 + (n % 97) }, () => (Math.random() * 256) | 0)));
for (const c of cases) assert.deepEqual(roundTrip(c), c);

// The packed stub must be pure Latin-1 bytes and decode back to the minified source.
const src = 'const a=`${1}\\\\`;return Promise.resolve(a+"\\r\\u00e9")';
const r = await pack(src, { iter: 15 });
const text = xUserDefined(r.file);
const out = await Function('$', text)({});
assert.equal(out, await Function(src)());
console.log(`ok: ${cases.length} escape round trips, stub executes (${r.stats.total} B)`);
