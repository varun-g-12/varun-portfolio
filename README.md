# Varun G — Portfolio

A single-page portfolio website for **Varun G**, GenAI Developer.

**Live:** https://varun-g-12.github.io/varun-portfolio/

## Stack
- HTML5 (semantic, single page)
- CSS3 (custom properties, grid, flexbox, keyframes)
- Vanilla JavaScript (no frameworks, no build step)
- Canvas API — hero neural-network particles
- IntersectionObserver — scroll-triggered animations
- SVG — animated skill rings

## Structure
```
varun-portfolio/
├── index.html          # Entry point
├── css/
│   ├── style.css       # Layout, themes, components
│   └── animations.css  # Keyframes & transitions
├── js/
│   ├── main.js         # Nav, typewriter, reveal, skills, timeline, modal, tilt
│   └── particles.js    # Hero canvas animation
└── assets/images/      # Drop profile.jpg here to replace the avatar
```

## Local preview
Open `index.html` directly, or serve it:
```bash
python3 -m http.server 8000
# visit http://localhost:8000
```

## Deployment
Auto-deploys to GitHub Pages from `main` via the workflow in
`.github/workflows/deploy.yml`. You can also set Pages to "Deploy from a branch"
(`main` / root) in repository settings.

## Customization
- **Profile photo:** add `assets/images/profile.jpg` (a styled SVG avatar is used until then).
- **Colors:** edit the CSS custom properties in `css/style.css` (`:root`).
- **Content:** projects and skills are data-driven in `js/main.js`.
