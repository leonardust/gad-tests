import { prepareRandomNewArticle } from '@_src/factories/article.factory';
import { prepareRandomNewComment } from '@_src/factories/comment.factory';
import { expect, test } from '@_src/fixtures/merge.fixture';
import { testUser1 } from '@_src/test-data/user.data';

test.describe('Verify comments CRUD operations @api @GAD-R08-04', () => {
  let articleId: number;
  let headers: {
    [key: string]: string;
  };

  test.beforeAll('should create an article', async ({ request }) => {
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

    // Create article
    const articlesUrl = '/api/articles';

    const randomArticleData = prepareRandomNewArticle();
    const articleData = {
      title: randomArticleData.title,
      body: randomArticleData.body,
      date: '2024-08-05T09:11:45.053Z',
      image: '.\\data\\images\\256\\chuttersnap-9cCeS9Sg6nU-unsplash.jpg',
    };

    headers = {
      Authorization: `Bearer ${responseLoginJson.access_token}`,
    };

    const responseArticle = await request.post(articlesUrl, {
      headers,
      data: articleData,
    });

    const article = await responseArticle.json();
    articleId = article.id;
  });

  test('should not create an comment without a logged-in user', async ({
    request,
  }) => {
    // Arrange
    const expectedResponseCode = 401;
    const commentsUrl = '/api/comments';

    const randomCommentData = prepareRandomNewComment();
    const commentData = {
      article_id: articleId,
      body: randomCommentData.body,
      date: '2024-08-05T09:11:45.053Z',
    };

    //Act
    const response = await request.post(commentsUrl, { data: commentData });

    //Assert
    expect(response.status()).toBe(expectedResponseCode);
  });

  test('should create an comment with logged-in user', async ({ request }) => {
    // Arrange
    const expectedResponseCode = 201;

    //Act
    const commentsUrl = '/api/comments';

    const randomCommentData = prepareRandomNewComment();
    const commentData = {
      article_id: articleId,
      body: randomCommentData.body,
      date: '2024-08-05T09:11:45.053Z',
    };

    const response = await request.post(commentsUrl, {
      headers,
      data: commentData,
    });

    //Assert
    const actualResponseStatus = response.status();
    expect(
      actualResponseStatus,
      `expect status code ${expectedResponseCode}, and received ${actualResponseStatus}`,
    ).toBe(expectedResponseCode);

    const comment = await response.json();
    expect.soft(comment.body).toEqual(commentData.body);
  });
});
