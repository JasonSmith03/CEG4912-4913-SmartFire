import React from 'react';
import { TouchableOpacity as RNTouchableOpacity } from 'react-native';

import { debounce } from '../utils';

type Type = {
  children?: any;
  onPress?: Function;
  onLongPress?: Function | any;
  throttleTime?: number;
  withOpacity?: boolean;
  style?: any;
  disabled?: boolean;
};
export default function TouchableOpacity({ onPress, throttleTime = 0, ...rest }: Type) {
  const _onPress = () => {
    if (onPress) {
      debounce(onPress, throttleTime);
    }
  };

  return (
    <RNTouchableOpacity {...rest} onPress={_onPress}>
      {rest.children}
    </RNTouchableOpacity>
  );
}
