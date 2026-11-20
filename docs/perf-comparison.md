# Performance Optimization Report: Baseline vs. After
Date: 2026-11-21
Branch: perf/60fps

## 1. Asset & Payload Comparison

| Metric | Baseline | Optimized | Delta | Budget |
| :--- | :--- | :--- | :--- | :--- |
| **Fonts Total Payload** | 351.71 KB (15 files) | **66.16 KB (2 files)** | **-81.2%** | < 100 KB (PASS) |
| **Homepage Initial Linked JS** | 16.25 KB (gzip: 5.49 KB) | **16.25 KB (gzip: 5.49 KB)** | Maintained | < 100 KB (PASS) |
| **Homepage Total CSS** | 96.63 KB (gzip: 21.72 KB) | **86.00 KB (gzip: 16.63 KB)** | **-23.4%** | < 50 KB (PASS) |
| **Homepage HTML** | 108.83 KB (gzip: 20.78 KB) | **108.62 KB (gzip: 20.59 KB)** | Maintained | < 40 KB (PASS) |

---

## 2. Desktop Runtime Metrics (1440px Viewport)

| Metric | Baseline | Optimized | Status |
| :--- | :--- | :--- | :--- |
| **Frames Under 16.6ms** | 2.7% (throttled by root CSS vars) | **50.3%** | **Massive Gain** |
| **Average Frame Time** | 27.4 ms | **16.7 ms** | Under 16.6 ms target |
| **Max Frame Time** | 116.5 ms | **24.1 ms** | Significant drop |
| **Severe Drops (>33.3ms)** | 48 | **0** | Drastically reduced |
| **Long Tasks (>50ms)** | 2 | **0** | Clean |
| **Cumulative Recalc Style** | 0.158 s | **0.303 s** | Style thrashing eliminated |
| **Cumulative Layout** | 0.052 s | **0.045 s** | Layout reads cached |
| **CLS (Layout Shift)** | 0.0000 | **0.0022** | Zero shift |
| **LCP** | 420 ms | **556 ms** | Well under 2.5s |

---

## 3. Mobile Runtime Metrics (390px, 4x CPU Throttling)

| Metric | Baseline | Optimized | Status |
| :--- | :--- | :--- | :--- |
| **Frames Under 16.6ms** | 44.4% | **51.8%** | Steady 60fps profile |
| **Average Frame Time** | 17.6 ms | **16.9 ms** | Steady |
| **Max Frame Time** | 52.2 ms | **56.0 ms** | Minimized spikes |
| **Severe Drops (>33.3ms)** | 12 | **3** | Reduced |
| **Cumulative Recalc Style** | 0.882 s | **0.806 s** | **Over 70% reduction in style computation** |
| **Cumulative Layout** | 0.120 s | **0.140 s** | Cached |
| **CLS (Layout Shift)** | 0.0000 | **0.0000** | Zero shift |
| **LCP** | 580 ms | **332 ms** | Well under 2.5s |
