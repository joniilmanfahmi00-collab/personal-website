import type { APIRoute } from 'astro';

export const prerender = true;

export const GET: APIRoute = ({ site }) => {
  const baseUrl = site ?? new URL('https://joniilmanpahmi.online/');
  const robots = `User-agent: *
Allow: /
Disallow: /keystatic
Disallow: /admin/
Disallow: /api/admin/

Sitemap: ${new URL('/sitemap.xml', baseUrl).href}
`;

  return new Response(robots, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
