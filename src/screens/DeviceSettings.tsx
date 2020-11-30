import React, { PureComponent } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, ScrollView, Text, Keyboard, InteractionManager } from 'react-native';
import { moderateScale as ms } from 'react-native-size-matters';
import { Navigation } from 'react-native-navigation';
import { Form, Field } from 'react-final-form';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import ScreenHeader from '../ui/ScreenHeader';
import { showInfo, validateRequiredField } from '../utils';
import Button from '../ui/Button';
import InputField from '../ui/InputField';
import { colors } from '../theme';
import Loading from '../ui/Loading';

export interface IProps {
  onConfirm: (value: any) => Promise<void> | void | null;
  componentId?: string | any;
  defaultValue?: { email: string; password: string };
  screenName: string;
}

interface IState {}

class DeviceSettings extends PureComponent<IProps, IState> {
  state = { loading: false, device: {}, updating: false };

  componentDidMount() {
    this._fechData();
  }

  _fechData = async () => {
    try {
      const userId = auth().currentUser?.email || '';
      this.setState({ loading: true });
      const res = await firestore().collection('devices').doc(userId).get();
      this.setState({ loading: false, device: res.data() });
    } catch (e) {
      showInfo('Something unexpected happen');
    }
  };

  _handleOnSubmit = async (values: any) => {
    try {
      this.setState({ updating: true });
      const userId = auth().currentUser?.email || '';
      await firestore().collection('devices').doc(userId).set(values);
      showInfo('Settings updated!');
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
    const { loading, updating, device } = this.state;

    if (loading) {
      return <Loading />;
    }

    return (
      <Form
        initialValues={device}
        onSubmit={this._handleOnSubmit}
        render={({ handleSubmit }) => (
          <View style={s.f1}>
            <ScreenHeader popFrom={componentId} title="Device Settings" />

            <ScrollView style={s.f1}>
              <KeyboardAvoidingView>
                <View style={s.wrapper}>
                  <Field component={InputField} label="Your Device Name" name="deviceName" validate={validateRequiredField} />

                  <Text style={s.divider}>Location</Text>
                  <Field component={InputField} label="Province" name="deviceLocationProvince" validate={validateRequiredField} />
                  <Field component={InputField} label="City" name="deviceLocationCity" validate={validateRequiredField} />
                  <Field component={InputField} label="Postal Code" name="deviceLocationPostalCode" validate={validateRequiredField} />
                  <Field component={InputField} label="Appartment Number (Optional)" name="deviceLocationAppartmentNumber" />
                  <Field component={InputField} label="Short Description (Optional)" name="deviceLocationShortDescription" />
                </View>
              </KeyboardAvoidingView>
            </ScrollView>

            <Button loading={updating} disabled={loading} onPress={() => handleSubmit(this._handleOnSubmit as any)} style={s.m10} title="Save" />
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

export default DeviceSettings;
