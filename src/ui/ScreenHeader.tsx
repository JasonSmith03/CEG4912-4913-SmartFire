import React from 'react';
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native';
import { moderateScale as ms } from 'react-native-size-matters';
import { Navigation } from 'react-native-navigation';

import { colors, width } from '../theme';
import BackButton from './BackButton';
import DismissButton from './DismissButton';
import TouchableOpacity from './TouchableOpacity';
import Icon from './Icon';

const HEIGHT = ms(45, 1.5);

type Type = {
  onLeftPress?: Function;
  right?: { disabled?: boolean; text?: string; onPress: Function; throttleTime?: number; icon?: string };
  loading?: boolean;
  popFrom?: string;
  title: string;
  modal?: string;
};

const ScreenHeader = ({ title, onLeftPress = null as any, right = {} as any, loading = false, popFrom = '', modal = '' }: Type) => (
  <View style={s.container}>
    <View style={s.leftContainer}>
      {popFrom && !onLeftPress ? <BackButton onPress={() => Navigation.pop(popFrom)} /> : null}
      {popFrom && onLeftPress ? <BackButton onPress={onLeftPress} /> : null}
      {modal && !onLeftPress ? <DismissButton onPress={() => Navigation.dismissModal(modal)} /> : null}
      {modal && onLeftPress ? <DismissButton onPress={onLeftPress} /> : null}

      {Boolean(title) && (
        <Text numberOfLines={1} style={s.title}>
          {title}
        </Text>
      )}
    </View>

    <View style={s.rightContainer}>
      {loading ? <ActivityIndicator color={colors.orange} size="small" /> : null}

      {!loading && right.onPress && (
        <View>
          {Boolean(right.text) && (
            <TouchableOpacity disabled={right.disabled || loading} onPress={right.onPress as any} throttleTime={right.throttleTime}>
              <Text style={[s.rightText, { color: right.disabled ? colors.disabled : colors.orange }]}>{right.text}</Text>
            </TouchableOpacity>
          )}

          {Boolean(right.icon) && (
            <Icon
              disabled={right.disabled || loading}
              name={right.icon as any}
              onPress={right.onPress as any}
              style={StyleSheet.flatten([s.icon, { tintColor: right.disabled ? colors.disabled : 'rgba(255,255,255,0.5)' }])}
            />
          )}
        </View>
      )}
    </View>
  </View>
);

const s = StyleSheet.create({
  container: {
    backgroundColor: colors.headerBg,
    width,
    maxHeight: HEIGHT,
    height: HEIGHT,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftContainer: { flexDirection: 'row', alignItems: 'center', width: '75%' },
  icon: { maxWidth: ms(20), maxHeight: ms(20), width: ms(20), height: ms(20), resizeMode: 'contain', tintColor: 'rgba(255,255,255, 0.5)' },
  title: {
    marginLeft: ms(20),
    fontSize: ms(18),
    fontWeight: 'bold',
    color: colors.white,
    textAlign: 'center',
  },
  rightContainer: { flexDirection: 'row', justifyContent: 'flex-end', paddingHorizontal: ms(10), alignItems: 'center', width: '25%' },
  rightText: { fontSize: ms(15), color: colors.orange },
});

export default ScreenHeader;
