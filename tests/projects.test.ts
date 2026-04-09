import { describe, expect, it } from 'vitest';
import { projects } from '../src/data/projects';

describe('projects data', () => {
	it('has at least one project', () => {
		expect(projects.length).toBeGreaterThan(0);
	});

	it('every project has required fields', () => {
		for (const p of projects) {
			expect(p.name, `${p.name}: name`).toBeTruthy();
			expect(p.emoji, `${p.name}: emoji`).toBeTruthy();
			expect(p.description, `${p.name}: description`).toBeTruthy();
			expect(p.url, `${p.name}: url`).toBeTruthy();
			expect(Array.isArray(p.tags), `${p.name}: tags`).toBe(true);
		}
	});

	it('has no duplicate project names', () => {
		const names = projects.map((p) => p.name);
		expect(new Set(names).size).toBe(names.length);
	});

	it('external projects have valid URLs', () => {
		for (const p of projects.filter((p) => !p.internal)) {
			expect(p.url, `${p.name}: url should start with https://`).toMatch(/^https:\/\//);
		}
	});
});
