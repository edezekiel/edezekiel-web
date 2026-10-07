export interface RepoStats {
	stars: number;
	pushedAt: Date;
}

/** Fetches stars and last push date for each repo; a failed lookup is omitted so the build never breaks. */
export async function getRepoStats(repos: string[]): Promise<Map<string, RepoStats>> {
	const headers: Record<string, string> = { Accept: 'application/vnd.github+json' };
	const token = process.env.GITHUB_TOKEN;
	if (token) headers.Authorization = `Bearer ${token}`;

	const entries = await Promise.all(
		repos.map(async (repo): Promise<[string, RepoStats] | null> => {
			try {
				const res = await fetch(`https://api.github.com/repos/${repo}`, { headers });
				if (!res.ok) return null;
				const data = (await res.json()) as { stargazers_count: number; pushed_at: string };
				return [repo, { stars: data.stargazers_count, pushedAt: new Date(data.pushed_at) }];
			} catch {
				return null;
			}
		}),
	);

	return new Map(entries.filter((e): e is [string, RepoStats] => e !== null));
}

export function formatUpdated(date: Date, now: Date = new Date()): string {
	const sameYear = date.getUTCFullYear() === now.getUTCFullYear();
	return date.toLocaleDateString('en-US', {
		month: 'short',
		...(sameYear ? { day: 'numeric' } : { year: 'numeric' }),
		timeZone: 'UTC',
	});
}
