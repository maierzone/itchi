#!/usr/bin/env node
// Packer and size gate for KAOD 4096-byte sequences.
//
//   node pack.mjs <src.js> [-o out.js] [--iter N] [--no-terser]
//   node pack.mjs --check <file.js>...
//
// A sequence source is the body of `function($){...}`: it may `return` a Promise that
// resolves when the sequence ends. `$` is the host context (see README.md).
// Pipeline: GLSL blocks (template literals tagged with /*glsl*/) are stripped,
// terser minifies the JS, zopfli deflates it (raw), and the result is wrapped into a
// self-extracting stub. The stub carries the compressed bytes verbatim inside a template
// literal; the host must therefore turn the file into a string with one char per byte
// (char code = byte, i.e. String.fromCharCode over the bytes; not UTF-8, not windows-1252).

import { readFileSync, writeFileSync, statSync } from 'node:fs';
import { basename } from 'node:path';
import { minify } from 'terser';
import zopfli from '@gfx/zopfli';

export const LIMIT = 4096;

const STUB_HEAD = 'return new Response(new Blob([Uint8Array.from(`';
const STUB_TAIL =
  "`,c=>c.charCodeAt())]).stream().pipeThrough(new DecompressionStream('deflate-raw'))).text().then(s=>Function('$',s)($))";

// Collapse a GLSL ES source: drop comments and all whitespace that is not needed.
// Preprocessor lines keep their terminating newline.
export function minifyGlsl(src) {
  const out = [];
  for (let line of src.replace(/\/\*[\s\S]*?\*\//g, '').split('\n')) {
    line = line.replace(/\/\/.*$/, '').trim();
    if (!line) continue;
    if (line.startsWith('#')) {
      out.push('\n' + line.replace(/\s+/g, ' ') + '\n');
      continue;
    }
    out.push(
      ' ' +
        line
          .replace(/\s+/g, ' ')
          .replace(/ ?([{}()\[\];,=+\-*/<>!&|?:.^%]) ?/g, '$1')
    );
  }
  return out
    .join('')
    .replace(/\n /g, '\n')
    .replace(/^\n/, '')
    .replace(/ +/g, ' ')
    .replace(/([{}()\[\];,=+\-*/<>!&|?:.^%]) /g, '$1')
    .trim();
}

function stripGlslBlocks(src) {
  return src.replace(/\/\*glsl\*\/\s*`([^`]*)`/g, (m, body) => {
    if (body.includes('${')) throw new Error('GLSL block must not interpolate: ' + body.slice(0, 40));
    return '`' + minifyGlsl(body) + '`';
  });
}

// Escape raw bytes for a JS template literal. Only four things need care:
// backslash, backtick, "${" and CR (a raw CR would be normalized to LF by the parser).
export function escapeTemplateBytes(bytes) {
  let s = '';
  let escapes = 0;
  for (let i = 0; i < bytes.length; i++) {
    const b = bytes[i];
    if (b === 0x5c) (s += '\\\\'), escapes++;
    else if (b === 0x60) (s += '\\`'), escapes++;
    else if (b === 0x0d) (s += '\\r'), escapes++;
    else if (b === 0x24 && bytes[i + 1] === 0x7b) (s += '\\$'), escapes++;
    else s += String.fromCharCode(b);
  }
  return { s, escapes };
}

export async function pack(src, { iter = 500, terser = true } = {}) {
  const glsl = stripGlslBlocks(src);
  let js = glsl;
  if (terser) {
    const r = await minify(glsl, {
      ecma: 2020,
      parse: { bare_returns: true },
      compress: { passes: 3, toplevel: true, unsafe: true, unsafe_arrows: true, unsafe_math: true, pure_getters: true },
      mangle: { toplevel: true },
      format: { ecma: 2020, wrap_func_args: false, ascii_only: true },
    });
    js = r.code;
  }
  const raw = Buffer.from(js, 'utf8');
  if (raw.some((b) => b > 0x7f)) throw new Error('minified source must be ASCII (use \\u escapes)');
  const deflated = Buffer.from(await zopfli.deflateAsync(raw, { numiterations: iter }));
  const { s, escapes } = escapeTemplateBytes(deflated);
  // Each char of `s` is one byte 0x00-0xFF; latin1 writes it back unchanged.
  const file = Buffer.from(STUB_HEAD + s + STUB_TAIL, 'latin1');
  return {
    file,
    minified: js,
    stats: {
      source: Buffer.byteLength(src),
      minified: raw.length,
      deflated: deflated.length,
      escapes,
      stub: STUB_HEAD.length + STUB_TAIL.length,
      total: file.length,
    },
  };
}

function report(name, st) {
  const free = LIMIT - st.total;
  const bar = (n) => String(n).padStart(6);
  console.log(`${name}
  source   ${bar(st.source)} B
  minified ${bar(st.minified)} B
  deflated ${bar(st.deflated)} B  (${(st.deflated / st.minified * 100).toFixed(1)} %)
  escapes  ${bar(st.escapes)} B
  stub     ${bar(st.stub)} B
  total    ${bar(st.total)} B  of ${LIMIT}  ->  ${free >= 0 ? free + ' B free' : -free + ' B OVER'}`);
}

async function main(argv) {
  if (argv[0] === '--check') {
    let bad = 0;
    for (const f of argv.slice(1)) {
      const n = statSync(f).size;
      const ok = n <= LIMIT;
      if (!ok) bad++;
      console.log(`${ok ? 'ok  ' : 'FAIL'} ${String(n).padStart(5)} / ${LIMIT}  ${f}`);
    }
    process.exit(bad ? 1 : 0);
  }
  let src, out, iter = 500, terser = true;
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '-o') out = argv[++i];
    else if (a === '--iter') iter = +argv[++i];
    else if (a === '--no-terser') terser = false;
    else src = a;
  }
  if (!src) {
    console.error('usage: node pack.mjs <src.js> [-o out.js] [--iter N] [--no-terser] | --check <files>');
    process.exit(2);
  }
  out ??= 'dist/' + basename(src);
  const r = await pack(readFileSync(src, 'utf8'), { iter, terser });
  writeFileSync(out, r.file);
  writeFileSync(out.replace(/\.js$/, '') + '.min.txt', r.minified);
  report(out, r.stats);
  process.exit(r.stats.total > LIMIT ? 1 : 0);
}

if (import.meta.url === `file://${process.argv[1]}`) main(process.argv.slice(2));
