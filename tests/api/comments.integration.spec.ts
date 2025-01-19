import { expect, test } from '@_src/fixtures/merge.fixture';
import {
  CommentPayload,
  Headers,
  apiLinks,
  getAuthHeader,
  prepareArticlePayload,
  prepareCommentPayload,
} from '@_src/utils/api.util';
import { APIResponse } from '@playwright/test';

test.describe('Verify comments CRUD operations @crud', () => {
  let responseComment: APIResponse;
  let commentData: CommentPayload;
  let headers: Headers;
  let articleId: number;

  test('should not create a comment without a logged-in user @GAD-R08-04', async ({
    request,
  }) => {
    // Arrange
    const expectedResponseCode = 401;
    commentData = prepareCommentPayload(articleId);

    //Act
    responseComment = await request.post(apiLinks.commentsUrl, {
      data: commentData,
    });

    //Assert
    expect(responseComment.status()).toBe(expectedResponseCode);
  });

  test.describe('crud operations', () => {
    test.beforeAll('create an article', async ({ request }) => {
      headers = await getAuthHeader(request);

      const articleData = prepareArticlePayload();

      const responseArticle = await request.post(apiLinks.articlesUrl, {
        headers,
        data: articleData,
      });

      const article = await responseArticle.json();
      articleId = article.id;
    });

    test.beforeEach('create a comment', async ({ request }) => {
      commentData = prepareCommentPayload(articleId);
      responseComment = await request.post(apiLinks.commentsUrl, {
        headers,
        data: commentData,
      });
    });

    test('should create a comment with logged-in user', async () => {
      // Arrange
      const expectedResponseCode = 201;
      const actualResponseStatus = responseComment.status();

      //Assert
      expect(
        actualResponseStatus,
        `expect status code ${expectedResponseCode}, and received ${actualResponseStatus}`,
      ).toBe(expectedResponseCode);

      const comment = await responseComment.json();
      expect.soft(comment.body).toEqual(commentData.body);
    });

    test('should delete a comment with logged-in user @GAD-R08-05', async ({
      request,
    }) => {
      // await new Promise((resolve) => setTimeout(resolve, 5000));

      // Arrange
      const expectedDeletedCommentStatusCode = 200;
      const expectedResponseCodeGet = 404;
      const commentJson = await responseComment.json();
      const commentId = commentJson.id;

      //Act
      const responseCommentDelete = await request.delete(
        `${apiLinks.commentsUrl}/${commentId}`,
        {
          headers,
        },
      );

      //Assert
      const actualResponseStatus = responseCommentDelete.status();
      expect(
        actualResponseStatus,
        `expect status code ${expectedDeletedCommentStatusCode}, and received ${actualResponseStatus}`,
      ).toBe(expectedDeletedCommentStatusCode);

      // Assert checked delete comment
      const responseCommentGet = await request.get(
        `${apiLinks.commentsUrl}/${commentId}`,
      );
      expect(
        responseCommentGet.status(),
        `expected status code ${expectedResponseCodeGet}, and received ${responseCommentGet.status()}`,
      ).toBe(expectedResponseCodeGet);
    });

    test('should not delete a comment with non logged-n user @GAD-R08-05', async ({
      request,
    }) => {
      await new Promise((resolve) => setTimeout(resolve, 5000));

      // Arrange
      const expectedResponseCodeDelete = 401;
      const expectedNotDeletedArticleStatusCode = 200;
      const commentJson = await responseComment.json();
      const commentId = commentJson.id;

      //Act
      const responseCommentDelete = await request.delete(
        `${apiLinks.commentsUrl}/${commentId}`,
      );

      //Assert
      const actualResponseStatus = responseCommentDelete.status();
      expect(
        actualResponseStatus,
        `expect status code ${expectedResponseCodeDelete}, and received ${actualResponseStatus}`,
      ).toBe(expectedResponseCodeDelete);

      // Assert checked not deleted comment
      const responseCommentGet = await request.get(
        `${apiLinks.commentsUrl}/${commentId}`,
      );
      expect(
        responseCommentGet.status(),
        `expected status code ${expectedNotDeletedArticleStatusCode}, and received ${responseCommentGet.status()}`,
      ).toBe(expectedNotDeletedArticleStatusCode);
    });
  });
});
