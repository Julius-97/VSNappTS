import { categoriesActionType as ActionType } from '../action-types';
import { categoriesAction as Action } from '../actions';
import { Category } from '../../models/category';

interface categoriesState {
  categories: Category[];
  isLoading: boolean;
  error: string | null;
}

const initialState: categoriesState = {
  categories: [],
  isLoading: false,
  error: null,
};

const reducer = (
  state: categoriesState = initialState,
  action: Action
): categoriesState => {
  switch (action.type) {
    case ActionType.RETRIEVE_CATEGORIES:
      return { ...state, categories: [], isLoading: true, error: null };
    case ActionType.RETRIEVE_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: action.payload,
        isLoading: false,
        error: null,
      };
    case ActionType.RETRIEVE_CATEGORIES_ERROR:
      return {
        ...state,
        categories: [],
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
