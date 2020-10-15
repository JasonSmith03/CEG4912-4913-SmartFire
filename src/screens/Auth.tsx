import React, { PureComponent } from 'react';
import { View, StyleSheet, InteractionManager, Keyboard, KeyboardAvoidingView, ScrollView, Image } from 'react-native';
import { moderateScale as ms } from 'react-native-size-matters';
import { Navigation } from 'react-native-navigation';
import { Form, Field } from 'react-final-form';

import ScreenHeader from '../ui/ScreenHeader';
import { validateRequiredField } from '../utils';
import Button from '../ui/Button';
import InputField from '../ui/InputField';
import { icons } from '../ui';

export interface IProps {
  onConfirm: (value: any) => Promise<void> | void | null;
  componentId?: string | any;
  defaultValue?: { email: string; password: string };
  screenName: string;
}

interface IState {
  loading: boolean;
  fetching: string;
  dirty: boolean;
}

class Auth extends PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = { loading: false, fetching: '', dirty: false };
  }

  public static defaultProps = {
    defaultValue: '',
  };

  _handleOnSubmit = async (values: { email: string; password: string }) => {
    this.setState({ loading: true });
    try {
      const params: any = { email: values.email.trim(), password: values.password.trim() };
      this.setState({ loading: false });
      this._onDismiss();
    } catch (e) {
      this.setState({ loading: false });
      __DEV__ && console.error(e);
    }
  };

  _onDismiss = () => {
    const { componentId } = this.props;
    Keyboard.dismiss();
    InteractionManager.runAfterInteractions(() => Navigation.dismissModal(componentId));
  };

  render() {
    const { defaultValue } = this.props;
    const { loading, dirty } = this.state;
    const initialValues = defaultValue && !dirty ? defaultValue : { email: '', password: '' };

    return (
      <Form
        initialValues={initialValues}
        onSubmit={this._handleOnSubmit}
        render={({ handleSubmit }) => (
          <View style={s.f1}>
            <ScreenHeader onLeftPress={this._onDismiss} title="Authentication" />

            <ScrollView style={s.f1}>
              <View style={s.logoContainer}>
                <Image source={{ uri: icons.logo }} style={s.logo} />
              </View>

              <KeyboardAvoidingView>
                <View style={s.wrapper}>
                  <Field component={InputField} label="Your Email" name="email" validate={validateRequiredField} />
                  <Field component={InputField} label="Your Password" name="password" validate={validateRequiredField} />
                </View>
              </KeyboardAvoidingView>

              <Button loading={loading} disabled={loading} onPress={() => handleSubmit(this._handleOnSubmit as any)} style={s.m10} title="Sign In" />
            </ScrollView>
          </View>
        )}
      />
    );
  }
}

const s = StyleSheet.create({
  logo: { resizeMode: 'contain', width: ms(125), height: ms(125) },
  logoContainer: { alignItems: 'center', marginTop: ms(50) },
  wrapper: { backgroundColor: 'white', flex: 1, padding: ms(10, 1.25) },
  f1: { flex: 1, backgroundColor: 'white' },
  m10: { margin: ms(10) },
});

export default Auth;
