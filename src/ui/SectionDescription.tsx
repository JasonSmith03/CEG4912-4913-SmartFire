import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { moderateScale as ms } from 'react-native-size-matters';

import { colors } from '../theme';

const SectionDescription = ({ text, ...rest }: { text: string; style?: any; textStyle?: any }) => (
  <View style={[s.container, rest.style]}>
    <Text style={[s.text, rest.textStyle]}>{text}</Text>
  </View>
);

const s = StyleSheet.create({
  container: {
    backgroundColor: colors.gray2,
    padding: ms(10),
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: { marginLeft: ms(10), fontSize: ms(11), color: colors.gray7 },
});

export default SectionDescription;
