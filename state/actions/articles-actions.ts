import { articlesActionType as ActionType } from '../action-types';
import { Article } from '../../models/article';

export interface retrieveLatestArticlesAction {
  type: ActionType.RETRIEVE_LATEST_ARTICLES;
}
export interface retrieveLatestArticlesSuccessAction {
  type: ActionType.RETRIEVE_LATEST_ARTICLES_SUCCESS;
  payload: Article[];
  lastUpdateTime: Date;
}
export interface retrieveLatestArticlesErrorAction {
  type: ActionType.RETRIEVE_LATEST_ARTICLES_ERROR;
  payload: string;
}
export interface retrieveCategoryArticlesAction {
  type: ActionType.RETRIEVE_CATEGORY_ARTICLES;
}
export interface retrieveCategoryArticlesSuccessAction {
  type: ActionType.RETRIEVE_CATEGORY_ARTICLES_SUCCESS;
  payload: Article[];
  lastUpdateTime: Date;
}
export interface retrieveCategoryArticlesErrorAction {
  type: ActionType.RETRIEVE_CATEGORY_ARTICLES_ERROR;
  payload: string;
}