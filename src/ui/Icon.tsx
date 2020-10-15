import React from 'react';
import { View, Image, Platform, TouchableNativeFeedback, StyleSheet } from 'react-native';
import { moderateScale as ms } from 'react-native-size-matters';

import { colors } from '../theme';
import TouchableOpacity from './TouchableOpacity';
import { debounce } from '../utils';

// Icons
export const icons = {
  circleClose: 'icon_circle_close',
  arrowLeft: 'icon_arrow_left',
  arrowRight: 'icon_arrow_right',
  arrowTop: 'icon_arrow_top',
  arrowBottom: 'icon_arrow_bottom',
  profile: 'icon_profile',
  lineClose: 'icon_line_error',
  verticalDots: 'icon_vertical_dots',
  search: 'icon_search',
  support: 'icon_support',
  logo: 'logo',
  caretBottom: 'icon_caret_bottom',
  right: 'icon_right',
};

type Type = {
  containerStyle?: any;
  disabled?: boolean;
  name: string;
  onPress?: any;
  style?: any;
  throttleTime?: number;
  withOpacity?: boolean;
};
const Icon = ({ name, style = {}, containerStyle = {}, onPress = () => null, throttleTime = 0, disabled = false, withOpacity = false }: Type) => {
  const _onPress = () => debounce(onPress, throttleTime);
  if (onPress) {
    if (Platform.OS === 'ios' || Platform.Version <= 21 || withOpacity) {
      return (
        <TouchableOpacity disabled={disabled} onPress={onPress} style={[s.touchable, containerStyle]} throttleTime={throttleTime}>
          <Image fadeDuration={0} resizeMode="contain" source={{ uri: name }} style={[s.image, style]} />
        </TouchableOpacity>
      );
    } else if (Platform.OS === 'android' && Platform.Version > 21) {
      return (
        <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('#aaaaaa', true)} disabled={disabled} onPress={_onPress}>
          <View style={[s.touchable, containerStyle]}>
            <Image fadeDuration={0} resizeMode="contain" source={{ uri: name }} style={[s.image, style]} />
          </View>
        </TouchableNativeFeedback>
      );
    }
  }
  return (
    <View style={containerStyle}>
      <Image fadeDuration={0} resizeMode="contain" source={{ uri: name }} style={[s.image, style]} />
    </View>
  );
};

const s = StyleSheet.create({
  touchable: {
    height: ms(35),
    width: ms(35),
    margin: 0,
    padding: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    resizeMode: 'contain',
    width: ms(20),
    height: ms(20),
    tintColor: colors.gray8,
  },
  icon: {
    maxHeight: ms(18),
    maxWidth: ms(18),
    tintColor: colors.gray8,
  },
});

export default Icon;
