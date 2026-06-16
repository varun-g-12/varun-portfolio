/* ============================================================
   Varun G — Portfolio  ·  main.js
   Nav · Typewriter · Scroll-reveal · Skills · Timeline ·
   Projects + Modal · Card tilt · Counters
   ============================================================ */
(function () {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $  = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  /* ---------------- DATA ---------------- */
  const PROJECTS = [
    {
      name: 'BrAIn (Breeze AI Navigator)',
      period: 'Apr 2023 – Feb 2024',
      badge: 'RAG Chatbot',
      short: 'AI chatbot over Breeze SOPs & training docs with an automated ingestion pipeline.',
      tags: ['Langchain', 'Qdrant', 'GPT-4o', 'AWS', 'Streamlit'],
      desc: 'Developed an AI chatbot with access to Breeze SOPs and training documents, supported by an automated data ingestion pipeline using AWS Lambda, S3, and SharePoint. Leveraging Azure OpenAI\'s text-embedding-3-large model and Qdrant DB, we built a vector store for efficient document retrieval. The chatbot\u2019s interface was created using Streamlit with a Python and Langchain backend, incorporating multi-vector retrieval for parent-child document relationships and context-aware conversations using router and question-reframe chains. Powered by the GPT-4o model, the chatbot delivers accurate responses with a citation system providing page-level references from source documents.'
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
      desc: 'Developed an AI-powered application to generate Global Response Documents (GRDs) for healthcare professionals, reducing GRD creation time from 3\u20134 hours to just 10\u201320 minutes. The solution included a document preprocessing pipeline using PyMuPDF for text extraction and AWS Textract for table extraction. Tailored system prompts were created based on user-selected Therapeutic Area (TA), product, and GRD type, while a batch-processing system enabled efficient multi-page handling. Using a single-shot prompting approach, the application maintained a scientific tone and format. Integrated with GPT-4o via Langchain for extraction and summarization, the app featured a Streamlit UI, a citation system for page-level references, and downloadable Word output for seamless distribution and editing.'
    },
    {
      name: 'MiNE MCP',
      period: 'Aug 2025 – Present',
      badge: 'Ongoing exploration',
      short: 'MCP server setup for the MiNE project as an exploration / POC task.',
      tags: ['MCP Server', 'POC'],
      desc: 'Taken up the MCP (Model Context Protocol) server setup for the MiNE project as an exploration / POC task \u2014 investigating how MCP can standardize tool and data access for AI agents within the MiNE ecosystem.'
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
      desc: 'Conducted an independent research project exploring AI-powered development workflows by leveraging Claude Code\'s "vibe coding" approach \u2014 investigating how developers with limited UI experience can utilize AI coding assistants to build fully functional user interfaces.'
    }
  ];

  const SKILLS = [
    { name: 'Programming', level: 4, chips: ['Python'] },
    { name: 'Generative AI', level: 4, chips: ['LLMs', 'Prompt Eng.', 'Langchain', 'Langgraph'] },
    { name: 'Cloud & DevOps', level: 2, chips: ['AWS', 'Git', 'Docker'] },
    { name: 'Web Development', level: 3, chips: ['Streamlit'] },
    { name: 'Project Mgmt', level: 4, chips: ['Agile'] }
  ];

  /* ---------------- NAV ---------------- */
  const nav = $('#nav');
  const navToggle = $('#navToggle');
  const navLinks = $('#navLinks');

  const onScroll = () => {
    nav.classList.toggle('nav--scrolled', window.scrollY > 30);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  navToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    navToggle.classList.toggle('open', open);
    navToggle.setAttribute('aria-expanded', String(open));
  });
  $$('.nav__link', navLinks).forEach((a) =>
    a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    })
  );

  /* ---------------- TYPEWRITER ---------------- */
  (function typewriter() {
    const el = $('#typed');
    if (!el) return;
    const words = ['GenAI Developer', 'RAG Architect', 'Python Engineer', 'AI Innovator'];
    if (reduceMotion) { el.textContent = words[0]; return; }

    let w = 0, c = 0, deleting = false;
    function tick() {
      const word = words[w];
      c += deleting ? -1 : 1;
      el.textContent = word.slice(0, c);

      let delay = deleting ? 55 : 110;
      if (!deleting && c === word.length) { delay = 1600; deleting = true; }
      else if (deleting && c === 0) { deleting = false; w = (w + 1) % words.length; delay = 350; }
      setTimeout(tick, delay);
    }
    tick();
  })();

  /* ---------------- RENDER PROJECTS ---------------- */
  (function renderProjects() {
    const grid = $('#projectsGrid');
    if (!grid) return;
    PROJECTS.forEach((p, i) => {
      const card = document.createElement('article');
      card.className = 'project-card reveal';
      card.dataset.index = i;
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
        <div class="project-card__more">View details →</div>
      `;
      card.addEventListener('click', () => openModal(p));
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openModal(p); }
      });
      grid.appendChild(card);
    });
    attachTilt();
  })();

  /* ---------------- RENDER SKILLS ---------------- */
  (function renderSkills() {
    const grid = $('#skillsGrid');
    if (!grid) return;
    const R = 45, CIRC = 2 * Math.PI * R; // 283
    SKILLS.forEach((s) => {
      const pct = s.level / 5;
      const skill = document.createElement('div');
      skill.className = 'skill reveal';
      skill.innerHTML = `
        <div class="skill__ring">
          <svg width="110" height="110" viewBox="0 0 110 110">
            <circle class="skill__track" cx="55" cy="55" r="${R}"></circle>
            <circle class="skill__bar" cx="55" cy="55" r="${R}"
              style="stroke-dasharray:${CIRC.toFixed(0)}; stroke-dashoffset:${CIRC.toFixed(0)};"
              data-offset="${(CIRC * (1 - pct)).toFixed(1)}"></circle>
          </svg>
          <div class="skill__value">${s.level}<span>/5</span></div>
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
      (p.link ? `<a class="btn btn--ghost" style="margin-top:1rem" href="${p.link}" target="_blank" rel="noopener">Visit ↗</a>` : '');
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    $('.modal__close', modal).focus();
  }
  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastFocused) lastFocused.focus();
  }
  $$('[data-close]', modal).forEach((el) => el.addEventListener('click', closeModal));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
  });

  /* ---------------- 3D CARD TILT ---------------- */
  function attachTilt() {
    if (reduceMotion || window.matchMedia('(hover: none)').matches) return;
    $$('.project-card').forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        const rx = (py - 0.5) * -8;
        const ry = (px - 0.5) * 8;
        card.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
        card.style.setProperty('--mx', `${px * 100}%`);
        card.style.setProperty('--my', `${py * 100}%`);
      });
      card.addEventListener('mouseleave', () => { card.style.transform = ''; });
    });
  }

  /* ---------------- SCROLL-REVEAL ---------------- */
  const revealEls = $$('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in-view');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('in-view'));
  }

  /* ---------------- SKILL RINGS ANIMATE ---------------- */
  (function skillObserver() {
    const grid = $('#skillsGrid');
    if (!grid) return;
    const animate = () => $$('.skill__bar', grid).forEach((bar) => {
      bar.style.strokeDashoffset = bar.dataset.offset;
    });
    if ('IntersectionObserver' in window && !reduceMotion) {
      const io = new IntersectionObserver((entries, obs) => {
        entries.forEach((e) => {
          if (e.isIntersecting) { animate(); obs.disconnect(); }
        });
      }, { threshold: 0.3 });
      io.observe(grid);
    } else {
      animate();
    }
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
      const start = rect.top - vh * 0.5;
      const total = rect.height;
      let progress = (-start) / total;
      progress = Math.max(0, Math.min(1, progress));
      bar.style.height = `${progress * 100}%`;

      items.forEach((item) => {
        const ir = item.getBoundingClientRect();
        item.classList.toggle('in-view', ir.top < vh * 0.75);
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
      const dur = 1400;
      const t0 = performance.now();
      const tick = (now) => {
        const p = Math.min((now - t0) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(eased * target) + suffix;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) { run(e.target); io.unobserve(e.target); }
        });
      }, { threshold: 0.5 });
      stats.forEach((s) => io.observe(s));
    } else {
      stats.forEach(run);
    }
  })();

  /* ---------------- ACTIVE NAV LINK ---------------- */
  (function scrollSpy() {
    const sections = $$('section[id]');
    const links = $$('.nav__link');
    if (!('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const id = e.target.id;
          links.forEach((l) =>
            l.classList.toggle('active', l.getAttribute('href') === `#${id}`)
          );
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    sections.forEach((s) => io.observe(s));
  })();

  /* ---------------- FOOTER YEAR ---------------- */
  const yearEl = $('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

})();
