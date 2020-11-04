import React, { PureComponent } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, ScrollView, Text } from 'react-native';
import { moderateScale as ms } from 'react-native-size-matters';
import { Navigation } from 'react-native-navigation';
import { Form, Field } from 'react-final-form';

import ScreenHeader from '../ui/ScreenHeader';
import { validateEmail, validatePhoneNumber, validateRequiredField } from '../utils';
import Button from '../ui/Button';
import InputField from '../ui/InputField';
import { colors } from '../theme';

export interface IProps {
  onConfirm: (value: any) => Promise<void> | void | null;
  componentId?: string | any;
  defaultValue?: { email: string; password: string };
  screenName: string;
}

interface IState {}

class PersonalInformation extends PureComponent<IProps, IState> {
  _handleOnSubmit = async (values: any) => {
    const { componentId } = this.props;
    Navigation.push(componentId, { component: { name: 'app.DeviceSettings', passProps: { userInfo: values } } });
  };

  render() {
    const { componentId } = this.props;
    const initialValues = {
      fullName: '',
      email: '',
      password: '',
      emsPhoneNumber: '',
      familyPhoneNumber1: '',
      familyPhoneNumber2: '',
      familyPhoneNumber3: '',
    };

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
                  <Field component={InputField} label="Your Full Name" name="fullName" validate={validateRequiredField} />
                  <Field component={InputField} label="Your Email" name="email" validate={validateEmail} />
                  <Field component={InputField} label="Your Password" name="password" secureTextEntry validate={validateRequiredField} />

                  <Text style={s.divider}>Emergency Contact</Text>
                  <Field component={InputField} label="Emmergency Phone Number" name="emsPhoneNumber" validate={validatePhoneNumber} />

                  <Text style={s.divider}>Close Contacts</Text>
                  <Field component={InputField} label="Phone Number 1" name="familyPhoneNumber1" />
                  <Field component={InputField} label="Phone Number 2" name="familyPhoneNumber2" />
                  <Field component={InputField} label="Phone Number 3" name="familyPhoneNumber3" />
                </View>
              </KeyboardAvoidingView>
            </ScrollView>

            <Button onPress={() => handleSubmit(this._handleOnSubmit as any)} style={s.m10} title="Next" />
          </View>
        )}
      />
    );
  }
}

const s = StyleSheet.create({
  logo: { resizeMode: 'contain', width: ms(125), height: ms(125) },
  divider: {
    fontSize: 12,
    letterSpacing: 1.5,
    color: colors.gray7,
    marginTop: 20,
  },
  logoContainer: { alignItems: 'center', marginTop: ms(50) },
  wrapper: { backgroundColor: 'white', flex: 1, padding: ms(10, 1.25) },
  f1: { flex: 1, backgroundColor: 'white' },
  m10: { margin: ms(10) },
});

export default PersonalInformation;
