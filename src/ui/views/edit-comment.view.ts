import { AddCommentModel } from '@models/comment.model';
import { CommentPage } from '@pages/comment.page';
import { Page } from '@playwright/test';

export class EditCommentView {
  bodyInput = this.page.getByTestId('body-input');
  updateButton = this.page.getByTestId('update-button');

  constructor(private page: Page) {}

  async updateComment(commentData: AddCommentModel): Promise<CommentPage> {
    await this.bodyInput.fill(commentData.body);
    await this.updateButton.click();
    return new CommentPage(this.page);
  }
}
