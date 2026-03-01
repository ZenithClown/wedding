---
name: branding
description: Governs all brand, design, and content decisions for the Debmalya & Ankita wedding website. Use this skill whenever adding new sections, components, copy, colors, typography, or interactive features to ensure they stay true to the established identity.
---

# Branding & Design System — Debmalya & Ankita Wedding Website

This skill defines the canonical brand identity, visual language, and technical conventions
for the personal wedding memory site. Every change — however small — must comply with these
rules. The site is **not** a photography business; it is a personal memory archive for the couple.

---

## 1. Brand Identity

### 1.1 Couple & Identity (Never Change)

| Property | Value |
| :--- | :--- |
| Groom | Debmalya Pramanik |
| Bride | Ankita Santra |
| Logo / Monogram | "Debmalya & Ankita" in Cormorant Garamond Italic |
| Tagline | "Forever & Always" (navbar sub-label) |
| Hero tagline | "A Story of Love & Togetherness" |
| Footer quote | "Two souls, one forever." |
| Wedding date | `15 · 12 · 2025` |
| Copyright line | `© 2025 Debmalya Pramanik & Ankita Santra. All rights reserved.` |

**Tone of voice:** Intimate, poetic, cinematic. Never corporate, never transactional.
Never add services, pricing, contact forms, or team bios — this is a personal memory site.

---

## 2. Brand Guidelines

### 2.1 Color Scheme

All colors are defined as CSS custom properties in `assets/css/variables.css`.
**Never hard-code hex values** — always reference the token.

#### Background & Surface Palette

| Token | Hex | Usage |
| :--- | :---: | :--- |
| `--color-bg` | `#0a0a0a` | Page background (darkest) |
| `--color-bg-alt` | `#111111` | Alternate section backgrounds (`.section--alt`) |
| `--color-surface` | `#1a1a1a` | Card surfaces, modal backgrounds |
| `--color-surface-2` | `#222222` | Scroll-to-top button, elevated surfaces |

#### Text Palette

| Token | Hex | Usage |
| :--- | :---: | :--- |
| `--color-text` | `#f5f5f0` | Primary body & heading text |
| `--color-text-muted` | `#b0a99a` | Subtitles, secondary labels, captions |
| `--color-text-faint` | `#6b6560` | Placeholder, disabled, least-emphasis text |

#### Gold Accent Palette (signature colour — use purposefully)

| Token | Hex / Value | Usage |
| :--- | :---: | :--- |
| `--color-gold` | `#c9a96e` | Primary accent: section labels, borders, icon stroke, active links |
| `--color-gold-light` | `#e8d5b0` | `<em>` inside headings, hover fill states |
| `--color-gold-dark` | `#a07840` | Scrollbar thumb, dark variant for contrast |
| `--color-gold-glow` | `rgba(201,169,110,0.35)` | Glow effects, focus rings |

#### Structural Tokens

| Token | Value | Usage |
| :--- | :---: | :--- |
| `--color-white` | `#ffffff` | Pure white when needed |
| `--color-border` | `#2a2a2a` | Default border, separator lines |
| `--color-border-light` | `#3a3a3a` | Lighter borders, ghost button outlines |
| `--color-overlay` | `rgba(0,0,0,0.55)` | Hero video overlay |
| `--color-overlay-dark` | `rgba(0,0,0,0.85)` | Lightbox backdrop, modal overlays |

#### Shadow Tokens

| Token | Value | Usage |
| :--- | :--- | :--- |
| `--shadow-gold` | `0 0 30px rgba(201,169,110,0.3)` | Hover glow on featured elements |
| `--shadow-card` | `0 4px 30px rgba(0,0,0,0.5)` | Card elevation |
| `--shadow-nav` | `0 2px 20px rgba(0,0,0,0.6)` | Navbar shadow on scroll |

---

### 2.2 Typography

All font sizes are CSS tokens in `variables.css`. Never hard-code `px` or `rem` values
that already exist as a token.

#### Font Families

| Token | Stack | Role |
| :--- | :--- | :--- |
| `--font-serif` | `'Cormorant Garamond', Georgia, serif` | Headings, hero names, monogram, page titles, pull quotes |
| `--font-sans` | `'Lato', 'Helvetica Neue', Arial, sans-serif` | Body text, navigation, labels, captions, buttons |

Google Fonts import (weights loaded): Cormorant Garamond `300 / 400 / 600` (normal + italic),
Lato `300 / 400 / 700`.

#### Type Scale

| Token | Value | Typical Role |
| :--- | :---: | :--- |
| `--text-xs` | `0.75rem` | Section labels, button text, captions |
| `--text-sm` | `0.875rem` | Small supporting text |
| `--text-base` | `1rem` | Body paragraphs |
| `--text-lg` | `1.25rem` | Lead paragraphs, gold divider ornament |
| `--text-xl` | `1.5rem` | Sub-headings |
| `--text-2xl` | `2rem` | Mid-level headings |
| `--text-3xl` | `clamp(1.8rem, 3vw, 2.5rem)` | Section titles on smaller pages |
| `--text-4xl` | `clamp(2.5rem, 4vw, 3.5rem)` | `.section-title` |
| `--text-5xl` | `clamp(3rem, 6vw, 5.5rem)` | Page hero titles, hero names |

#### Line-Height & Letter-Spacing

| Token | Value | When to use |
| :--- | :---: | :--- |
| `--leading-tight` | `1.2` | Headings, hero names |
| `--leading-normal` | `1.6` | Standard body copy |
| `--leading-loose` | `1.9` | Subtitle text, long-form paragraphs |
| `--tracking-wide` | `0.08em` | Mild emphasis |
| `--tracking-wider` | `0.15em` | Button labels, small sub-labels |
| `--tracking-super` | `0.25em` | `.section-label` (all-caps category tags) |

#### Typography Rules

- Headings use `--font-serif` at `font-weight: 300` (light) with Italic for emphasis (`<em>`).
- `<em>` inside headings is always gold: `color: var(--color-gold-light)`.
- Section labels (`.section-label`) are `--font-sans`, uppercase, `--tracking-super`, gold.
- Body copy is `--font-sans`, `font-weight: 300` or `400`, muted gold (`--color-text-muted`) for supporting text.
- Buttons are `--font-sans`, `font-weight: 500`, `--text-xs`, uppercase, `--tracking-wider`.

---

## 3. Website Features

### 3.1 Pages

| Page | File | Purpose |
| :--- | :--- | :--- |
| Home | `index.html` | Landing page: hero video, quote, gallery preview, films preview, pre-wedding preview |
| Wedding Stories | `wedding-stories.html` | Full gallery with category filter + infinite scroll |
| Wedding Films | `wedding-films.html` | Featured film + films grid with lazy YouTube embeds |
| Pre-Wedding | `couple-shoot.html` | Couple-shoot gallery (data injected via `GALLERY_OVERRIDE`) |
| 404 | `404.html` | Custom not-found page |

### 3.2 Site-Wide Sections / Components

#### Navbar (`navbar.css` / `navbar.js`)
- Fixed top bar, height `--nav-height` (80 px desktop → 60 px scrolled).
- Logo: "Debmalya & Ankita" (main) + "Forever & Always" (sub), Cormorant Garamond Italic.
- Nav links: Home · Wedding Stories · Wedding Films · Pre-Wedding.
- Shrinks on scroll (`.scrolled` class at 80 px), mobile hamburger drawer.

#### Hero — Home Only (`hero.css` / `hero.js`)
- Full-viewport autoplay muted loop video with poster image fallback.
- Overlay: `--color-overlay`.
- Content: eyebrow label → couple names with animated SVG underline → tagline → date → CTA buttons.
- Animated counter support via `data-counter="N"` attributes.
- Scroll-chevron button at bottom.

#### Sections Anatomy
Every content section uses the pattern:
```html
<section class="section [section--alt]">
  <div class="container">
    <header class="section-header [section-header--center] stagger">
      <span class="section-label reveal">Category Label</span>
      <h2 class="section-title reveal">Heading <em>Italic Part</em></h2>
      <p class="section-subtitle reveal">Supporting sentence.</p>
    </header>
    <!-- content -->
  </div>
</section>
```

#### Gold Divider
Decorative horizontal rule with a centered `♦` ornament in gold serif italic.
```html
<div class="gold-divider"><span class="gold-divider--text">♦</span></div>
```

#### Buttons
Three variants — never mix styles arbitrarily:

| Class | Appearance | Use case |
| :--- | :--- | :--- |
| `.btn.btn--gold` | Gold fill, dark text | Primary CTA |
| `.btn.btn--outline` | Gold border, gold text → fills on hover | Standard CTA |
| `.btn.btn--ghost` | Transparent, light border → gold on hover | Secondary / hero pairing |

#### Gallery Grid
- Masonry-style grid; items have `data-category` for filter.
- Each item: `<img>` + `.gallery-grid__caption` overlay + `.gallery-grid__expand` icon.
- Lightbox on click.
- Infinite scroll via `IntersectionObserver` on `.load-more-trigger` sentinel. Batch size: 9.

#### Film Cards
- Thumbnails: `<div data-youtube-id="ID" data-title="Title">`.
- Click replaces div content with `<iframe>` (lazy embed — never load iframes on page load).
- Variants: `.film-featured` (large, with description) and `.film-card` (grid item).

#### Footer (`footer.css`)
Three-column layout: Navigate links · Brand centre (monogram + date + quote) · Social links.
Social links placeholder `href="#"` until real URLs are added.

#### Scroll-to-top (`scroll-top.js`)
Fixed button, bottom-right, visible after 300 px scroll.

---

## 4. Technical Details

### 4.1 Stack & Constraints

- **Pure HTML / CSS / JS** — no framework, no build tool, no package manager.
- **Hosted on GitHub Pages** (root of `master`/`main` branch).
- All asset paths are **relative** (`./assets/…`). Never use absolute paths.
- No server-side rendering, no API calls, no cookies.

### 4.2 CSS Architecture

Load order is **mandatory** on every page:

```
variables.css → reset.css → base.css → animations.css → navbar.css
→ hero.css (index.html only) → gallery.css → films.css → footer.css
```

- Design tokens live **exclusively** in `variables.css`. Never duplicate or override tokens inline.
- Spacing tokens: `--space-1` (0.25 rem) through `--space-32` (8 rem).
- Section vertical padding: `--section-pad-y` (clamp 4–8 rem).
- Section horizontal padding: `--section-pad-x` (clamp 1.5–5 rem).
- Max content width: `--max-width` (1500 px).
- Border radius tokens: `--radius-sm` (2 px) · `--radius-md` (4 px) · `--radius-lg` (8 px).
- Transitions: `--transition-fast` (150 ms) · `--transition-base` (300 ms) · `--transition-slow` (600 ms) · `--transition-reveal` (700 ms cubic-bezier).
- Z-index layers: `--z-base` (1) · `--z-gallery` (10) · `--z-nav` (100) · `--z-lightbox` (200) · `--z-modal` (300).

### 4.3 JavaScript Architecture

| File | Responsibility |
| :--- | :--- |
| `navbar.js` | Scroll shrink (`.scrolled` at 80 px), mobile drawer (`.nav-open` on `<body>`), active link highlight, reveal IntersectionObserver |
| `hero.js` | Video poster fade, scroll-chevron click, animated counters (`data-counter` attr) |
| `gallery.js` | Infinite scroll (IntersectionObserver on `.load-more-trigger`), lightbox, category filter, `GALLERY_OVERRIDE` support |
| `films.js` | Lazy YouTube embed — click on `[data-youtube-id]` swaps to `<iframe>` |
| `scroll-top.js` | Show/hide button after 300 px, smooth scroll to top |

### 4.4 Key Interaction Patterns

**Reveal on scroll** — Add the class to any element; `navbar.js` IntersectionObserver adds `.visible`:

| Class | Entry animation |
| :--- | :--- |
| `.reveal` | Fade up (translateY 28 px → 0) |
| `.reveal--left` | Slide in from left (translateX −28 px → 0) |
| `.reveal--right` | Slide in from right (translateX 28 px → 0) |
| `.reveal--scale` | Scale in (0.95 → 1) |

Wrap children in `.stagger` to apply incremental 80 ms delays (up to 6 children).

**Animated counters** — `<span data-counter="N">` animates 0 → N when it enters the viewport.

**Gallery data shape:**
```js
{ src: 'path/to/full.jpg', thumb: 'path/to/thumb.jpg', alt: '...', category: '...', caption: '...' }
```
Categories: `ceremony` · `portraits` · `reception` · `details` · `candid`.
Wedding images defined at top of `gallery.js`; couple-shoot images injected via:
```html
<script>window.GALLERY_OVERRIDE = [/* array of image objects */];</script>
```
placed in `<head>` of `couple-shoot.html` **before** `gallery.js` loads.

### 4.5 SEO & Meta Conventions

Every page must include:
- `<title>` following the pattern: `Page Name — Debmalya & Ankita`
- `<meta name="description">` (unique per page, ≤160 chars)
- Open Graph tags: `og:type`, `og:title`, `og:description`, `og:image`, `og:url`
- Twitter Card: `summary_large_image`
- `<link rel="canonical">` pointing to the page's own relative URL

### 4.6 Pre-Production Checklist

Before deploying to GitHub Pages, confirm:

- [ ] Replace all `picsum.photos` placeholder `src` values in `gallery.js` and `couple-shoot.html` with real image paths.
- [ ] Place hero video at `./assets/video/hero.mp4` (≤15 MB, `preload="metadata"`).
- [ ] Update all `data-youtube-id` values with real YouTube video IDs.
- [ ] Update social media `href="#"` anchors in the footer with real profile URLs.
- [ ] Add real `./assets/images/og-image.jpg` (1200×630) and `./assets/images/poster.jpg`.
- [ ] Replace emoji favicon with a real `.ico` or `.png` favicon.
