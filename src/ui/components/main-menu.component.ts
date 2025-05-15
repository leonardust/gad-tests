import { ArticlesPage } from '@pages/articles.page';
import { CommentPage } from '@pages/comment.page';
import { HomePage } from '@pages/home.page';
import { Locator, Page } from '@playwright/test';

export class MainMenuComponent {
  private readonly commentsButton: Locator;
  private readonly articlesButton: Locator;
  private readonly homePageLink: Locator;

  constructor(private page: Page) {
    this.commentsButton = this.page.getByTestId('open-comments');
    this.articlesButton = this.page.getByTestId('open-articles');
    this.homePageLink = this.page.getByRole('link', {
      name: '🦎 GAD',
    });
  }

  async clicksCommentButton(): Promise<CommentPage> {
    await this.commentsButton.click();
    return new CommentPage(this.page);
  }

  async clicksArticlesButton(): Promise<ArticlesPage> {
    await this.articlesButton.click();
    return new ArticlesPage(this.page);
  }

  async clicksHomePageLink(): Promise<HomePage> {
    await this.homePageLink.click();
    return new HomePage(this.page);
  }
}
