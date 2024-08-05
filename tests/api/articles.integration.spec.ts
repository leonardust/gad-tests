import { expect, test } from '@_src/fixtures/merge.fixture';
import { getAuthHeader, prepareArticlePayload } from '@_src/utils/api.util';

test.describe('Verify articles CRUD operations @crud @GAD-R08-03', () => {
  test('should not create an article without a logged-in user', async ({
    request,
  }) => {
    // Arrange
    const expectedResponseCode = 401;
    const articlesUrl = '/api/articles';
    const articleData = prepareArticlePayload();

    //Act
    const response = await request.post(articlesUrl, { data: articleData });

    //Assert
    expect(response.status()).toBe(expectedResponseCode);
  });

  test('should create an article with logged-in user', async ({ request }) => {
    // Arrange
    const expectedResponseCode = 201;
    const headers = await getAuthHeader(request);
    const articlesUrl = '/api/articles';
    const articleData = prepareArticlePayload();

    //Act
    const responseArticle = await request.post(articlesUrl, {
      headers,
      data: articleData,
    });

    //Assert
    const actualResponseStatus = responseArticle.status();
    expect(
      actualResponseStatus,
      `expect status code ${expectedResponseCode}, and received ${actualResponseStatus}`,
    ).toBe(expectedResponseCode);

    const article = await responseArticle.json();
    expect.soft(article.title).toEqual(articleData.title);
    expect.soft(article.body).toEqual(articleData.body);
  });
});
