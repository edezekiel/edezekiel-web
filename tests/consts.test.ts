import { describe, expect, it } from 'vitest';
import { SITE_DESCRIPTION, SITE_TITLE } from '../src/consts';

describe('site constants', () => {
	it('exports a non-empty title', () => {
		expect(SITE_TITLE).toBeTruthy();
	});

	it('exports a non-empty description', () => {
		expect(SITE_DESCRIPTION).toBeTruthy();
	});
});
