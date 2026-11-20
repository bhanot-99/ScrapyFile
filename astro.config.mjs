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
      themes: ['github-dark-dimmed'],
      defaultProps: {
        wrap: true,
      },
      styleOverrides: {
        borderRadius: '0.5rem',
        borderWidth: '1px',
        borderColor: 'rgba(255, 255, 255, 0.08)',
        codeFontFamily: '"JetBrains Mono Variable", monospace',
        uiFontFamily: '"Inter Variable", sans-serif',
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
