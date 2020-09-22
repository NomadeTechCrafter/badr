import {CustomStyleSheet} from '../../../styles/ComThemeStyle';
import React from 'react';
import {Text, TouchableOpacity} from 'react-native';

export default class ComBadrButtonComp extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableOpacity
        style={[CustomStyleSheet.badrButton, this.props.style]}
        onPress={this.props.onPress}
        disabled={this.props.disabled}>
        <Text style={CustomStyleSheet.badrButtonText}>{this.props.text}</Text>
      </TouchableOpacity>
    );
  }
}
