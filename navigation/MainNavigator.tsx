import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { ArticlesNavigator } from './ArticlesNavigator';
import { CategoriesNavigator } from './CategoriesNavigator';
import { RootDrawerParamList } from './types';
import { FiltersNavigator } from './FiltersNavigator';

const AppDrawerNavigator = createDrawerNavigator<RootDrawerParamList>();

export const AppMainNavigator = () => {
  return (
    <SafeAreaProvider>
      <AppDrawerNavigator.Navigator>
        <AppDrawerNavigator.Screen
          name="ArticlesNavigator"
          component={ArticlesNavigator}
          options={{ title: 'Lista Articoli' }}
        />
        <AppDrawerNavigator.Screen
          name="CategoriesNavigator"
          component={CategoriesNavigator}
          options={{ title: 'Categorie' }}
        />
        <AppDrawerNavigator.Screen
          name="FiltersNavigator"
          component={FiltersNavigator}
          options={{ title: 'Notifiche' }}
        />
      </AppDrawerNavigator.Navigator>
    </SafeAreaProvider>
  );
};
