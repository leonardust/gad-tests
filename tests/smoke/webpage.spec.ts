import { ArticlesPage } from '../../src/pages/articles.page';
import { CommentsPage } from '../../src/pages/comments.page';
import { HomePage } from '../../src/pages/home.page';
import { expect, test } from '@playwright/test';

test.describe('Verify service main page', () => {
  test('home page title @GAD-R01-01', async ({ page }) => {
    // Arrange
    const expectedHomePageTitle = 'GAD';
    const homePage = new HomePage(page);

    // Act
    await homePage.goTo();

    // Assert
    const title = await homePage.getTitle();
    expect(title).toContain(expectedHomePageTitle);
  });

  test('articles page title @GAD-R01-02', async ({ page }) => {
    // Arrange
    const expectedArticlesTitle = 'Articles';
    const articlesPage = new ArticlesPage(page);

    // Act
    await articlesPage.goTo();

    // Assert
    const title = await articlesPage.getTitle();
    expect(title).toContain(expectedArticlesTitle);
  });

  test('comments page title @GAD-R01-02', async ({ page }) => {
    // Arrange
    const expectedArticlesTitle = 'Comments';
    const commentsPage = new CommentsPage(page);

    // Act
    await commentsPage.goTo();

    // Assert
    const title = await commentsPage.getTitle();
    expect(title).toContain(expectedArticlesTitle);
  });

  test('home page title simple', async ({ page }) => {
    await page.goto('');
    await expect(page).toHaveTitle(/GAD/);
  });
});
