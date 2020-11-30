import React, { PureComponent } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, ScrollView } from 'react-native';
import { moderateScale as ms } from 'react-native-size-matters';
import { Navigation } from 'react-native-navigation';
import { Form, Field } from 'react-final-form';
import auth from '@react-native-firebase/auth';

import ScreenHeader from '../ui/ScreenHeader';
import { showInfo, validateRequiredField } from '../utils';
import Button from '../ui/Button';
import InputField from '../ui/InputField';
import { Home } from '.';

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

class Register extends PureComponent<IProps, IState> {
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
      const params = { email: values.email.trim(), password: values.password.trim() };
      await auth().createUserWithEmailAndPassword(params.email, params.password);
      this.setState({ loading: false });
      Navigation.setRoot(Home);
    } catch (e) {
      showInfo('Registration failed');
      this.setState({ loading: false });
    }
  };

  render() {
    const { defaultValue, componentId } = this.props;
    const { loading, dirty } = this.state;
    const initialValues = defaultValue && !dirty ? defaultValue : { email: '', password: '' };

    return (
      <Form
        initialValues={initialValues}
        onSubmit={this._handleOnSubmit}
        render={({ handleSubmit }) => (
          <View style={s.f1}>
            <ScreenHeader popFrom={componentId} title="Register" />

            <ScrollView style={s.f1}>
              <KeyboardAvoidingView>
                <View style={s.wrapper}>
                  <Field component={InputField} label="Your Email" name="email" validate={validateRequiredField} />
                  <Field secureTextEntry component={InputField} label="Your Password" name="password" validate={validateRequiredField} />
                </View>
              </KeyboardAvoidingView>
            </ScrollView>

            <Button loading={loading} disabled={loading} onPress={() => handleSubmit(this._handleOnSubmit as any)} style={s.m10} title="Submit" />
          </View>
        )}
      />
    );
  }
}

const s = StyleSheet.create({
  wrapper: { backgroundColor: 'white', flex: 1, padding: ms(10, 1.25) },
  f1: { flex: 1, backgroundColor: 'white' },
  m10: { margin: ms(10) },
});

export default Register;
