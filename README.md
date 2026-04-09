# Ed Ezekiel Web

Personal site and blog at [edezekiel.com](https://edezekiel.com) — engineering, security, and the occasional deep dive.

## Tech Stack

- [Astro 5](https://astro.build/) — static site generator
- TypeScript
- [Biome](https://biomejs.dev/) — linting and formatting
- GitHub Actions CI (typecheck, lint, build)
- Deployed via Netlify

## Features

- Blog with 45+ posts (2018–present)
- [Treehouse project](https://edezekiel.com/treehouse) — photo-documented build timeline
- RSS feed and sitemap
- SEO-friendly with canonical URLs and OpenGraph data
- Rivian Green dark theme with amber accents

## Commands

| Command              | Action                                      |
| :------------------- | :------------------------------------------ |
| `npm install`        | Install dependencies                        |
| `npm run dev`        | Start local dev server at `localhost:4321`   |
| `npm run build`      | Typecheck and build to `./dist/`            |
| `npm run preview`    | Preview the build locally                   |
| `npm run lint`       | Check with Biome                            |
| `npm run lint:fix`   | Auto-fix lint issues                        |
| `npm run format`     | Format with Biome                           |

## Credit

Originally based on [Bear Blog](https://github.com/HermanMartinus/bearblog/).
