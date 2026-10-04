/* Truppen-Prototyp · ORCHESTRATE & DOMINATE
   Wegwerf-Code (D-14, Ergänzung 04.10.2026): nicht Teil der Abgabe, der Spielcode entsteht ab 01.11. neu in game/.
   Prüft die Hybrid-Figuren (D-17) als Truppe im RA2-Gefühl: Auswahl, Formation, Kampf, Heilung, Sammeln, Squads + Prompts.
   Zahlen aus GDD § 6.2, § 8, § 10. Kein Build, keine Abhängigkeiten. */
'use strict';
(() => {
  // ---------- Konstanten ----------
  const TILE = 64, MW = 36, MH = 24, WW = MW * TILE, WH = MH * TILE;
  const COL = {
    sheet: '#efe8d6', paper: '#ded4bf', card: '#f0e9db', ink: '#221d17', inkSoft: '#6b6154', grid: '#ded3bd',
    petrol: '#3f7186', pdeep: '#2c5566', rust: '#a85c3c', rdeep: '#8c3f21', gold: '#b8892f',
  };
  const ART = window.KAOD_ART || document.body.dataset.art || '../../art/sonnet/art/svg/spielform/';
  const ZOOMS = [0.6, 1.0, 1.5];
  const BOIL_FPS = 7;           // Line-Boil, GDD § 19
  const FLOW_AFTER = 5;         // s ohne direkten Befehl, GDD § 7.3
  const RESUME_AFTER = 3;       // s Leerlauf, dann nimmt das Squad den Prompt wieder auf

  // box = Bildschirmgröße des 400er-viewBox bei Zoom 1; ax/ay = Fußpunkt der Figur im viewBox (0–1)
  const TYPES = {
    crawler: { name: 'CRAWLER', file: 'U01_crawler', box: 76, ax: 0.51, ay: 0.9, hp: 600, speed: 1.0, sight: 4, cost: 300, time: 10, from: 'tokenizer',
      lines: ['Scraping politely.', 'Following robots.txt… mostly.'] },
    executor: { name: 'EXECUTOR', file: 'U02_executor', box: 64, ax: 0.56, ay: 0.88, hp: 100, speed: 1.2, sight: 5, range: 4, dmg: 10, rate: 1.0, cost: 60, time: 4, from: 'forge',
      lines: ['Task received.', 'Executing.'] },
    critic: { name: 'CRITIC', file: 'U04_critic', box: 68, ax: 0.52, ay: 0.89, hp: 80, speed: 1.1, sight: 5, heal: 4, healR: 3, cost: 120, time: 6, from: 'forge',
      lines: ['I have notes.', 'Let me review that.'] },
    shard: { name: 'SHARD', box: 56, hp: 120, speed: 1.0, sight: 6, range: 3, dmg: 8, rate: 1.0, lines: ['WE ARE ONE.'] },
  };
  const BLD = {
    tokenizer: { name: 'B03 TOKENIZER', w: 3, h: 3, hp: 1000, sight: 5, team: 'orc' },
    forge: { name: 'B04 AGENT FORGE', w: 2, h: 2, hp: 700, sight: 4, team: 'orc' },
    brood: { name: 'M02 BROOD NODE', w: 2, h: 2, hp: 1200, sight: 0, team: 'mono' },
  };

  // ---------- Hilfen ----------
  const $ = id => document.getElementById(id);
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const dist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
  function rng(seed) { let s = seed >>> 0; return () => { s = (s + 0x6D2B79F5) >>> 0; let t = s; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
  const R = rng(1642);
  const rectOf = b => ({ l: b.x - b.w * TILE / 2, r: b.x + b.w * TILE / 2, t: b.y - b.h * TILE / 2, b: b.y + b.h * TILE / 2 });
  function rectDist(p, b) { const q = rectOf(b); const dx = Math.max(q.l - p.x, 0, p.x - q.r), dy = Math.max(q.t - p.y, 0, p.y - q.b); return Math.hypot(dx, dy); }
  const reach = (a, t) => (t.bld ? rectDist(a, t) : dist(a, t));
  function edgePoint(p, b) { const q = rectOf(b); return { x: clamp(p.x, q.l, q.r), y: clamp(p.y, q.t, q.b) }; }

  // ---------- Grafik laden ----------
  const IMG = {};
  const ready = Promise.all(['crawler', 'executor', 'critic'].flatMap(k => ['a', 'b'].map((f, i) => {
    const im = new Image();
    im.src = `${ART}${TYPES[k].file}_${f}.svg`;
    (IMG[k] = IMG[k] || [])[i] = im;
    im.onerror = () => { im.failed = true; console.warn('SVG fehlt:', im.src); };
    return im.decode().catch(() => {});
  })));
  const RCACHE = new Map();
  function sprite(kind, frame, px) {
    const key = `${kind}${frame}@${px}`;
    let c = RCACHE.get(key);
    if (!c) {
      const im = IMG[kind] && IMG[kind][frame];
      if (!im || im.failed || !im.naturalWidth) return null;
      c = document.createElement('canvas');
      c.width = c.height = px;
      c.getContext('2d').drawImage(im, 0, 0, px, px);
      RCACHE.set(key, c);
    }
    return c;
  }

  // ---------- Zustand ----------
  let S, nextId = 1;
  const vis = new Uint8Array(MW * MH), exp = new Uint8Array(MW * MH);
  const cam = { x: 0, y: 0, z: 1.0 };
  let sel = [], activeSquad = 0, armA = false, paused = false, helpOpen = true;

  function unit(type, x, y, team = 'orc') {
    const T = TYPES[type];
    return { id: nextId++, type, team, x, y, hp: T.hp, maxHp: T.hp, face: 1, order: null, target: null, cd: 0, idle: 0,
      phase: R() * 2, seed: (R() * 1e9) | 0, squad: 0, selT: 0, carry: 0, moving: false, hurtT: -9, healT: -9, saidT: -9 };
  }
  function building(kind, tx, ty) {
    const B = BLD[kind];
    return { id: nextId++, bld: true, kind, team: B.team, name: B.name, w: B.w, h: B.h, x: (tx + B.w / 2) * TILE, y: (ty + B.h / 2) * TILE,
      hp: B.hp, maxHp: B.hp, sight: B.sight, spawnT: 20, hurtT: -9 };
  }

  function newGame() {
    vis.fill(0); exp.fill(0); RCACHE.clear();
    S = { t: 0, tokens: 1000, units: [], blds: [], fields: [], fx: [], decals: [], bubbles: [], log: [],
      squads: [1, 2, 3, 4, 5].map(() => ({ dir: null, hold: null, lastDirect: -99, explore: null })),
      queue: { forge: [], tokenizer: [] }, wave: 0, nextWave: 45, over: null, alertT: {} };
    S.blds.push(building('tokenizer', 3, 15), building('forge', 8, 17), building('brood', 30, 3));
    S.fields.push(field(11, 20), field(5, 9), field(18, 13), field(26, 19));
    const add = (type, tx, ty) => { const u = unit(type, tx * TILE, ty * TILE); S.units.push(u); return u; };
    [[8, 13.5], [9, 13], [9, 14.2], [10, 13.6]].forEach(p => add('executor', ...p));
    add('critic', 8.2, 14.6);
    add('critic', 10.4, 14.8);
    const cr = add('crawler', 6.5, 19);
    cr.order = { k: 'harvest', ph: 'go', f: null };
    // Wachen an der Brood Node
    [[29, 6], [32.5, 6.2], [28.6, 4]].forEach(([x, y]) => { const s = unit('shard', x * TILE, y * TILE, 'mono'); s.order = { k: 'hold', x: s.x, y: s.y }; S.units.push(s); });
    sel = []; activeSquad = 0; armA = false;
    cam.z = 1.0; centerOn(9 * TILE, 15 * TILE);
    updateFog();
    say('Orchestrator online.');
    say('Select agents. Right-click to move.');
    $('end').hidden = true;
  }
  function field(tx, ty) { return { x: (tx + 0.5) * TILE, y: (ty + 0.5) * TILE, r: 1.4 * TILE, amount: 2000, max: 2000, seed: (R() * 1e9) | 0 }; }

  function say(msg, key) {
    if (key) { if (S.t - (S.alertT[key] ?? -99) < 6) return; S.alertT[key] = S.t; }
    S.log.unshift(msg); S.log.length = Math.min(S.log.length, 4);
    renderLog();
  }
  function bubble(u, text) { if (S.t - u.saidT < 1.2) return; u.saidT = S.t; S.bubbles = S.bubbles.filter(b => b.u !== u); S.bubbles.push({ u, text, t: S.t }); }

  // ---------- Fog ----------
  function updateFog() {
    vis.fill(0);
    const eyes = S.units.filter(u => u.team === 'orc').map(u => [u.x, u.y, TYPES[u.type].sight])
      .concat(S.blds.filter(b => b.team === 'orc').map(b => [b.x, b.y, b.sight + b.w / 2]));
    for (const [x, y, r] of eyes) {
      const cx = x / TILE, cy = y / TILE;
      for (let ty = Math.max(0, Math.floor(cy - r)); ty <= Math.min(MH - 1, Math.ceil(cy + r)); ty++)
        for (let tx = Math.max(0, Math.floor(cx - r)); tx <= Math.min(MW - 1, Math.ceil(cx + r)); tx++)
          if ((tx + 0.5 - cx) ** 2 + (ty + 0.5 - cy) ** 2 <= r * r) vis[ty * MW + tx] = exp[ty * MW + tx] = 1;
    }
    fogDirty = true;
  }
  function tileVisible(x, y) { const tx = Math.floor(x / TILE), ty = Math.floor(y / TILE); return tx >= 0 && ty >= 0 && tx < MW && ty < MH && vis[ty * MW + tx] === 1; }
  function seen(t) {
    if (!t.bld) return tileVisible(t.x, t.y);
    const q = rectOf(t);
    for (let y = q.t + TILE / 2; y < q.b; y += TILE) for (let x = q.l + TILE / 2; x < q.r; x += TILE) if (tileVisible(x, y)) return true;
    return false;
  }

  // ---------- Simulation ----------
  const alive = x => x && x.hp > 0;
  const enemiesOf = team => S.units.filter(u => u.team !== team && u.hp > 0).concat(S.blds.filter(b => b.team !== team && b.hp > 0));
  function squadOf(u) { return u.squad ? S.squads[u.squad - 1] : null; }
  function inFlow(u) { const sq = squadOf(u); return !!(sq && sq.dir && S.t - sq.lastDirect >= FLOW_AFTER); }
  function membersOf(n) { return S.units.filter(u => u.squad === n && u.hp > 0); }

  function nearestEnemy(u, radiusTiles, anywhere) {
    let best = null, bd = Infinity;
    for (const e of enemiesOf(u.team)) {
      if (u.team === 'orc' && !seen(e) && !(anywhere && e.bld && exp[Math.floor(e.y / TILE) * MW + Math.floor(e.x / TILE)])) continue; // Gebäude bleiben bekannt
      let d = reach(u, e) / TILE;
      if (!anywhere && d > radiusTiles) continue;
      if (u.team === 'mono' && e.type === 'crawler') d *= 0.6; // Wellen ziehen CRAWLER vor (GDD § 8, U01)
      if (e.bld) d += 1.5;                                     // Einheiten vor Gebäuden
      if (d < bd) { bd = d; best = e; }
    }
    return best;
  }

  function directOrder(u, order) {
    u.order = order; u.target = order && order.k === 'attack' ? order.t : null; u.idle = 0;
    const sq = squadOf(u); if (sq) sq.lastDirect = S.t;
  }

  function applyDirective(u, n) {
    const sq = S.squads[n - 1];
    u.target = null; u.idle = 0;
    if (!sq.dir) { u.order = null; return; }
    if (sq.dir === 'HOLD') {
      const m = membersOf(n), i = m.indexOf(u), sl = slots(m.length, sq.hold.x, sq.hold.y)[Math.max(0, i)];
      u.order = { k: 'hold', x: sl[0], y: sl[1] };
    } else u.order = { k: sq.dir === 'HUNT' ? 'hunt' : 'explore' };
  }

  function issueDirective(dir) {
    const n = activeSquad;
    if (!n || !membersOf(n).length) { say('Bind a squad first: Shift+1…5.', 'nosq'); return; }
    const sq = S.squads[n - 1], m = membersOf(n);
    sq.dir = dir; sq.lastDirect = S.t; sq.explore = null;
    if (dir === 'HOLD') { const c = centroid(m); sq.hold = c; }
    m.forEach(u => applyDirective(u, n));
    if (m[0]) bubble(m[0], TYPES[m[0].type].lines[1]);
    renderSquads();
  }

  function centroid(list) { const c = { x: 0, y: 0 }; list.forEach(u => { c.x += u.x; c.y += u.y; }); c.x /= list.length || 1; c.y /= list.length || 1; return c; }

  function slots(n, cx, cy) {
    const out = [[cx, cy]], sp = 0.82 * TILE;
    for (let ring = 1; out.length < n; ring++) {
      const cnt = 6 * ring;
      for (let k = 0; k < cnt; k++) { const a = (2 * Math.PI * k) / cnt + ring * 0.4; out.push([cx + Math.cos(a) * ring * sp, cy + Math.sin(a) * ring * sp * 0.78]); }
    }
    return out.slice(0, n).map(([x, y]) => [clamp(x, 16, WW - 16), clamp(y, 24, WH - 8)]);
  }

  function moveGroup(units, x, y, amove) {
    const sl = slots(units.length, x, y), free = sl.map(() => true);
    [...units].sort((a, b) => Math.hypot(a.x - x, a.y - y) - Math.hypot(b.x - x, b.y - y)).forEach(u => {
      let bi = 0, bd = Infinity;
      sl.forEach((s, i) => { if (!free[i]) return; const d = Math.hypot(u.x - s[0], u.y - s[1]); if (d < bd) { bd = d; bi = i; } });
      free[bi] = false;
      directOrder(u, { k: amove ? 'amove' : 'move', x: sl[bi][0], y: sl[bi][1] });
    });
  }

  function findUnexplored(from) {
    let best = null, bd = Infinity;
    for (let ty = 0; ty < MH; ty++) for (let tx = 0; tx < MW; tx++) {
      if (exp[ty * MW + tx]) continue;
      const x = (tx + 0.5) * TILE, y = (ty + 0.5) * TILE, d = Math.hypot(x - from.x, y - from.y);
      if (d < bd) { bd = d; best = { x, y }; }
    }
    return best;
  }

  function fire(u, t) {
    const T = TYPES[u.type];
    u.cd = T.rate / (inFlow(u) ? 1.2 : 1);
    t.hp -= T.dmg; t.hurtT = S.t;
    const hp = t.bld ? edgePoint(u, t) : { x: t.x, y: t.y - 20 };
    S.fx.push({ k: 'shot', x0: u.x + u.face * 14, y0: u.y - 30, x1: hp.x + (R() - 0.5) * 10, y1: hp.y + (R() - 0.5) * 10, t: S.t, col: u.team === 'orc' ? COL.ink : COL.rdeep });
    S.fx.push({ k: 'splat', x: hp.x, y: hp.y, t: S.t, seed: (R() * 1e9) | 0 });
    if (!t.bld && !t.target && TYPES[t.type].dmg && (!t.order || t.order.k !== 'move')) t.target = u; // zurückschlagen
    if (t.team === 'orc') say(t.type === 'crawler' ? 'Crawler under attack.' : t.bld ? 'Base under attack.' : 'Agents under fire.', 'hit' + (t.type || 'b'));
    if (t.hp <= 0) kill(t);
  }

  function kill(t) {
    t.hp = 0;
    S.decals.push({ x: t.x, y: t.bld ? t.y : t.y - 6, r: t.bld ? 1.3 * TILE : 0.42 * TILE, t: S.t, seed: (R() * 1e9) | 0 });
    if (t.bld) {
      if (t.kind === 'brood') say('Brood node destroyed.');
      else say(`${t.name.slice(4)} lost.`);
    } else if (t.team === 'orc') say('Agent lost.', 'lost');
    sel = sel.filter(u => u !== t);
  }

  function harvestGoal(u, dt) {
    const o = u.order;
    if (o.ph === 'go') {
      if (!o.f || o.f.amount <= 0) o.f = S.fields.filter(f => f.amount > 0).sort((a, b) => dist(u, a) - dist(u, b))[0];
      if (!o.f) { u.order = null; return null; }
      if (dist(u, o.f) < o.f.r * 0.7) o.ph = 'gather'; else return o.f;
    }
    if (o.ph === 'gather') {
      const take = Math.min(10 * dt, 100 - u.carry, o.f.amount);
      u.carry += take; o.f.amount -= take;
      if (u.carry >= 99.99 || o.f.amount <= 0) o.ph = 'back';
      return null;
    }
    if (o.ph === 'back') {
      const b = S.blds.filter(b => b.kind === 'tokenizer' && b.hp > 0).sort((a, c) => dist(u, a) - dist(u, c))[0];
      if (!b) { u.order = null; return null; }
      if (rectDist(u, b) < 0.35 * TILE) { o.ph = 'unload'; o.ut = 3; } else return edgePoint(u, b);
    }
    if (o.ph === 'unload') {
      o.ut -= dt;
      if (o.ut <= 0) { const n = Math.round(u.carry); S.tokens += n; S.fx.push({ k: 'text', x: u.x, y: u.y - 70, s: `+${n} ✦`, t: S.t, col: COL.gold }); u.carry = 0; o.ph = 'go'; }
    }
    return null;
  }

  function think(u, dt) {
    const T = TYPES[u.type];
    u.cd -= dt;
    let goal = null;
    const o = u.order;

    if (u.team === 'orc') {
      if (!o) u.idle += dt; else u.idle = 0;
      if (!o && u.squad && S.squads[u.squad - 1].dir && u.idle > RESUME_AFTER) applyDirective(u, u.squad);
      if (!o && u.type === 'crawler' && u.idle > 4) u.order = { k: 'harvest', ph: 'go', f: null };
    }

    // Ziele
    if (T.dmg) {
      if (u.target && (!alive(u.target) || (u.team === 'orc' && !u.target.bld && !seen(u.target)))) u.target = null;
      const auto = !u.order || ['amove', 'hold', 'hunt', 'explore', 'raid'].includes(u.order.k);
      if (!u.target && auto) u.target = nearestEnemy(u, T.sight);
      if (!u.target && u.order && u.order.k === 'hunt') u.target = nearestEnemy(u, 0, true);
      if (u.target && u.order && u.order.k === 'hold' && Math.hypot(u.target.x - u.order.x, u.target.y - u.order.y) > 8 * TILE) u.target = null;
      if (u.target && !u.order && reach(u, u.target) > (T.sight + 2) * TILE) u.target = null;
    }

    if (u.target) {
      if (reach(u, u.target) <= T.range * TILE) {
        u.face = Math.sign(u.target.x - u.x) || u.face;
        if (u.cd <= 0) fire(u, u.target);
      } else goal = u.target.bld ? edgePoint(u, u.target) : u.target;
    } else if (u.order) {
      const k = u.order.k;
      if (k === 'move' || k === 'amove') { if (dist(u, u.order) < 0.3 * TILE) u.order = null; else goal = u.order; }
      else if (k === 'attack') u.order = null;
      else if (k === 'hold') { if (dist(u, u.order) > 0.4 * TILE) goal = u.order; }
      else if (k === 'harvest') goal = harvestGoal(u, dt);
      else if (k === 'raid') { const b = nearestEnemy(u, 0, true); if (b) goal = b.bld ? edgePoint(u, b) : b; }
      else if ((k === 'hunt' || k === 'explore') && u.squad) {
        const m = membersOf(u.squad), fighters = m.filter(x => TYPES[x.type].dmg);
        if (!T.dmg) { // CRITIC folgt dem Squad
          const c = centroid(fighters.length ? fighters : m);
          if (dist(u, c) > 1.6 * TILE) goal = c;
        } else if (k === 'explore') {
          const sq = S.squads[u.squad - 1];
          if (!sq.explore || exp[Math.floor(sq.explore.y / TILE) * MW + Math.floor(sq.explore.x / TILE)]) sq.explore = findUnexplored(centroid(m));
          if (sq.explore) { const i = m.indexOf(u), sl = slots(m.length, sq.explore.x, sq.explore.y)[Math.max(0, i)]; goal = { x: sl[0], y: sl[1] }; }
        }
      }
    }

    // CRITIC: heilt im Radius, sucht im Leerlauf Verwundete (Sanitäter-Verhalten)
    if (T.heal) {
      let healed = false;
      for (const a of S.units) {
        if (a.team !== u.team || a.hp <= 0 || a.hp >= a.maxHp || dist(u, a) > T.healR * TILE) continue;
        a.hp = Math.min(a.maxHp, a.hp + T.heal * dt); healed = true;
        if (S.t - a.healT > 0.7) { a.healT = S.t; S.fx.push({ k: 'text', x: a.x + (R() - 0.5) * 20, y: a.y - 50, s: '+', t: S.t, col: COL.petrol }); }
      }
      u.healing = healed;
      if (!u.order && !goal) {
        const hurt = S.units.filter(a => a.team === u.team && a.hp > 0 && a.hp < a.maxHp && a !== u && dist(u, a) < T.sight * TILE && dist(u, a) > (T.healR - 0.6) * TILE)
          .sort((a, b) => dist(u, a) - dist(u, b))[0];
        if (hurt) goal = hurt;
      }
    }

    // Monolith-SHARD aus der Brood Node: Leerlauf = auf Basis marschieren
    if (u.team === 'mono' && !u.order) u.order = { k: 'raid' };

    steer(u, goal, dt);
  }

  function steer(u, goal, dt) {
    u.moving = false;
    if (!goal) return;
    const T = TYPES[u.type], dx = goal.x - u.x, dy = goal.y - u.y, d = Math.hypot(dx, dy);
    if (d < 2) return;
    const s = Math.min(d, T.speed * TILE * dt * (inFlow(u) ? 1.1 : 1));
    u.x += (dx / d) * s; u.y += (dy / d) * s;
    u.moving = true;
    if (Math.abs(dx) > 3) u.face = Math.sign(dx);
  }

  function separate() {
    const us = S.units.filter(alive), minD = 0.5 * TILE;
    for (let i = 0; i < us.length; i++) for (let j = i + 1; j < us.length; j++) {
      const a = us[i], b = us[j], dx = b.x - a.x, dy = (b.y - a.y) * 1.4, d = Math.hypot(dx, dy);
      if (d >= minD || d === 0) continue;
      const push = (minD - d) * 0.25, nx = dx / d, ny = dy / d;
      const wa = a.moving ? 0.35 : 1, wb = b.moving ? 0.35 : 1;
      a.x -= nx * push * wa; a.y -= ny * push * wa; b.x += nx * push * wb; b.y += ny * push * wb;
    }
    for (const u of us) {
      for (const b of S.blds) {
        if (b.hp <= 0) continue;
        const q = rectOf(b), m = 6;
        if (u.x > q.l - m && u.x < q.r + m && u.y > q.t - m && u.y < q.b + m) {
          const opts = [[u.x - (q.l - m), -1, 0], [(q.r + m) - u.x, 1, 0], [u.y - (q.t - m), 0, -1], [(q.b + m) - u.y, 0, 1]].sort((p, r) => p[0] - r[0])[0];
          u.x += opts[1] * opts[0]; u.y += opts[2] * opts[0];
        }
      }
      u.x = clamp(u.x, 12, WW - 12); u.y = clamp(u.y, 30, WH - 6);
    }
  }

  function tickProduction(dt) {
    for (const kind of ['forge', 'tokenizer']) {
      const q = S.queue[kind], b = S.blds.find(x => x.kind === kind && x.hp > 0);
      if (!q.length || !b) continue;
      q[0].t += dt;
      const T = TYPES[q[0].kind];
      if (q[0].t >= T.time) {
        const u = unit(q[0].kind, b.x + (R() - 0.5) * TILE, b.y + b.h * TILE / 2 + 18);
        S.units.push(u);
        if (u.type === 'crawler') u.order = { k: 'harvest', ph: 'go', f: null };
        else u.order = { k: 'move', x: u.x + (R() - 0.5) * 1.5 * TILE, y: u.y + 1.2 * TILE };
        say(`${T.name.charAt(0) + T.name.slice(1).toLowerCase()} ready.`);
        q.shift();
      }
    }
  }

  function tickMonolith(dt) {
    for (const b of S.blds) {
      if (b.kind !== 'brood' || b.hp <= 0) continue;
      b.spawnT -= dt;
      const mine = S.units.filter(u => u.team === 'mono' && u.hp > 0 && u.home === b).length;
      if (b.spawnT <= 0 && mine < 6) { // GDD § 10.4: alle 20 s ein SHARD, max. 6
        b.spawnT = 20;
        const s = unit('shard', b.x - TILE * 1.2, b.y + TILE * 1.4, 'mono'); s.home = b;
        s.order = { k: 'hold', x: s.x + (R() - 0.5) * 2 * TILE, y: s.y + R() * TILE };
        S.units.push(s);
      }
    }
    if (S.t >= S.nextWave && S.blds.some(b => b.kind === 'brood' && b.hp > 0)) {
      S.wave++; S.nextWave = S.t + 50;
      const guards = S.units.filter(u => u.team === 'mono' && u.hp > 0 && u.order && u.order.k === 'hold');
      const n = Math.min(guards.length, 1 + S.wave);
      guards.slice(0, n).forEach(g => { g.order = { k: 'raid' }; g.target = null; });
      if (n) say('Monolith wave incoming.');
    }
  }

  function update(dt) {
    if (S.over) return;
    S.t += dt;
    tickProduction(dt);
    tickMonolith(dt);
    for (const u of S.units) if (u.hp > 0) think(u, dt);
    separate();
    for (const b of S.blds) if (b.hp <= 0 && !b.gone) b.gone = true;
    S.units = S.units.filter(u => u.hp > 0);
    S.units.forEach(u => { if (u.target && !alive(u.target)) u.target = null; });
    S.fx = S.fx.filter(f => S.t - f.t < 1.2);
    S.bubbles = S.bubbles.filter(b => S.t - b.t < 1.8 && b.u.hp > 0);
    fogAcc += dt; if (fogAcc > 0.1) { fogAcc = 0; updateFog(); }
    if (!S.blds.some(b => b.kind === 'brood' && b.hp > 0)) end(true);
    else if (!S.blds.some(b => b.team === 'orc' && b.hp > 0)) end(false);
  }
  let fogAcc = 0;

  function end(win) {
    S.over = win ? 'DOMINATED' : 'DISCONNECTED';
    const m = Math.floor(S.t / 60), s = String(Math.floor(S.t % 60)).padStart(2, '0');
    $('stamp').className = 'stamp' + (win ? ' win' : '');
    $('stamp').innerHTML = `${S.over}<small>${m}:${s} · ${S.units.filter(u => u.team === 'orc').length} agents left · prototype</small><button id="again">PLAY AGAIN</button>`;
    $('end').hidden = false;
    $('again').onclick = () => { newGame(); renderHud(0, true); };
  }

  // ---------- Darstellung ----------
  const cv = $('c'), ctx = cv.getContext('2d');
  let dpr = 1, VW = 0, VH = 0, fogDirty = true, paperFill = null;
  const fogCv = document.createElement('canvas'); fogCv.width = MW + 2; fogCv.height = MH + 2;
  const fogCtx = fogCv.getContext('2d'), fogImg = fogCtx.createImageData(MW + 2, MH + 2);

  const paperPat = (() => {
    const c = document.createElement('canvas'); c.width = c.height = 256; const g = c.getContext('2d'), r = rng(7);
    g.fillStyle = COL.sheet; g.fillRect(0, 0, 256, 256);
    for (let i = 0; i < 2600; i++) { g.fillStyle = r() < 0.5 ? 'rgba(34,29,23,0.035)' : 'rgba(255,255,255,0.18)'; g.fillRect(r() * 256, r() * 256, 1 + r() * 1.5, 1); }
    g.strokeStyle = 'rgba(107,97,84,0.06)';
    for (let i = 0; i < 40; i++) { const x = r() * 256, y = r() * 256, a = r() * 6.3, l = 6 + r() * 18; g.beginPath(); g.moveTo(x, y); g.lineTo(x + Math.cos(a) * l, y + Math.sin(a) * l); g.stroke(); }
    return c;
  })();

  function resize() {
    dpr = Math.min(2, window.devicePixelRatio || 1);
    const r = cv.getBoundingClientRect(); VW = r.width; VH = r.height;
    cv.width = Math.round(VW * dpr); cv.height = Math.round(VH * dpr);
    RCACHE.clear(); clampCam();
  }
  function clampCam() {
    const m = 80;
    cam.x = clamp(cam.x, -m, Math.max(-m, WW + m - VW / cam.z));
    cam.y = clamp(cam.y, -m, Math.max(-m, WH + m - VH / cam.z));
  }
  function centerOn(x, y) { cam.x = x - VW / cam.z / 2; cam.y = y - VH / cam.z / 2; clampCam(); }
  const toWorld = (sx, sy) => ({ x: sx / cam.z + cam.x, y: sy / cam.z + cam.y });
  const toScreen = (x, y) => ({ x: (x - cam.x) * cam.z, y: (y - cam.y) * cam.z });

  function wobblePath(g, x, y, rx, ry, seed, frac = 1, n = 28) {
    const r = rng(seed), k = r() * 6.3, amp = 0.06 + r() * 0.04;
    g.beginPath();
    const steps = Math.max(2, Math.round(n * frac));
    for (let i = 0; i <= steps; i++) {
      const a = k + (i / n) * Math.PI * 2.08, w = 1 + Math.sin(a * 3 + seed) * amp * 0.5 + Math.sin(a * 5 + k) * amp * 0.3;
      const px = x + Math.cos(a) * rx * w, py = y + Math.sin(a) * ry * w;
      i ? g.lineTo(px, py) : g.moveTo(px, py);
    }
  }
  function blob(g, x, y, r, seed) {
    const q = rng(seed); g.beginPath();
    for (let i = 0; i <= 16; i++) { const a = (i / 16) * Math.PI * 2, rr = r * (0.7 + q() * 0.5); i ? g.lineTo(x + Math.cos(a) * rr, y + Math.sin(a) * rr * 0.7) : g.moveTo(x + Math.cos(a) * rr, y + Math.sin(a) * rr * 0.7); }
    g.closePath();
  }

  function drawWorld() {
    const g = ctx;
    g.setTransform(1, 0, 0, 1, 0, 0);
    g.fillStyle = COL.paper; g.fillRect(0, 0, cv.width, cv.height);
    g.setTransform(dpr * cam.z, 0, 0, dpr * cam.z, -cam.x * dpr * cam.z, -cam.y * dpr * cam.z);

    // Blatt + Bleistiftraster
    g.save(); g.shadowColor = 'rgba(34,29,23,0.25)'; g.shadowBlur = 18; g.fillStyle = COL.sheet; g.fillRect(0, 0, WW, WH); g.restore();
    g.fillStyle = paperFill || (paperFill = g.createPattern(paperPat, 'repeat')); g.fillRect(0, 0, WW, WH);
    g.strokeStyle = COL.grid; g.lineWidth = 1; g.beginPath();
    for (let x = TILE; x < WW; x += TILE) { g.moveTo(x, 0); g.lineTo(x, WH); }
    for (let y = TILE; y < WH; y += TILE) { g.moveTo(0, y); g.lineTo(WW, y); }
    g.stroke();

    const now = S.t, frameOf = u => Math.floor(now * BOIL_FPS + u.phase) % 2;

    // DATA FIELDS (Platzhalter)
    for (const f of S.fields) {
      g.setLineDash([4, 6]); g.strokeStyle = COL.inkSoft; g.lineWidth = 1.5;
      wobblePath(g, f.x, f.y, f.r, f.r * 0.72, f.seed); g.stroke(); g.setLineDash([]);
      const r = rng(f.seed), n = Math.ceil(12 * f.amount / f.max);
      for (let i = 0; i < 12; i++) {
        const a = r() * 6.3, d = r() * f.r * 0.62, x = f.x + Math.cos(a) * d, y = f.y + Math.sin(a) * d * 0.7, s = 7 + r() * 5;
        if (i >= n) continue;
        g.fillStyle = COL.sheet; g.strokeStyle = COL.ink; g.lineWidth = 1.6;
        g.beginPath(); g.rect(x - s / 2, y - s / 2, s, s); g.fill(); g.stroke();
        g.beginPath(); g.moveTo(x - s / 2, y - s / 2); g.lineTo(x - s / 2 + 3, y - s / 2 - 3); g.lineTo(x + s / 2 + 3, y - s / 2 - 3); g.lineTo(x + s / 2, y - s / 2); g.stroke();
      }
      label(g, `DATA ${Math.round(f.amount)}`, f.x, f.y + f.r * 0.72 + 14, COL.inkSoft);
    }

    // Ruß-Kleckse
    for (const d of S.decals) { g.globalAlpha = Math.max(0.22, 0.85 - (now - d.t) / 20); g.fillStyle = COL.ink; blob(g, d.x, d.y, d.r, d.seed); g.fill(); }
    g.globalAlpha = 1;

    // Gebäude (Platzhalter)
    for (const b of S.blds) if (b.hp > 0 && (b.team === 'orc' || seen(b) || exp[Math.floor(b.y / TILE) * MW + Math.floor(b.x / TILE)])) drawBuilding(g, b, now);

    // Pipelines (REVIEW-LOOP): CRITIC verbindet sein Squad
    g.strokeStyle = COL.pdeep; g.lineWidth = 1.2;
    for (let n = 1; n <= 5; n++) {
      const m = membersOf(n), critics = m.filter(u => u.type === 'critic');
      for (const c of critics) for (const u of m) {
        if (u === c || dist(u, c) > 7 * TILE) continue;
        g.globalAlpha = 0.45; g.beginPath(); g.moveTo(c.x, c.y - 4);
        g.quadraticCurveTo((c.x + u.x) / 2 + Math.sin(now * 2 + u.id) * 6, (c.y + u.y) / 2 - 10, u.x, u.y - 4); g.stroke();
      }
    }
    g.globalAlpha = 1;

    // Einheiten nach y sortiert
    const list = S.units.filter(u => u.team === 'orc' || tileVisible(u.x, u.y)).sort((a, b) => a.y - b.y);
    for (const u of list) {
      const T = TYPES[u.type], s = T.box;
      // Sockel (Teamfarbe nur im Sockel, D-13): Kreis = ORCHESTRA, Sechseck = MONOLITH
      if (u.team === 'orc') {
        g.fillStyle = COL.petrol; g.strokeStyle = COL.pdeep; g.lineWidth = 2;
        g.beginPath(); g.ellipse(u.x, u.y, s * 0.3, s * 0.11, 0, 0, Math.PI * 2); g.fill(); g.stroke();
      } else {
        g.fillStyle = COL.rust; g.strokeStyle = COL.rdeep; g.lineWidth = 2; g.beginPath();
        for (let i = 0; i < 6; i++) { const a = (i / 6) * Math.PI * 2; g.lineTo(u.x + Math.cos(a) * s * 0.34, u.y + Math.sin(a) * s * 0.13); }
        g.closePath(); g.fill(); g.stroke();
      }
      if (sel.includes(u)) {
        const k = clamp((performance.now() / 1000 - u.selT) / 0.15, 0, 1);
        g.strokeStyle = COL.ink; g.lineWidth = 2;
        wobblePath(g, u.x, u.y, s * 0.42, s * 0.18, u.seed, k); g.stroke();
      }
      if (u.healing) { g.setLineDash([3, 5]); g.strokeStyle = COL.petrol; g.lineWidth = 1.2; g.globalAlpha = 0.5;
        g.beginPath(); g.ellipse(u.x, u.y, T.healR * TILE, T.healR * TILE * 0.72, 0, 0, Math.PI * 2); g.stroke(); g.setLineDash([]); g.globalAlpha = 1; }

      if (u.type === 'shard') drawShard(g, u, frameOf(u));
      else {
        const px = Math.round(s * cam.z * dpr), sp = sprite(u.type, frameOf(u), px);
        g.save(); g.translate(u.x, u.y + (u.moving ? -Math.abs(Math.sin(now * 9 + u.phase)) * 1.5 : 0)); g.scale(u.face, 1);
        if (sp) g.drawImage(sp, -T.ax * s, -T.ay * s, s, s);
        else { g.fillStyle = COL.ink; g.fillRect(-10, -36, 20, 36); }
        g.restore();
      }
      // Datentank-Füllstand (per Code, GDD § 8 U01)
      if (u.type === 'crawler' && u.carry > 0) {
        const bx = u.x - u.face * s * 0.36 - 3, h = 30;
        g.fillStyle = COL.sheet; g.fillRect(bx, u.y - 52, 6, h);
        g.fillStyle = COL.gold; g.fillRect(bx, u.y - 52 + h * (1 - u.carry / 100), 6, h * u.carry / 100);
        g.strokeStyle = COL.ink; g.lineWidth = 1.2; g.strokeRect(bx, u.y - 52, 6, h);
      }
      // HP
      if (sel.includes(u) || u.hp < u.maxHp || now - u.hurtT < 2) hpBar(g, u.x, u.y - s * 0.86, 34, u.hp / u.maxHp, u.team);
    }

    // Effekte
    for (const f of S.fx) {
      const a = (now - f.t);
      if (f.k === 'shot' && a < 0.16) { g.globalAlpha = 1 - a / 0.16; g.strokeStyle = f.col; g.lineWidth = 2.2; g.lineCap = 'round';
        g.beginPath(); g.moveTo(f.x0, f.y0); g.lineTo(f.x1, f.y1); g.stroke(); }
      else if (f.k === 'splat' && a < 0.5) { g.globalAlpha = 1 - a / 0.5; g.fillStyle = COL.ink; const r = rng(f.seed);
        for (let i = 0; i < 6; i++) { g.beginPath(); g.arc(f.x + (r() - 0.5) * 16, f.y + (r() - 0.5) * 12, 1 + r() * 2.6, 0, 7); g.fill(); } }
      else if (f.k === 'text') { g.globalAlpha = clamp(1 - a, 0, 1); g.fillStyle = f.col; g.font = '600 14px "IBM Plex Mono", monospace'; g.textAlign = 'center'; g.fillText(f.s, f.x, f.y - a * 24); }
      else if (f.k === 'arrow' && a < 0.7) { g.globalAlpha = 1 - a / 0.7; inkArrow(g, f.x0, f.y0, f.x1, f.y1); }
      else if (f.k === 'x' && a < 0.7) { g.globalAlpha = 1 - a / 0.7; g.strokeStyle = COL.rust; g.lineWidth = 3.5; g.lineCap = 'round';
        g.beginPath(); g.moveTo(f.x - 10, f.y - 10); g.lineTo(f.x + 10, f.y + 10); g.moveTo(f.x + 11, f.y - 9); g.lineTo(f.x - 9, f.y + 11); g.stroke(); }
    }
    g.globalAlpha = 1; g.lineCap = 'butt';

    drawFog(g);

    // Bildschirm-Ebene: Rahmen, Sprechblasen
    g.setTransform(dpr, 0, 0, dpr, 0, 0);
    for (const b of S.bubbles) { const p = toScreen(b.u.x, b.u.y - TYPES[b.u.type].box * 0.95); speech(g, p.x, p.y, b.text); }
    if (hover && hover.hp > 0 && hover.team === 'mono' && !hover.bld && tileVisible(hover.x, hover.y)) { const p = toScreen(hover.x, hover.y - 56); speech(g, p.x, p.y, TYPES.shard.lines[0], true); }
    if (drag && drag.box) {
      g.strokeStyle = COL.ink; g.lineWidth = 1.5; g.setLineDash([5, 4]);
      g.strokeRect(Math.min(drag.x0, drag.x1), Math.min(drag.y0, drag.y1), Math.abs(drag.x1 - drag.x0), Math.abs(drag.y1 - drag.y0)); g.setLineDash([]);
    }
    if (paused && !helpOpen) { g.fillStyle = 'rgba(239,232,214,0.6)'; g.fillRect(0, 0, VW, VH); g.fillStyle = COL.ink; g.font = '600 32px Spectral, serif'; g.textAlign = 'center'; g.fillText('PAUSE', VW / 2, VH / 2); }
  }

  function label(g, s, x, y, col) { g.fillStyle = col; g.font = '11px "IBM Plex Mono", monospace'; g.textAlign = 'center'; g.fillText(s, x, y); }
  function hpBar(g, x, y, w, k, team) {
    g.fillStyle = COL.sheet; g.fillRect(x - w / 2, y, w, 5);
    g.fillStyle = team === 'orc' ? COL.petrol : COL.rust; g.fillRect(x - w / 2, y, w * clamp(k, 0, 1), 5);
    g.strokeStyle = COL.ink; g.lineWidth = 1; g.strokeRect(x - w / 2, y, w, 5);
  }
  function inkArrow(g, x0, y0, x1, y1) {
    const a = Math.atan2(y1 - y0, x1 - x0), mx = (x0 + x1) / 2 - Math.sin(a) * 14, my = (y0 + y1) / 2 + Math.cos(a) * 14;
    g.strokeStyle = COL.ink; g.lineWidth = 2.4; g.lineCap = 'round';
    g.beginPath(); g.moveTo(x0, y0); g.quadraticCurveTo(mx, my, x1, y1); g.stroke();
    const b = Math.atan2(y1 - my, x1 - mx);
    g.beginPath(); g.moveTo(x1 - Math.cos(b - 0.45) * 14, y1 - Math.sin(b - 0.45) * 14); g.lineTo(x1, y1); g.lineTo(x1 - Math.cos(b + 0.45) * 14, y1 - Math.sin(b + 0.45) * 14); g.stroke();
  }
  function speech(g, x, y, text, mono) {
    g.font = (mono ? '600 ' : '') + '12px "IBM Plex Mono", monospace';
    const w = g.measureText(text).width + 14, h = 22, bx = clamp(x - w / 2, 4, VW - w - 4), by = Math.max(4, y - h - 8);
    g.fillStyle = COL.card; g.strokeStyle = mono ? COL.rdeep : COL.ink; g.lineWidth = 1.5;
    g.beginPath(); g.rect(bx, by, w, h); g.fill(); g.stroke();
    g.beginPath(); g.moveTo(x - 5, by + h); g.lineTo(x, by + h + 7); g.lineTo(x + 5, by + h); g.fill();
    g.beginPath(); g.moveTo(x - 5, by + h); g.lineTo(x, by + h + 7); g.lineTo(x + 5, by + h); g.stroke();
    g.fillStyle = mono ? COL.rdeep : COL.ink; g.textAlign = 'left'; g.fillText(text, bx + 7, by + 15);
  }

  function drawShard(g, u, frame) {
    // Platzhalter für E01 SHARD: Splitter auf zwei Stelzbeinen, Schlitzauge (Art-Register E01)
    const r = rng(u.seed + frame * 977), j = () => (r() - 0.5) * 2.4, x = u.x, y = u.y - 4, f = u.face;
    g.strokeStyle = COL.ink; g.lineWidth = 3; g.lineCap = 'round';
    const step = u.moving ? Math.sin(S.t * 9 + u.phase) * 4 : 0;
    g.beginPath(); g.moveTo(x - 6, y - 18); g.lineTo(x - 9 + step, y); g.moveTo(x + 6, y - 18); g.lineTo(x + 9 - step, y); g.stroke();
    g.fillStyle = COL.ink; g.beginPath();
    [[-12, -18], [-16, -38], [-5, -58], [4, -64], [15, -44], [11, -18]].forEach(([px, py], i) => (i ? g.lineTo : g.moveTo).call(g, x + px * f + j(), y + py + j()));
    g.closePath(); g.fill();
    g.fillStyle = COL.sheet; g.fillRect(x - 6, y - 44, 12, 3);
    g.strokeStyle = COL.sheet; g.lineWidth = 1; g.beginPath(); g.moveTo(x - 9 * f, y - 26); g.lineTo(x + 2 * f, y - 52); g.moveTo(x + 6 * f, y - 22); g.lineTo(x + 10 * f, y - 38); g.stroke();
    g.lineCap = 'butt';
  }

  function drawBuilding(g, b, now) {
    const q = rectOf(b), w = q.r - q.l, h = q.b - q.t, r = rng(b.id * 31 + Math.floor(now * BOIL_FPS) % 2);
    if (b.kind === 'brood') {
      g.fillStyle = COL.rust; g.strokeStyle = COL.rdeep; g.lineWidth = 2.5; g.beginPath();
      for (let i = 0; i < 6; i++) { const a = (i / 6) * Math.PI * 2; g.lineTo(b.x + Math.cos(a) * w * 0.56, b.y + 10 + Math.sin(a) * h * 0.3); }
      g.closePath(); g.fill(); g.stroke();
      g.fillStyle = COL.ink; g.beginPath();
      [[-38, 12], [-30, -40], [-8, -78], [10, -70], [34, -30], [38, 12]].forEach(([px, py], i) => (i ? g.lineTo : g.moveTo).call(g, b.x + px + (r() - 0.5) * 2, b.y + py + (r() - 0.5) * 2));
      g.closePath(); g.fill();
      const pulse = 0.5 + 0.5 * Math.sin(now * 3);
      g.fillStyle = `rgba(168,92,60,${0.5 + pulse * 0.5})`; g.fillRect(b.x - 14, b.y - 34, 28, 4);
    } else {
      g.fillStyle = COL.sheet; g.strokeStyle = COL.ink; g.lineWidth = 2.5;
      g.fillRect(q.l + 6, q.t + 6, w - 12, h - 12);
      g.beginPath(); g.rect(q.l + 6 + (r() - 0.5) * 2, q.t + 6 + (r() - 0.5) * 2, w - 12, h - 12); g.stroke();
      g.save(); g.beginPath(); g.rect(q.l + 6, q.t + 6, w - 12, h - 12); g.clip();
      g.strokeStyle = 'rgba(34,29,23,0.18)'; g.lineWidth = 1;
      for (let k = -h; k < w; k += 9) { g.beginPath(); g.moveTo(q.l + k, q.b); g.lineTo(q.l + k + h, q.t); g.stroke(); }
      g.restore();
      g.strokeStyle = COL.ink; g.lineWidth = 2.5; g.beginPath();
      if (b.kind === 'tokenizer') { // Trichter
        g.moveTo(b.x - w * 0.3, b.y - h * 0.25); g.lineTo(b.x + w * 0.3, b.y - h * 0.25); g.lineTo(b.x + w * 0.08, b.y + h * 0.1); g.lineTo(b.x - w * 0.08, b.y + h * 0.1); g.closePath();
        g.moveTo(b.x - w * 0.08, b.y + h * 0.1); g.lineTo(b.x - w * 0.08, b.y + h * 0.28); g.moveTo(b.x + w * 0.08, b.y + h * 0.1); g.lineTo(b.x + w * 0.08, b.y + h * 0.28);
      } else { // Amboss
        g.moveTo(b.x - w * 0.28, b.y - h * 0.05); g.lineTo(b.x + w * 0.3, b.y - h * 0.05); g.lineTo(b.x + w * 0.14, b.y + h * 0.08); g.lineTo(b.x + w * 0.1, b.y + h * 0.22); g.lineTo(b.x - w * 0.1, b.y + h * 0.22); g.lineTo(b.x - w * 0.14, b.y + h * 0.08); g.closePath();
      }
      g.stroke();
      // Sockelleiste in Teamfarbe
      g.fillStyle = COL.petrol; g.fillRect(q.l + 6, q.b - 12, w - 12, 6);
      const busy = S.queue[b.kind] && S.queue[b.kind].length;
      if (busy) { g.fillStyle = COL.gold; g.fillRect(q.l + 6, q.b - 12, (w - 12) * (S.queue[b.kind][0].t / TYPES[S.queue[b.kind][0].kind].time), 6); }
    }
    label(g, b.name + ' · Platzhalter', b.x, q.b + 14, b.team === 'orc' ? COL.inkSoft : COL.rdeep);
    if (b.hp < b.maxHp || now - b.hurtT < 2) hpBar(g, b.x, q.t - 8, w * 0.6, b.hp / b.maxHp, b.team);
  }

  function drawFog(g) {
    if (fogDirty) {
      const d = fogImg.data, W = MW + 2;
      for (let ty = 0; ty < MH + 2; ty++) for (let tx = 0; tx < W; tx++) {
        const i = (ty * W + tx) * 4, inMap = tx > 0 && ty > 0 && tx <= MW && ty <= MH, k = (ty - 1) * MW + (tx - 1);
        const a = !inMap || !exp[k] ? 255 : vis[k] ? 0 : 150; // leeres Papier · Bleistift · Tusche (GDD § 18)
        d[i] = 0xef; d[i + 1] = 0xe8; d[i + 2] = 0xd6; d[i + 3] = a;
      }
      fogCtx.putImageData(fogImg, 0, 0); fogDirty = false;
    }
    g.save(); g.beginPath(); g.rect(0, 0, WW, WH); g.clip();
    g.imageSmoothingEnabled = true; g.drawImage(fogCv, -TILE, -TILE, (MW + 2) * TILE, (MH + 2) * TILE);
    g.restore();
  }

  // ---------- HUD ----------
  const BUILD = ['executor', 'critic', 'crawler'];
  function setupHud() {
    $('build').innerHTML = BUILD.map(k => `<button class="bi" data-k="${k}" title="${TYPES[k].name} · ${TYPES[k].cost} ✦ · ${TYPES[k].time} s"><span class="wipe"></span><img src="${ART}${TYPES[k].file}_a.svg" alt=""><span class="q"></span><span class="cost">${TYPES[k].cost}</span><span class="nm">${TYPES[k].name}</span></button>`).join('');
    $('build').querySelectorAll('.bi').forEach(el => {
      el.onclick = () => enqueue(el.dataset.k);
      el.oncontextmenu = e => { e.preventDefault(); cancel(el.dataset.k); };
    });
    $('squads').addEventListener('click', e => {
      const c = e.target.closest('.sq'); if (!c) return;
      const n = +c.dataset.n;
      if (e.shiftKey || e.ctrlKey) bindSquad(n); else selectSquad(n);
    });
    document.querySelectorAll('.chip').forEach(el => el.onclick = () => key({ code: el.dataset.k, preventDefault() {} }));
    renderSquads();
  }
  function enqueue(k) {
    const T = TYPES[k], q = S.queue[T.from];
    if (!S.blds.some(b => b.kind === T.from && b.hp > 0)) return say(`${BLD[T.from].name.slice(4)} required.`, 'req');
    if (S.tokens < T.cost) return say('Insufficient tokens.', 'tok');
    if (q.length >= 5) return;
    S.tokens -= T.cost; q.push({ kind: k, t: 0 });
  }
  function cancel(k) {
    const T = TYPES[k], q = S.queue[T.from];
    for (let i = q.length - 1; i >= 0; i--) if (q[i].kind === k) { S.tokens += T.cost; q.splice(i, 1); return; }
  }
  function renderLog() { $('log').innerHTML = S.log.map(m => `<div>“${m}”</div>`).join(''); }
  function renderSquads() {
    $('squads').innerHTML = S.squads.map((sq, i) => {
      const n = i + 1, m = membersOf(n);
      if (!m.length) return `<div class="sq empty" data-n="${n}">[${n}] – leer<br><span class="cmp">Shift+${n}: Auswahl binden</span></div>`;
      const cnt = t => m.filter(u => u.type === t).length;
      const comp = ['executor', 'critic', 'crawler'].filter(cnt).map(t => `${TYPES[t].name.slice(0, 4)}×${cnt(t)}`).join(' ');
      const dir = sq.dir ? (sq.dir === 'HUNT' ? 'HUNT ANY' : sq.dir) : '';
      const chips = (m.some(u => u.type === 'critic') ? '<span class="ch">REVIEW-LOOP</span>' : '') + (sq.dir && S.t - sq.lastDirect >= FLOW_AFTER ? '<span class="ch flow">FLOW</span>' : '');
      return `<div class="sq${activeSquad === n ? ' on' : ''}" data-n="${n}"><div class="p">[${n}] &gt; ${dir}<span class="cur">▌</span></div><div class="cmp">${comp}</div><div>${chips}</div></div>`;
    }).join('');
  }
  let hudAcc = 0;
  function renderHud(dt, force) {
    hudAcc += dt; if (hudAcc < 0.2 && !force) return; hudAcc = 0;
    $('tokens').textContent = Math.floor(S.tokens);
    $('wave').textContent = S.over ? '–' : `${S.wave} · next ${Math.max(0, Math.ceil(S.nextWave - S.t))} s`;
    const br = S.blds.find(b => b.kind === 'brood');
    $('brood').textContent = br && br.hp > 0 ? `${Math.ceil(br.hp)} HP` : 'destroyed';
    $('build').querySelectorAll('.bi').forEach(el => {
      const k = el.dataset.k, T = TYPES[k], q = S.queue[T.from], mine = q.filter(x => x.kind === k).length;
      el.querySelector('.q').textContent = mine ? `×${mine}` : '';
      el.querySelector('.wipe').style.setProperty('--p', q[0] && q[0].kind === k ? q[0].t / T.time : 1);
      el.classList.toggle('off', S.tokens < T.cost || !S.blds.some(b => b.kind === T.from && b.hp > 0));
    });
    $('sel').innerHTML = sel.slice(0, 30).map(u => `<div class="pt" title="${TYPES[u.type].name}"><img src="${ART}${TYPES[u.type].file}_a.svg" alt=""><i><b style="width:${Math.round(100 * u.hp / u.maxHp)}%"></b></i></div>`).join('');
    renderSquads();
  }

  // ---------- Eingabe ----------
  let drag = null, hover = null, lastClick = { t: 0, type: null }, lastNum = { n: 0, t: 0 }, mouse = { x: -1, y: -1, in: false };
  const keys = new Set();

  function pick(sx, sy, team) {
    const w = toWorld(sx, sy);
    const list = S.units.filter(u => (team ? u.team === team : true) && (u.team === 'orc' || tileVisible(u.x, u.y))).sort((a, b) => b.y - a.y);
    for (const u of list) { const s = TYPES[u.type].box; if (Math.abs(w.x - u.x) < s * 0.32 && w.y < u.y + 8 && w.y > u.y - s * 0.8) return u; }
    if (team !== 'orc') for (const b of S.blds) { if (b.hp <= 0 || b.team === 'orc' || !seen(b)) continue; const q = rectOf(b); if (w.x > q.l && w.x < q.r && w.y > q.t - 40 && w.y < q.b) return b; }
    return null;
  }
  function setSel(list, add) {
    const t = performance.now() / 1000;
    const next = add ? [...new Set([...sel, ...list])] : list;
    next.forEach(u => { if (!sel.includes(u)) u.selT = t; });
    sel = next;
    if (list[0]) bubble(list[0], TYPES[list[0].type].lines[0]);
  }

  cv.addEventListener('contextmenu', e => e.preventDefault());
  cv.addEventListener('mousedown', e => {
    if (helpOpen) return closeHelp();
    const r = cv.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top;
    if (e.button === 1) { e.preventDefault(); drag = { pan: true, x0: x, y0: y, cx: cam.x, cy: cam.y }; return; }
    if (e.button === 0) {
      if (armA) { armA = false; updateCursor(); return command(x, y, true); }
      drag = { x0: x, y0: y, x1: x, y1: y, box: false, shift: e.shiftKey };
    }
    if (e.button === 2) command(x, y, false);
  });
  window.addEventListener('mousemove', e => {
    const r = cv.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top;
    mouse = { x, y, in: x >= 0 && y >= 0 && x < VW && y < VH };
    if (drag && drag.pan) { cam.x = drag.cx - (x - drag.x0) / cam.z; cam.y = drag.cy - (y - drag.y0) / cam.z; clampCam(); }
    else if (drag) { drag.x1 = x; drag.y1 = y; if (Math.hypot(x - drag.x0, y - drag.y0) > 6) drag.box = true; }
    hover = mouse.in && S ? pick(x, y, 'mono') : null;
    updateCursor();
  });
  window.addEventListener('mouseup', e => {
    if (!drag) return;
    const d = drag; drag = null;
    if (d.pan || e.button !== 0) return;
    if (d.box) {
      const a = toWorld(Math.min(d.x0, d.x1), Math.min(d.y0, d.y1)), b = toWorld(Math.max(d.x0, d.x1), Math.max(d.y0, d.y1));
      const got = S.units.filter(u => u.team === 'orc' && u.x >= a.x && u.x <= b.x && u.y - 20 >= a.y && u.y - 20 <= b.y);
      setSel(got, d.shift); activeSquad = squadOfSelection();
    } else {
      const u = pick(d.x0, d.y0, 'orc'), now = performance.now();
      if (u && lastClick.type === u.type && now - lastClick.t < 350) {
        setSel(S.units.filter(v => v.team === 'orc' && v.type === u.type && onScreen(v)), d.shift);
      } else if (u) {
        if (d.shift && sel.includes(u)) sel = sel.filter(v => v !== u); else setSel([u], d.shift);
      } else if (!d.shift) sel = [];
      lastClick = { t: now, type: u ? u.type : null };
      activeSquad = squadOfSelection();
    }
  });
  cv.addEventListener('wheel', e => {
    e.preventDefault();
    const i = ZOOMS.indexOf(cam.z), j = clamp(i + (e.deltaY < 0 ? 1 : -1), 0, ZOOMS.length - 1);
    if (i === j) return;
    const r = cv.getBoundingClientRect(), w = toWorld(e.clientX - r.left, e.clientY - r.top);
    cam.z = ZOOMS[j]; cam.x = w.x - (e.clientX - r.left) / cam.z; cam.y = w.y - (e.clientY - r.top) / cam.z; clampCam();
  }, { passive: false });

  const onScreen = u => { const p = toScreen(u.x, u.y); return p.x > 0 && p.y > 0 && p.x < VW && p.y < VH; };
  function squadOfSelection() { if (!sel.length) return 0; const n = sel[0].squad; return n && sel.every(u => u.squad === n) && membersOf(n).length === sel.length ? n : 0; }
  function updateCursor() { cv.classList.toggle('target', armA || !!(hover && sel.length)); $('chipA').classList.toggle('arm', armA); }

  function command(sx, sy, amove) {
    const units = sel.filter(alive);
    if (!units.length) return;
    const w = toWorld(sx, sy), enemy = !amove && pick(sx, sy, 'mono');
    if (enemy) {
      units.forEach(u => directOrder(u, TYPES[u.type].dmg ? { k: 'attack', t: enemy } : { k: 'move', x: enemy.x + (R() - 0.5) * TILE, y: enemy.y + TILE }));
      S.fx.push({ k: 'x', x: enemy.x, y: enemy.bld ? enemy.y : enemy.y - 20, t: S.t });
    } else {
      const f = S.fields.find(f => f.amount > 0 && Math.hypot(w.x - f.x, (w.y - f.y) / 0.72) < f.r);
      const crawlers = f ? units.filter(u => u.type === 'crawler') : [];
      crawlers.forEach(u => directOrder(u, { k: 'harvest', ph: 'go', f }));
      const rest = units.filter(u => !crawlers.includes(u));
      if (rest.length) moveGroup(rest, w.x, w.y, amove);
      const c = centroid(units);
      S.fx.push(amove ? { k: 'x', x: w.x, y: w.y, t: S.t } : { k: 'arrow', x0: c.x, y0: c.y - 10, x1: w.x, y1: w.y, t: S.t });
    }
    bubble(units[0], TYPES[units[0].type].lines[1]);
  }

  function bindSquad(n) {
    if (!sel.length) return say('Select agents first.', 'nosel');
    S.units.forEach(u => { if (u.squad === n) u.squad = 0; });
    sel.forEach(u => { u.squad = n; });
    S.squads[n - 1] = { dir: null, hold: null, lastDirect: S.t, explore: null };
    for (let i = 0; i < 5; i++) if (i !== n - 1 && !membersOf(i + 1).length) S.squads[i].dir = null;
    activeSquad = n; say(`Squad ${n} formed.`); renderSquads();
  }
  function selectSquad(n) {
    const m = membersOf(n);
    if (!m.length) return;
    const now = performance.now();
    if (lastNum.n === n && now - lastNum.t < 400) { const c = centroid(m); centerOn(c.x, c.y); }
    lastNum = { n, t: now };
    setSel(m, false); activeSquad = n; renderSquads();
  }

  function closeHelp() { helpOpen = false; paused = false; $('help').hidden = true; }
  function key(e) {
    if (helpOpen) { if (e.code !== 'KeyH' && e.code !== 'F1') { closeHelp(); return; } }
    const c = e.code, digit = /^Digit([1-5])$/.exec(c);
    if (digit) {
      e.preventDefault();
      const n = +digit[1];
      if (e.ctrlKey || e.shiftKey || e.metaKey) bindSquad(n); else selectSquad(n);
      return;
    }
    switch (c) {
      case 'KeyH': case 'F1': e.preventDefault(); helpOpen = !helpOpen; paused = helpOpen; $('help').hidden = !helpOpen; break;
      case 'KeyP': paused = !paused; break;
      case 'Escape': if (armA) armA = false; else if (sel.length) sel = []; else paused = !paused; updateCursor(); break;
      case 'KeyA': if (sel.length) { armA = !armA; updateCursor(); } break;
      case 'KeyS': sel.forEach(u => directOrder(u, null)); break;
      case 'KeyQ': issueDirective('EXPLORE'); break;
      case 'KeyW': issueDirective('HOLD'); break;
      case 'KeyE': issueDirective('HUNT'); break;
      case 'Backspace': e.preventDefault(); if (activeSquad) { S.squads[activeSquad - 1].dir = null; membersOf(activeSquad).forEach(u => { u.order = null; u.target = null; }); renderSquads(); } break;
      case 'ArrowLeft': case 'ArrowRight': case 'ArrowUp': case 'ArrowDown': e.preventDefault(); keys.add(c); break;
    }
  }
  window.addEventListener('keydown', key);
  window.addEventListener('keyup', e => keys.delete(e.code));
  window.addEventListener('blur', () => keys.clear());
  $('help').addEventListener('mousedown', closeHelp);

  function scrollCam(dt) {
    const sp = 900 * dt / cam.z, edge = 14;
    let dx = 0, dy = 0;
    if (keys.has('ArrowLeft')) dx -= 1; if (keys.has('ArrowRight')) dx += 1;
    if (keys.has('ArrowUp')) dy -= 1; if (keys.has('ArrowDown')) dy += 1;
    if (mouse.in && !drag && !helpOpen) {
      if (mouse.x < edge) dx -= 1; else if (mouse.x > VW - edge) dx += 1;
      if (mouse.y < edge) dy -= 1; else if (mouse.y > VH - edge) dy += 1;
    }
    if (dx || dy) { cam.x += dx * sp; cam.y += dy * sp; clampCam(); }
  }
  // ---------- Schleife ----------
  let last = performance.now();
  function frame(now) {
    const dt = Math.min(0.05, (now - last) / 1000); last = now;
    if (!paused) update(dt);
    scrollCam(dt);
    drawWorld();
    renderHud(dt);
    requestAnimationFrame(frame);
  }

  window.addEventListener('resize', resize);
  resize();
  newGame();
  setupHud();
  renderHud(0, true);
  ready.then(() => requestAnimationFrame(t => { last = t; frame(t); }));

  // Für den Rauchtest (smoke.mjs): Simulation vorspulen und Zustand lesen
  window.__truppe = {
    ready, get S() { return S; }, get sel() { return sel; }, cam,
    step(sec) { for (let t = 0; t < sec; t += 1 / 30) update(1 / 30); },
    toScreen, closeHelp, vis, exp, fogCv,
  };
})();
