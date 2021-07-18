import axios from 'axios';
import { Dispatch } from 'redux';
import { API_LOCATION, API_PORT } from '@env';

import { articlesActionType as ActionType } from '../action-types';
import { articlesAction as Action } from '../actions';
import { Article } from '../../models/article';

interface recentArticlesResponse {
  articles: {
    _id: string;
    categories: {
      _id: string;
      name: string;
    }[];
    date: string;
    imageURL: string;
    link: string;
    title: string;
  }[];
}

interface categoryArticlesResponse {
  articles: {
    _id: string;
    date: string;
    imageURL: string;
    link: string;
    title: string;
  }[];
}

export const retrieveLatestArticles = () => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.RETRIEVE_LATEST_ARTICLES,
    });

    let articles: Article[] = [];
    try {
      const res = await axios.get(
        `http://${API_LOCATION}:${API_PORT}/articles`
      );
      const data: recentArticlesResponse = res.data;
      const articlesData = data.articles;

      articles = articlesData.map(
        (artD) =>
          new Article(
            artD._id,
            artD.title,
            artD.categories.map((c) => c.name),
            new Date(artD.date),
            artD.link,
            artD.imageURL
          )
      );

      dispatch({
        type: ActionType.RETRIEVE_LATEST_ARTICLES_SUCCESS,
        payload: articles,
        lastUpdateTime: new Date(),
      });
    } catch (err) {
      dispatch({
        type: ActionType.RETRIEVE_LATEST_ARTICLES_ERROR,
        payload: `${err.message}: trying ${API_LOCATION}:${API_PORT}`,
      });
    }
  };
};

export const retrieveCategoryArticles = (catName: string) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.RETRIEVE_CATEGORY_ARTICLES,
    });

    let articles: Article[] = [];
    try {
      const res = await axios.get(
        `http://${API_LOCATION}:${API_PORT}/articles/${catName}`
      );

      const data: categoryArticlesResponse = res.data;
      const articlesData = data.articles;

      articles = articlesData.map(
        (artD) =>
          new Article(
            artD._id,
            artD.title,
            [catName],
            new Date(artD.date),
            artD.link,
            artD.imageURL
          )
      );

      dispatch({
        type: ActionType.RETRIEVE_CATEGORY_ARTICLES_SUCCESS,
        payload: articles,
        lastUpdateTime: new Date(),
      });
    } catch (err) {
      dispatch({
        type: ActionType.RETRIEVE_CATEGORY_ARTICLES_ERROR,
        payload: err.message,
      });
    }
  };
};
