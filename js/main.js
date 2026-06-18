/* ============================================================
   Varun G — Portfolio  ·  main.js
   Preloader · Lenis smooth scroll · GSAP reveals + parallax ·
   Custom cursor · Nav · Typewriter · Projects + Modal · Skills ·
   Timeline · Counters · Scrollspy
   ============================================================ */
(function () {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouch = window.matchMedia('(hover: none)').matches;
  const hasGSAP = typeof window.gsap !== 'undefined';
  const hasST   = hasGSAP && typeof window.ScrollTrigger !== 'undefined';
  const hasLenis = typeof window.Lenis !== 'undefined';
  const animate = hasGSAP && !reduceMotion;

  const $  = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  // When motion is off / GSAP or ScrollTrigger missing, let CSS reveal everything.
  if (!animate || !hasST) document.documentElement.classList.add('no-anim');

  if (hasST) gsap.registerPlugin(ScrollTrigger);

  /* ---------------- DATA ---------------- */
  const PROJECTS = [
    {
      name: 'BrAIn (Breeze AI Navigator)',
      period: 'Apr 2023 – Feb 2024',
      badge: 'RAG Chatbot',
      short: 'AI chatbot over Breeze SOPs & training docs with an automated ingestion pipeline.',
      tags: ['Langchain', 'Qdrant', 'GPT-4o', 'AWS', 'Streamlit'],
      desc: 'Developed an AI chatbot with access to Breeze SOPs and training documents, supported by an automated data ingestion pipeline using AWS Lambda, S3, and SharePoint. Leveraging Azure OpenAI\'s text-embedding-3-large model and Qdrant DB, we built a vector store for efficient document retrieval. The chatbot’s interface was created using Streamlit with a Python and Langchain backend, incorporating multi-vector retrieval for parent-child document relationships and context-aware conversations using router and question-reframe chains. Powered by the GPT-4o model, the chatbot delivers accurate responses with a citation system providing page-level references from source documents.'
    },
    {
      name: 'PACO',
      period: 'Dec 2023 – Mar 2024',
      badge: 'Data Extraction',
      short: 'Protocol Analysis for Complexity Optimisation — structured extraction from Word & PDF.',
      tags: ['PyMuPDF', 'Unstructured', 'GPT-4o', 'Langchain'],
      desc: 'Developed an AI-powered application to extract structured data from unstructured Word and PDF documents, featuring a document-processing pipeline using PyMuPDF and the Unstructured library. The application included a user-friendly Streamlit interface for document uploading and result downloading. Custom system prompts were engineered for various extraction tasks, including JSON schema specifications, and Langchain\'s structured-output function ensured consistent JSON-formatted results. Powered by the GPT-4o model for high-accuracy information extraction, the app implemented a batch-processing system to parallelize tasks and improve efficiency. We also developed a conversion process to transform extracted JSON data into a downloadable Excel format for easy review.'
    },
    {
      name: 'GRD (Global Response Document)',
      period: 'Aug 2024 – Oct 2025',
      badge: '95% Faster',
      short: 'Generates Global Response Documents for HCPs — cut creation time from hours to minutes.',
      tags: ['PyMuPDF', 'AWS Textract', 'GPT-4o', 'Langchain'],
      desc: 'Developed an AI-powered application to generate Global Response Documents (GRDs) for healthcare professionals, reducing GRD creation time from 3–4 hours to just 10–20 minutes. The solution included a document preprocessing pipeline using PyMuPDF for text extraction and AWS Textract for table extraction. Tailored system prompts were created based on user-selected Therapeutic Area (TA), product, and GRD type, while a batch-processing system enabled efficient multi-page handling. Using a single-shot prompting approach, the application maintained a scientific tone and format. Integrated with GPT-4o via Langchain for extraction and summarization, the app featured a Streamlit UI, a citation system for page-level references, and downloadable Word output for seamless distribution and editing.'
    },
    {
      name: 'MiNE MCP',
      period: 'Aug 2025 – Present',
      badge: 'Ongoing exploration',
      short: 'MCP server setup for the MiNE project as an exploration / POC task.',
      tags: ['MCP Server', 'POC'],
      desc: 'Taken up the MCP (Model Context Protocol) server setup for the MiNE project as an exploration / POC task — investigating how MCP can standardize tool and data access for AI agents within the MiNE ecosystem.'
    },
    {
      name: 'Text-to-SQL Conversational App',
      period: '2023 – 2024',
      badge: 'Agentic',
      short: 'Natural-language queries on Foundry data tables via an agentic Langgraph workflow.',
      tags: ['Langgraph', 'GPT-4o', 'SQL', 'Streamlit'],
      desc: 'Developed a proof-of-concept application enabling natural-language queries on Foundry data tables, featuring a conversational AI system using GPT-4o and Langgraph for agentic workflows. A SQL query agent converts natural-language inputs into accurate SQL queries, supported by a custom tool to execute them on Foundry tables and retrieve relevant data. An answer agent analyzes query results and generates human-readable responses. The app includes a Streamlit interface, integrating table-schema information and custom system prompts to improve query accuracy and enhance data accessibility through natural language.'
    },
    {
      name: 'MiNE Report Generation Tool',
      period: 'Oct 2025 – Present',
      badge: 'Multi-source',
      short: 'Auto-generates reports from social media, scientific articles & medical data.',
      tags: ['Multi-source', 'Retrieval', 'GenAI'],
      desc: 'Built an AI-powered tool that automatically creates reports by gathering information from multiple sources (social media, scientific articles, and medical data). Designed a two-step process: first, the system extracts key information from user questions to quickly filter through millions of database records; second, it uses smart retrieval methods to find the most relevant data and generate accurate reports.'
    },
    {
      name: 'Vibe Coding',
      period: 'Personal exploration',
      badge: 'Research',
      short: 'Exploring AI-powered dev workflows with Claude Code\'s "vibe coding" approach.',
      tags: ['Claude Code', 'AI Workflow', 'UI'],
      link: 'https://varun-g-12.github.io/ResumeWebsite/',
      desc: 'Conducted an independent research project exploring AI-powered development workflows by leveraging Claude Code\'s "vibe coding" approach — investigating how developers with limited UI experience can utilize AI coding assistants to build fully functional user interfaces.'
    }
  ];

  const SKILLS = [
    { name: 'Programming', level: 4, chips: ['Python'] },
    { name: 'Generative AI', level: 4, chips: ['LLMs', 'Prompt Eng.', 'Langchain', 'Langgraph'] },
    { name: 'Cloud & DevOps', level: 2, chips: ['AWS', 'Git', 'Docker'] },
    { name: 'Web Development', level: 3, chips: ['Streamlit'] },
    { name: 'Project Mgmt', level: 4, chips: ['Agile'] }
  ];

  /* ---------------- PRELOADER ---------------- */
  (function preloader() {
    const pre = $('#preloader');
    if (!pre) return;
    const countEl = $('.preloader__count', pre);
    const barEl = $('.preloader__bar', pre);

    const dismiss = () => {
      pre.classList.add('done');
      document.body.classList.remove('loading');
      startHero();
    };

    if (!animate) { dismiss(); return; }

    document.body.classList.add('loading');
    const obj = { v: 0 };
    gsap.to(obj, {
      v: 100, duration: 1.1, ease: 'power2.out',
      onUpdate: () => {
        const n = Math.round(obj.v);
        if (countEl) countEl.innerHTML = n + '<span>%</span>';
        if (barEl) barEl.style.width = n + '%';
      },
      onComplete: () => gsap.to(pre, { duration: 0.1, onComplete: dismiss })
    });
  })();

  /* ---------------- LENIS SMOOTH SCROLL ---------------- */
  let lenis = null;
  if (hasLenis && !reduceMotion && !isTouch) {
    lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    if (hasST) {
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
    } else {
      const raf = (t) => { lenis.raf(t); requestAnimationFrame(raf); };
      requestAnimationFrame(raf);
    }
  }
  const scrollToId = (id) => {
    const el = document.querySelector(id);
    if (!el) return;
    if (lenis) lenis.scrollTo(el, { offset: -70 });
    else el.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
  };

  /* ---------------- CUSTOM CURSOR ---------------- */
  (function cursor() {
    if (reduceMotion || isTouch) return;
    const dot = $('.cursor-dot');
    const ring = $('.cursor-ring');
    if (!dot || !ring) return;
    document.body.classList.add('cursor-ready');

    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let rx = mx, ry = my;
    let shown = false;

    window.addEventListener('mousemove', (e) => {
      mx = e.clientX; my = e.clientY;
      if (!shown) { shown = true; dot.style.opacity = ring.style.opacity = '1'; }
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
    });

    (function follow() {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      requestAnimationFrame(follow);
    })();

    const hoverSel = 'a, button, [role="button"], .project-card, .magnetic';
    document.addEventListener('mouseover', (e) => {
      if (e.target.closest(hoverSel)) ring.classList.add('is-hover');
    });
    document.addEventListener('mouseout', (e) => {
      if (e.target.closest(hoverSel)) ring.classList.remove('is-hover');
    });
    document.addEventListener('mouseleave', () => { dot.style.opacity = ring.style.opacity = '0'; });
  })();

  /* ---------------- NAV ---------------- */
  const nav = $('#nav');
  const navToggle = $('#navToggle');
  const navLinks = $('#navLinks');

  const onScroll = () => nav.classList.toggle('nav--scrolled', window.scrollY > 30);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  navToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    navToggle.classList.toggle('open', open);
    navToggle.setAttribute('aria-expanded', String(open));
  });
  $$('.nav__link', navLinks).forEach((a) =>
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (href && href.startsWith('#')) { e.preventDefault(); scrollToId(href); }
      navLinks.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    })
  );
  // In-page anchor links (hero CTAs, footer, scroll cue)
  $$('a[href^="#"]').forEach((a) => {
    if (a.classList.contains('nav__link')) return;
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (href.length > 1) { e.preventDefault(); scrollToId(href); }
    });
  });

  /* ---------------- HERO ENTRANCE + TYPEWRITER ---------------- */
  function splitName() {
    const el = $('#heroName');
    if (!el || el.dataset.split) return;
    const text = el.textContent.trim();
    el.textContent = '';
    [...text].forEach((ch) => {
      const span = document.createElement('span');
      span.className = 'char';
      span.textContent = ch === ' ' ? ' ' : ch;
      el.appendChild(span);
    });
    el.dataset.split = '1';
  }

  function startHero() {
    if (animate) {
      splitName();
      const tl = gsap.timeline();
      tl.from('.hero__eyebrow', { y: 20, opacity: 0, duration: 0.6, ease: 'power3.out' })
        .from('#heroName .char', { yPercent: 110, opacity: 0, duration: 0.8, stagger: 0.04, ease: 'power4.out' }, '-=0.2')
        .from('.hero__role', { y: 20, opacity: 0, duration: 0.6 }, '-=0.3')
        .from('.hero__summary', { y: 20, opacity: 0, duration: 0.6 }, '-=0.35')
        .from('.hero__cta', { y: 20, opacity: 0, duration: 0.6 }, '-=0.4')
        .from('.hero__socials', { y: 20, opacity: 0, duration: 0.6 }, '-=0.45');
    }
    typewriter();
  };

  function typewriter() {
    const el = $('#typed');
    if (!el) return;
    const words = ['GenAI Developer', 'RAG Architect', 'Python Engineer', 'AI Innovator'];
    if (reduceMotion) { el.textContent = words[0]; return; }
    let w = 0, c = 0, deleting = false;
    (function tick() {
      const word = words[w];
      c += deleting ? -1 : 1;
      el.textContent = word.slice(0, c);
      let delay = deleting ? 55 : 110;
      if (!deleting && c === word.length) { delay = 1600; deleting = true; }
      else if (deleting && c === 0) { deleting = false; w = (w + 1) % words.length; delay = 350; }
      setTimeout(tick, delay);
    })();
  }
  // If there is no preloader-driven start (reduced motion already dismissed), kick off.
  if (!$('#preloader')) startHero();

  /* ---------------- RENDER PROJECTS ---------------- */
  (function renderProjects() {
    const grid = $('#projectsGrid');
    if (!grid) return;
    PROJECTS.forEach((p, i) => {
      const card = document.createElement('article');
      card.className = 'project-card';
      card.dataset.index = i;
      card.setAttribute('data-reveal', '');
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'button');
      card.setAttribute('aria-label', `Open details for ${p.name}`);
      card.innerHTML = `
        <div class="project-card__head">
          <h3 class="project-card__name">${p.name}</h3>
          <span class="project-card__badge">${p.badge}</span>
        </div>
        <span class="project-card__period">${p.period}</span>
        <p class="project-card__desc">${p.short}</p>
        <div class="project-card__tags">
          ${p.tags.map((t) => `<span class="tag">${t}</span>`).join('')}
        </div>
        <div class="project-card__more">View details <span aria-hidden="true">→</span></div>
      `;
      card.addEventListener('click', () => openModal(p));
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openModal(p); }
      });
      // spotlight follows pointer
      card.addEventListener('mousemove', (e) => {
        const r = card.getBoundingClientRect();
        card.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`);
        card.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`);
      });
      grid.appendChild(card);
    });
  })();

  /* ---------------- RENDER SKILLS ---------------- */
  (function renderSkills() {
    const grid = $('#skillsGrid');
    if (!grid) return;
    const R = 45, CIRC = 2 * Math.PI * R; // ~283
    SKILLS.forEach((s) => {
      const pct = s.level / 5;
      const skill = document.createElement('div');
      skill.className = 'skill';
      skill.setAttribute('data-reveal', '');
      skill.innerHTML = `
        <div class="skill__ring">
          <svg width="112" height="112" viewBox="0 0 110 110">
            <circle class="skill__track" cx="55" cy="55" r="${R}"></circle>
            <circle class="skill__bar" cx="55" cy="55" r="${R}"
              style="stroke-dasharray:${CIRC.toFixed(0)}; stroke-dashoffset:${CIRC.toFixed(0)};"
              data-offset="${(CIRC * (1 - pct)).toFixed(1)}"></circle>
          </svg>
          <div class="skill__value"><span class="skill__level">${s.level}</span><span class="skill__max">/5</span></div>
        </div>
        <h4 class="skill__name">${s.name}</h4>
        <div class="skill__chips">
          ${s.chips.map((c) => `<span class="tag">${c}</span>`).join('')}
        </div>
      `;
      grid.appendChild(skill);
    });
  })();

  /* ---------------- MODAL ---------------- */
  const modal = $('#modal');
  const modalTitle = $('#modalTitle');
  const modalPeriod = $('#modalPeriod');
  const modalDesc = $('#modalDesc');
  const modalTags = $('#modalTags');
  let lastFocused = null;

  function openModal(p) {
    lastFocused = document.activeElement;
    modalTitle.textContent = p.name;
    modalPeriod.textContent = p.period;
    modalDesc.textContent = p.desc;
    modalTags.innerHTML = p.tags.map((t) => `<span class="tag">${t}</span>`).join('') +
      (p.link ? `<a class="btn btn--ghost" style="margin-left:0.5rem" href="${p.link}" target="_blank" rel="noopener">Visit ↗</a>` : '');
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (lenis) lenis.stop();
    $('.modal__close', modal).focus();
  }
  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lenis) lenis.start();
    if (lastFocused) lastFocused.focus();
  }
  $$('[data-close]', modal).forEach((el) => el.addEventListener('click', closeModal));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
  });

  /* ---------------- SCROLL REVEALS + PARALLAX (GSAP) ---------------- */
  if (animate && hasST) {
    $$('[data-reveal]').forEach((el) => {
      gsap.fromTo(el,
        { y: 36, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true }
        });
    });
    // Parallax panels
    $$('[data-speed]').forEach((el) => {
      const speed = parseFloat(el.dataset.speed) || 0;
      gsap.to(el, {
        yPercent: speed * -12,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true }
      });
    });
  }

  /* ---------------- SKILL RINGS ANIMATE ---------------- */
  (function skillObserver() {
    const grid = $('#skillsGrid');
    if (!grid) return;
    const run = () => $$('.skill__bar', grid).forEach((bar) => { bar.style.strokeDashoffset = bar.dataset.offset; });
    if ('IntersectionObserver' in window && !reduceMotion) {
      const io = new IntersectionObserver((entries, obs) => {
        entries.forEach((e) => { if (e.isIntersecting) { run(); obs.disconnect(); } });
      }, { threshold: 0.3 });
      io.observe(grid);
    } else { run(); }
  })();

  /* ---------------- TIMELINE PROGRESS LINE ---------------- */
  (function timelineProgress() {
    const timeline = $('#timeline');
    if (!timeline) return;
    const bar = document.createElement('div');
    bar.className = 'timeline__progress';
    timeline.appendChild(bar);
    const items = $$('.timeline__item', timeline);
    const update = () => {
      const rect = timeline.getBoundingClientRect();
      const vh = window.innerHeight;
      let progress = (-(rect.top - vh * 0.5)) / rect.height;
      progress = Math.max(0, Math.min(1, progress));
      bar.style.height = `${progress * 100}%`;
      items.forEach((item) => {
        item.classList.toggle('in-view', item.getBoundingClientRect().top < vh * 0.75);
      });
    };
    window.addEventListener('scroll', update, { passive: true });
    update();
  })();

  /* ---------------- STAT COUNTERS ---------------- */
  (function counters() {
    const stats = $$('.stat__num');
    if (!stats.length) return;
    const run = (el) => {
      const target = +el.dataset.count;
      const suffix = el.dataset.suffix || '';
      if (reduceMotion) { el.textContent = target + suffix; return; }
      const dur = 1400, t0 = performance.now();
      const tick = (now) => {
        const p = Math.min((now - t0) / dur, 1);
        el.textContent = Math.round((1 - Math.pow(1 - p, 3)) * target) + suffix;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((e) => { if (e.isIntersecting) { run(e.target); io.unobserve(e.target); } });
      }, { threshold: 0.5 });
      stats.forEach((s) => io.observe(s));
    } else { stats.forEach(run); }
  })();

  /* ---------------- ACTIVE NAV LINK ---------------- */
  (function scrollSpy() {
    const sections = $$('section[id]');
    const links = $$('.nav__link');
    if (!('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          links.forEach((l) => l.classList.toggle('active', l.getAttribute('href') === `#${e.target.id}`));
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    sections.forEach((s) => io.observe(s));
  })();

  /* ---------------- FOOTER YEAR ---------------- */
  const yearEl = $('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

})();
