// Host self-test for drawing layers, not game content: run with fixtures/layers.json.
// Left the whole figure U01a, right the same figure from its layers in paint order:
// the face blinks, the arm swings about its shoulder. Ends after 3 s or on $.q.
const c = $.c, x = c.getContext('2d'), d = $.d;
return new Promise((done) => {
  const t0 = performance.now();
  const frame = (t) => {
    t = (t - t0) / 1e3;
    const f = d.U01a, s = c.height / f.height / 1.4, w = f.width * s, h = f.height * s, y = (c.height - h) / 2;
    const X = c.width / 2 + 20;
    x.setTransform(1, 0, 0, 1, 0, 0);
    x.fillStyle = '#efe8d6';
    x.fillRect(0, 0, c.width, c.height);
    x.drawImage(f, c.width / 2 - w - 20, y, w, h);
    for (const id of ['tank', 'tread', 'body', 'face', 'sign', 'detail']) {
      if (id != 'face' || t % 1 < 0.8) x.drawImage(d['U01a.' + id], X, y, w, h);
    }
    // shoulder at (240, 290) in the 400 viewBox; the layer keeps the full frame
    x.translate(X + 0.6 * w, y + 0.725 * h);
    x.rotate(Math.sin(t * 4) * 0.4);
    x.drawImage(d['U01a.arm'], -0.6 * w, -0.725 * h, w, h);
    t < 3 && !$.q.aborted ? requestAnimationFrame(frame) : done();
  };
  requestAnimationFrame(frame);
});
