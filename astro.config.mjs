import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import expressiveCode from 'astro-expressive-code';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://jatinbhanot.com',
  integrations: [
    expressiveCode({
      themes: ['github-light', 'github-dark-dimmed'],
      defaultProps: {
        wrap: true,
      },
      styleOverrides: {
        borderRadius: '0.75rem',
        borderWidth: '1px',
        borderColor: 'rgba(28, 27, 25, 0.12)',
        codeFontFamily: '"JetBrains Mono Variable", monospace',
        uiFontFamily: '"Plus Jakarta Sans Variable", sans-serif',
        frames: {
          shadowColor: 'rgba(28, 27, 25, 0.06)',
          editorActiveTabIndicatorBottomColor: '#E3DEFA',
        },
      },
    }),
    mdx(),
    react(),
    sitemap(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
