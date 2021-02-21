import React, { PureComponent } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, ScrollView, Text, Keyboard, InteractionManager } from 'react-native';
import { moderateScale as ms } from 'react-native-size-matters';
import { Navigation } from 'react-native-navigation';
import { Form, Field } from 'react-final-form';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import ScreenHeader from '../ui/ScreenHeader';
import { showInfo, validateEmail, validateRequiredField } from '../utils';
import Button from '../ui/Button';
import InputField from '../ui/InputField';
import { colors } from '../theme';
import Loading from '../ui/Loading';

export interface IProps {
  onConfirm: (value: any) => Promise<void> | void | null;
  componentId?: string | any;
  defaultValue?: { email: string };
  screenName: string;
}

interface IState {}

class PersonalInformation extends PureComponent<IProps, IState> {
  state = { profile: {}, loading: false, updating: false };

  componentDidMount() {
    this._fechData();
  }

  _fechData = async () => {
    try {
      const userId = auth().currentUser?.email || '';
      this.setState({ loading: true });
      const res = await firestore().collection('users').doc(userId).get();
      this.setState({ loading: false, profile: res.data() });
    } catch (e) {
      console.log(e);

      showInfo('Something unexpected happen');
    }
  };

  _handleOnSubmit = async (values: any) => {
    try {
      this.setState({ updating: true });
      const userId = auth().currentUser?.email || '';
      await firestore().collection('users').doc(userId).set(values);
      showInfo('Profile updated!');
      this.setState({ updating: false });
      this._onDismiss();
    } catch (e) {
      showInfo();
    }
  };

  _onDismiss = () => {
    const { componentId } = this.props;
    Keyboard.dismiss();
    InteractionManager.runAfterInteractions(() => Navigation.pop(componentId));
  };

  render() {
    const { componentId } = this.props;
    const { loading, profile, updating } = this.state;

    if (loading) {
      return <Loading />;
    }

    const initialValues = { email: auth().currentUser?.email || '', ...profile };

    return (
      <Form
        initialValues={initialValues}
        onSubmit={this._handleOnSubmit}
        render={({ handleSubmit }) => (
          <View style={s.f1}>
            <ScreenHeader popFrom={componentId} title="Personal Information" />

            <ScrollView style={s.f1}>
              <KeyboardAvoidingView>
                <View style={s.wrapper}>
                  <Field component={InputField} label="Your Full Name" name="name" validate={validateRequiredField} />
                  <Field component={InputField} editable={false} label="Your Email" name="email" validate={validateEmail} />

                  <Text style={s.divider}>Other Information</Text>
                  <Field component={InputField} label="Disabiliy" name="disability" />
                </View>
              </KeyboardAvoidingView>
            </ScrollView>

            <Button loading={updating} onPress={() => handleSubmit(this._handleOnSubmit as any)} style={s.m10} title="Save" />
          </View>
        )}
      />
    );
  }
}

const s = StyleSheet.create({
  divider: {
    fontSize: 12,
    letterSpacing: 1.5,
    color: colors.gray7,
    marginTop: 20,
  },
  wrapper: { backgroundColor: 'white', flex: 1, padding: ms(10, 1.25) },
  f1: { flex: 1, backgroundColor: 'white' },
  m10: { margin: ms(10) },
});

export default PersonalInformation;
