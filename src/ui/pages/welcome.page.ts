import { BasePage } from '@pages/base.page';
import { Page } from '@playwright/test';

export class WelcomePage extends BasePage {
  url = '/welcome';

  constructor(page: Page) {
    super(page);
  }
}
