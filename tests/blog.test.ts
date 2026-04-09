import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const BLOG_DIR = join(import.meta.dirname, '../src/content/blog');
const mdFiles = readdirSync(BLOG_DIR).filter((f) => f.endsWith('.md'));

/** Extract YAML frontmatter between --- fences */
function parseFrontmatter(raw: string): Record<string, string> {
	const match = raw.match(/^---\n([\s\S]*?)\n---/);
	if (!match) return {};
	const obj: Record<string, string> = {};
	for (const line of match[1].split('\n')) {
		const idx = line.indexOf(':');
		if (idx > 0) obj[line.slice(0, idx).trim()] = line.slice(idx + 1).trim();
	}
	return obj;
}

describe('blog posts', () => {
	it('has at least one post', () => {
		expect(mdFiles.length).toBeGreaterThan(0);
	});

	it('filenames follow the date-slug pattern', () => {
		for (const file of mdFiles) {
			expect(file, file).toMatch(/^\d{4}-\d{2}-\d{2}-.+\.md$/);
		}
	});

	it('every post has required frontmatter fields', () => {
		for (const file of mdFiles) {
			const raw = readFileSync(join(BLOG_DIR, file), 'utf-8');
			const fm = parseFrontmatter(raw);
			expect(fm.pubDate, `${file}: pubDate`).toBeTruthy();
			expect(fm.title, `${file}: title`).toBeTruthy();
		}
	});

	it('pubDate is a valid date', () => {
		for (const file of mdFiles) {
			const raw = readFileSync(join(BLOG_DIR, file), 'utf-8');
			const fm = parseFrontmatter(raw);
			const d = new Date(fm.pubDate);
			expect(Number.isNaN(d.getTime()), `${file}: invalid pubDate "${fm.pubDate}"`).toBe(false);
		}
	});

	it('no duplicate filenames (slugs)', () => {
		expect(new Set(mdFiles).size).toBe(mdFiles.length);
	});
});
