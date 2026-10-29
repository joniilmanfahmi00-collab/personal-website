import themeCss from '../styles/giscus-theme.css?raw';

export const prerender = false;

export function GET() {
  return new Response(themeCss, {
    headers: {
      'Content-Type': 'text/css; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
