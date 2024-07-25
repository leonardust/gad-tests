import { CommentPage } from '@_src/pages/comment.page';
import { Page } from '@playwright/test';

export class MainMenuComponent {
  commentsButton = this.page.getByTestId('open-comments');
  articlesButton = this.page.getByTestId('open-articles');
  homePage = this.page.getByRole('link', { name: '🦎 GAD' });

  constructor(private page: Page) {}

  async clicksCommentButton(): Promise<CommentPage> {
    await this.commentsButton.click();
    return new CommentPage(this.page);
  }
}
