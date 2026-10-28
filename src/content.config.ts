// src/content.config.ts
// Konfigurasi Content Collections (Astro 7): file ieu wajib aya di folder src/
// Dokuméntasi: https://docs.astro.build/en/guides/content-collections/
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const bio = defineCollection({
  loader: glob({ pattern: 'bio.md', base: './src/content/bio' }),
  schema: z.object({
    namaLengkap: z.string(),
    namaPanggilan: z.string().optional(),
    tempatLahir: z.string().optional(),
    tanggalLahir: z.coerce.date().optional(),
    umur: z.number().int().positive().nullable().optional(),
    jenisKelamin: z.string().optional(),
    pasangan: z.string().optional(),
    profesi: z.string().optional(),
    zodiak: z.string().optional(),
    kebangsaan: z.string().optional(),
    domisili: z.string().optional(),
    pendidikan: z.string().optional(),
    tahunAktif: z.string().optional(),
    photo: z.string().optional(),
    ringkasan: z.string().optional(),
    sameAs: z.array(z.string().url()).optional(),
  }),
});

const blog = defineCollection({
  loader: glob({
    pattern: ['blog/**/*.md', 'keystatic/blog/**/*.mdoc'],
    base: './src/content',
    generateId: ({ entry }) =>
      entry
        .replace(/^(?:blog|keystatic\/blog)\//, '')
        .replace(/\.(?:md|mdoc)$/i, ''),
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default('Joni Ilman Pahmi'),
    category: z.string(),
    tags: z.array(z.string()).default([]),
    image: z.string().optional(),
    draft: z.boolean().optional().default(false),
  }),
});

export const collections = { bio, blog };
