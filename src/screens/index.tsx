/* eslint-disable curly */
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
  if (componentName === 'app.Loading') Navigation.registerComponent('app.Loading', () => sceneCreator(require('./Loading').default));
  if (componentName === 'app.Home') Navigation.registerComponent('app.Home', () => sceneCreator(require('./Home').default));

  if (componentName === 'app.SignIn') Navigation.registerComponent('app.SignIn', () => sceneCreator(require('./SignIn').default));
  if (componentName === 'app.Register') Navigation.registerComponent('app.Register', () => sceneCreator(require('./Register').default));

  if (componentName === 'app.Onboarding') Navigation.registerComponent('app.Onboarding', () => sceneCreator(require('./Onboarding').default));

  if (componentName === 'app.Emergency') Navigation.registerComponent('app.Emergency', () => sceneCreator(require('./Emergency').default));

  if (componentName === 'app.PersonalInformation')
    Navigation.registerComponent('app.PersonalInformation', () => sceneCreator(require('./PersonalInformation').default));

  if (componentName === 'app.DeviceSettings')
    Navigation.registerComponent('app.DeviceSettings', () => sceneCreator(require('./DeviceSettings').default));
});

export const Auth = {
  root: {
    stack: {
      children: [
        { component: { name: 'app.SignIn', id: 'app.SignIn' } },
        { component: { name: 'app.Register', id: 'app.Register' } },
        { component: { name: 'app.Onboarding', id: 'app.Onboarding' } },
      ],
    },
  },
};

export const Home = {
  root: {
    stack: {
      children: [
        { component: { name: 'app.PersonalInformation', id: 'app.PersonalInformation' } },
        { component: { name: 'app.DeviceSettings', id: 'app.DeviceSettings' } },
        { component: { name: 'app.Emergency', id: 'app.Emergency' } },
        { component: { name: 'app.Home', id: 'app.Home' } },
      ],
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
