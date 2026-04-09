/**
 * Scroll-linked reveal, dim, and shelf updates for the Archive page.
 * Also handles live theme swapping via CSS custom property overrides.
 */
import { createShelfController } from './shelf-controller';
import { PALETTE_KEYS } from '../data/types';

export function initArchiveObserver() {
  const timeline = document.querySelector<HTMLElement>(
    '[data-timeline-mode="reveal"]',
  );
  if (!timeline) return;

  const capsules = timeline.querySelectorAll<HTMLElement>('[data-capsule-id]');
  const shelf = timeline.querySelector<HTMLElement>('.shelf');
  if (!capsules.length) return;

  // Signal that JS is active so CSS can apply reveal animations.
  // Without this class, capsules render fully visible (no-JS fallback).
  timeline.classList.add('timeline--js-active');

  // Parse palette data
  const palettesRaw = timeline.dataset.palettes;
  const palettes: { id: string; palette: Record<string, string> }[] =
    palettesRaw ? JSON.parse(palettesRaw) : [];

  // Store the forest (default) theme to restore on cleanup
  const rootStyle = getComputedStyle(document.documentElement);
  const defaultPalette: Record<string, string> = {};
  for (const key of PALETTE_KEYS) {
    defaultPalette[key] = rootStyle.getPropertyValue(key).trim();
  }

  let currentActiveId: string | null = null;

  function applyPalette(id: string) {
    if (id === currentActiveId) return;
    currentActiveId = id;
    const entry = palettes.find((p) => p.id === id);
    if (!entry) return;
    for (const [key, value] of Object.entries(entry.palette)) {
      document.body.style.setProperty(key, value);
    }
  }

  function restoreDefaultPalette() {
    for (const [key, value] of Object.entries(defaultPalette)) {
      document.body.style.setProperty(key, value);
    }
    currentActiveId = null;
  }

  const controller = shelf ? createShelfController(shelf, 'center') : null;

  // IntersectionObserver: reveal capsules and track active
  const observer = new IntersectionObserver(
    (entries) => {
      let bestEntry: IntersectionObserverEntry | null = null;
      let bestRatio = 0;

      for (const entry of entries) {
        if (entry.intersectionRatio > bestRatio) {
          bestRatio = entry.intersectionRatio;
          bestEntry = entry;
        }
      }

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

      if (bestEntry && bestRatio > 0.1) {
        const id = (bestEntry.target as HTMLElement).dataset.capsuleId;
        const idx = capsuleArray.indexOf(bestEntry.target as HTMLElement);
        if (id) applyPalette(id);
        if (idx >= 0) controller?.update(idx);
      }
    },
    {
      threshold: [0, 0.1, 0.3, 0.5, 0.7, 1],
      rootMargin: '-10% 0px -30% 0px',
    },
  );

  capsules.forEach((capsule) => observer.observe(capsule));

  // Cleanup on page navigation (Astro ViewTransitions)
  document.addEventListener(
    'astro:before-swap',
    () => {
      observer.disconnect();
      controller?.destroy();
      restoreDefaultPalette();
      timeline.classList.remove('timeline--js-active');
    },
    { once: true },
  );
}
