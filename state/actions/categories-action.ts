import { categoriesActionType as ActionType } from '../action-types';
import { Category } from '../../models/category';

export interface retrieveCategoriesAction {
  type: ActionType.RETRIEVE_CATEGORIES;
}
export interface retrieveCategoriesSuccessAction {
  type: ActionType.RETRIEVE_CATEGORIES_SUCCESS;
  payload: Category[];
}
export interface retrieveCategoriesErrorAction {
  type: ActionType.RETRIEVE_CATEGORIES_ERROR;
  payload: string;
}
