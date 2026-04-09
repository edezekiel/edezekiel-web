/**
 * Scroll-linked reveal, dim, and shelf updates for the Archive page.
 * Also handles live theme swapping via CSS custom property overrides.
 */

import { PALETTE_KEYS } from '../data/types';
import { createShelfController } from './shelf-controller';

export function initArchiveObserver() {
	const timeline = document.querySelector<HTMLElement>('[data-timeline-mode="reveal"]');
	if (!timeline) return;

	const capsules = timeline.querySelectorAll<HTMLElement>('[data-capsule-id]');
	const shelf = timeline.querySelector<HTMLElement>('.shelf');
	if (!capsules.length) return;

	// Signal that JS is active so CSS can apply reveal animations.
	// Without this class, capsules render fully visible (no-JS fallback).
	timeline.classList.add('timeline--js-active');

	// Parse palette data
	const palettesRaw = timeline.dataset.palettes;
	const palettes: { id: string; palette: Record<string, string> }[] = palettesRaw
		? JSON.parse(palettesRaw)
		: [];

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

	// IntersectionObserver: reveal capsules and track active.
	// On each callback, scan ALL capsules' viewport positions to find the
	// most prominent one.  This avoids the classic IO pitfall where only
	// threshold-crossing entries are delivered, causing brief palette flips
	// when the outgoing section fires alone with a stale ratio.
	const capsuleArray = Array.from(capsules);
	const activationLine = 0.4; // fraction of viewport height

	function findActiveCapsule(): { el: HTMLElement; idx: number } | null {
		const target = window.innerHeight * activationLine;
		let best: HTMLElement | null = null;
		let bestIdx = -1;
		let bestDist = Number.POSITIVE_INFINITY;

		for (let i = 0; i < capsuleArray.length; i++) {
			const rect = capsuleArray[i].getBoundingClientRect();
			// Capsule must overlap the viewport
			if (rect.bottom < 0 || rect.top > window.innerHeight) continue;
			// Distance from capsule's vertical center to the activation line
			const center = (rect.top + rect.bottom) / 2;
			const dist = Math.abs(center - target);
			if (dist < bestDist) {
				bestDist = dist;
				best = capsuleArray[i];
				bestIdx = i;
			}
		}
		return best ? { el: best, idx: bestIdx } : null;
	}

	const observer = new IntersectionObserver(
		() => {
			const active = findActiveCapsule();
			const activeIndex = active ? active.idx : -1;

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

			if (active) {
				const id = active.el.dataset.capsuleId;
				if (id) applyPalette(id);
				controller?.update(active.idx);
			}
		},
		{
			threshold: [0, 0.1, 0.3, 0.5, 0.7, 1],
			rootMargin: '-10% 0px -30% 0px',
		},
	);

	for (const capsule of capsules) {
		observer.observe(capsule);
	}

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
