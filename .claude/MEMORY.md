# Project Memory — Debmalya & Ankita Wedding Website

## What This Project Is
Personal wedding memory site for **Debmalya Pramanik** (groom) and **Ankita Santra** (bride).
HTML/CSS/JS with **Jekyll** for reusable layouts and includes. Hosted on GitHub Pages (auto-built on push).
NOT a photography studio site — no business copy, no services, no pricing, no contact form, no team/staff.

## Couple Branding
- Groom: Debmalya Pramanik
- Bride: Ankita Santra
- Logo/monogram: "D & A" or "Debmalya & Ankita" in Cormorant Garamond Italic
- Wedding date: 15 · 12 · 2025 (15 December 2025)
- Copyright: © 2025 Debmalya Pramanik & Ankita Santra

## Key Design Tokens
- Colors: `#0a0a0a` bg · `#111111` alt-bg · `#1a1a1a` card · `#f5f5f0` text · `#b0a99a` secondary · `#c9a96e` gold accent · `#e8d5b0` pale gold · `#2a2a2a` border · `rgba(0,0,0,0.55)` hero overlay
- Fonts: `Cormorant Garamond` (headings, italic) + `Lato` (body, nav) via Google Fonts
- Max width: 1500px · Desktop gutter: 4vw · Mobile gutter: 6vw

## Pages (5 total — ALL BUILT)
- `index.html` — Home: video hero, quote, gallery preview (6 imgs), films/video slideshow (featured + carousel + Instagram modal), pre-wedding preview (3)
- `gallery.html` — Full gallery: infinite scroll, filter (All/Ceremony/Reception/Portraits/Details/Candid), lightbox
- `prewedding.html` — Gallery with GALLERY_OVERRIDE from `_data/gallery_prewedding.json`, filter (All/Beach/City/Nature/Studio)
- `collages.html` — Group Photos gallery with GALLERY_OVERRIDE from `_data/gallery_collages.json`, filter (All/Family/Friends/Bridal Party)
- `404.html` — Custom 404 with couple branding

## Jekyll Structure (ADDED)
```
_layouts/default.html     ← single layout: head, navbar include, {{ content }}, footer include, scripts
_includes/
  navbar.html             ← navbar + mobile drawer; uses page.nav_active for active mobile link
  footer.html             ← footer timeline + social links + bottom bar
  scroll-top.html         ← scroll-to-top button
  lightbox.html           ← lightbox modal
  page-hero.html          ← inner-page hero banner (parametrised include)
_data/
  gallery_prewedding.json ← GALLERY_OVERRIDE data for prewedding.html
  gallery_collages.json   ← GALLERY_OVERRIDE data for collages.html
_config.yml               ← Jekyll config (excludes .claude/, CLAUDE.md, Gemfile.lock, etc.)
Gemfile                   ← gem "github-pages"
```

## Key Front Matter Variables (per page)
- `layout: default` — always default
- `nav_active: home|gallery|prewedding|collages` — sets active class in mobile drawer
- `extra_css: [hero, gallery]` — page-specific CSS loaded between navbar.css and footer.css
- `extra_js: [hero, gallery]` — page-specific JS loaded after navbar.js
- `gallery_data: gallery_prewedding|gallery_collages` — key in _data/ for GALLERY_OVERRIDE
- `couple_shoot_mode: true` — sets window.COUPLE_SHOOT_MODE = true in <head> (prewedding only)
- `navbar_scrolled: true` — adds scrolled class to navbar (404 only)
- `no_footer: true` — omits footer (404 only)
- `no_scroll_top: true` — omits scroll-top button and script (404 only)
- `error_page: true` — injects inline error-page CSS (404 only)

## CSS Files (9 files — ALL BUILT)
variables.css → reset.css → base.css → animations.css → navbar.css → [extra_css] → footer.css
hero.css, gallery.css, and films.css are loaded via `extra_css` front matter list (index.html uses all three).

## JS Files (5 files — ALL BUILT)
- navbar.js — Scroll shrink, mobile drawer, active link, reveal IntersectionObserver
- hero.js — Video poster fade, scroll chevron click, animated counters (data-counter attr)
- gallery.js — Infinite scroll (IntersectionObserver sentinel), lightbox, filter, GALLERY_OVERRIDE support, touch swipe
- films.js — Lazy YouTube embed + films carousel + Instagram modal (index.html only)
- scroll-top.js — Show/hide + smooth scroll

## Key Patterns
- Infinite scroll: IntersectionObserver on `.load-more-trigger` sentinel div
- YouTube embed: `<div data-youtube-id="ID" data-title="Title">` — click event swaps to iframe
- GALLERY_OVERRIDE: Data in `_data/*.json`, injected by layout as `window.GALLERY_OVERRIDE = {{ site.data[page.gallery_data] | jsonify }};` before deferred gallery.js
- Reveal on scroll: add class `reveal`, `reveal--left`, `reveal--right`, or `reveal--scale` to elements
- Stagger animation: wrap children in `.stagger` parent — nth-child delays are auto-applied
- Image data format: `{ src, thumb, alt, category, caption }`
- Lightbox: open via `openLightbox(index)`, keyboard nav (←/→/Esc), touch swipe

## Code Formatter
- Tool: **Prettier 3.8.1** via `npx prettier`
- Config: `.prettierrc` at repo root (printWidth 120, tabWidth 2, LF line endings)
- Exclusions: `.prettierignore` excludes `.git/`, `.claude/`, `CLAUDE.md`, `_site/`, `.jekyll-cache/`, `Gemfile.lock`
- Skill: `.claude/skills/formatter/SKILL.md` — trigger keywords: format, prettier, prettify, reformat, beautify
- Command: `npx prettier --write "**/*.html" "assets/css/**/*.css" "assets/js/**/*.js"`
  (also formats `_layouts/` and `_includes/` since they're .html files)

## Footer Architecture (2-column horizontal layout)
Grid: `1fr 15%` with `column-gap: 5%`. Now lives in `_includes/footer.html` (single source of truth).
Events: First Meet (20.02.2022) · First Date (24.03.2022) · Family Blessings (12.08.2024) · Wedding Day (15.12.2025) · Reception (17.12.2025)
Social links: @d.e.b.m.a.l.y.a (IG) · @iamMrHobo (FB) · @ankittaaaaaaaa (IG) · @dona.santra (FB)
Photo credit links: @photography_world_since2014 (IG) · PhoTographY WorLd (FB)

## Current Status — JEKYLL MIGRATION COMPLETE
All pages converted to Jekyll front matter. Repeated navbar/footer/scroll-top extracted to `_includes/`.
GitHub Pages builds Jekyll automatically on push to main.
Local dev: `bundle exec jekyll serve` (requires Ruby + Bundler).
Replace picsum.photos images with real photos before deploy.
Place hero video at `./assets/video/hero.mp4` (under 15MB).
Update `data-youtube-id` values with real YouTube video IDs.

## Page File Names (canonical)
- `index.html` · `gallery.html` · `prewedding.html` · `collages.html` · `404.html`
