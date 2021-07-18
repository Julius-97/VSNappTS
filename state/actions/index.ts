import * as articlesActions from './articles-actions';
import * as categoriesActions from './categories-action';

export type articlesAction =
  | articlesActions.retrieveLatestArticlesAction
  | articlesActions.retrieveLatestArticlesSuccessAction
  | articlesActions.retrieveLatestArticlesErrorAction
  | articlesActions.retrieveCategoryArticlesAction
  | articlesActions.retrieveCategoryArticlesSuccessAction
  | articlesActions.retrieveCategoryArticlesErrorAction;

export type categoriesAction =
  | categoriesActions.retrieveCategoriesAction
  | categoriesActions.retrieveCategoriesSuccessAction
  | categoriesActions.retrieveCategoriesErrorAction;