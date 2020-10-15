import React from 'react';
import { Text, View, StyleSheet, ActivityIndicator } from 'react-native';
import { moderateScale as ms } from 'react-native-size-matters';

import { colors } from '../theme';
import TouchableOpacity from './TouchableOpacity';

type Type = {
  onPress: Function;
  title: string;
  disabled?: boolean;
  loading?: boolean;
  style?: any;
  textStyle?: any;
};

export default function Button({ onPress, title, disabled = false, loading = false, style = null, textStyle = null }: Type) {
  return (
    <TouchableOpacity
      disabled={Boolean(disabled || loading)}
      throttleTime={1000}
      onPress={onPress}
      style={StyleSheet.flatten([s.button, { backgroundColor: disabled || loading ? 'rgba(0, 0, 0, 0.3)' : colors.orange }, style])}>
      {loading ? (
        <View style={StyleSheet.flatten(s.loadingView)}>
          <Text style={StyleSheet.flatten([s.buttonTextLoading, textStyle])}>{title}</Text>

          <ActivityIndicator color="gray" />
        </View>
      ) : (
        <Text style={StyleSheet.flatten([s.buttonText, textStyle])}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const s = StyleSheet.create({
  button: {
    backgroundColor: colors.orange,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: ms(5),
    minHeight: ms(45, 0.25),
    maxHeight: ms(45, 0.25),
    height: ms(45, 0.25),
    borderWidth: 0,
  },
  buttonText: {
    fontWeight: 'bold',
    color: colors.white,
    fontSize: ms(16),
  },
  buttonTextLoading: {
    color: colors.white,
    marginRight: ms(5),
    fontWeight: 'bold',
    fontSize: ms(16),
  },
  loadingView: { alignItems: 'center', justifyContent: 'center', flexDirection: 'row' },
});
