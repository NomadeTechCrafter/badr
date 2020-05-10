import React from 'react';
import {View, Text, Clipboard, ToastAndroid} from 'react-native';

export default class CopyPaste extends React.Component {
  writeToClipboard = async text => {
    ToastAndroid.showWithGravity(
      text + ' Copié',
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
    );
    await Clipboard.setString(text);
  };

  render() {
    return (
      <Text onLongPress={() => this.writeToClipboard(this.props.value)}>
        {this.props.value}
      </Text>
    );
  }
}
