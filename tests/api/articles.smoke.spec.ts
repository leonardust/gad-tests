import { expect, test } from '@_src/fixtures/merge.fixture';
import { apiLinks } from '@_src/utils/api.util';

test.describe('Verify articles API endpoint @GAD-R08-01 @smoke', () => {
  test.describe('Verify each condition in separate test', () => {
    test('GET articles return status code 200', async ({ request }) => {
      // Arrange
      const expectedResponseCode = 200;

      // Act
      const response = await request.get(apiLinks.articlesUrl);

      // Assert
      expect(response.status()).toBe(expectedResponseCode);
    });

    test('GET articles should return at least one article @predefined_data', async ({
      request,
    }) => {
      // Arrange
      const expectedMinArticlesCount = 1;

      // Act
      const response = await request.get(apiLinks.articlesUrl);
      const responseJson = await response.json();

      // Assert
      expect(responseJson.length).toBeGreaterThanOrEqual(
        expectedMinArticlesCount,
      );
    });

    test('GET articles should return article object @predefined_data', async ({
      request,
    }) => {
      // Arrange
      const expectedRequiredFields = [
        'id',
        'user_id',
        'title',
        'body',
        'date',
        'image',
      ];

      // Act
      const response = await request.get(apiLinks.articlesUrl);
      const responseJson = await response.json();
      const article = responseJson[0];

      // Assert
      expectedRequiredFields.forEach((key) => {
        expect.soft(article).toHaveProperty(key);
      });
    });
  });

  test('GET articles should return object with required fields @predefined_data', async ({
    request,
  }) => {
    // Arrange

    const response = await request.get(apiLinks.articlesUrl);

    await test.step('GET articles return status code 200', async () => {
      const expectedResponseCode = 200;
      expect(response.status()).toBe(expectedResponseCode);
    });

    const responseJson = await response.json();
    await test.step('GET articles should return at least one article', async () => {
      const expectedMinArticlesCount = 1;
      expect(responseJson.length).toBeGreaterThanOrEqual(
        expectedMinArticlesCount,
      );
    });

    const expectedRequiredFields = [
      'id',
      'user_id',
      'title',
      'body',
      'date',
      'image',
    ];

    const article = responseJson[0];
    expectedRequiredFields.forEach(async (key) => {
      await test.step(`response object contains required field: ${key}`, async () => {
        expect.soft(article).toHaveProperty(key);
      });
    });
  });
});
