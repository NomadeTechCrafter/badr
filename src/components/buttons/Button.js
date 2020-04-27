import {CustomStyleSheet} from '../../styles/index';
import React from 'react';
import {Text, TouchableOpacity} from 'react-native';

const buildButton = (style, onPress, text, textStyle) => {
  return (
    <TouchableOpacity style={style} onPress={onPress}>
      <Text style={textStyle}>{text}</Text>
    </TouchableOpacity>
  );
};

export class BadrButton extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return buildButton(
      [CustomStyleSheet.badrButton, this.props.style],
      this.props.onPress,
      this.props.text,
      CustomStyleSheet.badrButtonText,
    );
  }
}
