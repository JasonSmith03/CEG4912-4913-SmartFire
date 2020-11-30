import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { colors } from '../theme';

export default function Loading() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <ActivityIndicator color={colors.red} />
    </View>
  );
}
