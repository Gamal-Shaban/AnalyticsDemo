/**
 * @format
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import {Mixpanel} from 'mixpanel-react-native';

// Set up an instance of Mixpanel
const trackAutomaticEvents = false;
const useNative = false;
export const mixpanel = new Mixpanel(
  'e0c0bc26eda2700c184c9d6de0cc8c19',
  trackAutomaticEvents,
  useNative,
  AsyncStorage,
);
mixpanel.init();

AppRegistry.registerComponent(appName, () => App);
