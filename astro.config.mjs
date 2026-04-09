import { defineConfig } from 'astro/config';
import expressiveCode from 'astro-expressive-code';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  site: 'https://edezekiel.com',
  integrations: [
    expressiveCode({
      themes: ['github-dark'],
      styleOverrides: {
        borderColor: '#3a443a',
        codeBackground: '#232923',
        codeForeground: '#e8ebe4',
        frames: {
          editorActiveTabBackground: '#2a322a',
          editorActiveTabForeground: '#e8ebe4',
          terminalBackground: '#232923',
          terminalTitlebarBackground: '#1a1f1a',
        },
      },
    }),
    sitemap(),
    icon({
      include: {
        mdi: ['github', 'linkedin', 'rss', 'history', 'open-in-new'],
        'simple-icons': ['bluesky'],
      },
    }),
  ],
});