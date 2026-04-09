# Archive Page & ProjectTimeline Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build an interactive `/archive` page with scroll-linked reveal, live theme swapping, and a shared ProjectTimeline component system that also refactors the Treehouse page.

**Architecture:** New shared components (`ProjectTimeline`, `TimelineShelf`, `TimeCapsule`) power both the Archive and Treehouse pages. Archive uses a "reveal" mode with IntersectionObserver for scroll-linked opacity, theme swapping, and shelf progress. Treehouse uses a "vertical" mode with collapsible date-grouped capsules.

**Tech Stack:** Astro 5, TypeScript, CSS custom properties, `@property` registration, IntersectionObserver, CSS keyframe animations.

**Spec:** `docs/superpowers/specs/2026-04-09-archive-page-design.md`

---

### Task 1: Copy screenshot assets and create shared types

**Files:**

- Create: `src/assets/archive/era-0.png` through `era-5.png`
- Create: `src/data/types.ts`

- [ ] **Step 1: Copy screenshots into the project**

```bash
mkdir -p src/assets/archive
cp ~/Desktop/edezekiel-blog-archive/edezekiel-blog-era-0.png src/assets/archive/era-0.png
cp ~/Desktop/edezekiel-blog-archive/edezekiel-blog-era-1.png src/assets/archive/era-1.png
cp ~/Desktop/edezekiel-blog-archive/edezekiel-blog-era-2.png src/assets/archive/era-2.png
cp ~/Desktop/edezekiel-blog-archive/edezekiel-blog-era-3.png src/assets/archive/era-3.png
cp ~/Desktop/edezekiel-blog-archive/edezekiel-blog-era-4.png src/assets/archive/era-4.png
cp ~/Desktop/edezekiel-blog-archive/edezekiel-blog-era-5.png src/assets/archive/era-5.png
```

- [ ] **Step 2: Create the shared types file**

Create `src/data/types.ts`:

```ts
import type { ImageMetadata } from 'astro';

export interface TimelineEntry {
  id: string;
  date: Date;
  endDate?: Date;
  title: string;
  description: string;
  image?: ImageMetadata;
  images?: ImageMetadata[];
  metadata?: Record<string, string>;
  links?: { label: string; url: string }[];
}

export interface ArchiveEra extends TimelineEntry {
  eraNumber: number;
  palette: {
    '--bg-primary': string;
    '--bg-secondary': string;
    '--bg-card': string;
    '--text-primary': string;
    '--text-secondary': string;
    '--accent': string;
    '--accent-light': string;
    '--accent-warm': string;
    '--border': string;
  };
  colors: string[];
  techStack: string[];
}
```

- [ ] **Step 3: Verify TypeScript compiles**

Run: `npx astro check`
Expected: No errors related to `src/data/types.ts`.

- [ ] **Step 4: Commit**

```bash
git add src/assets/archive/ src/data/types.ts
git commit -m "feat: add archive screenshots and shared timeline types"
```

---

### Task 2: Create archive era data

**Files:**

- Create: `src/data/archive.ts`

- [ ] **Step 1: Create the archive data file**

Create `src/data/archive.ts`:

```ts
import type { ArchiveEra } from './types';

import era0 from '../assets/archive/era-0.png';
import era1 from '../assets/archive/era-1.png';
import era2 from '../assets/archive/era-2.png';
import era3 from '../assets/archive/era-3.png';
import era4 from '../assets/archive/era-4.png';
import era5 from '../assets/archive/era-5.png';

export const eras: ArchiveEra[] = [
  {
    id: 'era-0',
    eraNumber: 0,
    date: new Date('2018-10-05'),
    title: 'The FTP Era',
    description:
      'Where it all started. Hand-written HTML and CSS, uploaded to Bluehost via FTP. Zilla Slab font, red links, and a lamp banner header. Ed\'s Bootcamp Blog.',
    image: era0,
    colors: ['#e73431', '#E9EBEE'],
    techStack: ['HTML', 'CSS', 'Bluehost', 'FTP'],
    links: [
      { label: 'GitHub', url: 'https://github.com/edezekiel/edezekiel-blog' },
    ],
    palette: {
      '--bg-primary': '#E9EBEE',
      '--bg-secondary': '#d5d8dc',
      '--bg-card': '#ffffff',
      '--text-primary': '#000000',
      '--text-secondary': '#555555',
      '--accent': '#e73431',
      '--accent-light': '#ff5a57',
      '--accent-warm': '#e73431',
      '--border': '#08090d',
    },
  },
  {
    id: 'era-1',
    eraNumber: 1,
    date: new Date('2019-02-06'),
    endDate: new Date('2019-08-01'),
    title: 'React + Rails',
    description:
      'Full-stack rebuild with a React frontend and Rails API. Had its own login system and a live-preview article editor. Deployed across Netlify and Heroku.',
    image: era1,
    colors: ['#0066cc', '#ffffff'],
    techStack: ['React', 'Rails', 'Netlify', 'Heroku'],
    links: [
      {
        label: 'Frontend',
        url: 'https://github.com/edezekiel/frontend-react-rails-blog',
      },
      {
        label: 'Backend',
        url: 'https://github.com/edezekiel/backend-react-rails-blog',
      },
    ],
    palette: {
      '--bg-primary': '#ffffff',
      '--bg-secondary': '#f5f5f5',
      '--bg-card': '#ffffff',
      '--text-primary': '#333333',
      '--text-secondary': '#666666',
      '--accent': '#0066cc',
      '--accent-light': '#3399ff',
      '--accent-warm': '#0066cc',
      '--border': '#dddddd',
    },
  },
  {
    id: 'era-2',
    eraNumber: 2,
    date: new Date('2019-11-01'),
    endDate: new Date('2021-06-24'),
    title: 'The Purple Gatsby Era',
    description:
      'First Gatsby site. Purple header with an astronaut SVG, Montserrat font, Prism syntax highlighting. Built during the Flatiron bootcamp era.',
    image: era2,
    colors: ['#6b37bf', '#fcfaff'],
    techStack: ['Gatsby v2', 'Netlify', 'Prism'],
    links: [
      {
        label: 'GitHub',
        url: 'https://github.com/edezekiel/gatsby-netlify-blog',
      },
      {
        label: 'Wayback',
        url: 'https://web.archive.org/web/20191120071517/https://www.edezekiel.com/',
      },
    ],
    palette: {
      '--bg-primary': '#fcfaff',
      '--bg-secondary': '#f0eaf8',
      '--bg-card': '#ffffff',
      '--text-primary': '#000000',
      '--text-secondary': '#555555',
      '--accent': '#6b37bf',
      '--accent-light': '#8b5fcf',
      '--accent-warm': '#6b37bf',
      '--border': '#6b37bf',
    },
  },
  {
    id: 'era-3',
    eraNumber: 3,
    date: new Date('2021-06-24'),
    endDate: new Date('2023-12-31'),
    title: 'Dark Mode Gatsby',
    description:
      'Complete rewrite to Gatsby v3 with a dark theme. CSS Modules, VSCode-based syntax highlighting, Times serif font. Cut dependencies from 28 to 16.',
    image: era3,
    colors: ['#7f5af0', '#16161a'],
    techStack: ['Gatsby v3', 'CSS Modules', 'gatsby-remark-vscode'],
    links: [
      {
        label: 'GitHub',
        url: 'https://github.com/edezekiel/ed-ezekiel-gatsby-blog',
      },
      {
        label: 'Wayback',
        url: 'https://web.archive.org/web/20210612222904/https://edezekiel.com/',
      },
    ],
    palette: {
      '--bg-primary': '#16161a',
      '--bg-secondary': '#1e1e24',
      '--bg-card': '#29293e',
      '--text-primary': '#ffffff',
      '--text-secondary': '#94a1b2',
      '--accent': '#7f5af0',
      '--accent-light': '#e068fd',
      '--accent-warm': '#e068fd',
      '--border': '#383a61',
    },
  },
  {
    id: 'era-4',
    eraNumber: 4,
    date: new Date('2024-01-01'),
    endDate: new Date('2026-01-01'),
    title: 'The Digital Garden',
    description:
      'Migrated from Gatsby to Astro v4. Clean light theme, Atkinson Hyperlegible font, blue accents. Hosted on Cloudflare Pages. A fresh start.',
    image: era4,
    colors: ['#2337ff', '#ffffff'],
    techStack: ['Astro v4', 'Cloudflare Pages', 'Atkinson'],
    links: [
      {
        label: 'Wayback',
        url: 'https://web.archive.org/web/20240417234542/https://edezekiel.com/',
      },
    ],
    palette: {
      '--bg-primary': '#ffffff',
      '--bg-secondary': '#f8f9fb',
      '--bg-card': '#ffffff',
      '--text-primary': '#22293a',
      '--text-secondary': '#607396',
      '--accent': '#2337ff',
      '--accent-light': '#4d5eff',
      '--accent-warm': '#2337ff',
      '--border': '#e5e7f0',
    },
  },
  {
    id: 'era-5',
    eraNumber: 5,
    date: new Date('2026-01-01'),
    title: 'The Forest Era',
    description:
      'The current incarnation. Astro v5, Rivian Green dark theme, hedgehog animations, treehouse project page. Nature-anchored and still growing.',
    image: era5,
    colors: ['#7c9a5e', '#1a1f1a'],
    techStack: ['Astro v5', 'Rivian Green', 'hedgehog animations'],
    links: [
      { label: 'GitHub', url: 'https://github.com/edezekiel/edezekiel-web' },
      { label: 'Live', url: 'https://edezekiel.com/' },
    ],
    palette: {
      '--bg-primary': '#1a1f1a',
      '--bg-secondary': '#232923',
      '--bg-card': '#2a322a',
      '--text-primary': '#e8ebe4',
      '--text-secondary': '#9ca89a',
      '--accent': '#7c9a5e',
      '--accent-light': '#a3c47d',
      '--accent-warm': '#c4a35a',
      '--border': '#3a443a',
    },
  },
];
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx astro check`
Expected: No errors related to `src/data/archive.ts`.

- [ ] **Step 3: Commit**

```bash
git add src/data/archive.ts
git commit -m "feat: add archive era data with palettes"
```

---

### Task 3: Create TimeCapsule component (reveal mode)

**Files:**

- Create: `src/components/TimeCapsule.astro`

- [ ] **Step 1: Create the TimeCapsule component**

This component renders one era's content. In reveal mode (Archive), it's always expanded. In vertical mode (Treehouse, Task 9), it supports collapse/expand.

Create `src/components/TimeCapsule.astro`:

```astro
---
import { Image } from 'astro:assets';
import type { ImageMetadata } from 'astro';

interface Props {
  mode: 'reveal' | 'vertical';
  id: string;
  title: string;
  description: string;
  eraLabel?: string;
  image?: ImageMetadata;
  images?: ImageMetadata[];
  colors?: string[];
  techStack?: string[];
  links?: { label: string; url: string }[];
  /** Child entries for vertical mode grouped capsules */
  children?: { title: string; description: string; image?: ImageMetadata }[];
}

const {
  mode,
  id,
  title,
  description,
  eraLabel,
  image,
  images,
  colors,
  techStack,
  links,
  children,
} = Astro.props;

const isReveal = mode === 'reveal';
const isGrouped = (children?.length ?? 0) > 0;
---

<div
  class:list={['capsule', `capsule--${mode}`, { 'capsule--grouped': isGrouped }]}
  data-capsule-id={id}
  id={id}
>
  {eraLabel && <span class='capsule-era-label'>{eraLabel}</span>}
  <h3 class='capsule-title'>{title}</h3>

  {image && (
    <div class='capsule-screenshot'>
      <Image
        src={image}
        alt={title}
        width={720}
        loading='lazy'
      />
    </div>
  )}

  <p class='capsule-description'>{description}</p>

  {colors && colors.length > 0 && (
    <div class='capsule-swatches'>
      {colors.map((hex) => (
        <div class='swatch'>
          <span class='swatch-color' style={`background-color: ${hex};`} />
          <span class='swatch-label'>{hex}</span>
        </div>
      ))}
    </div>
  )}

  {techStack && techStack.length > 0 && (
    <div class='capsule-tech'>
      {techStack.map((tech) => (
        <span class='tech-tag'>{tech}</span>
      ))}
    </div>
  )}

  {links && links.length > 0 && (
    <div class='capsule-links'>
      {links.map((link) => (
        <a href={link.url} target='_blank' rel='noopener noreferrer' class='capsule-link'>
          {link.label}
        </a>
      ))}
    </div>
  )}

  {/* Vertical mode: grouped child entries */}
  {isGrouped && children && (
    <div class='capsule-children'>
      {children.map((child) => (
        <div class='capsule-child'>
          <h4>{child.title}</h4>
          {child.image && (
            <Image src={child.image} alt={child.title} width={720} loading='lazy' />
          )}
          <p>{child.description}</p>
        </div>
      ))}
    </div>
  )}
</div>

<style>
  .capsule {
    position: relative;
    margin-bottom: 2.5em;
    padding-bottom: 2.5em;
    border-bottom: 1px solid var(--border);
  }
  .capsule:last-child {
    border-bottom: none;
  }

  /* --- Reveal mode (Archive) --- */
  .capsule--reveal {
    opacity: 0.1;
    transform: translateY(20px);
    transition: opacity 0.4s ease, transform 0.4s ease;
  }
  .capsule--reveal.capsule--active {
    opacity: 1;
    transform: translateY(0);
  }
  .capsule--reveal.capsule--visited {
    opacity: 0.4;
    transform: translateY(0);
  }

  /* --- Vertical mode (Treehouse) --- */
  .capsule--vertical {
    position: relative;
    padding-left: 1.5em;
  }
  .capsule--vertical::before {
    content: '';
    position: absolute;
    left: -0.55em;
    top: 0.35em;
    width: 10px;
    height: 10px;
    background: var(--accent);
    border-radius: 50%;
    border: 2px solid var(--bg-primary);
  }
  .capsule--grouped .capsule-children {
    display: none;
  }
  .capsule--grouped.capsule--expanded .capsule-children {
    display: block;
  }

  /* --- Shared styles --- */
  .capsule-era-label {
    display: block;
    color: var(--accent-warm);
    font-size: 0.8em;
    margin-bottom: 0.25em;
  }
  .capsule-title {
    font-size: 1.4em;
    margin-bottom: 0.5em;
    color: var(--text-primary);
  }
  .capsule-screenshot {
    margin: 0.75em 0;
  }
  .capsule-screenshot img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    border: 1px solid var(--border);
  }
  .capsule-description {
    color: var(--text-secondary);
    line-height: 1.6;
    max-width: 640px;
  }
  .capsule-swatches {
    display: flex;
    gap: 1em;
    margin: 0.75em 0;
    align-items: center;
  }
  .swatch {
    display: flex;
    align-items: center;
    gap: 0.4em;
  }
  .swatch-color {
    display: inline-block;
    width: 20px;
    height: 20px;
    border-radius: 4px;
    border: 1px solid var(--border);
  }
  .swatch-label {
    font-size: 0.75em;
    color: var(--text-secondary);
    font-family: monospace;
  }
  .capsule-tech {
    display: flex;
    gap: 0.5em;
    flex-wrap: wrap;
    margin: 0.75em 0;
  }
  .tech-tag {
    font-size: 0.75em;
    padding: 0.2em 0.6em;
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 6px;
    color: var(--text-secondary);
  }
  .capsule-links {
    display: flex;
    gap: 0.6em;
    margin-top: 0.75em;
  }
  .capsule-link {
    font-size: 0.8em;
    padding: 0.3em 0.7em;
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 6px;
    color: var(--accent);
    text-decoration: none;
    transition: background-color 0.2s ease, border-color 0.2s ease;
  }
  .capsule-link:hover {
    background: var(--bg-secondary);
    border-color: var(--accent);
  }

  /* Vertical mode children */
  .capsule-child {
    margin-top: 1.5em;
    padding-top: 1em;
    border-top: 1px dashed var(--border);
  }
  .capsule-child h4 {
    font-size: 1.1em;
    color: var(--accent-warm);
    margin-bottom: 0.3em;
  }
  .capsule-child img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    margin: 0.5em 0;
    border: 1px solid var(--border);
  }
  .capsule-child p {
    color: var(--text-secondary);
    line-height: 1.6;
  }

  @media (prefers-reduced-motion: reduce) {
    .capsule--reveal {
      opacity: 1;
      transform: none;
      transition: none;
    }
    .capsule--reveal.capsule--visited {
      opacity: 1;
    }
  }
</style>
```

- [ ] **Step 2: Verify it compiles**

Run: `npx astro check`
Expected: No errors related to `TimeCapsule.astro`.

- [ ] **Step 3: Commit**

```bash
git add src/components/TimeCapsule.astro
git commit -m "feat: add TimeCapsule component with reveal and vertical modes"
```

---

### Task 4: Create TimelineShelf component

**Files:**

- Create: `src/components/TimelineShelf.astro`

- [ ] **Step 1: Create the TimelineShelf component**

Create `src/components/TimelineShelf.astro`:

```astro
---
interface ShelfEntry {
  id: string;
  label: string;
  shortLabel: string;
}

interface Props {
  entries: ShelfEntry[];
}

const { entries } = Astro.props;
---

<nav class='shelf' aria-label='Timeline navigation'>
  <div class='shelf-track'>
    {entries.map((entry, i) => (
      <>
        {i > 0 && <div class='shelf-segment' data-segment-index={i - 1} />}
        <button
          class='shelf-dot'
          data-shelf-index={i}
          data-target={entry.id}
          aria-label={`Jump to ${entry.label}`}
        >
          <span class='dot-circle' />
          <span class='shelf-print' aria-hidden='true' />
        </button>
      </>
    ))}
  </div>
  <div class='shelf-labels'>
    {entries.map((entry, i) => (
      <span class='shelf-label' data-shelf-index={i}>
        <span class='label-full'>{entry.label}</span>
        <span class='label-short'>{entry.shortLabel}</span>
      </span>
    ))}
  </div>
</nav>

<style>
  .shelf {
    position: sticky;
    top: 0;
    z-index: 20;
    background: var(--bg-secondary);
    border-bottom: 1px solid var(--border);
    padding: 1em 1.5em 0.6em;
    transition: background-color 0.6s ease, border-color 0.6s ease;
  }
  .shelf-track {
    display: flex;
    align-items: center;
    gap: 0;
  }
  .shelf-segment {
    flex: 1;
    height: 2px;
    background: var(--border);
    transition: background-color 0.4s ease;
  }
  .shelf-segment.segment--filled {
    background: var(--accent);
  }
  .shelf-dot {
    position: relative;
    background: none;
    border: none;
    padding: 4px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .dot-circle {
    display: block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--border);
    transition: background-color 0.4s ease, width 0.3s ease, height 0.3s ease;
  }
  .shelf-dot.dot--visited .dot-circle {
    background: var(--accent);
  }
  .shelf-dot.dot--active .dot-circle {
    width: 12px;
    height: 12px;
    background: var(--accent-light);
    box-shadow: 0 0 8px rgba(124, 154, 94, 0.3);
  }

  /* Footprints on shelf */
  .shelf-print {
    position: absolute;
    top: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 3px;
    height: 3px;
    background: var(--accent);
    border-radius: 50%;
    opacity: 0;
  }
  .shelf-dot.dot--visited .shelf-print {
    animation: shelf-print-show 0.4s ease forwards;
  }
  @keyframes shelf-print-show {
    to { opacity: 0.4; }
  }

  .shelf-labels {
    display: flex;
    justify-content: space-between;
    margin-top: 0.3em;
  }
  .shelf-label {
    font-size: 0.65em;
    color: var(--text-secondary);
    text-align: center;
    transition: color 0.4s ease;
    min-width: 0;
  }
  .shelf-label.label--active {
    color: var(--accent-light);
    font-weight: 700;
  }
  .shelf-label.label--visited {
    color: var(--accent);
  }
  .label-short {
    display: none;
  }

  .shelf-dot:focus-visible .dot-circle {
    outline: 2px solid var(--accent-light);
    outline-offset: 2px;
  }

  @media (max-width: 720px) {
    .shelf {
      padding: 0.8em 1em 0.4em;
    }
    .label-full {
      display: none;
    }
    .label-short {
      display: inline;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .shelf-dot.dot--visited .shelf-print {
      animation: none;
      opacity: 0.4;
    }
  }
</style>
```

- [ ] **Step 2: Verify it compiles**

Run: `npx astro check`
Expected: No errors related to `TimelineShelf.astro`.

- [ ] **Step 3: Commit**

```bash
git add src/components/TimelineShelf.astro
git commit -m "feat: add TimelineShelf sticky navigation component"
```

---

### Task 5: Create ProjectTimeline wrapper component

**Files:**

- Create: `src/components/ProjectTimeline.astro`

- [ ] **Step 1: Create the ProjectTimeline component**

This is a thin wrapper that renders the appropriate mode. It serializes palette data as a JSON data attribute for the client-side script.

Create `src/components/ProjectTimeline.astro`:

```astro
---
import TimelineShelf from './TimelineShelf.astro';
import TimeCapsule from './TimeCapsule.astro';
import type { ArchiveEra } from '../data/types';
import type { TimelineEntry } from '../data/types';

interface Props {
  mode: 'reveal' | 'vertical';
  entries: TimelineEntry[] | ArchiveEra[];
}

const { mode, entries } = Astro.props;
const isReveal = mode === 'reveal';

// Build shelf entries for reveal mode
const shelfEntries = isReveal
  ? (entries as ArchiveEra[]).map((e) => ({
      id: e.id,
      label: e.title,
      shortLabel: `Era ${(e as ArchiveEra).eraNumber}`,
    }))
  : [];

// Serialize palettes for client-side theme swapping (reveal mode only)
const palettes = isReveal
  ? (entries as ArchiveEra[]).map((e) => ({ id: e.id, palette: e.palette }))
  : [];
---

<div
  class:list={['project-timeline', `project-timeline--${mode}`]}
  data-timeline-mode={mode}
  data-palettes={isReveal ? JSON.stringify(palettes) : undefined}
>
  {isReveal && <TimelineShelf entries={shelfEntries} />}

  <div class:list={['timeline-content', { 'timeline-vertical': !isReveal }]}>
    {(entries as ArchiveEra[]).map((entry) => {
      const eraLabel = isReveal
        ? `Era ${entry.eraNumber} · ${entry.date.getFullYear()}${entry.endDate ? '–' + entry.endDate.getFullYear() : '–present'}`
        : undefined;

      return (
        <TimeCapsule
          mode={mode}
          id={entry.id}
          title={entry.title}
          description={entry.description}
          eraLabel={eraLabel}
          image={entry.image}
          images={entry.images}
          colors={isReveal ? entry.colors : undefined}
          techStack={isReveal ? entry.techStack : undefined}
          links={entry.links}
        />
      );
    })}
  </div>
</div>

<style>
  .project-timeline--reveal {
    position: relative;
  }
  .timeline-content {
    max-width: 720px;
    margin: 0 auto;
    padding: 2em 0;
  }
  .timeline-vertical {
    border-left: 2px solid var(--border);
    padding-left: 1.5em;
    margin-left: 0.5em;
  }
</style>
```

- [ ] **Step 2: Verify it compiles**

Run: `npx astro check`
Expected: No errors related to `ProjectTimeline.astro`.

- [ ] **Step 3: Commit**

```bash
git add src/components/ProjectTimeline.astro
git commit -m "feat: add ProjectTimeline wrapper component"
```

---

### Task 6: Create the Archive page and add nav link

**Files:**

- Create: `src/pages/archive.astro`
- Modify: `src/components/Header.astro:12-16`

- [ ] **Step 1: Create the archive page**

Create `src/pages/archive.astro`:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import ProjectTimeline from '../components/ProjectTimeline.astro';
import { eras } from '../data/archive';
---

<BaseLayout>
  <article class='archive'>
    <header class='archive-header'>
      <h1>Archive</h1>
      <p class='archive-subtitle'>Six versions of this site, from FTP to forest.</p>
    </header>

    <ProjectTimeline mode='reveal' entries={eras} />

    <footer class='archive-footer'>
      <p>Still growing.</p>
    </footer>
  </article>
</BaseLayout>

<style>
  .archive-header {
    text-align: center;
    margin-bottom: 1em;
  }
  .archive-subtitle {
    color: var(--text-secondary);
    font-size: 1.1em;
    font-style: italic;
  }
  .archive-footer {
    text-align: center;
    padding: 2em 0;
    color: var(--text-secondary);
    font-style: italic;
  }
</style>
```

- [ ] **Step 2: Add Archive link to Header nav**

In `src/components/Header.astro`, add the Archive link between Blog and About. Change lines 12–16 from:

```astro
    <div class='internal-links'>
      <HeaderLink href='/'>Home</HeaderLink>
      <HeaderLink href='/blog'>Blog</HeaderLink>
      <HeaderLink href='/about'>About</HeaderLink>
    </div>
```

to:

```astro
    <div class='internal-links'>
      <HeaderLink href='/'>Home</HeaderLink>
      <HeaderLink href='/blog'>Blog</HeaderLink>
      <HeaderLink href='/archive'>Archive</HeaderLink>
      <HeaderLink href='/about'>About</HeaderLink>
    </div>
```

- [ ] **Step 3: Verify the page renders**

Run: `npm run dev`
Open `http://localhost:4321/archive` in the browser.
Expected: Page renders with title, subtitle, all 6 eras displayed as static capsules with screenshots, descriptions, swatches, tech tags, and links. No scroll behavior yet — capsules are all visible at `opacity: 0.1` (the reveal mode default). The shelf should appear at the top with 6 dots.

- [ ] **Step 4: Verify the nav link works**

Check that "Archive" appears in the header nav between Blog and About on all pages, and clicking it navigates to `/archive`.

- [ ] **Step 5: Commit**

```bash
git add src/pages/archive.astro src/components/Header.astro
git commit -m "feat: add Archive page and nav link"
```

---

### Task 7: Add scroll-linked reveal and dim behavior

**Files:**

- Create: `src/scripts/archive-observer.ts`
- Modify: `src/pages/archive.astro`

- [ ] **Step 1: Create the IntersectionObserver script**

Create `src/scripts/archive-observer.ts`:

```ts
/**
 * Scroll-linked reveal, dim, and shelf updates for the Archive page.
 * Also handles live theme swapping via CSS custom property overrides.
 */
export function initArchiveObserver() {
  const timeline = document.querySelector<HTMLElement>(
    '[data-timeline-mode="reveal"]',
  );
  if (!timeline) return;

  const capsules = timeline.querySelectorAll<HTMLElement>('[data-capsule-id]');
  const shelf = timeline.querySelector<HTMLElement>('.shelf');
  if (!capsules.length) return;

  // Parse palette data
  const palettesRaw = timeline.dataset.palettes;
  const palettes: { id: string; palette: Record<string, string> }[] =
    palettesRaw ? JSON.parse(palettesRaw) : [];

  // Store the forest (default) theme to restore on cleanup
  const rootStyle = getComputedStyle(document.documentElement);
  const defaultPalette: Record<string, string> = {};
  const paletteKeys = [
    '--bg-primary',
    '--bg-secondary',
    '--bg-card',
    '--text-primary',
    '--text-secondary',
    '--accent',
    '--accent-light',
    '--accent-warm',
    '--border',
  ];
  for (const key of paletteKeys) {
    defaultPalette[key] = rootStyle.getPropertyValue(key).trim();
  }

  let currentActiveId: string | null = null;

  function applyPalette(id: string) {
    if (id === currentActiveId) return;
    currentActiveId = id;
    const entry = palettes.find((p) => p.id === id);
    if (!entry) return;

    const body = document.body;
    for (const [key, value] of Object.entries(entry.palette)) {
      body.style.setProperty(key, value);
    }
  }

  function restoreDefaultPalette() {
    const body = document.body;
    for (const [key, value] of Object.entries(defaultPalette)) {
      body.style.setProperty(key, value);
    }
    currentActiveId = null;
  }

  function updateShelf(activeIndex: number) {
    if (!shelf) return;
    const dots = shelf.querySelectorAll<HTMLElement>('.shelf-dot');
    const segments = shelf.querySelectorAll<HTMLElement>('.shelf-segment');
    const labels = shelf.querySelectorAll<HTMLElement>('.shelf-label');

    dots.forEach((dot, i) => {
      dot.classList.toggle('dot--active', i === activeIndex);
      dot.classList.toggle('dot--visited', i <= activeIndex);
    });
    segments.forEach((seg, i) => {
      seg.classList.toggle('segment--filled', i < activeIndex);
    });
    labels.forEach((lbl, i) => {
      lbl.classList.toggle('label--active', i === activeIndex);
      lbl.classList.toggle('label--visited', i <= activeIndex);
    });
  }

  // IntersectionObserver: reveal capsules and track active
  const observer = new IntersectionObserver(
    (entries) => {
      // Find the most visible capsule
      let bestEntry: IntersectionObserverEntry | null = null;
      let bestRatio = 0;

      for (const entry of entries) {
        if (entry.intersectionRatio > bestRatio) {
          bestRatio = entry.intersectionRatio;
          bestEntry = entry;
        }
      }

      // Update all capsule states
      const capsuleArray = Array.from(capsules);
      const activeIndex = bestEntry
        ? capsuleArray.indexOf(bestEntry.target as HTMLElement)
        : -1;

      capsuleArray.forEach((capsule, i) => {
        const rect = capsule.getBoundingClientRect();
        const inView = rect.top < window.innerHeight * 0.7 && rect.bottom > 0;
        const isPast = rect.bottom < window.innerHeight * 0.3;

        if (inView && !isPast) {
          capsule.classList.add('capsule--active');
          capsule.classList.remove('capsule--visited');
        } else if (isPast || i < activeIndex) {
          capsule.classList.remove('capsule--active');
          capsule.classList.add('capsule--visited');
        }
      });

      // Update shelf and palette for the active capsule
      if (bestEntry && bestRatio > 0.1) {
        const id = (bestEntry.target as HTMLElement).dataset.capsuleId;
        const idx = capsuleArray.indexOf(bestEntry.target as HTMLElement);
        if (id) applyPalette(id);
        if (idx >= 0) updateShelf(idx);
      }
    },
    {
      threshold: [0, 0.1, 0.3, 0.5, 0.7, 1],
      rootMargin: '-10% 0px -30% 0px',
    },
  );

  capsules.forEach((capsule) => observer.observe(capsule));

  // Shelf dot click → smooth scroll to capsule
  if (shelf) {
    shelf.addEventListener('click', (e) => {
      const btn = (e.target as HTMLElement).closest<HTMLElement>('.shelf-dot');
      if (!btn) return;
      const targetId = btn.dataset.target;
      if (!targetId) return;
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  }

  // Cleanup on page navigation (Astro ViewTransitions)
  document.addEventListener(
    'astro:before-swap',
    () => {
      observer.disconnect();
      restoreDefaultPalette();
    },
    { once: true },
  );
}
```

- [ ] **Step 2: Wire the script into the archive page**

In `src/pages/archive.astro`, add the script block after the closing `</style>` tag:

```astro
<script>
  import { initArchiveObserver } from '../scripts/archive-observer';
  document.addEventListener('astro:page-load', initArchiveObserver);
</script>
```

- [ ] **Step 3: Add CSS transition to body for smooth theme crossfade**

In `src/pages/archive.astro`, add to the `<style>` block:

```css
  :global(body) {
    transition: background-color 0.6s ease, color 0.6s ease;
  }
```

- [ ] **Step 4: Verify scroll behavior in the browser**

Run: `npm run dev`
Open `http://localhost:4321/archive`.
Expected:
- Capsules start dimmed, then reveal as you scroll each one into view
- Active capsule is fully opaque, past capsules dim to 40%
- Shelf dots fill in and highlight as you scroll
- Background and text colors crossfade to match each era's palette
- Clicking a shelf dot smooth-scrolls to that era
- Navigating away from `/archive` restores the forest theme

- [ ] **Step 5: Commit**

```bash
git add src/scripts/archive-observer.ts src/pages/archive.astro
git commit -m "feat: add scroll-linked reveal, shelf updates, and theme swapping"
```

---

### Task 8: Register @property for animated CSS custom properties

**Files:**

- Modify: `src/styles/global.css`

- [ ] **Step 1: Add @property registrations**

At the top of `src/styles/global.css`, before the `:root` block, add the `@property` registrations so CSS transitions can interpolate custom property values:

```css
@property --bg-primary {
  syntax: '<color>';
  inherits: true;
  initial-value: #1a1f1a;
}
@property --bg-secondary {
  syntax: '<color>';
  inherits: true;
  initial-value: #232923;
}
@property --bg-card {
  syntax: '<color>';
  inherits: true;
  initial-value: #2a322a;
}
@property --text-primary {
  syntax: '<color>';
  inherits: true;
  initial-value: #e8ebe4;
}
@property --text-secondary {
  syntax: '<color>';
  inherits: true;
  initial-value: #9ca89a;
}
@property --accent {
  syntax: '<color>';
  inherits: true;
  initial-value: #7c9a5e;
}
@property --accent-light {
  syntax: '<color>';
  inherits: true;
  initial-value: #a3c47d;
}
@property --accent-warm {
  syntax: '<color>';
  inherits: true;
  initial-value: #c4a35a;
}
@property --border {
  syntax: '<color>';
  inherits: true;
  initial-value: #3a443a;
}
```

- [ ] **Step 2: Add transition to body in global.css for all pages**

The archive page already adds a scoped body transition. However, the `@property` registrations make the properties globally animatable. The `transition` on body is only needed on the archive page (already added in Task 7). Verify that other pages are unaffected — the `@property` definitions alone don't add transitions.

Run: `npm run dev`
Navigate between pages. Expected: No visual changes on non-archive pages. On the archive page, the palette crossfade should now be a smooth color interpolation rather than an instant swap.

- [ ] **Step 3: Commit**

```bash
git add src/styles/global.css
git commit -m "feat: register @property for animated CSS custom property transitions"
```

---

### Task 9: Refactor Treehouse page to use shared components

**Files:**

- Modify: `src/pages/treehouse.astro`

- [ ] **Step 1: Refactor treehouse data to use TimelineEntry and group by date**

Rewrite `src/pages/treehouse.astro`. The key changes:

1. Import `ProjectTimeline` instead of rendering inline HTML
2. Convert `Update[]` to `TimelineEntry[]` grouped by date
3. Use the shared `ProjectTimeline` component in `vertical` mode

Replace the entire content of `src/pages/treehouse.astro` with:

```astro
---
import { Image } from 'astro:assets';
import BaseLayout from '../layouts/BaseLayout.astro';
import FormattedDate from '../components/FormattedDate.astro';
import type { TimelineEntry } from '../data/types';
import type { ImageMetadata } from 'astro';

import img01 from '../assets/treehouse/01-measuring.jpg';
import img02 from '../assets/treehouse/02-supports-and-footings.jpg';
import img04 from '../assets/treehouse/04-beam-frame.jpg';
import img05 from '../assets/treehouse/05-platform-framing.jpg';
import img06 from '../assets/treehouse/06-deck-boards.jpg';
import img07 from '../assets/treehouse/07-walls-going-up.jpg';
import img08 from '../assets/treehouse/08-platform-celebration.jpg';
import img09 from '../assets/treehouse/09-kids-on-deck.jpg';
import img10 from '../assets/treehouse/10-drilling-together.jpg';
import img11 from '../assets/treehouse/11-little-builder.jpg';
import img12 from '../assets/treehouse/12-family-on-platform.jpg';
import img13 from '../assets/treehouse/13-raising-walls.jpg';
import img14 from '../assets/treehouse/14-walls-framed.jpg';
import img15 from '../assets/treehouse/15-birthday-tabs.jpg';
import img16 from '../assets/treehouse/16-tribeam-assembled.jpg';
import img17 from '../assets/treehouse/17-triangle-brace.jpg';
import img18 from '../assets/treehouse/18-tab-install.jpg';
import img19 from '../assets/treehouse/19-teddy-on-tribeam.jpg';
import img20 from '../assets/treehouse/20-digging-with-kids.jpg';
import img21 from '../assets/treehouse/21-footing-holes.jpg';
import img22 from '../assets/treehouse/22-ace-mixing-concrete.jpg';
import img24 from '../assets/treehouse/24-setting-post-holes.jpg';
import img25 from '../assets/treehouse/25-ace-tube-form.jpg';

interface RawUpdate {
  date: Date;
  title: string;
  body: string;
  image?: ImageMetadata;
}

const rawUpdates: RawUpdate[] = [
  { date: new Date('2026-04-06'), title: 'Walls going up', body: 'Zip System sheathing on the wall frames, stairs framed out. Starting to look like a real structure.', image: img07 },
  { date: new Date('2026-04-06'), title: 'Raising the walls', body: 'Me, Greg, and Dave lifting the first wall frame into place on the platform.', image: img13 },
  { date: new Date('2026-04-06'), title: 'Standing tall', body: 'Wall frames up, braced and plumb. First time the treehouse has walls.', image: img14 },
  { date: new Date('2026-03-25'), title: 'Deck boards down', body: 'Platform is fully decked. Solid footing up in the tree now.', image: img06 },
  { date: new Date('2026-03-22'), title: 'Platform framing', body: 'Farley and Ace helping to install the platform joists.', image: img05 },
  { date: new Date('2026-03-22'), title: 'First one up', body: 'Celebrating on the beam frame. The platform is real.', image: img08 },
  { date: new Date('2026-03-22'), title: 'Kids claim the deck', body: 'Deck boards barely down and Teddy and Ace are already up here.', image: img09 },
  { date: new Date('2026-03-22'), title: 'Teaching the tools', body: 'Showing Teddy how to drive screws. He\'s a natural.', image: img10 },
  { date: new Date('2026-03-22'), title: 'Little builder', body: 'Ace grabbed the drill and got to work. No hesitation.', image: img11 },
  { date: new Date('2026-03-22'), title: 'Family on the platform', body: 'Me, Teddy, and Ace on the deck for the first time.', image: img12 },
  { date: new Date('2026-03-21'), title: 'Beam frame on piers', body: 'Freestanding beam structure leveled and set on the concrete piers.', image: img04 },
  { date: new Date('2025-11-16'), title: 'Supports and footings', body: 'First support beams bolted to the tree. Concrete pier footings set in the ground.', image: img02 },
  { date: new Date('2025-11-16'), title: 'Setting post holes', body: 'Ace and me setting the post holes.', image: img24 },
  { date: new Date('2025-11-16'), title: 'Strongest on the crew', body: 'Ace hauling the concrete tube form. Strongest one on the crew.', image: img25 },
  { date: new Date('2025-11-16'), title: 'Concrete in pajamas', body: 'Ace mixing concrete in her pajamas. Committed to the cause.', image: img22 },
  { date: new Date('2025-11-09'), title: 'Measuring up', body: 'Leveling the first beam. String line from the tree to figure out the right height.', image: img01 },
  { date: new Date('2025-11-09'), title: 'Digging with the crew', body: 'Teddy and Ace helping dig the footing holes.', image: img20 },
  { date: new Date('2025-11-09'), title: 'Footing holes', body: 'Footing holes dug. Three piers to support the platform.', image: img21 },
  { date: new Date('2025-11-08'), title: 'First one up', body: 'Teddy\'s the first one up on the Tribeam.', image: img19 },
  { date: new Date('2025-11-08'), title: 'Installing the TAB', body: 'Me, Tristan, and Dave using every ounce of leverage we can manage to get the TAB installed.', image: img18 },
  { date: new Date('2025-10-26'), title: 'Triangle brace', body: 'Triangle brace frame laid out and test-fitted.', image: img17 },
  { date: new Date('2025-10-05'), title: 'Tribeam assembled', body: 'After a lot of creative cuts, finally got the Tribeam assembled.', image: img16 },
  { date: new Date('2025-09-12'), title: 'Birthday TABs', body: 'My birthday present \u2014 TABs for the treehouse! What more could I ask for?', image: img15 },
];

// Group updates by date into TimelineEntries
function groupByDate(updates: RawUpdate[]): TimelineEntry[] {
  const groups = new Map<string, RawUpdate[]>();
  for (const u of updates) {
    const key = u.date.toISOString().split('T')[0];
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(u);
  }

  return Array.from(groups.entries()).map(([dateStr, items]) => ({
    id: `treehouse-${dateStr}`,
    date: items[0].date,
    title: items[0].title,
    description: items[0].body,
    image: items[0].image,
    images: items.map((i) => i.image).filter(Boolean) as ImageMetadata[],
    links: [],
  }));
}

const entries = groupByDate(rawUpdates);

// For grouped entries, we need the children data
const groupedData = new Map<string, RawUpdate[]>();
for (const u of rawUpdates) {
  const key = u.date.toISOString().split('T')[0];
  if (!groupedData.has(key)) groupedData.set(key, []);
  groupedData.get(key)!.push(u);
}
---

<BaseLayout>
  <article class='treehouse'>
    <h1>The Treehouse Project</h1>
    <p class='intro'>A backyard build, documented as it happens.</p>

    <div class='timeline'>
      {entries.map((entry) => {
        const dateKey = entry.date.toISOString().split('T')[0];
        const items = groupedData.get(dateKey) || [];
        const isSingleEntry = items.length === 1;

        return (
          <div class:list={['update', { 'update--grouped': !isSingleEntry }]} id={entry.id}>
            <div class='update-date'>
              <FormattedDate date={entry.date} />
              {!isSingleEntry && (
                <span class='update-count'>({items.length} updates)</span>
              )}
            </div>

            {isSingleEntry ? (
              <>
                <h3>{items[0].title}</h3>
                {items[0].image && (
                  <Image src={items[0].image} alt={items[0].title} width={720} loading='lazy' />
                )}
                <p>{items[0].body}</p>
              </>
            ) : (
              <>
                <h3 class='update-toggle'>{items[0].title}</h3>
                {items[0].image && (
                  <Image src={items[0].image} alt={items[0].title} width={720} loading='lazy' />
                )}
                <p>{items[0].body}</p>
                <div class='update-children'>
                  {items.slice(1).map((child) => (
                    <div class='update-child'>
                      <h4>{child.title}</h4>
                      {child.image && (
                        <Image src={child.image} alt={child.title} width={720} loading='lazy' />
                      )}
                      <p>{child.body}</p>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  </article>
</BaseLayout>

<script>
  function initTreehouseToggles() {
    const grouped = document.querySelectorAll<HTMLElement>('.update--grouped');
    grouped.forEach((group) => {
      const toggle = group.querySelector('.update-toggle');
      if (!toggle) return;
      // Start collapsed
      group.classList.add('update--collapsed');
      toggle.addEventListener('click', () => {
        group.classList.toggle('update--collapsed');
        group.classList.toggle('update--expanded');
      });
    });
  }
  document.addEventListener('astro:page-load', initTreehouseToggles);
</script>

<style>
  .treehouse {
    max-width: 720px;
  }
  .intro {
    color: var(--text-secondary);
    font-size: 1.1em;
    margin-bottom: 2em;
  }
  .timeline {
    border-left: 2px solid var(--border);
    padding-left: 1.5em;
    margin-left: 0.5em;
  }
  .update {
    position: relative;
    margin-bottom: 2.5em;
  }
  .update::before {
    content: '';
    position: absolute;
    left: -2.05em;
    top: 0.35em;
    width: 10px;
    height: 10px;
    background: var(--accent);
    border-radius: 50%;
    border: 2px solid var(--bg-primary);
  }
  .update-date {
    color: var(--text-secondary);
    font-size: 0.85em;
    margin-bottom: 0.25em;
  }
  .update-count {
    margin-left: 0.5em;
    font-size: 0.9em;
    color: var(--accent);
  }
  .update h3 {
    font-size: 1.2em;
    margin-bottom: 0.4em;
    color: var(--accent-warm);
  }
  .update-toggle {
    cursor: pointer;
    user-select: none;
  }
  .update-toggle::after {
    content: ' ▼';
    font-size: 0.6em;
    color: var(--text-secondary);
    transition: transform 0.2s ease;
  }
  .update--collapsed .update-toggle::after {
    content: ' ▶';
  }
  .update img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    margin: 0.75em 0;
    border: 1px solid var(--border);
  }
  .update p {
    color: var(--text-secondary);
    line-height: 1.6;
  }

  /* Grouped capsule children */
  .update--collapsed .update-children {
    display: none;
  }
  .update--expanded .update-children {
    display: block;
  }
  .update-child {
    margin-top: 1.5em;
    padding-top: 1em;
    border-top: 1px dashed var(--border);
  }
  .update-child h4 {
    font-size: 1.1em;
    color: var(--accent-warm);
    margin-bottom: 0.3em;
  }
  .update-child img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    margin: 0.5em 0;
    border: 1px solid var(--border);
  }
  .update-child p {
    color: var(--text-secondary);
    line-height: 1.6;
  }
</style>
```

- [ ] **Step 2: Verify the treehouse page renders**

Run: `npm run dev`
Open `http://localhost:4321/treehouse`.
Expected:
- Same overall appearance as before (left-border timeline, dot markers, images)
- Dates with multiple entries show as a single capsule with "(N updates)" count
- First entry is visible, rest are collapsed
- Click the heading to expand/collapse grouped entries
- Single-entry dates render exactly as before

- [ ] **Step 3: Verify no regressions on other pages**

Navigate to Home, Blog, About pages. Expected: No visual changes.

- [ ] **Step 4: Commit**

```bash
git add src/pages/treehouse.astro
git commit -m "refactor: treehouse page groups entries by date with expand/collapse"
```

---

### Task 10: Final build verification and cleanup

**Files:**

- No new files. Verify everything works together.

- [ ] **Step 1: Run the full build**

Run: `npm run build`
Expected: Build succeeds with no errors.

- [ ] **Step 2: Preview the production build**

Run: `npm run preview`
Open `http://localhost:4321/archive`.
Expected:
- Full archive page with scroll-linked reveal, theme swapping, shelf progress
- Navigating away restores forest theme
- All ViewTransitions work smoothly

- [ ] **Step 3: Test treehouse page in production build**

Open `http://localhost:4321/treehouse`.
Expected: Grouped capsules expand/collapse correctly.

- [ ] **Step 4: Test mobile responsiveness**

In browser dev tools, toggle mobile viewport (375px width).
Expected:
- Shelf shows short labels ("Era 0", "Era 1"...) on mobile
- Capsule content is full-width single-column
- No horizontal overflow

- [ ] **Step 5: Test prefers-reduced-motion**

In browser dev tools, enable "Prefers reduced motion" (or via OS settings).
Expected: All capsules render at full opacity immediately, no scroll-linked animations. Theme palette changes still apply (color changes are not motion).

- [ ] **Step 6: Commit if any fixes were needed**

```bash
git add -A
git commit -m "fix: archive page build verification and cleanup"
```

Only commit if changes were made during verification. Skip if everything passed.
