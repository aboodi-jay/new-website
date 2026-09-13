# aboodijay.com

Vite + React + Framer Motion blog for pentest writeups and blog posts.

## Run locally

```bash
npm install
npm run dev
```

## Build for production

```bash
npm run build
```

Output lands in `dist/`. Deploy that folder to any static host — Vercel, Netlify,
Cloudflare Pages, GitHub Pages, or your own server all work with zero config
(it's a static site, no backend needed for reading).

## Adding content

There's no in-browser editor or login. Posts are markdown files with
frontmatter, loaded and baked into the site at build time:

```
content/
  writeups/idor-invoice-export.md
  blog/hello-world.md
```

To add a new entry, create a file in the matching folder:

```markdown
---
title: My new writeup
date: 2026-09-11
tags: [xss, bugbounty]
---

Body goes here in normal markdown. Screenshots too:

![description](/images/screenshot.png)
```

Put the image itself in `public/images/` and reference it with an absolute
`/images/...` path.

Workflow: write the `.md` file locally → `git commit` → `git push`. If the
repo is connected to Vercel, Netlify, or Cloudflare Pages, that push triggers
an automatic rebuild and deploy — no editor UI, no auth screen, no database.
Access control is just "who has push access to the repo," same as any other
git-based static site.

## Link previews (Open Graph)

`index.html` has Open Graph and Twitter Card meta tags, plus `public/og-image.png`
(the actual preview image, 1200×630 — the standard size). This is what
WhatsApp, Discord, Slack, iMessage, etc. read to build that title +
description + image preview card when someone shares a link.

**Limitation worth knowing:** since this is a client-side-rendered SPA (no
server-side rendering), every URL on the site shares the *same* preview —
sharing a specific post link shows the same aboodijay.com card as sharing
the homepage, not that post's own title/image. Fixing that properly means
either prerendering each post to its own static HTML at build time, or
moving to a framework with SSR/SSG (Astro, Next.js, etc.) — a bigger change
than a couple of meta tags. Ask if you want that built out; for now, a
solid site-wide preview covers the common case well.

The source `design/og-image.svg` is kept for future edits — regenerate the
PNG after editing it with:

```bash
rsvg-convert -w 1200 -h 630 design/og-image.svg -o public/og-image.png
```

(`rsvg-convert` comes from the `librsvg2-bin` package on Debian/Ubuntu, or
`brew install librsvg` on macOS.)

## Structure

```
content/        markdown posts, organized by type (writeups/blog)
public/images/  screenshots referenced from posts
src/
  components/   UI pieces (TopNav, Hero, PostList, PostDetail, About)
  content.js    loads + parses all markdown files at build time
  lib/          date formatting, excerpt helper
  App.jsx       view routing + Framer Motion page transitions
  index.css     theme tokens + layout (purple palette, pentester.land-style nav)
```

## Notes on a couple of features

- **404 page**: `public/404.html` is a standalone page (no React) that most
  static hosts — GitHub Pages, Cloudflare Pages, Netlify — automatically
  serve when a route doesn't match. Vercel needs an explicit rewrite rule
  for this if you deploy there; ask if you want that wired up.
- **Light/dark toggle**: switches between Catppuccin Mocha (dark) and Latte
  (light) by swapping CSS variables via a `data-theme` attribute. Code block
  syntax highlighting also swaps between the matching Mocha/Latte
  highlight.js themes at runtime, so code stays readable in both modes.
  The swap itself animates two ways: every themed color has a CSS
  transition so nothing changes instantly (works in every browser), and in
  Chromium-based browsers (Chrome, Edge) it additionally uses the View
  Transitions API for a circular "reveal" wipe expanding out from the
  toggle button — Firefox/Safari fall back to just the smooth color fade.
  The toggle icon itself also plays a small flourish: a lightbulb
  flicker-on when switching to light, a moon with twinkling stars when
  switching to dark. Respects `prefers-reduced-motion` (skips the circular
  wipe, keeps the fade).
- **Routing**: real URLs via `react-router-dom` — `/`, `/writeups`, `/blog`,
  `/about`, `/search`, `/post/:id`. `vercel.json` includes a rewrite so
  refreshing or directly visiting a deep link (e.g. `aboodijay.com/about`)
  works instead of 404ing at the server level — Vercel serves real static
  files (assets, images, favicon) directly, and only falls back to
  `index.html` for paths that don't match an actual file, letting the router
  take over from there. An unmatched route (a real 404, like a typo'd post
  slug) renders `src/pages/NotFoundPage.jsx` inside the app rather than
  `public/404.html` — that static file is kept only as a fallback for hosts
  that don't get the `vercel.json` rewrite (e.g. if you ever move off
  Vercel to a host with its own static-404 convention, like GitHub Pages).

## Changing the font

Edit the three CSS variables at the top of `src/index.css`:

```css
--mono: 'JetBrains Mono', monospace;
--serif: 'Jost', serif;
--sans: 'Jost', sans-serif;
```

Update the Google Fonts `<link>` in `index.html` to match whatever you pick.
