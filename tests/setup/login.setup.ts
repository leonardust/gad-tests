import { LoginPage } from '../../src/pages/login.page';
import { WelcomePage } from '../../src/pages/welcome.page';
import { testUser1 } from '../../src/test-data/user.data';
import { expect, test as setup } from '@playwright/test';

setup('login with correct credentials @GAD-R02-01', async ({ page }) => {
  // Arrange
  const expectedWelcomeTitle = 'Welcome';
  const loginPage = new LoginPage(page);
  const welcomePage = new WelcomePage(page);

  // Act
  await loginPage.goTo();
  await loginPage.login(testUser1);

  const title = await welcomePage.getTitle();

  //Assert
  // eslint-disable-next-line playwright/no-standalone-expect
  expect(title).toContain(expectedWelcomeTitle);
});
