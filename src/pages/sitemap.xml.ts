import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';

export const prerender = true;

const staticPaths = ['/', '/bio', '/hire-me', '/blog', '/portfolio'];

function escapeXml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

export const GET: APIRoute = async ({ site }) => {
  const baseUrl = site ?? new URL('https://joniilmanpahmi.online/');
  const posts = (await getCollection('blog')).filter((post) => !post.data.draft);
  const projects = (await getCollection('portfolio')).filter((project) => !project.data.draft);
  const certificates = (await getCollection('certificates')).filter((certificate) => !certificate.data.draft);
  const blogUrls = posts.map((post) => {
    const slug = post.id.split('/').map(encodeURIComponent).join('/');
    return new URL(`/blog/${slug}`, baseUrl).href;
  });
  const portfolioUrls = projects.map((project) => {
    const slug = project.id.split('/').map(encodeURIComponent).join('/');
    return new URL(`/portfolio/${slug}`, baseUrl).href;
  });

  const publishedPaths = certificates.length > 0 ? [...staticPaths, '/certificates'] : staticPaths;
  const urls = [...publishedPaths.map((path) => new URL(path, baseUrl).href), ...blogUrls, ...portfolioUrls];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((url) => `  <url><loc>${escapeXml(url)}</loc></url>`).join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
