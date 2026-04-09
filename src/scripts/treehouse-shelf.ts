import { createShelfController } from './shelf-controller';

export function initTreehouseShelf() {
  const timeline = document.querySelector<HTMLElement>('[data-timeline-mode="treehouse"]');
  if (!timeline) return;

  const milestones = timeline.querySelectorAll<HTMLElement>('[data-milestone-id]');
  const shelf = timeline.querySelector<HTMLElement>('.shelf');
  if (!milestones.length || !shelf) return;

  const controller = createShelfController(shelf, 'start');
  const ac = new AbortController();

  let ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      ticking = false;
      const milestoneArray = Array.from(milestones);
      const shelfHeight = shelf!.getBoundingClientRect().bottom;
      let activeIdx = 0;
      for (let i = 0; i < milestoneArray.length; i++) {
        if (milestoneArray[i].getBoundingClientRect().top < window.innerHeight * 0.4 + shelfHeight) {
          activeIdx = i;
        }
      }
      controller.update(activeIdx);
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true, signal: ac.signal });
  onScroll();

  document.addEventListener('astro:before-swap', () => {
    ac.abort();
    controller.destroy();
  }, { once: true });
}
