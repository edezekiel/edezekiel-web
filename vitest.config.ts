import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		// Stub image imports so data files that import .png/.jpg work fine
		server: {
			deps: {
				inline: [/\.png$/, /\.jpg$/],
			},
		},
	},
	resolve: {
		alias: {
			// Stub astro image metadata imports to a simple object
		},
	},
	assetsInclude: ['**/*.png', '**/*.jpg'],
});
