import {CustomStyleSheet} from '../../styles/index';
import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {Button} from 'react-native-paper';

const buildButton = (style, onPress, text, icon, loading, disabled) => {
  return (
    <Button
      onPress={onPress}
      mode="contained"
      icon={icon}
      dark={true}
      loading={loading}
      labelStyle={{color: 'white'}}
      compact="false"
      disabled={disabled}
      style={style}>
      {text}
    </Button>
  );
};

export default class BadrButtonIcon extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return buildButton(
      CustomStyleSheet.badrButtonIcon,
      this.props.onPress,
      this.props.text,
      this.props.icon,
      this.props.loading,
      this.props.disabled,
    );
  }
}
