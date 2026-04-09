import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const PAGES = join(import.meta.dirname, '../src/pages');

function read(relPath: string) {
	return readFileSync(join(PAGES, relPath), 'utf-8');
}

describe('index page (/)', () => {
	const source = read('index.astro');

	it('renders a hero heading', () => {
		expect(source).toContain("<h1>Hi, I'm Ed Ezekiel</h1>");
	});

	it('shows recent posts section', () => {
		expect(source).toContain('Recent Posts');
	});

	it('shows projects section', () => {
		expect(source).toContain('Projects');
	});

	it('imports projects data', () => {
		expect(source).toMatch(/import.*projects.*from/);
	});
});

describe('about page (/about)', () => {
	const source = read('about.astro');

	it('has a heading', () => {
		expect(source).toContain('<h1>Whoami</h1>');
	});

	it('links to the treehouse page', () => {
		expect(source).toContain("href='/treehouse'");
	});

	it('mentions HeroDevs', () => {
		expect(source).toContain('HeroDevs');
	});
});

describe('404 page', () => {
	const source = read('404.astro');

	it('shows a 404 heading', () => {
		expect(source).toContain('<h1>404</h1>');
	});

	it('has a link back to home', () => {
		expect(source).toContain("href='/'");
	});

	it('includes the hedgehog', () => {
		expect(source).toContain('🦔');
	});
});

describe('blog index (/blog)', () => {
	const source = read('blog/index.astro');

	it('page file exists', () => {
		expect(existsSync(join(PAGES, 'blog/index.astro'))).toBe(true);
	});

	it('fetches the blog collection', () => {
		expect(source).toContain("getCollection('blog')");
	});

	it('sorts posts by date descending', () => {
		expect(source).toContain('b.data.pubDate.valueOf() - a.data.pubDate.valueOf()');
	});
});

describe('blog post page (/blog/[slug])', () => {
	const source = read('blog/[...slug].astro');

	it('uses getStaticPaths', () => {
		expect(source).toContain('getStaticPaths');
	});

	it('renders post content', () => {
		expect(source).toContain('<Content />');
	});

	it('uses the BlogPost layout', () => {
		expect(source).toMatch(/import BlogPost from/);
	});
});

describe('archive page (/archive)', () => {
	it('page file exists', () => {
		expect(existsSync(join(PAGES, 'archive.astro'))).toBe(true);
	});
});
