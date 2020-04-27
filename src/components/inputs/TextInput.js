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
  value,
  keyboardType,
  maxLength,
  onEndEditing
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
          value={value}
          keyboardType={keyboardType}
          onEndEditing={onEndEditing}
        />
      ) : (
        <TextInput
          autoCapitalize={autoCapitalize}
          style={style}
          placeholder={placeholder}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          value={value}
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
      this.props.autoCapitalize,
      CustomStyleSheet.badrText,
      this.props.placeholder,
      this.props.onChangeText,
      false,
      this.props.value,
      this.props.keyboardType,
      this.props.maxLength,
      this.props.onEndEditing
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
      this.props.value
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
      this.props.value
    );
  }
}
