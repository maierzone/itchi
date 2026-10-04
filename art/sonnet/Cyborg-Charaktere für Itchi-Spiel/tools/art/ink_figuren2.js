/* ink_figuren2.js · zweite Lieferung: U03 SCOUT, U05 PLANNER, U06 TRANSFORMER, U07 INJECTOR, U08 BATCH,
   E01 SHARD, E02 SCRAPER, E03 BRUTEFORCE, E04 SPAMMER (3 Varianten), N04 WRACK klein, N04b WRACK groß.
   ORCHESTRA: rund, Kreuzstich-Naht. MONOLITH: kantig, schwarz gefüllt, Klammern statt Naht.
   Gruppen wie in ink_figuren.js: #base = Spielform, #detail = abschaltbar. Größe automatisch auf 30 mm (300 Einheiten). */
(function () {
'use strict';
const NODE = typeof module !== 'undefined' && module.exports;
const G = NODE ? require('./ink_gen.js') : globalThis.CyborgInk;
if (NODE) require('./ink_figuren.js');
const { S, Builder, D2R, dist } = G;
const { humanEye, lensEye, grin, ear, fist, rivet, cable, lashes, radial } = G.H;
const ROT = 180 / Math.PI;

/* ---------- neue Bausteine ---------- */
function along(P, gap, closed) {
  const C = S.spline(P, !!closed, P.length > 16 ? 2 : 8), n = C.length, out = []; let acc = 0, next = gap * 0.5;
  for (let i = 1; i <= (closed ? n : n - 1); i++) {
    const a = C[i - 1], b = C[i % n], d = dist(a, b); if (d < 1e-6) continue;
    const tx = (b[0] - a[0]) / d, ty = (b[1] - a[1]) / d;
    while (acc + d >= next) { const t = next - acc; out.push({ x: a[0] + tx * t, y: a[1] + ty * t, tx, ty, nx: ty, ny: -tx }); next += gap; }
    acc += d;
  }
  return out;
}
function staples(B, P, o) { // Klammern: MONOLITH-Naht
  o = o || {}; const q = along(P, o.gap || 12), len = o.len || 11, bars = [], dk = o.dark, fl = dk ? 'sheet' : undefined;
  B.line(P, { w: o.sw || 3, smooth: true, step: 7, fill: fl });
  q.forEach((p, i) => { const j = (((i * 7) % 5) - 2) * 0.05, c = Math.cos(j), s = Math.sin(j), nx = p.nx * c - p.ny * s, ny = p.nx * s + p.ny * c; bars.push([[p.x - nx * len / 2, p.y - ny * len / 2], [p.x + nx * len / 2, p.y + ny * len / 2]]); });
  B.lines(bars, { w: o.w || 4.4, step: 6, wob: 0.3, fill: fl });
  q.forEach(p => [-1, 1].forEach(s => { const x = p.x + p.nx * s * len / 2, y = p.y + p.ny * s * len / 2; if (dk) B.shape(S.ell(x, y, 2.6, 2.6), { w: 0 }); else B.dot(x, y, 2.6); }));
}
function zipper(B, P, o) {
  o = o || {}; const q = along(P, o.gap || 7), L = o.len || 8, t = [];
  B.line(P, { w: 4, smooth: true, step: 7 });
  q.forEach((p, i) => { const s = i % 2 ? 1 : -1; t.push([[p.x + p.nx * s * 1.5, p.y + p.ny * s * 1.5], [p.x + p.nx * s * L, p.y + p.ny * s * L]]); });
  B.lines(t, { w: 3.4, step: 4, wob: 0.2 });
  const a = o.at || P[0]; B.shape(S.rr(a[0] - 8, a[1] - 6, 16, 12, 3), { w: 4.6 }); B.shape(S.caps(a[0], a[1] + 6, a[0] + 2, a[1] + 22, 4), { w: 4 });
}
function spine(B, P, n, r0, r1, w) { // Rückgrat: Wirbelkette entlang einer Kurve
  const C = S.spline(P, false, 8), L = [0]; for (let i = 1; i < C.length; i++) L.push(L[i - 1] + dist(C[i - 1], C[i]));
  const tot = L[L.length - 1];
  for (let k = 0; k < n; k++) {
    const u = (k + 0.5) / n, s = u * tot; let i = 1; while (i < C.length - 1 && L[i] < s) i++;
    const a = C[i - 1], b = C[i], t = (s - L[i - 1]) / ((L[i] - L[i - 1]) || 1), x = a[0] + (b[0] - a[0]) * t, y = a[1] + (b[1] - a[1]) * t, ang = Math.atan2(b[1] - a[1], b[0] - a[0]) * ROT, r = r0 + (r1 - r0) * u;
    B.shape(S.at(S.rr(-r * 0.78, -r, r * 1.56, r * 2, r * 0.5), x, y, ang), { w: w || 3.6 });
    B.shape(S.at(S.caps(0, -r, 0, -r * 1.7, r * 0.26), x, y, ang), { w: 2.6 });
  }
}
function vein(B, P, w) { // Schlauch mit Adern
  cable(B, P, w); const q = along(P, w * 2.4), L = [];
  q.forEach((p, i) => { const s = i % 2 ? 1 : -1, a = 0.75, dx = p.tx * Math.cos(a) + p.nx * s * Math.sin(a), dy = p.ty * Math.cos(a) + p.ny * s * Math.sin(a); L.push([[p.x, p.y], [p.x + dx * w * 0.85, p.y + dy * w * 0.85]]); });
  B.lines(L, { w: 1.6, step: 3, wob: 0.1 });
}
function brain(B, cx, cy, rx, ry) {
  const T = P => P.map(p => [cx + p[0] * rx, cy + p[1] * ry]);
  B.shape(S.spline(T([[-1, 0.1], [-0.8, -0.6], [-0.2, -1], [0.5, -0.9], [1, -0.2], [0.85, 0.6], [0.2, 0.8], [-0.5, 0.85]]), true, 6), { w: 4.4 });
  B.line(T([[-0.55, -0.1], [-0.3, -0.5], [0, -0.1], [0.3, -0.55], [0.6, -0.1]]), { w: 2.6, smooth: true });
  B.line(T([[-0.6, 0.4], [-0.25, 0.1], [0.1, 0.45], [0.45, 0.15]]), { w: 2.6, smooth: true });
  B.line(T([[0, -0.9], [0.05, -0.4], [-0.1, 0.3], [0, 0.8]]), { w: 2.2, smooth: true });
}
function heart(B, cx, cy, s) {
  const T = P => P.map(p => [cx + p[0] * s, cy + p[1] * s, 0]);
  B.shape(S.spline(T([[0, -8], [9, -16], [19, -9], [17, 4], [0, 21], [-17, 4], [-19, -9], [-9, -16]]), true, 6), { w: 4.4 });
  B.line(T([[-4, -14], [-6, -24], [-12, -26]]), { w: 3.6, smooth: true }); B.line(T([[5, -14], [8, -24], [14, -24]]), { w: 3.6, smooth: true });
}
function cogP(cx, cy, R, r, n, rot) {
  const P = [], a0 = (rot || 0) * D2R, d = Math.PI / n, pt = (q, a) => [cx + q * Math.cos(a), cy + q * Math.sin(a), 1];
  for (let i = 0; i < n; i++) { const a = a0 + 2 * Math.PI * i / n; P.push(pt(r, a - d * 0.95), pt(R, a - d * 0.55), pt(R, a + d * 0.55), pt(r, a + d * 0.95)); }
  return P;
}
function gear(B, x, y, R, n, o) {
  o = o || {}; B.shape(cogP(x, y, R, R * 0.8, n || 8, o.rot), o.dark ? { w: o.w || 5, fill: 'ink' } : { w: o.w || 5 });
  B.shape(S.ell(x, y, R * 0.36, R * 0.36), { w: o.dark ? 0 : 3.4 }); if (o.dark) B.dot(x, y, R * 0.14);
}
function hand(B, x, y, rot, s) { // offene Menschenhand, Finger = +x
  const T = P => S.at(P, x, y, rot || 0, s || 1);
  [[[16, -10], [36, -18], [50, -30]], [[20, -1], [42, -4], [57, -14]], [[18, 8], [40, 10], [54, 4]], [[12, 16], [30, 20], [43, 16]]].forEach(p => B.shape(T(S.tube(p, 7, 5.6)), { w: 5.2 }));
  B.shape(T(S.ell(0, 0, 25, 20, -0.15)), { w: 8 });
  B.shape(T(S.tube([[-14, -15], [2, -31], [20, -37]], 7.5, 6)), { w: 5.2 });
}
function pointer(B, x, y, rot, s) { // Hand mit Zeigefinger, Finger = +x
  const T = P => S.at(P, x, y, rot || 0, s || 1);
  B.shape(T(S.tube([[8, -8], [32, -10], [54, -10]], 6.8, 5.4)), { w: 5 });
  [[6, 2, 19], [5, 10, 17], [4, 17, 15]].forEach(c => B.shape(T(S.caps(c[0], c[1], c[2], c[1], 5)), { w: 4.2 }));
  B.shape(T(S.rr(-18, -16, 32, 34, 11)), { w: 6.5 });
  B.shape(T(S.tube([[-8, 10], [8, 22], [22, 18]], 6.4, 5.4)), { w: 4.6 });
}
function foot(B, x, y, rot, s) { // nackter Menschenfuß mit Zehen, Zehen = +x
  const T = P => S.at(P, x, y, rot || 0, s || 1);
  B.shape(T(S.spline([[-12, -12], [12, -14], [30, -8], [44, -2], [48, 10], [44, 22], [30, 28], [-6, 28], [-16, 14]], true, 6)), { w: 7 });
  [[46, -2, 8.2], [52, 9, 7.2], [51, 19, 6.2], [45, 27, 5.2]].forEach(t => B.shape(T(S.ell(t[0], t[1], t[2], t[2] * 0.92)), { w: 4.2 }));
}
function bone(B, a, b, r, w) { // Röhrenknochen mit Gelenkknollen (Vereinigung, ohne Nähte)
  const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy) || 1, nx = -dy / L, ny = dx / L, parts = [S.caps(a[0], a[1], b[0], b[1], r)];
  [a, b].forEach(p => [-1, 1].forEach(sg => parts.push(S.ell(p[0] + nx * sg * r * 0.55, p[1] + ny * sg * r * 0.55, r * 1.2, r * 1.2))));
  B.union(parts, { w: w || 6 });
}
function card(B, x, y, w, h, rot, bits) { // Lochkarte, Ursprung = Mitte
  const T = P => S.at(P, x, y, rot || 0), a = -w / 2, b = -h / 2;
  B.shape(T(S.poly([[a + 9, b], [a + w, b], [a + w, b + h], [a, b + h], [a, b + 9]], 2.5)), { w: 4.6 });
  const cols = Math.max(1, Math.floor((w - 10) / 8)), rows = Math.max(1, Math.floor((h - 18) / 11)); bits = bits || '10110100';
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) if (bits[(r * cols + c) % bits.length] === '1') B.shape(T(S.rr(a + 6 + c * 8, b + 14 + r * 11, 4.6, 6.4, 1)), { w: 0, fill: 'ink' });
}
function coil(B, x, y, deg, len, r, ball) {
  const T = P => S.at(P, x, y, deg);
  B.shape(T(S.rr(-10, -r - 7, 18, 2 * r + 14, 5)), { w: 7 });
  B.shape(T(S.bump(S.caps(0, 0, len, 0, r), 3.4, 12)), { w: 7 });
  B.shape(T(S.ell(len + ball * 0.5, 0, ball, ball)), { w: 6, fill: 'ink' });
  B.shape(T(S.star(len + ball * 0.5, 0, ball * 0.75, ball * 0.2)), { w: 0 });
}
function coilDetail(B, x, y, deg, len, r) {
  const T = P => S.at(P, x, y, deg), L = [];
  for (let u = 14; u < len - 2; u += 12) L.push(T([[u - 4, -r + 3], [u + 4, r - 3]]));
  B.lines(L, { w: 3, step: 5, wob: 0.3 });
}
function treads(B, x, y, w, h, n, wx0, wdx, o) {
  o = o || {}; const R = S.rr(x, y, w, h, o.r == null ? h / 2 : o.r), wy = y + h / 2, wr = h * 0.24, sh = o.flat ? R : S.bump(R, 3.2, 23);
  B.shape(sh, o.dark ? { w: 12.5, fill: 'ink' } : { w: 12.5 });
  for (let i = 0; i < n; i++) {
    const cx = wx0 + i * wdx;
    if (o.dark) { B.shape(S.ell(cx, wy, wr, wr), { w: 0 }); B.dot(cx, wy, wr * 0.34); } else { B.shape(S.ell(cx, wy, wr, wr), { w: 6 }); B.dot(cx, wy, wr * 0.28); }
  }
}
function treadDetail(B, x, y, w, h, n, wx0, wdx, dark) {
  const tk = []; for (let u = x + 20; u <= x + w - 20; u += 17) tk.push([[u, y + h - 14], [u, y + h - 7]]);
  B.lines(tk, { w: 3.4, step: 5, wob: 0.3, fill: dark ? 'sheet' : undefined });
  for (let i = 0; i < n; i++) radial(B, wx0 + i * wdx, y + h / 2, h * 0.07, h * 0.15, 3, 2.6, 0.5);
}
function hatch(B, P, ang, gap, o) { // Schraffur, auf ein Polygon begrenzt
  o = o || {}; const a = ang * D2R, dx = Math.cos(a), dy = Math.sin(a), nx = -dy, ny = dx, ins = o.inset == null ? 4 : o.inset; let mn = 1e9, mx = -1e9;
  P.forEach(p => { const t = p[0] * nx + p[1] * ny; if (t < mn) mn = t; if (t > mx) mx = t; });
  const L = [];
  for (let t = mn + gap * 0.5 + (o.phase || 0); t < mx; t += gap) {
    const xs = [];
    for (let i = 0; i < P.length; i++) {
      const A = P[i], C = P[(i + 1) % P.length], ta = A[0] * nx + A[1] * ny, tc = C[0] * nx + C[1] * ny;
      if ((ta <= t && tc > t) || (tc <= t && ta > t)) { const u = (t - ta) / (tc - ta); xs.push((A[0] + (C[0] - A[0]) * u) * dx + (A[1] + (C[1] - A[1]) * u) * dy); }
    }
    xs.sort((p, q) => p - q);
    for (let k = 0; k + 1 < xs.length; k += 2) { const s0 = xs[k] + ins, s1 = xs[k + 1] - ins; if (s1 - s0 > (o.min || 6)) L.push([[nx * t + dx * s0, ny * t + dy * s0], [nx * t + dx * s1, ny * t + dy * s1]]); }
  }
  if (L.length) B.lines(L, { w: o.w || 3, step: o.step || 7, wob: o.wob == null ? 0.5 : o.wob, fill: o.fill });
}
function slitEye(B, cx, cy, hw, hh, rot) { // MONOLITH-Auge: schwarzer Schlitz mit hellem Spalt
  const r = (rot || 0) * D2R;
  B.shape(S.almond(cx, cy, hw, hh, r), { w: 7, fill: 'ink' });
  B.shape(S.almond(cx, cy + hh * 0.05, hw * 0.74, hh * 0.38, r), { w: 0 });
  B.shape(S.ell(cx, cy + hh * 0.05, hw * 0.07, hh * 0.3), { w: 0, fill: 'ink' });
}
function goatEye(B, cx, cy, hw, hh, o) { // Menschenauge mit waagerechter Schlitzpupille
  o = o || {}; const rot = (o.rot || 0) * D2R, lx = o.lx || 0, ly = o.ly || 0, ir = hh * 0.9;
  B.shape(S.almond(cx, cy, hw, hh, rot), { w: 6.5 });
  B.shape(S.ell(cx + lx, cy + ly, ir * 1.25, ir), { w: 4.6 });
  B.shape(S.ell(cx + lx, cy + ly, ir * 0.9, ir * 0.24), { w: 0, fill: 'ink' });
  B.line(S.lid(cx, cy, hw, hh, rot), { w: 9 });
}
function rivetD(B, x, y, r) { B.shape(S.ell(x, y, r, r), { w: 0 }); B.dot(x, y, r * 0.38); }
function wingPts(Sh, tips, Rt, k) { // Fledermausflügel: Spitzen und Bogenkanten
  const P = [[Sh[0], Sh[1], 0], [tips[0][0], tips[0][1], 1]];
  for (let i = 0; i < tips.length - 1; i++) {
    const a = tips[i], b = tips[i + 1], m = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2], c = [m[0] + (Sh[0] - m[0]) * k, m[1] + (Sh[1] - m[1]) * k];
    for (let j = 1; j < 7; j++) { const t = j / 7, u = 1 - t; P.push([u * u * a[0] + 2 * u * t * c[0] + t * t * b[0], u * u * a[1] + 2 * u * t * c[1] + t * t * b[1], 0]); }
    P.push([b[0], b[1], 1]);
  }
  P.push([Rt[0], Rt[1], 0]); return P;
}

/* ---------- U03 SCOUT · neugierig ---------- */
function scout(B, D) {
  const mk = (n, x, y) => { if (D) B.mark(n, x, y); };
  const ant = [[196, 106], [178, 70], [146, 48], [112, 42]];
  B.g('base');
  B.g('antenne'); B.line(ant, { w: 6, smooth: true }); B.shape(S.star(100, 40, 24, 7), { w: 0, fill: 'ink' }); B.e();
  B.g('legs');
  B.shape(S.tube([[184, 268], [158, 296], [126, 312]], 12, 11), { w: 8 }); foot(B, 120, 312, 28, 0.85);
  B.shape(S.tube([[202, 268], [238, 296], [244, 318]], 12, 11), { w: 8 }); foot(B, 240, 320, 0, 0.85);
  gear(B, 158, 296, 14, 8); gear(B, 240, 296, 14, 8);
  B.e();
  B.g('arm-hinten'); B.shape(S.tube([[204, 210], [172, 230], [150, 214]], 9, 8.5), { w: 7 }); fist(B, 142, 206, 20, 0.7); B.e();
  B.g('torso');
  B.shape(S.tube([[190, 272], [198, 236], [210, 198]], 25, 22), { w: 11 });
  B.shape(S.ell(192, 270, 23, 16), { w: 8 });
  B.e();
  B.g('kopf');
  B.shape(S.tube([[209, 204], [212, 178]], 9, 9), { w: 6 });
  ear(B, 176, 146, 22);
  B.shape(S.rr(172, 102, 86, 78, 26), { w: 12 });
  B.line([[184, 126], [206, 116], [230, 122]], { w: 9 });
  humanEye(B, 208, 146, 19, 15, { lx: 5, ly: -1 });
  B.shape(S.ell(212, 168, 10, 8.5), { w: 5, fill: 'ink' });
  B.shape(S.rr(206, 160, 6, 6, 1.5), { w: 2.4 }); B.shape(S.rr(213, 160, 6, 6, 1.5), { w: 2.4 });
  B.e();
  B.g('fernrohr');
  B.shape(S.rr(252, 120, 36, 40, 10), { w: 9 });
  B.shape(S.rr(284, 125, 30, 30, 8), { w: 8 });
  B.shape(S.rr(310, 129, 22, 22, 6), { w: 7 });
  B.shape(S.ell(356, 140, 38, 38), { w: 10 });
  humanEye(B, 356, 140, 28, 22, { lx: 6, ly: -2 });
  B.line([[322, 98], [344, 90], [372, 98]], { w: 9 });
  B.e();
  B.g('arm-vorn'); B.shape(S.tube([[218, 208], [248, 228], [272, 222]], 9, 8.5), { w: 7 }); pointer(B, 292, 214, -18, 0.9); B.e();
  B.e();
  if (!D) return;
  B.g('detail');
  B.stitch([[250, 118], [255, 140], [250, 162]], { gap: 8.5, len: 8, sw: 2.6, w: 3.2 });
  rivet(B, 182, 114, 4.2); rivet(B, 246, 112, 4.2); rivet(B, 182, 172, 4.2);
  vein(B, [[338, 104], [312, 96], [282, 100], [252, 108]], 8);
  spine(B, ant, 8, 8.5, 4.2);
  lashes(B, 356, 140, 28, 22, 0, [2, 4, 6], 10); radial(B, 362, 138, 8, 14, 8, 2, 0.3);
  lashes(B, 208, 146, 19, 15, 0, [2, 4, 6], 8); radial(B, 213, 145, 5.5, 11, 6, 1.9, 0.3);
  B.shape(S.ell(207, 236, 15, 15), { w: 7 }); heart(B, 207, 237, 0.5);
  B.lines([[[120, 322], [124, 330]], [[132, 326], [136, 334]]], { w: 3, step: 4 });
  mk(1, 356, 140); mk(2, 146, 48); mk(3, 207, 236); mk(4, 158, 296); mk(5, 252, 140); mk(6, 246, 334);
  B.e();
}

/* ---------- U05 PLANNER · bedächtig ---------- */
function planner(B, D) {
  const mk = (n, x, y) => { if (D) B.mark(n, x, y); };
  const CB = P => S.at(P, 128, 254, -9);
  B.g('base');
  B.g('legs');
  B.shape(S.tube([[176, 292], [172, 318], [170, 334]], 13, 12), { w: 9 }); B.shape(S.rr(146, 328, 58, 22, 11), { w: 9 });
  B.shape(S.tube([[226, 292], [232, 318], [236, 334]], 13, 12), { w: 9 }); B.shape(S.rr(214, 328, 62, 22, 11), { w: 9 });
  B.e();
  B.g('torso');
  B.shape(S.rr(144, 204, 116, 94, 34), { w: 11.5 });
  B.line([[152, 276], [252, 276]], { w: 6.5 });
  B.e();
  B.g('kopf');
  ear(B, 150, 146, 24);
  B.shape(S.rr(150, 96, 106, 96, 28), { w: 12 });
  B.line([[168, 138], [188, 128], [208, 134]], { w: 9 });
  B.line([[224, 130], [242, 134], [254, 146]], { w: 9 });
  humanEye(B, 190, 158, 20, 15, { lx: 6, ly: -5 });
  B.shape(S.ell(232, 158, 16, 16), { w: 8 }); B.shape(S.ell(232, 158, 9.5, 9.5), { w: 4 });
  B.lines([[[232, 148], [232, 168]], [[222, 158], [242, 158]]], { w: 2.8, step: 5 });
  B.line([[196, 182], [212, 186], [230, 182]], { w: 6, smooth: true });
  B.shape(S.rr(156, 56, 94, 56, [34, 34, 8, 8]), { w: 10 });
  B.shape(S.rr(148, 100, 110, 22, 6), { w: 8, fill: 'ink' });
  B.shape(S.star(204, 111, 13, 3.8), { w: 0 });
  B.shape(S.poly([[242, 104], [298, 108], [294, 126], [244, 124]], 6), { w: 8 });
  B.e();
  B.g('klemmbrett');
  B.shape(S.tube([[156, 228], [152, 246], [164, 258]], 9, 8.5), { w: 7 });
  B.shape(CB(S.rr(-34, -48, 68, 96, 7)), { w: 9 });
  B.shape(CB(S.rr(-24, -38, 48, 76, 3)), { w: 4 });
  B.shape(CB(S.rr(-14, -56, 28, 16, 4)), { w: 6, fill: 'ink' });
  fist(B, 168, 258, 0, 0.8);
  B.e();
  B.g('zirkel');
  B.shape(S.tube([[252, 226], [280, 246], [302, 240]], 9, 8.5), { w: 7 });
  B.shape(S.tube([[306, 264], [294, 300], [282, 336]], 5.5, 3.5), { w: 4.6 });
  B.shape(S.tube([[306, 264], [318, 300], [330, 332]], 5.5, 4), { w: 4.6 });
  B.line([[306, 196], [306, 262]], { w: 7 });
  B.shape(S.ell(306, 190, 9, 9), { w: 5 });
  B.shape(S.ell(306, 264, 9, 9), { w: 5 }); B.dot(306, 264, 2.6);
  fist(B, 306, 236, 0, 0.8);
  B.e();
  B.e();
  if (!D) return;
  B.g('detail');
  brain(B, 203, 82, 36, 16);
  B.stitch(S.rr(160, 134, 86, 52, 18), { closed: true, gap: 10.5, len: 9 });
  rivet(B, 160, 220, 4.4); rivet(B, 244, 220, 4.4); rivet(B, 160, 288, 4.4); rivet(B, 244, 288, 4.4);
  B.shape(S.ell(202, 248, 20, 20), { w: 7 }); heart(B, 202, 249, 0.62);
  for (let i = 0; i < 6; i++) { const a = i * Math.PI / 3 + 0.3; B.shape(S.ell(202 + 27 * Math.cos(a), 248 + 27 * Math.sin(a), 2.6, 2.6), { w: 0 }); }
  [-24, 0, 24].forEach((y, i) => { B.shape(CB(S.rr(-18, y - 6, 12, 12, 2)), i < 2 ? { w: 3, fill: 'ink' } : { w: 3 }); B.line(CB([[-2, y], [18, y]]), { w: 3.4 }); });
  lashes(B, 190, 158, 20, 15, 0, [2, 4, 6], 8); radial(B, 195, 157, 6, 11.5, 6, 2, 0.3);
  B.lines([[[283, 336], [289, 342]], [[322, 334], [328, 340]]], { w: 3, step: 4 });
  mk(1, 203, 82); mk(2, 232, 158); mk(3, 128, 254); mk(4, 306, 300); mk(5, 202, 248); mk(6, 152, 146);
  B.e();
}

/* ---------- U06 TRANSFORMER · aufmerksam ---------- */
function transformer(B, D) {
  const mk = (n, x, y) => { if (D) B.mark(n, x, y); };
  B.g('base');
  B.g('tread'); treads(B, 70, 300, 250, 54, 6, 100, 42); B.e();
  B.g('spulen'); coil(B, 296, 262, -16, 68, 15, 10); coil(B, 296, 292, 5, 52, 12, 8); B.e();
  B.g('rumpf');
  B.shape(S.rr(92, 236, 214, 74, 18), { w: 12 });
  B.shape(S.rr(112, 286, 174, 12, 5), { w: 6, fill: 'ink' });
  B.e();
  B.g('koepfe');
  ear(B, 98, 198, 17);
  B.shape(S.tube([[125, 226], [125, 242]], 11, 11), { w: 7 }); B.shape(S.rr(98, 168, 58, 62, 18), { w: 10 });
  B.line(S.spline([[108, 196], [126, 207], [144, 196]], false, 5), { w: 8 });
  B.shape(S.ell(126, 217, 6, 5), { w: 3, fill: 'ink' });
  B.shape(S.tube([[177, 212], [177, 242]], 12, 12), { w: 7 }); B.shape(S.rr(142, 140, 70, 74, 20), { w: 10 });
  lensEye(B, 178, 174, 17);
  B.line([[154, 154], [176, 148], [198, 156]], { w: 8 });
  B.shape(S.tube([[238, 198], [238, 242]], 13, 13), { w: 7 }); B.shape(S.rr(200, 120, 76, 80, 22), { w: 10 });
  humanEye(B, 238, 154, 24, 18, { lx: 5, ly: 1 });
  B.line([[212, 132], [236, 122], [264, 130]], { w: 9 });
  B.shape(S.tube([[295, 226], [295, 244]], 14, 14), { w: 7 }); B.shape(S.rr(256, 142, 78, 86, 24), { w: 10 });
  humanEye(B, 283, 172, 17, 13, { lx: 4, ly: 1 }); lensEye(B, 318, 172, 13);
  B.line([[266, 154], [284, 148], [300, 154]], { w: 8 }); B.line([[308, 152], [322, 148], [332, 154]], { w: 8 });
  grin(B, 274, 198, 50, 24, { n: 4, lowerN: 3, depth: 0.6 });
  B.e();
  B.e();
  if (!D) return;
  B.g('detail');
  vein(B, [[126, 168], [150, 112], [214, 94], [240, 120]], 10);
  vein(B, [[178, 140], [206, 88], [268, 88], [296, 144]], 10);
  [[125, 232, 12], [177, 232, 14], [238, 232, 15], [295, 234, 16]].forEach(n => B.stitch(S.ell(n[0], n[1], n[2], 6), { closed: true, gap: 8, len: 7, sw: 2.2, w: 2.8 }));
  rivet(B, 106, 250, 4.4); rivet(B, 292, 250, 4.4); rivet(B, 106, 296, 4.4); rivet(B, 290, 296, 4.4);
  coilDetail(B, 296, 262, -16, 68, 15); coilDetail(B, 296, 292, 5, 52, 12);
  treadDetail(B, 70, 300, 250, 54, 6, 100, 42);
  lashes(B, 238, 154, 24, 18, 0, [2, 4, 6], 9); radial(B, 243, 155, 6.6, 13, 6, 2, 0.3);
  lashes(B, 283, 172, 17, 13, 0, [2, 4, 6], 7); radial(B, 318, 172, 9, 11.8, 8, 2, 0.2); radial(B, 178, 174, 9.6, 12.6, 8, 2, 0.2);
  lashes(B, 126, 196, 18, 8, 180, [2, 4, 6], 6);
  mk(1, 283, 172); mk(2, 238, 154); mk(3, 126, 205); mk(4, 214, 94); mk(5, 332, 253); mk(6, 238, 232);
  B.e();
}

/* ---------- U07 INJECTOR · hinterhältig ---------- */
function injector(B, D) {
  const mk = (n, x, y) => { if (D) B.mark(n, x, y); };
  const SY = P => S.at(P, 136, 296, -27), sp = (u, v) => SY([[u, v, 0]])[0], gr = -27 + 90;
  const bracePts = sg => [[4, -14], [-1, -12], [-1, -3], [-6, 0], [-1, 3], [-1, 12], [4, 14]].map(p => [sg * p[0] + (sg < 0 ? -5 : -23) * (sg < 0 ? 1 : 1) * 0, p[1], 0]);
  B.g('base');
  B.g('beutel');
  B.shape(S.rr(92, 196, 48, 74, 16), { w: 10 });
  B.shape(S.rr(98, 232, 36, 32, 9), { w: 0, fill: 'ink' });
  B.shape(S.caps(116, 270, 116, 284, 6.5), { w: 6 });
  B.e();
  B.g('legs');
  B.shape(S.tube([[190, 288], [168, 312], [150, 330]], 12, 11), { w: 9 }); B.shape(S.rr(124, 328, 56, 22, 11), { w: 9 });
  B.shape(S.tube([[224, 288], [250, 310], [262, 330]], 12, 11), { w: 9 }); B.shape(S.rr(240, 328, 60, 22, 11), { w: 9 });
  B.e();
  B.g('torso');
  B.shape(S.poly([[170, 206], [252, 200], [244, 292], [180, 298]], 24), { w: 11.5 });
  B.line([[184, 280], [240, 276]], { w: 6 });
  B.e();
  B.g('kopf');
  B.push(8, 222, 146);
  ear(B, 178, 142, 20);
  B.shape(S.rr(178, 98, 92, 96, 26), { w: 12 });
  B.line([[190, 124], [208, 130], [226, 138]], { w: 9 });
  B.line([[240, 128], [256, 114], [270, 118]], { w: 9 });
  humanEye(B, 210, 148, 19, 12, { lx: 4, ly: 2 });
  lensEye(B, 250, 148, 14);
  grin(B, 198, 166, 66, 26, { n: 5, lowerN: 3, depth: 0.55, tongue: true });
  mk(4, 230, 178);
  B.pop();
  B.e();
  B.g('arme');
  B.shape(S.tube([[178, 216], [150, 240], [162, 274]], 9, 8.5), { w: 7 });
  B.shape(S.tube([[248, 214], [262, 244], [282, 226]], 9, 8.5), { w: 7 });
  B.e();
  B.g('spritze');
  B.shape(SY(S.rr(0, -5.5, 70, 11, 3)), { w: 6 });
  B.shape(SY(S.ell(-12, 0, 22, 22)), { w: 9 });
  B.line(SY(bracePts(1).map(p => [p[0] - 21, p[1]])), { w: 5.5, smooth: true });
  B.line(SY(bracePts(-1).map(p => [p[0] - 3, p[1]])), { w: 5.5, smooth: true });
  B.shape(SY(S.rr(62, -20, 132, 40, 9)), { w: 9 });
  B.shape(SY(S.rr(54, -31, 11, 62, 4)), { w: 6 });
  B.shape(SY(S.rr(66, -4.5, 46, 9, 2)), { w: 0, fill: 'ink' });
  B.shape(SY(S.rr(110, -17, 13, 34, 3)), { w: 0, fill: 'ink' });
  B.shape(SY(S.rr(124, -16, 66, 32, 5)), { w: 0, fill: 'ink' });
  B.shape(SY(S.ell(150, -1, 9.5, 9.5)), { w: 0 }); const ey = sp(152, -1); B.dot(ey[0], ey[1], 4.2);
  B.shape(SY(S.ell(174, -8, 4, 4)), { w: 0 }); B.shape(SY(S.ell(181, 8, 3, 3)), { w: 0 });
  B.shape(SY(S.poly([[192, -11], [212, -5], [212, 5], [192, 11]], 3)), { w: 6 });
  B.shape(SY(S.poly([[212, -4.5], [270, 0], [212, 4.5]])), { w: 3, fill: 'ink' });
  B.shape(SY(S.ell(268, 16, 4.5, 6.5)), { w: 3.4 });
  const g1 = sp(170, 0), g2 = sp(34, 0);
  fist(B, g1[0], g1[1], gr, 0.85); fist(B, g2[0], g2[1], gr, 0.85);
  B.e();
  B.e();
  if (!D) return;
  B.g('detail');
  B.stitch(S.rr(184, 120, 80, 56, 16), { closed: true, gap: 10.5, len: 9 });
  rivet(B, 186, 214, 4.4); rivet(B, 240, 210, 4.4); rivet(B, 192, 286, 4.4); rivet(B, 236, 284, 4.4);
  const tk = []; for (let u = 80; u < 190; u += 11) tk.push(SY([[u, -20], [u, (u / 11 | 0) % 2 ? -14 : -11]]));
  B.lines(tk, { w: 2.6, step: 4, wob: 0.2 });
  lashes(B, 210, 148, 19, 12, 0, [2, 4, 6], 7);
  radial(B, 250, 148, 9.6, 12.4, 8, 2, 0.2);
  mk(1, ...sp(-12, 0)); mk(2, ...sp(150, -1)); mk(3, 116, 232); mk(5, ...sp(170, 0)); mk(6, ...sp(268, 16));
  B.e();
}

/* ---------- U08 BATCH · stoisch ---------- */
function batch(B, D) {
  const mk = (n, x, y) => { if (D) B.mark(n, x, y); };
  B.g('base');
  B.g('tread'); treads(B, 64, 306, 240, 48, 5, 104, 42); B.e();
  B.g('block'); B.shape(S.rr(94, 206, 180, 102, 22), { w: 12 }); B.e();
  B.g('lochkarten');
  [-26, -13, 0, 13, 26].forEach((a, i) => { const t = a * D2R; card(B, 118 + 28 * Math.sin(t), 208 - 28 * Math.cos(t), 24, 56, a, ['10110100', '01101011', '11010010', '00111010', '10101101'][i]); });
  B.shape(S.rr(82, 200, 74, 18, 5), { w: 7 });
  B.e();
  B.g('rohr');
  B.shape(S.tube([[206, 246], [352, 146]], 22, 16), { w: 10 });
  B.shape(S.at(S.rr(-5, -24, 14, 48, 5), 352, 146, -34.5), { w: 7, fill: 'ink' });
  gear(B, 226, 248, 26, 10, { w: 8 });
  B.e();
  B.g('gesicht');
  B.line([[104, 226], [128, 230], [152, 238]], { w: 9 });
  humanEye(B, 126, 252, 22, 16, { lx: 3, ly: 3 });
  lensEye(B, 176, 256, 15);
  grin(B, 112, 280, 96, 24, { n: 5, lower: false, depth: 0.5 });
  card(B, 98, 292, 52, 34, 16, '1101');
  B.e();
  B.e();
  if (!D) return;
  B.g('detail');
  const bp = along([[216, 224], [336, 144]], 7), zig = [];
  bp.forEach((p, i) => { const s = i % 2 ? 1 : -1; zig.push([p.x + p.nx * s * 5 - p.nx * 26, p.y + p.ny * s * 5 - p.ny * 26]); });
  B.line(zig, { w: 3.2, corners: true });
  rivet(B, 108, 222, 4.4); rivet(B, 262, 226, 4.4); rivet(B, 110, 296, 3.4); rivet(B, 262, 296, 4.4);
  B.stitch([[96, 236], [92, 262], [98, 286]], { gap: 8.5, len: 8, sw: 2.6, w: 3.2 });
  treadDetail(B, 64, 306, 240, 48, 5, 104, 42);
  lashes(B, 126, 252, 22, 16, 0, [2, 4, 6], 8); radial(B, 129, 255, 6.2, 12, 6, 2, 0.3); radial(B, 176, 256, 9, 12, 8, 2.2, 0.2);
  radial(B, 226, 248, 10, 15, 5, 2.4, 0.4);
  mk(1, 98, 292); mk(2, 126, 252); mk(3, 120, 172); mk(4, 226, 248); mk(5, 280, 194); mk(6, 352, 146);
  B.e();
}

/* ---------- E01 SHARD · eisig ---------- */
function shard(B, D) {
  const mk = (n, x, y) => { if (D) B.mark(n, x, y); };
  const OUT = [[216, 32], [266, 92], [274, 172], [266, 252], [214, 286], [160, 258], [142, 176], [158, 96]];
  const fL = [[158, 96], [186, 65], [178, 267], [160, 258], [142, 176]], fT = [[216, 32], [246, 68], [186, 65]],
    fM = [[186, 65], [246, 68], [246, 265], [178, 267]], fR = [[246, 68], [266, 92], [274, 172], [266, 252], [246, 265]];
  B.g('base');
  B.g('beine');
  bone(B, [188, 262], [146, 304], 6.5); bone(B, [146, 304], [160, 330], 5.6); foot(B, 160, 330, 0, 0.62);
  bone(B, [236, 260], [278, 300], 6.5); bone(B, [278, 300], [262, 330], 5.6); foot(B, 262, 330, 0, 0.62);
  B.e();
  B.g('splitter');
  [[[150, 150], [96, 110], [116, 198]], [[268, 146], [322, 100], [300, 206]], [[264, 222], [310, 236], [262, 266]]].forEach(P => B.shape(S.poly(P), { w: 10, fill: 'ink' }));
  B.line([[104, 118], [118, 186]], { w: 3, fill: 'sheet' }); B.line([[316, 108], [298, 196]], { w: 3, fill: 'sheet' });
  ear(B, 146, 202, 19);
  B.e();
  B.g('kristall');
  B.shape(S.poly(OUT), { w: 12 });
  hatch(B, fL, 66, 9, { w: 3, inset: 3 });
  hatch(B, fT, 20, 10, { w: 3 });
  B.shape(S.poly(fR), { w: 0, fill: 'ink' });
  B.line([[186, 65], [178, 267]], { w: 6, corners: true }); B.line([[246, 68], [246, 265]], { w: 6, corners: true });
  B.line([[256, 108], [264, 176]], { w: 3, fill: 'sheet' }); B.line([[256, 196], [258, 240]], { w: 3, fill: 'sheet' });
  goatEye(B, 213, 140, 30, 12, { rot: -3, lx: 3 });
  grin(B, 184, 192, 60, 40, { n: 4, lowerN: 3, depth: 0.7 });
  B.e();
  B.e();
  if (!D) return;
  B.g('detail');
  staples(B, [[186, 65], [178, 267]], { gap: 14, len: 12 });
  staples(B, [[246, 68], [246, 265]], { gap: 14, len: 12 });
  hatch(B, [[178, 267], [246, 265], [246, 238], [180, 240]], 10, 12, { w: 2.2 });
  rivet(B, 168, 124, 4.2); rivet(B, 156, 226, 4.2); rivet(B, 206, 272, 3.8);
  lashes(B, 213, 140, 30, 12, -3, [2, 4, 6], 8); radial(B, 216, 141, 6, 11, 8, 2, 0.3);
  B.dot(146, 304, 4); B.dot(278, 300, 4);
  mk(1, 213, 140); mk(2, 214, 212); mk(3, 138, 202); mk(4, 146, 304); mk(5, 246, 160); mk(6, 262, 336);
  B.e();
}

/* ---------- E02 SCRAPER · raffgierig ---------- */
function scraper(B, D) {
  const mk = (n, x, y) => { if (D) B.mark(n, x, y); };
  const F = S.rr(124, 172, 146, 136, 8);
  B.g('base');
  B.g('sack');
  B.shape(S.ell(84, 252, 48, 56, -0.1), { w: 11 });
  B.shape(S.poly([[64, 192], [98, 190], [106, 210], [56, 212]], 6), { w: 7 });
  [[76, 178, -12], [94, 174, 10]].forEach(c => B.shape(S.at(S.rr(-9, -9, 18, 18, 3), c[0], c[1], c[2]), { w: 5 }));
  hatch(B, [[126, 216], [134, 258], [114, 298], [76, 308], [96, 284], [116, 252]], 60, 9, { w: 2.8 });
  B.e();
  B.g('tread'); treads(B, 98, 306, 206, 46, 4, 130, 46, { r: 8, flat: true, dark: true }); B.e();
  B.g('block');
  B.shape(S.hull(F, S.sh(F, -24, -16)), { w: 12 });
  hatch(B, [[124, 172], [124, 308], [100, 292], [100, 156]], 70, 11, { w: 2.8 });
  B.shape(F, { w: 11.5, fill: 'ink' });
  B.line([[146, 192], [168, 196], [192, 206]], { w: 9, fill: 'sheet' }); B.line([[254, 192], [232, 196], [210, 206]], { w: 9, fill: 'sheet' });
  humanEye(B, 168, 218, 21, 14, { lx: 5, ly: 1 });
  slitEye(B, 232, 218, 24, 12);
  grin(B, 152, 246, 96, 40, { n: 6, lowerN: 5, depth: 0.8 });
  B.e();
  B.g('harke');
  B.shape(S.tube([[262, 236], [298, 248], [324, 272]], 12, 10), { w: 9 });
  [[330, 300], [343, 303], [356, 302], [368, 298]].forEach((q, i) => B.shape(S.tube([[q[0], q[1]], [q[0] + 4, q[1] + 24], [q[0] + 14 + i, q[1] + 42]], 6, 3.6), { w: 4.6 }));
  B.shape(S.tube([[328, 296], [316, 318], [322, 336]], 6.4, 4), { w: 4.6 });
  B.shape(S.at(S.rr(-24, -15, 48, 30, 11), 348, 290, 8), { w: 8 });
  B.e();
  B.e();
  if (!D) return;
  B.g('detail');
  zipper(B, [[44, 256], [66, 266], [92, 262], [118, 250]], { at: [44, 256] });
  staples(B, [[134, 188], [134, 244], [134, 296]], { gap: 13, len: 11, dark: true });
  [[116, 206], [262, 188], [116, 300]].forEach(p => rivetD(B, p[0], p[1], 4.6));
  [[330, 342], [343, 345], [356, 344], [368, 340]].forEach((q, i) => B.shape(S.poly([[q[0] + 12 + i, q[1]], [q[0] + 17 + i, q[1] + 10], [q[0] + 8 + i, q[1] + 8]], 1), { w: 0, fill: 'ink' }));
  treadDetail(B, 98, 306, 206, 46, 4, 130, 46, true);
  lashes(B, 168, 218, 21, 14, 0, [2, 4, 6], 8); radial(B, 173, 219, 5.5, 10.5, 6, 1.9, 0.3);
  mk(1, 168, 218); mk(2, 348, 300); mk(3, 70, 264); mk(4, 134, 244); mk(5, 200, 268); mk(6, 84, 176);
  B.e();
}

/* ---------- E03 BRUTEFORCE · stur ---------- */
function bruteforce(B, D) {
  const mk = (n, x, y) => { if (D) B.mark(n, x, y); };
  const F = S.rr(100, 152, 196, 152, 10);
  const HD = (cx, cy, rot) => { const T = P => S.at(P, cx, cy, rot); B.shape(T(S.rr(-36, -24, 72, 48, 6)), { w: 9, fill: 'ink' }); [-27, -9, 9, 27].forEach(u => B.shape(T(S.ell(u, 7, 6.5, 6.5)), { w: 0 })); B.line(T([[-30, -14], [30, -14]]), { w: 3, fill: 'sheet' }); };
  B.g('base');
  B.g('tread'); treads(B, 66, 300, 268, 52, 6, 112, 42, { r: 8, flat: true, dark: true }); B.e();
  B.g('hammer');
  B.shape(S.tube([[148, 168], [132, 118], [116, 80]], 10, 9), { w: 8 }); HD(108, 60, -24);
  B.shape(S.tube([[250, 166], [266, 116], [282, 82]], 10, 9), { w: 8 }); HD(290, 60, 20);
  B.e();
  B.g('block');
  B.shape(S.hull(F, S.sh(F, -26, -20)), { w: 12 });
  hatch(B, [[100, 152], [100, 304], [74, 284], [74, 132]], 70, 12, { w: 2.8 });
  B.shape(F, { w: 11.5, fill: 'ink' });
  B.line([[134, 170], [162, 176], [188, 190]], { w: 11, fill: 'sheet' }); B.line([[266, 170], [240, 176], [212, 190]], { w: 11, fill: 'sheet' });
  humanEye(B, 160, 200, 24, 15, { lx: 6, ly: 1 });
  slitEye(B, 240, 200, 28, 13);
  grin(B, 128, 226, 140, 60, { n: 7, lowerN: 6, depth: 0.95 });
  B.e();
  B.g('ramme');
  B.shape(S.rr(288, 246, 62, 30, 8), { w: 9 });
  B.shape(S.spline([[340, 250], [352, 236], [374, 232], [394, 244], [402, 260], [394, 274], [374, 282], [350, 282], [340, 270]], true, 6), { w: 9, fill: 'ink' });
  B.shape(S.tube([[352, 240], [334, 222], [322, 238], [334, 254], [346, 248]], 8, 4.5), { w: 5, fill: 'ink' });
  B.shape(S.almond(372, 254, 12, 5.5, -0.15), { w: 0 });
  B.shape(S.ell(396, 262, 3.4, 3.4), { w: 0 });
  B.e();
  B.e();
  if (!D) return;
  B.g('detail');
  [[116, 168], [280, 168], [116, 290], [282, 290]].forEach(p => rivetD(B, p[0], p[1], 5));
  B.lines([[[298, 246], [298, 276]], [[314, 246], [314, 276]], [[330, 246], [330, 276]]], { w: 4.6, step: 5, wob: 0.3 });
  staples(B, [[100, 250], [100, 272], [100, 298]], { gap: 12, len: 10, dark: true });
  treadDetail(B, 66, 300, 268, 52, 6, 112, 42, true);
  lashes(B, 160, 200, 24, 15, 0, [2, 4, 6], 8); radial(B, 166, 201, 6.5, 12.5, 7, 2, 0.3);
  mk(1, 108, 62); mk(2, 160, 200); mk(3, 240, 200); mk(4, 198, 262); mk(5, 372, 258); mk(6, 116, 168);
  B.e();
}

/* ---------- E04 SPAMMER · aufdringlich (3 Varianten) ---------- */
function spammer(B, D, v) {
  const mk = (n, x, y) => { if (D) B.mark(n, x, y); };
  const tr = v === 2 ? [[344, 168], [376, 222], [352, 268]] : [[346, 128], [384, 182], [362, 240]];
  const tl = v === 3 ? [[84, 190], [56, 226], [76, 262]] : v === 2 ? [[56, 168], [24, 222], [48, 268]] : [[54, 128], [16, 182], [38, 240]];
  const shR = [262, 224], shL = [138, 224];
  B.push(v === 2 ? 5 : -7, 200, 250);
  B.g('base');
  B.g('fluegel');
  B.shape(wingPts(shL, tl, [136, 268], 0.3), { w: 9, fill: 'ink' });
  B.shape(wingPts(shR, tr, [264, 268], 0.3), { w: 9, fill: 'ink' });
  tl.forEach(t => B.line([shL, t], { w: 4.2, fill: 'sheet' })); tr.forEach(t => B.line([shR, t], { w: 4.2, fill: 'sheet' }));
  B.e();
  B.g('umschlag');
  if (v === 2) B.shape(S.poly([[130, 208], [200, 140], [270, 208]], 4), { w: 9 });
  B.shape(S.rr(130, 206, 140, 92, 8), { w: 11 });
  if (v === 2) { grin(B, 148, 214, 104, 50, { n: 5, lowerN: 4, depth: 0.85, tongue: true }); }
  else {
    B.shape(S.poly([[132, 208], [268, 208], [200, 264]], 5), { w: 8 });
    B.shape(S.ell(200, 262, 25, 25), { w: 9, fill: 'ink' });
    if (v === 1) humanEye(B, 200, 262, 19, 13.5, { lx: 2 }); else slitEye(B, 200, 262, 20, 10);
  }
  B.e();
  B.e();
  B.pop();
  if (!D) return;
  B.push(v === 2 ? 5 : -7, 200, 250);
  B.g('detail');
  [[0.45, tl, shL], [0.45, tr, shR]].forEach(w => w[1].forEach(t => { const x = w[2][0] + (t[0] - w[2][0]) * w[0], y = w[2][1] + (t[1] - w[2][1]) * w[0]; B.shape(S.ell(x, y, 5, 5), { w: 3 }); }));
  const ya = v === 2 ? 276 : 284;
  B.lines([[[150, ya], [226, ya]], [[150, ya + 9], [196, ya + 9]]], { w: 3.2, step: 5, wob: 0.3 });
  if (v === 3) staples(B, [[250, 212], [262, 226], [258, 244]], { gap: 11, len: 10 });
  if (v === 1) { lashes(B, 200, 262, 19, 13.5, 0, [2, 4, 6], 6); radial(B, 202, 262, 5.5, 9.5, 6, 1.8, 0.3); }
  rivet(B, 142, 218, 3.6); rivet(B, 258, 218, 3.6);
  mk(1, 200, 262); mk(2, 360, 150); mk(3, 190, 238); mk(4, 160, 284); mk(5, tl[1][0], tl[1][1]); mk(6, 258, 232);
  B.e();
  B.pop();
}

/* ---------- N04 WRACK klein ---------- */
function wrackKlein(B, D) {
  const mk = (n, x, y) => { if (D) B.mark(n, x, y); };
  const TO = [[164, 288], [236, 284], [250, 298], [238, 308], [252, 322], [240, 334], [250, 346], [162, 346], [150, 336], [150, 298]];
  B.g('base');
  B.g('beine');
  B.shape(S.tube([[154, 322], [120, 278], [90, 322]], 12, 11), { w: 8 });
  B.shape(S.rr(62, 326, 56, 24, 12), { w: 8 });
  B.shape(S.at(S.rr(-26, -11, 52, 22, 11), 30, 336, -16), { w: 8 });
  bone(B, [152, 338], [126, 342], 5.4);
  B.e();
  B.g('arm');
  B.shape(S.tube([[200, 292], [212, 248], [202, 216]], 9, 8.5), { w: 7 });
  hand(B, 200, 200, -96, 0.7);
  B.e();
  B.g('rumpf');
  [[[232, 298], [262, 290], [280, 302]], [[234, 316], [266, 312], [286, 326]], [[234, 334], [262, 336], [278, 348]]].forEach(p => B.shape(S.tube(p, 5.5, 4), { w: 5 }));
  B.shape(S.poly(TO), { w: 11.5 });
  B.shape(S.poly([[236, 284], [250, 298], [238, 308], [252, 322], [240, 334], [250, 346], [224, 344], [216, 328], [228, 316], [218, 304], [230, 294]]), { w: 0, fill: 'ink' });
  B.line([[164, 302], [206, 302]], { w: 5 });
  B.e();
  B.g('kopf');
  B.push(78, 332, 318);
  B.shape(S.rr(296, 285, 72, 66, 20), { w: 11 });
  B.line([[306, 303], [322, 295], [340, 301]], { w: 8 });
  B.shape(S.ell(348, 317, 15, 15), { w: 7 }); B.lines([[[340, 309], [356, 325]], [[356, 309], [340, 325]]], { w: 3.4, step: 5 });
  mk(4, 348, 317);
  B.line(S.spline([[310, 317], [320, 325], [330, 317]], false, 5), { w: 7 });
  B.shape(S.spline([[314, 337], [326, 333], [340, 337], [338, 345], [326, 348], [316, 344]], true, 5), { w: 5, fill: 'ink' });
  B.shape(S.rr(325, 341, 12, 14, 5), { w: 3.6 });
  B.line([[318, 287], [326, 303], [318, 315], [332, 331]], { w: 4, corners: true });
  B.pop();
  B.e();
  B.e();
  if (!D) return;
  B.g('detail');
  B.push(78, 332, 318);
  staples(B, [[318, 287], [326, 303], [318, 315], [332, 331]], { gap: 11, len: 10 });
  B.pop();
  B.shape(S.ell(290, 290, 11, 11), { w: 5 }); B.shape(S.ell(293, 290, 5.5, 5.5), { w: 3 }); B.dot(293, 290, 2.6);
  cable(B, [[252, 322], [272, 306], [284, 296]], 7);
  B.lines([[[246, 280], [252, 270]], [[256, 284], [264, 278]], [[28, 322], [34, 312]], [[44, 318], [52, 310]]], { w: 3.2, step: 4 });
  rivet(B, 166, 298, 4); rivet(B, 166, 338, 4);
  mk(1, 200, 192); mk(2, 290, 290); mk(3, 268, 316); mk(5, 126, 342); mk(6, 30, 336);
  B.e();
}

/* ---------- N04b WRACK groß ---------- */
function wrackGross(B, D) {
  const mk = (n, x, y) => { if (D) B.mark(n, x, y); };
  const L = [[96, 222], [168, 216], [160, 240], [176, 258], [158, 282], [170, 298], [96, 298]], R = [[190, 218], [284, 224], [290, 298], [184, 298], [196, 278], [180, 258], [192, 238]];
  B.g('base');
  B.push(-11, 190, 340);
  B.g('kette');
  treads(B, 66, 296, 250, 52, 3, 130, 56);
  B.shape(S.ell(242, 322, 12, 12), { w: 5, fill: 'none', step: 6 });
  B.e();
  B.g('rumpf');
  B.shape(S.poly([[168, 216], [190, 218], [192, 238], [180, 258], [196, 278], [184, 298], [170, 298], [158, 282], [176, 258], [160, 240]]), { w: 0, fill: 'ink' });
  [[[170, 232], [208, 224], [236, 238]], [[170, 256], [206, 250], [240, 264]], [[172, 280], [204, 278], [236, 290]]].forEach(p => B.shape(S.tube(p, 5, 3.6), { w: 4.4 }));
  B.shape(S.poly(L), { w: 11 }); B.shape(S.poly(R), { w: 11 });
  hatch(B, [[96, 262], [160, 266], [170, 298], [96, 298]], 70, 9, { w: 2.8 }); hatch(B, [[188, 268], [288, 262], [290, 298], [184, 298]], 70, 9, { w: 2.8 });
  hand(B, 178, 258, 8, 0.72);
  B.e();
  B.pop();
  B.g('kopf');
  B.push(-64, 340, 312);
  B.shape(S.rr(306, 280, 68, 60, 18), { w: 10 });
  B.line([[316, 296], [332, 288], [350, 294]], { w: 8 });
  B.shape(S.ell(356, 312, 14, 14), { w: 7 }); B.lines([[[348, 304], [364, 320]], [[364, 304], [348, 320]]], { w: 3.4, step: 5 });
  B.line(S.spline([[320, 312], [330, 320], [340, 312]], false, 5), { w: 7 });
  B.line([[326, 282], [334, 298], [326, 310], [340, 326]], { w: 4, corners: true });
  B.pop();
  B.e();
  B.e();
  if (!D) return;
  B.g('detail');
  B.push(-11, 190, 340);
  staples(B, [[168, 216], [160, 240], [176, 258], [158, 282], [170, 298]], { gap: 11, len: 10, dark: true });
  rivet(B, 106, 232, 4.4); rivet(B, 274, 234, 4.4); rivet(B, 106, 288, 4.4); rivet(B, 276, 288, 4.4);
  treadDetail(B, 66, 296, 250, 52, 3, 130, 56);
  B.pop();
  const lk = along([[322, 340], [346, 348], [372, 342], [394, 346]], 15);
  lk.forEach(p => B.shape(S.at(S.rr(-8, -5, 16, 10, 2.5), p.x, p.y, Math.atan2(p.ty, p.tx) * ROT), { w: 3.6 }));
  gear(B, 52, 346, 13, 8, { w: 4 });
  mk(1, 184, 252); mk(2, 340, 312); mk(3, 160, 260); mk(4, 372, 342); mk(5, 52, 346); mk(6, 128, 316);
  B.e();
}

const FIG2 = {
  scout: { id: 'U03', slug: 'scout', title: 'SCOUT', fn: scout, seed: 103 },
  planner: { id: 'U05', slug: 'planner', title: 'PLANNER', fn: planner, seed: 105 },
  transformer: { id: 'U06', slug: 'transformer', title: 'TRANSFORMER', fn: transformer, seed: 106 },
  injector: { id: 'U07', slug: 'injector', title: 'INJECTOR', fn: injector, seed: 107 },
  batch: { id: 'U08', slug: 'batch', title: 'BATCH', fn: batch, seed: 108 },
  shard: { id: 'E01', slug: 'shard', title: 'SHARD', fn: shard, seed: 201 },
  scraper: { id: 'E02', slug: 'scraper', title: 'SCRAPER', fn: scraper, seed: 202 },
  bruteforce: { id: 'E03', slug: 'bruteforce', title: 'BRUTEFORCE', fn: bruteforce, seed: 203 },
  spammer1: { id: 'E04', slug: 'spammer_v1', title: 'SPAMMER V1', fn: (B, D) => spammer(B, D, 1), seed: 2041 },
  spammer2: { id: 'E04', slug: 'spammer_v2', title: 'SPAMMER V2', fn: (B, D) => spammer(B, D, 2), seed: 2042 },
  spammer3: { id: 'E04', slug: 'spammer_v3', title: 'SPAMMER V3', fn: (B, D) => spammer(B, D, 3), seed: 2043 },
  wrack: { id: 'N04', slug: 'wrack_klein', title: 'WRACK klein', fn: wrackKlein, seed: 301 },
  wrackgross: { id: 'N04b', slug: 'wrack_gross', title: 'WRACK groß', fn: wrackGross, seed: 302 }
};
function bboxOf(svg) {
  let x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9, m; const re = / d="([^"]*)"/g;
  while ((m = re.exec(svg))) { const n = m[1].match(/-?\d+(?:\.\d+)?/g) || []; for (let i = 0; i + 1 < n.length; i += 2) { const x = +n[i], y = +n[i + 1]; if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; } }
  return { x0, y0, x1, y1 };
}
const fitCache = {};
function buildFig(name, frame, detail) {
  const f = FIG2[name], b = frame === 'b', mkB = fit => new Builder(f.seed * 7919 + (b ? 77777 : 0), { fit, vj: b ? 1.5 : 0.5, wob: b ? 2.1 : 1.8 });
  if (!fitCache[name]) {
    const B0 = new Builder(f.seed * 7919, { fit: null, vj: 0.5, wob: 1.8 }); f.fn(B0, true);
    const bb = bboxOf(B0.svg('t')), w0 = bb.x1 - bb.x0, h0 = bb.y1 - bb.y0, s = Math.min((f.W || 300) / w0, (f.H || 298) / h0, 1.5);
    fitCache[name] = { s, cx: 200, cy: 352, dx: -((bb.x0 + bb.x1) / 2 - 200) * s, dy: -3 - (bb.y1 - 352) * s };
  }
  const B = mkB(fitCache[name]); f.fn(B, !!detail);
  return { svg: B.svg(f.id + ' ' + f.title + ' (Frame ' + frame.toUpperCase() + ')'), marks: B.marks || {} };
}
G.FIG2 = FIG2; G.buildFig = buildFig; G.fitCache = fitCache;
})();
