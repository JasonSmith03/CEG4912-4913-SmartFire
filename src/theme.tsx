import { Dimensions } from 'react-native';
import { moderateScale as ms } from 'react-native-size-matters';

export const { width, height } = Dimensions.get('window');

export const colors = {
  gray1: '#FAFAFA',
  gray2: '#F5F5F5',
  gray3: '#EEEEEE',
  gray4: '#E0E0E0',
  gray5: '#BABABA',
  gray6: '#9E9E9E',
  gray7: '#757575',
  gray8: '#616161',
  gray9: '#424242',
  gray10: '#212121',
  white: '#ffffff',
  purple: '#933EC5',
  pink: '#D80027',
  black: '#080808',
  orange: '#d64541',
  green: '#53c31a',
  red: '#d91e18',
  bg: '#efefef',
  headerBg: '#d64541',
  highlight: '#fdf7df',
  highlightText: '#ac5d01',
  disabled: 'rgba(0,0,0,0.1)',
  flat1: '#ED4C67',
  flat2: '#009432',
  flat3: '#F79F1F',
  flat4: '#EA2027',

  defaultColor: '#b2b2b2',
  backgroundTransparent: 'transparent',
  defaultBlue: '#0084ff',

  lightGray: 'rgba(0,0,0,0.075)',

  carrot: '#e67e22',
  emerald: '#2ecc71',
  peterRiver: '#3498db',
  wisteria: '#8e44ad',
  alizarin: '#e74c3c',
  turquoise: '#1abc9c',
  midnightBlue: '#2c3e50',
  optionTintColor: '#007AFF',
};

export const pickerStyle = {
  pickerConfirmBtnColor: [242, 155, 54, 1],
  pickerCancelBtnColor: [242, 155, 54, 1],
  pickerTitleColor: [66, 66, 66, 1],
  pickerToolBarBg: [255, 255, 255, 0.5],
  pickerBg: [255, 255, 255, 1],
  pickerToolBarFontSize: ms(16, 0.1),
  pickerFontSize: ms(16, 0.25),
  pickerFontColor: [66, 66, 66, 1],
  pickerFontFamily: 'roboto',
};
