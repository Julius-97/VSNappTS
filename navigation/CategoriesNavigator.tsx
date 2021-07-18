import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import { defaultNavOptions } from './defNavOptions';
import CategoriesScreen from '../screens/CategoriesScreen';
import ArticleDetailScreen from '../screens/ArticleDetailScreen';
import CustomHeaderButton from '../components/HeaderButton';
import {
  CategoriesStackParamList,
  CategoriesListScreenProps,
  ArticlesListScreenProps,
} from './types';
import ArticlesListScreen from '../screens/ArticlesListScreen';

const CategoriesStackNavigator = createStackNavigator<CategoriesStackParamList>();

export const CategoriesNavigator = () => {
  return (
    <CategoriesStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <CategoriesStackNavigator.Screen
        name="CategoriesList"
        component={CategoriesScreen}
        options={({ navigation }: CategoriesListScreenProps) => ({
          title: 'Categorie',
          headerLeft: (_) => {
            return (
              <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                  title="Menu"
                  iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                  onPress={() => {
                    navigation.toggleDrawer();
                  }}
                />
              </HeaderButtons>
            );
          },
        })}
      />
      <CategoriesStackNavigator.Screen
        name="ArticlesList"
        component={ArticlesListScreen}
        options={({ route }: ArticlesListScreenProps) => ({
          title: route.params.catName,
        })}
      />
      <CategoriesStackNavigator.Screen
        name="ArticleDetail"
        component={ArticleDetailScreen}
        options={{title:'Dettagli Articolo'}}
      />
    </CategoriesStackNavigator.Navigator>
  );
};
