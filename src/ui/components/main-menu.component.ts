import logger from '@_logger/index';
import { ArticlesPage } from '@_src/ui/pages/articles.page';
import { CommentPage } from '@_src/ui/pages/comment.page';
import { HomePage } from '@_src/ui/pages/home.page';
import { Page } from '@playwright/test';

export class MainMenuComponent {
  commentsButton = this.page.getByTestId('open-comments');
  articlesButton = this.page.getByTestId('open-articles');
  homePageLink = this.page.getByRole('link', { name: '🦎 GAD' });

  constructor(private page: Page) {}

  async clicksCommentButton(): Promise<CommentPage> {
    await this.commentsButton.click();
    logger.meth('Clicks comments button by: {el}', { el: this.commentsButton });
    return new CommentPage(this.page);
  }

  async clicksArticlesButton(): Promise<ArticlesPage> {
    await this.articlesButton.click();
    logger.meth('Clicks articles button by: {el}', { el: this.articlesButton });
    return new ArticlesPage(this.page);
  }

  async clicksHomePageLink(): Promise<HomePage> {
    await this.homePageLink.click();
    logger.meth('Clicks home page link by: {el}', { el: this.homePageLink });
    return new HomePage(this.page);
  }
}
