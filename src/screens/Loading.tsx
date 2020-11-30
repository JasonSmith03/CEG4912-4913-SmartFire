import React, { PureComponent } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Navigation } from 'react-native-navigation';
import auth from '@react-native-firebase/auth';

import { Auth, Home } from '.';
import { icons } from '../ui';
import { ms } from 'react-native-size-matters';

class Loading extends PureComponent {
  componentDidMount() {
    this._run();
  }

  _run = async () => {
    try {
      if (auth().currentUser) {
        setTimeout(() => Navigation.setRoot(Home), 1000);
      } else {
        setTimeout(() => Navigation.setRoot(Auth), 1000);
      }
    } catch (e) {
      // We're not signed in use guest credentials
    }
  };

  render() {
    return (
      <View style={s.container}>
        <Image source={{ uri: icons.logo }} style={s.logo} />
      </View>
    );
  }
}

const s = StyleSheet.create({
  logo: { resizeMode: 'contain', width: ms(125), height: ms(125) },
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Loading;
