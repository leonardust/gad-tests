import { MainMenuComponent } from '@components/main-menu.component';
import { ArticlesPage } from '@pages/articles.page';
import { BasePage } from '@pages/base.page';
import { CommentPage } from '@pages/comment.page';
import { Locator, Page } from '@playwright/test';
import { AddCommentView } from '@views/add-comment.view';

interface ArticleComment {
  body: Locator;
  link: Locator;
}

export class ArticlePage extends BasePage {
  url = '/article.html';
  mainMenu = new MainMenuComponent(this.page);
  articleTitle = this.page.getByTestId('article-title');
  articleBody = this.page.getByTestId('article-body');
  deleteIcon = this.page.getByTestId('delete');
  addCommentButton = this.page.locator('#add-new');
  alertPopup = this.page.getByTestId('alert-popup');

  constructor(page: Page) {
    super(page);
  }

  async deleteArticle(): Promise<ArticlesPage> {
    this.page.on('dialog', async (dialog) => {
      await dialog.accept();
    });
    await this.deleteIcon.click();
    return new ArticlesPage(this.page);
  }

  getArticleComment(body: string): ArticleComment {
    const commentContainer = this.page
      .locator('.comment-container')
      .filter({ hasText: body });

    return {
      body: commentContainer.locator(':text("comment:") + span'),
      link: commentContainer.locator("[id^='gotoComment']"),
    };
  }

  async clickCommentLink(
    commentContainer: ArticleComment,
  ): Promise<CommentPage> {
    await commentContainer.link.click();
    return new CommentPage(this.page);
  }

  async clickAddCommentButton(): Promise<AddCommentView> {
    await this.addCommentButton.click();
    return new AddCommentView(this.page);
  }
}
export { BasePage };
