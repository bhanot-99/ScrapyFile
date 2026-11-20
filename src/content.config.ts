import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const workCollection = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/work' }),
  schema: z.object({
    title: z.string(),
    tagline: z.string(),
    description: z.string(),
    category: z.enum(['conversion-copy', 'systems-deep-dive', 'launches-whitepapers']),
    categoryLabel: z.string(),
    deliverableType: z.string(),
    targetBuyer: z.string(),
    stack: z.array(z.string()),
    readTime: z.string(),
    publishDate: z.string(),
    featured: z.boolean().default(false),
    order: z.number().default(0),
    repoUrl: z.string().optional(),
    metrics: z.array(
      z.object({
        label: z.string(),
        value: z.string(),
      })
    ),
    vocQuotes: z.array(
      z.object({
        source: z.string(),
        quote: z.string(),
        friction: z.string(),
      })
    ).optional(),
    mechanismMatrix: z.array(
      z.object({
        mechanism: z.string(),
        benefit: z.string(),
      })
    ).optional(),
  }),
});

export const collections = {
  work: workCollection,
};
