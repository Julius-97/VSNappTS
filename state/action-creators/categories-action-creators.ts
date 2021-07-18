import axios from 'axios';
import { Dispatch } from 'redux';
import { API_LOCATION, API_PORT } from '@env';

import { categoriesActionType as ActionType } from '../action-types';
import { categoriesAction as Action } from '../actions';
import { Category } from '../../models/category';

interface categoryResponse {
  categories: {
    _id: string;
    name: string;
  }[];
}

export const retrieveCategories = () => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.RETRIEVE_CATEGORIES,
    });

    let categories: Category[] = [];
    try {
      const res = await axios.get(
        `http://${API_LOCATION}:${API_PORT}/articles/Categories`
      );

      const data: categoryResponse = res.data;

      const categoriesData = data.categories;

      categories = categoriesData.map((cat) => new Category(cat._id, cat.name));

      dispatch({
        type: ActionType.RETRIEVE_CATEGORIES_SUCCESS,
        payload: categories,
      });
    } catch (err) {
      dispatch({
        type: ActionType.RETRIEVE_CATEGORIES_ERROR,
        payload: `${err.message}: trying ${API_LOCATION}:${API_PORT}/articles/Categories`,
      });
    }
  };
};
