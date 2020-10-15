import React from 'react';
import { Text, StyleSheet, View, TextInput } from 'react-native';
import { moderateScale as ms } from 'react-native-size-matters';

import { colors } from '../theme';

interface IProps {
  input: any;
  label: string;
  meta: any;
  value: string;
  focus?: boolean;
  customStyle?: any;
  autoCorrect?: boolean;
  onEnter?: Function;
  refField?: any;
  returnKeyType?: string;
  logicError?: string;
}

interface IState {
  isFocus: boolean;
}

class InputField extends React.PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = { isFocus: Boolean(props.focus) };
  }

  _onFocus = (e: any) => {
    const field = this.props;
    this.setState({ isFocus: true });
    field.input.onFocus && field.input.onFocus(e);
  };

  _onBlur = (e: any) => {
    const field = this.props;
    this.setState({ isFocus: false });
    field.input.onBlur && field.input.onBlur(e);
  };

  render() {
    const field = this.props;
    const { isFocus } = this.state;
    const INPUT_WITH_ERROR = (field.meta.touched && field.meta.error) || field.logicError;
    const borderRed = INPUT_WITH_ERROR ? { borderWidth: ms(1), borderColor: 'red' } : null;

    return (
      <View>
        <View style={StyleSheet.flatten([s.container, borderRed, field.customStyle])}>
          {Boolean(isFocus || field.value || field.input.value) && <Text style={s.captionText}>{field.label}</Text>}
          <View style={s.wrapper}>
            <TextInput
              {...field}
              autoCorrect={Boolean(field.autoCorrect)}
              autoFocus={field.focus}
              onChangeText={field.input.onChange}
              onSubmitEditing={field.onEnter}
              placeholder={isFocus ? '' : field.label}
              placeholderTextColor={colors.gray6}
              ref={field.refField}
              returnKeyType={field.returnKeyType ? field.returnKeyType : 'next'}
              selectionColor={colors.orange}
              style={StyleSheet.flatten(s.input)}
              underlineColorAndroid="transparent"
              {...field.input}
              onBlur={this._onBlur}
              onFocus={this._onFocus}
            />
          </View>
        </View>

        {INPUT_WITH_ERROR ? (
          <Text style={StyleSheet.flatten(s.inputTouchedText)}>{field.meta.error ? field.meta.error : field.logicError}</Text>
        ) : null}
      </View>
    );
  }
}

const s = StyleSheet.create({
  captionText: {
    maxHeight: ms(15),
    height: ms(15),
    marginLeft: ms(10),
    fontSize: ms(12),
    color: colors.gray6,
    letterSpacing: ms(1.075),
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 0,
    margin: 0,
    justifyContent: 'space-between',
  },
  container: {
    flexGrow: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginVertical: ms(5),
    height: ms(50),
    maxHeight: ms(50),
    borderRadius: ms(5),
    backgroundColor: 'rgba(0,0,0,0.05)',
    justifyContent: 'center',
  },
  input: {
    flex: 1,
    width: '100%',
    fontSize: ms(16, 0.5),
    justifyContent: 'center',
    margin: 0,
    padding: 0,
    height: ms(30),
    maxHeight: ms(30),
    paddingLeft: ms(10),
    color: colors.gray9,
  },
  inputTouchedText: {
    margin: 0,
    padding: 0,
    fontWeight: 'bold',
    color: 'red',
    textAlign: 'left',
    fontSize: ms(10, 0.1),
  },
});

export default InputField;
