import { prepareRandomNewArticle } from '@factories/article.factory';
import { prepareRandomNewComment } from '@factories/comment.factory';
import { APIRequestContext } from '@playwright/test';
import { testUser1 } from '@test-data/user.data';

export interface ArticlePayload {
  title: string;
  body: string;
  date: string;
  image: string;
}
export interface CommentPayload {
  article_id: number;
  body: string;
  date: string;
}
export interface Headers {
  [key: string]: string;
}

export const apiLinks = {
  articlesUrl: '/api/articles',
  commentsUrl: '/api/comments',
};

export async function getAuthHeader(
  request: APIRequestContext,
): Promise<Headers> {
  const loginUrl = '/api/login';
  const userData = {
    email: testUser1.userEmail,
    password: testUser1.userPassword,
  };
  const responseLogin = await request.post(loginUrl, {
    data: userData,
  });
  const responseLoginJson = await responseLogin.json();

  return {
    Authorization: `Bearer ${responseLoginJson.access_token}`,
  };
}

export function prepareArticlePayload(): ArticlePayload {
  const randomArticleData = prepareRandomNewArticle();
  const articleData = {
    title: randomArticleData.title,
    body: randomArticleData.body,
    date: '2024-08-05T09:11:45.053Z',
    image: '.\\data\\images\\256\\chuttersnap-9cCeS9Sg6nU-unsplash.jpg',
  };
  return articleData;
}

export function prepareCommentPayload(articleId: number): CommentPayload {
  const randomCommentData = prepareRandomNewComment();
  const commentData = {
    article_id: articleId,
    body: randomCommentData.body,
    date: '2024-08-05T09:11:45.053Z',
  };
  return commentData;
}
