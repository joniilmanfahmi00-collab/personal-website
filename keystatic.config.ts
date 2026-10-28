import { collection, config, fields, singleton } from '@keystatic/core';

const blogCategories = [
  { label: 'Web Dev', value: 'Web Dev' },
  { label: 'SEO', value: 'SEO' },
  { label: 'Productivity', value: 'Productivity' },
  { label: 'Career', value: 'Career' },
  { label: 'Opinion', value: 'Opinion' },
];

const portfolioCategories = [
  { label: 'Web App', value: 'Web App' },
  { label: 'E-commerce', value: 'E-commerce' },
  { label: 'WordPress', value: 'WordPress' },
  { label: 'Branding', value: 'Branding' },
  { label: 'Automation', value: 'Automation' },
];

const techStackOptions = [
  { label: 'Astro', value: 'Astro' },
  { label: 'React', value: 'React' },
  { label: 'Tailwind CSS', value: 'Tailwind CSS' },
  { label: 'Laravel', value: 'Laravel' },
  { label: 'PHP', value: 'PHP' },
  { label: 'WordPress', value: 'WordPress' },
  { label: 'Flask', value: 'Flask' },
  { label: 'Python', value: 'Python' },
  { label: 'Node.js', value: 'Node.js' },
  { label: 'Next.js', value: 'Next.js' },
];

export default config({
  storage: {
    kind: 'github',
    repo: 'joniilmanfahmi00-collab/personal-website',
  },
  collections: {
    blog: collection({
      label: 'Blog Posts',
      slugField: 'title',
      path: 'src/content/keystatic/blog/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({
          name: { label: 'Judul Artikel' },
        }),
        description: fields.text({
          label: 'Ringkasan',
          multiline: true,
          validation: {
            length: {
              min: 40,
              max: 220,
            },
          },
        }),
        pubDate: fields.date({
          label: 'Tanggal Publikasi',
          defaultValue: { kind: 'today' },
          validation: { isRequired: true },
        }),
        author: fields.text({
          label: 'Penulis',
          defaultValue: 'Joni Ilman Pahmi',
        }),
        category: fields.select({
          label: 'Kategori',
          options: blogCategories,
          defaultValue: 'Web Dev',
        }),
        tags: fields.multiselect({
          label: 'Tag',
          options: [
            { label: 'WordPress', value: 'WordPress' },
            { label: 'SEO', value: 'SEO' },
            { label: 'Frontend', value: 'Frontend' },
            { label: 'Performance', value: 'Performance' },
            { label: 'Tutorial', value: 'Tutorial' },
            { label: 'Productivity', value: 'Productivity' },
          ],
          defaultValue: [],
        }),
        image: fields.url({
          label: 'Gambar Cover',
          description: 'URL gambar artikel / hero',
        }),
        draft: fields.checkbox({
          label: 'Draft',
          defaultValue: false,
        }),
        seo: fields.object({
          label: 'SEO',
          fields: {
            title: fields.text({ label: 'SEO Title' }),
            description: fields.text({
              label: 'SEO Description',
              multiline: true,
            }),
            canonicalUrl: fields.url({ label: 'Canonical URL' }),
            ogImage: fields.url({ label: 'OG Image' }),
          },
        }),
        content: fields.markdoc({
          label: 'Isi Artikel',
        }),
      },
    }),
    portfolio: collection({
      label: 'Portfolio Showcase',
      slugField: 'title',
      path: 'src/content/keystatic/portfolio/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({
          name: { label: 'Judul Proyek' },
        }),
        client: fields.text({
          label: 'Klien / Brand',
        }),
        category: fields.select({
          label: 'Kategori',
          options: portfolioCategories,
          defaultValue: 'Web App',
        }),
        summary: fields.text({
          label: 'Ringkasan Proyek',
          multiline: true,
        }),
        stack: fields.multiselect({
          label: 'Tech Stack',
          options: techStackOptions,
          defaultValue: [],
        }),
        image: fields.url({
          label: 'Gambar Cover',
        }),
        liveUrl: fields.url({ label: 'URL Live' }),
        repoUrl: fields.url({ label: 'URL Repository' }),
        featured: fields.checkbox({
          label: 'Featured',
          defaultValue: false,
        }),
        content: fields.markdoc({
          label: 'Deskripsi Detail',
        }),
      },
    }),
    certificates: collection({
      label: 'Certificates',
      slugField: 'title',
      path: 'src/content/keystatic/certificates/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({
          name: { label: 'Judul Sertifikat' },
        }),
        issuer: fields.text({
          label: 'Penerbit / Institusi',
        }),
        year: fields.text({
          label: 'Tahun',
        }),
        credentialId: fields.text({
          label: 'Nomor Sertifikat',
        }),
        url: fields.url({
          label: 'Tautan Sertifikat',
        }),
        featured: fields.checkbox({
          label: 'Tampilkan di homepage',
          defaultValue: false,
        }),
        content: fields.markdoc({
          label: 'Catatan / Keterangan',
        }),
      },
    }),
  },
  singletons: {
    seoSettings: singleton({
      label: 'SEO Settings',
      path: 'src/content/site/seo',
      format: { data: 'yaml' },
      schema: {
        siteName: fields.text({
          label: 'Nama Situs',
          defaultValue: 'Joni Ilman Pahmi',
        }),
        siteUrl: fields.url({
          label: 'URL Situs',
          defaultValue: 'https://joniilmanpahmi.online',
        }),
        defaultTitle: fields.text({
          label: 'Judul Default',
        }),
        defaultDescription: fields.text({
          label: 'Deskripsi Default',
          multiline: true,
        }),
        twitterHandle: fields.text({
          label: 'Twitter/X Handle',
        }),
        defaultOgImage: fields.url({
          label: 'Default OG Image',
        }),
        schemaOrgName: fields.text({
          label: 'Nama Organisasi',
        }),
        schemaOrgUrl: fields.url({
          label: 'URL Organisasi',
        }),
      },
    }),
  },
});
