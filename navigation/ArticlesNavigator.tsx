import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import { defaultNavOptions } from './defNavOptions';
import ArticlesListScreen from '../screens/ArticlesListScreen';
import ArticleDetailScreen from '../screens/ArticleDetailScreen';
import CustomHeaderButton from '../components/HeaderButton';
import { ArticlesStackParamList, ArticlesListScreenProps } from './types';

const ArticlesStackNavigator = createStackNavigator<ArticlesStackParamList>();

export const ArticlesNavigator = () => {
  return (
    <ArticlesStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <ArticlesStackNavigator.Screen
        name="ArticlesList"
        component={ArticlesListScreen}
        options={({ navigation }: ArticlesListScreenProps) => ({
          title: 'Lista Articoli',
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
      <ArticlesStackNavigator.Screen
        name="ArticleDetail"
        component={ArticleDetailScreen}
        options={{ title: 'Dettagli Articolo' }}
      />
    </ArticlesStackNavigator.Navigator>
  );
};
