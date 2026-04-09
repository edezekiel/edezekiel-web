import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const TREEHOUSE_PAGE = join(import.meta.dirname, '../src/pages/treehouse.astro');
const TREEHOUSE_ASSETS = join(import.meta.dirname, '../src/assets/treehouse');

describe('treehouse page', () => {
	const source = readFileSync(TREEHOUSE_PAGE, 'utf-8');

	it('page file exists', () => {
		expect(existsSync(TREEHOUSE_PAGE)).toBe(true);
	});

	it('all imported images exist on disk', () => {
		const files = [...source.matchAll(/from\s+['"]\.\.\/assets\/treehouse\/(.+?)['"]/g)].map(
			(m) => m[1],
		);
		expect(files.length).toBeGreaterThan(0);
		for (const file of files) {
			expect(existsSync(join(TREEHOUSE_ASSETS, file)), `missing asset: ${file}`).toBe(true);
		}
	});

	it('defines at least 3 milestones', () => {
		const milestoneIds = [...source.matchAll(/id:\s*'(\w+)'/g)].map((m) => m[1]);
		expect(milestoneIds.length).toBeGreaterThanOrEqual(3);
	});

	it('every milestone has a label and description', () => {
		// Extract just the milestones array from the frontmatter script
		const milestonesBlock = source.match(
			/const milestones:\s*Milestone\[\]\s*=\s*\[([\s\S]*?)\n\];/,
		);
		expect(milestonesBlock).toBeTruthy();
		const blocks = milestonesBlock?.[1].split(/\{\s*id:/) ?? [];
		for (const block of blocks.slice(1)) {
			expect(block, 'missing label').toMatch(/label:/);
			expect(block, 'missing shortLabel').toMatch(/shortLabel:/);
			expect(block, 'missing description').toMatch(/description:/);
		}
	});

	it('no orphaned treehouse assets (every asset is imported)', () => {
		const assetsOnDisk = readdirSync(TREEHOUSE_ASSETS);
		const importedFiles = [
			...source.matchAll(/from\s+['"]\.\.\/assets\/treehouse\/(.+?)['"]/g),
		].map((m) => m[1]);

		for (const file of assetsOnDisk) {
			expect(importedFiles, `orphaned asset: ${file}`).toContain(file);
		}
	});
});
