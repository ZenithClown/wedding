# Project Memory — Debmalya & Ankita Wedding Website

## Identity (immutable)
Groom: Debmalya Pramanik · Bride: Ankita Santra · Date: 15·12·2025
Copyright: © 2025 Debmalya Pramanik & Ankita Santra · Logo: "Debmalya & Ankita" Cormorant Garamond Italic

## Architecture
Jekyll + GitHub Pages. `_layouts/default.html` is the single layout. `_includes/` holds navbar, footer,
scroll-top, lightbox, page-hero. `_data/` holds JSON for GALLERY_OVERRIDE pages.
**Read CLAUDE.md first** — it is the canonical reference for all patterns, tokens, and front matter.

## Pages
| File | nav_active | extra_css | extra_js | Notes |
|---|---|---|---|---|
| `index.html` | `home` | hero, films, gallery | hero, films, gallery | video hero, gallery preview, films carousel |
| `gallery.html` | `gallery` | gallery | gallery | infinite scroll, filter, lightbox |
| `prewedding.html` | `prewedding` | gallery | gallery | GALLERY_OVERRIDE, no filter bar, couple_shoot_mode |
| `collages.html` | `collages` | gallery | gallery | GALLERY_OVERRIDE, filter: All/Family/Friends/Bridal Party |
| `404.html` | — | — | — | navbar_scrolled, no_footer, no_scroll_top, error_page |

## CSS / JS Summary
- Load order: variables → reset → base → animations → navbar → [extra_css] → footer
- `variables.css` — all tokens (never hard-code duplicates)
- `films.js` — lazy YouTube + films carousel + Instagram modal (index.html only)
- `gallery.js` — IntersectionObserver infinite scroll + lightbox + filter + GALLERY_OVERRIDE

## Key Patterns (quick ref)
- Infinite scroll: sentinel `<div class="load-more-trigger">`, batch size 9
- YouTube lazy: `<div data-youtube-id="ID" data-title="Title">` → click swaps to iframe
- GALLERY_OVERRIDE: `window.GALLERY_OVERRIDE = {{ site.data[page.gallery_data] | jsonify }};` before deferred gallery.js
- Reveal scroll: `reveal`, `reveal--left`, `reveal--right`, `reveal--scale` classes; stagger via `.stagger` parent
- Animated counter: `data-counter="N"` attr — hero.js animates 0→N on viewport entry

## Design Tokens (quick ref)
`#0a0a0a` bg · `#111111` alt-bg · `#1a1a1a` card · `#f5f5f0` text · `#b0a99a` secondary
`#c9a96e` gold · `#e8d5b0` pale gold · `#2a2a2a` border · `rgba(0,0,0,0.55)` hero overlay
Heading: Cormorant Garamond (italic) · Body/nav: Lato · Max width: 1500px

## Skills
- **branding** — `.claude/skills/branding/SKILL.md`
- **formatter** — `.claude/skills/formatter/SKILL.md` — Prettier 3.8.1, config in `.prettierrc`

## Status & Known Items
- Jekyll migration: complete. All 5 pages built.
- Hero video: `./assets/video/landing.mp4` (not hero.mp4)
- `videography.html` removed — do not reference it
- Footer timeline: winding road SVG (not horizontal grid)
- Gallery masonry: dimension-based (not nth-child rhythm)
- Pre-wedding (`prewedding.html`): no filter bar
- Still using `picsum.photos` placeholders — replace with real images before deploy
- `data-youtube-id` values need real YouTube IDs before deploy

## Footer Social / Credits
@d.e.b.m.a.l.y.a (IG) · @iamMrHobo (FB) · @ankittaaaaaaaa (IG) · @dona.santra (FB)
Photo credit: @photography_world_since2014 (IG) · PhoTographY WorLd (FB)
