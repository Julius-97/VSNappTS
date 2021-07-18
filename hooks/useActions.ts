import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  retrieveCategoryArticles,
  retrieveLatestArticles,
  retrieveCategories,
} from '../state';

export const useActions = () => {
  const dispatch = useDispatch();

  const actions = {
    retrieveCategoryArticles,
    retrieveLatestArticles,
    retrieveCategories,
  };

  return bindActionCreators(actions, dispatch);
};
