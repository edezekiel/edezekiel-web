import { afterEach, describe, expect, it, vi } from 'vitest';
import { formatUpdated, getRepoStats } from '../src/data/github';

describe('formatUpdated', () => {
	const now = new Date('2026-10-07T00:00:00Z');

	it('shows month and day for dates in the current year', () => {
		expect(formatUpdated(new Date('2026-02-19T22:36:03Z'), now)).toBe('Feb 19');
	});

	it('shows month and year for older dates', () => {
		expect(formatUpdated(new Date('2024-04-01T14:29:59Z'), now)).toBe('Apr 2024');
	});
});

describe('getRepoStats', () => {
	afterEach(() => {
		vi.unstubAllGlobals();
	});

	it('maps stars and push date by repo', async () => {
		vi.stubGlobal(
			'fetch',
			vi.fn(async () => Response.json({ stargazers_count: 3, pushed_at: '2024-04-01T14:29:59Z' })),
		);
		const stats = await getRepoStats(['edezekiel/ngx-unit-test']);
		expect(stats.get('edezekiel/ngx-unit-test')).toEqual({
			stars: 3,
			pushedAt: new Date('2024-04-01T14:29:59Z'),
		});
	});

	it('omits repos that fail to load', async () => {
		vi.stubGlobal(
			'fetch',
			vi.fn(async (url: string) =>
				url.endsWith('/ok')
					? Response.json({ stargazers_count: 0, pushed_at: '2026-01-01T00:00:00Z' })
					: new Response('rate limited', { status: 403 }),
			),
		);
		const stats = await getRepoStats(['a/ok', 'a/broken']);
		expect([...stats.keys()]).toEqual(['a/ok']);
	});

	it('omits repos when the network throws', async () => {
		vi.stubGlobal(
			'fetch',
			vi.fn(async () => {
				throw new Error('offline');
			}),
		);
		expect((await getRepoStats(['a/b'])).size).toBe(0);
	});
});
