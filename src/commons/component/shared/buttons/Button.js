import {CustomStyleSheet} from '../../../styles';
import React from 'react';
import {Text, TouchableOpacity} from 'react-native';

const buildButton = (style, onPress, text, textStyle, disabled) => {
  return (
    <TouchableOpacity style={style} onPress={onPress} disabled={disabled}>
      <Text style={textStyle}>{text}</Text>
    </TouchableOpacity>
  );
};

export default class BadrButton extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return buildButton(
      [CustomStyleSheet.badrButton, this.props.style],
      this.props.onPress,
      this.props.text,
      CustomStyleSheet.badrButtonText,
      this.props.disabled,
    );
  }
}
