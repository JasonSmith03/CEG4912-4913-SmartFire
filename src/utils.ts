declare function require(name: string): any;
import { NativeModules, ToastAndroid } from 'react-native';

export const getDeviceLocale = () => NativeModules.I18nManager.localeIdentifier.slice(0, 2);

export const extractFrom = require('lodash.get');

export const isEqual = require('lodash.isequal');

export const tron = (...args: any) => {
  if (__DEV__) {
    const Reactotron = require('reactotron-react-native').default;
    Reactotron.log(args);
  }
};

export const getJSON = (f: any) => {
  if (!f) {
    return null;
  }
  if (typeof f === 'object') {
    return f;
  }

  let v = JSON.stringify(f);
  while (typeof v === 'string') {
    v = JSON.parse(v);
  }

  return v;
};

let DEBOUNCING: any = null;
export const debounce = (callback: any, delay = 1000) => {
  if (!DEBOUNCING) {
    callback && callback();
  }

  DEBOUNCING = setTimeout(() => {
    clearTimeout(DEBOUNCING);
    DEBOUNCING = null;
  }, delay);
};

export const validateRequiredField = (value: string) => {
  let error = '';

  if (!value) {
    error = 'Field required';
  }

  return error;
};

export const validatePhoneNumber = (value: string) => {
  let error = '';

  if (!value) {
    error = 'Field Required';
  } else if (!value.trim().match(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im)) {
    error = 'Phone Number Invalid';
  }

  return error;
};

export const validateEmail = (value: string) => {
  let error = '';
  if (!value) {
    error = 'Field Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value.trim())) {
    error = 'Email Invalid';
  }
  return error;
};

export const toTitleCase = (text: string) =>
  text
    ? text
        .toLowerCase()
        .trim()
        .split(' ')
        .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
        .join(' ')
    : null;

export const getFormattedDate = (d: Date) => `${('0' + d.getDate()).slice(-2)}/${('0' + (d.getMonth() + 1)).slice(-2)}/${d.getFullYear()}`;

export const getFormattedDateTime = (d: Date) =>
  `${('0' + d.getDate()).slice(-2)}/${('0' + (d.getMonth() + 1)).slice(-2)}/${d.getFullYear()} at ${('0' + d.getHours()).slice(-2)}:${(
    '0' + d.getMinutes()
  ).slice(-2)}`;

export const showInfo = (text = 'Something unexpected happened') => {
  ToastAndroid.show(text, ToastAndroid.LONG);
};
