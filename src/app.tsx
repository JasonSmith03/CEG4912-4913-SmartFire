import { LogBox } from 'react-native';
import { Navigation } from 'react-native-navigation';

import { registerLoadingScreen, NavigationDefaultOptions } from './screens';
import store from './store';

if (__DEV__) {
  const Reactotron = require('reactotron-react-native').default;
  const networking = require('reactotron-react-native').networking;
  Reactotron.configure().use(networking()).connect({ host: '192.168.56.101:5555' });

  LogBox.ignoreLogs(['Setting a timer', 'Require cycle:']);
}

export function start() {
  registerLoadingScreen();

  Navigation.events().registerBottomTabSelectedListener((params) => {
    store.set('navigation', params);
  });

  Navigation.events().registerComponentDidAppearListener((params) => {
    store.set('navigation', params);
  });

  Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setDefaultOptions(NavigationDefaultOptions as any);
    Navigation.setRoot({ root: { component: { name: 'app.Loading' } } });
  });
}
