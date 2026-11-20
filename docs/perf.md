# Performance Guide: 60 FPS Architecture & Rules

This document outlines the performance constraints, design decisions, and strict rules governing the codebase to guarantee smooth 60 FPS (16.6 ms per frame) rendering across mobile and desktop.

---

## 1. Zero-Layout-Read Scroll Architecture
- **Rule:** Never call layout-triggering properties (`scrollHeight`, `scrollTop`, `getBoundingClientRect()`, `offsetWidth`, `offsetHeight`) inside `scroll` or `pointermove` event handlers.
- **Implementation:**
  - Cache document scroll boundaries (`maxScroll = scrollHeight - innerHeight`) inside a `ResizeObserver`.
  - Use `IntersectionObserver` to track active chapters/sections rather than querying element positions on every scroll tick.
  - Scroll handlers must only store `latestScrollY = window.scrollY` and schedule work via a single `requestAnimationFrame` tick flag.
  - All scroll listeners must specify `{ passive: true }`.

---

## 2. GPU-Composited Transforms Only
- **Rule:** Animate only `transform` and `opacity`. Never animate `width`, `height`, `top`, `left`, `margin`, or `padding`.
- **Implementation:**
  - Progress bars (such as in `PinnedPipeline.tsx` and `ChapterRail.astro`) use `scaleX(...)` or `scaleY(...)` with `transform-origin` instead of `width` or `height`.
  - Parallax layers, doodles, and cursor lighting strictly use `translate3d(x, y, 0)` so the browser delegates positioning entirely to the GPU compositor thread.
  - Never promote layers indiscriminately with `will-change`. Promote only continuously translating layers (e.g., parallax scrap containers) and let standard elements remain unpromoted.

---

## 3. Cursor Light & Event Throttling
- **Rule:** Never update root CSS variables (`document.documentElement.style.setProperty('--cursor-x', ...)`) in continuous event listeners. Writing root variables triggers global style invalidations across the entire DOM tree.
- **Implementation:**
  - The cursor spotlight is implemented as a single fixed `<div>` (`.cursor-light-spotlight`) whose position is updated via `translate3d(x, y, 0)`.
  - Merged pointer tracking into a single throttled rAF listener.
  - Completely disabled on mobile devices (`max-width: 768px`) and under `prefers-reduced-motion: reduce`.

---

## 4. Compositing & Filter Budget
- **Rule:** Eliminate full-screen `mix-blend-mode` overlays and multi-element `backdrop-filter: blur(...)`.
- **Implementation:**
  - Background grid and blueprint overlays use pre-computed alpha colors (`rgba(...)`) rather than `mix-blend-mode: multiply`.
  - Masking tape elements use semi-transparent solid paper tones (`rgba(224, 214, 190, 0.55)`) without backdrop filters.
  - Navbar, command palette, and sticky notes rely on high-opacity tinted surfaces instead of heavy `backdrop-blur`.

---

## 5. Offscreen Section Containment
- **Rule:** Sections outside the initial viewport must not participate in initial layout, recalculate style, or paint passes.
- **Implementation:**
  - Offscreen sections apply `.content-auto`:
    ```css
    content-visibility: auto;
    contain-intrinsic-size: 1px 750px;
    contain: layout style paint;
    ```
  - This allows the browser to bypass layout and rendering for lower sections until the user scrolls near them.

---

## 6. Typography & Asset Budgets
- **Rule:** Total font payload must remain under 100 KB over the wire.
- **Implementation:**
  - Strictly two families: **Plus Jakarta Sans** (sans) and **JetBrains Mono** (mono).
  - Use variable font files subsetted strictly to the Latin unicode range:
    - `plus-jakarta-sans-latin-wght-normal.woff2` (27.2 KB)
    - `jetbrains-mono-latin-wght-normal.woff2` (40.4 KB)
    - Total: **67.6 KB** (under 100 KB budget).
  - Preloaded in `<head>` via `<link rel="preload" as="font" type="font/woff2" crossorigin="anonymous" />` with `font-display: swap`.

---

## 7. React Islands & Bundle Isolation
- **Rule:** Total initial and island JavaScript must remain under 100 KB gzipped.
- **Implementation:**
  - Import animations strictly from `motion/react` (Motion 12), completely avoiding duplicate `framer-motion` runtime overhead.
  - Relax hydration directives:
    - Never use `client:load` on below-the-fold or non-critical components.
    - Use `client:idle` or `client:visible` for `HeroMarkupScrub`, `MagneticCta`, `HeroSpecTranslator`, and `CommandPalette`.

---

## 8. Continuous Budget Enforcement
- Run `node scripts/check-perf-budget.mjs` in CI to ensure that bundle sizes, fonts, and HTML stay within their defined limits.
- In local development (`import.meta.env.DEV`), `PerfMonitor.astro` alerts developers in real-time when Long Animation Frames (LoAF) exceed 16.6 ms or frame rates drop below 55 FPS.
