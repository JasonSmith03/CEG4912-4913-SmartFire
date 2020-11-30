import React, { PureComponent } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text } from 'react-native';
import { Navigation } from 'react-native-navigation';
import auth from '@react-native-firebase/auth';

import { icons } from '../ui';
import { colors } from '../theme';
import { Auth } from '.';

export interface IProps {
  componentId?: string | any;
}

interface IState {
  loading: boolean;
  fetching: string;
  dirty: boolean;
}

class Home extends PureComponent<IProps, IState> {
  public static defaultProps = {
    defaultValue: '',
  };

  _gotoNext = () => {
    const { componentId } = this.props;
    Navigation.push(componentId, { component: { name: 'app.PersonalInformation' } });
  };

  _renderMenuItem = ({ icon, text, screen }) => (
    <View style={s.itemContainer}>
      <TouchableOpacity onPress={() => Navigation.push(this.props.componentId, { component: { name: screen } })} style={s.itemWrapper}>
        <Image source={{ uri: icon }} style={s.itemImage} />
        <Text style={s.itemText}>{text}</Text>
      </TouchableOpacity>
    </View>
  );

  _onSignOut = () =>
    auth()
      .signOut()
      .then(() => Navigation.setRoot(Auth));

  render() {
    return (
      <View style={s.f1}>
        <TouchableOpacity onPress={this._onSignOut}>
          <Text style={s.signoutLink}>Sign out</Text>
        </TouchableOpacity>
        <View style={s.headerContainer}>
          <Text style={s.title}>SMART FIRE ALARM</Text>
          <View style={s.logoContainer}>
            <Image source={{ uri: icons.logo }} style={s.logo} />
          </View>
        </View>

        <View style={s.menuContainer}>
          {this._renderMenuItem({ text: 'Profile', icon: 'profile', screen: 'app.PersonalInformation' })}
          {this._renderMenuItem({ text: 'Fire Alarm', icon: 'firealarm', screen: 'app.DeviceSettings' })}
          {this._renderMenuItem({ text: 'Emergency', icon: 'emergency', screen: 'app.DeviceSettings' })}
          {this._renderMenuItem({ text: 'Wearable', icon: 'wearable', screen: 'app.DeviceSettings' })}
        </View>
      </View>
    );
  }
}

const s = StyleSheet.create({
  signoutLink: { textAlign: 'right', padding: 10, backgroundColor: colors.gray1, fontSize: 14, color: colors.gray8 },
  itemContainer: { width: '50%', alignItems: 'center', justifyContent: 'center', marginBottom: 35 },
  itemWrapper: { margin: 5, borderWidth: 1, borderColor: colors.gray4, borderRadius: 5, padding: 20, paddingHorizontal: 40 },
  itemImage: { width: 60, height: 60, alignSelf: 'center' },
  itemText: { textAlign: 'center', paddingTop: 5, marginTop: 5, color: colors.gray9, fontSize: 14 },
  menuContainer: { flexDirection: 'row', flexWrap: 'wrap', alignSelf: 'center', marginTop: 50 },
  headerContainer: {
    backgroundColor: colors.gray1,
    paddingBottom: 20,
    borderBottomColor: colors.gray4,
    borderBottomWidth: 1,
  },
  title: { textAlign: 'center', marginTop: 10, fontWeight: 'bold', fontSize: 30, color: colors.gray5 },
  logoContainer: { alignItems: 'center', marginTop: 10 },
  logo: { resizeMode: 'contain', width: 150, height: 150 },
  f1: { flex: 1, backgroundColor: 'white' },
});

export default Home;
