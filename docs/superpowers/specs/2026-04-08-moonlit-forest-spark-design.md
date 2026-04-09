# Moonlit Forest Spark — Design Spec

**Date:** 2026-04-08
**Status:** Approved
**Theme:** "A hedgehog snuffling through a moonlit forest, finding curiosities"

## Overview

Add warmth, life, and discovery to edezekiel.com. The site already has a strong forest green dark theme and hidden hedgehog Easter eggs. This work makes the forest come alive — one living moment (a wandering hedgehog), atmospheric lighting, and small rewards for attention.

**Constraints:** CSS-first, no animation libraries, no new dependencies. One small JS idle detector (~20 lines). Mobile-safe. Fast.

## 1. Ghost Emoji Project Cards + Treehouse Card

### Data model

Add `emoji` (required) and `internal` (optional boolean) to the `Project` interface in `src/data/projects.ts`.

Add treehouse as the first project entry:

```ts
{
  name: 'The Treehouse',
  emoji: '🌳',
  description: 'A backyard build, documented as it happens',
  url: '/treehouse',
  internal: true,
  tags: ['woodworking'],
}
```

Assign emojis to existing projects:
- `🛡️` openvex-js
- `🧪` inject-mocks
- `🔑` get-ssh-config
- `📅` safe-date-parse
- `⚙️` dotfiles

### Card rendering changes (`ProjectCard.astro`)

- Emoji is absolutely positioned in the top-right corner of the card.
- Default opacity: ~35%. On hover: ~70%. Transition: 0.2s ease.
- If `project.internal` is truthy, the `<a>` tag omits `target="_blank"` and `rel="noopener"`.

### Treehouse "latest" badge

- A small line below the description: "Updated Apr 6" in `--text-secondary` at ~0.75em.
- Hardcoded for now. Can be derived from treehouse page data in a future pass.

## 2. Canopy Light Hero

### What changes

The `.hero` div in `src/pages/index.astro` gets atmospheric radial glows using `::before` and `::after` pseudo-elements:

- `::before` — green-tinted radial gradient (`rgba(122, 154, 94, 0.08)`), positioned upper-left.
- `::after` — warm-gold radial gradient (`rgba(196, 163, 90, 0.06)`), positioned upper-right.
- Both use `pointer-events: none`, `position: absolute`, and sit behind the text.

### Sequential footprint trail

A row of 5 hedgehog footprint dots along the bottom of the hero section. Each is an individual `span` element (not a background-image) that fades in one at a time on page load:

- Staggered `animation-delay`: 0.6s, 0.9s, 1.2s, 1.5s, 1.8s (starting after a brief pause so the page settles).
- Animation: `opacity 0 → 0.4` over 0.4s, `forwards` fill.
- Uses the same green dot visual as the existing footprints (`--accent` color, 3-4px circles).
- Runs once on load, then stays visible.

### No layout changes

Hero text, tagline, spacing, and structure remain identical. This is purely atmospheric.

## 3. Wandering Hedgehog

### Behavior

A small SVG hedgehog (~24-30px) appears after ~5 seconds of user idle (no scroll, no mouse movement). It ambles from left to right across the viewport bottom, pauses once or twice to "sniff," then exits off-screen. Total journey: ~15-20 seconds.

Plays once per page visit. Does not loop.

### Implementation

- **SVG:** Inline, lightweight hedgehog illustration. Simple silhouette — body, spines, nose. No external assets.
- **Animation:** CSS `@keyframes` — `translateX(−40px)` to `translateX(calc(100vw + 40px))`. Small `translateY` bobbles for waddle. Sniff pauses achieved via keyframe percentage holds (e.g., 30%-35% and 60%-65% hold position).
- **Idle detector:** ~20 lines of JS in a `<script>` tag. Listens for `scroll`, `mousemove`, `touchstart`. Resets a 5-second `setTimeout`. On trigger, adds `.hedgehog-go` class to the hedgehog container, then unregisters all listeners (fire-once).
- **Footprints:** As the hedgehog moves, faint dot footprints appear in its wake. Individual elements with staggered `animation-delay` matched to the hedgehog's pace. They linger for a few seconds then fade out.

### Positioning

- `position: fixed`, `bottom: 16px`, `left: 0`, full viewport width.
- `pointer-events: none` — never interferes with clicks.
- `z-index` above page content, below footer.

### Mobile

Disabled below 720px (`display: none` in media query). Small screens don't have room for the animation to read well.

### Performance

No canvas, no animation library, no continuous JS loop. The idle detector removes itself after firing. Total JS: ~20 lines. Total SVG: one inline element.

## 4. Sequential Blog Post Footprints

### What changes

Replace the existing `::after` background-image footprints on blog post hover with individual `span` elements that animate in sequentially.

### Implementation

In both `src/pages/index.astro` (recent posts) and `src/components/BlogPosts.astro`:

- Add 5 `span.footprint` elements inside each blog post `<a>` link.
- Position: absolute, bottom-right of the link, same visual location as the current `::after`.
- Each dot: 3-4px circle, `--accent` color, `border-radius: 50%`.
- Default: `opacity: 0`.
- On parent `a:hover`: transition to `opacity: 0.5` with staggered `transition-delay`: 0s, 0.1s, 0.2s, 0.3s, 0.4s.
- Remove the existing `::after` pseudo-element footprint styles.

### Mobile

Hidden below 720px (same as current behavior).

## Files Modified

- `src/data/projects.ts` — add `emoji`, `internal` fields; add treehouse entry; add emojis to all projects
- `src/components/ProjectCard.astro` — ghost emoji rendering, conditional `target="_blank"`, optional latest badge
- `src/pages/index.astro` — canopy light hero styles, sequential hero footprints, sequential blog footprints markup
- `src/components/BlogPosts.astro` — sequential footprint markup and styles
- `src/layouts/BaseLayout.astro` — wandering hedgehog SVG + idle detector script

## Files Not Modified

- `src/styles/global.css` — no changes needed; all new styles are component-scoped
- `astro.config.mjs` — no new integrations
- `package.json` — no new dependencies

## Out of Scope

- Header nav link for treehouse (project card is sufficient for now)
- Footer changes (already has hedgehog separator)
- Deriving treehouse "latest" date dynamically
- Seasonal/time-of-day variations
- Canvas-based or library-driven animations
