import React from 'react';
import {TextInput, View} from 'react-native';
import {CustomStyleSheet} from '../../../styles/ComThemeStyle';
import {translate} from '../../../i18n/ComI18nHelper';

export default class ComBadrPasswordTextInputComp extends React.Component {
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
