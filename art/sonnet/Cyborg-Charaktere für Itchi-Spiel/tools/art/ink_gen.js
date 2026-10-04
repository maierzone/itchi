/* ink_gen.js · Cyborg-Strike: prozedurale Tusche-Figuren als SVG.
   Läuft im Browser und in Node. Seed A/B = Line-Boil-Frames (Art-Bibel § 4.4).
   Koordinaten: viewBox 400x400 = Feld ø40 mm, 10 Einheiten = 1 mm, Füße auf y=352. */
(function () {
'use strict';
const INK = '#221d17', SHEET = '#efe8d6';
const D2R = Math.PI / 180;
const LD = (() => { const l = Math.hypot(0.55, 0.83); return [0.55 / l, 0.83 / l]; })(); // Licht oben links

/* ---------- Zufall ---------- */
function mulberry(seed) { let a = seed >>> 0; return function () { a = (a + 0x6D2B79F5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
function hash2(a, b) { let h = (a ^ 0x9e3779b9) >>> 0; h = Math.imul(h ^ ((b + 0x7f4a7c15) >>> 0), 0x85ebca6b) >>> 0; h ^= h >>> 13; h = Math.imul(h, 0xc2b2ae35) >>> 0; h ^= h >>> 16; return h >>> 0; }
function pnoise(rnd, K) { const v = []; for (let i = 0; i < K; i++) v.push(rnd() * 2 - 1); return u => { const x = (((u % 1) + 1) % 1) * K, i = Math.floor(x), f = x - i, s = f * f * (3 - 2 * f); return v[i % K] + (v[(i + 1) % K] - v[i % K]) * s; }; }

/* ---------- Geometrie ---------- */
const dist = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]);
function area(P) { let s = 0; for (let i = 0; i < P.length; i++) { const a = P[i], b = P[(i + 1) % P.length]; s += a[0] * b[1] - b[0] * a[1]; } return s / 2; }
const orient = P => (area(P) < 0 ? P.slice().reverse() : P); // positiv = im Uhrzeigersinn (y nach unten)
function densify(P, closed, step) {
  const n = P.length, out = [], m = closed ? n : n - 1;
  for (let i = 0; i < n; i++) {
    const a = P[i]; out.push(a);
    if (i < m) { const b = P[(i + 1) % n], d = dist(a, b), k = Math.round(d / step); for (let j = 1; j < k; j++) { const t = j / k; out.push([a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, 0]); } }
  }
  return out;
}
const f1 = v => { const s = (Math.round(v * 10) / 10).toString(); return s === '-0' ? '0' : s; };
function qpath(P, closed) { // Mittelpunkt-Glättung (quadratisch)
  const n = P.length, mid = (a, b) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
  let d, m = mid(P[n - 1], P[0]);
  d = 'M' + f1(m[0]) + ' ' + f1(m[1]);
  for (let i = 0; i < n; i++) { const a = P[i], b = P[(i + 1) % n]; m = mid(a, b); d += 'Q' + f1(a[0]) + ' ' + f1(a[1]) + ' ' + f1(m[0]) + ' ' + f1(m[1]); }
  return d + 'Z';
}

/* ---------- Formen (Polygone mit [x,y,ecke]) ---------- */
const S = {};
S.rr = (x, y, w, h, r) => {
  const R = Array.isArray(r) ? r : [r, r, r, r], P = [];
  const cn = (cx, cy, rad, a0, px, py) => {
    if (rad < 0.8) { P.push([px, py, 1]); return; }
    const n = Math.max(3, Math.ceil(rad * 0.35));
    for (let i = 0; i <= n; i++) { const a = a0 + (Math.PI / 2) * i / n; P.push([cx + rad * Math.cos(a), cy + rad * Math.sin(a), 0]); }
  };
  cn(x + R[0], y + R[0], R[0], Math.PI, x, y);
  cn(x + w - R[1], y + R[1], R[1], 1.5 * Math.PI, x + w, y);
  cn(x + w - R[2], y + h - R[2], R[2], 0, x + w, y + h);
  cn(x + R[3], y + h - R[3], R[3], 0.5 * Math.PI, x, y + h);
  return P;
};
S.ell = (cx, cy, rx, ry, rot, n) => {
  rot = rot || 0; n = n || Math.max(14, Math.ceil(Math.PI * (rx + ry) / 6));
  const c = Math.cos(rot), s = Math.sin(rot), P = [];
  for (let i = 0; i < n; i++) { const t = -Math.PI / 2 + 2 * Math.PI * i / n, x = rx * Math.cos(t), y = ry * Math.sin(t); P.push([cx + x * c - y * s, cy + x * s + y * c, 0]); }
  return P;
};
S.poly = (pts, rad) => {
  if (!rad) return pts.map(p => [p[0], p[1], 1]);
  const n = pts.length, P = [];
  for (let i = 0; i < n; i++) {
    const v = pts[i], a = pts[(i + n - 1) % n], b = pts[(i + 1) % n], la = dist(v, a), lb = dist(v, b), r = Math.min(rad, la * 0.5, lb * 0.5);
    const p1 = [v[0] + (a[0] - v[0]) / la * r, v[1] + (a[1] - v[1]) / la * r], p2 = [v[0] + (b[0] - v[0]) / lb * r, v[1] + (b[1] - v[1]) / lb * r];
    for (let k = 0; k <= 5; k++) { const t = k / 5, u = 1 - t; P.push([u * u * p1[0] + 2 * u * t * v[0] + t * t * p2[0], u * u * p1[1] + 2 * u * t * v[1] + t * t * p2[1], 0]); }
  }
  return P;
};
S.spline = (pts, closed, per) => {
  per = per || 7; const n = pts.length, P = [], g = i => (closed ? pts[(i + n) % n] : pts[Math.max(0, Math.min(n - 1, i))]), m = closed ? n : n - 1;
  for (let i = 0; i < m; i++) {
    const p0 = g(i - 1), p1 = g(i), p2 = g(i + 1), p3 = g(i + 2);
    for (let k = 0; k < per; k++) {
      const t = k / per, t2 = t * t, t3 = t2 * t, q = j => 0.5 * ((2 * p1[j]) + (-p0[j] + p2[j]) * t + (2 * p0[j] - 5 * p1[j] + 4 * p2[j] - p3[j]) * t2 + (-p0[j] + 3 * p1[j] - 3 * p2[j] + p3[j]) * t3);
      P.push([q(0), q(1), 0]);
    }
  }
  if (!closed) P.push([pts[n - 1][0], pts[n - 1][1], 0]);
  return P;
};
S.caps = (x1, y1, x2, y2, r) => {
  const th = Math.atan2(y2 - y1, x2 - x1), P = [], n = Math.max(4, Math.ceil(r * 0.5));
  for (let i = 0; i <= n; i++) { const a = th - Math.PI / 2 + Math.PI * i / n; P.push([x2 + r * Math.cos(a), y2 + r * Math.sin(a), 0]); }
  for (let i = 0; i <= n; i++) { const a = th + Math.PI / 2 + Math.PI * i / n; P.push([x1 + r * Math.cos(a), y1 + r * Math.sin(a), 0]); }
  return P;
};
S.tube = (path, r0, r1) => { // gebogene Röhre/Finger: Spline-Mittellinie, rundes Ende
  r1 = r1 == null ? r0 : r1; const C = S.spline(path, false, 6), n = C.length, L = [], R = [], acc = [0];
  for (let i = 1; i < n; i++) acc.push(acc[i - 1] + dist(C[i - 1], C[i]));
  const tot = acc[n - 1] || 1; let last;
  for (let i = 0; i < n; i++) {
    const a = C[Math.max(0, i - 1)], b = C[Math.min(n - 1, i + 1)]; let tx = b[0] - a[0], ty = b[1] - a[1]; const tl = Math.hypot(tx, ty) || 1; tx /= tl; ty /= tl;
    const r = r0 + (r1 - r0) * acc[i] / tot; L.push([C[i][0] + ty * r, C[i][1] - tx * r, 0]); R.push([C[i][0] - ty * r, C[i][1] + tx * r, 0]); last = [tx, ty, r];
  }
  const cap = [], c = C[n - 1], nl = [last[1], -last[0]];
  for (let k = 1; k <= 4; k++) { const ph = Math.PI * k / 5, co = Math.cos(ph), si = Math.sin(ph); cap.push([c[0] + last[2] * (co * nl[0] + si * last[0]), c[1] + last[2] * (co * nl[1] + si * last[1]), 0]); }
  return orient(L.concat(cap, R.reverse()));
};
S.hull = function () {
  const pts = [].concat.apply([], arguments).map(p => [p[0], p[1]]).sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  const cr = (o, a, b) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]), lo = [], up = [];
  for (const p of pts) { while (lo.length >= 2 && cr(lo[lo.length - 2], lo[lo.length - 1], p) <= 0) lo.pop(); lo.push(p); }
  for (let i = pts.length - 1; i >= 0; i--) { const p = pts[i]; while (up.length >= 2 && cr(up[up.length - 2], up[up.length - 1], p) <= 0) up.pop(); up.push(p); }
  up.pop(); lo.pop(); return orient(lo.concat(up).map(p => [p[0], p[1], 0]));
};
S.star = (cx, cy, R, r, rot, n) => { n = n || 4; rot = rot || 0; const P = []; for (let i = 0; i < n * 2; i++) { const a = rot - Math.PI / 2 + Math.PI * i / n, q = i % 2 ? r : R; P.push([cx + q * Math.cos(a), cy + q * Math.sin(a), 1]); } return P; };
S.arc = (cx, cy, r, a0, a1, n) => { n = n || Math.max(4, Math.ceil(Math.abs(a1 - a0) * r / 5)); const P = []; for (let i = 0; i <= n; i++) { const a = a0 + (a1 - a0) * i / n; P.push([cx + r * Math.cos(a), cy + r * Math.sin(a), 0]); } return P; };
S.almond = (cx, cy, hw, hh, rot, hb) => {
  rot = rot || 0; hb = hb == null ? 0.85 : hb; const P = [], q = (p0, c, p1, n) => { for (let i = 1; i < n; i++) { const t = i / n, u = 1 - t; P.push([u * u * p0[0] + 2 * u * t * c[0] + t * t * p1[0], u * u * p0[1] + 2 * u * t * c[1] + t * t * p1[1], 0]); } };
  const Lc = [-hw, 0], Rc = [hw, 0]; P.push([-hw, 0, 1]); q(Lc, [0, -2 * hh], Rc, 10); P.push([hw, 0, 1]); q(Rc, [0, 2 * hh * hb], Lc, 10);
  const c = Math.cos(rot), s = Math.sin(rot); return P.map(p => [cx + p[0] * c - p[1] * s, cy + p[0] * s + p[1] * c, p[2]]);
};
S.lid = (cx, cy, hw, hh, rot) => { rot = rot || 0; const c = Math.cos(rot), s = Math.sin(rot), P = []; for (let i = 0; i <= 9; i++) { const t = i / 9, x = -hw * (1 - t) * (1 - t) + hw * t * t, y = 2 * (1 - t) * t * (-2 * hh); P.push([cx + x * c - y * s, cy + x * s + y * c]); } return P; };
S.bump = (P, amp, period) => {
  const D = densify(orient(P), true, 3), n = D.length, out = []; let s = 0;
  for (let i = 0; i < n; i++) { const a = D[(i + n - 1) % n], b = D[(i + 1) % n]; if (i) s += dist(D[i - 1], D[i]); const tx = b[0] - a[0], ty = b[1] - a[1], tl = Math.hypot(tx, ty) || 1, k = amp * Math.abs(Math.sin(Math.PI * s / period)); out.push([D[i][0] + ty / tl * k, D[i][1] - tx / tl * k, 0]); }
  return out;
};
S.sh = (P, dx, dy) => P.map(p => [p[0] + dx, p[1] + dy, p[2] || 0]);
S.at = (P, x, y, rot, s, fx) => { rot = (rot || 0) * D2R; s = s == null ? 1 : s; fx = fx || 1; const c = Math.cos(rot), sn = Math.sin(rot); return P.map(p => { const px = p[0] * s * fx, py = p[1] * s; return [x + px * c - py * sn, y + px * sn + py * c, p[2] || 0]; }); };

/* ---------- Tusche-Strich: wackeln, Breite schwellen, Umriss berechnen ---------- */
function trace(P, closed, o, rnd) {
  let pts = P.map(p => { const q = o.tf ? o.tf(p) : [p[0], p[1]]; return [q[0], q[1], p[2] | 0]; });
  let cx = 0, cy = 0; pts.forEach(p => { cx += p[0]; cy += p[1]; }); cx /= pts.length; cy /= pts.length;
  const sc = 1 + (rnd() * 2 - 1) * 0.005 * o.vj, jx = (rnd() * 2 - 1) * o.vj, jy = (rnd() * 2 - 1) * o.vj;
  pts = pts.map(p => { const c = p[2], j = c ? o.vj * 0.8 : 0; return [cx + (p[0] - cx) * sc + jx + (rnd() * 2 - 1) * j, cy + (p[1] - cy) * sc + jy + (rnd() * 2 - 1) * j, c]; });
  let per0 = 0; for (let i = 1; i < pts.length; i++) per0 += dist(pts[i - 1], pts[i]); if (closed) per0 += dist(pts[pts.length - 1], pts[0]);
  const st = Math.min(o.step, Math.max(2.5, per0 / 18));
  pts = densify(pts, closed, st);
  { const keep = [pts[0]]; for (let i = 1; i < pts.length; i++) { const p = pts[i]; if (p[2] === 1 || i === pts.length - 1 || dist(p, keep[keep.length - 1]) >= st * 0.55) keep.push(p); } pts = keep; }
  const n = pts.length, s = [0];
  for (let i = 1; i < n; i++) s.push(s[i - 1] + dist(pts[i - 1], pts[i]));
  const L = (s[n - 1] + (closed ? dist(pts[n - 1], pts[0]) : 0)) || 1;
  const N1 = pnoise(rnd, Math.max(3, Math.round(L / 85))), N2 = pnoise(rnd, Math.max(5, Math.round(L / 26))), N3 = pnoise(rnd, Math.max(3, Math.round(L / 55)));
  const smp = [];
  for (let i = 0; i < n; i++) {
    const p = pts[i], a = closed ? pts[(i + n - 1) % n] : pts[Math.max(0, i - 1)], b = closed ? pts[(i + 1) % n] : pts[Math.min(n - 1, i + 1)];
    let d1x = p[0] - a[0], d1y = p[1] - a[1], d2x = b[0] - p[0], d2y = b[1] - p[1];
    const l1 = Math.hypot(d1x, d1y), l2 = Math.hypot(d2x, d2y);
    if (l1 > 1e-6) { d1x /= l1; d1y /= l1; } if (l2 > 1e-6) { d2x /= l2; d2y /= l2; }
    if (l1 <= 1e-6) { d1x = d2x; d1y = d2y; } if (l2 <= 1e-6) { d2x = d1x; d2y = d1y; }
    const u = s[i] / L, disp = o.wob * N1(u) + o.wob * 0.4 * N2(u), n1 = [d1y, -d1x], n2 = [d2y, -d2x];
    if (p[2] === 1 && (closed || (i > 0 && i < n - 1))) {
      let bx = n1[0] + n2[0], by = n1[1] + n2[1]; const bl = Math.hypot(bx, by);
      if (bl < 1e-3) { bx = n1[0]; by = n1[1]; } else { bx /= bl; by /= bl; }
      const e = Math.min(1.6, l1 * 0.4, l2 * 0.4), cr = d1x * d2y - d1y * d2x, cs = Math.max(0.4, bx * n1[0] + by * n1[1]);
      smp.push({ k: 1, x: p[0] - d1x * e + bx * disp, y: p[1] - d1y * e + by * disp, nx: n1[0], ny: n1[1], u, cr, cs });
      smp.push({ k: 2, x: p[0] + bx * disp, y: p[1] + by * disp, nx: bx, ny: by, u, cr, cs });
      smp.push({ k: 3, x: p[0] + d2x * e + bx * disp, y: p[1] + d2y * e + by * disp, nx: n2[0], ny: n2[1], u, cr, cs });
    } else {
      let nx = d1y + d2y, ny = -(d1x + d2x); const nl = Math.hypot(nx, ny) || 1; nx /= nl; ny /= nl;
      smp.push({ k: 0, x: p[0] + nx * disp, y: p[1] + ny * disp, nx, ny, u });
    }
  }
  const wAt = q => o.w * (1 + 0.16 * N3(q.u)) * (closed ? 1 + o.lk * (q.nx * LD[0] + q.ny * LD[1]) : 0.5 + 0.5 * Math.pow(Math.sin(Math.PI * Math.min(1, Math.max(0, q.u))), 0.55));
  const center = smp.map(q => [q.x, q.y]);
  if (o.w <= 0) return { center };
  if (closed) {
    const outer = [], inner = [];
    for (const q of smp) {
      const h = wAt(q) / 2;
      if (q.k === 0) { outer.push([q.x + q.nx * h, q.y + q.ny * h]); inner.push([q.x - q.nx * h, q.y - q.ny * h]); continue; }
      const convex = q.cr > 0.02, concave = q.cr < -0.02;
      if (q.k === 2) {
        const m = Math.min(2.6, 1 / q.cs) * h;
        if (convex) { const M = [q.x - q.nx * m, q.y - q.ny * m]; inner.push(M, M); outer.push([q.x + q.nx * h, q.y + q.ny * h]); }
        else if (concave) { const M = [q.x + q.nx * m, q.y + q.ny * m]; outer.push(M, M); inner.push([q.x - q.nx * h, q.y - q.ny * h]); }
        else { outer.push([q.x + q.nx * h, q.y + q.ny * h]); inner.push([q.x - q.nx * h, q.y - q.ny * h]); }
      } else {
        if (convex) outer.push([q.x + q.nx * h, q.y + q.ny * h]);
        else if (concave) inner.push([q.x - q.nx * h, q.y - q.ny * h]);
        else { outer.push([q.x + q.nx * h, q.y + q.ny * h]); inner.push([q.x - q.nx * h, q.y - q.ny * h]); }
      }
    }
    return { outer, inner, center };
  }
  const left = [], right = [];
  for (const q of smp) { const h = wAt(q) / 2; left.push([q.x + q.nx * h, q.y + q.ny * h]); right.push([q.x - q.nx * h, q.y - q.ny * h]); }
  const e = smp[smp.length - 1], b0 = smp[0], he = wAt(e) / 2, hb = wAt(b0) / 2, poly = left.slice();
  for (let k = 1; k <= 3; k++) { const ph = Math.PI * k / 4, co = Math.cos(ph), si = Math.sin(ph); poly.push([e.x + he * (co * e.nx + si * -e.ny), e.y + he * (co * e.ny + si * e.nx)]); }
  for (let i = right.length - 1; i >= 0; i--) poly.push(right[i]);
  for (let k = 1; k <= 3; k++) { const ph = Math.PI * k / 4, co = Math.cos(ph), si = Math.sin(ph); poly.push([b0.x + hb * (-co * b0.nx + si * b0.ny), b0.y + hb * (-co * b0.ny - si * b0.nx)]); }
  return { poly, center };
}

/* ---------- Builder ---------- */
function Builder(seed, o) { this.seed = seed >>> 0; this.k = 0; this.o = Object.assign({ wob: 1.8, vj: 0.7, lk: 0.3, step: 12 }, o || {}); this.out = []; this.tfs = []; const f = this.o.fit; this.tfn = f ? (p => [f.cx + (p[0] - f.cx) * f.s + (f.dx || 0), f.cy + (p[1] - f.cy) * f.s + (f.dy || 0)]) : null; }
const BP = Builder.prototype;
BP.r = function () { return mulberry(hash2(this.seed, ++this.k)); };
BP.g = function (id) { this.out.push('<g id="' + id + '">'); return this; };
BP.e = function () { this.out.push('</g>'); return this; };
BP.push = function (deg, cx, cy) { const a = deg * D2R, c = Math.cos(a), s = Math.sin(a), prev = this.tfn; this.tfs.push(prev); this.tfn = p => { const x = p[0] - cx, y = p[1] - cy, q = [cx + x * c - y * s, cy + x * s + y * c]; return prev ? prev(q) : q; }; return this; };
BP.pop = function () { this.tfn = this.tfs.pop(); return this; };
BP._t = function (P, closed, o, W) { return trace(closed ? orient(P) : P, closed, { w: W, wob: o.wob == null ? this.o.wob : o.wob, vj: this.o.vj, lk: o.lk == null ? this.o.lk : o.lk, step: o.step || this.o.step, tf: this.tfn }, this.r()); };
BP.shape = function (P, o) {
  o = o || {}; const w = o.w == null ? 12 : o.w, fill = o.fill || 'sheet', t = this._t(P, true, o, w);
  if (w <= 0) { this.out.push('<path' + (fill === 'sheet' ? ' fill="' + SHEET + '"' : '') + ' d="' + qpath(t.center, true) + '"/>'); return this; }
  if (fill === 'none') { this.out.push('<path fill-rule="evenodd" d="' + qpath(t.outer, true) + qpath(t.inner, true) + '"/>'); return this; }
  this.out.push('<path d="' + qpath(t.outer, true) + '"/>');
  if (fill === 'sheet') this.out.push('<path fill="' + SHEET + '" d="' + qpath(t.inner, true) + '"/>');
  return this;
};
BP.line = function (P, o) { o = o || {}; const Q = o.smooth ? S.spline(P, false, 6) : P.map(p => [p[0], p[1], o.corners ? 1 : 0]); const t = this._t(Q, false, o, o.w == null ? 7 : o.w); this.out.push('<path' + (o.fill === 'sheet' ? ' fill="' + SHEET + '"' : '') + ' d="' + qpath(t.poly, true) + '"/>'); return this; };
BP.lines = function (list, o) { o = o || {}; const ds = list.map(P => qpath(this._t(P.map(p => [p[0], p[1], 0]), false, o, o.w == null ? 4 : o.w).poly, true)); this.out.push('<path' + (o.fill === 'sheet' ? ' fill="' + SHEET + '"' : '') + ' d="' + ds.join('') + '"/>'); return this; };
BP.dot = function (x, y, r, o) { return this.shape(S.ell(x, y, r, r * 0.94), Object.assign({ w: 0, fill: 'ink' }, o)); };
BP.union = function (parts, o) { o = o || {}; const w = o.w == null ? 8 : o.w, T = parts.map(P => this._t(orient(P), true, o, w)); T.forEach(t => this.out.push('<path d="' + qpath(t.outer, true) + '"/>')); if (o.fill !== 'ink') T.forEach(t => this.out.push('<path fill="' + SHEET + '" d="' + qpath(t.inner, true) + '"/>')); return this; };
BP.mark = function (id, x, y) { const p = this.tfn ? this.tfn([x, y]) : [x, y]; (this.marks = this.marks || {})[id] = [Math.round(p[0] * 10) / 10, Math.round(p[1] * 10) / 10]; return this; };
BP.stitch = function (P, o) { // Naht mit Kreuzstichen
  o = o || {}; const C = S.spline(P, !!o.closed, P.length > 16 ? 2 : 8), gap = o.gap || 11, len = o.len || 9, rr = this.r(), n = C.length, st = [];
  let acc = 0, next = gap * 0.5;
  for (let i = 1; i <= (o.closed ? n : n - 1); i++) {
    const a = C[i - 1], b = C[i % n], d = dist(a, b); if (d < 1e-6) continue;
    while (acc + d >= next) {
      const t = (next - acc) / d, x = a[0] + (b[0] - a[0]) * t, y = a[1] + (b[1] - a[1]) * t, ang = (rr() * 2 - 1) * 0.25, c = Math.cos(ang), s = Math.sin(ang);
      const nx0 = (b[1] - a[1]) / d, ny0 = -(b[0] - a[0]) / d, nx = nx0 * c - ny0 * s, ny = nx0 * s + ny0 * c, l = len * (0.85 + rr() * 0.3) / 2;
      st.push([[x - nx * l, y - ny * l], [x + nx * l, y + ny * l]]); next += gap * (0.92 + rr() * 0.16);
    }
    acc += d;
  }
  if (o.closed) this.shape(S.spline(P, true, P.length > 16 ? 2 : 8), { w: o.sw || 3, fill: 'none', step: 7 }); else this.line(P, { w: o.sw || 3, smooth: true, step: 7 });
  this.lines(st, { w: o.w || 3.6, step: 6, wob: 0.4 });
  return this;
};
BP.svg = function (title) { return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400"><title>' + title + '</title><g fill="' + INK + '">' + this.out.join('') + '</g></svg>'; };

const API = { S, Builder, INK, SHEET, D2R, dist };
(typeof globalThis !== 'undefined' ? globalThis : this).CyborgInk = API;
if (typeof module !== 'undefined' && module.exports) module.exports = API;
})();
