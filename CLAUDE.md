# CLAUDE.md

Guidance for Claude Code in this repository.

## Project Overview

Personal wedding memory site — **Debmalya Pramanik** (groom) & **Ankita Santra** (bride). Jekyll + GitHub Pages (auto-build on push). Dark cinematic aesthetic. **Not a business site** — never add services, pricing, contact forms, or team bios.

## Dev Workflow

```bash
bundle exec jekyll serve   # → http://localhost:4000
# Without Ruby: push to GitHub, or python -m http.server 8080 (no includes resolved)
```

All asset paths are **relative** (`./assets/…`). Never use absolute paths.
Deploy: push to `master` → GitHub Pages serves root automatically.

## Architecture

```
_layouts/default.html        ← single layout: head, navbar, {{ content }}, footer, scripts
_includes/
  navbar.html                ← navbar + mobile drawer (page.nav_active sets active mobile link)
  footer.html                ← footer timeline + social links + bottom bar
  scroll-top.html, lightbox.html, page-hero.html
_data/
  gallery_prewedding.json    ← GALLERY_OVERRIDE for prewedding.html
  gallery_collages.json      ← GALLERY_OVERRIDE for collages.html
```

### Pages (5 total)
| Page | nav_active | Notes |
|---|---|---|
| `index.html` | `home` | video hero, gallery preview, films carousel, pre-wedding preview |
| `gallery.html` | `gallery` | infinite scroll, lightbox, category filter |
| `prewedding.html` | `prewedding` | GALLERY_OVERRIDE, no filter bar, couple_shoot_mode |
| `collages.html` | `collages` | GALLERY_OVERRIDE, filter: All/Family/Friends/Bridal Party |
| `404.html` | — | navbar_scrolled, no_footer, no_scroll_top, error_page |

### Front matter variables
| Variable | Purpose |
|---|---|
| `layout` | Always `default` |
| `title` / `description` | `<title>` and meta |
| `canonical` | canonical + og:url |
| `og_title` / `og_description` | Override OG tags (optional) |
| `robots` | Default `index, follow`; 404 uses `noindex, nofollow` |
| `nav_active` | Active mobile-drawer link: `home`, `gallery`, `prewedding`, `collages` |
| `extra_css` / `extra_js` | Page-specific files (loaded between navbar and footer) |
| `gallery_data` | `_data/` key for GALLERY_OVERRIDE (e.g. `gallery_prewedding`) |
| `couple_shoot_mode` | Sets `window.COUPLE_SHOOT_MODE = true` (prewedding.html) |
| `navbar_scrolled` / `no_footer` / `no_scroll_top` / `error_page` | 404.html only |

### Including page-hero
```liquid
{% include page-hero.html aria_label="…" bg_url="https://…" label="…" title_plain="…" title_em="…" %}
```

### CSS load order (all pages must follow)
```
variables.css → reset.css → base.css → animations.css → navbar.css → [extra_css] → footer.css
```
`hero.css`, `gallery.css`, `films.css` are loaded via `extra_css`. Design tokens live **exclusively** in `variables.css` — never hard-code values that exist as CSS custom properties.

### JS files
| File | Responsibility |
|---|---|
| `navbar.js` | Scroll shrink (`.scrolled` at 80 px), mobile drawer, active link, reveal IntersectionObserver |
| `hero.js` | Video poster fade, scroll-chevron click, animated counters (`data-counter` attr) |
| `gallery.js` | Infinite scroll (`.load-more-trigger` sentinel, batch 9), lightbox, filter, GALLERY_OVERRIDE |
| `films.js` | Lazy YouTube embed + films carousel + Instagram modal (index.html only) |
| `scroll-top.js` | Show/hide after 300 px, smooth scroll to top |

### Key patterns
- **Infinite scroll** — `IntersectionObserver` on `<div class="load-more-trigger">`. Never use scroll event listeners.
- **YouTube lazy** — `<div data-youtube-id="ID" data-title="Title">` click swaps to `<iframe>`. Never load on page load.
- **GALLERY_OVERRIDE** — Layout injects `window.GALLERY_OVERRIDE = {{ site.data[page.gallery_data] | jsonify }};` before deferred `gallery.js`.
- **Reveal on scroll** — Classes: `reveal`, `reveal--left`, `reveal--right`, `reveal--scale`. Stagger children via `.stagger` parent.
- **Animated counters** — `data-counter="N"` on any element; `hero.js` reads `dataset.counter` and animates 0→N on viewport entry. Optionally `data-suffix="+"` appends a suffix.
- **Image data format** — `{ src, thumb, alt, category, caption }`.

## Design Tokens

`#0a0a0a` bg · `#111111` alt-bg · `#1a1a1a` card · `#f5f5f0` text · `#b0a99a` secondary · `#c9a96e` gold · `#e8d5b0` pale gold · `#2a2a2a` border · `rgba(0,0,0,0.55)` hero overlay
Heading font: `Cormorant Garamond` (Italic) · Body/nav: `Lato` · Max width: `1500px`

## Couple Branding (never change)

Groom: Debmalya Pramanik · Bride: Ankita Santra · Date: `15 · 12 · 2025`
Logo/monogram: "Debmalya & Ankita" in Cormorant Garamond Italic
Copyright: `© 2025 Debmalya Pramanik & Ankita Santra`

## Code Formatting

Prettier v3.8.1. Config in `.prettierrc` (`printWidth: 120`, `tabWidth: 2`, `singleQuote: false`, `endOfLine: "lf"`). Exclusions in `.prettierignore`. Skill: `.claude/skills/formatter/SKILL.md`.

```bash
npx prettier --write "**/*.html" "assets/css/**/*.css" "assets/js/**/*.js"
```

## Footer Structure

Two-column grid (`1fr 15%`, `column-gap: 5%`):
- **Left:** 5-event winding road SVG timeline — First Meet (20.02.2022) · First Date (24.03.2022) · Family Blessings (12.08.2024) · Wedding Day (15.12.2025) · Reception (17.12.2025). Odd: icon above / date+label below. Even: label+date above / icon below.
- **Right:** 4 `<a class="footer__social-link">` anchors (no wrapper div).
- **Bottom bar:** copyright · photography credit.

Social: @d.e.b.m.a.l.y.a (IG) · @iamMrHobo (FB) · @ankittaaaaaaaa (IG) · @dona.santra (FB)
Photo credit: @photography_world_since2014 (IG) · PhoTographY WorLd (FB)

## Before Production Deploy

1. Replace all `picsum.photos` placeholders in `gallery.js`, `prewedding.html`, `collages.html` with real image paths.
2. Hero video is at `./assets/video/landing.mp4` (keep under 15 MB; use `preload="metadata"`).
3. Update `data-youtube-id` values with real YouTube video IDs.
4. Add real `./assets/images/og-image.jpg` and `./assets/images/poster.jpg`.
