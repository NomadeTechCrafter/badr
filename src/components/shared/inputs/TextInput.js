import {CustomStyleSheet} from '../../../styles/index';
import React from 'react';
import {TextInput, View} from 'react-native';

export default class BadrTextInput extends React.Component {
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
          value={this.props.value}
          autoCapitalize={this.props.autoCapitalize}
          onEndEditing={this.props.onEndEditing}
        />
      </View>
    );
  }
}
