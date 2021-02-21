/* eslint-disable curly */
import React, { PureComponent } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, ScrollView, Text, Modal, Keyboard, InteractionManager } from 'react-native';
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
import TouchableOpacity from '../ui/TouchableOpacity';

export interface IProps {
  onConfirm: (value: any) => Promise<void> | void | null;
  componentId?: string | any;
  defaultValue?: { email: string; password: string };
  screenName: string;
}

interface IState {}

const defaultUser: any = { devicesIds: [] };

class DeviceSettings extends PureComponent<IProps, IState> {
  state = { loading: false, editVisible: null, userId: auth().currentUser?.email || '', devices: [], updating: false, user: defaultUser };

  componentDidMount() {
    this._fechData();
  }

  _fechData = async () => {
    try {
      const userId = this.state.userId;
      this.setState({ loading: true });
      const res = await firestore().collection('devices').where('subscribersIds', 'array-contains', userId).get();
      const devices = res.docs.map((d: any) => d.data());

      const userRes = await firestore().collection('users').doc(userId).get();
      this.setState({ loading: false, devices, user: userRes.data() || defaultUser });
    } catch (e) {
      showInfo('Something unexpected happen');
    }
  };

  _onDismiss = () => {
    const { componentId } = this.props;
    Keyboard.dismiss();
    InteractionManager.runAfterInteractions(() => Navigation.pop(componentId));
  };

  _renderDeviceItem = (d: any) => {
    return (
      <TouchableOpacity key={d.deviceId} onPress={() => this.setState({ editVisible: d })} style={s.deviceItemContainer}>
        <Text style={s.deviceItemText}>{d.address}</Text>
      </TouchableOpacity>
    );
  };

  _renderModal = () => {
    const { editVisible, user, userId, updating, loading } = this.state;
    const device: any = editVisible;
    const isNew = !device || !device.deviceId;

    const devicesRef = firestore().collection('devices');
    const usersRef = firestore().collection('users');

    const handleOnSubmit = async (values: any) => {
      try {
        this.setState({ updating: true });
        const deviceId: string = values.deviceId;

        // Update device
        const payload = { ...values, subscribersIds: device.subscribersIds || [] };
        payload.subscribersIds.push(userId);
        payload.subscribersIds = [...new Set(payload.subscribersIds)];
        await devicesRef.doc(deviceId).set(payload);

        // Make sure user deviceIds are updated as well
        const userPayload = { ...user, email: userId, devicesIds: user.deviceIds || [] };
        userPayload.devicesIds.push(deviceId);
        userPayload.devicesIds = [...new Set(userPayload.devicesIds)];
        console.log(userPayload);

        await usersRef.doc(userId).set(userPayload);
        showInfo('Settings updated!');
        this.setState({ updating: false, editVisible: null });
        this._fechData();
      } catch (e) {
        showInfo();
        console.log(e);
      }
    };

    const deleteDevice = async (deviceId: string) => {
      try {
        this.setState({ updating: true });

        // 1. delete device
        await devicesRef.doc(deviceId).delete();

        // 2. Update device
        const devicesIds = user.devicesIds.filter((d: any) => d.deviceId !== deviceId);
        devicesRef.doc(deviceId).update({ devicesIds });

        this.setState({ updating: false, editVisible: null });
        this._fechData();
      } catch (e) {}
    };

    return (
      <Modal visible={Boolean(editVisible)}>
        <Form
          initialValues={device}
          onSubmit={handleOnSubmit}
          render={({ handleSubmit }) => (
            <View style={s.f1}>
              <ScreenHeader
                modal={this.props.componentId}
                onLeftPress={() => this.setState({ editVisible: '' })}
                title={isNew ? 'New Device' : 'Update Device'}
              />

              <ScrollView style={s.f1}>
                <KeyboardAvoidingView>
                  <View style={s.wrapper}>
                    <Field editable={isNew} component={InputField} label="Device Id" name="deviceId" validate={validateRequiredField} />
                    <Field component={InputField} label="Address" name="address" validate={validateRequiredField} />

                    <Text style={s.divider}>Emergency</Text>
                    <Field component={InputField} label="Emergency Phone Number" name="emergencyContact" validate={validateRequiredField} />
                  </View>

                  {!isNew && (
                    <Text onPress={() => deleteDevice(device.deviceId)} style={{ fontSize: 16, color: colors.red, paddingLeft: 10 }}>
                      Delete device
                    </Text>
                  )}
                </KeyboardAvoidingView>
              </ScrollView>

              <Button loading={updating} disabled={loading} onPress={() => handleSubmit(handleOnSubmit as any)} style={s.m10} title="Save" />
            </View>
          )}
        />
      </Modal>
    );
  };

  render() {
    const { componentId } = this.props;
    const { loading, devices } = this.state;

    if (loading) return <Loading />;

    return (
      <View style={s.f1}>
        {this._renderModal()}
        <ScreenHeader popFrom={componentId} title="Device Settings" />
        <View style={s.wrapper}>
          <Text style={s.divider}>Registered Devices</Text>
          {devices.length === 0 && <Text style={s.notFound}>No device found.</Text>}
          {devices.map((d) => this._renderDeviceItem(d))}
        </View>

        <Button style={s.btn} onPress={() => this.setState({ editVisible: {} })} title="Add new device" />
      </View>
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
  notFound: { marginTop: 10, color: colors.gray8 },
  btn: { borderRadius: 0 },
  deviceItemContainer: { marginTop: 10, padding: 10, backgroundColor: colors.gray3, borderRadius: 5 },
  deviceItemText: { color: colors.gray10, fontWeight: 'bold', fontSize: 16, lineHeight: 20 },
});

export default DeviceSettings;
