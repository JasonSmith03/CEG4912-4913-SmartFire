import React, { PureComponent } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, ScrollView, Text } from 'react-native';
import { moderateScale as ms } from 'react-native-size-matters';
import { Navigation } from 'react-native-navigation';
import { Form, Field } from 'react-final-form';

import ScreenHeader from '../ui/ScreenHeader';
import { validateRequiredField } from '../utils';
import Button from '../ui/Button';
import InputField from '../ui/InputField';
import { colors } from '../theme';

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

class DeviceSettings extends PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = { loading: false, fetching: '', dirty: false };
  }

  _handleOnSubmit = async (values: any) => {
    const { componentId, userInfo } = this.props;
    this.setState({ loading: true });
    try {
      this.setState({ loading: false });
      console.log(values);
      console.log(userInfo);
    } catch (e) {
      this.setState({ loading: false });
      __DEV__ && console.error(e);
    }
  };

  render() {
    const { componentId } = this.props;
    const { loading } = this.state;
    const initialValues = {
      deviceName: '',
      deviceId: '',
      deviceLocationProvince: '',
      deviceLocationCity: '',
      deviceLocationPostalCode: '',
      deviceLocationAppartmentNumber: '',
      deviceLocationShortDescription: '',
    };

    return (
      <Form
        initialValues={initialValues}
        onSubmit={this._handleOnSubmit}
        render={({ handleSubmit }) => (
          <View style={s.f1}>
            <ScreenHeader popFrom={componentId} title="Device Settings" />

            <ScrollView style={s.f1}>
              <KeyboardAvoidingView>
                <View style={s.wrapper}>
                  <Field component={InputField} label="Your Device Name" name="deviceName" validate={validateRequiredField} />
                  <Field component={InputField} label="Your Device ID" name="deviceId" validate={validateRequiredField} />

                  <Text style={s.divider}>Location</Text>
                  <Field component={InputField} label="Province" name="deviceLocationProvince" validate={validateRequiredField} />
                  <Field component={InputField} label="City" name="deviceLocationCity" validate={validateRequiredField} />
                  <Field component={InputField} label="Postal Code" name="deviceLocationPostalCode" validate={validateRequiredField} />
                  <Field component={InputField} label="Appartment Number" name="deviceLocationAppartmentNumber" validate={validateRequiredField} />
                  <Field component={InputField} label="Short Description (Optional)" name="deviceLocationShortDescription" />
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
