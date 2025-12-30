# Fix Log

## [2025-12-30] Tailwind CSS Compatibility & Performance Optimization

### 1. Tailwind CSS PostCSS Logic Compatibility
**Issue:**
The build failed with the error:
`[postcss] It looks like you're trying to use 'tailwindcss' directly as a PostCSS plugin...`
This happened because the latest Tailwind CSS v4 (alpha/beta) was installed by default, which has breaking changes in how it integrates with PostCSS compared to v3.

**Fix:**
- Downgraded Tailwind CSS to the stable v3 version.
- Command: `npm install -D tailwindcss@3.4.17`
- Cleared Vite cache to ensure the previous v4 artifacts did not persist (`Remove-Item -Recurse -Force node_modules/.vite`).

### 2. Canvas Animation Performance (Lag)
**Issue:**
The visual "Hero" section caused significant browser lag and high CPU usage.

**Fix:**
- Optimized `Client/src/components/ui/canvas.jsx`.
- Reduced particle `trails` from 80 to 20.
- Reduced particle `size` from 50 to 30.
- This maintains the visual effect while significantly reducing the number of calculations per frame.
