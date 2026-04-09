# CLAUDE.md

## Project Overview

Personal site and blog for Ed Ezekiel — [edezekiel.com](https://edezekiel.com). Built with Astro 5, TypeScript, and a Rivian Green dark theme.

## Tech Stack

- **Framework:** Astro 5 (static site generator)
- **Language:** TypeScript
- **Linting/Formatting:** Biome (`npm run lint`, `npm run format`)
- **CI:** GitHub Actions — typecheck, lint, build on push/PR to main
- **Deployment:** Netlify

## Key Directories

- `src/pages/` — Astro pages (routes)
- `src/components/` — Reusable Astro components
- `src/layouts/` — Page layouts (BaseLayout, BlogPost)
- `src/content/blog/` — Markdown blog posts
- `src/data/` — Data files (projects, archive)
- `src/styles/` — Global CSS
- `src/scripts/` — Client-side TypeScript
- `public/` — Static assets

## Commands

```sh
npm run dev        # Start dev server (localhost:4321)
npm run build      # Typecheck + build (astro check && astro build)
npm run lint       # Check with Biome
npm run lint:fix   # Auto-fix lint issues
npm run format     # Format with Biome
```

## Conventions

- Run `npm run lint` before committing — CI enforces this
- Blog posts go in `src/content/blog/` as Markdown files with frontmatter (title, description, pubDate, heroImage)
- Site constants (title, description) live in `src/consts.ts`
- CSS uses custom properties defined in `src/styles/global.css` — respect the existing color palette
- Tests use Vitest (`npm test`) — CI runs them before build
