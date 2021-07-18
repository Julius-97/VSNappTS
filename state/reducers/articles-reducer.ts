import { articlesActionType as ActionType } from '../action-types';
import { articlesAction as Action } from '../actions';
import { Article } from '../../models/article';

interface articlesState {
  latestArticles: Article[];
  categoryArticles: Article[];
  isLoading: boolean;
  error: string | null;
  lastUpdateTime: Date;
}

const initialState: articlesState = {
  latestArticles: [],
  categoryArticles: [],
  isLoading: false,
  error: null,
  lastUpdateTime: new Date(),
};

const reducer = (
  state: articlesState = initialState,
  action: Action
): articlesState => {
  switch (action.type) {
    case ActionType.RETRIEVE_LATEST_ARTICLES:
      return { ...state, latestArticles: [], isLoading: true, error: null };
    case ActionType.RETRIEVE_LATEST_ARTICLES_SUCCESS:
      return {
        ...state,
        latestArticles: action.payload,
        isLoading: false,
        error: null,
        lastUpdateTime: action.lastUpdateTime,
      };
    case ActionType.RETRIEVE_LATEST_ARTICLES_ERROR:
      return {
        ...state,
        latestArticles: [],
        isLoading: false,
        error: action.payload,
      };
    case ActionType.RETRIEVE_CATEGORY_ARTICLES:
      return { ...state, categoryArticles: [], isLoading: true, error: null };
    case ActionType.RETRIEVE_CATEGORY_ARTICLES_SUCCESS:
      return {
        ...state,
        categoryArticles: action.payload,
        isLoading: false,
        error: null,
      };
    case ActionType.RETRIEVE_CATEGORY_ARTICLES_ERROR:
      return {
        ...state,
        categoryArticles: [],
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
