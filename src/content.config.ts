// src/content.config.ts
// Konfigurasi Content Collections (Astro 7): file ieu wajib aya di folder src/
// Dokuméntasi: https://docs.astro.build/en/guides/content-collections/
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const bio = defineCollection({
  loader: glob({ pattern: 'bio.md', base: './src/content/bio' }),
  schema: z.object({
    namaLengkap: z.string(),
    namaPanggilan: z.string().nullish(),
    tempatLahir: z.string().nullish(),
    tanggalLahir: z.coerce.date().nullable().optional(),
    umur: z.number().int().positive().nullable().optional(),
    jenisKelamin: z.string().nullish(),
    pasangan: z.string().nullish(),
    profesi: z.string().nullish(),
    zodiak: z.string().nullish(),
    kebangsaan: z.string().nullish(),
    domisili: z.string().nullish(),
    pendidikan: z.string().nullish(),
    tahunAktif: z.string().nullish(),
    photo: z.string().nullish(),
    ringkasan: z.string().nullish(),
    sameAs: z.array(z.string().url().nullable()).nullish(),
  }),
});

const blog = defineCollection({
  loader: glob({
    pattern: 'blog/**/*.md',
    base: './src/content',
    generateId: ({ entry }) => entry.replace(/^blog\//, '').replace(/\.md$/i, ''),
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().nullable().optional(),
    author: z.string().nullish().transform((author) => author || 'Joni Ilman Pahmi'),
    category: z.string(),
    schemaType: z.enum(['NewsArticle', 'BlogPosting', 'Article']).optional().default('NewsArticle'),
    tags: z
      .union([z.array(z.string()), z.string()])
      .optional()
      .transform((tags) => {
        if (Array.isArray(tags)) return tags;
        if (typeof tags === 'string') return tags.split(',').map((tag) => tag.trim()).filter(Boolean);
        return [];
      }),
    image: z.string().nullish(),
    draft: z.boolean().optional().default(false),
  }),
});

const portfolio = defineCollection({
  loader: glob({
    pattern: 'portfolio/**/*.md',
    base: './src/content',
    generateId: ({ entry }) => entry.replace(/^portfolio\//, '').replace(/\.md$/i, ''),
  }),
  schema: z.object({
    title: z.string(),
    client: z.string().nullish(),
    category: z.string(),
    pubDate: z.coerce.date().nullable().optional(),
    summary: z.string(),
    stack: z.array(z.string()).default([]),
    image: z.string().nullish(),
    liveUrl: z.string().nullish(),
    repoUrl: z.string().nullish(),
    draft: z.boolean().optional().default(false),
  }),
});

const certificates = defineCollection({
  loader: glob({
    pattern: 'certificates/**/*.md',
    base: './src/content',
    generateId: ({ entry }) => entry.replace(/^certificates\//, '').replace(/\.md$/i, ''),
  }),
  schema: z.object({
    title: z.string(),
    description: z.string().nullish(),
    courseName: z.string().nullish(),
    courseDescription: z.string().nullish(),
    courseProvider: z.string().nullish(),
    issuer: z.string().nullish(),
    year: z.string().nullish(),
    credentialId: z.string().nullish(),
    url: z.string().nullish(),
    image: z.string().nullish(),
    featured: z.boolean().optional().default(false),
    draft: z.boolean().optional().default(false),
  }),
});

export const collections = { bio, blog, portfolio, certificates };
