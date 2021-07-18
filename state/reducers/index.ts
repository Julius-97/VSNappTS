import { combineReducers } from 'redux';

import articlesReducer from './articles-reducer';
import categoriesReducer from './categories-reducer';

const reducers = combineReducers({
  articles: articlesReducer,
  categories: categoriesReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
