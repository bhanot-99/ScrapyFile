# Baseline Performance Report (Pre-Optimization)
Date: 2026-11-21
Branch: perf/60fps (Commit: 87555cb)

## 1. Asset Sizes & Network Payload

| Resource Type | Uncompressed | Gzipped | Budget / Note |
| :--- | :--- | :--- | :--- |
| **Homepage HTML** | 108.83 KB | 20.78 KB | High due to embedded inline SVGs & repetitive markup |
| **CSS (Total Bundle)** | 96.63 KB | 21.72 KB | Includes full font declarations & unpruned styles |
| **Fonts (Total woff2)** | 351.71 KB | N/A (woff2) | **333.6 KB across 15 files** (Target: < 100 KB) |
| **Homepage Initial Linked JS** | 16.25 KB | 5.49 KB | ClientRouter script |
| **All Homepage Islands JS** | 290.40 KB | 93.55 KB | Includes full framer-motion via MagneticCta |

### Font Files Loaded:
- `inter-cyrillic-ext-wght-normal.BOeWTOD4.woff2`: 25.4 KB
- `inter-cyrillic-wght-normal.DqGufNeO.woff2`: 18.3 KB
- `inter-greek-ext-wght-normal.DlzME5K_.woff2`: 11.0 KB
- `inter-greek-wght-normal.CkhJZR-_.woff2`: 18.6 KB
- `inter-latin-ext-wght-normal.DO1Apj_S.woff2`: 83.1 KB
- `inter-latin-wght-normal.Dx4kXJAl.woff2`: 47.1 KB
- `inter-vietnamese-wght-normal.CBcvBZtf.woff2`: 10.0 KB
- `jetbrains-mono-cyrillic-wght-normal.D73BlboJ.woff2`: 11.8 KB
- `jetbrains-mono-greek-wght-normal.Bw9x6K1M.woff2`: 8.8 KB
- `jetbrains-mono-latin-ext-wght-normal.DBQx-q_a.woff2`: 14.8 KB
- `jetbrains-mono-latin-wght-normal.B9CIFXIH.woff2`: 39.5 KB
- `jetbrains-mono-vietnamese-wght-normal.Bt-aOZkq.woff2`: 7.3 KB
- `plus-jakarta-sans-latin-ext-wght-normal.DmpS2jIq.woff2`: 21.2 KB
- `plus-jakarta-sans-latin-wght-normal.eXO_dkmS.woff2`: 26.7 KB
- `plus-jakarta-sans-vietnamese-wght-normal.qRpaaN48.woff2`: 8.2 KB

---

## 2. Chrome DevTools CDP Runtime Traces

### Scenario A: Desktop (1440px, Unthrottled CPU)
- **Total Frames Sampled:** 183
- **Frames Under 16.6ms:** 2.7% (178 dropped frames)
- **Severe Drops (>33.3ms / <30fps):** 33
- **Average Frame Time:** 27.4 ms
- **Max Frame Time:** 116.5 ms
- **Long Tasks (>50ms):** 0 (Durations: 0 ms)
- **Approximate TBT:** 0 ms
- **CLS (Layout Shift):** 0.0041
- **LCP (Largest Contentful Paint):** 572 ms
- **Layout Duration (Cumulative):** 0.043 s
- **Recalc Style Duration (Cumulative):** 0.158 s
- **Script Execution Time:** 0.111 s

### Scenario B: Mobile (390px, 4x CPU Throttled)
- **Total Frames Sampled:** 331
- **Frames Under 16.6ms:** 44.4% (184 dropped frames)
- **Severe Drops (>33.3ms / <30fps):** 8
- **Average Frame Time:** 17.6 ms
- **Max Frame Time:** 52.2 ms
- **Long Tasks (>50ms):** 0 (Durations: 0 ms)
- **Approximate TBT:** 0 ms
- **CLS (Layout Shift):** 0.0000
- **LCP (Largest Contentful Paint):** 332 ms
- **Layout Duration (Cumulative):** 0.144 s
- **Recalc Style Duration (Cumulative):** 0.882 s
- **Script Execution Time:** 0.546 s

---

## 3. Diagnosed Performance Hotspots

1. **Root Style Invalidation & CSS Var Thrashing:**
   - `BaseLayout.astro` and `LivingDeskBackground.astro` attach separate mousemove listeners setting 6 CSS variables (`--light-x`, `--cursor-x`, `--shadow-nudge-x`, etc.) on `document.documentElement`. This causes a full document style recalculation on every frame during pointer movement.
2. **Scroll Handlers reading Layout Properties:**
   - `LivingDeskBackground.astro` reads `document.documentElement.scrollHeight` and `window.innerHeight` on scroll.
   - `ChapterRail.astro` reads `getBoundingClientRect()` on active chapter elements during scroll.
3. **Framer Motion Full Library Import:**
   - `src/components/interactive/MagneticCta.tsx` imports from `framer-motion` instead of `motion/react`.
4. **Width Animation in PinnedPipeline:**
   - `PinnedPipeline.tsx` animates CSS `width` on the progress bar instead of GPU-composited `transform: scaleX(...)`.
5. **Excessive Font Weight Subsets:**
   - Inter (7 subsets), JetBrains Mono (5 subsets), and Plus Jakarta Sans (3 subsets) all loaded simultaneously.
6. **Heavy SVG DOM & HTML Size:**
   - HTML size is 111 KB due to repeated inline SVG code without `<defs>` / `<use>`.
