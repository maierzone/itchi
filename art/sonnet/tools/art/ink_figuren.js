/* ink_figuren.js · drei Cyborg-Agenten (ORCHESTRA): CRAWLER U01, CRITIC U04, EXECUTOR U02.
   Maschine mit menschlichen Zügen (Auge, Mund, Ohr, Hand), Naht = Kreuzstiche.
   Gruppen: #base = Spielform, #detail = abschaltbare Detail-Ebene (Nähte, Nieten, Kabel). */
(function () {
'use strict';
const G = (typeof module !== 'undefined' && module.exports) ? require('./ink_gen.js') : globalThis.CyborgInk;
const { S, Builder, D2R } = G;

/* ---------- Bausteine ---------- */
function humanEye(B, cx, cy, hw, hh, o) {
  o = o || {}; const rot = (o.rot || 0) * D2R, lx = o.lx || 0, ly = o.ly || 0, ir = hh * 0.86;
  B.shape(S.almond(cx, cy, hw, hh, rot), { w: 6.5 });
  B.shape(S.ell(cx + lx, cy + ly, ir, ir), { w: 4.6 });
  B.shape(S.ell(cx + lx * 1.15, cy + ly, ir * 0.47, ir * 0.47), { w: 0, fill: 'ink' });
  B.shape(S.ell(cx + lx - ir * 0.3, cy + ly - ir * 0.32, ir * 0.15, ir * 0.15), { w: 0 });
  B.line(S.lid(cx, cy, hw, hh, rot), { w: 9 });
}
function lensEye(B, cx, cy, r) {
  B.shape(S.ell(cx, cy, r, r), { w: 8 });
  B.shape(S.ell(cx, cy, r * 0.6, r * 0.6), { w: 4.4 });
  B.shape(S.star(cx, cy, r * 0.52, r * 0.12), { w: 0, fill: 'ink' });
}
function grin(B, x, y, w, h, o) {
  o = o || {}; const k = o.depth == null ? 0.7 : o.depth, yb = y + h * (0.5 + k * 0.5);
  B.shape(S.spline([[x, y + h * 0.1], [x + w * 0.25, y + h * 0.01], [x + w * 0.5, y], [x + w * 0.75, y + h * 0.01], [x + w, y + h * 0.1], [x + w * 0.92, y + h * 0.6], [x + w * 0.5, yb], [x + w * 0.08, y + h * 0.6]], true, 5), { w: 8, fill: 'ink' });
  const n = o.n || 5, tw = w * 0.84 / n, th = h * 0.34;
  for (let i = 0; i < n; i++) B.shape(S.rr(x + w * 0.08 + i * tw + 0.8, y + 3.5, tw - 1.6, th, 2.6), { w: 3.2 });
  if (o.lower !== false) { const m = o.lowerN || 4, lw = w * 0.52 / m, ly = yb - h * 0.34; for (let i = 0; i < m; i++) B.shape(S.rr(x + w * 0.24 + i * lw + 0.8, ly, lw - 1.6, h * 0.22, 2.2), { w: 2.8 }); }
  if (o.tongue) B.shape(S.ell(x + w * 0.5, yb - h * 0.27, w * 0.15, h * 0.11), { w: 3.4 });
}
function ear(B, cx, cy, s, flip) {
  const f = flip ? -1 : 1, T = P => P.map(p => [cx + p[0] * s * f, cy + p[1] * s]);
  B.shape(S.spline(T([[0.3, -0.95], [-0.3, -1.1], [-0.85, -0.6], [-1.0, 0.1], [-0.7, 0.85], [-0.1, 1.1], [0.3, 0.75], [0.25, 0]]), true, 6), { w: 6.5 });
  B.line(T([[-0.12, -0.55], [-0.55, -0.35], [-0.62, 0.2], [-0.32, 0.62]]), { w: 4.2, smooth: true });
}
function fist(B, x, y, rot, s) { // Faust um einen Schaft (Schaft = lokale y-Achse, Finger vorn = +x)
  const T = P => S.at(P, x, y, rot, s);
  [-12.5, -4.2, 4.2, 12.5].forEach(yy => B.shape(T(S.caps(2, yy, 18, yy, 4.6)), { w: 4.4 }));
  B.shape(T(S.rr(-15, -17, 26, 34, 10)), { w: 6.5 });
  B.shape(T(S.caps(-9, -15, 8, -21, 4.8)), { w: 4.4 });
}
function rivet(B, x, y, r) { B.shape(S.ell(x, y, r, r), { w: 2.8 }); B.dot(x, y, r * 0.34); }
function cable(B, pts, w) { B.line(pts, { w: w, smooth: true }); B.line(pts, { w: w * 0.36, smooth: true, fill: 'sheet' }); }
function lashes(B, cx, cy, hw, hh, rot, idx, len) {
  const P = S.lid(cx, cy, hw, hh, (rot || 0) * D2R), L = [];
  idx.forEach(i => { const a = P[i - 1], b = P[i + 1], p = P[i], tx = b[0] - a[0], ty = b[1] - a[1], l = Math.hypot(tx, ty) || 1, nx = ty / l, ny = -tx / l; L.push([[p[0] + nx * 3.5, p[1] + ny * 3.5], [p[0] + nx * (3.5 + len) - tx / l * 3, p[1] + ny * (3.5 + len) - ty / l * 3]]); });
  B.lines(L, { w: 2.8, step: 5, wob: 0.3 });
}
function radial(B, cx, cy, r0, r1, n, w, a0) { const L = []; for (let i = 0; i < n; i++) { const a = (a0 || 0) + 2 * Math.PI * i / n; L.push([[cx + r0 * Math.cos(a), cy + r0 * Math.sin(a)], [cx + r1 * Math.cos(a), cy + r1 * Math.sin(a)]]); } B.lines(L, { w: w, step: 4, wob: 0.2 }); }

/* ---------- U01 CRAWLER · gierig ---------- */
function crawler(B, D) {
  B.g('base');
  B.g('tank');
  B.shape(S.caps(73, 142, 73, 282, 19), { w: 12 });
  B.shape(S.rr(63, 160, 20, 100, 7), { w: 5.5 });
  B.shape(S.rr(60, 116, 26, 16, 6), { w: 7 });
  B.shape(S.caps(88, 170, 118, 170, 6), { w: 6.5 });
  B.shape(S.caps(88, 256, 118, 256, 6), { w: 6.5 });
  B.e();
  B.g('tread');
  B.shape(S.bump(S.rr(72, 298, 250, 54, 27), 3.2, 23), { w: 12.5 });
  [118, 159, 200, 241, 282].forEach(x => { B.shape(S.ell(x, 326, 13, 13), { w: 6 }); B.dot(x, 326, 3.6); });
  B.e();
  B.g('body');
  const F = S.rr(128, 92, 134, 214, [46, 46, 12, 12]);
  B.shape(S.hull(F, S.sh(F, -26, -14)), { w: 12.5 });
  B.shape(F, { w: 11.5 });
  B.shape(S.rr(150, 278, 74, 13, 6.5), { w: 7, fill: 'ink' });
  B.e();
  B.g('face');
  B.line([[148, 130], [166, 135], [184, 146]], { w: 9 });
  B.line([[242, 130], [224, 135], [206, 146]], { w: 9 });
  humanEye(B, 166, 162, 22, 14, { lx: 5, ly: 1 });
  lensEye(B, 224, 162, 18);
  B.shape(S.poly([[195, 180], [205, 198], [185, 198]], 3), { w: 0, fill: 'ink' });
  grin(B, 148, 210, 96, 42, { n: 5 });
  B.e();
  B.g('sign');
  B.line([[170, 92], [170, 64]], { w: 7 });
  B.line([[214, 92], [214, 64]], { w: 7 });
  B.shape(S.rr(146, 34, 100, 32, 9), { w: 10 });
  B.shape(S.rr(160, 45, 12, 14, 2), { w: 0, fill: 'ink' });
  B.line([[184, 47], [224, 47]], { w: 4.4 });
  B.line([[184, 57], [208, 57]], { w: 4.4 });
  B.line([[152, 34], [148, 19]], { w: 5.5 }); B.dot(147, 16, 6.5);
  B.line([[240, 34], [246, 19]], { w: 5.5 }); B.dot(247, 16, 6.5);
  B.e();
  B.g('arm');
  B.shape(S.tube([[246, 262], [268, 278], [288, 288]], 12, 11), { w: 9 });
  B.shape(S.at(S.rr(-8, -18, 16, 36, 5), 288, 288, 26), { w: 7 });
  [[[322, 286], [342, 278], [356, 266]], [[326, 295], [348, 292], [363, 282]], [[324, 304], [346, 306], [360, 300]], [[318, 312], [336, 316], [349, 312]]].forEach(p => B.shape(S.tube(p, 7, 5.6), { w: 5.2 }));
  B.shape(S.ell(306, 296, 25, 20, -0.15), { w: 8 });
  B.shape(S.tube([[292, 281], [308, 265], [326, 259]], 7.5, 6), { w: 5.2 });
  B.e();
  B.e();
  if (!D) return;
  B.g('detail');
  B.stitch(S.rr(140, 112, 110, 156, 30), { closed: true, gap: 11.5, len: 10 });
  [[146, 294], [244, 294], [113, 136], [113, 278]].forEach(p => rivet(B, p[0], p[1], 5));
  rivet(B, 73, 126, 4.5); rivet(B, 156, 285, 3.4); rivet(B, 218, 285, 3.4);
  cable(B, [[73, 116], [64, 92], [82, 64], [116, 54], [143, 52]], 10);
  B.shape(S.rr(141, 45, 10, 14, 3), { w: 4 });
  const tk = []; for (let x = 92; x <= 304; x += 17) tk.push([[x, 340], [x, 347]]);
  B.lines(tk, { w: 3.4, step: 5, wob: 0.3 });
  [118, 159, 200, 241, 282].forEach(x => radial(B, x, 326, 3.6, 8.2, 3, 2.6, 0.5));
  lashes(B, 166, 162, 22, 14, 0, [2, 4, 6], 8);
  radial(B, 171, 163, 5.5, 10, 6, 1.9, 0.3);
  radial(B, 224, 162, 11.2, 14.2, 8, 2.2, 0.2);
  B.line([[241, 237], [243, 257]], { w: 3.2 }); B.shape(S.ell(243, 264, 4.2, 6), { w: 3, step: 3 });
  [146, 180, 214].forEach(y => B.shape(S.rr(108, y, 7, 22, 3), { w: 0, fill: 'ink' }));
  B.stitch([[284, 266], [288, 290], [292, 312]], { gap: 8.5, len: 9, sw: 2.6, w: 3.2 });
  B.lines([[[330, 289], [336, 290]], [[333, 297], [340, 298]], [[330, 305], [337, 305]]], { w: 2.8, step: 4 });
  B.e();
}

/* ---------- U04 CRITIC · pedantisch ---------- */
function critic(B, D) {
  const sf = (u, v) => [150 - 58 * u, 146 + 146 * v - 34 * u];
  B.g('base');
  B.g('tread');
  const T = S.rr(128, 286, 196, 60, 30);
  B.shape(S.hull(T, S.sh(T, -58, -34)), { w: 12.5 });
  B.shape(S.bump(T, 3.2, 24), { w: 12.5 });
  [156, 186, 216, 246, 276, 306].forEach(x => { B.shape(S.ell(x, 316, 12, 12), { w: 5.5 }); B.dot(x, 316, 3.2); });
  [[113, 307], [97, 297], [80, 287]].forEach(p => { B.shape(S.ell(p[0], p[1], 8.5, 8.5), { w: 4.5 }); B.dot(p[0], p[1], 2.6); });
  B.e();
  B.g('body');
  const F = S.rr(150, 146, 152, 146, 22);
  B.shape(S.hull(F, S.sh(F, -58, -34)), { w: 12.5 });
  [0.3, 0.5, 0.7, 0.9].forEach((v, i) => {
    B.shape(S.poly([sf(0.08, v - 0.06), sf(0.3, v - 0.06), sf(0.3, v + 0.06), sf(0.08, v + 0.06)], 1.5), { w: 3.8, fill: i % 2 ? 'sheet' : 'ink' });
    B.line([sf(0.4, v), sf(0.72, v)], { w: 5 });
  });
  B.shape(S.at(S.rr(-10, -6, 10, 12, 3), 110, 182, -125), { w: 4, fill: 'ink' });
  B.shape(S.at(S.rr(0, -6.5, 52, 13, 2), 110, 182, -125), { w: 4.6 });
  B.shape(S.at(S.poly([[52, -6.5], [74, 0], [52, 6.5]], 1.5), 110, 182, -125), { w: 4, fill: 'ink' });
  ear(B, 100, 200, 28);
  B.shape(F, { w: 11.5 });
  B.e();
  B.g('face');
  B.line([[163, 184], [187, 178], [211, 187]], { w: 9 });
  B.line([[241, 177], [263, 166], [289, 174]], { w: 9 });
  B.line([[165, 215], [150, 211]], { w: 6 }); B.line([[287, 215], [302, 211]], { w: 6 });
  B.line([[215, 215], [226, 208], [237, 215]], { w: 6, smooth: true });
  B.shape(S.ell(189, 222, 26, 26), { w: 8.5 });
  B.shape(S.ell(263, 222, 26, 26), { w: 8.5 });
  humanEye(B, 189, 222, 19, 11, { lx: -2, ly: 1 });
  B.shape(S.ell(263, 222, 15, 15), { w: 4.2 }); B.shape(S.star(263, 222, 10.5, 2.5), { w: 0, fill: 'ink' });
  B.shape(S.ell(226, 247, 8, 9.5), { w: 5.5 }); B.dot(222, 251, 1.9); B.dot(230, 251, 1.9);
  B.shape(S.spline([[202, 273], [214, 267], [226, 268], [238, 267], [250, 271], [239, 279], [226, 281], [213, 279]], true, 5), { w: 6 });
  B.line([[204, 273], [226, 275], [248, 272]], { w: 4.4 });
  B.e();
  B.g('lupe');
  B.shape(S.tube([[320, 272], [354, 212]], 6.5, 6.5), { w: 5 });
  B.shape(S.ell(362, 186, 26, 26), { w: 8.5 });
  B.shape(S.ell(362, 186, 19, 19), { w: 2.4, fill: 'none', step: 6 });
  B.line(S.arc(362, 186, 12, 3.55, 4.4), { w: 4 });
  B.line(S.arc(362, 186, 5.5, 3.7, 4.3), { w: 3 });
  B.shape(S.tube([[300, 268], [324, 256]], 10.5, 9.5), { w: 8 });
  B.shape(S.ell(300, 268, 13, 13), { w: 7 });
  fist(B, 326, 256, 28, 0.85);
  B.e();
  B.e();
  if (!D) return;
  B.g('detail');
  B.stitch(S.ell(226, 264, 42, 30), { closed: true, gap: 10.5, len: 9 });
  B.stitch([[116, 174], [119, 200], [114, 226]], { gap: 8.5, len: 8, sw: 2.6, w: 3.2 });
  [[164, 162], [288, 162], [164, 278], [288, 278]].forEach(p => rivet(B, p[0], p[1], 5));
  B.line([[232, 114], [238, 90]], { w: 5.5 }); B.dot(239, 83, 7);
  const tk = []; for (let x = 148; x <= 310; x += 17) tk.push([[x, 334], [x, 341]]);
  B.lines(tk, { w: 3.4, step: 5, wob: 0.3 });
  [156, 186, 216, 246, 276, 306].forEach(x => radial(B, x, 316, 3.4, 7.4, 3, 2.5, 0.5));
  lashes(B, 189, 222, 19, 11, 0, [2, 4, 6], 7);
  radial(B, 185, 223, 5, 8.6, 6, 1.8, 0.3);
  radial(B, 263, 222, 9.5, 12.2, 8, 2, 0.2);
  [0, 2].forEach(i => { const q = sf(0.19, 0.3 + 0.2 * i); B.line([[q[0] - 4, q[1]], [q[0] - 1, q[1] + 4], [q[0] + 4, q[1] - 4]], { w: 2.6, fill: 'sheet', corners: true }); });
  B.e();
}

/* ---------- U02 EXECUTOR · ausführungsfreudig ---------- */
function executor(B, D) {
  B.g('base');
  B.g('pack');
  B.line([[118, 184], [100, 126]], { w: 5.5 }); B.dot(99, 120, 6.5);
  B.shape(S.rr(104, 182, 54, 80, 13), { w: 11 });
  B.e();
  B.g('legs');
  B.shape(S.tube([[184, 286], [172, 314], [162, 334]], 14, 13), { w: 9 });
  B.shape(S.rr(138, 328, 52, 20, 10), { w: 9 });
  B.shape(S.tube([[218, 286], [234, 312], [248, 332]], 14, 13), { w: 9 });
  B.shape(S.rr(226, 328, 56, 20, 10), { w: 9 });
  B.e();
  B.push(4, 200, 292);
  B.g('torso');
  B.shape(S.tube([[204, 188], [204, 204]], 10, 10), { w: 7 });
  B.shape(S.rr(158, 196, 92, 98, 28), { w: 11.5 });
  B.line([[162, 270], [246, 270]], { w: 6.5 });
  B.e();
  B.g('head');
  B.push(-5, 196, 136);
  ear(B, 141, 134, 25);
  B.shape(S.rr(138, 84, 116, 104, 28), { w: 12 });
  B.line([[196, 84], [196, 66]], { w: 6 });
  B.shape(S.star(196, 46, 25, 7.5), { w: 0, fill: 'ink' });
  B.line([[150, 104], [170, 96], [190, 102]], { w: 9 });
  B.line([[206, 100], [226, 93], [246, 99]], { w: 9 });
  humanEye(B, 170, 130, 21, 17, { lx: 4, ly: 1 });
  lensEye(B, 226, 130, 19);
  grin(B, 158, 155, 76, 32, { n: 5, lowerN: 4, depth: 0.8 });
  B.pop();
  B.e();
  B.g('shield');
  B.shape(S.tube([[168, 210], [146, 216], [124, 226]], 11, 10.5), { w: 8 });
  B.shape(S.ell(138, 254, 40, 40), { w: 11, fill: 'ink' });
  B.shape(S.star(138, 254, 21, 5.5), { w: 0 });
  fist(B, 110, 226, 45, 0.9);
  B.e();
  B.g('spear');
  B.shape(S.tube([[259, 312], [322, 90]], 4.5, 4.5), { w: 4.5 });
  B.shape(S.poly([[313, 118], [270, 130], [310, 148]], 2), { w: 3, fill: 'ink' });
  B.shape(S.at(S.poly([[0, -42], [13, -11], [0, 10], [-13, -11]], 2.5), 320, 100, 16), { w: 5 });
  B.shape(S.tube([[244, 210], [262, 228], [270, 246]], 11, 10.5), { w: 8 });
  fist(B, 276, 256, 16, 0.9);
  B.e();
  B.pop();
  B.e();
  if (!D) return;
  B.g('detail');
  B.push(4, 200, 292);
  B.push(-5, 196, 136);
  B.stitch(S.rr(158, 150, 76, 40, 16), { closed: true, gap: 10.5, len: 9 });
  B.stitch([[152, 114], [150, 134], [152, 154]], { gap: 8.5, len: 8, sw: 2.6, w: 3.2 });
  rivet(B, 150, 176, 4.4); rivet(B, 242, 176, 4.4); rivet(B, 150, 98, 4.4); rivet(B, 242, 96, 4.4);
  lashes(B, 170, 130, 21, 17, 0, [2, 4, 6], 8);
  radial(B, 174, 131, 6.2, 11.4, 6, 2, 0.3);
  radial(B, 226, 130, 11.4, 14.6, 8, 2.2, 0.2);
  B.pop();
  rivet(B, 172, 210, 4.4); rivet(B, 236, 210, 4.4); rivet(B, 172, 282, 4.4); rivet(B, 236, 282, 4.4);
  B.shape(S.rr(180, 218, 48, 34, 9), { w: 4.4 });
  B.dot(192, 235, 3.4); B.dot(204, 235, 3.4); B.dot(216, 235, 3.4);
  B.shape(S.rr(192, 260, 24, 20, 4), { w: 3.6 });
  B.stitch(S.rr(130, 188, 22, 22, 6), { closed: true, gap: 8, len: 7, sw: 2.2, w: 2.8 });
  for (let i = 0; i < 6; i++) { const a = i * Math.PI / 3 + 0.3; B.shape(S.ell(138 + 31 * Math.cos(a), 254 + 31 * Math.sin(a), 2.8, 2.8), { w: 0 }); }
  B.lines([[[146, 332], [152, 338]], [[160, 330], [166, 336]], [[236, 332], [242, 338]], [[250, 330], [256, 336]]], { w: 3, step: 4 });
  B.lines([[[262, 292], [270, 296]], [[266, 280], [274, 284]], [[270, 268], [278, 272]]], { w: 3.4, step: 4 });
  B.stitch([[260, 238], [272, 244], [286, 240]], { gap: 8, len: 8, sw: 2.4, w: 3 });
  B.pop();
  B.e();
}

const FIG = {
  crawler: { id: 'U01', slug: 'crawler', title: 'CRAWLER', fn: crawler, seed: 101, fit: { s: 0.87, cx: 200, cy: 352, dx: -5, dy: 0 } },
  critic: { id: 'U04', slug: 'critic', title: 'CRITIC', fn: critic, seed: 104, fit: { s: 0.9, cx: 200, cy: 352, dx: -16, dy: 0 } },
  executor: { id: 'U02', slug: 'executor', title: 'EXECUTOR', fn: executor, seed: 102, fit: { s: 0.9, cx: 200, cy: 352, dx: 0, dy: 0 } }
};
function build(name, frame, detail) {
  const f = FIG[name], b = frame === 'b';
  const B = new Builder(f.seed * 7919 + (b ? 77777 : 0), { fit: f.fit, vj: b ? 1.5 : 0.5, wob: b ? 2.1 : 1.8 });
  f.fn(B, !!detail);
  return B.svg(f.id + ' ' + f.title + ' (Frame ' + frame.toUpperCase() + ')');
}
G.FIG = FIG; G.build = build;
})();
