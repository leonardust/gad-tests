import { expect, test } from '@_src/fixtures/merge.fixture';
import {
  ArticlePayload,
  Headers,
  apiLinks,
  getAuthHeader,
  prepareArticlePayload,
} from '@_src/utils/api.util';
import { APIResponse } from '@playwright/test';

test.describe('Verify articles CRUD operations @crud @GAD-R08-03', () => {
  test('should not create an article without a logged-in user', async ({
    request,
  }) => {
    // Arrange
    const expectedResponseCode = 401;
    const articleData = prepareArticlePayload();

    //Act
    const response = await request.post(apiLinks.articlesUrl, {
      data: articleData,
    });

    //Assert
    expect(response.status()).toBe(expectedResponseCode);
  });

  test.describe('Verify articles CRUD operations @crud @GAD-R08-03', () => {
    let responseArticle: APIResponse;
    let headers: Headers;
    let articleData: ArticlePayload;

    test.beforeAll('should login', async ({ request }) => {
      headers = await getAuthHeader(request);
    });

    test.beforeEach('create an article', async ({ request }) => {
      articleData = prepareArticlePayload();
      responseArticle = await request.post(apiLinks.articlesUrl, {
        headers,
        data: articleData,
      });
    });

    test('should create an article with logged-in user', async () => {
      // Arrange
      const expectedResponseCodePost = 201;
      const actualResponseStatus = responseArticle.status();

      //Assert
      expect(
        actualResponseStatus,
        `expect status code ${expectedResponseCodePost}, and received ${actualResponseStatus}`,
      ).toBe(expectedResponseCodePost);

      const articleJson = await responseArticle.json();
      expect.soft(articleJson.title).toEqual(articleData.title);
      expect.soft(articleJson.body).toEqual(articleData.body);
    });

    test('should delete an article with logged-in user', async ({
      request,
    }) => {
      // await new Promise((resolve) => setTimeout(resolve, 5000));

      // Arrange
      const expectedResponseCodeDelete = 200;
      const expectedResponseCodeGet = 404;
      const articleJson = await responseArticle.json();
      const articleId = articleJson.id;

      //Act
      const responseArticleDelete = await request.delete(
        `${apiLinks.articlesUrl}/${articleId}`,
        {
          headers,
        },
      );

      //Assert
      const actualResponseStatus = responseArticleDelete.status();
      expect(
        actualResponseStatus,
        `expect status code ${expectedResponseCodeDelete}, and received ${actualResponseStatus}`,
      ).toBe(expectedResponseCodeDelete);

      // Assert checked delete article
      const responseArticleGet = await request.get(
        `${apiLinks.articlesUrl}/${articleId}`,
      );
      expect(
        responseArticleGet.status(),
        `expected status code ${expectedResponseCodeGet}, and received ${responseArticleGet.status()}`,
      ).toBe(expectedResponseCodeGet);
    });

    test('should not delete an article with non logged-n user', async ({
      request,
    }) => {
      // await new Promise((resolve) => setTimeout(resolve, 5000));

      // Arrange
      const expectedResponseCodeDelete = 401;
      const expectedResponseCodeGet = 200;
      const articleJson = await responseArticle.json();
      const articleId = articleJson.id;

      //Act
      const responseArticleDelete = await request.delete(
        `${apiLinks.articlesUrl}/${articleId}`,
      );

      //Assert
      const actualResponseStatus = responseArticleDelete.status();
      expect(
        actualResponseStatus,
        `expect status code ${expectedResponseCodeDelete}, and received ${actualResponseStatus}`,
      ).toBe(expectedResponseCodeDelete);

      // Assert checked not deleted article
      const responseArticleGet = await request.get(
        `${apiLinks.articlesUrl}/${articleId}`,
      );
      expect(
        responseArticleGet.status(),
        `expected status code ${expectedResponseCodeGet}, and received ${responseArticleGet.status()}`,
      ).toBe(expectedResponseCodeGet);
    });
  });
});
