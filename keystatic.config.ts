import { collection, config, fields, singleton } from '@keystatic/core';
import { createElement } from 'react';

const blogCategories = [
  { label: 'Web Dev', value: 'Web Dev' },
  { label: 'SEO', value: 'SEO' },
  { label: 'Productivity', value: 'Productivity' },
  { label: 'Career', value: 'Career' },
  { label: 'Tutorial', value: 'Tutorial' },
  { label: 'Opini', value: 'Opini' },
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
  { label: 'JavaScript', value: 'JavaScript' },
  { label: 'Tailwind CSS', value: 'Tailwind CSS' },
  { label: 'Tailwind', value: 'Tailwind' },
  { label: 'Laravel', value: 'Laravel' },
  { label: 'PHP', value: 'PHP' },
  { label: 'WordPress', value: 'WordPress' },
  { label: 'WooCommerce', value: 'WooCommerce' },
  { label: 'Bootstrap 5', value: 'Bootstrap 5' },
  { label: 'Flask', value: 'Flask' },
  { label: 'Telegram API', value: 'Telegram API' },
  { label: 'Python', value: 'Python' },
  { label: 'Node.js', value: 'Node.js' },
  { label: 'Express.js', value: 'Express.js' },
  { label: 'Nest.js', value: 'Nest.js' },
  { label: 'Next.js', value: 'Next.js' },
  { label: 'Nuxt.js', value: 'Nuxt.js' },
  { label: 'Vue.js', value: 'Vue.js' },
  { label: 'Django', value: 'Django' },
  { label: 'FastAPI', value: 'FastAPI' },
  // Golang like Gin, Fiber, Echo, Revel, Beego, Buffalo, Martini, Iris, Gorm, Gorilla Mux, Chi, Echo, Buffalo, Martini, Iris
  { label: 'Golang', value: 'Golang' },
  { label: 'Gin', value: 'Gin' },
  { label: 'Fiber', value: 'Fiber' },
  { label: 'Echo', value: 'Echo' },
  // Goravel, Revel, Beego, Buffalo, Martini, Iris, Gorm, Gorilla Mux, Chi
  { label: 'Goravel', value: 'Goravel' },
  { label: 'Revel', value: 'Revel' },
  { label: 'Beego', value: 'Beego' },
  { label: 'Buffalo', value: 'Buffalo' },
  { label: 'Martini', value: 'Martini' },
  { label: 'Iris', value: 'Iris' },
  { label: 'Java Spring Boot', value: 'Java Spring Boot' },
  { label: 'MySQL', value: 'MySQL' },
  { label: 'PostgreSQL', value: 'PostgreSQL' },
  { label: 'MongoDB', value: 'MongoDB' },
  { label: 'Redis', value: 'Redis' },
  // Docker, Kubernetes, Nginx, Apache, Caddy, Traefik, Varnish, HAProxy, Envoy, Istio, Linkerd
  { label: 'Docker', value: 'Docker' },
  { label: 'Kubernetes', value: 'Kubernetes' },
  { label: 'Nginx', value: 'Nginx' },
  { label: 'Apache', value: 'Apache' },
  { label: 'Caddy', value: 'Caddy' },
  { label: 'Traefik', value: 'Traefik' },
  { label: 'Varnish', value: 'Varnish' },
  { label: 'HAProxy', value: 'HAProxy' },
  { label: 'Envoy', value: 'Envoy' },
  { label: 'Istio', value: 'Istio' },
  { label: 'Linkerd', value: 'Linkerd' },
  // Genkit, Ollama, LangChain, LlamaIndex, AutoGPT, BabyAGI, AgentGPT, SuperAGI, Jarvis, Claude, Mistral, Falcon, Cerebras-GPT
  { label: 'Genkit', value: 'Genkit' },
  { label: 'Ollama', value: 'Ollama' },
  { label: 'LangChain', value: 'LangChain' },
  // Tailwind CSS, Bootstrap, Material UI, Ant Design, Chakra UI, Semantic UI, Foundation, Bulma, Spectre.css, Milligram, Tachyons
  { label: 'Material UI', value: 'Material UI' },
  { label: 'Ant Design', value: 'Ant Design' },
  { label: 'Chakra UI', value: 'Chakra UI' },
  { label: 'Semantic UI', value: 'Semantic UI' },
  { label: 'Foundation', value: 'Foundation' },
  { label: 'Bulma', value: 'Bulma' },
  { label: 'Spectre.css', value: 'Spectre.css' },
  { label: 'Milligram', value: 'Milligram' },
  { label: 'Tachyons', value: 'Tachyons' },
  { label: 'Tailwind CSS', value: 'Tailwind CSS' },
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
      path: 'src/content/blog/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({
          name: {
            label: 'Judul Artikel',
            validation: { isRequired: true },
          },
        }),
        description: fields.text({
          label: 'Ringkasan',
          multiline: true,
          validation: {
            length: {
              min: 40,
              max: 220,
            },
            isRequired: true,
          },
        }),
        pubDate: fields.date({
          label: 'Tanggal Publikasi',
          defaultValue: { kind: 'today' },
          validation: { isRequired: true },
        }),
        updatedDate: fields.date({ label: 'Tanggal Diperbarui' }),
        author: fields.text({
          label: 'Penulis',
          defaultValue: 'Joni Ilman Pahmi',
          validation: { isRequired: true },
        }),
        category: fields.select({
          label: 'Kategori',
          options: blogCategories,
          defaultValue: 'Web Dev',
        }),
        schemaType: fields.select({
          label: 'Jenis Schema Artikel',
          description: 'NewsArticle jadi pilihan utama. Pilih Article atanapi BlogPosting kanggo artikel evergreen/tulisan blog biasa.',
          options: [
            { label: 'NewsArticle (utama)', value: 'NewsArticle' },
            { label: 'BlogPosting', value: 'BlogPosting' },
            { label: 'Article', value: 'Article' },
          ],
          defaultValue: 'NewsArticle',
        }),
        tags: fields.text({
          label: 'Tag',
          description: 'Pisahkeun unggal tag ku koma, contona: SEO, WordPress, Tutorial.',
        }),
        image: fields.text({
          label: 'Gambar Cover',
          description: 'URL gambar artikel / hero',
        }),
        draft: fields.checkbox({
          label: 'Draft',
          defaultValue: false,
        }),
        seo: fields.object(
          {
            title: fields.text({ label: 'SEO Title' }),
            description: fields.text({
              label: 'SEO Description',
              multiline: true,
            }),
            canonicalUrl: fields.url({ label: 'Canonical URL' }),
            ogImage: fields.url({ label: 'OG Image' }),
          },
          { label: 'SEO' },
        ),
        content: fields.markdoc({
          label: 'Isi Artikel',
          extension: 'md',
        }),
      },
    }),
    portfolio: collection({
      label: 'Portfolio Showcase',
      slugField: 'title',
      path: 'src/content/portfolio/*',
      format: { contentField: 'content' },
      columns: ['title', 'category', 'pubDate', 'draft'],
      schema: {
        title: fields.slug({
          name: {
            label: 'Judul Proyek',
            validation: { isRequired: true },
          },
        }),
        client: fields.text({
          label: 'Klien / Brand',
        }),
        category: fields.select({
          label: 'Kategori',
          options: portfolioCategories,
          defaultValue: 'Web App',
        }),
        pubDate: fields.date({
          label: 'Tanggal Proyek',
          defaultValue: { kind: 'today' },
        }),
        summary: fields.text({
          label: 'Ringkasan Proyek',
          multiline: true,
          validation: { isRequired: true },
        }),
        stack: fields.multiselect({
          label: 'Tech Stack',
          options: techStackOptions,
          defaultValue: [],
        }),
        image: fields.text({
          label: 'Gambar Cover',
        }),
        liveUrl: fields.url({ label: 'URL Live' }),
        repoUrl: fields.url({ label: 'URL Repository' }),
        draft: fields.checkbox({
          label: 'Draft',
          defaultValue: false,
        }),
        content: fields.markdoc({
          label: 'Deskripsi Detail',
          extension: 'md',
        }),
      },
    }),
    certificates: collection({
      label: 'Sertifikat',
      slugField: 'title',
      path: 'src/content/certificates/*',
      format: { contentField: 'content' },
      columns: ['title', 'issuer', 'year', 'draft'],
      schema: {
        title: fields.slug({
          name: {
            label: 'Judul Sertifikat',
            validation: { isRequired: true },
          },
        }),
        description: fields.text({
          label: 'Keterangan Sertifikat',
          multiline: true,
        }),
        courseName: fields.text({
          label: 'Ngaran Kursus (Schema Course)',
          description: 'Eusian lamun sertifikat ieu ngabuktikeun parantos ngaréngsékeun kursus/palatihan.',
        }),
        courseDescription: fields.text({
          label: 'Ringkesan Kursus (Schema Course)',
          multiline: true,
          description: 'Dipaké dina Course schema lamun Ngaran Kursus dieusian.',
        }),
        courseProvider: fields.text({
          label: 'Panyadia Kursus (Schema Course)',
          description: 'Organisasi anu nyayagikeun kursus; eusian lamun béda ti penerbit sertifikat.',
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
        image: fields.text({
          label: 'Gambar Sertifikat',
          description: 'Path gambar dina public/ atawa URL gambar sertifikat.',
        }),
        featured: fields.checkbox({
          label: 'Sertifikat unggulan',
          defaultValue: false,
        }),
        draft: fields.checkbox({
          label: 'Draft',
          defaultValue: false,
        }),
        content: fields.markdoc({
          label: 'Catatan / Keterangan',
          extension: 'md',
        }),
      },
    }),
  },
  singletons: {
    bio: singleton({
      label: 'Biodata & Biografi',
      path: 'src/content/bio/bio',
      format: { contentField: 'biografi' },
      schema: {
        namaLengkap: fields.text({
          label: 'Nama Lengkap',
          validation: { isRequired: true },
        }),
        namaPanggilan: fields.text({ label: 'Nama Panggilan' }),
        tempatLahir: fields.text({ label: 'Tempat Lahir' }),
        tanggalLahir: fields.date({ label: 'Tanggal Lahir' }),
        umur: fields.integer({ label: 'Umur Manual (opsional)', validation: { min: 1 } }),
        jenisKelamin: fields.text({ label: 'Jenis Kelamin' }),
        pasangan: fields.text({ label: 'Pasangan' }),
        profesi: fields.text({ label: 'Profesi' }),
        zodiak: fields.text({ label: 'Zodiak' }),
        kebangsaan: fields.text({ label: 'Kebangsaan' }),
        domisili: fields.text({ label: 'Domisili' }),
        pendidikan: fields.text({ label: 'Pendidikan' }),
        tahunAktif: fields.text({ label: 'Tahun Aktif' }),
        photo: fields.text({ label: 'Path Foto Profil' }),
        ringkasan: fields.text({ label: 'Ringkasan Profil', multiline: true }),
        sameAs: fields.array(fields.url({ label: 'URL Profil Sosial' }), {
          label: 'Tautan Sosial untuk JSON-LD',
          description: 'Tambahkan URL profil penuh, misalnya https://github.com/nama-akun.',
        }),
        biografi: fields.markdoc({
          label: 'Isi Biografi',
          extension: 'md',
        }),
      },
    }),
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
  ui: {
    // Keystatic keeps its own navigation. This brand shortcut opens the custom admin dashboard.
    navigation: {
      'Eusi Situs': ['blog', 'portfolio', 'certificates'],
      'Profil & SEO': ['bio', 'seoSettings'],
    },
    brand: {
      name: 'Joni Website',
      mark: ({ colorScheme }) => createElement(
        'a',
        {
          href: '/admin',
          title: 'Buka dasbor admin',
          'aria-label': 'Buka dasbor admin',
          style: {
            height: 24,
            padding: '0 6px',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 4,
            borderRadius: 6,
            color: colorScheme === 'dark' ? '#7bb4d1' : '#1b4b66',
            backgroundColor: colorScheme === 'dark' ? 'rgba(123, 180, 209, 0.12)' : 'rgba(27, 75, 102, 0.08)',
            textDecoration: 'none',
          },
        },
        createElement(
          'svg',
          {
            viewBox: '0 0 24 24',
            width: 18,
            height: 18,
            fill: 'none',
            stroke: 'currentColor',
            strokeWidth: 1.8,
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            'aria-hidden': true,
          },
          createElement('path', { d: 'M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z' }),
        ),
        createElement('span', { style: { fontSize: 11, fontWeight: 600, whiteSpace: 'nowrap' } }, 'Dasbor'),
      ),
    },
  },
});
