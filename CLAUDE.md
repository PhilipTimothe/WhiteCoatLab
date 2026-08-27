# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

WhiteCoatLab is a single-page marketing/portfolio site for a creative production studio (whitecoatlab.co), built with Vite + React 18 + TypeScript + Tailwind CSS. It's deployed as a static site to GitHub Pages.

## Commands

```bash
npm run dev       # start Vite dev server
npm run build     # type-check-free production build (tsc is not run in the build script)
npm run preview   # preview the production build locally
npm run deploy    # build + publish dist/ to gh-pages branch (gh-pages -d dist)
npx eslint .       # lint (no npm script defined; run eslint directly)
```

There is no test runner configured in this repo (no test script, no test files) despite `@types/jest` being a dependency.

## Deployment

Two deployment paths exist and both target the custom domain `www.whitecoatlab.co` (see `CNAME`):
- `.github/workflows/deploy.yml` auto-builds and deploys to GitHub Pages via `actions/deploy-pages` on every push to `main`.
- `npm run deploy` (gh-pages CLI) is an alternate manual path that pushes `dist/` to the `gh-pages` branch.

`vite.config.ts` sets `base: "/"` because this is a custom-domain deployment, not a `<user>.github.io/<repo>` deployment — don't change this to a repo-name path.

## Architecture

- **Routing**: `src/main.tsx` uses `HashRouter` (not `BrowserRouter`) from react-router-dom — required because this is a static GitHub Pages deploy with no server-side rewrite rules for deep links. All routes are registered here and each top-level route maps to one page component in `src/pages/`.
- **Pages vs components**: `src/pages/*Page.tsx` are route-level components that own page data (hardcoded arrays of media URLs/copy) and page-level effects (e.g. setting `document.body.style.backgroundColor` on mount/unmount for page-specific theming). `src/components/` holds reusable presentational pieces (grids, modals, nav, video players) that receive data via props rather than fetching it themselves.
- **No CMS/backend for content**: all copy and media references (image/video URLs) are hardcoded directly in the page components (e.g. `BriefsPage.tsx`, `ArchitecturePage.tsx`, `PortraitsPage.tsx`, `VisualStoriesPage.tsx`). To add or edit portfolio content, edit the relevant array literal in that page file directly — there is no data layer to update elsewhere.
- **Media hosting**: images are served from Cloudflare Images (`imagedelivery.net/ly47schtw9lMeXBIbG9ODw/<id>/public`) and video from Cloudflare Stream HLS manifests (`customer-*.cloudflarestream.com/<id>/manifest/video.m3u8`), played via `hls.js` (see `VideoBackground.tsx`, `VideoThumbnail.tsx`, `VideoModal.tsx`). Some fallback/placeholder images come from Pexels. When adding new media, follow the existing `imagedelivery.net`/`cloudflarestream.com` URL patterns.
- **Scroll-driven visuals**: several components implement scroll-based effects manually via `window.scrollY` + `requestAnimationFrame` rather than a library — see `useBackgroundColor` (`src/hooks/useBackgroundColor.ts`, drives the body background color transition as different `.hero-section`/`.narrative-section`/`.featured-works-section` elements scroll into view) and the parallax transforms in `App.tsx` and `VideoBackground.tsx`. `framer-motion` is used separately for entrance/reveal animations (fade/slide-in on scroll into view via `IntersectionObserver`, e.g. in `BriefsGrid.tsx`, `PortraitsGrid.tsx`).
- **Contact form**: `ContactPage.tsx` submits directly to Formspree (`https://formspree.io/f/mzzgayad`) client-side — there is no backend in this repo.
- **Navigation theming**: `Navigation.tsx` takes a `theme="dark" | "light"` prop set per-page/section since the site alternates black and white backgrounds; keep this in mind when adding new sections that mount `Navigation`.
