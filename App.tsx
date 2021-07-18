import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import * as Notification from 'expo-notifications';
import * as Linking from 'expo-linking';

import { store } from './state';
import { AppMainNavigator } from './navigation/MainNavigator';

export default function App() {
  useEffect(() => {
    const subscription = Notification.addNotificationResponseReceivedListener(
      (notification) => {
        const link = notification.notification.request.content.data.link! as string;
        Linking.openURL(link);
      }
    );
    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppMainNavigator />
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({});
