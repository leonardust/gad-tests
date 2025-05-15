import { ArticlePage } from '@pages/article.page';
import { ArticlesPage } from '@pages/articles.page';
import { CommentsPage } from '@pages/comments.page';
import { HomePage } from '@pages/home.page';
import { LoginPage } from '@pages/login.page';
import { RegisterPage } from '@pages/register.page';
import { test as baseTest } from '@playwright/test';
import { AddArticleView } from '@views/add-article.view';

interface Pages {
  articlePage: ArticlePage;
  articlesPage: ArticlesPage;
  addArticleView: AddArticleView;
  commentsPage: CommentsPage;
  homePage: HomePage;
  loginPage: LoginPage;
  registerPage: RegisterPage;
}

export const pageObjectTest = baseTest.extend<Pages>({
  addArticleView: async ({ articlesPage }, use) => {
    const addArticleView = await articlesPage.clickAddArticleButtonLogged();
    await use(addArticleView);
  },
  articlePage: async ({ page }, use) => {
    const articlePage = new ArticlePage(page);
    await articlePage.goTo();
    await use(new ArticlePage(page));
  },
  articlesPage: async ({ page }, use) => {
    const articlesPage = new ArticlesPage(page);
    await articlesPage.goTo();
    await use(new ArticlesPage(page));
  },
  commentsPage: async ({ page }, use) => {
    const commentsPage = new CommentsPage(page);
    await commentsPage.goTo();
    await use(new CommentsPage(page));
  },
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await homePage.goTo();
    await use(new HomePage(page));
  },
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goTo();
    await use(new LoginPage(page));
  },
  registerPage: async ({ page }, use) => {
    const registerPage = new RegisterPage(page);
    await registerPage.goTo();
    await use(new RegisterPage(page));
  },
});
