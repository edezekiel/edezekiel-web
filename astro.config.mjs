import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  site: 'https://edezekiel.com',
  integrations: [sitemap(), icon({
		include: {
			mdi: ['github', 'linkedin', 'twitter']
		}
	})]
});