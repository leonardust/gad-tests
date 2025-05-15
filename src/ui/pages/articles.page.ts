import { MainMenuComponent } from '@components/main-menu.component';
import { ArticlePage } from '@pages/article.page';
import { BasePage } from '@pages/base.page';
import { Page } from '@playwright/test';
import { AddArticleView } from '@views/add-article.view';

export class ArticlesPage extends BasePage {
  url = '/articles.html';
  mainMenu = new MainMenuComponent(this.page);
  addArticleButtonLogged = this.page.locator('#add-new');
  searchInput = this.page.getByTestId('search-input');
  goSearchButton = this.page.getByTestId('search-button');
  noResultText = this.page.getByTestId('no-results');

  constructor(page: Page) {
    super(page);
  }

  async goToArticle(title: string): Promise<ArticlePage> {
    await this.page.getByText(title).click();
    return new ArticlePage(this.page);
  }

  async searchArticle(phrase: string): Promise<ArticlesPage> {
    await this.searchInput.fill(phrase);
    await this.goSearchButton.click();
    return this;
  }

  async clickAddArticleButtonLogged(): Promise<AddArticleView> {
    await this.addArticleButtonLogged.click();
    return new AddArticleView(this.page);
  }
}
