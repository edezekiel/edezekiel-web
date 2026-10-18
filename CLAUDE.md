# CLAUDE.md

## Project Overview

Personal site and blog for Ed Ezekiel — [edezekiel.com](https://edezekiel.com). Built with Astro 5, TypeScript, and a Rivian Green dark theme.

## Tech Stack

- **Framework:** Astro 5 (static site generator)
- **Language:** TypeScript
- **Linting/Formatting:** Biome (`npm run lint`, `npm run format`)
- **CI:** GitHub Actions — typecheck, lint, build on push/PR to main
- **Deployment:** Cloudflare Pages

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

## Writing a Blog Post

When asked to draft a new post, run every step below in order without waiting to be asked for each one:

1. **Draft** with the `blog-voice` skill (`.claude/skills/blog-voice/`). Read its reference posts first, then write the post in `src/content/blog/` with frontmatter.
2. **Technical check** using steps 1 and 2 of the editing pass in `blog-voice`: verify commands, config, claims, numbers and links, then tighten structure. Fix what's wrong and list anything that couldn't be verified.
3. **Voice edit** with the `blog-voice-edit` skill (`.claude/skills/blog-voice-edit/`), sentence by sentence.
4. **Build and lint**: `npm run build` and `npm run lint` must pass.
5. **Preview**: commit on a `post/<slug>` branch and open a PR so Ed can preview it.
6. **Report** the technical fixes, the voice edits, and anything still unverified.

For edits to an existing post, run steps 2 to 6.
