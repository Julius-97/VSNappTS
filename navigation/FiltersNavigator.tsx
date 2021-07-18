import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import { defaultNavOptions } from './defNavOptions';
import FiltersScreen from '../screens/FiltersScreen';
import CustomHeaderButton from '../components/HeaderButton';
import { FiltersStackParamList, FiltersScreenProps } from './types';

const FiltersStackNavigator = createStackNavigator<FiltersStackParamList>();

export const FiltersNavigator = () => {
  return (
    <FiltersStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <FiltersStackNavigator.Screen
        name="filters"
        component={FiltersScreen}
        options={({ navigation }: FiltersScreenProps) => ({
          title: 'Notifiche',
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
    </FiltersStackNavigator.Navigator>
  );
};
