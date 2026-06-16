# Varun G — Portfolio Website: Detailed Plan

## Live URL
`https://varun-g-12.github.io/varun-portfolio/`

---

## File Structure
```
varun-portfolio/
├── index.html               # Single-page app entry point
├── css/
│   ├── style.css            # Layout, themes, components
│   └── animations.css       # All keyframe & transition rules
├── js/
│   ├── main.js              # Nav, scroll-reveal, skills, timeline
│   └── particles.js         # Hero canvas neural-network animation
├── assets/
│   └── images/
│       └── profile.jpg      # Placeholder (swap in your actual photo)
└── reference/               # (unchanged)
```

---

## Page Sections (Top → Bottom)

| #   | Section                | Content                                         |
| --- | ---------------------- | ----------------------------------------------- |
| 1   | **Navigation**         | Logo, nav links, hamburger (mobile)             |
| 2   | **Hero**               | Name, animated headline, summary, CTA buttons   |
| 3   | **About**              | Profile photo, bio summary, key stats           |
| 4   | **Experience**         | Animated vertical timeline — all 3 Merck roles  |
| 5   | **Projects**           | Card grid — 7 projects (main + custom section)  |
| 6   | **Skills**             | Grouped categories with animated progress rings |
| 7   | **Education & Awards** | 2-column layout — degrees + hackathon wins      |
| 8   | **Contact**            | Email + LinkedIn links only                     |
| 9   | **Footer**             | Copyright + quick links                         |

---

## Color Palette
```
Background:    #0a0a0f   (dark navy-black)
Surface:       #111118
Card:          #1a1a25
Primary Red:   #dc2626   (from resume)
Accent Red:    #ef4444   (hover/glow)
Text Primary:  #f1f5f9
Text Secondary:#94a3b8
Border:        rgba(255,255,255,0.07)
```

---

## Animations

| Animation                    | Where                      | How                                                     |
| ---------------------------- | -------------------------- | ------------------------------------------------------- |
| **Neural-network particles** | Hero background            | `<canvas>` — moving nodes + connecting lines (AI motif) |
| **Typewriter effect**        | "GenAI Developer" headline | CSS + JS char-by-char reveal                            |
| **Scroll-reveal**            | Every section              | `IntersectionObserver` → fade + slide-up                |
| **Timeline draw**            | Experience section         | CSS `stroke-dashoffset` animated on scroll              |
| **Progress rings**           | Skills section             | SVG circles animate to value on scroll                  |
| **3D card tilt**             | Project cards              | Vanilla JS `mousemove` perspective transform            |
| **Navbar blur**              | Sticky nav                 | `backdrop-filter` + background fade on scroll           |
| **CTA hover glow**           | Buttons                    | CSS `box-shadow` pulse                                  |

---

## Section Detail

### Hero
- Full-viewport, particle canvas backdrop
- `<h1>` Varun G → `<h2>` typewriter: "GenAI Developer"
- Subtitle pulled from summary (shortened)
- Two CTAs: "View Projects" (scroll) + "Get in Touch" (scroll)
- Icon links: LinkedIn · GitHub · Email

### About
- Left: profile photo (circular, border glow)
- Right: summary paragraph + 3 quick stats (`4+ yrs experience`, `2 hackathon awards`, `95% efficiency gains`)

### Experience — Animated Timeline
- Vertical centered line
- Cards alternate left/right on desktop, single column on mobile
- Each card: company badge, role title, period pill, bullet-point description

### Projects — Card Grid
- 7 cards: BrAIn · PACO · GRD · MiNE MCP · Text-to-SQL · MiNE Report Tool · Vibe Coding
- Each card: project name, period, 2-line description, tech-tag chips
- Click → modal overlay with full description
- Hover: lift + red glow border

### Skills — Progress Rings
- 5 grouped categories with circular SVG indicators (out of 5)
- Keyword chips below each ring
- Categories: Python · Generative AI · Cloud & DevOps · Web Dev · Project Mgmt

### Education & Awards — 2-column
- Left: B.Sc. Agriculture (7.25 CGPA), M.Sc. Agri-Statistics (8.2 CGPA)
- Right: Be Curious and Innovate Boldly Award + MITC Hackathon (both 2024, Runner-up)

### Contact
- Centered card with email mailto link + LinkedIn button
- Location badge: Bengaluru

---

## Tech Stack
- **HTML5** — semantic markup, single page
- **CSS3** — custom properties, grid, flexbox, keyframes
- **Vanilla JavaScript** — no frameworks, no build step
- **Google Fonts** — Inter (body) + JetBrains Mono (tech tags)
- **Canvas API** — particle system
- **IntersectionObserver API** — scroll-trigger animations
- **SVG** — animated skill rings

---

## GitHub Pages Deployment
- Deploy from `main` branch root (`/`)
- GitHub Actions workflow (optional, auto-deploy on push)
- `README.md` updated with live link

---

## Build Order (Implementation Sequence)

1. HTML skeleton — all sections stubbed with real content
2. CSS variables + reset + base typography
3. Navigation (sticky, scroll-aware, mobile menu)
4. Hero + particle canvas + typewriter
5. About section
6. Experience timeline + draw animation
7. Projects grid + modal
8. Skills rings
9. Education & Awards
10. Contact + Footer
11. Global scroll-reveal animations
12. Mobile responsiveness (breakpoints: 768px, 480px)
13. Performance pass (lazy load, debounce)
14. GitHub Pages config + push

---

## Assumptions & Notes
- **No profile photo yet** — a styled SVG avatar placeholder is used; drop in `assets/images/profile.jpg` to replace it.
- **Phone number** — omitted by default for privacy; request to include if desired.
- **Employer name (Merck)** — included as-is; flag if you prefer to keep it private.
- **MiNE MCP** — short description displayed with an "Ongoing exploration" badge.

---

## Layout Diagrams (ASCII)

### Navigation
```
╔══════════════════════════════════════════════════════════════╗
║                        NAVIGATION                            ║
║  [Varun G]   About  Experience  Projects  Skills  Contact    ║
╚══════════════════════════════════════════════════════════════╝
```

### Hero Section
```
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│   ·  ·    ·       ·    ·   ·         ·    ·      ·          │
│  ·    ·       ·      ·       ·    ·      ·    ·    neural   │
│          ·       ·      ·       ·      ·      ·   particles │
│   ·    ·    ·       ·     ┌──────────────────┐    ·         │
│  ·   ·    ·    ·    ·     │   Varun G        │  ·    ·      │
│      ·       ·    ·       │  ▌GenAI Dev▌     │     ·    ·  │
│   ·    ·  ·     ·   ·     │  Bengaluru       │  ·          │
│  ·   ·     ·  ·     ·     │  [Projects] [CV] │    ·    ·   │
│     ·    ·     ·   ·      └──────────────────┘  ·     ·    │
│   ·    ·    ·    ·     ·     ·    ·    ·    ·       ·       │
│                           HERO SECTION                       │
└──────────────────────────────────────────────────────────────┘
```

### About Section
```
┌──────────────────────────────────────────────────────────────┐
│                       ABOUT                                  │
│   ┌─────────┐   ┌────────────────────────────────────────┐  │
│   │  (   )  │   │ GenAI Developer specializing in        │  │
│   │  (photo)│   │ enterprise AI solutions with 4+ years  │  │
│   │  ╰───╯  │   │ of Python development...               │  │
│   └─────────┘   │                                        │  │
│                 │  [4+ yrs]   [2 awards]  [95% faster]   │  │
│                 └────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────┘
```

### Experience Section
```
┌──────────────────────────────────────────────────────────────┐
│                      EXPERIENCE                              │
│                                                              │
│  ┌─────────────┐          │                                  │
│  │ GenAI Dev   │──────────●  2024–Present                   │
│  │ Merck Group │          │                                  │
│  └─────────────┘          │                                  │
│                           │          ┌─────────────┐         │
│                           ●──────────│ Python Dev  │         │
│                           │  2021–24 │ Merck Group │         │
│                           │          └─────────────┘         │
│                           │                                  │
│  ┌─────────────┐          │                                  │
│  │ App Support │──────────●  2019–21                        │
│  │ Merck Group │          │                                  │
│  └─────────────┘          │                                  │
└──────────────────────────────────────────────────────────────┘
```

### Projects Section
```
┌──────────────────────────────────────────────────────────────┐
│                       PROJECTS                               │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │   BrAIn      │  │    PACO      │  │    GRD       │       │
│  │ AI Chatbot   │  │ Data Extract │  │ Doc Generate │       │
│  │ Apr23–Feb24  │  │ Dec23–Mar24  │  │ Aug24–Oct25  │       │
│  │[Langchain]   │  │[PyMuPDF]     │  │[GPT-4o]      │       │
│  │[Qdrant][AWS] │  │[GPT-4o]      │  │[AWS Textract]│       │
│  └──────────────┘  └──────────────┘  └──────────────┘       │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │  MiNE MCP    │  │ Text-to-SQL  │  │  MiNE Report │       │
│  │  POC/Explore │  │ Conv. App    │  │  Gen Tool    │       │
│  │  Aug25–Now   │  │  2023–2024   │  │  Oct25–Now   │       │
│  │[MCP Server]  │  │[Langgraph]   │  │[Multi-source]│       │
│  └──────────────┘  └──────────────┘  └──────────────┘       │
│                                                              │
│                    ┌──────────────┐                          │
│                    │ Vibe Coding  │                          │
│                    │ AI Dev Workfl│                          │
│                    │[Claude Code] │                          │
│                    └──────────────┘                          │
└──────────────────────────────────────────────────────────────┘
```

### Skills Section
```
┌──────────────────────────────────────────────────────────────┐
│                        SKILLS                                │
│                                                              │
│   ╭──────╮      ╭──────╮      ╭──────╮                      │
│   │ ████ │      │ ████ │      │ ██░░ │                      │
│   │ 4/5  │      │ 4/5  │      │ 2/5  │                      │
│   ╰──────╯      ╰──────╯      ╰──────╯                      │
│   Python      GenAI/LLM    Cloud & DevOps                    │
│   [Python]   [Langchain]   [AWS][Git]                        │
│              [Langgraph]   [Docker]                          │
│              [Prompts]                                       │
│                                                              │
│   ╭──────╮      ╭──────╮                                     │
│   │ ███░ │      │ ████ │                                     │
│   │ 3/5  │      │ 4/5  │                                     │
│   ╰──────╯      ╰──────╯                                     │
│  Web Dev      Project Mgmt                                   │
│  [Streamlit]  [Agile]                                        │
└──────────────────────────────────────────────────────────────┘
```

### Education & Awards Section
```
┌──────────────────────────────────────────────────────────────┐
│               EDUCATION            AWARDS                    │
│  ┌─────────────────────┐  ┌──────────────────────────────┐  │
│  │ M.Sc. Agri Stats    │  │ Be Curious & Innovate        │  │
│  │ G.K.V.K Bengaluru   │  │ Boldly Award                 │  │
│  │ 2016–2018 | 8.2     │  │ Runner-up · 2024             │  │
│  ├─────────────────────┤  ├──────────────────────────────┤  │
│  │ B.Sc. Agriculture   │  │ MITC Hackathon               │  │
│  │ UAS, Dharwad        │  │ Runner-up · 2024             │  │
│  │ 2012–2016 | 7.25    │  │                              │  │
│  └─────────────────────┘  └──────────────────────────────┘  │
└──────────────────────────────────────────────────────────────┘
```

### Contact Section
```
┌──────────────────────────────────────────────────────────────┐
│                       CONTACT                                │
│                                                              │
│              ┌───────────────────────────┐                   │
│              │  Bengaluru, India         │                   │
│              │                           │                   │
│              │  [✉ varungangu1@gmail.com]│                   │
│              │  [in LinkedIn Profile]    │                   │
│              └───────────────────────────┘                   │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

### Footer
```
╔══════════════════════════════════════════════════════════════╗
║              © 2025 Varun G · Built with HTML/CSS/JS        ║
╚══════════════════════════════════════════════════════════════╝
```
