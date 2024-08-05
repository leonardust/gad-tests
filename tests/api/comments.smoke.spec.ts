import { expect, test } from '@_src/fixtures/merge.fixture';

test.describe('Verify comments API endpoint @GAD-R08-02 @smoke', () => {
  test.describe('verify each condition in separate test', () => {
    test('GET comments returns status code 200', async ({ request }) => {
      const expectedResponseCode = 200;
      const commentsUrl = '/api/comments';

      // Act
      const response = await request.get(commentsUrl);

      // Assert
      expect(response.status()).toBe(expectedResponseCode);
    });

    test('GET comments should return at least one comment @predefined_data', async ({
      request,
    }) => {
      // Arrange
      const expectedMinCommentsCount = 1;
      const commentsUrl = '/api/comments';

      // Act
      const response = await request.get(commentsUrl);
      const responseJson = await response.json();

      // Assert
      expect(responseJson.length).toBeGreaterThanOrEqual(
        expectedMinCommentsCount,
      );
    });

    test('GET comments return comment object @predefined_data', async ({
      request,
    }) => {
      // Arrange
      const expectedRequiredFields = [
        'article_id',
        'body',
        'date',
        'id',
        'user_id',
      ];

      const commentsUrl = '/api/comments';

      // Act
      const response = await request.get(commentsUrl);
      const responseJson = await response.json();
      const comment = responseJson[0];

      // Assert
      expectedRequiredFields.forEach((key) => {
        expect
          .soft(
            comment,
            `Expected key "${key}" should be found in comment object`,
          )
          .toHaveProperty(key);
      });
    });
  });

  test('GET comments should return an object with required fields @predefined_data', async ({
    request,
  }) => {
    // Arrange
    const commentsUrl = '/api/comments';
    const response = await request.get(commentsUrl);

    await test.step('GET comments return status code 200', async () => {
      const expectedResponseCode = 200;
      expect(response.status()).toBe(expectedResponseCode);
    });

    const responseJson = await response.json();
    await test.step('GET comments should return at least one comment', async () => {
      const expectedMinCommentsCount = 1;
      expect(responseJson.length).toBeGreaterThanOrEqual(
        expectedMinCommentsCount,
      );
    });

    const expectedRequiredFields = [
      'article_id',
      'body',
      'date',
      'id',
      'user_id',
    ];

    const comment = responseJson[0];
    expectedRequiredFields.forEach(async (key) => {
      await test.step(`response object contains required field: ${key}`, async () => {
        expect
          .soft(
            comment,
            `Expected key "${key}" should be found in comment object`,
          )
          .toHaveProperty(key);
      });
    });
  });
});
