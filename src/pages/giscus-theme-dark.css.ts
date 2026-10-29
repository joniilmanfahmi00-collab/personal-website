import lightThemeCss from '../styles/giscus-theme.css?raw';
import darkThemeCss from '../styles/giscus-theme-dark.css?raw';

export const prerender = false;

export function GET() {
  return new Response(`${lightThemeCss}\n${darkThemeCss}`, {
    headers: {
      'Content-Type': 'text/css; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
