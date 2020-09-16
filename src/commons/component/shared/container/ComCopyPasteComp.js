import React from 'react';
import {Text, Clipboard, ToastAndroid} from 'react-native';

export default class ComCopyPasteComp extends React.Component {
  writeToClipboard = async (text) => {
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
