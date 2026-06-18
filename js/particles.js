/* ============================================================
   Varun G — Portfolio  ·  background (loaded as particles.js)
   WebGL aurora gradient-mesh for the hero canvas.
   Falls back to a static CSS gradient on no-WebGL / reduced-motion.
   ============================================================ */
(function () {
  'use strict';

  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Static fallback: hide canvas, let CSS paint the aurora.
  function fallback() {
    canvas.style.display = 'none';
    document.documentElement.classList.add('no-webgl');
  }

  if (reduceMotion) { fallback(); return; }

  let gl;
  try {
    gl = canvas.getContext('webgl', { antialias: true, alpha: true, premultipliedAlpha: false }) ||
         canvas.getContext('experimental-webgl');
  } catch (e) { /* ignore */ }
  if (!gl) { fallback(); return; }

  /* ---------- Shaders ---------- */
  const VERT = `
    attribute vec2 aPos;
    void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
  `;

  // FBM simplex-style noise → flowing aurora mesh in indigo → teal → lime.
  const FRAG = `
    precision highp float;
    uniform vec2  uRes;
    uniform float uTime;

    vec3 permute(vec3 x){ return mod(((x*34.0)+1.0)*x, 289.0); }
    float snoise(vec2 v){
      const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                         -0.577350269189626, 0.024390243902439);
      vec2 i  = floor(v + dot(v, C.yy));
      vec2 x0 = v - i + dot(i, C.xx);
      vec2 i1 = (x0.x > x0.y) ? vec2(1.0,0.0) : vec2(0.0,1.0);
      vec4 x12 = x0.xyxy + C.xxzz; x12.xy -= i1;
      i = mod(i, 289.0);
      vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
                              + i.x + vec3(0.0, i1.x, 1.0));
      vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
                              dot(x12.zw,x12.zw)), 0.0);
      m = m*m; m = m*m;
      vec3 x = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 ox = floor(x + 0.5);
      vec3 a0 = x - ox;
      m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
      vec3 g;
      g.x  = a0.x  * x0.x  + h.x  * x0.y;
      g.yz = a0.yz * x12.xz + h.yz * x12.yw;
      return 130.0 * dot(m, g);
    }

    float fbm(vec2 p){
      float v = 0.0, a = 0.5;
      for (int i = 0; i < 5; i++){
        v += a * snoise(p);
        p *= 2.0; a *= 0.5;
      }
      return v;
    }

    void main(){
      vec2 uv = gl_FragCoord.xy / uRes.xy;
      vec2 p  = uv;
      p.x *= uRes.x / uRes.y;

      float t = uTime * 0.04;
      float n  = fbm(p * 1.6 + vec2(t, t * 0.7));
      float n2 = fbm(p * 2.4 - vec2(t * 0.6, t));

      // Palette: deep base → indigo → teal → faint electric lime
      vec3 base   = vec3(0.031, 0.035, 0.047);   // #08090c
      vec3 indigo = vec3(0.105, 0.121, 0.227);   // #1b1f3a
      vec3 teal   = vec3(0.058, 0.239, 0.227);   // #0f3d3a
      vec3 lime   = vec3(0.776, 0.949, 0.305);   // #c6f24e

      vec3 col = base;
      col = mix(col, indigo, smoothstep(-0.2, 0.9, n));
      col = mix(col, teal,   smoothstep(0.1, 1.0, n2) * 0.55);
      col = mix(col, lime,   smoothstep(0.78, 1.0, n) * 0.10);

      // Radial vignette so content stays readable
      float d = distance(uv, vec2(0.62, 0.45));
      col *= 1.0 - smoothstep(0.35, 1.05, d) * 0.85;

      gl_FragColor = vec4(col, 1.0);
    }
  `;

  function compile(type, src) {
    const s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
      console.warn('Shader error:', gl.getShaderInfoLog(s));
      return null;
    }
    return s;
  }

  const vs = compile(gl.VERTEX_SHADER, VERT);
  const fs = compile(gl.FRAGMENT_SHADER, FRAG);
  if (!vs || !fs) { fallback(); return; }

  const prog = gl.createProgram();
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) { fallback(); return; }
  gl.useProgram(prog);

  // Full-screen quad
  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER,
    new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);
  const aPos = gl.getAttribLocation(prog, 'aPos');
  gl.enableVertexAttribArray(aPos);
  gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

  const uRes  = gl.getUniformLocation(prog, 'uRes');
  const uTime = gl.getUniformLocation(prog, 'uTime');

  const DPR = Math.min(window.devicePixelRatio || 1, 1.5);
  function resize() {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    canvas.width  = Math.max(1, Math.floor(w * DPR));
    canvas.height = Math.max(1, Math.floor(h * DPR));
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.uniform2f(uRes, canvas.width, canvas.height);
  }
  window.addEventListener('resize', resize, { passive: true });
  resize();

  // Render only while the hero is on screen (perf).
  let visible = true, running = true, raf = 0;
  const hero = document.getElementById('hero');
  if (hero && 'IntersectionObserver' in window) {
    new IntersectionObserver((entries) => {
      visible = entries[0].isIntersecting;
      if (visible && running && !raf) raf = requestAnimationFrame(frame);
    }, { threshold: 0 }).observe(hero);
  }
  document.addEventListener('visibilitychange', () => {
    running = !document.hidden;
    if (running && visible && !raf) raf = requestAnimationFrame(frame);
  });

  const start = performance.now();
  function frame(now) {
    raf = 0;
    if (!visible || !running) return;
    gl.uniform1f(uTime, (now - start) / 1000);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    raf = requestAnimationFrame(frame);
  }
  raf = requestAnimationFrame(frame);
})();
