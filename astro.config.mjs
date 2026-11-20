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
      themes: ['github-dark-dimmed', 'github-light'],
      defaultProps: {
        wrap: true,
      },
      styleOverrides: {
        borderRadius: '0.375rem',
        borderWidth: '2px',
        borderColor: '#111111',
        codeFontFamily: '"JetBrains Mono Variable", monospace',
        uiFontFamily: '"Inter Variable", sans-serif',
        frames: {
          shadowColor: '#111111',
          editorActiveTabIndicatorBottomColor: '#FFE600',
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
