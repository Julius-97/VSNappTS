import { DrawerNavigationProp } from '@react-navigation/drawer';
import { CompositeNavigationProp } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export type RootDrawerParamList = {
  ArticlesNavigator: undefined;
  CategoriesNavigator: undefined;
  FiltersNavigator: undefined;
};

export type ArticlesStackParamList = {
  ArticlesList: { catName: string | undefined };
  ArticleDetail: { artId: string };
};

type ArticlesListScreenRouteProp = RouteProp<
  ArticlesStackParamList,
  'ArticlesList'
>;

type ArticlesListScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<ArticlesStackParamList, 'ArticlesList'>,
  DrawerNavigationProp<ArticlesStackParamList, 'ArticlesList'>
>;

export type ArticlesListScreenProps = {
  route: ArticlesListScreenRouteProp;
  navigation: ArticlesListScreenNavigationProp;
};

export type CategoriesStackParamList = {
  CategoriesList: undefined;
  ArticlesList: { catName: string };
  ArticleDetail: { artId: string };
};

type CategoriesListScreenRouteProp = RouteProp<
  CategoriesStackParamList,
  'CategoriesList'
>;

type CategoriesListScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<CategoriesStackParamList, 'CategoriesList'>,
  DrawerNavigationProp<CategoriesStackParamList, 'CategoriesList'>
>;

export type CategoriesListScreenProps = {
  route: CategoriesListScreenRouteProp;
  navigation: CategoriesListScreenNavigationProp;
};

type ArticleDetailScreenRouteProp = RouteProp<
  ArticlesStackParamList,
  'ArticleDetail'
>;

type ArticleDetailScreenNavigationProp = StackNavigationProp<
  ArticlesStackParamList,
  'ArticleDetail'
>;

export type ArticleDetailsParamList = {
  route: ArticleDetailScreenRouteProp;
  navigation: ArticleDetailScreenNavigationProp;
};

export type FiltersStackParamList = {
  filters: undefined;
};

export type FiltersScreenProps = {
  navigation: DrawerNavigationProp<FiltersStackParamList, 'filters'>;
};
