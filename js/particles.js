/* ============================================================
   Varun G — Portfolio  ·  particles.js
   Hero neural-network canvas animation (AI motif)
   ============================================================ */
(function () {
  'use strict';

  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const ctx = canvas.getContext('2d');

  let width, height, dpr;
  let nodes = [];
  let rafId = null;
  const mouse = { x: null, y: null, radius: 140 };

  const COLOR = '220, 38, 38';      // primary red (rgb)
  const LINK_DIST = 130;            // max distance to draw a line

  function nodeCount() {
    // density scales with viewport, capped for perf
    return Math.min(90, Math.floor((width * height) / 16000));
  }

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = canvas.clientWidth;
    height = canvas.clientHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    initNodes();
  }

  function initNodes() {
    nodes = [];
    const count = nodeCount();
    for (let i = 0; i < count; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 1.8 + 1
      });
    }
  }

  function step() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i];

      // move
      n.x += n.vx;
      n.y += n.vy;

      // bounce off edges
      if (n.x < 0 || n.x > width) n.vx *= -1;
      if (n.y < 0 || n.y > height) n.vy *= -1;

      // mouse repulsion
      if (mouse.x !== null) {
        const dx = n.x - mouse.x;
        const dy = n.y - mouse.y;
        const dist = Math.hypot(dx, dy);
        if (dist < mouse.radius && dist > 0) {
          const force = (mouse.radius - dist) / mouse.radius;
          n.x += (dx / dist) * force * 2.2;
          n.y += (dy / dist) * force * 2.2;
        }
      }

      // draw node
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${COLOR}, 0.75)`;
      ctx.fill();

      // links
      for (let j = i + 1; j < nodes.length; j++) {
        const m = nodes[j];
        const dx = n.x - m.x;
        const dy = n.y - m.y;
        const dist = Math.hypot(dx, dy);
        if (dist < LINK_DIST) {
          const alpha = (1 - dist / LINK_DIST) * 0.35;
          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(m.x, m.y);
          ctx.strokeStyle = `rgba(${COLOR}, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }

    rafId = requestAnimationFrame(step);
  }

  // Pause when hero is offscreen for performance
  function observeVisibility() {
    const hero = document.getElementById('hero');
    if (!('IntersectionObserver' in window) || !hero) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          if (!rafId && !reduceMotion) step();
        } else if (rafId) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
      });
    }, { threshold: 0 });
    io.observe(hero);
  }

  // Events
  window.addEventListener('resize', debounce(resize, 200));
  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });
  canvas.addEventListener('mouseleave', () => { mouse.x = null; mouse.y = null; });

  function debounce(fn, wait) {
    let t;
    return function (...args) {
      clearTimeout(t);
      t = setTimeout(() => fn.apply(this, args), wait);
    };
  }

  // Init
  resize();
  if (reduceMotion) {
    step();                 // render one static frame
    cancelAnimationFrame(rafId);
    rafId = null;
  } else {
    step();
    observeVisibility();
  }
})();
