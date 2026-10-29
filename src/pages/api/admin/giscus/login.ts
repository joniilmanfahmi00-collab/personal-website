import type { APIRoute } from 'astro';
import {
  createRandomToken,
  getGiscusAdminConfig,
  getSessionCookieOptions,
  getStateCookieName,
  jsonResponse,
} from '../../../../utils/giscusAdmin';

export const prerender = false;

export const GET: APIRoute = () => {
  try {
    const config = getGiscusAdminConfig();
    const state = createRandomToken();
    const authorizationUrl = new URL('https://github.com/login/oauth/authorize');
    authorizationUrl.searchParams.set('client_id', config.clientId);
    authorizationUrl.searchParams.set('redirect_uri', config.callbackUrl);
    authorizationUrl.searchParams.set('state', state);
    authorizationUrl.searchParams.set('allow_signup', 'false');

    return new Response(null, {
      status: 302,
      headers: {
        Location: authorizationUrl.href,
        'Cache-Control': 'no-store',
        'Set-Cookie': `${getStateCookieName()}=${encodeURIComponent(state)}; ${getSessionCookieOptions(config, 600, 'Lax')}`,
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Giscus admin is not configured.';
    return jsonResponse({ error: message }, 503);
  }
};
