import { prepareRandomNewArticle } from '@_src/factories/article.factory';
import { expect, test } from '@_src/fixtures/merge.fixture';
import { testUser1 } from '@_src/test-data/user.data';

test.describe('Verify articles CRUD operations @api @GAD-R08-03', () => {
  test('should not create an article without a logged-in user', async ({
    request,
  }) => {
    // Arrange
    const expectedResponseCode = 401;
    const articlesUrl = '/api/articles';

    const randomArticleData = prepareRandomNewArticle();
    const articleData = {
      title: randomArticleData.title,
      body: randomArticleData.body,
      date: '2024-08-05T09:11:45.053Z',
      image: '',
    };

    //Act
    const response = await request.post(articlesUrl, { data: articleData });

    //Assert
    expect(response.status()).toBe(expectedResponseCode);
  });

  test('should create an article with logged-in user', async ({ request }) => {
    // Arrange
    const expectedResponseCode = 201;

    // Login
    const loginUrl = '/api/login';
    const userData = {
      email: testUser1.userEmail,
      password: testUser1.userPassword,
    };
    const responseLogin = await request.post(loginUrl, {
      data: userData,
    });
    const responseLoginJson = await responseLogin.json();

    //Act
    const articlesUrl = '/api/articles';

    const randomArticleData = prepareRandomNewArticle();
    const articleData = {
      title: randomArticleData.title,
      body: randomArticleData.body,
      date: '2024-08-05T09:11:45.053Z',
      image: '.\\data\\images\\256\\chuttersnap-9cCeS9Sg6nU-unsplash.jpg',
    };

    const headers = {
      Authorization: `Bearer ${responseLoginJson.access_token}`,
    };

    const responseArticle = await request.post(articlesUrl, {
      headers,
      data: articleData,
    });

    //Assert
    const actualResponseStatus = responseArticle.status();
    expect(
      actualResponseStatus,
      `Status code expected ${expectedResponseCode}, but received ${actualResponseStatus}`,
    ).toBe(expectedResponseCode);

    const article = await responseArticle.json();
    expect.soft(article.title).toEqual(articleData.title);
    expect.soft(article.body).toEqual(articleData.body);
  });
});
