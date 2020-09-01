import React from 'react';
import {TextInput, View} from 'react-native';
import {CustomStyleSheet} from '../../../styles';
import {translate} from '../../../i18n/I18nHelper';

export default class BadrPasswordTextInput extends React.Component {
  render() {
    return (
      <View style={CustomStyleSheet.badrInput}>
        <TextInput
          autoCapitalize="none"
          style={CustomStyleSheet.badrText}
          placeholder={translate('login.password')}
          onChangeText={(text) => this.props.onChangeText(text)}
          secureTextEntry={true}
          value={this.props.value}
        />
      </View>
    );
  }
}
