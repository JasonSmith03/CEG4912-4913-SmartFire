import React, { PureComponent } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text } from 'react-native';
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

class Home extends PureComponent<IProps, IState> {
  public static defaultProps = {
    defaultValue: '',
  };

  _gotoNext = () => {
    const { componentId } = this.props;
    Navigation.push(componentId, { component: { name: 'app.PersonalInformation' } });
  };

  _renderMenuItem = ({ icon, text }) => (
    <View style={s.itemContainer}>
      <TouchableOpacity style={s.itemWrapper}>
        <Image source={{ uri: icon }} style={s.itemImage} />
        <Text style={s.itemText}>{text}</Text>
      </TouchableOpacity>
    </View>
  );

  render() {
    return (
      <View style={s.f1}>
        <View style={s.headerContainer}>
          <Text style={s.title}>SMART FIRE ALARM</Text>
          <View style={s.logoContainer}>
            <Image source={{ uri: icons.logo }} style={s.logo} />
          </View>
        </View>

        <View style={s.menuContainer}>
          {this._renderMenuItem({ text: 'Profile', icon: 'profile' })}
          {this._renderMenuItem({ text: 'Fire Alarm', icon: 'firealarm' })}
          {this._renderMenuItem({ text: 'Emergency', icon: 'emergency' })}
          {this._renderMenuItem({ text: 'Wearable', icon: 'wearable' })}
        </View>
      </View>
    );
  }
}

const s = StyleSheet.create({
  itemContainer: { width: '50%', alignItems: 'center', justifyContent: 'center', marginBottom: 35 },
  itemWrapper: { margin: 5, borderWidth: 1, borderColor: colors.gray4, borderRadius: 5, padding: 20, paddingHorizontal: 40 },
  itemImage: { width: 60, height: 60, alignSelf: 'center' },
  itemText: { textAlign: 'center', paddingTop: 5, marginTop: 5, color: colors.gray9, fontSize: 14 },
  menuContainer: { flexDirection: 'row', flexWrap: 'wrap', alignSelf: 'center', marginTop: 50 },
  headerContainer: {
    backgroundColor: colors.gray1,
    paddingVertical: 20,
    borderBottomColor: colors.gray4,
    borderBottomWidth: 1,
  },
  title: { textAlign: 'center', fontWeight: 'bold', fontSize: 30, marginTop: 20, color: colors.gray5 },
  logoContainer: { alignItems: 'center', marginTop: 10 },
  logo: { resizeMode: 'contain', width: 150, height: 150 },
  f1: { flex: 1, backgroundColor: 'white' },
});

export default Home;
