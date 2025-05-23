import { ArticlePage } from '@_src/ui/pages/article.page';
import { prepareRandomNewArticle } from '@factories/article.factory';
import { pageObjectTest } from '@fixtures/page-object.fixture';
import { AddArticleModel } from '@models/article.model';

interface ArticleCreationContext {
  articlePage: ArticlePage;
  articleData: AddArticleModel;
}
interface ArticleFixtures {
  createRandomArticle: ArticleCreationContext;
  randomArticle: (
    articleData?: AddArticleModel,
  ) => Promise<ArticleCreationContext>;
}

export const articleTest = pageObjectTest.extend<ArticleFixtures>({
  createRandomArticle: async ({ addArticleView }, use) => {
    const articleData = prepareRandomNewArticle();
    const articlePage = await addArticleView.createArticle(articleData);
    await use({ articlePage, articleData });
  },
  randomArticle: async ({ addArticleView }, use) => {
    const create = async (
      articleData?: AddArticleModel,
    ): Promise<ArticleCreationContext> => {
      const finalArticleData = articleData ?? prepareRandomNewArticle();
      const articlePage = await addArticleView.createArticle(finalArticleData);
      return { articlePage, articleData: finalArticleData };
    };
    await use(create);
  },
});
