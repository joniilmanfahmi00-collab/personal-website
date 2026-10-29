type Environment = Record<string, string | undefined>;

export type GiscusAdminConfig = {
  clientId: string;
  clientSecret: string;
  sessionSecret: string;
  allowedLogin: string;
  callbackUrl: string;
  repoOwner: string;
  repoName: string;
  categoryId: string;
};

export type GiscusAdminSession = {
  token: string;
  login: string;
  expiresAt: number;
};

const SESSION_COOKIE = 'giscus_admin_session';
const STATE_COOKIE = 'giscus_admin_oauth_state';
const SESSION_MAX_AGE = 6 * 60 * 60;

function envValue(name: string) {
  const runtimeEnv = (globalThis as typeof globalThis & {
    process?: { env?: Environment };
  }).process?.env;
  const astroEnv = import.meta.env as Environment;
  return runtimeEnv?.[name] || astroEnv[name] || '';
}

function requiredEnv(name: string) {
  const value = envValue(name).trim();
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}

export function getGiscusAdminConfig(): GiscusAdminConfig {
  const [repoOwner, repoName] = requiredEnv('PUBLIC_GISCUS_REPO').split('/');
  if (!repoOwner || !repoName) {
    throw new Error('PUBLIC_GISCUS_REPO must use the owner/repository format.');
  }

  const callbackUrl = requiredEnv('GISCUS_ADMIN_OAUTH_CALLBACK_URL');
  if (!['https:', 'http:'].includes(new URL(callbackUrl).protocol)) {
    throw new Error('GISCUS_ADMIN_OAUTH_CALLBACK_URL must use HTTP or HTTPS.');
  }

  const sessionSecret = requiredEnv('KEYSTATIC_SECRET');
  if (sessionSecret.length < 32) {
    throw new Error('KEYSTATIC_SECRET must contain at least 32 characters.');
  }

  return {
    clientId: requiredEnv('KEYSTATIC_GITHUB_CLIENT_ID'),
    clientSecret: requiredEnv('KEYSTATIC_GITHUB_CLIENT_SECRET'),
    sessionSecret,
    allowedLogin: requiredEnv('GISCUS_ADMIN_GITHUB_USERNAME').toLowerCase(),
    callbackUrl,
    repoOwner,
    repoName,
    categoryId: requiredEnv('PUBLIC_GISCUS_CATEGORY_ID'),
  };
}

export function getSessionCookieName() {
  return SESSION_COOKIE;
}

export function getStateCookieName() {
  return STATE_COOKIE;
}

export function getSessionCookieOptions(
  config: GiscusAdminConfig,
  maxAge = SESSION_MAX_AGE,
  sameSite: 'Strict' | 'Lax' = 'Strict',
) {
  const secure = new URL(config.callbackUrl).protocol === 'https:' ? '; Secure' : '';
  return `Path=/api/admin/giscus; HttpOnly; SameSite=${sameSite}; Max-Age=${maxAge}${secure}`;
}

export function readCookie(request: Request, name: string) {
  const cookieHeader = request.headers.get('cookie') ?? '';
  for (const item of cookieHeader.split(';')) {
    const separator = item.indexOf('=');
    if (separator < 0 || item.slice(0, separator).trim() !== name) continue;
    try {
      return decodeURIComponent(item.slice(separator + 1).trim());
    } catch {
      return '';
    }
  }
  return '';
}

function base64UrlEncode(bytes: Uint8Array) {
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

function base64UrlDecode(value: string) {
  const base64 = value.replace(/-/g, '+').replace(/_/g, '/');
  const padded = base64 + '='.repeat((4 - (base64.length % 4)) % 4);
  const binary = atob(padded);
  return Uint8Array.from(binary, (character) => character.charCodeAt(0));
}

async function getEncryptionKey(secret: string) {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(secret));
  return crypto.subtle.importKey('raw', digest, { name: 'AES-GCM' }, false, ['encrypt', 'decrypt']);
}

export async function encryptSession(session: GiscusAdminSession, secret: string) {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const key = await getEncryptionKey(secret);
  const ciphertext = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    new TextEncoder().encode(JSON.stringify(session)),
  );
  return `${base64UrlEncode(iv)}.${base64UrlEncode(new Uint8Array(ciphertext))}`;
}

export async function decryptSession(value: string, config: GiscusAdminConfig): Promise<GiscusAdminSession | null> {
  try {
    const [encodedIv, encodedCiphertext] = value.split('.');
    if (!encodedIv || !encodedCiphertext) return null;
    const key = await getEncryptionKey(config.sessionSecret);
    const plaintext = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv: base64UrlDecode(encodedIv) },
      key,
      base64UrlDecode(encodedCiphertext),
    );
    const session = JSON.parse(new TextDecoder().decode(plaintext)) as GiscusAdminSession;
    if (
      typeof session.token !== 'string' ||
      typeof session.login !== 'string' ||
      session.login.toLowerCase() !== config.allowedLogin ||
      typeof session.expiresAt !== 'number' ||
      session.expiresAt <= Date.now()
    ) {
      return null;
    }
    return session;
  } catch {
    return null;
  }
}

export async function getSession(request: Request, config: GiscusAdminConfig) {
  const value = readCookie(request, SESSION_COOKIE);
  return value ? decryptSession(value, config) : null;
}

export function createRandomToken(byteLength = 32) {
  return base64UrlEncode(crypto.getRandomValues(new Uint8Array(byteLength)));
}

export function timingSafeEqual(left: string, right: string) {
  if (left.length !== right.length) return false;
  let difference = 0;
  for (let index = 0; index < left.length; index += 1) {
    difference |= left.charCodeAt(index) ^ right.charCodeAt(index);
  }
  return difference === 0;
}

export function isSameOriginRequest(request: Request, config: GiscusAdminConfig) {
  const origin = request.headers.get('origin');
  return origin === new URL(config.callbackUrl).origin;
}

export function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}

export async function githubGraphql<T>(token: string, query: string, variables: Record<string, unknown>): Promise<T> {
  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'X-GitHub-Api-Version': '2022-11-28',
    },
    body: JSON.stringify({ query, variables }),
  });

  const payload = await response.json() as {
    data?: T;
    errors?: Array<{ message?: string }>;
    message?: string;
  };

  if (!response.ok || payload.errors?.length || !payload.data) {
    const detail = payload.errors?.map((error) => error.message).filter(Boolean).join('; ');
    throw new Error(detail || payload.message || `GitHub API returned HTTP ${response.status}.`);
  }
  return payload.data;
}

export function apiErrorResponse(error: unknown) {
  const message = error instanceof Error ? error.message : 'An unexpected error occurred.';
  if (/resource not accessible by integration|insufficient.*scope|permission.*denied/i.test(message)) {
    return jsonResponse({
      error: 'GitHub App can acan meunang aksés Discussions. Pasihan hak baca jeung tulis Discussions, tuluy apdet instalasi app kana repo.',
    }, 403);
  }
  const status = /Missing required environment variable|must use|must contain/i.test(message) ? 503 : 502;
  return jsonResponse({ error: message }, status);
}

export const GISCUS_DISCUSSIONS_QUERY = `
  query GiscusAdminDiscussions($owner: String!, $name: String!, $categoryId: ID!) {
    repository(owner: $owner, name: $name) {
      discussions(first: 30, categoryId: $categoryId, orderBy: { field: UPDATED_AT, direction: DESC }) {
        nodes {
          id
          number
          title
          url
          createdAt
          updatedAt
          isAnswered
          author { login }
          comments(first: 50) {
            nodes {
              id
              body
              createdAt
              author { login }
              replies(first: 20) {
                nodes {
                  id
                  body
                  createdAt
                  author { login }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const ADD_DISCUSSION_COMMENT_MUTATION = `
  mutation GiscusAdminReply($discussionId: ID!, $body: String!, $replyToId: ID) {
    addDiscussionComment(input: {
      discussionId: $discussionId,
      body: $body,
      replyToId: $replyToId
    }) {
      comment {
        id
        body
        createdAt
        author { login }
      }
    }
  }
`;
