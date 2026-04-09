/**
 * Shared shelf navigation controller used by both the Treehouse
 * and Archive timelines.
 */
export function createShelfController(
	shelf: HTMLElement,
	scrollBlock: ScrollLogicalPosition = 'start',
) {
	const ac = new AbortController();

	function update(activeIndex: number) {
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

	shelf.addEventListener(
		'click',
		(e) => {
			const btn = (e.target as HTMLElement).closest<HTMLElement>('.shelf-dot');
			if (!btn) return;
			const targetId = btn.dataset.target;
			if (!targetId) return;
			const target = document.getElementById(targetId);
			if (target) {
				target.scrollIntoView({ behavior: 'smooth', block: scrollBlock });
			}
		},
		{ signal: ac.signal },
	);

	return {
		update,
		destroy: () => ac.abort(),
	};
}
