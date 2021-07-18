import { Platform } from 'react-native';

import Colors from '../constants/Colors';

export const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
  },
  headerTitleStyle: {
    color: Colors.accent,
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.accent,
};
