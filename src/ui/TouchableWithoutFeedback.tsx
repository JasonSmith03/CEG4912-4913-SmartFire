import React from 'react';
import { TouchableOpacity } from 'react-native';

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

export default function TouchableWithoutFeedback({ onPress, throttleTime = 0, ...rest }: Type) {
  const _onPress = () => {
    if (onPress) {
      debounce(onPress, throttleTime);
    }
  };

  return (
    <TouchableOpacity {...rest} activeOpacity={1} onPress={_onPress}>
      {rest.children}
    </TouchableOpacity>
  );
}
