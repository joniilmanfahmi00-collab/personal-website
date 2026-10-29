import type { APIRoute } from 'astro';
import {
  getGiscusAdminConfig,
  getSession,
  getSessionCookieName,
  getSessionCookieOptions,
  isSameOriginRequest,
  jsonResponse,
} from '../../../../utils/giscusAdmin';

export const prerender = false;

export const GET: APIRoute = async ({ request }) => {
  try {
    const config = getGiscusAdminConfig();
    const session = await getSession(request, config);
    return jsonResponse(session
      ? { authenticated: true, login: session.login }
      : { authenticated: false }, session ? 200 : 401);
  } catch (error) {
    return jsonResponse({
      authenticated: false,
      error: error instanceof Error ? error.message : 'Giscus admin is not configured.',
    }, 503);
  }
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const config = getGiscusAdminConfig();
    if (!isSameOriginRequest(request, config)) return jsonResponse({ error: 'Origin check failed.' }, 403);
    return new Response(JSON.stringify({ authenticated: false }), {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'no-store',
        'Set-Cookie': `${getSessionCookieName()}=; ${getSessionCookieOptions(config, 0)}`,
      },
    });
  } catch (error) {
    return jsonResponse({ error: error instanceof Error ? error.message : 'Giscus admin is not configured.' }, 503);
  }
};
