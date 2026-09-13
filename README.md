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
