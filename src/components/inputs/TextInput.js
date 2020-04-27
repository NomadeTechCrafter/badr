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

import {translate} from '../../common/translations/i18n';

export class BadrTextInput extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={CustomStyleSheet.badrInput}>
        <TextInput
          style={CustomStyleSheet.badrText}
          keyboardType={this.props.keyboardType}
          placeholder={this.props.placeholder}
          onChangeText={text => this.props.onChangeText(text)}
          secureTextEntry={false}
          maxLength={this.props.maxLength}
          value={value}
          autoCapitalize={autoCapitalize}
          onEndEditing={this.props.onEndEditing}
        />
      </View>
    );
  }
}

export class LoginTextInput extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={CustomStyleSheet.badrInput}>
        <TextInput
          value={this.props.value}
          autoCapitalize="characters"
          style={CustomStyleSheet.badrText}
          placeholder={translate('login.userName')}
          onChangeText={text => this.props.onChangeText(text)}
          secureTextEntry={false}
        />
      </View>
    );
  }
}
export class PasswordTextInput extends React.Component {
  render() {
    return (
      <View style={CustomStyleSheet.badrInput}>
        <TextInput
          autoCapitalize="none"
          style={CustomStyleSheet.badrText}
          placeholder={translate('login.password')}
          onChangeText={text => this.props.onChangeText(text)}
          secureTextEntry={true}
          value={this.props.value}
        />
      </View>
    );
  }
}
