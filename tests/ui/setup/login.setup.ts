import { expect, test as setup } from '@fixtures/merge.fixture';
import { STORAGE_STATE } from '@pw-config';
import { testUser1 } from '@test-data/user.data';

setup('login and save session', async ({ loginPage, page }) => {
  // Arrange
  const expectedWelcomeTitle = 'Welcome';

  // Act
  const welcomePage = await loginPage.login(testUser1);
  const title = await welcomePage.getTitle();

  //Assert
  expect(title).toContain(expectedWelcomeTitle);
  await page.context().storageState({ path: STORAGE_STATE });
});
