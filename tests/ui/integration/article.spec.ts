import { expect, test } from '@fixtures/merge.fixture';

test.describe('Verify article', () => {
  test('Non logged user can access created article @GAD-R06-0 @predefined_data', async ({
    articlePage,
  }) => {
    // Arrange
    const expectedArticleTitle = 'How to write effective test cases';

    // Act
    await articlePage.goTo('?id=1');

    //Assert
    await expect(articlePage.articleTitle).toHaveText(expectedArticleTitle);
  });
});
