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

export default class LoginTextInput extends React.Component {
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