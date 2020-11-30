import React, { PureComponent } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import { moderateScale as ms } from 'react-native-size-matters';
import { Navigation } from 'react-native-navigation';

import Button from '../ui/Button';
import { icons } from '../ui';
import { colors } from '../theme';

export interface IProps {
  componentId?: string | any;
}

interface IState {
  loading: boolean;
  fetching: string;
  dirty: boolean;
}

class Onboarding extends PureComponent<IProps, IState> {
  public static defaultProps = {
    defaultValue: '',
  };

  _gotoSignIn = () => {
    const { componentId } = this.props;
    Navigation.push(componentId, { component: { name: 'app.SignIn' } });
  };

  _gotoRegister = () => {
    const { componentId } = this.props;
    Navigation.push(componentId, { component: { name: 'app.Register' } });
  };

  render() {
    return (
      <View style={s.f1}>
        <View style={s.logoContainer}>
          <Image source={{ uri: icons.logo }} style={s.logo} />
        </View>

        <View style={s.container}>
          <Text style={s.title}>Welcome to the SmartFireAlarm App!</Text>
          <Text style={s.subtitle}>Press the button below to setup your account</Text>
          <Button onPress={this._gotoRegister} style={s.m10} title="Get Started" />

          <TouchableOpacity onPress={this._gotoSignIn}>
            <Text style={s.link}>I already have an account</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const s = StyleSheet.create({
  title: { textAlign: 'center', fontWeight: 'bold', fontSize: 25 },
  link: { textAlign: 'center', fontWeight: 'bold', fontSize: 16, marginTop: 10 },
  subtitle: { textAlign: 'center', color: colors.gray7, marginTop: 60, marginBottom: 10 },
  container: { padding: 10 },
  logo: { resizeMode: 'contain', width: ms(125), height: ms(125) },
  logoContainer: { alignItems: 'center', marginTop: ms(90) },
  f1: { flex: 1, backgroundColor: 'white' },
  m10: { margin: ms(10) },
});

export default Onboarding;
