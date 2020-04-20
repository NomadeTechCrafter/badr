import {CustomStyleSheet} from '../../styles/index';
import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';

import {translate as translate} from '../../common/translations/i18n';

const buildTextInput = (
  autoCapitalize,
  style,
  placeholder,
  onChangeText,
  secureTextEntry,
  maxLength,
) => {
  return (
    <View style={CustomStyleSheet.badrInput}>
      {maxLength ? (
        <TextInput
          autoCapitalize={autoCapitalize}
          style={style}
          placeholder={placeholder}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          maxLength={maxLength}
        />
      ) : (
        <TextInput
          autoCapitalize={autoCapitalize}
          style={style}
          placeholder={placeholder}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
        />
      )}
    </View>
  );
};

export class BadrTextInput extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return buildTextInput(
      this.props.type,
      CustomStyleSheet.badrText,
      this.props.placeholder,
      this.props.onChangeText,
      false,
      this.props.maxLength,
    );
  }
}


export class LoginTextInput extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return buildTextInput(
      'characters',
      CustomStyleSheet.badrText,
      translate("login.userName"),
      this.props.onChangeText,
      false,
    );
  }
}
export class PasswordTextInput extends React.Component {
  render() {
    return buildTextInput(
      'none',
      CustomStyleSheet.badrText,
      translate("login.password"),
      this.props.onChangeText,
      true,
    );
  }
}
