import { describe, expect, it } from 'vitest';
// Archive imports .png assets which Vitest can't resolve as ImageMetadata,
// so we test the shape by dynamically importing and checking the JS values.
// The image fields will be strings (asset paths) rather than full metadata.
import { eras } from '../src/data/archive';
import { PALETTE_KEYS } from '../src/data/types';

describe('archive eras', () => {
	it('has at least one era', () => {
		expect(eras.length).toBeGreaterThan(0);
	});

	it('eras are sorted by date ascending', () => {
		for (let i = 1; i < eras.length; i++) {
			expect(
				eras[i].date.getTime(),
				`${eras[i].id} should come after ${eras[i - 1].id}`,
			).toBeGreaterThanOrEqual(eras[i - 1].date.getTime());
		}
	});

	it('every era has required fields', () => {
		for (const era of eras) {
			expect(era.id, `era ${era.eraNumber}: id`).toBeTruthy();
			expect(era.title, `era ${era.eraNumber}: title`).toBeTruthy();
			expect(era.description, `era ${era.eraNumber}: description`).toBeTruthy();
			expect(era.date, `era ${era.eraNumber}: date`).toBeInstanceOf(Date);
			expect(era.colors.length, `era ${era.eraNumber}: colors`).toBeGreaterThan(0);
			expect(era.techStack.length, `era ${era.eraNumber}: techStack`).toBeGreaterThan(0);
		}
	});

	it('every era has a complete palette', () => {
		for (const era of eras) {
			for (const key of PALETTE_KEYS) {
				expect(era.palette[key], `era ${era.eraNumber}: palette.${key}`).toBeTruthy();
			}
		}
	});

	it('era IDs are unique', () => {
		const ids = eras.map((e) => e.id);
		expect(new Set(ids).size).toBe(ids.length);
	});

	it('eraNumbers are sequential starting from 0', () => {
		for (let i = 0; i < eras.length; i++) {
			expect(eras[i].eraNumber).toBe(i);
		}
	});
});
