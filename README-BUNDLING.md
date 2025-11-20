QViz — Bundling and build (Vite)
================================

This project uses Vite as the bundler and dev tool. Below are commands to run and a detailed explanation of what the bundler does and how it works.

Quick commands
--------------

- Install dependencies (once):
  ```powershell
  npm install
  ```
- Run dev server (fast dev experience, HMR):
  ```powershell
  npm run dev
  ```
- Create a production bundle (minified, optimized files in `dist/`):
  ```powershell
  npm run build
  ```
- Serve a production build locally for testing:
  ```powershell
  npm run preview
  ```

What Vite does (high-level)
----------------------------
Vite provides two modes:

- Development mode (dev server): serves your source files as ES modules and uses very fast transforms (esbuild) and HMR for instant feedback.
- Production mode (build): uses Rollup to produce optimized bundles (tree-shaking, minification, code-splitting, asset hashing).

What happens when you run `npm run build`
----------------------------------------
1. Vite analyzes the module graph starting from `index.html` and finds all imports.
2. Each module is transformed (JSX/TS -> JS) using fast tools (esbuild + Rollup plugins).
3. Rollup bundles modules into chunks, performs tree-shaking and code-splitting.
4. CSS and assets are extracted, optimized and hashed.
5. Output is written to `dist/` with sourcemaps (if enabled).

Files added/changed
-------------------
- `vite.config.js` — Vite configuration (dev server port, build output, React plugin).
- `package.json` — includes scripts and `@vitejs/plugin-react` as a dev dependency.

Deployment
----------
Upload `dist/` to any static host (Netlify, Vercel, GitHub Pages, nginx, etc.).

If you want, I can:
- Add a deploy script for GitHub Pages or Netlify.
- Show a manualChunks example to control splitting of vendor code.
- Run `npm run build` here and show the produced `dist/` contents.

If you want a deeper explanation (sourcemaps, tree-shaking internals, chunking strategies), tell me which part to expand.
