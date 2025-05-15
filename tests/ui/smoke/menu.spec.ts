import { expect, test } from '@fixtures/merge.fixture';

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
    commentsPage,
  }) => {
    // Arrange
    const expectedArticlesTitle = 'Articles';

    // Act
    const articlesPage = await commentsPage.mainMenu.clicksArticlesButton();
    const title = await articlesPage.getTitle();

    // Assert
    expect(title).toContain(expectedArticlesTitle);
  });

  test('home button navigates to home page @GAD-R01-03', async ({
    articlesPage,
  }) => {
    // Arrange
    const expectedHomePageTitle = 'GAD';

    // Act
    const homePage = await articlesPage.mainMenu.clicksHomePageLink();
    const title = await homePage.getTitle();

    // Assert
    expect(title).toContain(expectedHomePageTitle);
  });
});
