import { prepareRandomNewArticle } from '@factories/article.factory';
import { expect, test } from '@fixtures/merge.fixture';
import { waitForResponse } from '@utils/wait.util';

test.describe('Verify articles', () => {
  test('reject creating article without title @GAD-R04-01 GAD-R07-03 @logged', async ({
    addArticleView,
    page,
  }) => {
    // Arrange
    const expectedErrorMessage = 'Article was not created';
    const expectedResponseCode = 422;
    const articleData = prepareRandomNewArticle();
    articleData.title = '';
    const responsePromise = waitForResponse({ page, url: '/api/articles' });

    // Act
    await addArticleView.createArticle(articleData);
    const response = await responsePromise;

    //Assert
    await expect(addArticleView.alertPopup).toHaveText(expectedErrorMessage);
    expect(response.status()).toBe(expectedResponseCode);
  });

  test('reject creating article without body @GAD-R04-01 GAD-R07-03 @logged', async ({
    addArticleView,
    page,
  }) => {
    // Arrange
    const expectedResponseCode = 422;
    const expectedErrorMessage = 'Article was not created';
    const articleData = prepareRandomNewArticle();
    articleData.body = '';
    const responsePromise = waitForResponse({ page, url: '/api/articles' });

    // Act
    await addArticleView.createArticle(articleData);
    const response = await responsePromise;

    //Assert
    await expect(addArticleView.alertPopup).toHaveText(expectedErrorMessage);
    expect(response.status()).toBe(expectedResponseCode);
  });

  test.describe('Title length', () => {
    test('reject creating article with title exceeding 128 signs @GAD-R04-02 GAD-R07-03 @logged', async ({
      addArticleView,
      page,
    }) => {
      // Arrange
      const expectedResponseCode = 422;
      const expectedErrorMessage = 'Article was not created';
      const articleData = prepareRandomNewArticle(129);
      const responsePromise = waitForResponse({ page, url: '/api/articles' });

      // Act
      await addArticleView.createArticle(articleData);
      const response = await responsePromise;

      //Assert
      await expect(addArticleView.alertPopup).toHaveText(expectedErrorMessage);
      expect(response.status()).toBe(expectedResponseCode);
    });

    test('new article should be fetched from API @GAD-R07-04 @logged', async ({
      addArticleView,
      page,
    }) => {
      // Arrange
      const articleData = prepareRandomNewArticle();
      const responsePromise = waitForResponse({
        page,
        url: '/api/articles',
        method: 'GET',
        text: articleData.title,
      });

      // Act
      const articlePage = await addArticleView.createArticle(articleData);
      const response = await responsePromise;

      //Assert
      await expect.soft(articlePage.articleTitle).toHaveText(articleData.title);
      expect(response.ok()).toBeTruthy();
    });
  });
});
