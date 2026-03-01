# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal wedding portfolio website for **Debmalya Pramanik** (groom) and **Ankita Santra** (bride). Pure HTML/CSS/JS — no framework, no build tool, no package manager. Hosted on GitHub Pages. Inspired by the dark, cinematic aesthetic of knotsbyamp.com.

This is a **personal memory site**, not a photography business. Never add studio/business copy (services, pricing, contact forms, team bios).

## Development Workflow

No build step. Open HTML files directly in a browser or use a local static server:

```bash
# Python (any machine with Python 3)
python -m http.server 8080

# Node (if available)
npx serve .
```

All asset paths are **relative** (e.g. `./assets/css/base.css`) so the site works on a GitHub Pages subdirectory URL. Never switch to absolute paths.

## Deployment

Push to `main` branch → GitHub Pages serves the root automatically. Confirm in repo Settings → Pages that the source is the root of `main`.

## Architecture

### CSS load order (every page must follow this)
```
variables.css → reset.css → base.css → animations.css → navbar.css
→ hero.css (index.html only) → gallery.css → films.css → footer.css
```
Design tokens (colors, fonts, spacing) live exclusively in `variables.css`. Never hard-code values that already exist as CSS custom properties.

### JS files and their responsibilities
| File | Responsibility |
|---|---|
| `navbar.js` | Scroll shrink (`.scrolled` at 80 px), mobile drawer (`.nav-open` on `<body>`), active link, reveal IntersectionObserver |
| `hero.js` | Video poster fade, scroll-chevron click, animated counters (`data-counter` attr) |
| `gallery.js` | Infinite scroll (IntersectionObserver on `.load-more-trigger`), lightbox, category filter, `GALLERY_OVERRIDE` |
| `films.js` | Lazy YouTube embed — `data-youtube-id` attr on a thumb `<div>`; click swaps to `<iframe>` |
| `scroll-top.js` | Show/hide button after 300 px, smooth scroll to top |

### Key patterns

**Infinite scroll** — `IntersectionObserver` on a sentinel `<div class="load-more-trigger">` at the bottom of the grid. Never use scroll event listeners. Batch size: 9 images.

**YouTube lazy embed** — Thumbnails are static `<div data-youtube-id="ID" data-title="Title">`. A click handler replaces the div's content with an `<iframe>`. Never load iframes on page load.

**Gallery data** — Each image object: `{ src, thumb, alt, category, caption }`. Wedding gallery images live at the top of `gallery.js`. Couple-shoot and group-photo images are injected via `window.GALLERY_OVERRIDE = [...]` in the `<head>` of `prewedding.html` and `collages.html` respectively, before `gallery.js` loads.

**Reveal on scroll** — Add CSS class `reveal`, `reveal--left`, `reveal--right`, or `reveal--scale` to any element. Stagger children by wrapping them in a `.stagger` parent.

**Animated counters** — Add `data-counter="N"` to any element; `hero.js` animates it from 0 to N when it enters the viewport.

## Design Tokens (quick reference)

| Token | Value |
|---|---|
| Background | `#0a0a0a` |
| Alt background | `#111111` |
| Card surface | `#1a1a1a` |
| Primary text | `#f5f5f0` |
| Secondary text | `#b0a99a` |
| Gold accent | `#c9a96e` |
| Pale gold | `#e8d5b0` |
| Border | `#2a2a2a` |
| Hero overlay | `rgba(0,0,0,0.55)` |
| Heading font | `Cormorant Garamond` (Italic) |
| Body/nav font | `Lato` |
| Max content width | `1500px` |

## Couple Branding (never change)

- Groom: Debmalya Pramanik · Bride: Ankita Santra
- Logo/monogram: "Debmalya & Ankita" in Cormorant Garamond Italic
- Wedding date: `15 · 12 · 2025`
- Copyright: `© 2025 Debmalya Pramanik & Ankita Santra`

## Code Formatting

All source files are formatted with **Prettier** (v3.8.1). Config lives in `.prettierrc`; exclusions in `.prettierignore`.

```bash
# Format all HTML, CSS, and JS files
npx prettier --write "**/*.html" "assets/css/**/*.css" "assets/js/**/*.js"

# Check without writing (CI / dry-run)
npx prettier --check "**/*.html" "assets/css/**/*.css" "assets/js/**/*.js"
```

Key settings: `printWidth: 120` · `tabWidth: 2` · `singleQuote: false` · `endOfLine: "lf"`.
The `formatter` skill at `.claude/skills/formatter/SKILL.md` documents the full workflow.

## Footer Structure

Two-column layout (CSS Grid `1fr 15%`, `column-gap: 5%`):
- **Left (timeline):** Horizontal 5-event story timeline — First Meet (20.02.2022) · First Date (24.03.2022) · Family Blessings (12.08.2024) · Wedding Day (15.12.2025) · Reception (17.12.2025). Odd events: icon above / date+label below. Even events: label+date above / icon below. Inline SVG icons (stroke-based).
- **Right (social):** 4 direct `<a class="footer__social-link">` anchors — no wrapper div, no label.
- **Bottom bar:** copyright · photography credit.

Social links (already real URLs): @d.e.b.m.a.l.y.a (IG) · @iamMrHobo (FB) · @ankittaaaaaaaa (IG) · @dona.santra (FB)
Photo credits: @photography_world_since2014 (IG) · PhoTographY WorLd (FB)

## Before Production Deploy

1. Replace all `picsum.photos` placeholder `src` values in `gallery.js`, `prewedding.html`, and `collages.html` with real image paths.
2. Place hero video at `./assets/video/hero.mp4` (keep under 15 MB; use `preload="metadata"`).
3. Update `data-youtube-id` values with real YouTube video IDs.
4. Add real `./assets/images/og-image.jpg` and `./assets/images/poster.jpg`.
