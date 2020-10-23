import {CustomStyleSheet, primaryColor} from '../../../styles/ComThemeStyle';
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

export default class ComBadrTouchableButtonComp extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={this.props.style}>
        <TouchableOpacity
          style={{
            flex: 1,
            borderColor: primaryColor,
            borderWidth: 1,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
          }}
          onPress={this.props.onPress}>
          <Text
            style={{
              color: primaryColor,
            }}>
            {this.props.text}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
