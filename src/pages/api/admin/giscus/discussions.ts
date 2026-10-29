import type { APIRoute } from 'astro';
import {
  ADD_DISCUSSION_COMMENT_MUTATION,
  apiErrorResponse,
  getGiscusAdminConfig,
  getSession,
  GISCUS_DISCUSSIONS_QUERY,
  githubGraphql,
  isSameOriginRequest,
  jsonResponse,
} from '../../../../utils/giscusAdmin';

export const prerender = false;

type GithubAuthor = { login: string } | null;
type GithubComment = {
  id: string;
  body: string;
  createdAt: string;
  author: GithubAuthor;
  replies?: { nodes: GithubComment[] };
};
type GithubDiscussion = {
  id: string;
  number: number;
  title: string;
  url: string;
  createdAt: string;
  updatedAt: string;
  isAnswered: boolean;
  author: GithubAuthor;
  comments: { nodes: GithubComment[] };
};

export const GET: APIRoute = async ({ request }) => {
  try {
    const config = getGiscusAdminConfig();
    const session = await getSession(request, config);
    if (!session) return jsonResponse({ error: 'Log in with the authorized GitHub account first.' }, 401);

    const data = await githubGraphql<{
      repository: { discussions: { nodes: GithubDiscussion[] } } | null;
    }>(session.token, GISCUS_DISCUSSIONS_QUERY, {
      owner: config.repoOwner,
      name: config.repoName,
      categoryId: config.categoryId,
    });

    if (!data.repository) return jsonResponse({ error: 'The configured GitHub repository is unavailable.' }, 404);
    return jsonResponse({ discussions: data.repository.discussions.nodes });
  } catch (error) {
    return apiErrorResponse(error);
  }
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const config = getGiscusAdminConfig();
    if (!isSameOriginRequest(request, config)) return jsonResponse({ error: 'Origin check failed.' }, 403);
    const session = await getSession(request, config);
    if (!session) return jsonResponse({ error: 'Your GitHub session expired. Log in again to reply.' }, 401);
    if (!request.headers.get('content-type')?.includes('application/json')) {
      return jsonResponse({ error: 'Expected a JSON request.' }, 415);
    }

    const payload = await request.json() as {
      discussionId?: unknown;
      replyToId?: unknown;
      body?: unknown;
    };
    const discussionId = typeof payload.discussionId === 'string' ? payload.discussionId.trim() : '';
    const replyToId = typeof payload.replyToId === 'string' ? payload.replyToId.trim() : undefined;
    const body = typeof payload.body === 'string' ? payload.body.trim() : '';
    if (!discussionId || !body) return jsonResponse({ error: 'Choose a discussion and write a reply.' }, 400);
    if (body.length > 20000) return jsonResponse({ error: 'Reply must be 20,000 characters or fewer.' }, 400);

    const data = await githubGraphql<{
      addDiscussionComment: { comment: GithubComment };
    }>(session.token, ADD_DISCUSSION_COMMENT_MUTATION, { discussionId, replyToId, body });
    return jsonResponse({ comment: data.addDiscussionComment.comment }, 201);
  } catch (error) {
    return apiErrorResponse(error);
  }
};
