import { ArticlesPage } from '@_src/pages/articles.page';
import { CommentsPage } from '@_src/pages/comments.page';
import { test as baseTest, expect } from '@playwright/test';

const test = baseTest.extend<{ articlesPage: ArticlesPage }>({
  articlesPage: async ({ page }, use) => {
    const articlesPage = new ArticlesPage(page);
    await articlesPage.goTo();
    await use(new ArticlesPage(page));
  },
});

test.describe('Verify main buttons', () => {
  test('comments button navigates to comments page @GAD-R01-03', async ({
    articlesPage,
  }) => {
    // Arrange
    const expectedCommentsTitle = 'Comments';

    // Act
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

    // Act
    await commentsPage.goTo();
    const articlesPage = await commentsPage.mainMenu.clicksArticlesButton();
    const title = await articlesPage.getTitle();

    // Assert
    expect(title).toContain(expectedArticlesTitle);
  });

  test('home button navigates to home page @GAD-R01-03', async ({ page }) => {
    // Arrange
    const expectedHomePageTitle = 'GAD';
    const articlesPage = new ArticlesPage(page);

    // Act
    await articlesPage.goTo();
    const homePage = await articlesPage.mainMenu.clicksHomePageLink();

    const title = await homePage.getTitle();

    // Assert
    expect(title).toContain(expectedHomePageTitle);
  });
});
