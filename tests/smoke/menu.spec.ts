import { ArticlesPage } from '@_src/pages/articles.page';
import { CommentsPage } from '@_src/pages/comments.page';
import { HomePage } from '@_src/pages/home.page';
import { expect, test } from '@playwright/test';

test.describe('Verify main buttons', () => {
  test('comments button navigates to comments page @GAD-R01-03', async ({
    page,
  }) => {
    // Arrange
    const expectedCommentsTitle = 'Comments';
    const articlesPage = new ArticlesPage(page);

    // Act
    await articlesPage.goTo();
    const commentsPage = await articlesPage.mainMenu.clicksCommentButton();
    const title = await commentsPage.getTitle();

    // Assert
    expect(title).toContain(expectedCommentsTitle);
  });

  test('articles button navigates to articles page @GAD-R01-03', async ({
    page,
  }) => {
    // Arrange
    const expectedArticlesTitle = 'Articles';
    const commentsPage = new CommentsPage(page);
    const articlesPage = new ArticlesPage(page);

    // Act
    await commentsPage.goTo();
    await commentsPage.mainMenu.articlesButton.click();

    const title = await articlesPage.getTitle();

    // Assert
    expect(title).toContain(expectedArticlesTitle);
  });

  test('home button navigates to home page @GAD-R01-03', async ({ page }) => {
    // Arrange
    const expectedHomePageTitle = 'GAD';
    const articlesPage = new ArticlesPage(page);
    const homePage = new HomePage(page);

    // Act
    await articlesPage.goTo();
    await articlesPage.mainMenu.homePage.click();

    const title = await homePage.getTitle();

    // Assert
    expect(title).toContain(expectedHomePageTitle);
  });
});
