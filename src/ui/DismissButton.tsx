import React from 'react';
import { StyleSheet } from 'react-native';
import { moderateScale as ms } from 'react-native-size-matters';

import { icons } from './index';
import Icon from './Icon';

type Type = {
  onPress: Function;
  style?: any;
};
const DismissButton = ({ onPress, ...rest }: Type) => (
  <Icon throttleTime={500} name={icons.lineClose} onPress={onPress} style={StyleSheet.flatten([s.icon, rest.style])} withOpacity />
);

const s = {
  icon: { width: ms(16), height: ms(16), resizeMode: 'contain', tintColor: 'rgba(255,255,255, 0.5)' },
};

DismissButton.defaultProps = {
  light: false,
};

export default DismissButton;
