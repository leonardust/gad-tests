import { articleTest } from '@fixtures/article.fixture';
import { pageObjectTest } from '@fixtures/page-object.fixture';
import { mergeTests } from '@playwright/test';

export const test = mergeTests(pageObjectTest, articleTest);

export { expect } from '@playwright/test';
