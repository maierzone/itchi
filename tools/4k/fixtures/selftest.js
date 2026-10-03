// Toolchain self-test, not game content: WebGL2 quad + GLSL block + a short tone.
// Ends after 3 s or when the host aborts $.q (AbortSignal).
const c = $.c, g = c.getContext('webgl2'), a = $.a;
const sh = (type, src) => {
  const s = g.createShader(type);
  g.shaderSource(s, src);
  g.compileShader(s);
  if (!g.getShaderParameter(s, g.COMPILE_STATUS)) throw g.getShaderInfoLog(s);
  return s;
};
const p = g.createProgram();
g.attachShader(p, sh(g.VERTEX_SHADER, /*glsl*/ `#version 300 es
  void main() {
    // fullscreen triangle
    gl_Position = vec4(vec2(gl_VertexID & 1, gl_VertexID >> 1) * 4.0 - 1.0, 0.0, 1.0);
  }`));
g.attachShader(p, sh(g.FRAGMENT_SHADER, /*glsl*/ `#version 300 es
  precision highp float;
  uniform vec3 R; // width, height, time
  out vec4 o;
  void main() {
    vec2 u = gl_FragCoord.xy / R.xy;
    float bar = step(u.x, R.z / 3.0) * step(abs(u.y - 0.5), 0.01);
    o = vec4(mix(vec3(0.91, 0.88, 0.80), vec3(0.17, 0.16, 0.15), bar), 1.0);
  }`));
g.linkProgram(p);
g.useProgram(p);
const R = g.getUniformLocation(p, 'R');

const osc = a.createOscillator(), env = a.createGain();
osc.frequency.value = 220;
env.gain.setValueAtTime(0.2, a.currentTime);
env.gain.exponentialRampToValueAtTime(1e-3, a.currentTime + 1);
osc.connect(env).connect($.o);
osc.start();
osc.stop(a.currentTime + 1);

return new Promise((done) => {
  const t0 = performance.now();
  const frame = (t) => {
    t = (t - t0) / 1e3;
    g.viewport(0, 0, c.width, c.height);
    g.uniform3f(R, c.width, c.height, t);
    g.drawArrays(g.TRIANGLES, 0, 3);
    t < 3 && !$.q.aborted ? requestAnimationFrame(frame) : done();
  };
  requestAnimationFrame(frame);
});
