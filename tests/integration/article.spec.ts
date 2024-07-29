import { ArticlePage } from '@_src/pages/article.page';
import { expect, test } from '@playwright/test';

test.describe('Verify article', () => {
  test('Non logged user can access created article @GAD-R06-0 @predefined_data', async ({
    page,
  }) => {
    // Arrange
    const expectedArticleTitle =
      'Cultivating a Growth Mindset in the IT Workplace';
    const articlePage = new ArticlePage(page);

    // Act
    await articlePage.goTo('?id=1');

    //Assert
    await expect(articlePage.articleTitle).toHaveText(expectedArticleTitle);
  });
});
