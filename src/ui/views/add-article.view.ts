import { AddArticleModel } from '@models/article.model';
import { ArticlePage } from '@pages/article.page';
import { Page } from '@playwright/test';

export class AddArticleView {
  addNewHeader = this.page.getByRole('heading', { name: 'Add New Entry' });
  titleInput = this.page.getByTestId('title-input');
  titleBody = this.page.getByTestId('body-text');
  saveButton = this.page.getByTestId('save');
  alertPopup = this.page.getByTestId('alert-popup');

  constructor(private page: Page) {}

  async createArticle(addArticle: AddArticleModel): Promise<ArticlePage> {
    await this.titleInput.fill(addArticle.title);
    await this.titleBody.fill(addArticle.body);
    await this.saveButton.click();
    return new ArticlePage(this.page);
  }
}
