import React from 'react';
import { View } from 'react-native';
import { Navigation } from 'react-native-navigation';

declare function require(name: string): { default: any };

function sceneCreator(sceneComp: any): any {
  class SceneWrapper extends React.Component {
    static options(passProps: any) {
      return sceneComp.options ? sceneComp.options(passProps) : {};
    }

    render() {
      return <View style={{ flex: 1 }}>{React.createElement(sceneComp, this.props)}</View>;
    }
  }

  return SceneWrapper;
}

// REGISTER SCREENS
export function registerLoadingScreen() {
  Navigation.registerComponent('app.Loading', () => require('./Loading').default);
}

Navigation.setLazyComponentRegistrator((componentName) => {
  if (componentName === 'app.Loading') {
    Navigation.registerComponent('app.Loading', () => sceneCreator(require('./Loading').default));
  }
  if (componentName === 'app.Auth') {
    Navigation.registerComponent('app.Auth', () => sceneCreator(require('./Auth').default));
  }
});

export const Home = {
  root: {
    stack: {
      children: [{ component: { name: 'app.Auth', id: 'app.Auth' } }],
    },
  },
};

export const NavigationDefaultOptions = {
  statusBar: { backgroundColor: '#222' },
  layout: { orientation: ['portrait'] },
  topBar: {
    visible: false,
    drawBehind: true,
  },
  bottomTabs: {
    visible: false,
    drawBehind: true,
    animate: true,
    titleDisplayMode: 'alwaysHide',
    hideShadow: true,
  },
  sideMenu: {
    right: { visible: false, enabled: false },
    openGestureMode: 'bezel',
  },
};