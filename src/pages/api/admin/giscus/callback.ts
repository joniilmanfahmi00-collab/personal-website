import type { APIRoute } from 'astro';
import {
  encryptSession,
  getGiscusAdminConfig,
  getSessionCookieName,
  getSessionCookieOptions,
  getStateCookieName,
  jsonResponse,
  readCookie,
  timingSafeEqual,
} from '../../../../utils/giscusAdmin';
import type { GiscusAdminConfig } from '../../../../utils/giscusAdmin';

export const prerender = false;

function redirectToAdmin(callbackUrl: string, reason?: string) {
  const url = new URL('/admin/komentar', callbackUrl);
  if (reason) url.searchParams.set('login', reason);
  return new Response(null, {
    status: 302,
    headers: { Location: url.href, 'Cache-Control': 'no-store' },
  });
}

export const GET: APIRoute = async ({ request, url }) => {
  let config: GiscusAdminConfig;
  try {
    config = getGiscusAdminConfig();
  } catch (error) {
    return jsonResponse({ error: error instanceof Error ? error.message : 'Giscus admin is not configured.' }, 503);
  }

  const clearStateCookie = `${getStateCookieName()}=; ${getSessionCookieOptions(config, 0, 'Lax')}`;
  const state = url.searchParams.get('state') ?? '';
  const expectedState = readCookie(request, getStateCookieName());

  if (!state || !expectedState || !timingSafeEqual(state, expectedState)) {
    const response = redirectToAdmin(config.callbackUrl, 'state');
    response.headers.append('Set-Cookie', clearStateCookie);
    return response;
  }

  if (url.searchParams.has('error')) {
    const response = redirectToAdmin(config.callbackUrl, 'denied');
    response.headers.append('Set-Cookie', clearStateCookie);
    return response;
  }

  const code = url.searchParams.get('code');
  if (!code) {
    const response = redirectToAdmin(config.callbackUrl, 'code');
    response.headers.append('Set-Cookie', clearStateCookie);
    return response;
  }

  try {
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: config.clientId,
        client_secret: config.clientSecret,
        code,
        redirect_uri: config.callbackUrl,
        state,
      }),
    });
    const tokenData = await tokenResponse.json() as { access_token?: string; error?: string };
    if (!tokenResponse.ok || !tokenData.access_token) {
      const response = redirectToAdmin(config.callbackUrl, 'token');
      response.headers.append('Set-Cookie', clearStateCookie);
      return response;
    }

    const userResponse = await fetch('https://api.github.com/user', {
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${tokenData.access_token}`,
        'X-GitHub-Api-Version': '2022-11-28',
      },
    });
    const user = await userResponse.json() as { login?: string };
    if (!userResponse.ok || !user.login || user.login.toLowerCase() !== config.allowedLogin) {
      const response = redirectToAdmin(config.callbackUrl, 'not-allowed');
      response.headers.append('Set-Cookie', clearStateCookie);
      return response;
    }

    const session = await encryptSession({
      token: tokenData.access_token,
      login: user.login,
      expiresAt: Date.now() + 6 * 60 * 60 * 1000,
    }, config.sessionSecret);
    const response = redirectToAdmin(config.callbackUrl);
    response.headers.append(
      'Set-Cookie',
      `${getSessionCookieName()}=${encodeURIComponent(session)}; ${getSessionCookieOptions(config)}`,
    );
    response.headers.append('Set-Cookie', clearStateCookie);
    return response;
  } catch {
    const response = redirectToAdmin(config.callbackUrl, 'connection');
    response.headers.append('Set-Cookie', clearStateCookie);
    return response;
  }
};
