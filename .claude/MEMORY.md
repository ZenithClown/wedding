# Project Memory — Debmalya & Ankita Wedding Website

## What This Project Is
Personal wedding memory site for **Debmalya Pramanik** (groom) and **Ankita Santra** (bride).
Pure HTML/CSS/JS, hosted on GitHub Pages. Inspired by knotsbyamp.com aesthetic (dark, gold, cinematic).
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

## Pages (6 total — ALL BUILT)
- `index.html` — Home: video hero, quote, gallery preview (6 imgs), films preview (featured+3), pre-wedding preview (3)
- `gallery.html` — Full gallery: infinite scroll, filter (All/Ceremony/Reception/Portraits/Details/Candid), lightbox
- `videography.html` — Featured film (large) + 6 film cards in 3-col grid, lazy YouTube embed
- `prewedding.html` — Gallery with GALLERY_OVERRIDE, filter (All/Beach/City/Nature/Studio)
- `collages.html` — Group Photos gallery with GALLERY_OVERRIDE, filter (All/Family/Friends/Bridal Party)
- `404.html` — Custom 404 with couple branding

## CSS Files (9 files — ALL BUILT)
variables.css → reset.css → base.css → animations.css → navbar.css → hero.css → gallery.css → films.css → footer.css

## JS Files (5 files — ALL BUILT)
- navbar.js — Scroll shrink, mobile drawer, active link, reveal IntersectionObserver
- hero.js — Video poster fade, scroll chevron click, animated counters (data-counter attr)
- gallery.js — Infinite scroll (IntersectionObserver sentinel), lightbox, filter, GALLERY_OVERRIDE support, touch swipe
- films.js — Lazy YouTube embed (data-youtube-id attr on thumb div, click swaps to iframe)
- scroll-top.js — Show/hide + smooth scroll

## Key Patterns
- Infinite scroll: IntersectionObserver on `.load-more-trigger` sentinel div
- YouTube embed: `<div data-youtube-id="ID" data-title="Title">` — click event swaps to iframe
- `prewedding.html` and `collages.html` override image data via `window.GALLERY_OVERRIDE = [...]` before gallery.js loads
- Reveal on scroll: add class `reveal`, `reveal--left`, `reveal--right`, or `reveal--scale` to elements
- Stagger animation: wrap children in `.stagger` parent — nth-child delays are auto-applied
- Image data format: `{ src, thumb, alt, category, caption }`
- Lightbox: open via `openLightbox(index)`, keyboard nav (←/→/Esc), touch swipe

## Code Formatter
- Tool: **Prettier 3.8.1** via `npx prettier`
- Config: `.prettierrc` at repo root (printWidth 120, tabWidth 2, LF line endings)
- Exclusions: `.prettierignore` excludes `.git/`, `.claude/`, `CLAUDE.md`
- Skill: `.claude/skills/formatter/SKILL.md` — trigger keywords: format, prettier, prettify, reformat, beautify
- Command: `npx prettier --write "**/*.html" "assets/css/**/*.css" "assets/js/**/*.js"`

## Footer Architecture (2-column horizontal layout)
Grid: `1fr 15%` with `column-gap: 5%`. Classes: `.footer__timeline > .footer__tl-track > .footer__tl-item`.
Each `.footer__tl-item` has `.footer__tl-upper` / `.footer__tl-mid` (line+dot+line) / `.footer__tl-lower`.
- Odd events (1,3,5): icon in upper, date+label in lower
- Even events (2,4): label+date in upper, icon in lower
Events: First Meet (20.02.2022) · First Date (24.03.2022) · Family Blessings (12.08.2024) · Wedding Day (15.12.2025) · Reception (17.12.2025)
Social column `.footer__social`: 4 direct `<a>` anchors — real URLs set, no wrapper div.
- @d.e.b.m.a.l.y.a (IG) · @iamMrHobo (FB) · @ankittaaaaaaaa (IG) · @dona.santra (FB)
Photo credit links: @photography_world_since2014 (IG) · PhoTographY WorLd (FB)

## Current Status — PRODUCTION SITE BUILT
All files created. Footer social links and photo credits have real URLs.
Replace picsum.photos images with real photos before deploy.
Place hero video at `./assets/video/hero.mp4` (under 15MB).
Update `data-youtube-id` values with real YouTube video IDs.
GitHub Pages deploy: push to main, enable Pages in repo Settings.

## Page File Names (canonical)
- `index.html` · `gallery.html` · `videography.html` · `prewedding.html` · `collages.html` · `404.html`
- Renamed from: wedding-stories.html → gallery.html, wedding-films.html → videography.html, couple-shoot.html → prewedding.html
