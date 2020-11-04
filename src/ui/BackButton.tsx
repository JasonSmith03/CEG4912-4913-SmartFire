import React from 'react';
import { StyleSheet } from 'react-native';
import { moderateScale as ms } from 'react-native-size-matters';

import { icons } from './index';
import Icon from './Icon';

type Type = {
  onPress: Function;
  style?: any;
};
const BackButton = ({ onPress, ...rest }: Type) => (
  <Icon name={icons.arrowLeft} onPress={onPress} style={StyleSheet.flatten([s.icon, rest.style])} withOpacity />
);

const s = {
  icon: { width: ms(18), height: ms(18), resizeMode: 'contain', tintColor: 'rgba(255,255,255, 0.8)' },
};

export default BackButton;
