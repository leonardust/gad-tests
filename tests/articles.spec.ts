import { randomNewArticle } from '../src/factories/article.factory';
import { ArticlePage } from '../src/pages/article.page';
import { ArticlesPage } from '../src/pages/articles.page';
import { LoginPage } from '../src/pages/login.page';
import { testUser1 } from '../src/test-data/user.data';
import { AddArticleView } from '../src/views/add-article.view';
import { expect, test } from '@playwright/test';

test.describe('Verify articles', () => {
  const emptyString = '';
  const expectedErrorMessage = 'Article was not created';

  test('create new article @GAD-R04-01', async ({ page }) => {
    // Arrange
    const loginPage = new LoginPage(page);
    await loginPage.goTo();
    await loginPage.login(testUser1);

    const articlesPage = new ArticlesPage(page);
    await articlesPage.goTo();

    // Act
    await articlesPage.addArticleButtonLogged.click();

    const addArticleView = new AddArticleView(page);
    await expect.soft(addArticleView.header).toBeVisible();

    const articleData = randomNewArticle();
    await addArticleView.createArticle(articleData);

    //Assert
    const articlePage = new ArticlePage(page);
    await expect.soft(articlePage.articleTitle).toHaveText(articleData.title);
    await expect
      .soft(articlePage.articleBody)
      .toHaveText(articleData.body, { useInnerText: true });
  });

  test('reject creating article without title', async ({ page }) => {
    // Arrange
    const loginPage = new LoginPage(page);
    const articlesPage = new ArticlesPage(page);
    const addArticleView = new AddArticleView(page);

    const articleData = randomNewArticle();
    articleData.title = emptyString;

    await loginPage.goTo();
    await loginPage.login(testUser1);
    await articlesPage.goTo();

    // Act
    await articlesPage.addArticleButtonLogged.click();
    await addArticleView.createArticle(articleData);

    //Assert
    await expect(addArticleView.alertPopup).toHaveText(expectedErrorMessage);
  });

  test('reject creating article without body', async ({ page }) => {
    // Arrange
    const loginPage = new LoginPage(page);
    const articlesPage = new ArticlesPage(page);
    const addArticleView = new AddArticleView(page);

    const articleData = randomNewArticle();
    articleData.body = emptyString;

    await loginPage.goTo();
    await loginPage.login(testUser1);
    await articlesPage.goTo();

    // Act
    await articlesPage.addArticleButtonLogged.click();
    await addArticleView.createArticle(articleData);

    //Assert
    await expect(addArticleView.alertPopup).toHaveText(expectedErrorMessage);
  });
});
