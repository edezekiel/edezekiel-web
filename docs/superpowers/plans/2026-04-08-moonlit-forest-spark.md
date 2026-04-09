# Moonlit Forest Spark Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add warmth and life to edezekiel.com — ghost emoji project cards with treehouse entry, canopy light hero with sequential footprints, wandering hedgehog animation, sequential blog post footprints, and new treehouse photos.

**Architecture:** All features are component-scoped Astro/CSS changes with one small JS idle detector (~20 lines). No new dependencies. The hedgehog lives in BaseLayout so it appears on all pages. Photos are added to the existing treehouse timeline.

**Tech Stack:** Astro 5, CSS animations, inline SVG, vanilla JS

**Design spec:** `docs/superpowers/specs/2026-04-08-moonlit-forest-spark-design.md`

---

## File Structure

| File | Action | Responsibility |
|------|--------|---------------|
| `src/data/projects.ts` | Modify | Add `emoji`/`internal` fields, treehouse entry, emojis for all projects |
| `src/components/ProjectCard.astro` | Modify | Ghost emoji rendering, conditional external link, optional latest badge |
| `src/pages/index.astro` | Modify | Canopy light hero, sequential hero footprints, sequential blog footprints |
| `src/components/BlogPosts.astro` | Modify | Sequential footprint markup and styles |
| `src/layouts/BaseLayout.astro` | Modify | Wandering hedgehog SVG + idle detector |
| `src/pages/treehouse.astro` | Modify | Add new photos to timeline |
| `src/assets/treehouse/08-*.jpg` through `14-*.jpg` | Create | New treehouse photos copied from Downloads |
| `src/styles/global.css` | Modify | Remove Rivian brand reference from CSS comment |

---

### Task 1: Add Treehouse Photos

**Files:**
- Create: `src/assets/treehouse/08-platform-celebration.jpg`
- Create: `src/assets/treehouse/09-kids-on-deck.jpg`
- Create: `src/assets/treehouse/10-drilling-together.jpg`
- Create: `src/assets/treehouse/11-little-builder.jpg`
- Create: `src/assets/treehouse/12-family-on-platform.jpg`
- Create: `src/assets/treehouse/13-raising-walls.jpg`
- Create: `src/assets/treehouse/14-walls-framed.jpg`
- Modify: `src/pages/treehouse.astro`

- [ ] **Step 1: Copy and rename photos into the project**

```bash
cp ~/Downloads/treehousephotospart2/PXL_20260322_184206668.jpg src/assets/treehouse/08-platform-celebration.jpg
cp ~/Downloads/treehousephotospart2/PXL_20260322_212236268.jpg src/assets/treehouse/09-kids-on-deck.jpg
cp ~/Downloads/treehousephotospart2/PXL_20260322_223225539.jpg src/assets/treehouse/10-drilling-together.jpg
cp ~/Downloads/treehousephotospart2/PXL_20260322_223311870.jpg src/assets/treehouse/11-little-builder.jpg
cp ~/Downloads/treehousephotospart2/PXL_20260322_223418511.jpg src/assets/treehouse/12-family-on-platform.jpg
cp ~/Downloads/treehousephotospart2/PXL_20260406_164407820.jpg src/assets/treehouse/13-raising-walls.jpg
cp ~/Downloads/treehousephotospart2/PXL_20260406_214717365.jpg src/assets/treehouse/14-walls-framed.jpg
```

- [ ] **Step 2: Add imports to treehouse.astro**

Add these imports after the existing `img07` import at line 13 of `src/pages/treehouse.astro`:

```typescript
import img08 from '../assets/treehouse/08-platform-celebration.jpg';
import img09 from '../assets/treehouse/09-kids-on-deck.jpg';
import img10 from '../assets/treehouse/10-drilling-together.jpg';
import img11 from '../assets/treehouse/11-little-builder.jpg';
import img12 from '../assets/treehouse/12-family-on-platform.jpg';
import img13 from '../assets/treehouse/13-raising-walls.jpg';
import img14 from '../assets/treehouse/14-walls-framed.jpg';
```

- [ ] **Step 3: Add new entries to the updates array**

The updates array is sorted newest-first. Add these entries at the top of the `updates` array (before the existing "Walls going up" entry). The March 22 photos are additional shots from the deck boards / platform framing day. The April 6 photos are additional shots from the walls day.

Replace the existing "Walls going up" entry and add new entries so the top of the array reads:

```typescript
const updates: Update[] = [
  {
    date: new Date('2026-04-06'),
    title: 'Walls going up',
    body: 'OSB sheathing on the wall frames, stairs framed out. Starting to look like a real structure.',
    image: img07,
  },
  {
    date: new Date('2026-04-06'),
    title: 'Raising the walls',
    body: 'Three of us lifting the first wall frame into place on the platform.',
    image: img13,
  },
  {
    date: new Date('2026-04-06'),
    title: 'Standing tall',
    body: 'Wall frames up, braced and plumb. First time the treehouse has walls.',
    image: img14,
  },
  {
    date: new Date('2026-03-25'),
    title: 'Deck boards down',
    body: 'Platform is fully decked. Solid footing up in the tree now.',
    image: img06,
  },
  {
    date: new Date('2026-03-22'),
    title: 'Platform framing',
    body: 'Got the platform joists in place. First time standing on it.',
    image: img05,
  },
  {
    date: new Date('2026-03-22'),
    title: 'First one up',
    body: 'Celebrating on the beam frame. The platform is real.',
    image: img08,
  },
  {
    date: new Date('2026-03-22'),
    title: 'Kids claim the deck',
    body: 'Deck boards barely down and they\'re already up here.',
    image: img09,
  },
  {
    date: new Date('2026-03-22'),
    title: 'Teaching the tools',
    body: 'Showing him how to drive screws. He\'s a natural.',
    image: img10,
  },
  {
    date: new Date('2026-03-22'),
    title: 'Little builder',
    body: 'She grabbed the drill and got to work. No hesitation.',
    image: img11,
  },
  {
    date: new Date('2026-03-22'),
    title: 'Family on the platform',
    body: 'All three of us on the deck for the first time.',
    image: img12,
  },
  // ... rest of existing entries unchanged (Mar 21 and earlier)
```

Keep the existing entries for March 21 and earlier unchanged.

- [ ] **Step 4: Verify the dev server renders the treehouse page**

```bash
npm run dev
```

Open `http://localhost:4321/treehouse` and verify all 14 photos render in the timeline with correct dates and captions.

- [ ] **Step 5: Commit**

```bash
git add src/assets/treehouse/08-platform-celebration.jpg src/assets/treehouse/09-kids-on-deck.jpg src/assets/treehouse/10-drilling-together.jpg src/assets/treehouse/11-little-builder.jpg src/assets/treehouse/12-family-on-platform.jpg src/assets/treehouse/13-raising-walls.jpg src/assets/treehouse/14-walls-framed.jpg src/pages/treehouse.astro
git commit -m "feat: add new treehouse photos to timeline"
```

---

### Task 2: Ghost Emoji Project Cards + Treehouse Entry

**Files:**
- Modify: `src/data/projects.ts`
- Modify: `src/components/ProjectCard.astro`

- [ ] **Step 1: Update the Project interface and data**

Replace the entire contents of `src/data/projects.ts` with:

```typescript
export interface Project {
  name: string;
  emoji: string;
  description: string;
  url: string;
  npm?: string;
  internal?: boolean;
  tags: string[];
  lastUpdated?: string;
}

export const projects: Project[] = [
  {
    name: 'The Treehouse',
    emoji: '🌳',
    description: 'A backyard build, documented as it happens',
    url: '/treehouse',
    internal: true,
    tags: ['woodworking'],
    lastUpdated: 'Apr 6',
  },
  {
    name: 'openvex-js',
    emoji: '🛡️',
    description:
      'JavaScript library for creating and managing OpenVEX documents',
    url: 'https://github.com/edezekiel/openvex-js',
    tags: ['security', 'vex'],
  },
  {
    name: 'inject-mocks',
    emoji: '🧪',
    description:
      'Simplify Angular unit testing with automatic mock injection',
    url: 'https://www.npmjs.com/package/@ngx-unit-test/inject-mocks',
    tags: ['angular', 'testing'],
  },
  {
    name: 'get-ssh-config',
    emoji: '🔑',
    description: 'CLI and Node.js library to parse and query SSH config files',
    url: 'https://github.com/edezekiel/get-ssh-config',
    npm: 'https://www.npmjs.com/package/get-ssh-config',
    tags: ['cli', 'npm'],
  },
  {
    name: 'safe-date-parse',
    emoji: '📅',
    description:
      'Robust date parsing that avoids common JavaScript Date pitfalls',
    url: 'https://github.com/edezekiel/safe-date-parse',
    tags: ['utility'],
  },
  {
    name: 'dotfiles',
    emoji: '⚙️',
    description:
      'Personal development environment configuration and setup scripts',
    url: 'https://github.com/edezekiel/dotfiles',
    tags: ['devtools'],
  },
];
```

- [ ] **Step 2: Update ProjectCard.astro with ghost emoji and conditional link**

Replace the entire contents of `src/components/ProjectCard.astro` with:

```astro
---
import type { Project } from '../data/projects';

interface Props {
  project: Project;
}

const { project } = Astro.props;
const isExternal = !project.internal;
---

<a
  href={project.url}
  target={isExternal ? '_blank' : undefined}
  rel={isExternal ? 'noopener' : undefined}
  class='project-card'
>
  <span class='ghost-emoji'>{project.emoji}</span>
  <span class='project-name'>{project.name}</span>
  <span class='project-desc'>{project.description}</span>
  {project.lastUpdated && (
    <span class='last-updated'>Updated {project.lastUpdated}</span>
  )}
  <div class='project-tags'>
    {project.tags.map((tag) => <span class='tag'>{tag}</span>)}
  </div>
</a>

<style>
  .project-card {
    display: flex;
    flex-direction: column;
    gap: 0.4em;
    padding: 1em;
    border-radius: 8px;
    border: 1px solid transparent;
    text-decoration: none;
    transition: background-color 0.2s ease, border-color 0.2s ease;
    position: relative;
    overflow: hidden;
  }
  .project-card:hover {
    background-color: var(--bg-card);
    border-color: var(--border);
  }
  .ghost-emoji {
    position: absolute;
    top: 0.5em;
    right: 0.5em;
    font-size: 1.3em;
    opacity: 0.35;
    transition: opacity 0.2s ease;
    pointer-events: none;
  }
  .project-card:hover .ghost-emoji {
    opacity: 0.7;
  }
  .project-name {
    color: var(--text-primary);
    font-weight: 700;
    font-size: 1em;
    transition: color 0.2s ease;
  }
  .project-card:hover .project-name {
    color: var(--accent-warm);
  }
  .project-desc {
    color: var(--text-secondary);
    font-size: 0.85em;
    line-height: 1.5;
  }
  .last-updated {
    color: var(--text-secondary);
    font-size: 0.75em;
  }
  .project-tags {
    display: flex;
    gap: 0.4em;
    flex-wrap: wrap;
    margin-top: 0.2em;
  }
  .tag {
    font-size: 0.72em;
    color: var(--accent);
    background: rgba(124, 154, 94, 0.1);
    padding: 0.15em 0.5em;
    border-radius: 4px;
    border: 1px solid rgba(124, 154, 94, 0.2);
  }
</style>
```

- [ ] **Step 3: Verify project cards render correctly**

```bash
npm run dev
```

Open `http://localhost:4321/` and verify:
- Treehouse card appears first with 🌳 ghost emoji and "Updated Apr 6" badge
- All other cards show their ghost emojis at ~35% opacity
- Hovering a card brightens the emoji to ~70%
- Treehouse card links to `/treehouse` (same tab)
- Other cards link externally (new tab)

- [ ] **Step 4: Commit**

```bash
git add src/data/projects.ts src/components/ProjectCard.astro
git commit -m "feat: ghost emoji project cards with treehouse entry"
```

---

### Task 3: Canopy Light Hero + Sequential Footprints

**Files:**
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Add hero footprint markup**

In `src/pages/index.astro`, replace the hero div (lines 15-21):

```astro
  <div class='hero'>
    <h1>Hi, I'm Ed Ezekiel</h1>
    <p class='tagline'>
      Senior Engineer at <a href='https://herodevs.com/' target='_blank'>HeroDevs</a>.
      Former attorney. Building product security tooling and AI-assisted automation.
    </p>
    <div class='hero-footprints'>
      <span class='hero-print'></span>
      <span class='hero-print'></span>
      <span class='hero-print'></span>
      <span class='hero-print'></span>
      <span class='hero-print'></span>
    </div>
  </div>
```

- [ ] **Step 2: Add canopy light and footprint styles**

In the `<style>` block of `src/pages/index.astro`, replace the existing `.hero` rules (lines 60-66) with:

```css
  .hero {
    margin-bottom: 2.5em;
    position: relative;
  }
  .hero::before,
  .hero::after {
    content: '';
    position: absolute;
    width: 300px;
    height: 200px;
    border-radius: 50%;
    pointer-events: none;
    z-index: -1;
  }
  .hero::before {
    top: -60px;
    left: -40px;
    background: radial-gradient(ellipse, rgba(122, 154, 94, 0.08) 0%, transparent 70%);
  }
  .hero::after {
    top: -40px;
    right: -20px;
    background: radial-gradient(ellipse, rgba(196, 163, 90, 0.06) 0%, transparent 70%);
  }
  .hero-footprints {
    display: flex;
    gap: 8px;
    align-items: center;
    margin-top: 1.5em;
  }
  .hero-print {
    width: 4px;
    height: 4px;
    background: var(--accent);
    border-radius: 50%;
    opacity: 0;
    animation: footprint-appear 0.4s ease forwards;
  }
  .hero-print:nth-child(1) { animation-delay: 0.6s; }
  .hero-print:nth-child(2) { animation-delay: 0.9s; width: 3px; height: 3px; }
  .hero-print:nth-child(3) { animation-delay: 1.2s; }
  .hero-print:nth-child(4) { animation-delay: 1.5s; width: 3px; height: 3px; }
  .hero-print:nth-child(5) { animation-delay: 1.8s; }
  @keyframes footprint-appear {
    to { opacity: 0.4; }
  }
```

- [ ] **Step 3: Verify canopy light and footprints**

```bash
npm run dev
```

Open `http://localhost:4321/` and verify:
- Soft green glow visible upper-left of hero text
- Faint warm glow visible upper-right
- Five footprint dots appear one by one after page load (~0.6s to ~1.8s)
- Footprints remain visible at 40% opacity after animation completes
- No layout shift — hero text position unchanged

- [ ] **Step 4: Commit**

```bash
git add src/pages/index.astro
git commit -m "feat: canopy light hero with sequential footprint trail"
```

---

### Task 4: Sequential Blog Post Footprints

**Files:**
- Modify: `src/pages/index.astro`
- Modify: `src/components/BlogPosts.astro`

- [ ] **Step 1: Update homepage recent posts markup**

In `src/pages/index.astro`, replace the blog post list item template (inside the `.map()` on lines 27-35) with:

```astro
        recentPosts.map((post) => (
          <li>
            <a href={`/blog/${post.id}/`}>
              <span class='post-title'>{post.data.title}</span>
              <span class='post-date'><FormattedDate date={post.data.pubDate} /></span>
              <span class='footprints'>
                <span class='fp'></span>
                <span class='fp'></span>
                <span class='fp'></span>
                <span class='fp'></span>
                <span class='fp'></span>
              </span>
            </a>
          </li>
        ))
```

- [ ] **Step 2: Replace homepage footprint styles**

In the `<style>` block of `src/pages/index.astro`, remove the existing `::after` footprint rules (the `.recent-posts li a::after` and `.recent-posts li a:hover::after` blocks, approximately lines 99-115) and replace them with:

```css
  .recent-posts .footprints {
    position: absolute;
    right: 1em;
    bottom: 4px;
    display: flex;
    gap: 5px;
    align-items: center;
    pointer-events: none;
  }
  .recent-posts .fp {
    width: 4px;
    height: 4px;
    background: var(--accent);
    border-radius: 50%;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  .recent-posts .fp:nth-child(2),
  .recent-posts .fp:nth-child(4) {
    width: 3px;
    height: 3px;
  }
  .recent-posts li a:hover .fp:nth-child(1) { opacity: 0.5; transition-delay: 0s; }
  .recent-posts li a:hover .fp:nth-child(2) { opacity: 0.5; transition-delay: 0.1s; }
  .recent-posts li a:hover .fp:nth-child(3) { opacity: 0.5; transition-delay: 0.2s; }
  .recent-posts li a:hover .fp:nth-child(4) { opacity: 0.5; transition-delay: 0.3s; }
  .recent-posts li a:hover .fp:nth-child(5) { opacity: 0.5; transition-delay: 0.4s; }
```

Also update the mobile media query — remove the `.recent-posts li a::after { display: none; }` rule (around line 153-155) and replace with:

```css
    .recent-posts .footprints {
      display: none;
    }
```

- [ ] **Step 3: Update BlogPosts.astro markup**

In `src/components/BlogPosts.astro`, replace the list item template (inside the `.map()`) with:

```astro
      posts.map((post) => (
        <li>
          <a href={`/blog/${post.id}/`}>
            <h5 class='title'>{post.data.title}</h5>
            <p class='date'>
              <FormattedDate date={post.data.pubDate} />
            </p>
            <span class='footprints'>
              <span class='fp'></span>
              <span class='fp'></span>
              <span class='fp'></span>
              <span class='fp'></span>
              <span class='fp'></span>
            </span>
          </a>
        </li>
      ))
```

- [ ] **Step 4: Replace BlogPosts.astro footprint styles**

In the `<style>` block of `src/components/BlogPosts.astro`, remove the existing `::after` footprint rules (the `ul li a::after` and `ul li a:hover::after` blocks, approximately lines 52-68) and replace them with:

```css
  .footprints {
    position: absolute;
    right: 1.25em;
    bottom: 6px;
    display: flex;
    gap: 5px;
    align-items: center;
    pointer-events: none;
  }
  .fp {
    width: 4px;
    height: 4px;
    background: var(--accent);
    border-radius: 50%;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  .fp:nth-child(2),
  .fp:nth-child(4) {
    width: 3px;
    height: 3px;
  }
  ul li a:hover .fp:nth-child(1) { opacity: 0.5; transition-delay: 0s; }
  ul li a:hover .fp:nth-child(2) { opacity: 0.5; transition-delay: 0.1s; }
  ul li a:hover .fp:nth-child(3) { opacity: 0.5; transition-delay: 0.2s; }
  ul li a:hover .fp:nth-child(4) { opacity: 0.5; transition-delay: 0.3s; }
  ul li a:hover .fp:nth-child(5) { opacity: 0.5; transition-delay: 0.4s; }
```

- [ ] **Step 5: Verify sequential footprints on both pages**

```bash
npm run dev
```

- Open `http://localhost:4321/` — hover over a recent post, verify footprints appear one at a time left-to-right
- Open `http://localhost:4321/blog` — hover over a post, verify same sequential behavior
- Verify footprints are hidden on mobile viewport (< 720px)

- [ ] **Step 6: Commit**

```bash
git add src/pages/index.astro src/components/BlogPosts.astro
git commit -m "feat: sequential footprint animation on blog post hover"
```

---

### Task 5: Wandering Hedgehog

**Files:**
- Modify: `src/layouts/BaseLayout.astro`

- [ ] **Step 1: Add hedgehog SVG and idle detector to BaseLayout**

Replace the entire contents of `src/layouts/BaseLayout.astro` with:

```astro
---
import BaseHead from '../components/BaseHead.astro';
import Footer from '../components/Footer.astro';
import Header from '../components/Header.astro';
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts';
---

<!doctype html>
<html lang='en'>
  <head>
    <BaseHead title={SITE_TITLE} description={SITE_DESCRIPTION} />
  </head>
  <body>
    <Header />
    <main>
      <slot />
    </main>
    <Footer />

    <div class='wandering-hedgehog' aria-hidden='true'>
      <svg class='hedgehog-svg' viewBox='0 0 30 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <!-- body -->
        <ellipse cx='15' cy='13' rx='10' ry='6' fill='#5a6b4a'/>
        <!-- spines -->
        <path d='M8 8 L10 12 L12 7 L14 11 L16 6 L18 11 L20 7 L22 12 L24 9' stroke='#4a5a3a' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round' fill='none'/>
        <!-- head -->
        <ellipse cx='24' cy='13' rx='4' ry='3.5' fill='#7c8a6a'/>
        <!-- nose -->
        <circle cx='27.5' cy='12.5' r='1' fill='#3a3a2a'/>
        <!-- eye -->
        <circle cx='25.5' cy='11.5' r='0.8' fill='#2a2a1a'/>
        <!-- legs -->
        <line x1='11' y1='18' x2='11' y2='20' stroke='#5a6b4a' stroke-width='1.2' stroke-linecap='round'/>
        <line x1='15' y1='18' x2='15' y2='20' stroke='#5a6b4a' stroke-width='1.2' stroke-linecap='round'/>
        <line x1='19' y1='18' x2='19' y2='20' stroke='#5a6b4a' stroke-width='1.2' stroke-linecap='round'/>
      </svg>
      <div class='hedgehog-prints'>
        <span class='hw-print'></span>
        <span class='hw-print'></span>
        <span class='hw-print'></span>
        <span class='hw-print'></span>
        <span class='hw-print'></span>
        <span class='hw-print'></span>
        <span class='hw-print'></span>
        <span class='hw-print'></span>
      </div>
    </div>

    <script>
      function initHedgehog() {
        const hog = document.querySelector('.wandering-hedgehog');
        if (!hog) return;
        let timer: ReturnType<typeof setTimeout>;
        const events = ['scroll', 'mousemove', 'touchstart', 'keydown'];
        function trigger() {
          events.forEach(e => document.removeEventListener(e, reset));
          hog.classList.add('hedgehog-go');
        }
        function reset() {
          clearTimeout(timer);
          timer = setTimeout(trigger, 5000);
        }
        events.forEach(e => document.addEventListener(e, reset, { passive: true }));
        timer = setTimeout(trigger, 5000);
      }
      document.addEventListener('astro:page-load', initHedgehog);
    </script>

    <style is:global>
      .wandering-hedgehog {
        position: fixed;
        bottom: 16px;
        left: 0;
        width: 100vw;
        height: 30px;
        pointer-events: none;
        z-index: 50;
        overflow: hidden;
      }
      .hedgehog-svg {
        position: absolute;
        bottom: 0;
        left: -40px;
        width: 30px;
        height: 20px;
        opacity: 0;
      }
      .hedgehog-go .hedgehog-svg {
        opacity: 1;
        animation: hedgehog-walk 18s linear forwards;
      }
      @keyframes hedgehog-walk {
        0% { transform: translateX(-40px) translateY(0); }
        28% { transform: translateX(28vw) translateY(-1px); }
        32% { transform: translateX(30vw) translateY(0); }
        35% { transform: translateX(30vw) translateY(0); }
        58% { transform: translateX(58vw) translateY(-1px); }
        62% { transform: translateX(60vw) translateY(0); }
        65% { transform: translateX(60vw) translateY(0); }
        100% { transform: translateX(calc(100vw + 40px)) translateY(0); }
      }

      .hedgehog-prints {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 8px;
      }
      .hw-print {
        position: absolute;
        bottom: 0;
        width: 3px;
        height: 3px;
        background: var(--accent);
        border-radius: 50%;
        opacity: 0;
      }
      .hw-print:nth-child(1) { left: 10vw; }
      .hw-print:nth-child(2) { left: 17vw; }
      .hw-print:nth-child(3) { left: 24vw; }
      .hw-print:nth-child(4) { left: 35vw; }
      .hw-print:nth-child(5) { left: 42vw; }
      .hw-print:nth-child(6) { left: 49vw; }
      .hw-print:nth-child(7) { left: 65vw; }
      .hw-print:nth-child(8) { left: 72vw; }

      .hedgehog-go .hw-print {
        animation: print-show 0.4s ease forwards, print-fade 1s ease 3s forwards;
      }
      .hedgehog-go .hw-print:nth-child(1) { animation-delay: 2s, 5s; }
      .hedgehog-go .hw-print:nth-child(2) { animation-delay: 3.2s, 6.2s; }
      .hedgehog-go .hw-print:nth-child(3) { animation-delay: 4.4s, 7.4s; }
      .hedgehog-go .hw-print:nth-child(4) { animation-delay: 6.5s, 9.5s; }
      .hedgehog-go .hw-print:nth-child(5) { animation-delay: 7.7s, 10.7s; }
      .hedgehog-go .hw-print:nth-child(6) { animation-delay: 8.9s, 11.9s; }
      .hedgehog-go .hw-print:nth-child(7) { animation-delay: 12s, 15s; }
      .hedgehog-go .hw-print:nth-child(8) { animation-delay: 13.2s, 16.2s; }

      @keyframes print-show {
        to { opacity: 0.3; }
      }
      @keyframes print-fade {
        to { opacity: 0; }
      }

      @media (max-width: 720px) {
        .wandering-hedgehog {
          display: none;
        }
      }
    </style>
  </body>
</html>
```

- [ ] **Step 2: Verify the wandering hedgehog**

```bash
npm run dev
```

Open `http://localhost:4321/` and wait ~5 seconds without moving the mouse. Verify:
- Small green hedgehog appears at the left edge of the viewport
- It ambles rightward, pausing twice (around 30% and 60% across)
- Faint footprints appear behind it as it walks
- Footprints fade out after a few seconds
- Hedgehog exits off the right edge
- Animation does not repeat
- Hedgehog does not interfere with clicking anything on the page
- Resize to mobile width (< 720px) — hedgehog is hidden

- [ ] **Step 3: Verify hedgehog works on page navigation**

With the dev server running, navigate between pages (Home → Blog → Home). The idle timer should reset on each navigation thanks to the `astro:page-load` listener. Verify the hedgehog triggers again on the new page after 5s idle.

- [ ] **Step 4: Commit**

```bash
git add src/layouts/BaseLayout.astro
git commit -m "feat: wandering hedgehog animation on idle"
```

---

### Task 6: Remove Rivian Brand Reference

**Files:**
- Modify: `src/styles/global.css`

- [ ] **Step 1: Update the CSS comment**

In `src/styles/global.css`, replace lines 1-4:

```css
/*
  Rivian Green theme — deep olive-green, nature-anchored, warm personality.
  Inspired by the 2026 Rivian R1T Launch Green.
 */
```

With:

```css
/*
  Forest Green theme — deep olive-green, nature-anchored, warm personality.
 */
```

- [ ] **Step 2: Commit**

```bash
git add src/styles/global.css
git commit -m "chore: remove brand reference from CSS comment"
```

---

### Task 7: Build Verification

- [ ] **Step 1: Run the production build**

```bash
npm run build
```

Expected: Build completes with no errors. All pages generate successfully.

- [ ] **Step 2: Preview the production build**

```bash
npm run preview
```

Open `http://localhost:4321/` and spot-check:
- Hero canopy light glows visible
- Hero footprints animate on load
- Project cards show ghost emojis, treehouse card links internally
- Blog post footprints animate sequentially on hover
- Wandering hedgehog triggers after idle
- Treehouse page shows all 14 photos in timeline

- [ ] **Step 3: Commit any build fixes if needed**

If the build surfaced issues, fix them and commit:

```bash
git add -A
git commit -m "fix: address build issues"
```
