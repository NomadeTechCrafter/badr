import {CustomStyleSheet} from '../../styles/index';
import React from 'react';
import {Button} from 'react-native-paper';

const buildButton = (
  style,
  onPress,
  text,
  icon,
  loading,
  disabled,
  compact,
) => {
  return (
    <Button
      onPress={onPress}
      mode="contained"
      icon={icon}
      dark={true}
      loading={loading}
      compact={compact}
      labelStyle={{color: 'white'}}
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
      this.props.style ? this.props.style : CustomStyleSheet.badrButtonIcon,
      this.props.onPress,
      this.props.text,
      this.props.icon,
      this.props.loading,
      this.props.disabled,
      this.props.compact,
    );
  }
}
