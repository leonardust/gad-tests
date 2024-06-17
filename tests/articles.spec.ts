import { randomNewArticle } from '../src/factories/article.factory';
import { ArticlePage } from '../src/pages/article.page';
import { ArticlesPage } from '../src/pages/articles.page';
import { LoginPage } from '../src/pages/login.page';
import { testUser1 } from '../src/test-data/user.data';
import { AddArticleView } from '../src/views/add-article.view';
import { expect, test } from '@playwright/test';

test.describe('Verify articles', () => {
  let loginPage: LoginPage;
  let articlesPage: ArticlesPage;
  let addArticleView: AddArticleView;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    articlesPage = new ArticlesPage(page);
    addArticleView = new AddArticleView(page);

    await loginPage.goTo();
    await loginPage.login(testUser1);
    await articlesPage.goTo();
    await articlesPage.addArticleButtonLogged.click();

    await expect.soft(addArticleView.header).toBeVisible();
  });

  test('create new article @GAD-R04-01', async ({ page }) => {
    // Arrange
    const articlePage = new ArticlePage(page);
    const articleData = randomNewArticle();

    // Act
    await addArticleView.createArticle(articleData);

    //Assert
    await expect.soft(articlePage.articleTitle).toHaveText(articleData.title);
    await expect
      .soft(articlePage.articleBody)
      .toHaveText(articleData.body, { useInnerText: true });
  });

  test('reject creating article without title', async () => {
    // Arrange
    const expectedErrorMessage = 'Article was not created';
    const articleData = randomNewArticle();
    articleData.title = '';

    // Act
    await addArticleView.createArticle(articleData);

    //Assert
    await expect(addArticleView.alertPopup).toHaveText(expectedErrorMessage);
  });

  test('reject creating article without body', async () => {
    // Arrange
    const expectedErrorMessage = 'Article was not created';
    const articleData = randomNewArticle();
    articleData.body = '';

    // Act
    await addArticleView.createArticle(articleData);

    //Assert
    await expect(addArticleView.alertPopup).toHaveText(expectedErrorMessage);
  });

  test.describe('Title length', () => {
    test('reject creating article with title exceeding 128 signs @GAD-R04-02', async () => {
      // Arrange
      const expectedErrorMessage = 'Article was not created';
      const articleData = randomNewArticle(129);

      // Act
      await addArticleView.createArticle(articleData);

      //Assert
      await expect(addArticleView.alertPopup).toHaveText(expectedErrorMessage);
    });

    test('create article with title with 128 signs @GAD-R04-02', async ({
      page,
    }) => {
      // Arrange
      const articlePage = new ArticlePage(page);
      const articleData = randomNewArticle(128);

      // Act
      await addArticleView.createArticle(articleData);

      //Assert
      await expect.soft(articlePage.articleTitle).toHaveText(articleData.title);
    });
  });
});
